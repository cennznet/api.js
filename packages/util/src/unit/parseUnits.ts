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

import {assert, isNumber} from '@polkadot/util';
import BN from 'bn.js';
import stripEndZero from '../format/stripEndZero';
import isSafeInteger from '../is/integer';
import toFixed from '../number/toFixed';

// tslint:disable prefer-const no-magic-numbers
/**
 * format a amount from unit `un` to decimals passed in.
 * @param unValue
 * @param decimals
 */
export default function parseUnits(value: string | number, decimals: number): BN {
    const strValue = isNumber(value) ? toFixed(value) : value;
    let [intPart, fractionPart] = strValue.split('.');
    assert(isSafeInteger(intPart), 'intPart not a integer');
    let retValue = new BN(intPart).mul(new BN(10).pow(new BN(decimals)));
    fractionPart = stripEndZero(fractionPart || '');
    if (fractionPart && fractionPart !== '') {
        assert(isSafeInteger(fractionPart), 'fractionPart not a integer');
        if (fractionPart.length > decimals) {
            throw new Error('too much decimals');
        }
        retValue = retValue.add(new BN(fractionPart).mul(new BN(10).pow(new BN(decimals - fractionPart.length))));
    }
    return retValue;
}
