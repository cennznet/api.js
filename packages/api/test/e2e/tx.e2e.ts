// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {SubmittableResult} from '@plugnet/api';
import {stringToU8a} from '@plugnet/util';
import {SimpleKeyring, Wallet} from '@cennznet/wallet';

import {Api} from '../../src/Api';
import WsProvider from '@plugnet/rpc-provider/ws';
import {AssetId, AssetOptions} from '@cennznet/types';

const sender = {
    address: '5H6dGC3TbdyKFagoCEXGaNtsovTtpYYtMTXnsbtVYcn2T1VY',
    seed: stringToU8a(('cennznet-js-test' as any).padEnd(32, ' ')),
};
const receiver = {
    address: '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3',
    seed: stringToU8a(('cennznetjstest2' as any).padEnd(32, ' ')),
};
const passphrase = 'passphrase';

describe('e2e transactions', () => {
    let api;
    let websocket: WsProvider;

    beforeAll(async () => {
        websocket = new WsProvider('wss://cennznet-node-0.centrality.me:9944');
        api = await Api.create({provider: websocket});
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromSeed(sender.seed);
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
        it('makes a tx with statusCb', async done => {
            const totalSupply = 100;
            const assetIdBefore: AssetId = await api.query.genericAsset.nextAssetId();
            const reservedIdStart: number = 1000000;
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
