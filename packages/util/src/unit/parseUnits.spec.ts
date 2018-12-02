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

import parseUnits from './parseUnits';

describe('parse units', () => {
    const cases: [string | number, number, string][] = [
        ['123.456', 3, '123456'],
        ['123456', 3, '123456000'],
        [1234.56, 2, '123456'],
        [123456, 2, '12345600'],
        ['123456789012345678901.234567890123456789', 18, '123456789012345678901234567890123456789'],
        ['123456789000000000000', 18, '123456789000000000000000000000000000000'],
        ['0.000000000001234567', 18, '1234567'],
        ['000001234567', 3, '1234567000'],
        ['123', 0, '123'],
        ['123.', 0, '123'],
        ['123.000', 0, '123'],
        ['123.000', 1, '1230'],
        [0.00000000000001, 18, '10000'],
    ];
    for (const [original, decimals, expectation] of cases) {
        it(`normal cases ${original}-${decimals}`, () => {
            expect(parseUnits(original, decimals).toString()).toBe(expectation);
        });
    }

    const sadCases: [string | number, number, string][] = [
        ['123456abc', 3, 'not a integer'],
        ['123.4567', 3, 'too much decimals'],
    ];
    for (const [original, decimals, expectation] of sadCases) {
        it(`sad cases ${original}-${decimals}`, () => {
            expect(() => parseUnits(original, decimals)).toThrow(expectation);
        });
    }
});
