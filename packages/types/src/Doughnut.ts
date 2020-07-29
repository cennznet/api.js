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

import {Doughnut as DoughnutCodec} from '@plugnet/doughnut-wasm';
import Raw from '@polkadot/types/codec/Raw';
import {AnyU8a, Registry} from '@polkadot/types/types';

/**
 * A v0 Doughnut certificate
 * It is attached to an extrinsic in it's binary encoded form.
 **/
export default class Doughnut extends Raw {
  get encodedLength(): number {
    return this.toU8a().length;
  }

  constructor(registry: Registry, value?: AnyU8a) {
    // This function doubles as the SCALE codec decode function.
    // [[value]] can be a concatenation of encoded fields e.g. [sender][method][doughnut][era][nonce]
    // NOT only doughnut bytes.
    // We must ensure that any doughnut specific bytes are consumed
    // so that the buffer [[value]] may be passed along to decode other types successfully
    const doughnut = DoughnutCodec.decode(value as Uint8Array);
    super(registry, doughnut.encode());
  }
}
