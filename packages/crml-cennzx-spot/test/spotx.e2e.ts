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

/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import {Api} from '@cennznet/api';
import {Keyring} from '@polkadot/api';
import BN from 'bn.js';
import { TypeRegistry } from '@polkadot/types';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import {CennzxSpot} from '../src/CennzxSpot';
import {MAX_U128} from '@cennznet/crml-cennzx-spot/constants';
import ExtrinsicSignatureV2 from '@cennznet/types/extrinsic/v2/ExtrinsicSignature';

const passphrase = '';

const coreAssetId = 16001;
const tradeAssetA = 17233;
const tradeAssetB = 17237;
// const tradeAssetAOnLocal = 16000;
// const tradeAssetBOnLocal = 16002

describe('SpotX APIs', () => {
    let api: Api;
    let alice, bob;
    const url = 'ws://localhost:9944';
    const registry = new TypeRegistry();
    beforeAll(async () => {
      await cryptoWaitReady();
      const keyring = new Keyring({ type: 'sr25519' });
      alice = keyring.addFromUri('//Alice');
      bob = keyring.addFromUri('//Bob');
      api = await Api.create(
        {provider: url,
          types: {
            ExtrinsicSignatureV4: ExtrinsicSignatureV2,
          },
          registry});
    });

    afterAll(async () => {
        api.disconnect();
    });
    describe('Liquidity Operations', () => {

        it("Create GA asset and add liquidity for it to the pool", async done => {
            /**************************************************************/
            /*** Prepare test data to ensure balance *********************/
            /************************************************************/

            const {address} = alice;

            const initialIssuance = new BN(100000000);
            const permissions = {mint: address};
            await api.genericAsset.create({initialIssuance, permissions}).signAndSend(address, async ({status, events}) => {
                    if (status.isFinalized) {
                        let assetCreated = false;
                        let assetId;
                        for (const {event} of events) {
                            if (event.method === "Created") {
                                assetCreated = true;
                                assetId = event.data[0];
                                console.log('Asset id created is '+assetId);
                                break;
                            }
                        }
                        expect(assetCreated).toEqual(true);
                        const assetBalance = await api.genericAsset.getFreeBalance(assetId, address);
                        expect(assetBalance.toString()).toBe(initialIssuance.toString());
                        const amount = initialIssuance.divn(2);
                        const minLiquidity = 1;
                        const [coreAmount, investmentAmount] = await (api.rpc as any).cennzx.liquidityPrice(assetId, amount);
                        expect((await api.genericAsset.getFreeBalance(assetId, address)).gt(investmentAmount)).toBeTruthy();
                        expect((await api.genericAsset.getFreeBalance(coreAssetId, address)).gtn(coreAmount)).toBeTruthy();
                        await api.cennzxSpot
                                .addLiquidity(assetId, minLiquidity, investmentAmount, coreAmount)
                                .signAndSend(address, async ({events, status}) => {
                                    if (status.isFinalized) {
                                        let liquidityCreated = false;
                                        for (const {event} of events) {
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
            const {address} = alice;
            const amount = 1000;
            expect((await api.genericAsset.getFreeBalance(tradeAssetA, address)).gtn(amount)).toBeTruthy();
            const cennzbal = await api.genericAsset.getFreeBalance(tradeAssetA, address);
            const [coreAmount, investmentAmount] = await (api.rpc as any).cennzx.liquidityPrice(tradeAssetA, amount);
            expect((await api.genericAsset.getFreeBalance(tradeAssetA, address)).gt(investmentAmount)).toBeTruthy();
            const minLiquidity = 1;
            await api.cennzxSpot
                .addLiquidity(tradeAssetA, minLiquidity, investmentAmount, coreAmount)
                .signAndSend(address, async ({events, status}) => {
                    if (status.isFinalized) {
                        let liquidityCreated = false;
                        for (const {event} of events) {
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
            const {address} = alice;
            const amount = 1000;
            expect((await api.genericAsset.getFreeBalance(tradeAssetB, address)).gtn(amount)).toBeTruthy();
            const cennzbal = await api.genericAsset.getFreeBalance(tradeAssetB, address);
            const [coreAmount, investmentAmount] = await (api.rpc as any).cennzx.liquidityPrice(tradeAssetB, amount);
            expect((await api.genericAsset.getFreeBalance(tradeAssetB, address)).gt(investmentAmount)).toBeTruthy();
            const minLiquidity = 1;
            await api.cennzxSpot
                .addLiquidity(tradeAssetB, minLiquidity, investmentAmount, coreAmount)
                .signAndSend(address, async ({events, status}) => {
                    if (status.isFinalized) {
                        let liquidityCreated = false;
                        for (const {event} of events) {
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
            const liquidatedAsset = await api.cennzxSpot.assetToWithdraw(tradeAssetA, removeLiquidity);
            await api.cennzxSpot
                .removeLiquidity(tradeAssetA, removeLiquidity, 1, 1)
                .signAndSend(alice, async ({events, status}) => {
                    if (status.isFinalized && events !== undefined) {
                        let isRemoved = false;
                        for (const {event} of events) {
                            if (event.method === 'RemoveLiquidity') {
                                isRemoved = true;
                                const totalLiquidity = await api.cennzxSpot.getTotalLiquidity(tradeAssetA);
                                expect(totalLiquidityBefore.subn(removeLiquidity)).toBeTruthy();
                                const coreFromEvent = event.data[1];
                                const assetFromEvent = event.data[3];
                                expect(assetFromEvent.eq(liquidatedAsset.assetAmount)).toBeTruthy();
                                expect(coreFromEvent.eq(liquidatedAsset.coreAmount)).toBeTruthy();
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob.address, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
            .signAndSend(bob, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    let trade = false;
                    for (const {event} of events) {
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
