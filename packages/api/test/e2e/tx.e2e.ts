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

import {AssetId, AssetOptions} from '@cennznet/types';
import {SubmittableResult, Keyring} from '@polkadot/api';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import testKeyring from '@polkadot/keyring/testing';
import initApiPromise from '../../../../jest/initApiPromise';
const minFee = 30000000000000;
const feeAssetId = '17000';

describe('e2e transactions', () => {
  let api;
  let alice, bob;
  beforeAll(async () => {
    await cryptoWaitReady();
    api = await initApiPromise();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');
  });

  afterAll(async () => {
    api.disconnect();
  });

  describe('Send()', () => {

    it("Deposit liquidity in fee asset's pool", async done => {
      const coreAmount = minFee;
      const minLiquidity = 1;

      const sudoKey = await api.query.sudo.key();
      const tKeyring = testKeyring();
      const initialIssuance = 900000000000000;
      // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
      const sudoPair = tKeyring.getPair(sudoKey.toString());
      await api.tx.sudo
        .sudo(api.tx.genericAsset
          .create(alice.address,
            new AssetOptions(
              api.registry,
              {
                initialIssuance: initialIssuance,
                permissions: {
                  update: null,
                  mint: null,
                  burn: null,
                },
              })
          ))
        .signAndSend(sudoPair, async({status, events}) => {
          if (status.isFinalized) {
            const investmentAmount = await api.derive.cennzxSpot.liquidityPrice(feeAssetId, coreAmount);
            const nonce = await api.query.system.accountNonce(alice.address);
            await api.tx.cennzxSpot
              .addLiquidity(feeAssetId, minLiquidity, investmentAmount, coreAmount)
              .signAndSend(alice, {nonce},async ({events, status}) => {
                if (status.isFinalized) {
                  for (const {event} of events) {
                    if (event.method === 'AddLiquidity') {
                      done();
                    }
                  }
                }
              });

          }
      });
    });

    it('makes a tx using immortal era', async done => {

      const assetBalance = await api.query.genericAsset.freeBalance(16001, bob.address);
      console.log('Balance before ',assetBalance.toString());
      await api.tx.genericAsset
        .transfer(16000, alice.address, 100)
        .signAndSend(bob,
        async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            console.log(events[0].event.method);
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
           done();
          }
        });
      }, 10000000);

    it('makes a tx via send', async done => {
      const nonce = await api.query.system.accountNonce(bob.address);
      // transfer
      const tx = api.tx.genericAsset.transfer(16000, alice.address, 1).sign(bob, {nonce});
      await tx.send(async ({events, status}: SubmittableResult) => {
        if (status.isFinalized) {
          expect(events[0].event.method).toEqual('Transferred');
          expect(events[0].event.section).toEqual('genericAsset');
          done();
        }
      });
    });

    it('makes a tx', async done => {
      const assetBalance = await api.query.genericAsset.freeBalance(16001, bob.address);
      // transfer
      await api.tx.genericAsset
        .transfer(16000, alice.address, 1)
        .signAndSend(bob, async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
    });

    describe('feeExchange extrinsic', () => {
      it('use keypair to sign', async done => {
        const feeExchange = {
          assetId: feeAssetId,
          maxPayment: '50000000000000000',
        };
        const feeExchangeV1 = {FeeExchangeV1 : feeExchange};
        const transactionPayment = {
          tip: '2', feeExchange:  feeExchangeV1,
        };
        const nonce = await api.query.system.accountNonce(alice.address);
         api.tx.genericAsset
          .transfer(16001, bob.address, 100)
          .signAndSend(alice, {transactionPayment,nonce}, ({events, status}) => {
            if (status.isFinalized) {
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
        const nonce = await api.query.system.accountNonce(alice.address);
        const tx = api.tx.genericAsset.transfer(16001, bob.address, 100);
        return tx.signAndSend(alice, {transactionPayment, nonce}, ({events, status}) => {
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
