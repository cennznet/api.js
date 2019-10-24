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
import {SimpleKeyring, Wallet} from '@cennznet/wallet';
import {SubmittableResult} from '@plugnet/api';
import {Index} from '@plugnet/types/interfaces';

import {Api} from '../../src/Api';

const sender = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};
const receiver = {
    address: '5ESNjjzmZnnCdrrpUo9TBKhDV1sakTjkspw2ZGg84LAK1e1Y',
};
const passphrase = 'passphrase';

describe('e2e transactions', () => {
    let api: Api;

    beforeAll(async () => {
        api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromUri(sender.uri);
        const wallet = new Wallet();
        await wallet.createNewVault(passphrase);
        await wallet.addKeyring(simpleKeyring);
        api.setSigner(wallet);
    });

    afterAll(async () => {
        api.disconnect();
    });

    describe('Send()', () => {

        it('makes a tx using immortal era', async done => {
            // const opt = {era: '0x00', blockHash: api.genesisHash};
            // transfer
            await api.tx.genericAsset
                .transfer(16000, receiver.address, 1)
                .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
                    if (status.isFinalized) {
                        expect(events[0].event.method).toEqual('Transferred');
                        expect(events[0].event.section).toEqual('genericAsset');
                        expect(events[2].event.section).toEqual('fees');
                        expect(events[2].event.method).toEqual('Charged');
                        done();
                    }
                });
        }, 10000000);

        it('makes a tx via send', async done => {
            const simpleKeyring: SimpleKeyring = new SimpleKeyring();
            const senderKeypair = simpleKeyring.addFromUri(sender.uri);
            const nonce = await api.query.system.accountNonce<Index>(senderKeypair.address);
            // transfer
            const tx = api.tx.genericAsset
                .transfer(16000, receiver.address, 1).sign(senderKeypair, {nonce});
            await tx.send(async ({events, status}: SubmittableResult) => {
                if (status.isFinalized) {
                    expect(events[0].event.method).toEqual('Transferred');
                    expect(events[0].event.section).toEqual('genericAsset');
                    expect(events[2].event.section).toEqual('fees');
                    expect(events[2].event.method).toEqual('Charged');
                    done();
                }
            });
        });

        it('makes a tx', async done => {
            // transfer
            await api.tx.genericAsset
                .transfer(16000, receiver.address, 1)
                .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
                    if (status.isFinalized) {
                        expect(events[0].event.method).toEqual('Transferred');
                        expect(events[0].event.section).toEqual('genericAsset');
                        expect(events[2].event.section).toEqual('fees');
                        expect(events[2].event.method).toEqual('Charged');
                        done();
                    }
                });
        });

        it('makes a tx with statusCb', async done => {
            const totalSupply = 100;
            const assetIdBefore = await api.query.genericAsset.nextAssetId() as AssetId;
            const reservedIdStart: number = 17000;
            const assetOptions = new AssetOptions({
                initialIssuance: totalSupply,
                permissions: {
                    update: null,
                    mint: null,
                    burn: null,
                },
            });
            // transfer
            await api.tx.genericAsset
                .create(assetOptions)
                .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
                    if (status.isFinalized) {
                        const assetIdAfter = await api.query.genericAsset.nextAssetId() as AssetId;
                        // expect
                        expect(assetIdAfter.gt(assetIdBefore)).toBeTruthy();
                        expect(Number(assetIdAfter.toString())).toBeGreaterThan(reservedIdStart);
                        expect(Number(assetIdBefore.toString())).toBeGreaterThan(reservedIdStart);
                        done();
                    }
                });
        });

        describe('feeExchange extrinsic', () => {

            it('use keypair to sign', async done => {
                const simpleKeyring: SimpleKeyring = new SimpleKeyring();
                const senderKeypair = simpleKeyring.addFromUri(sender.uri);

                const feeExchange = {
                    assetId: '16000',
                    maxPayment: '50000000000000000',
                };
                return api.tx.genericAsset.transfer(16000, receiver.address, 10000)
                    .addFeeExchangeOpt(feeExchange)
                    .signAndSend(senderKeypair, {feeExchange}, ({events, status}) => {
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

            it('use signer', async done => {

                const tx = api.tx.genericAsset.transfer(16000, receiver.address, 10000);
                tx.addFeeExchangeOpt({
                    assetId: '16000',
                    maxPayment: '50000000000000000',
                });
                const txOpt = {
                    feeExchange: {
                        assetId: '16000',
                        maxPayment: '50000000000000000',
                    },
                };
                return tx.signAndSend(sender.address, txOpt, ({events, status}) => {
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
