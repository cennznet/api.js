// Copyright 2020 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { hexToU8a } from '@polkadot/util';
import { CENNZnut as encodeCennznut } from '@cennznet/cennznut-wasm';
import { Doughnut as DoughnutMaker } from '@plugnet/doughnut-wasm';
import { Api } from '../../src/Api';
import { Keypair } from '@plugnet/util-crypto/types';
import { Keyring } from '@polkadot/api';
import { KeyringPair } from '@plugnet/keyring/types';
import initApiPromise from '../../../../jest/initApiPromise';
import { cryptoWaitReady } from '@plugnet/util-crypto';
import Doughnut from '@cennznet/types/Doughnut';

const [CENNZ, CPAY] = [16_000, 16_001];

describe('Doughnut for CennznetExtrinsic', () => {
  let aliceKeyPair = {
    secretKey: hexToU8a('0x98319d4ff8a9508c4bb0cf0b5a78d760a0b2082c02775e6e82370816fedfff48925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011'),
    publicKey: hexToU8a('0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'),
    address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
  };

  let api: Api;
  let bob, charlie, dave;

  beforeAll(async () => {
    api = await initApiPromise();
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    bob = keyring.addFromUri('//Bob');
    charlie = keyring.addFromUri('//Charlie');
    dave = keyring.addFromUri('//Dave');
  });

  afterAll(async () => {
    await api.disconnect();
  })

  it('Delegates a GA transfer from alice to charlie when extrinsic is signed by bob', async done => {

    let doughnut = makeDoughnut(
      api.registry,
      {
        issuer: aliceKeyPair,
        holder: bob,
        permissions: { 'cennznet': makeCennznut('generic-asset', 'transfer') },
      }
    );
    const receiver = dave.address;
    const amount = 8_767_535;

    const tx = api.tx.genericAsset.transfer(CENNZ, receiver, amount);
    await tx.signAndSend(bob, { doughnut }, async ({ events, status }) => {
      if (status.isFinalized) {
        expect(
          events.find(event => event.event.data.method === 'ExtrinsicSuccess')
        ).toBeTruthy();
        done();
      }
    });
  });

  it('fails when charlie uses bob\'s doughnut', async () => {
    let doughnut = makeDoughnut(
      api.registry,
      {
        issuer: aliceKeyPair,
        holder: bob,
        permissions: { 'cennznet': makeCennznut('generic-asset', 'transfer') },
      }
    );
    const tx = api.tx.genericAsset.transfer(CPAY, charlie.address, 10_000);

    await expect(tx.signAndSend(charlie, { doughnut }, () => { }))
      .rejects
      // https://github.com/cennznet/cennznet/wiki/Transaction-Error-Codes#doughnut-usage
      .toThrow('submitAndWatchExtrinsic(extrinsic: Extrinsic): ExtrinsicStatus:: 1010: Invalid Transaction: {"Custom":180}')
  });

  it('fails when cennznut does not authorize the extrinsic method', async done => {
    let doughnut = makeDoughnut(
      api.registry,
      {
        issuer: aliceKeyPair,
        holder: bob,
        permissions: { 'cennznet': makeCennznut('generic-asset', 'mint') },
      }
    );
    const tx = api.tx.genericAsset.transfer(CPAY, charlie.address, 10_000);

    await tx.signAndSend(bob, { doughnut }, async ({ events, status }) => {
      if (status.isFinalized) {
        expect(
          events.find(event => event.event.data.method === 'ExtrinsicFailed')
        ).toBeTruthy();
        done();
      }
    });
  });

  it('fails when cennznut does not authorize the extrinsic module', async done => {
    let badDoughnut = makeDoughnut(
      api.registry,
      {
        issuer: aliceKeyPair,
        holder: bob,
        permissions: { 'cennznet': makeCennznut('balance', 'transfer') },
      }
    );

    const tx = api.tx.genericAsset.transfer(CPAY, charlie.address, 10_000);
    await tx.signAndSend(bob, { doughnut: badDoughnut }, async ({ events, status }) => {
      if (status.isFinalized) {
        expect(
          events.find(event => event.event.data.method === 'ExtrinsicFailed')
        ).toBeTruthy();
        done();
      }
    });
  });

  it('Fails when doughnut expires', async done => {
    let doughnut = await makeDoughnut(
       api.registry,
        {
            issuer: aliceKeyPair,
            holder: bob,
            permissions: {'cennznet': makeCennznut('balance', 'transfer')},
            expiry: 100,
        },
    );

    const tx = api.tx.genericAsset.transfer(CENNZ, charlie.address, 10_000);
    await expect(tx.signAndSend(bob, {doughnut: doughnut}, () => {
        // https://github.com/cennznet/cennznet/wiki/Transaction-Error-Codes#doughnut-usage
    })).rejects.toThrow('submitAndWatchExtrinsic(extrinsic: Extrinsic): ExtrinsicStatus:: 1010: Invalid Transaction: {"Custom":181}');
    done();
  });

  it('Fails when doughnut not signed', async done => {
     let doughnut = await makeDoughnut(
        api.registry,
            {
                issuer: aliceKeyPair,
                holder: bob,
                permissions: {'cennznet': makeCennznut('balance', 'transfer')},
                isSigned: false,
            },
     );

     const tx = api.tx.genericAsset.transfer(CENNZ, charlie.address, 10_000);
     await expect(tx.signAndSend(bob, {doughnut: doughnut}, () => {
         // https://github.com/cennznet/cennznet/wiki/Transaction-Error-Codes#doughnut-usage
     })).rejects.toThrow('submitAndWatchExtrinsic(extrinsic: Extrinsic): ExtrinsicStatus:: 1010: Invalid Transaction: {"Custom":172}');
     done();
  });
});

