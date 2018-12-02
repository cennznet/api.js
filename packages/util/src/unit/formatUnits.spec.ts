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

import BN from 'bn.js';
import formatUnits from './formatUnits';

describe('format units', () => {
    const cases: [string | number | BN, number, string][] = [
        ['123456', 3, '123.456'],
        [123456, 3, '123.456'],
        [new BN(1234567), 3, '1234.567'],
        ['123456789012345678901234567890123456789', 18, '123456789012345678901.234567890123456789'],
        ['123456789000000000000000000000000000000', 18, '123456789000000000000'],
        [new BN('123456789000000000000000000000000000000'), 18, '123456789000000000000'],
        ['1234567', 18, '0.000000000001234567'],
    ];
    for (const [original, decimals, expectation] of cases) {
        it(`normal cases ${original}-${decimals}`, () => {
            expect(formatUnits(original, decimals)).toBe(expectation);
        });
    }

    const sadCases: [string | number | BN, number, string][] = [
        ['123456abc', 3, 'not a safe integer'],
        ['123.45', 3, 'not a safe integer'],
        [123456789000000000000000000000000000000, 18, 'not a safe integer'],
        [12321343513413413413241343241, 3, 'not a safe integer'],
    ];
    for (const [original, decimals, expectation] of sadCases) {
        it(`sad cases ${original}-${decimals}`, () => {
            expect(() => formatUnits(original, decimals)).toThrow(expectation);
        });
    }
});
