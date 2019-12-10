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
import Option from '@polkadot/types/codec/Option';
import Doughnut from './Doughnut';
import * as extrinsicTypes from './extrinsic';
import * as runtimeTypes from './runtime';

// Monkey patch [[Option]] to encode `None` as a `0` byte
// Remove when https://github.com/polkadot-js/api/issues/1542 is sorted upstream
Option.prototype.toU8a = function toU8a(isBare?: boolean): Uint8Array {
    // Hack to always encode `0` for None (ignores `isBare`)
    if (this.isNone) return new Uint8Array([0]);
    if (this.isSome && isBare) {
        return this.unwrap().toU8a(isBare);
    } else {
        const buf = new Uint8Array([1]);
        buf.set(this.unwrap().toU8a(isBare), 1);
        return buf;
    }
};

export default {
    ...runtimeTypes,
    ...extrinsicTypes,
    AssetOf: 'u128',
    'ed25519::Signature': 'H512',
    RewardBalance: 'Balance',
    Doughnut: Doughnut,
    // The patched [[Option]] type
    Option: Option,
};