interface DoughnutArgs {
  issuer: Keypair,
  holder: KeyringPair,
  permissions: Record<string, Uint8Array>,
  expiry?: number,
  isSigned?: boolean
}

/// Helper for creating CENNZnuts which takes module/section name and method name to be same for doughnut permissioning
function makeCennznut(module: string, method: string): Uint8Array {
  const moduleVec = [
    [
      module, {
        'name': module,
        'methods': [
          [
            method, {
              'name': method,
              'constraints': null,
            },
          ],
        ],
      },
    ],
  ];
  const contractVec = [];
  const cennznut = new encodeCennznut(moduleVec, contractVec);
  return cennznut.encode();
}

// Helper for creating v0 Doughnuts where user can pass expiry time for doughnut to be valid and
// 'not before' which would mean doughnut is not applied before this block
function makeDoughnut(registry, { issuer, holder, permissions, expiry = (new Date().getTime() / 1000) + 600, isSigned = true }: DoughnutArgs): Doughnut {
  const d = new DoughnutMaker(
    issuer.publicKey,
    holder.publicKey,
    expiry, // default expire in 10 minutes
    1, // 'not before'
  );
  for (const key in permissions) {
    d.addDomain(key, permissions[key]);
  }
  if (isSigned) {
      d.signSr25519(new Uint8Array(issuer.secretKey));
  }
  let encoded = d.encode();
  return new Doughnut(registry, encoded)
}

function checkEventMatches({ allEvents, method, section, sender, receiver, amount, asset }) {
  if (method === 'Transferred') {
    return allEvents.find(
      event => (
        event.event.data.method === method &&
        event.event.data.section === section &&
        event.event.data[1].toString() === sender &&
        event.event.data[0].toString() === asset &&
        event.event.data[2].toString() === receiver &&
        event.event.data[3].toString() === amount
      ),
    );
  } else if (method === 'Minted') {
    return allEvents.find(
      event => (
        event.event.data.method === method &&
        event.event.data.section === section &&
        event.event.data[1].toString() === receiver &&
        event.event.data[0].toString() === asset &&
        event.event.data[2].toString() === amount
      ),
    );
  }
}
