// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {SubmittableResult} from '@polkadot/api';
import {stringToU8a} from '@polkadot/util';
import {SimpleKeyring, Wallet} from '@cennznet/wallet';

import {Api} from '../../src/Api';
import WsProvider from '@polkadot/rpc-provider/ws';
import {AssetId} from '@cennznet/types';

const sender = {
    address: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT',
    seed: stringToU8a(('cennznetjstest' as any).padEnd(32, ' ')),
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
            // transfer
            await api.tx.genericAsset
                .create({totalSupply})
                .signAndSend(sender.address, async (event: SubmittableResult) => {
                    if (event.type === 'Finalised') {
                        const assetIdAfter: AssetId = await api.query.genericAsset.nextAssetId();
                        // expect
                        expect(assetIdAfter.gt(assetIdBefore)).toBeTruthy();
                        expect(Number(assetIdAfter.toString(10))).toBeGreaterThan(reservedIdStart);
                        expect(Number(assetIdBefore.toString(10))).toBeGreaterThan(reservedIdStart);
                        done();
                    }
                });
        });

        // it('makes a proposal', async () => {
        //     const hash = await api.tx.democracy
        //         .propose(api.tx.consensus.setCode('0xdeadbeef'), 10000)
        //         .send({from: sender.address});

        //     expect(hash.toString()).not.toEqual('0x');
        // });
    });
});
