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

import {Codec} from '@plugnet/types/types';
import {stringToU8a, u8aToHex} from '@plugnet/util';
import {xxhashAsHex} from '@plugnet/util-crypto';

/**
 * Generate the key of a double map storage
 * @param prefixString
 * @param key1
 * @param key2
 */
export function generateStorageDoubleMapKey(prefixString: string, key1: Codec, key2: Codec): string {
    // key1 encoded
    const prefixU8a: Uint8Array = stringToU8a(prefixString);
    const key1U8a: Uint8Array = key1.toU8a(true);
    const key1Encoded: Uint8Array = new Uint8Array(prefixU8a.length + key1U8a.length);
    key1Encoded.set(prefixU8a);
    key1Encoded.set(key1U8a, prefixU8a.length);
    // key2 encoded
    const length = 2;
    const key2Encoded: string = u8aToHex(key2.toU8a(true)).substr(length);
    const bitLength: number = 128;

    return xxhashAsHex(key1Encoded, bitLength) + key2Encoded;
}
