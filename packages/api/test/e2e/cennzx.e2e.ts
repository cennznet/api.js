// Copyright 2019-2020 Centrality Investments Limited
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

import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
import { Balance } from '@cennznet/types';
const CENNZ = '16000';
const CENTRAPAY = '16001';
const PLUG = '16003';

describe('CENNZX RPC calls testing', () => {
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

  describe('Queries()', () => {

    it("Deposit liquidity in CENNZ asset's pool", async done => {
        const amount = 3_000_000;
        const coreAmount = amount;
        const minLiquidity = 1;
        const nonce = await api.rpc.system.accountNextIndex(alice.address);
      // Add Liquidity for the first time in the pool.
        await api.tx.cennzx
          .addLiquidity(CENNZ, minLiquidity, amount, coreAmount)
          .signAndSend(alice, { nonce }, async ({events, status}) => {
            if (status.isFinalized) {
              for (const {event} of events) {
                if (event.method === 'AddLiquidity') {
                  let amount = 20000;
                  const [coreAmount, investmentAmount] = await api.rpc.cennzx.liquidityPrice(CENNZ, amount);
                  const nonce = await api.rpc.system.accountNextIndex(alice.address);
                  // Deposit liquidity in existing pool
                  await api.tx.cennzx
                      .addLiquidity(CENNZ, minLiquidity, investmentAmount, coreAmount)
                      .signAndSend(alice, { nonce }, async ({events, status}) => {
                        if (status.isFinalized) {
                          for (const {event} of events) {
                            if (event.method === 'AddLiquidity') {
                              done();
                            }
                          }
                        }
                      });
                }
              }
            }
          });
    });

    it("Get the liquidity value for CENNZ asset in Alice's account", async done => {
      const [liquidityVolume, coreValue, assetValue] = await api.rpc.cennzx.liquidityValue(alice.address, CENNZ);
      expect(liquidityVolume.isZero()).toBe(false);
      expect(coreValue.isZero()).toBe(false);
      expect(assetValue.isZero()).toBe(false);
      done();
    });

    describe('Positive flow with liquidity in pool', () => {
      it("Calculate the buy price when buying CENTRAPAY for CENNZ", async done => {
        const amount = 100;
        const poolAssetBalance = await api.derive.cennzx.poolAssetBalance(CENNZ);
        const poolCoreAssetBalance = await api.derive.cennzx.poolCoreAssetBalance(CENNZ);
        console.log('Amount of asset in CENNZ pool:', poolAssetBalance.toString());
        console.log('Amount of core in CENNZ pool:', poolCoreAssetBalance.toString());
        // How much CENTRAPAY will it cost to buy 100 (amount) CENNZ
        const buyPrice = await api.rpc.cennzx.buyPrice(CENTRAPAY, amount, CENNZ);
        console.log('Buy price:', buyPrice.toString());
        expect(buyPrice.toNumber()).toBeGreaterThan(0);
        done();
      });

      it("Calculate the sell price when selling CENNZ for CENTRAPAY ", async done => {
        const amount = 1000;
        // when I sell 1000(amount) CENNZ, how much of CENTRAPAY will I get in return
        const sellPrice = await api.rpc.cennzx
          .sellPrice(CENNZ, amount, CENTRAPAY);
        console.log('Sell price:', sellPrice.toString());
        expect(sellPrice.toNumber()).toBeGreaterThan(0);
        done();
      });

      describe('feeExchange derive queries with positive flow', () => {
        it('Query estimated fee in CENTRAPAY(default fee currency)', async done => {
          const assetBalanceBefore: Balance = await api.query.genericAsset.freeBalance(CENTRAPAY, alice.address);
          const extrinsic = api.tx.genericAsset
            .transfer(CENNZ, bob.address, 10000);
          const feeFromQuery = await api.derive.fees.estimateFee({extrinsic, userFeeAssetId:CENTRAPAY});
          const nonce = await api.rpc.system.accountNextIndex(alice.address);

          await extrinsic.signAndSend(alice, { nonce }, async ({events, status}) => {
            if (status.isFinalized) {
              events.forEach(({phase, event: {data, method, section}}) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
              });
              const assetBalanceAfter: Balance = await api.query.genericAsset.freeBalance(CENTRAPAY, alice.address);
              expect(assetBalanceBefore.sub(assetBalanceAfter).toString()).toEqual(feeFromQuery.toString());
              done();
            }
          });
        });

        it('Query estimated fee in different currency (CENNZ)', async done => {
          const maxPayment = '50000000000000000';
          const assetId = api.registry.createType('AssetId', CENNZ);
          const feeExchange = api.registry.createType('FeeExchange', {assetId, maxPayment}, 0);
          const transactionPayment = api.registry.createType('ChargeTransactionPayment', {tip: 0, feeExchange});
          const extrinsic = api.tx.treasury.reportAwesome('Fantastic Work', alice.address);
          const nonce = await api.rpc.system.accountNextIndex(alice.address);

          const feeFromQuery = await api.derive.fees.estimateFee({extrinsic, userFeeAssetId: CENNZ, maxPayment});
          await extrinsic.signAndSend(alice, { nonce, transactionPayment }, async ({events, status}) => {
            if (status.isFinalized) {
              events.forEach(({phase, event: {data, method, section}}) => {
                if (method === 'AssetBought') {
                  const price = data[3];
                  console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());

                  expect(feeFromQuery).toEqual(price);
                  done();
                }
              });
            }
          });
        });
      });
    });

    describe('Negative flow with no liquidity in pool', () => {
      it("Calculate the buy price when buying CENTRAPAY for PLUG", async done => {
        const amount = 100;
        const poolAssetBalance = await api.derive.cennzx.poolAssetBalance(PLUG);
        const poolCoreAssetBalance = await api.derive.cennzx.poolCoreAssetBalance(PLUG);
        console.log('Amount of asset in PLUG pool:', poolAssetBalance.toString());
        console.log('Amount of core in PLUG pool:', poolCoreAssetBalance.toString());
        // How much CENTRAPAY will it cost to buy 100 (amount) PLUG
        await expect(api.rpc.cennzx.buyPrice(CENTRAPAY, amount, PLUG)).rejects.toThrow(
          '2: Cannot exchange for requested amount.:'
        );
        done();
      });

      it("Calculate the sell price when selling PLUG for CENTRAPAY when no liquidity exist ", async done => {
        const amount = 1000;
        // when I sell 1000(amount) PLUG, how much of CENTRAPAY will I get in return
        await expect(api.rpc.cennzx
          .sellPrice(PLUG, amount, CENTRAPAY)).rejects.toThrow(
          '2: Cannot exchange by requested amount.'
        );
        done();
      });

      describe('feeExchange derive queries with negative flow', () => {

        it('Query estimated fee in different currency (PLUG)', async done => {
          const maxPayment = '50000000000000000';
          const extrinsic = api.tx.genericAsset
            .transfer(CENNZ, bob.address, 10000);
          const feeFromQuery = await api.derive.fees.estimateFee({extrinsic, userFeeAssetId:PLUG, maxPayment});
          expect(feeFromQuery).toEqual(new Error('2: Cannot exchange for requested amount.: '));
          done();
        });
      });
    });

  });
});
