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
import {GenericAsset} from '../src/GenericAsset';
import { Hash, Balance } from '@polkadot/types/interfaces';
import {cryptoWaitReady} from '@polkadot/util-crypto';
import { TypeRegistry } from '@polkadot/types';
import {AssetOptions} from '@cennznet/types';
import testKeyring from '@polkadot/keyring/testing';

const testAsset = {
    id: 16000,
    symbol: 'CENNZ-T',
    ownerAccount: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT'
};

const url = 'ws://localhost:9944';

describe('Generic asset APIs', () => {
    let api: Api;
    let alice, bob, sudoPair;
    const registry = new TypeRegistry();
    beforeAll(async () => {
      await cryptoWaitReady();
      const keyring = testKeyring({ type: 'sr25519' });
      alice = keyring.addFromUri('//Alice');
      bob = keyring.addFromUri('//Bob');
      api = await Api.create(
        {provider: url,
          registry});
      const sudoKey = await api.query.sudo.key();
      // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
      sudoPair = keyring.getPair(sudoKey.toString());
      await api.isReady;
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

              await api.tx.sudo
                .sudo(api.tx.genericAsset
                  .create(alice.address,
                    assetOptions
                  ))
                .signAndSend(sudoPair, ({events, status}) => {
                    if (status.isFinalized && events !== undefined) {
                        for (let i = 0; i < events.length; i += 1) {
                            const event = events[i];
                            if (event.event.method === 'Created') {
                                const assetId: any = event.event.data[0];
                                // query balance
                                api.genericAsset.getFreeBalance(assetId, sudoPair.address).then(balance => {
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

                const initialIssuance = 100;
                const mintAmount = 100;
                const expectedBalance = initialIssuance + mintAmount;

                const permissions = {mint: alice.address};

                const assetId = await new Promise<number>((resolve, reject) => {

                  api.tx.sudo
                    .sudo(api.tx.genericAsset
                      .create(alice.address,
                        {initialIssuance, permissions}
                      ))
                    .signAndSend(sudoPair, ({events, status}) => {
                      if (status.isFinalized && events !== undefined) {
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
                    api.tx.genericAsset.mint(assetId, alice.address, mintAmount).signAndSend(alice, ({status, events}) => {
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
                expect(+(await api.genericAsset.getFreeBalance(assetId, alice.address))).toBe(expectedBalance);
            });
        });

        describe('burn()', () => {
            it('should burn an amount of an asset from the specified address', async () => {
                // Arrange


                const initialIssuance = 100;
                const burnAmount = 100;
                const expectedBalance = initialIssuance - burnAmount;

                const permissions = {burn: alice.address};

                const assetId = await new Promise<number>((resolve, reject) => {
                  api.tx.sudo
                    .sudo(api.tx.genericAsset
                      .create(alice.address,
                        {initialIssuance, permissions}
                      ))
                    .signAndSend(sudoPair, ({events, status}) => {
                      if (status.isFinalized && events !== undefined) {
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
                    api.genericAsset.burn(assetId, alice.address, burnAmount).signAndSend(alice, ({status, events}) => {
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
                expect(+(await api.genericAsset.getFreeBalance(assetId, alice.address))).toBe(expectedBalance);
            });
        });
    });

    describe('transfer()', () => {
        it('transfer asset to target account', async done => {
            const transferAmount = 7;
            const balanceBefore = await api.genericAsset.getFreeBalance(testAsset.id, alice.address) as Balance;
            expect(balanceBefore).toBeDefined;
            await api.genericAsset
                .transfer(testAsset.id, bob.address, transferAmount)
                .signAndSend(alice, ({events, status}) => {
                    if (status.isFinalized && events !== undefined) {
                        api.genericAsset.getFreeBalance(testAsset.id, alice.address).then((balanceAfter: Balance) => {
                            expect(balanceBefore.sub(balanceAfter).toString()).toEqual(transferAmount.toString());
                            done();
                        });
                    }
                });
        });
        it('transfer asset to target account using asset symbol', async done => {
            const transferAmount = 7;
            const transferAsset = testAsset.symbol;
            const balanceBefore = await api.genericAsset.getFreeBalance(transferAsset, alice.address) as Balance;
            expect(balanceBefore).toBeDefined;
            const tx = api.genericAsset.transfer(transferAsset, bob.address, transferAmount);

            await tx.signAndSend(alice.address, ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    api.genericAsset.getFreeBalance(transferAsset, alice.address).then((balanceAfter: Balance) => {
                        expect(balanceBefore.sub(balanceAfter).toString()).toEqual(transferAmount.toString());
                        done();
                    });
                }
            });
        });
    });

    describe('queryFreeBalance()', () => {
        it('queries free balance', async () => {
            const balance = await api.genericAsset.getFreeBalance(testAsset.id, alice.address);
            expect(balance).toBeDefined;
        });

        it('queries free balance with At', async () => {
            const balance = await api.genericAsset.getFreeBalance(testAsset.id, alice.address);
            const blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
            const balanceAt = await api.genericAsset.getFreeBalance.at(blockHash, testAsset.id, alice.address);
            expect(balance).toEqual(balanceAt);
        });

        it('queries free balance with subscribe', async done => {
            const balance = await api.genericAsset.getFreeBalance(testAsset.id, alice.address) as Balance;
            let counter1 = 1;
            const transferAmount = 7;
            const unsubscribeFn = await api.genericAsset.getFreeBalance(testAsset.id, alice.address, balanceSubscribe => {
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
            api.genericAsset.transfer(testAsset.id, bob.address, transferAmount).signAndSend(alice.address);
        });
    });

    describe('queryReservedBalance()', () => {
        it('queries reserved balance', async () => {
            const balance = await api.genericAsset.getReservedBalance(testAsset.id, alice.address);
            expect(balance).toBeDefined;
        });

        it('queries reserved balance with At', async () => {
            const balance = await api.genericAsset.getReservedBalance(testAsset.id, alice.address);
            const blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
            const balanceAt = await api.genericAsset.getReservedBalance.at(blockHash, testAsset.id, alice.address);
            expect(balance).toEqual(balanceAt);
        });

        it('queries reserved balance with subscribe', async done => {
            const balance = await api.genericAsset.getReservedBalance(testAsset.id, alice.address);
            const unsubscribeFn = (await api.genericAsset.getReservedBalance(testAsset.id, alice.address, balanceSubscribe => {
                expect(balance.toString()).toEqual(balanceSubscribe.toString());
                done();
            })) as any;
            unsubscribeFn();
        });
    });

    describe('queryNextAssetId()', () => {
        it('returns next assetId', () => {
            api.genericAsset.getNextAssetId().then(assetId => {
                expect(assetId).toBeDefined;
            });
        });
    });

    describe('queryTotalIssuance()', () => {
        it('returns total extrinsic', async () => {
            const balance = await api.genericAsset.getTotalIssuance(testAsset.id) as Balance;
            expect(balance.gtn(0)).toBeTruthy();
        });
    });

    describe('queryTotalBalance()', () => {
        it('queries total balance', async () => {
            const [freeBalance, reservedBalance, totalBalance] = [
                await api.genericAsset.getFreeBalance(testAsset.id, alice.address) as Balance,
                await api.genericAsset.getReservedBalance(testAsset.id, alice.address) as Balance,
                await api.genericAsset.getTotalBalance(testAsset.id, alice.address) as Balance,
            ];
            expect(freeBalance.add(reservedBalance).toString()).toEqual(totalBalance.toString());
        });

        it('queries total balance with At', async () => {
            const blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
            const [freeBalance, reservedBalance, totalBalance] = [
                await api.genericAsset.getFreeBalance.at(blockHash, testAsset.id, alice.address) as Balance,
                await api.genericAsset.getReservedBalance.at(blockHash, testAsset.id, alice.address) as Balance,
                await api.genericAsset.getTotalBalance.at(blockHash, testAsset.id, alice.address) as Balance,
            ];
            expect(freeBalance.add(reservedBalance).toString()).toEqual(totalBalance.toString());
        });
    });
});
