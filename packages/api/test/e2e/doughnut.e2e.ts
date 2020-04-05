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

// import testingPairs from '@polkadot/keyring/testingPairs';
import { hexToU8a, assert } from '@polkadot/util'
import { encode as encodeCennznut } from '@cennznet/cennznut';
import { generate as encodeDoughnut } from '@plugnet/doughnut-maker';

import { Keypair } from '@plugnet/util-crypto/types';
// import { KeyringPair } from '@cennznet/util/types';
// import { KeyringPair } from '@plugnet/keyring/types';
import { Extrinsic } from '@cennznet/types/extrinsic';
import initApiPromise from '../../../../jest/initApiPromise';
// import {SimpleKeyring, Wallet} from '@cennznet/wallet';
import {Keyring, SubmittableResult} from '@polkadot/api';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import Doughnut from '@cennznet/types/Doughnut';
import {KeyringPair} from '@cennznet/util/types';

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
      // expiry: new Date(2020,3,1,1,1,1,).getTime(), //can't use as 'Expiry cannot be greater than 4294967295'
    //  expiry: 2581386010,
      expiry: Math.round(((new Date()).getTime() + 10000) / 1000),
      notBefore: 1,
      block_cooldown: 0,
      permissions: permissions,
    },
    issuer
  );
}

const Alice = {
  address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  uri: '//Alice',
}
const Bob = {
  address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  uri: '//Bob',
};
const Charlie = {
  address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  uri: '//Charlie',
}
const Dave = {
  address: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
  uri: '//Dave'
}
const Eve = {
  address: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
  uri: '//Eve'
};

describe('Doughnut for CennznetExtrinsic', () => {
  let aliceKeyPair = {
    secretKey: hexToU8a('0x98319d4ff8a9508c4bb0cf0b5a78d760a0b2082c02775e6e82370816fedfff48925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011'),
    publicKey: hexToU8a('0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d')
  };

  let api;
  let alice, bob;
  let issuerKeyPair;
  let holderKeypair;
  let keyring: {
    [index: string]: KeyringPair;
  };

  beforeAll(async () => {
    api = await initApiPromise();
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');
    holderKeypair = keyring.addFromUri('//Bob');
    //api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
    //keyring = testingPairs({ type: 'sr25519' });
    // const simpleKeyring = new SimpleKeyring();
    // simpleKeyring.addFromUri(Alice.uri);
    // simpleKeyring.addFromUri(Bob.uri);
    // simpleKeyring.addFromUri(Charlie.uri);
    // simpleKeyring.addFromUri(Dave.uri);
    // const wallet = new Wallet();
    // await wallet.createNewVault('passphrase');
    // await wallet.addKeyring(simpleKeyring);
    // api.setSigner(wallet);
  });

  afterEach(() => {
    jest.setTimeout(5000);
  });

  describe('Balance', () => {
    it('Check the transferred balance:', async done => {
      const CENNZ = 16000;
      const assetBalance = await api.query.genericAsset.freeBalance(CENNZ, Charlie.address);
      console.log("Charlie's Balance for CENNZ", assetBalance.toString());

      const AliceAssetBalance = await api.query.genericAsset.freeBalance(CENNZ, Alice.address);
      console.log("Alice's Balance for CENNZ ", AliceAssetBalance.toString());

      const bobAssetBalance = await api.query.genericAsset.freeBalance(CENNZ, Bob.address);
      console.log("Bob's Balance for CENNZ ", bobAssetBalance.toString());
      done();
    });
  });

  it('Delegates a GA transfer from alice to charlie when extrinsic is signed by bob', async done => {

    // const simpleKeyring: SimpleKeyring = new SimpleKeyring();
    // const keyring = new Keyring({ type: 'sr25519' });
    //const keyringPair = testingPairs({ type: 'ed25519' }, false);
    const issuerKeypair = aliceKeyPair;

    let doughnut = await makeDoughnut(
      issuerKeypair,
      holderKeypair,
      { "cennznet": makeCennznut("generic-asset", "transfer") }
    );
    console.log('Doughtnut:', doughnut.toString());
    const tx = api.tx.genericAsset.transfer(16000, Charlie.address, 10000);
    // tx.addDoughnut(doughnut);

    // const opt = {doughnut: new Doughnut(api.registry, doughnut)};
    const opt = {doughnut: doughnut};
    await tx.signAndSend(holderKeypair,  opt, async ({events, status}) => {
      if (status.isFinalized) {
        console.log('***********');
        console.log('Inside finalized..');
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });
        done();
      }
    });
  });

  it('makes a tx using immortal era', async done => {

    const assetBalance = await api.query.genericAsset.freeBalance(16001, bob.address);
    console.log('Balance before ',assetBalance.toString());
    await api.tx.genericAsset
      .transfer(16000, bob.address, 100)
      .signAndSend(alice,
        async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            console.log(events[0].event.method);
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
  }, 10000000);

  it('Fails when charlie uses bob\'s doughnut', async () => {
    let doughnut = await makeDoughnut(
      aliceKeyPair,
      holderKeypair,
      { "cennznet": makeCennznut("generic-asset", "transfer") }
    );
    const tx = api.tx.genericAsset.transfer(16001, Charlie.address, 10000);
//    tx.addDoughnut(doughnut);
    await tx.signAndSend(holderKeypair, {doughnut});
   // await expect(tx.signAndSend(holderKeypair, {doughnut},() => { })).rejects.toThrow("1010: Invalid Transaction (0)");
  });

  it('fails when cennznut does not authorize the extrinsic method', async (done) => {
    let doughnut = await makeDoughnut(
      aliceKeyPair,
      keyring.bob,
      { "cennznet": makeCennznut("generic-asset", "mint") }
    );

    const tx = api.tx.genericAsset.transfer(16001, keyring.charlie.address, 10000);
    // tx.addDoughnut(doughnut);

    await tx.signAndSend(keyring.bob, {doughnut} as any, async ({events, status}) => {
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

    await tx.signAndSend(keyring.bob, {doughnut} as any, async ({events, status}) => {
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
    let signed = tx.sign(keyring.bob, {doughnut} as any);

    let original_extrinsic = tx as unknown as Extrinsic;
    let new_extrinsic = new Extrinsic(api.registry, signed.toHex());
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
