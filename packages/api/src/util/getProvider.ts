// Copyright 2019-2020 Centrality Investments Limited
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

import { assert } from '@cennznet/util';
import { HttpProvider, WsProvider } from '@polkadot/rpc-provider';
import { ProviderInterface } from '@polkadot/rpc-provider/types';

const REGEX = /^(wss?|https?):\/\//;

export function getProvider(providerString: string): ProviderInterface {
  const providerStringLowerCase = providerString.toLowerCase();

  const group = REGEX.exec(providerStringLowerCase);
  assert(group, `Missing protocol: ${providerString}`);

  const protocol = group[1];

  if (protocol === 'wss' || protocol === 'ws') {
    return new WsProvider(providerStringLowerCase);
  } else if (protocol === 'https' || protocol === 'http') {
    return new HttpProvider(providerStringLowerCase);
  }

  // All cases should be handled above, but if not, throw an error
  throw new Error(`Invalid URL: ${providerString}`);
}
