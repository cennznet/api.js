// Copyright 2019 Centrality Investments Limited
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

import testingPairs from '@polkadot/keyring/testingPairs';
import { hexToU8a, assert } from '@polkadot/util'
import { encode as encodeCennznut } from '@cennznet/cennznut';
import { generate as encodeDoughnut } from '@plugnet/doughnut-maker';

import { Api } from '../../src/Api';
import { Keypair } from '@plugnet/util-crypto/types';
import { KeyringPair } from '@cennznet/util/types';
import { Extrinsic } from '@cennznet/types/extrinsic';
import initApiPromise from '../../../../jest/initApiPromise';
import {SimpleKeyring, Wallet} from '@cennznet/wallet';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import Doughnut from '@cennznet/types/Doughnut';
// import {ChargeTransactionPayment} from '@cennznet/types/runtime/transaction-payment';

/// Helper for creating CENNZnuts
function makeCennznut(module: string, method: string): Uint8Array {
  const version = 0;
  return encodeCennznut(version, {
    "modules": {
      [module]: {
        "methods": {
          [method]: {}
        }
      }
    }
  });
}

/// Helper for creating v0 Doughnuts
async function makeDoughnut(
  issuer: Keypair,
  holder: KeyringPair,
  permissions: Record<string, Uint8Array>,
): Promise<Uint8Array> {
  const payloadVersion = 0;
  const signingMethod = 0;
  return await encodeDoughnut(
    payloadVersion,
    signingMethod,
    {
      issuer: issuer.publicKey,
      holder: holder.publicKey,
      expiry: 555555,
     // block_cooldown: 0,
      permissions: permissions,
    },
    issuer
  );
}

