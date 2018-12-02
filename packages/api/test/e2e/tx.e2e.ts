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

import {SubmittableResult} from '@plugnet/api';
import {stringToU8a} from '@plugnet/util';
import {SimpleKeyring, Wallet} from '@cennznet/wallet';

import {Api} from '../../src/Api';
import WsProvider from '@plugnet/rpc-provider/ws';
import {AssetId, AssetOptions} from '@cennznet/types';
import process from 'process';

const sender = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};
const receiver = {
    address: '5ESNjjzmZnnCdrrpUo9TBKhDV1sakTjkspw2ZGg84LAK1e1Y',
};
const passphrase = 'passphrase';

describe('e2e transactions', () => {
    let api;
    let websocket: WsProvider;

    beforeAll(async () => {
        const endPoint = 'wss://cennznet-node-0.centrality.me:9944';
        websocket = new WsProvider(endPoint);
        api = await Api.create({provider: websocket});
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromUri(sender.uri);
        const wallet = new Wallet();
        await wallet.createNewVault(passphrase);
        await wallet.addKeyring(simpleKeyring);
        api.setSigner(wallet);
    });

    afterAll(async () => {
        (websocket as any).websocket.onclose = null;
        (websocket as any).websocket.close();
    });

    describe('Send()', () => {
        it('makes a tx', async done => {
            // transfer
            await api.tx.genericAsset
                .transfer(16000, receiver.address, 1)
                .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
                    if (status.isFinalized) {
                        expect(events[0].event.method).toEqual('Transferred');
                        expect(events[0].event.section).toEqual('genericAsset');
                        done();
                    }
                });
        });

        it('makes a tx with statusCb', async done => {
            const totalSupply = 100;
            const assetIdBefore: AssetId = await api.query.genericAsset.nextAssetId();
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
                        const assetIdAfter: AssetId = await api.query.genericAsset.nextAssetId();
                        // expect
                        expect(assetIdAfter.gt(assetIdBefore)).toBeTruthy();
                        expect(Number(assetIdAfter.toString(10))).toBeGreaterThan(reservedIdStart);
                        expect(Number(assetIdBefore.toString(10))).toBeGreaterThan(reservedIdStart);
                        done();
                    }
                });
        });
    });
});
