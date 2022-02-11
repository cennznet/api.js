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
import { Api } from '@cennznet/api';
import {SignerOptions} from "@polkadot/api/types";
import { Keyring } from '@polkadot/keyring';
import {BN} from "@polkadot/util";
import { cryptoWaitReady } from '@polkadot/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
import {Balance, LiquidityPriceResponse, LiquidityValueResponse} from '@cennznet/types';
const CENNZ = '16000';
const CENTRAPAY = '16001';
const PLUG = '16003';

describe('CENNZX RPC calls testing', () => {
  let api: Api;
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
      // Add Liquidity for the first time in the pool.
        await api.tx.cennzx
          .addLiquidity(CENNZ, minLiquidity, amount, coreAmount)
          .signAndSend(alice, async ({events, status}) => {
            if (status.isInBlock) {
              for (const {event} of events) {
                if (event.method === 'AddLiquidity') {
                  let amount = 2000;
                  const liquidityPrice: LiquidityPriceResponse = await api.rpc.cennzx.liquidityPrice(CENNZ, amount);
                  // Deposit liquidity in existing pool
                  await api.tx.cennzx
                      .addLiquidity(CENNZ, minLiquidity, liquidityPrice.asset, liquidityPrice.core)
                      .signAndSend(alice, async ({events, status}) => {
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
      const liquidityValue: LiquidityValueResponse = await api.rpc.cennzx.liquidityValue(alice.address, CENNZ);
      expect(liquidityValue.liquidity.isZero()).toBe(false);
      expect(liquidityValue.core.isZero()).toBe(false);
      expect(liquidityValue.asset.isZero()).toBe(false);
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
        expect(buyPrice.price.toNumber()).toBeGreaterThan(0);
        done();
      });

      it("Calculate the sell price when selling CENNZ for CENTRAPAY ", async done => {
        const amount = 1000;
        // when I sell 1000(amount) CENNZ, how much of CENTRAPAY will I get in return
        const sellPrice = await api.rpc.cennzx
          .sellPrice(CENNZ, amount, CENTRAPAY);
        expect(sellPrice.price.toNumber()).toBeGreaterThan(0);
        done();
      });

      describe('feeExchange derive queries with positive flow', () => {
        it('Query estimated fee in CENTRAPAY(default fee currency)', async done => {
          const assetBalanceBefore = await api.query.genericAsset.freeBalance(CENTRAPAY, alice.address);
          const extrinsic = api.tx.genericAsset
            .transfer(CENNZ, bob.address, 10000);
          const feeFromQuery = await api.derive.fees.estimateFee({extrinsic, userFeeAssetId:CENTRAPAY});

          await extrinsic.signAndSend(alice,  async ({events, status}) => {
            if (status.isFinalized) {
              events.forEach(({phase, event: {data, method, section}}) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
              });
              const assetBalanceAfter = await api.query.genericAsset.freeBalance(CENTRAPAY, alice.address);
              expect((assetBalanceBefore as Balance).toBn().sub((assetBalanceAfter as Balance).toBn()).toString()).toEqual(feeFromQuery.toString());
              done();
            }
          });
        });

        it('Query estimated fee in different currency (CENNZ)', async done => {
          const maxPayment = '50000000000000000';
          const assetId = api.registry.createType('AssetId', CENNZ);
          const feeExchange = api.registry.createType('FeeExchange', {assetId, maxPayment}, 0);
          const transactionPayment = api.registry.createType('ChargeTransactionPayment', {tip: 0, feeExchange});
          const royaltiesSchedule = null;
          const extrinsic = api.tx.nft.createCollection(
            'collectionName',
            royaltiesSchedule
          );

          const feeFromQuery = await api.derive.fees.estimateFee({extrinsic, userFeeAssetId: CENNZ, maxPayment});
          await extrinsic.signAndSend(alice,  {transactionPayment} as Partial<SignerOptions>, async ({events, status}) => {
            if (status.isFinalized) {
              events.forEach(({phase, event: {data, method, section}}) => {
                if (method === 'AssetBought') {
                  const price = data[3];
                  console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                  expect(feeFromQuery.toString()).toEqual(price.toString());
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
