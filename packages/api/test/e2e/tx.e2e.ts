// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {stringToU8a} from '@polkadot/util';
import {SimpleKeyring, Wallet} from 'cennznet-wallet';

import {Api} from '../../src/Api';
import WsProvider from '@polkadot/rpc-provider/ws';
import { SubmittableSendResult } from '../../src/types';

const sender = {
    address: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT',
    seed: stringToU8a(('cennznetjstest' as any).padEnd(32, ' '))
}
const receiver = {
    address: '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3',
    seed: stringToU8a(('cennznetjstest2' as any).padEnd(32, ' '))
}
const passphrase = 'passphrase';

describe('e2e transactions', () => {
    let api;
    let websocket: WsProvider;

    beforeAll(async () => {
        websocket = new WsProvider('ws://cennznet-node-0.centrality.me:9944');
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
    })

    describe('Send()', () => {
        it('makes a tx with statusCb', async (done) => {
            const transferAmount: number = 50;
            const senderBalanceBefore = await api.query.balances.freeBalance(sender.address);
            const receiverBalanceBefore = Number(await api.query.balances.freeBalance(receiver.address));
            // transfer
            await api.tx.balances.transfer(receiver.address, transferAmount).send({from: sender.address}, async (event: SubmittableSendResult) => {
                if (event.type === 'Finalised') {
                    const senderBalanceAfter = await api.query.balances.freeBalance(sender.address);
                    const receiverBalanceAfter = Number(await api.query.balances.freeBalance(receiver.address));
                    // expect
                    expect(receiverBalanceAfter - receiverBalanceBefore).toEqual(transferAmount);
                    done();
                }
            });
        });

        it('makes a proposal', async () => {
            const hash = await api.tx.democracy
                .propose(api.tx.consensus.setCode('0xdeadbeef'), 10000)
                .send({from: sender.address});
    
            expect(hash.toString()).not.toEqual('0x');
        });
    });
});
