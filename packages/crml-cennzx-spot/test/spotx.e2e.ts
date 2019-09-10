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
import {SimpleKeyring, Wallet} from '@cennznet/wallet';
import {GenericAsset} from '@cennznet/crml-generic-asset';
import BN from 'bn.js';
import {CennzxSpot} from '../src/CennzxSpot';
import {MAX_U128} from '@cennznet/crml-cennzx-spot/constants';

const investor = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};

const investorOnLocal = {
    address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    uri: '//Bob',
};

const trader = investor;

const recipient = {
    //addressOnLocal: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
    address: '5ESNjjzmZnnCdrrpUo9TBKhDV1sakTjkspw2ZGg84LAK1e1Y',
};

const passphrase = '';

const coreAssetId = 16001;
const tradeAssetA = 17233;
const tradeAssetB = 17237;
// const tradeAssetAOnLocal = 16000;
// const tradeAssetBOnLocal = 16002

describe('SpotX APIs', () => {
    let api: Api;
    let cennzxSpot: CennzxSpot;
    let ga: GenericAsset;
    beforeAll(async () => {
        api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
        //api = await Api.create({provider: undefined});
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromUri(investor.uri);
        const wallet = new Wallet();
        await wallet.createNewVault(passphrase);
        await wallet.addKeyring(simpleKeyring);
        api.setSigner(wallet);
        cennzxSpot = api.cennzxSpot;
        ga = api.genericAsset;
    });

    afterAll(async () => {
        api.disconnect();
    });
    describe('Liquidity Operations', () => {

        it("Create GA asset and add liquidity for it to the pool", async done => {
            /**************************************************************/
            /*** Prepare test data to ensure balance *********************/
            /************************************************************/

            const {address} = investor;

            const initialIssuance = 100000000;
            const permissions = {mint: address};
            await ga.create({initialIssuance, permissions}).signAndSend(address, async ({status, events}) => {
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
                        const assetBalance = await ga.getFreeBalance(assetId, address);
                        expect(assetBalance.toString()).toBe(initialIssuance.toString());
                        const coreAmount = initialIssuance/2;
                        const minLiquidity = 1;
                        const investmentAmount = await cennzxSpot.liquidityPrice(assetId, coreAmount);
                        expect((await ga.getFreeBalance(assetId, address)).gt(investmentAmount)).toBeTruthy();
                        expect((await ga.getFreeBalance(coreAssetId, address)).gtn(coreAmount)).toBeTruthy();
                        await cennzxSpot
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
                                                const liquidity = await cennzxSpot.getLiquidityBalance(assetId, investor.address);
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
            const {address} = investor;
            const coreAmount = 1000;
            expect((await ga.getFreeBalance(tradeAssetA, address)).gtn(coreAmount)).toBeTruthy();
            const cennzbal = await ga.getFreeBalance(tradeAssetA, address);
            const investmentAmount = await cennzxSpot.liquidityPrice(tradeAssetA, coreAmount);
            expect((await ga.getFreeBalance(tradeAssetA, address)).gt(investmentAmount)).toBeTruthy();
            const minLiquidity = 1;
            await cennzxSpot
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
                                const liquidity = await cennzxSpot.getLiquidityBalance(tradeAssetA, address);
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
            const {address} = investor;
            const coreAmount = 1000;
            expect((await ga.getFreeBalance(tradeAssetB, address)).gtn(coreAmount)).toBeTruthy();
            const cennzbal = await ga.getFreeBalance(tradeAssetB, address);
            const investmentAmount = await cennzxSpot.liquidityPrice(tradeAssetB, coreAmount);
            expect((await ga.getFreeBalance(tradeAssetB, address)).gt(investmentAmount)).toBeTruthy();
            const minLiquidity = 1;
            await cennzxSpot
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
                                const liquidity = await cennzxSpot.getLiquidityBalance(tradeAssetB, address);
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
            const totalLiquidityBefore = await cennzxSpot.getTotalLiquidity(tradeAssetA);
            const removeLiquidity = 10;
            expect(totalLiquidityBefore.gtn(removeLiquidity)).toBeTruthy();
            const {coreAmount, assetAmount} = await cennzxSpot.assetToWithdraw(tradeAssetA, removeLiquidity);
            await cennzxSpot
                .removeLiquidity(tradeAssetA, removeLiquidity, 1, 1)
                .signAndSend(investor.address, async ({events, status}) => {
                    if (status.isFinalized && events !== undefined) {
                        let isRemoved = false;
                        for (const {event} of events) {
                            if (event.method === 'RemoveLiquidity') {
                                isRemoved = true;
                                const totalLiquidity = await cennzxSpot.getTotalLiquidity(tradeAssetA);
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
        const expectedCorePrice = await cennzxSpot.getOutputPrice(tradeAssetA, coreAssetId, amountBought);
        const buffer = 1000;
        await cennzxSpot
            .assetSwapOutput(tradeAssetA, coreAssetId, amountBought, expectedCorePrice.addn(buffer))
            .signAndSend(trader.address, async ({events, status}) => {
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
        const expectedAssetPrice = await cennzxSpot.getOutputPrice(coreAssetId, tradeAssetA, amountBought);
        const buffer = 1000;
        await cennzxSpot
            .assetSwapOutput(coreAssetId, tradeAssetA, amountBought, expectedAssetPrice.addn(buffer))
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('can trade from core to asset for exact core asset amount', async done => {
        const sellAmount = 50;
        const expectedAssetPrice = await cennzxSpot.getInputPrice(coreAssetId, tradeAssetA, sellAmount);
        const minReceive = 1;
        await cennzxSpot
            .assetSwapInput(coreAssetId, tradeAssetA, sellAmount, minReceive)
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('Get core asset from seller and transfer trade asset to recipient for exact trade asset amount', async done => {
        const sellAmount = 50;
        const expectedPrice = await cennzxSpot.getInputPrice(coreAssetId, tradeAssetA, sellAmount);
        const minReceive = 1;
        await cennzxSpot
            .assetTransferInput(recipient.address, coreAssetId, tradeAssetA, sellAmount, minReceive)
            .signAndSend(trader.address, async ({events, status}) => {
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
        const expectedCorePrice = await cennzxSpot.getInputPrice(tradeAssetA, coreAssetId, sellAmount);
        const minReceive = 1;
        await cennzxSpot
            .assetSwapInput(tradeAssetA, coreAssetId, sellAmount, minReceive)
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('Get trade asset from seller and transfer core asset to recipient for exact trade asset amount', async done => {
        const sellAmount = 50;
        const expectedPrice = await cennzxSpot.getInputPrice(tradeAssetA, coreAssetId, sellAmount);
        const minReceive = 1;
        await cennzxSpot
            .assetTransferInput(recipient.address, tradeAssetA, coreAssetId, sellAmount, minReceive)
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('Get trade asset from buyer and transfer core asset to recipient for exact core asset amount', async done => {
        const amountBought = 50;
        const expectedPrice = await cennzxSpot.getOutputPrice(tradeAssetA, coreAssetId, amountBought);
        const buffer = 100;
        await cennzxSpot
            .assetTransferOutput(recipient.address, tradeAssetA, coreAssetId, amountBought, expectedPrice.addn(buffer))
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('Get core asset from buyer and transfer trade asset to recipient for exact trade asset amount', async done => {
        const amountBought = 50;
        const expectedPrice = await cennzxSpot.getOutputPrice(coreAssetId, tradeAssetA, amountBought);
        const buffer = 100;
        await cennzxSpot
            .assetTransferOutput(recipient.address, coreAssetId, tradeAssetA, amountBought, expectedPrice.addn(buffer))
            .signAndSend(trader.address, async ({events, status}) => {
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
        const expectedPrice = await cennzxSpot.getOutputPrice(tradeAssetA, tradeAssetB, amountBought);
        const buffer = 100;
        await cennzxSpot
            .assetSwapOutput(tradeAssetA, tradeAssetB, amountBought, expectedPrice.addn(buffer))
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('can trade from asset "A" to asset "B" with exact asset B amount and max A amount and transfer asset "B" to recipient', async done => {
        const amountBought = 50;
        const expectedPrice = await cennzxSpot.getOutputPrice(tradeAssetA, tradeAssetB, amountBought);
        const buffer = 100;
        await cennzxSpot
            .assetTransferOutput(recipient.address, tradeAssetA, tradeAssetB, amountBought, expectedPrice.addn(buffer))
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('can trade from asset "A" to asset "B" with exact asset A amount and min B amount', async done => {
        const sellAmount = 50;
        const expectedPrice = await cennzxSpot.getInputPrice(tradeAssetA, tradeAssetB, sellAmount);
        const minReceive = 1;
        await cennzxSpot
            .assetSwapInput(tradeAssetA, tradeAssetB, sellAmount, minReceive)
            .signAndSend(trader.address, async ({events, status}) => {
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

    it('can trade from asset "A" to asset "B" with exact asset A amount and min B amount and transfer asset "B" to recipient', async done => {
        const sellAmount = 50;
        const expectedPrice = await cennzxSpot.getInputPrice(tradeAssetA, tradeAssetB, sellAmount);
        const minReceive = 1;
        await cennzxSpot
            .assetTransferInput(recipient.address, tradeAssetA, tradeAssetB, sellAmount, minReceive)
            .signAndSend(trader.address, async ({events, status}) => {
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
            const poolAssetBalance = await cennzxSpot.getPoolAssetBalance(tradeAssetA);
            const poolCoreBalance = await cennzxSpot.getPoolCoreAssetBalance(tradeAssetA);
            expect(poolAssetBalance.gtn(0)).toBeTruthy();
            expect(poolCoreBalance.gtn(0)).toBeTruthy();
            const maxPrice = await cennzxSpot.getOutputPrice(coreAssetId, tradeAssetA, poolAssetBalance);
            expect(maxPrice).toStrictEqual(new BN(MAX_U128));
            // console.log('Balance:'+poolCoreBalance);
            // console.log('Asset Balance:'+poolAssetBalance);
            await expect(cennzxSpot.getOutputPrice(coreAssetId, tradeAssetA, poolAssetBalance.addn(1))).rejects.toThrow(
                'Pool balance is low'
            );
            await expect(cennzxSpot.getOutputPrice(coreAssetId, tradeAssetA, poolAssetBalance)).resolves;
            await expect(cennzxSpot.getInputPrice(coreAssetId, tradeAssetA, poolCoreBalance)).resolves;
        });
    });
});
