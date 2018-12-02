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

const INTEGER = /^\d+$/;
/**
 * Check if the input is a integer
 * @example
 * <BR>
 *
 * ```javascript
 * import { isInteger } from '@cennznet/util';
 *
 * console.log('isInteger', isInteger(123)); // => true
 * console.log('isInteger', isInteger(123456789012345678)); // => false
 * console.log('isInteger', isInteger('123')); // => true
 * console.log('isInteger', isInteger('12.3')); // => false
 * ```
 */
export default function isSafeInteger(value: any): boolean {
    if (typeof value === 'number') {
        return Number.isSafeInteger(value);
    } else {
        return INTEGER.test(String(value));
    }
}
