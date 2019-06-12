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

import testingPairs from '@plugnet/keyring/testingPairs';

import {Api} from '../../src/Api';

describe('feeExchange for CennznetExtrinsic', () => {
    let api: Api;
    let keyring;

    beforeEach(async () => {
        if (!api) {
            api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
            keyring = testingPairs({type: 'sr25519'});
        }
    });

    afterEach(() => {
        jest.setTimeout(5000);
    });

    it('makes a transfer (sign, then send)', async done => {
        const tradeAssetId = 17008;
        const trader = keyring.bob;

        const tx = api.tx.genericAsset.transfer(16000, trader.address(), 10000);
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
