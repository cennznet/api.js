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
import {EventRecord, Vector} from '@plugnet/types';

import {Api} from '../../src/Api';

const sender = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};

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
                if (status.isFinalized && events !== undefined) {
                    const blockHash = status.asFinalized;
                    const events = ((await api.query.system.events.at(blockHash)) as unknown) as Vector<EventRecord>;
                    const feeChargeEvent = events.find(event => event.event.data.method === 'Charged');
                    const gas = feeChargeEvent.event.data[1];
                    expect(gas.toString()).toEqual(fee.toString());
                    done();
                }
            });
        });

        it('fee estimate Transfer', async done => {
            const tx = api.tx.genericAsset.transfer(16000, sender.address, 1000000);
            const fee = await tx.fee(sender.address);
            await tx.signAndSend(sender.address, async ({events, status}) => {
                if (status.isFinalized && events !== undefined) {
                    const blockHash = status.asFinalized;
                    const events = ((await api.query.system.events.at(blockHash)) as unknown) as Vector<EventRecord>;
                    const feeChargeEvent = events.find(event => event.event.data.method === 'Charged');
                    const gas = feeChargeEvent.event.data[1];
                    expect(gas.toString()).toEqual(fee.toString());
                    done();
                }
            });
        });
    });

    describe('feeExchange for CennznetExtrinsic', () => {
        afterEach(() => {
            jest.setTimeout(5000);
        });

        it('makes a transfer (sign, then send)', async done => {
            const tradeAssetId = 17008;
            const trader = keyring.bob;

            const tx = api.tx.genericAsset.transfer(16000, trader.address, 10000);
            tx.addFeeExchangeOpt({
                assetId: tradeAssetId,
                maxPayment: '50000000000000000',
            });
            return tx.signAndSend(trader, ({events, status}) => {
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
            done();
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
            console.log('fee', fee.toString());
            tx.signAndSend(sender.address).subscribe(async ({events, status}: SubmittableResult) => {
                if (status.isFinalized && events !== undefined) {
                    const blockHash = status.asFinalized;
                    const events = ((await api.query.system.events.at(blockHash).toPromise()) as unknown) as Vector<
                        EventRecord
                    >;
                    const feeChargeEvent = events.find(event => event.event.data.method === 'Charged');
                    const gas = feeChargeEvent.event.data[1];
                    expect(gas.toString()).toEqual(fee.toString());
                    done();
                }
            });
        });
    });
});