describe('Doughnut for CennznetExtrinsic', () => {
  let aliceKeyPair = {
    secretKey: hexToU8a('0x98319d4ff8a9508c4bb0cf0b5a78d760a0b2082c02775e6e82370816fedfff48925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011'),
    publicKey: hexToU8a('0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d')
  };

  let api: Api;
  let keyring: {
    [index: string]: KeyringPair;
  };

  beforeAll(async () => {
    api = await initApiPromise();
    // await cryptoWaitReady();
    //  api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
    keyring = testingPairs({ type: 'sr25519' });
    // const simpleKeyring: SimpleKeyring = new SimpleKeyring();
    // simpleKeyring.addFromUri(sender.uri);
    // const wallet = new Wallet();
    // await wallet.createNewVault('');
    // await wallet.addKeyring(simpleKeyring);
    // api.setSigner(wallet);
    // console.log('IN BEFORE ALL...');
    // console.log('ALICE:',keyring.alice);
    // console.log('BOB:',keyring.bob.address);
  });

  afterEach(() => {
    jest.setTimeout(5000);
  });

  it('Delegates a GA transfer from alice to charlie when extrinsic is signed by bob', async done => {

    let doughnut = await makeDoughnut(
      aliceKeyPair,
      keyring.bob,
      { "cennznet": makeCennznut("generic-asset", "transfer") }
    );

    const tx = api.tx.genericAsset.transfer(16001, keyring.charlie.address, 10000);
    // tx.addDoughnut(doughnut);

    const opt = {doughnut: new Doughnut(doughnut)};

    await tx.signAndSend(keyring.bob,  opt, async ({events, status}) => {
      if (status.isFinalized) {
        const transfer = events.find(
          event => (
            event.event.data.method === 'Transferred' &&
            event.event.data.section === 'genericAsset' &&
            event.event.data[1].toString() === keyring.alice.address // transferred from alice's account
          )
        );
        if (transfer != undefined) {
          done();
        } else {
          assert(true, "false");
        }
      }
    });
  });

  it('Fails when charlie uses bob\'s doughnut', async () => {
    let doughnut = await makeDoughnut(
      aliceKeyPair,
      keyring.bob,
      { "cennznet": makeCennznut("generic-asset", "transfer") }
    );
    const tx = api.tx.genericAsset.transfer(16001, keyring.charlie.address, 10000);
//    tx.addDoughnut(doughnut);

    await expect(tx.signAndSend(keyring.charlie, {doughnut},() => { })).rejects.toThrow("1010: Invalid Transaction (0)");
  });

  it('fails when cennznut does not authorize the extrinsic method', async (done) => {
    let doughnut = await makeDoughnut(
      aliceKeyPair,
      keyring.bob,
      { "cennznet": makeCennznut("generic-asset", "mint") }
    );

    const tx = api.tx.genericAsset.transfer(16001, keyring.charlie.address, 10000);
    // tx.addDoughnut(doughnut);

    await tx.signAndSend(keyring.bob, {doughnut} , async ({events, status}) => {
      if (status.isFinalized) {
        const failed = events.find(event => event.event.data.method === 'ExtrinsicFailed');
        if (failed != undefined) {
          done();
        } else {
          assert(false, "expected extrinsic to fail");
        }
      }
    });

  });

  it('fails when cennznut does not authorize the extrinsic module', async (done) => {
    let doughnut = await makeDoughnut(
      aliceKeyPair,
      keyring.bob,
      { "cennznet": makeCennznut("balance", "transfer") }
    );

    const tx = api.tx.genericAsset.transfer(16001, keyring.charlie.address, 10000);
    // tx.addDoughnut(doughnut);

    await tx.signAndSend(keyring.bob, {doughnut}, async ({events, status}) => {
      if (status.isFinalized) {
        const failed = events.find(event => event.event.data.method === 'ExtrinsicFailed');
        if (failed != undefined) {
          done();
        } else {
          assert(false, "expected extrinsic to fail");
        }
      }
    });

  });

  it('can decode a doughnut from a signed extrinsic', async () => {
    let doughnut = await makeDoughnut(
      aliceKeyPair,
      keyring.bob,
      { "cennznet": makeCennznut("generic-asset", "transfer") }
    );

    let tx = api.tx.genericAsset.transfer(16001, keyring.charlie.address, 10000);
    //  tx = tx.addDoughnut(doughnut);
    let signed = tx.sign(keyring.bob, {doughnut});

    let original_extrinsic = tx as unknown as Extrinsic;
    let new_extrinsic = new Extrinsic(signed.toHex());
    // assert(
    //   new_extrinsic.doughnut.toHex() === original_extrinsic.doughnut.toHex(),
    //   "doughnut does not match decoded version"
    // );
    assert(new_extrinsic.toHex() === original_extrinsic.toHex(), "extrinsics do not match");

  });

  // it('can decode a doughnut from a signed extrinsic with fee exchange', async () => {
  //   let doughnut = await makeDoughnut(
  //     aliceKeyPair,
  //     keyring.bob,
  //     { "cennznet": makeCennznut("generic-asset", "transfer") }
  //   );
  //
  //   const feeExchange = {
  //     assetId: 16000,
  //     maxPayment: '50000000000000000',
  //   };
  //   const transactionPayment = {
  //     tip: 2,
  //     feeExchange:  {
  //       FeeExchangeV1: feeExchange,
  //     },
  //   };
  //
  //   let tx = api.tx.genericAsset.transfer(16001, keyring.charlie.address, 10000);
  //   // tx = tx.addFeeExchangeOpt({
  //   //   assetId: 17000,
  //   //   maxPayment: '12345',
  //   // });
  // //  tx = tx.addDoughnut(doughnut);
  //   let signed = tx.sign(keyring.alice, {(transactionPayment as ChargeTransactionPayment)});
  //
  //   let original_extrinsic = signed as unknown as Extrinsic;
  //   let new_extrinsic = new Extrinsic(signed.toHex());
  //
  //   assert(
  //     new_extrinsic.doughnut.toHex() === original_extrinsic.doughnut.toHex(),
  //     "doughnut does not match decoded version"
  //   );
  //   assert(new_extrinsic.toHex() === original_extrinsic.toHex(), "extrinsics do not match");
  //
  // });

});
