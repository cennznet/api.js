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

import BN from 'bn.js';

import { Api } from '@cennznet/api';
import { MAX_U128 } from '@cennznet/crml-cennzx-spot/constants';
import testKeyring from '@polkadot/keyring/testing';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiPromise from '../../../jest/initApiPromise';

const coreAssetId = 16001;
const tradeAssetA = 17233;
const tradeAssetB = 17237;

describe('SpotX APIs', () => {
  let api: Api;
  let alice, bob;

  beforeAll(async () => {
    await cryptoWaitReady();
    const keyring = testKeyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');
    api = await initApiPromise();
  });

  afterAll(async () => {
    await api.disconnect();
  });

  describe('Liquidity Operations', () => {

    it("Create GA asset and add liquidity for it to the pool", async done => {
      /**************************************************************/
      /*** Prepare test data to ensure balance *********************/
      /************************************************************/

      const { address } = alice;

      const initialIssuance = 100000000;
      const permissions = { mint: address };
      await api.tx.genericAsset.create({ initialIssuance, permissions }).signAndSend(address, async ({ status, events }) => {
        if (status.isFinalized) {
          let assetCreated = false;
          let assetId;
          for (const { event } of events) {
            if (event.method === "Created") {
              assetCreated = true;
              assetId = event.data[0];
              console.log('Asset id created is ' + assetId);
              break;
            }
          }
          expect(assetCreated).toBeTruthy();
          const assetBalance = await api.query.genericAsset.freeBalance(assetId, address);
          expect(assetBalance.toString()).toBe(initialIssuance.toString());
          const amount = initialIssuance / 2;
          const minLiquidity = 1;
          const [coreAmount, investmentAmount] = await (api.rpc as any).cennzx.liquidityPrice(assetId, amount);

          api.query.genericAsset.freeBalance(assetId, address)
            .then(freeBalance => expect(freeBalance).toBeGreaterThan(investmentAmount));

          api.query.genericAsset.freeBalance(coreAssetId, address)
            .then(freeBalance => expect(freeBalance).toBeGreaterThanOrEqual(coreAmount));

          await api.cennzxSpot
            .addLiquidity(assetId, minLiquidity, investmentAmount, coreAmount)
            .signAndSend(address, async ({ events, status }) => {
              if (status.isFinalized) {
                let liquidityCreated = false;
                for (const { event } of events) {
                  if (event.method === 'AddLiquidity') {
                    liquidityCreated = true;
                    const [account, coreInvestAmount, assetIdFromChain, targetInvestAmount] = event.data;
                    expect(account.toString()).toEqual(address);
                    expect((assetIdFromChain as unknown) as BN).toEqual(assetId);
                    expect(((coreInvestAmount as unknown) as BN).toNumber()).toEqual(coreAmount);
                    expect(
                      ((targetInvestAmount as unknown) as BN).lte(new BN(investmentAmount))
                    ).toBeTruthy();
                    const liquidity = await api.cennzxSpot.getLiquidityBalance(assetId, alice.address);
                    expect(liquidity.gtn(0)).toBeTruthy();
                  }
                }
                // return isCreated event
                expect(liquidityCreated).toEqual(true);
                done();
              }
            });
        }
      });
    });

    it("Deposit liquidity in existing pool' event", async done => {
      /**************************************************************/
      /*** Prepare test data to ensure balance *********************/
      /************************************************************/
      const { address } = alice;
      const amount = 1000;
      api.query.genericAsset.freeBalance(tradeAssetA, address)
        .then(freeBalance => expect(freeBalance).toBeGreaterThanOrEqual(amount));
      const [coreAmount, investmentAmount] = await (api.rpc as any).cennzx.liquidityPrice(tradeAssetA, amount);
      api.query.genericAsset.freeBalance(tradeAssetA, address)
        .then(freeBalance => expect(freeBalance).toBeGreaterThan(investmentAmount));
      const minLiquidity = 1;
      await api.cennzxSpot
        .addLiquidity(tradeAssetA, minLiquidity, investmentAmount, coreAmount)
        .signAndSend(address, async ({ events, status }) => {
          if (status.isFinalized) {
            let liquidityCreated = false;
            for (const { event } of events) {
              if (event.method === 'AddLiquidity') {
                liquidityCreated = true;
                const [account, coreInvestAmount, assetIdFromChain, targetInvestAmount] = event.data;
                expect(account.toString()).toEqual(address);
                expect(((assetIdFromChain as unknown) as BN).toNumber()).toEqual(tradeAssetA);
                expect(((coreInvestAmount as unknown) as BN).toNumber()).toEqual(coreAmount);
                expect(
                  ((targetInvestAmount as unknown) as BN).lte(new BN(investmentAmount))
                ).toBeTruthy();
                const liquidity = await api.cennzxSpot.getLiquidityBalance(tradeAssetA, address);
                expect(liquidity.gtn(0)).toBeTruthy();
              }
            }
            // return isCreated event
            expect(liquidityCreated).toEqual(true);
            done();
          }
        });
    });

    it("Deposit liquidity in second asset's existing pool' event", async done => {
      /**************************************************************/
      /*** Prepare test data to ensure balance *********************/
      /************************************************************/
      const { address } = alice;
      const amount = 1000;
      api.query.genericAsset.freeBalance(tradeAssetB, address)
        .then(freeBalance => expect(freeBalance).toBeGreaterThanOrEqual(amount));

      const [coreAmount, investmentAmount] = await (api.rpc as any).cennzx.liquidityPrice(tradeAssetB, amount);

      api.query.genericAsset.freeBalance(tradeAssetB, address)
        .then(freeBalance => expect(freeBalance).toBeGreaterThan(investmentAmount));

      const minLiquidity = 1;
      await api.cennzxSpot
        .addLiquidity(tradeAssetB, minLiquidity, investmentAmount, coreAmount)
        .signAndSend(address, async ({ events, status }) => {
          if (status.isFinalized) {
            let liquidityCreated = false;
            for (const { event } of events) {
              if (event.method === 'AddLiquidity') {
                liquidityCreated = true;
                const [account, coreInvestAmount, assetIdFromChain, targetInvestAmount] = event.data;
                expect(account.toString()).toEqual(address);
                expect(((assetIdFromChain as unknown) as BN).toNumber()).toEqual(tradeAssetB);
                expect(((coreInvestAmount as unknown) as BN).toNumber()).toEqual(coreAmount);
                expect(
                  ((targetInvestAmount as unknown) as BN).lte(new BN(investmentAmount))
                ).toBeTruthy();
                const liquidity = await api.cennzxSpot.getLiquidityBalance(tradeAssetB, address);
                expect(liquidity.gtn(0)).toBeTruthy();
              }
            }
            // return isCreated event
            expect(liquidityCreated).toEqual(true);
            done();
          }
        });
    });


    it("Remove liquidity and receive 'RemoveLiquidity' event", async done => {
      const totalLiquidityBefore = await api.cennzxSpot.getTotalLiquidity(tradeAssetA);
      const removeLiquidity = 10;
      expect(totalLiquidityBefore.gtn(removeLiquidity)).toBeTruthy();
      const { coreAmount, assetAmount } = await api.cennzxSpot.assetToWithdraw(tradeAssetA, removeLiquidity);
      await api.cennzxSpot
        .removeLiquidity(tradeAssetA, removeLiquidity, 1, 1)
        .signAndSend(alice, async ({ events, status }) => {
          if (status.isFinalized && events !== undefined) {
            let isRemoved = false;
            for (const { event } of events) {
              if (event.method === 'RemoveLiquidity') {
                isRemoved = true;
                const totalLiquidity = await api.cennzxSpot.getTotalLiquidity(tradeAssetA);
                expect(totalLiquidityBefore.subn(removeLiquidity)).toBeTruthy();
                const coreFromEvent = event.data[1];
                const assetFromEvent = event.data[3];
                expect(assetFromEvent.eq(assetAmount)).toBeTruthy();
                expect(coreFromEvent.eq(coreAmount)).toBeTruthy();
              }
            }
            // return isCreated event
            expect(isRemoved).toEqual(true);
            done();
          }
        });
    });
  });

  it('can trade from asset to core for exact core asset amount', async done => {
    const amountBought = 50;
    const expectedCorePrice = await (api.rpc as any).cennzx.buyPrice(tradeAssetA, amountBought, coreAssetId);
    const buffer = 1000;
    await api.cennzxSpot
      .assetSwapOutput(tradeAssetA, coreAssetId, amountBought, expectedCorePrice.addn(buffer))
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const price = event.data[3];
              expect(price.eq(expectedCorePrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });
  it('can trade from core to asset for exact trade asset amount', async done => {
    const amountBought = 50;
    const expectedAssetPrice = await (api.rpc as any).cennzx.buyPrice(coreAssetId, amountBought, tradeAssetA);
    const buffer = 1000;
    await api.cennzxSpot
      .assetSwapOutput(coreAssetId, tradeAssetA, amountBought, expectedAssetPrice.addn(buffer))
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const price = event.data[3];
              expect(price.eq(expectedAssetPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  // TODO: Once RIMU is deployed with latest CENNZnet node then undo the skip and test
  it.skip('can trade from core to asset for exact core asset amount', async done => {
    const sellAmount = 50;
    const expectedAssetPrice = await (api.rpc as any).cennzx.sellPrice(coreAssetId, sellAmount, tradeAssetA);
    const minReceive = 1;
    await api.cennzxSpot
      .assetSwapInput(coreAssetId, tradeAssetA, sellAmount, minReceive)
      .signAndSend(bob.address, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const sellValue = event.data[4];
              expect(sellValue.eq(expectedAssetPrice)).toBeTruthy();
              done();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  // TODO: Once RIMU is deployed with latest CENNZnet node then undo the skip and test
  it.skip('Get core asset from seller and transfer trade asset to alice for exact trade asset amount', async done => {
    const sellAmount = 50;
    const expectedPrice = await (api.rpc as any).cennzx.sellPrice(coreAssetId, sellAmount, tradeAssetA);
    const minReceive = 1;
    await api.cennzxSpot
      .assetTransferInput(alice.address, coreAssetId, tradeAssetA, sellAmount, minReceive)
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const sellValue = event.data[4];
              expect(sellValue.eq(expectedPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  it('can trade from asset to core for exact trade asset amount', async done => {
    const sellAmount = 50;
    const expectedCorePrice = await (api.rpc as any).cennzx.sellPrice(tradeAssetA, sellAmount, coreAssetId);
    const minReceive = 1;
    await api.cennzxSpot
      .assetSwapInput(tradeAssetA, coreAssetId, sellAmount, minReceive)
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const sellValue = event.data[4];
              expect(sellValue.eq(expectedCorePrice)).toBeTruthy();
              done();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  it('Get trade asset from seller and transfer core asset to alice for exact trade asset amount', async done => {
    const sellAmount = 50;
    const expectedPrice = await (api.rpc as any).cennzx.sellPrice(tradeAssetA, sellAmount, coreAssetId);
    const minReceive = 1;
    await api.cennzxSpot
      .assetTransferInput(alice.address, tradeAssetA, coreAssetId, sellAmount, minReceive)
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const sellValue = event.data[4];
              expect(sellValue.eq(expectedPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  it('Get trade asset from buyer and transfer core asset to alice for exact core asset amount', async done => {
    const amountBought = 50;
    const expectedPrice = await (api.rpc as any).cennzx.buyPrice(tradeAssetA, amountBought, coreAssetId);
    const buffer = 100;
    await api.cennzxSpot
      .assetTransferOutput(alice.address, tradeAssetA, coreAssetId, amountBought, expectedPrice.addn(buffer))
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const price = event.data[3];
              expect(price.eq(expectedPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  it('Get core asset from buyer and transfer trade asset to alice for exact trade asset amount', async done => {
    const amountBought = 50;
    const expectedPrice = await (api.rpc as any).cennzx.buyPrice(coreAssetId, amountBought, tradeAssetA);
    const buffer = 100;
    await api.cennzxSpot
      .assetTransferOutput(alice.address, coreAssetId, tradeAssetA, amountBought, expectedPrice.addn(buffer))
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const price = event.data[3];
              expect(price.eq(expectedPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });


  it('can trade from asset "A" to asset "B" with exact asset B amount and max A amount', async done => {
    const amountBought = 50;
    const expectedPrice = await (api.rpc as any).cennzx.buyPrice(tradeAssetA, amountBought, tradeAssetB);
    const buffer = 100;
    await api.cennzxSpot
      .assetSwapOutput(tradeAssetA, tradeAssetB, amountBought, expectedPrice.addn(buffer))
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const price = event.data[3];
              expect(price.eq(expectedPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  it('can trade from asset "A" to asset "B" with exact asset B amount and max A amount and transfer asset "B" to alice', async done => {
    const amountBought = 50;
    const expectedPrice = await (api.rpc as any).cennzx.buyPrice(tradeAssetA, amountBought, tradeAssetB);
    const buffer = 100;
    await api.cennzxSpot
      .assetTransferOutput(alice.address, tradeAssetA, tradeAssetB, amountBought, expectedPrice.addn(buffer))
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              // check if ExtrinsicFailed or successful
              trade = true;
              const price = event.data[3];
              expect(price.eq(expectedPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  // TODO: Once RIMU is deployed with latest CENNZnet node then undo the skip and test
  it.skip('can trade from asset "A" to asset "B" with exact asset A amount and min B amount', async done => {
    const sellAmount = 50;
    const expectedPrice = await (api.rpc as any).cennzx.sellPrice(tradeAssetA, sellAmount, tradeAssetB);
    const minReceive = 1;
    await api.cennzxSpot
      .assetSwapInput(tradeAssetA, tradeAssetB, sellAmount, minReceive)
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              //check if ExtrinsicFailed or successful
              trade = true;
              const sellValue = event.data[4];
              expect(sellValue.eq(expectedPrice)).toBeTruthy();
              done();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  // TODO: Once RIMU is deployed with latest CENNZnet node then undo the skip and test
  it.skip('can trade from asset "A" to asset "B" with exact asset A amount and min B amount and transfer asset "B" to alice', async done => {
    const sellAmount = 50;
    const expectedPrice = await (api.rpc as any).cennzx.sellPrice(tradeAssetA, sellAmount, tradeAssetB);
    const minReceive = 1;
    await api.cennzxSpot
      .assetTransferInput(alice.address, tradeAssetA, tradeAssetB, sellAmount, minReceive)
      .signAndSend(bob, async ({ events, status }) => {
        if (status.isFinalized && events !== undefined) {
          let trade = false;
          for (const { event } of events) {
            if (event.method === 'AssetPurchase') {
              //check if ExtrinsicFailed or successful
              trade = true;
              const sellValue = event.data[4];
              expect(sellValue.eq(expectedPrice)).toBeTruthy();
            }
          }
          expect(trade).toEqual(true);
          done();
        }
      });
  });

  describe('queries', () => {
    it('Get Pool trade asset balance and try to get input price', async () => {
      const poolAssetBalance = await api.cennzxSpot.getPoolAssetBalance(tradeAssetA);
      const poolCoreBalance = await api.cennzxSpot.getPoolCoreAssetBalance(tradeAssetA);
      expect(poolAssetBalance.gtn(0)).toBeTruthy();
      expect(poolCoreBalance.gtn(0)).toBeTruthy();
      const sellAmount = 50;
      const maxPrice = await (api.rpc as any).cennzx.buyPrice(coreAssetId, sellAmount, tradeAssetA);
      expect(maxPrice).toStrictEqual(new BN(MAX_U128));
      // console.log('Balance:'+poolCoreBalance);
      // console.log('Asset Balance:'+poolAssetBalance);
    });
  });
});
