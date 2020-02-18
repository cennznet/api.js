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

// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {AssetId, AssetOptions, FeeExchangeV1} from '@cennznet/types';
import {SimpleKeyring, Wallet} from '@cennznet/wallet';
// import {SimpleKeyring, Wallet} from '../../../wallet/src/index';
import {SubmittableResult} from '@polkadot/api';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
import { TypeRegistry } from '@polkadot/types';
import {Api as ApiPromise} from '@cennznet/api';
import testingPairs from '@polkadot/keyring/testingPairs';
import testKeyring from '@polkadot/keyring/testing';
import createPair from '@polkadot/keyring/pair';
import { hexToU8a } from '@polkadot/util';
import { SingleAccountSigner } from '../SingleAccountSigner';
// const sender_on_rimu = {
//     address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
//     uri: '//cennznet-js-test',
// };

const sender = {
  address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  uri: '//Alice',
};
const receiver = {
  address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
};
const passphrase = 'passphrase';
const minFee = 30000000000000;
const feeAssetId = '16002';
let wallet, keyring;

describe('e2e transactions', () => {
  let api;
  const registry = new TypeRegistry();
  //const keyring = testKeyring({ type: 'sr25519' });
  // const keyring = testingPairs({ type: 'sr25519'}, false);
  // const aliceEd = keyring.addPair(
  //   createPair('ed25519', {
  //     secretKey: hexToU8a('0xabf8e5bdbe30c65656c0a3cbd181ff8a56294a69dfedd27982aace4a7690911588dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee'),
  //     publicKey: hexToU8a('0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee')
  //   })
  // );
  beforeAll(async () => {
    await cryptoWaitReady();
    keyring = testingPairs({ type: 'sr25519' });
   // const signer = new SingleAccountSigner(registry, keyring.alice_session);
    api = await ApiPromise.create({provider: 'ws://localhost:9944', registry});
   //  await api.isReady;
  //  api = await initApiPromise();
    const simpleKeyring: SimpleKeyring = new SimpleKeyring();
    simpleKeyring.addFromUri(sender.uri);
    wallet = new Wallet(registry);
    await wallet.createNewVault(passphrase);
    await wallet.addKeyring(simpleKeyring);
    api.setSigner(wallet);
  });

  afterAll(async () => {
    api.disconnect();
  });

  describe('Send()', () => {

    it("Deposit liquidity in fee asset's pool", async done => {
      const poolAssetBalance = await api.cennzxSpot.getPoolAssetBalance(feeAssetId);
      if (poolAssetBalance.toNumber() < minFee  ) {
        const coreAmount = minFee;
        const investmentAmount = await api.cennzxSpot.liquidityPrice(feeAssetId, coreAmount);
        const minLiquidity = 1;
        await api.tx.cennzxSpot
          .addLiquidity(feeAssetId, minLiquidity, investmentAmount, coreAmount)
          .signAndSend(sender.address, async ({events, status}) => {
            if (status.isFinalized) {
              let liquidityCreated = false;
              for (const {event} of events) {
                if (event.method === 'AddLiquidity') {
                  done();
                }
              }
            }
          });
      } else {
        done();
      }
    });

    it('makes a tx using immortal era', async done => {

      const assetBalance = await api.query.genericAsset.freeBalance(16001, keyring.bob.address);
      // console.log('Balance before ',assetBalance.toString());
      const nonce = await api.query.system.accountNonce(keyring.alice.address);
      const ex = await api.tx.genericAsset
        .transfer(16000, keyring.bob.address, 100)
        .signAndSend(keyring.alice,
     // ex.send(
        async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
      // console.log('Extrinsic sig:', ex.signature);
      // const assetAfter = await api.query.genericAsset.freeBalance(16001, keyring.bob.address);
      // console.log('Balance after ',assetAfter.toString());
      // done();
    }, 10000000);

    it('makes a tx via send', async done => {
      const simpleKeyring: SimpleKeyring = new SimpleKeyring();
      const senderKeypair = simpleKeyring.addFromUri(sender.uri);
      const nonce = await api.query.system.accountNonce(senderKeypair.address);
      // transfer
      const tx = api.tx.genericAsset.transfer(16000, receiver.address, 1).sign(senderKeypair, {nonce});
      await tx.send(async ({events, status}: SubmittableResult) => {
        if (status.isFinalized) {
          expect(events[0].event.method).toEqual('Transferred');
          expect(events[0].event.section).toEqual('genericAsset');
          done();
        }
      });
    });

    it('makes a tx', async done => {
      const assetBalance = await api.query.genericAsset.freeBalance(16001, sender.address);
      // transfer
      await api.tx.genericAsset
        .transfer(16000, receiver.address, 1)
        .signAsync(sender.address, async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
    });

    it.skip('makes a tx with statusCb', async done => {
      const totalSupply = 100;
      const assetIdBefore = (await api.query.genericAsset.nextAssetId()) as AssetId;
      const reservedIdStart: number = 17000;
      const assetOptions = new AssetOptions(api.registry, {
        initialIssuance: totalSupply,
        permissions: {
          update: null,
          mint: null,
          burn: null,
        },
      });
      // transfer
      await api.tx.genericAsset
        .create(assetOptions)
        .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            const assetIdAfter = (await api.query.genericAsset.nextAssetId()) as AssetId;
            // expect
            expect(assetIdAfter.gt(assetIdBefore)).toBeTruthy();
            expect(Number(assetIdAfter.toString())).toBeGreaterThan(reservedIdStart);
            expect(Number(assetIdBefore.toString())).toBeGreaterThan(reservedIdStart);
            done();
          }
        });
    });

    describe('feeExchange extrinsic', () => {
      it('use keypair to sign', async done => {
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        const senderKeypair = simpleKeyring.addFromUri(sender.uri);

        const feeExchange = {
          assetId: feeAssetId,
          maxPayment: '50000000000000000',
        };
        const feeExchangeV1 = {FeeExchangeV1 : feeExchange};
        const transactionPayment = {
          tip: '2', feeExchange:  feeExchangeV1,
        };

         api.tx.genericAsset
          .transfer(16001, receiver.address, 100)
          .signAndSend(senderKeypair, {transactionPayment}, ({events, status}) => {
            // console.log('Transaction status:', status.type);
            if (status.isFinalized) {
              // console.log('Completed at block hash', status.value.toHex());
              console.log('Events:');

              events.forEach(({phase, event: {data, method, section}}) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
              });
              done();
            }
          });
      });

      it('use signer', async done => {
        const feeExchange = {
          assetId: feeAssetId,
          maxPayment: '50000000000000000',
        };
        const transactionPayment = {
          tip: 2,
          feeExchange:  {
            FeeExchangeV1: feeExchange,
          },
        };

        const tx = api.tx.genericAsset.transfer(16001, keyring.bob.address, 100);
        return tx.signAndSend(keyring.alice, {transactionPayment}, ({events, status}) => {
          console.log('Transaction status:', status.type);
          if (status.isFinalized) {
            console.log('Completed at block hash', status.value.toHex());
            console.log('Events:');

            events.forEach(({phase, event: {data, method, section}}) => {
              console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
            done();
          }
        });
      });
    });
  });
});
