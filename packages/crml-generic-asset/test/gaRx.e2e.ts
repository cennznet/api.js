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
import {ApiRx} from '@cennznet/api';
import {KeyringPair} from '@polkadot/keyring/types'
import testKeyring from '@polkadot/keyring/testing';
import {take, filter, switchMap, first} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';

import {GenericAssetRx} from '../src/GenericAssetRx';
import { Balance, Hash } from '@cennznet/types/interfaces';
import {cryptoWaitReady} from '@polkadot/util-crypto';

const assetOwnerUri = '//Alice';
const receiverUri = '//Bob';

const testAsset = {
    id: 16000,
    symbol: 'CENNZ-T',
    ownerAccount: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT'
};

const passphrase = 'passphrase';

const url = 'ws://localhost:9944';

describe('Generic asset Rx APIs', () => {
    let api: ApiRx;
    let ga: GenericAssetRx;
    let assetOwner, receiver: KeyringPair;
    beforeAll(async () => {
        await cryptoWaitReady();
        api = await ApiRx.create({provider: url}).toPromise();
        const simpleKeyring = testKeyring({ type: 'sr25519' });
        assetOwner = simpleKeyring.addFromUri(assetOwnerUri);
        receiver = simpleKeyring.addFromUri(receiverUri);
        ga = api.genericAsset;
    });

    afterAll(async () => {
        api.disconnect();
    });

    describe('tests which work!', () => {
        describe('create()', () => {
            it('should create asset and return \'Created\' event when finishing', (done) => {
                const totalAmount = 100;
                const assetOptions = {
                    initialIssuance: totalAmount
                };
                ga.create(assetOptions).signAndSend(assetOwner)
                    .pipe(
                        filter(({events, status}) => {
                            let isCreated = false;
                            if (status.isFinalized && events !== undefined) {
                                for (let i = 0; i < events.length; i += 1) {
                                    const event = events[i];
                                    if (event.event.method === 'Created') {
                                        isCreated = true;
                                    }
                                }
                            }
                            return isCreated;
                        }),
                        switchMap(({events, status}) => {
                            let event;
                            for (let i = 0; i < events.length; i += 1) {
                                if (events[i].event.method === 'Created') {
                                    event = events[i];
                                }
                            }
                            const assetId: any = event.event.data[0];
                            return ga.getFreeBalance(assetId, assetOwner.address);
                        }),
                        first()
                    )
                    .subscribe((balance) => {
                        expect(balance.toString()).toEqual(totalAmount.toString());
                        done();
                    });
            })
        });

        describe('mint()', () => {
            it('should mint an amount of an asset to the specified address', async () => {
                const initialIssuance = 100;
                const mintAmount = 100;
                const expectedBalance = initialIssuance + mintAmount;

                const permissions = {mint: assetOwner.address};

                const assetId = await new Promise<number>((resolve, reject) => {
                    ga.create({initialIssuance, permissions}).signAndSend(assetOwner).subscribe(({status, events}) => {
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
                    ga.mint(assetId, assetOwner.address, mintAmount).signAndSend(assetOwner).subscribe(({status, events}) => {
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
                expect(+(await ga.getFreeBalance(assetId, assetOwner.address).pipe(first()).toPromise())).toBe(expectedBalance);
            });
        });

        describe('burn()', () => {
            it('should burn an amount of an asset from the specified address', async () => {
                const initialIssuance = 100;
                const burnAmount = 100;
                const expectedBalance = initialIssuance - burnAmount;

                const permissions = {burn: assetOwner.address};

                const assetId = await new Promise<number>((resolve, reject) => {
                    ga.create({initialIssuance, permissions}).signAndSend(assetOwner).subscribe(({status, events}) => {
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
                    ga.burn(assetId, assetOwner.address, burnAmount).signAndSend(assetOwner).subscribe(({status, events}) => {
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
                expect(+(await ga.getFreeBalance(assetId, assetOwner.address).pipe(first()).toPromise())).toBe(expectedBalance);
            });
        });
    });

    describe('transfer()', () => {
        it('transfer asset to target account', async (done) => {
            const transferAmount = 7;
            const balanceBefore = await ga.getFreeBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise() as Balance;
            expect(balanceBefore).toBeDefined();
            ga.transfer(testAsset.id, receiver.address, transferAmount).signAndSend(assetOwner)
                .subscribe(async ({events, status}) => {
                    if (status.isFinalized && events !== undefined) {
                        const balanceAfter = await ga.getFreeBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise() as Balance;
                        expect((balanceBefore.sub(balanceAfter)).toString()).toEqual(transferAmount.toString());
                        done();
                    }
                });
        });
        it('transfer asset to target account using asset symbol', async (done) => {
            const transferAmount = 7;
            const transferAsset = testAsset.symbol;
            const balanceBefore = await ga.getFreeBalance(transferAsset, assetOwner.address).pipe(first()).toPromise() as Balance;
            expect(balanceBefore).toBeDefined();
            const tx = ga.transfer(transferAsset, receiver.address, transferAmount);

            tx.signAndSend(assetOwner).subscribe(async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    const balanceAfter = await ga.getFreeBalance(transferAsset, assetOwner.address).pipe(first()).toPromise() as Balance;
                    expect((balanceBefore.sub(balanceAfter)).toString(10)).toEqual(transferAmount.toString());
                    done();
                }
            });
        });
    });

    describe('queryFreeBalance()', () => {
        it('queries free balance', async () => {
            const balance = await ga.getFreeBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise();
            expect(balance).toBeDefined();
        });

        it('queries free balance with At', async () => {
            const balance = await ga.getFreeBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise();
            const blockHash = (await api.rpc.chain.getBlockHash().pipe(first()).toPromise()) as Hash;
            const balanceAt = await ga.getFreeBalance.at(blockHash, testAsset.id, assetOwner.address).pipe(first()).toPromise();
            expect(balance).toEqual(balanceAt)
        });

        it('queries free balance with subscribe', async (done) => {
            const balance = await ga.getFreeBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise() as Balance;
            let counter1 = 1;
            const transferAmount = 7;
            ga.getFreeBalance(testAsset.id, assetOwner.address)
              .subscribe(async (balanceSubscribe) => {
                switch (counter1) {
                    case 1:
                      expect(balance.toString()).toEqual(balanceSubscribe.toString());
                      break;
                    case 2:
                      // should get return value when balance is changed
                      expect((balance.subn(transferAmount)).toString()).toEqual(balanceSubscribe.toString());
                      done();
                      break;
                    default:
                      break;
                }
                counter1 += 1;
            });

            await ga.transfer(testAsset.id, receiver.address, transferAmount).signAndSend(assetOwner).subscribe();
        })
    });

    describe('queryReservedBalance()', () => {
        it('queries reserved balance', async () => {
            const balance = await ga.getReservedBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise();
            expect(balance).toBeDefined();
        });

        it('queries reserved balance with At', async () => {
            const balance = await ga.getReservedBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise();
            const blockHash = (await api.rpc.chain.getBlockHash().pipe(first()).toPromise()) as Hash;
            const balanceAt = await ga.getReservedBalance.at(blockHash, testAsset.id, assetOwner.address).pipe(first()).toPromise();
            expect(balance).toEqual(balanceAt)
        });

        it('queries reserved balance with subscribe', async (done) => {
            const balance = await ga.getReservedBalance(testAsset.id, assetOwner.address).pipe(first()).toPromise();
            ga.getReservedBalance(testAsset.id, assetOwner.address).pipe(take(1))
                .subscribe((balanceSubscribe) => {
                    expect(balance.toString()).toEqual(balanceSubscribe.toString());
                    done();
                });
        })
    });

    describe('queryNextAssetId()', () => {
        it('returns next assetId', async () => {
            const assetId = await ga.getNextAssetId().pipe(first()).toPromise();
            expect(assetId).toBeDefined();
        })
    });

    describe('queryTotalIssuance()', () => {
        it('returns total extrinsic', async () => {
            const balance = await ga.getTotalIssuance(testAsset.id).pipe(first()).toPromise() as Balance;
            expect(balance.gtn(0)).toBeTruthy();
        })
    });

    describe('queryTotalBalance()', () => {
        it('queries total balance', (done) => {
            combineLatest([
                ga.getFreeBalance(testAsset.id, assetOwner.address) as Observable<Balance>,
                ga.getReservedBalance(testAsset.id, assetOwner.address) as Observable<Balance>,
                ga.getTotalBalance(testAsset.id, assetOwner.address) as Observable<Balance>
            ]).pipe(first()).subscribe(([freeBalance,reservedBalance,totalBalance]) => {
                expect(freeBalance.add(reservedBalance).toString()).toEqual(totalBalance.toString());
                done();
            });
        });

        it('queries total balance with At', async (done) => {
            const blockHash = (await api.rpc.chain.getBlockHash().pipe(first()).toPromise() as Hash);
            combineLatest([
                ga.getFreeBalance.at(blockHash, testAsset.id, assetOwner.address) as Observable<Balance>,
                ga.getReservedBalance.at(blockHash, testAsset.id, assetOwner.address) as Observable<Balance>,
                ga.getTotalBalance.at(blockHash, testAsset.id, assetOwner.address) as Observable<Balance>
            ]).pipe(first()).subscribe(([freeBalance,reservedBalance,totalBalance]) => {
                expect(freeBalance.add(reservedBalance).toString()).toEqual(totalBalance.toString());
                done();
            });
        });
    })
});
