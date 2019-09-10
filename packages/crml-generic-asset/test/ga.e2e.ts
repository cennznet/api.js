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

import {GenericAsset} from '../src/GenericAsset';
import { Hash, Balance } from '@plugnet/types/interfaces';

const assetOwner = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};
const receiver = {
    address: '5ESNjjzmZnnCdrrpUo9TBKhDV1sakTjkspw2ZGg84LAK1e1Y',
};
const testAsset = {
    id: 16000,
    symbol: 'CENNZ-T',
    ownerAccount: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT'
};

const passphrase = 'passphrase';

const url = 'wss://rimu.unfrastructure.io/public/ws';

describe('Generic asset APIs', () => {
    let api: Api;
    let ga: GenericAsset;
    beforeAll(async () => {
        api = await Api.create({provider: url});
        const simpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromUri(assetOwner.uri);
        const wallet = new Wallet();
        await wallet.createNewVault(passphrase);
        await wallet.addKeyring(simpleKeyring);
        api.setSigner(wallet);
        ga = api.genericAsset;
    });

    afterAll(async () => {
      api.disconnect();
    });

    describe('tests which work!', () => {
        describe('create()', () => {
            it("should create asset and return 'Created' event when finishing", async done => {
                const totalAmount = 100;
                const assetOptions = {
                    initialIssuance: totalAmount,
                };
                await ga.create(assetOptions).signAndSend(assetOwner.address, ({events, status}) => {
                    if (status.isFinalized && events !== undefined) {
                        for (let i = 0; i < events.length; i += 1) {
                            const event = events[i];
                            if (event.event.method === 'Created') {
                                const assetId: any = event.event.data[0];
                                // query balance
                                ga.getFreeBalance(assetId, assetOwner.address).then(balance => {
                                    expect(balance.toString()).toEqual(totalAmount.toString());
                                    done();
                                });
                            }
                        }
                    }
                });
            });
        });

        describe('mint()', () => {
            it('should mint an amount of an asset to the specified address', async () => {
                // Arrange
                const {address} = assetOwner;

                const initialIssuance = 100;
                const mintAmount = 100;
                const expectedBalance = initialIssuance + mintAmount;

                const permissions = {mint: address};

                const assetId = await new Promise<number>((resolve, reject) => {
                    ga.create({initialIssuance, permissions}).signAndSend(address, ({status, events}) => {
                        if (status.isFinalized) {
                            for (const {event} of events) {
                                if (event.method === "Created") {
                                    resolve(+event.data[0]);
                                }
                            }
                            reject('No "Created" event was emitted while creating asset.');
                        }
                    });
                });

                // Act
                await new Promise((resolve, reject) => {
                    ga.mint(assetId, address, mintAmount).signAndSend(address, ({status, events}) => {
                        if (status.isFinalized) {
                            for (const {event} of events) {
                                // TODO: Once https://github.com/cennznet/cennznet/pull/16 is released, this
                                // should be be updated to resolve only when a "Minted" event is raised.
                                if (event.method === "ExtrinsicSuccess") {
                                    resolve();
                                }
                            }
                            reject('No "ExtrinsicSuccess" event was emitted while minting asset.');
                        }
                    });
                });

                // Assert
                expect(+(await ga.getFreeBalance(assetId, address))).toBe(expectedBalance);
            });
        });

        describe('burn()', () => {
            it('should burn an amount of an asset from the specified address', async () => {
                // Arrange
                const {address} = assetOwner;

                const initialIssuance = 100;
                const burnAmount = 100;
                const expectedBalance = initialIssuance - burnAmount;

                const permissions = {burn: address};

                const assetId = await new Promise<number>((resolve, reject) => {
                    ga.create({initialIssuance, permissions}).signAndSend(address, ({status, events}) => {
                        if (status.isFinalized) {
                            for (const {event} of events) {
                                if (event.method === "Created") {
                                    resolve(+event.data[0]);
                                }
                            }
                            reject('No "Created" event was emitted while creating asset.');
                        }
                    });
                });

                // Act
                await new Promise((resolve, reject) => {
                    ga.burn(assetId, address, burnAmount).signAndSend(address, ({status, events}) => {
                        if (status.isFinalized) {
                            for (const {event} of events) {
                                // TODO: Once https://github.com/cennznet/cennznet/pull/16 is released, this
                                // should be be updated to resolve only when a "Burned" event is raised.
                                if (event.method === "ExtrinsicSuccess") {
                                    resolve();
                                }
                            }
                            reject('No "ExtrinsicSuccess" event was emitted while burning asset.');
                        }
                    });
                });

                // Assert
                expect(+(await ga.getFreeBalance(assetId, address))).toBe(expectedBalance);
            });
        });
    });

    describe('transfer()', () => {
        it('transfer asset to target account', async done => {
            const transferAmount = 7;
            const balanceBefore = await ga.getFreeBalance(testAsset.id, assetOwner.address) as Balance;
            expect(balanceBefore).toBeDefined;
            await ga
                .transfer(testAsset.id, receiver.address, transferAmount)
                .signAndSend(assetOwner.address, ({events, status}) => {
                    if (status.isFinalized && events !== undefined) {
                        ga.getFreeBalance(testAsset.id, assetOwner.address).then((balanceAfter: Balance) => {
                            expect(balanceBefore.sub(balanceAfter).toString()).toEqual(transferAmount.toString());
                            done();
                        });
                    }
                });
        });
        it('transfer asset to target account using asset symbol', async done => {
            const transferAmount = 7;
            const transferAsset = testAsset.symbol;
            const balanceBefore = await ga.getFreeBalance(transferAsset, assetOwner.address) as Balance;
            expect(balanceBefore).toBeDefined;
            const tx = ga.transfer(transferAsset, receiver.address, transferAmount);

            await tx.signAndSend(assetOwner.address, ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    ga.getFreeBalance(transferAsset, assetOwner.address).then((balanceAfter: Balance) => {
                        expect(balanceBefore.sub(balanceAfter).toString()).toEqual(transferAmount.toString());
                        done();
                    });
                }
            });
        });
    });

    describe('queryFreeBalance()', () => {
        it('queries free balance', async () => {
            const balance = await ga.getFreeBalance(testAsset.id, assetOwner.address);
            expect(balance).toBeDefined;
        });

        it('queries free balance with At', async () => {
            const balance = await ga.getFreeBalance(testAsset.id, assetOwner.address);
            const blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
            const balanceAt = await ga.getFreeBalance.at(blockHash, testAsset.id, assetOwner.address);
            expect(balance).toEqual(balanceAt);
        });

        it('queries free balance with subscribe', async done => {
            const balance = await ga.getFreeBalance(testAsset.id, assetOwner.address) as Balance;
            let counter1 = 1;
            const transferAmount = 7;
            const unsubscribeFn = await ga.getFreeBalance(testAsset.id, assetOwner.address, balanceSubscribe => {
                switch (counter1) {
                    case 1:
                        expect(balance.toString()).toEqual(balanceSubscribe.toString());
                        break;
                    default:
                        if (balance.toString() !== balanceSubscribe.toString()) {
                            expect(balance.subn(transferAmount).toString()).toEqual(balanceSubscribe.toString());
                            unsubscribeFn();
                            done();
                        }
                        break;
                }
                counter1 += 1;
            });

            // transfer to change balance value for triggering subscribe
            ga.transfer(testAsset.id, receiver.address, transferAmount).signAndSend(assetOwner.address);
        });
    });

    describe('queryReservedBalance()', () => {
        it('queries reserved balance', async () => {
            const balance = await ga.getReservedBalance(testAsset.id, assetOwner.address);
            expect(balance).toBeDefined;
        });

        it('queries reserved balance with At', async () => {
            const balance = await ga.getReservedBalance(testAsset.id, assetOwner.address);
            const blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
            const balanceAt = await ga.getReservedBalance.at(blockHash, testAsset.id, assetOwner.address);
            expect(balance).toEqual(balanceAt);
        });

        it('queries reserved balance with subscribe', async done => {
            const balance = await ga.getReservedBalance(testAsset.id, assetOwner.address);
            const unsubscribeFn = (await ga.getReservedBalance(testAsset.id, assetOwner.address, balanceSubscribe => {
                expect(balance.toString()).toEqual(balanceSubscribe.toString());
                done();
            })) as any;
            unsubscribeFn();
        });
    });

    describe('queryNextAssetId()', () => {
        it('returns next assetId', () => {
            ga.getNextAssetId().then(assetId => {
                expect(assetId).toBeDefined;
            });
        });
    });

    describe('queryTotalIssuance()', () => {
        it('returns total extrinsic', async () => {
            const balance = await ga.getTotalIssuance(testAsset.id) as Balance;
            expect(balance.gtn(0)).toBeTruthy();
        });
    });

    describe('queryTotalBalance()', () => {
        it('queries total balance', async () => {
            const [freeBalance, reservedBalance, totalBalance] = [
                await ga.getFreeBalance(testAsset.id, assetOwner.address) as Balance,
                await ga.getReservedBalance(testAsset.id, assetOwner.address) as Balance,
                await ga.getTotalBalance(testAsset.id, assetOwner.address) as Balance,
            ];
            expect(freeBalance.add(reservedBalance).toString()).toEqual(totalBalance.toString());
        });

        it('queries total balance with At', async () => {
            const blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
            const [freeBalance, reservedBalance, totalBalance] = [
                await ga.getFreeBalance.at(blockHash, testAsset.id, assetOwner.address) as Balance,
                await ga.getReservedBalance.at(blockHash, testAsset.id, assetOwner.address) as Balance,
                await ga.getTotalBalance.at(blockHash, testAsset.id, assetOwner.address) as Balance,
            ];
            expect(freeBalance.add(reservedBalance).toString()).toEqual(totalBalance.toString());
        });
    });
});
