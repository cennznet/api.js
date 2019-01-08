// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {stringToU8a} from '@polkadot/util';
import {SimpleKeyring, Wallet} from 'cennznet-wallet';

import {Api} from '../src/';

const andrea = {
    address: '5EKGZwAuwvVpVaGWZJ3hYDqTSxQCDDUgeMv36M4qLq7wtWLH',
    seed: stringToU8a('Andrea'.padEnd(32, ' ')),
};

const bob = {
    address: '5Gw3s7q4QLkSWwknsiPtjujPv3XM4Trxi5d4PgKMMk3gfGTE',
    seed: stringToU8a('Bob'.padEnd(32, ' ')),
};

describe('e2e transactions', () => {
    let api;
    let nonce;

    beforeEach(async () => {
        api = await Api.create({provider: 'ws://cennznet-node-0.centrality.me:9944'});

        const wallet = new Wallet();
        await wallet.createNewVault('a passphrase');
        const keyring = new SimpleKeyring();
        await keyring.addFromSeed(andrea.seed);
        await wallet.addKeyring(keyring);
        api.setWallet(wallet);
        jest.setTimeout(60000);
    });

    afterEach(() => {
        jest.setTimeout(5000);
    });

    it.only('makes a transfer', async done => {
        await api.tx.balances.transfer(bob.address, 12345).send({from: andrea.address}, status => {
            expect(status.type.toString()).toEqual('Finalised');

            done();
        });
    });

    it('makes a proposal', async () => {
        // don't wait for status, just get hash
        const hash = await api.tx.democracy
            .propose(api.tx.consensus.setCode('0xdeadbeef'), 10000)
            .send({from: andrea.address});

        expect(hash.toString()).not.toEqual('0x');
    });
});
