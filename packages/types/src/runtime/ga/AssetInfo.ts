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

/*
 Custom `AssetOptions` type for generic asset module.
*/

import {Struct, u8, Vec} from '@polkadot/types';
import {Registry} from '@polkadot/types/types';

export default class AssetInfo extends Struct {
  constructor(registry: Registry, value: any) {
    super(registry, {symbol: 'Vec<u8>', decimalPlaces: u8}, value);
  }

  get symbol(): Vec<u8> {
    return this.get('symbol') as Vec<u8>;
  }

  get decimalPlaces(): u8 {
    return this.get('decimalPlaces') as u8;
  }
}
