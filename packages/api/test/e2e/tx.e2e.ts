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

import { AssetOptions, AssetInfo } from '@cennznet/types';
import { SubmittableResult } from '@polkadot/api';
import { cryptoWaitReady } from '@plugnet/util-crypto';
import testKeyring from '@polkadot/keyring/testing';
import { stringToHex } from '@polkadot/util';
import initApiPromise from '../../../../jest/initApiPromise';

describe('e2e transactions', () => {
  let api;
  let alice, bob;
  beforeAll(async () => {
    await cryptoWaitReady();
    api = await initApiPromise();
    const keyring = testKeyring();
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');
  });

  afterAll(async () => {
    api.disconnect();
  });

  describe('Send', () => {

    it('makes a tx using immortal era', async done => {
      const assetBalance = await api.query.genericAsset.freeBalance(16001, bob.address);
      console.log('Balance before ', assetBalance.toString());
      const nonce = await api.query.system.accountNonce(bob.address);

      await api.tx.genericAsset
        .transfer(16001, alice.address, 100)
        .signAndSend(bob, { nonce },
          async ({ events, status }: SubmittableResult) => {
            if (status.isFinalized) {
              console.log(events[0].event.method);
              expect(events[0].event.method).toEqual('Transferred');
              expect(events[0].event.section).toEqual('genericAsset');
              done();
            }
          });
    });

    it('makes a tx via send', async done => {
      const nonce = await api.query.system.accountNonce(bob.address);
      // transfer
      const tx = api.tx.genericAsset.transfer(16000, alice.address, 1).sign(bob, { nonce });
      await tx.send(async ({ events, status }: SubmittableResult) => {
        if (status.isFinalized) {
          expect(events[0].event.method).toEqual('Transferred');
          expect(events[0].event.section).toEqual('genericAsset');
          done();
        }
      });
    });

    it('makes a tx', async done => {
      const nonce = await api.query.system.accountNonce(bob.address);
      await api.tx.genericAsset
        .transfer(16000, alice.address, 1)
        .signAndSend(bob, { nonce }, async ({ events, status }: SubmittableResult) => {
          if (status.isFinalized) {
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
    });

    describe('Custom fee asset extrinsics', () => {

      // A generic asset to be used for fee payment
      let feeAssetId;

      beforeAll(async done => {
        // Create a new generic asset and mint a liquidity pool on CENNZX.
        // This fee asset will be used for fee payment in place of the default asset, CPAY.

        let createFeeAssetTx = api.tx.genericAsset.create(
          alice.address,
          new AssetOptions(
            api.registry,
            {
              initialIssuance: 900_000_000_000_000,
              permissions: {
                update: alice.address,
                mint: alice.address,
                burn: alice.address,
              },
            }),
          new AssetInfo(
            api.registry,
            {
              symbol: 'TEST',
              decimalPlaces: 4
            }
          )
        );

        // Creating new GAs requires sudo permission
        const sudoAddress = await api.query.sudo.key();
        // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
        const sudoKeypair = testKeyring().getPair(sudoAddress.toString());
        const nonce = await api.query.system.accountNonce(sudoAddress);

        await api.tx.sudo.sudo(createFeeAssetTx).signAndSend(sudoKeypair, { nonce }, async ({ status, events }) => {
          if (status.isInBlock) {
            events.forEach(async ({ phase, event: { data, method, section } }) => {
              if (method === 'Created' && section === 'genericAsset') {
                feeAssetId = data[0];

                // Setup fee asset <> CPAY liquidity
                let desiredLiquidity = 30_000_000_000_000;
                let minimumLiquidity = 1;
                const [coreInvestment, feeInvestment] = await (api.rpc as any).cennzx.liquidityPrice(feeAssetId, desiredLiquidity);
                await api.tx.cennzxSpot
                  .addLiquidity(feeAssetId, minimumLiquidity, feeInvestment, coreInvestment)
                  .signAndSend(alice, { nonce: nonce + 1 }, async ({ events, status }) => {
                    if (status.isInBlock) {
                      for (const { event } of events) {
                        if (event.method === 'AddLiquidity') {
                          done();
                        }
                      }
                    }
                  });

              }
            });
          }
        });

      });

      it('use keypair to sign', async done => {
        const feeExchange = {
          FeeExchangeV1: {
            assetId: feeAssetId,
            maxPayment: 50_000_000_000,
          }
        };
        const transactionPayment = {
          tip: 2,
          feeExchange
        };
        const nonce = await api.query.system.accountNonce(alice.address);
        api.tx.genericAsset
          .transfer(16001, bob.address, 100)
          .signAndSend(alice, { nonce, transactionPayment }, ({ events, status }) => {
            if (status.isFinalized) {
              events.forEach(({ phase, event: { data, method, section } }) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
              });
              done();
            }
          });
      });

      it('use signer', async done => {
        const feeExchange = {
          FeeExchangeV1: {
            assetId: feeAssetId,
            maxPayment: 50_000_000_000,
          }
        };
        const transactionPayment = {
          tip: 2,
          feeExchange,
        };
        const nonce = await api.query.system.accountNonce(alice.address);
        const tx = api.tx.genericAsset.transfer(16001, bob.address, 100);
        return tx.signAndSend(alice, { nonce, transactionPayment }, ({ events, status }) => {
          console.log('Transaction status:', status.type);
          if (status.isFinalized) {
            console.log('Completed at block hash', status.value.toHex());
            console.log('Events:');

            events.forEach(({ phase, event: { data, method, section } }) => {
              console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
            done();
          }
        });
      });

      it('update asset info', async done => {
        const nonce = await api.query.system.accountNonce(alice.address);
        await api.tx.genericAsset.updateAssetInfo(
          feeAssetId,
          new AssetInfo(
            api.registry,
            {
              symbol: 'NEW_ASSET_ID',
              decimalPlaces: 5
            }
          )
        ).signAndSend(alice, { nonce }, async ({ events, status }) => {
          console.log('Transaction status:', status.type);
          if (status.isFinalized) {
            expect(events[0].event.section).toEqual('genericAsset');
            expect(events[0].event.method).toEqual('AssetInfoUpdated');
            expect(events[0].event.data[0]).toEqual(feeAssetId); // ID
            expect(events[0].event.data[1].toJSON()).toEqual({
              decimalPlaces: 5,
              symbol: stringToHex('NEW_ASSET_ID')
            });

            done();
          }
        });
      });

    });

  });

});
