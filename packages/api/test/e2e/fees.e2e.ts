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

import {ApiRx, SubmittableResult} from '@cennznet/api';
import {SimpleKeyring, Wallet} from '@cennznet/wallet';
import testingPairs from '@plugnet/keyring/testingPairs';
import {Vec} from '@plugnet/types';
import {EventRecord, ExtrinsicStatus} from '@plugnet/types/interfaces';

import {Api} from '../../src/Api';

const sender = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};

function testFee(status: ExtrinsicStatus, events: EventRecord[], fee, done) {
    if (status.isFinalized && events !== undefined) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].event.method === 'Charged' && events[i].event.section === 'fees') {
                const gas = events[i].event.data[1];
                expect(gas.toString()).toEqual(fee.toString());
                done();
            }
        }
    }
}

describe('fees in cennznet', () => {
    let api: Api;
    let keyring;

    beforeAll(async () => {
        api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromUri(sender.uri);
        const wallet = new Wallet();
        await wallet.createNewVault('');
        await wallet.addKeyring(simpleKeyring);
        keyring = testingPairs({type: 'sr25519'});
        api.setSigner(wallet);
    });

    describe('extrinsic.fee()', () => {
        it('fee estimate', async done => {
            const tx = api.tx.genericAsset.create({
                initialIssuance: 100,
            });
            const fee = await tx.fee(sender.address);
            await tx.signAndSend(sender.address, async ({events, status}) => {
                testFee(status, events, fee, done);
            });
        });

        it('fee estimate Transfer', async done => {
            const tx = api.tx.genericAsset.transfer(16000, sender.address, 1000000);
            const fee = await tx.fee(sender.address);
            await tx.signAndSend(sender.address, async ({events, status}) => {
                testFee(status, events, fee, done);
            });
        });
    });
});

describe('fees in cennznet (Rxjs)', () => {
    let api: ApiRx;
    let keyring;

    beforeAll(async () => {
        api = await ApiRx.create({provider: 'wss://rimu.unfrastructure.io/public/ws'}).toPromise();

        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromUri(sender.uri);
        const wallet = new Wallet();
        await wallet.createNewVault('');
        await wallet.addKeyring(simpleKeyring);
        keyring = testingPairs({type: 'sr25519'});
        api.setSigner(wallet);
    });

    describe('extrinsic.fee()', () => {
        it('fee estimate', async done => {
            const tx = api.tx.genericAsset.create({
                initialIssuance: 100,
            });
            const fee = await tx.fee(sender.address).toPromise();
            tx.signAndSend(sender.address).subscribe(async ({events, status}: SubmittableResult) => {
                testFee(status, events, fee, done);
            });
        });
    });
});
