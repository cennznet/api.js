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
import {u64} from '@polkadot/types';
import Option from '@polkadot/types/codec/Option';
import Doughnut from './Doughnut';
import * as extrinsicTypes from './extrinsic';
import * as runtimeTypes from './runtime';

// Monkey patch [[Option]] to encode `None` as a `0` byte
Option.prototype.toU8a = function toU8a(isBare?: boolean): Uint8Array {
  if (this.isNone) {
    return new Uint8Array([0]);
  }
  if (isBare) {
    return this.raw.toU8a(true);
  }

  const u8a = new Uint8Array(this.encodedLength);

  if (this.isSome) {
    u8a.set([1]);
    u8a.set(this.raw.toU8a(), 1);
  }

  return u8a;
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
