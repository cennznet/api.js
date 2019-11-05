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

import {createTypeUnsafe, getTypeRegistry} from '@polkadot/types';

import * as cennzxTypes from './';
import ExchangeKey from './ExchangeKey';
import FeeRate from './FeeRate';
import {IExchangeKey} from './types';

const registry = getTypeRegistry();
registry.register(cennzxTypes);

describe('cennzx types', () => {
    it('ExchangeKey', () => {
        const exchangeKey = createTypeUnsafe<IExchangeKey>('ExchangeKey', [[16000, 16001]]);
        expect(exchangeKey[0].toNumber()).toEqual(16000);
        expect(exchangeKey[1].toNumber()).toEqual(16001);
    });

    it('FeeRate', () => {
        const feeRate = createTypeUnsafe<FeeRate>('FeeRate', [123456789]);
        expect(feeRate.toNumber()).toEqual(123456789);
    });
});
