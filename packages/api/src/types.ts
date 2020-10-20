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

import { DecoratedCennznetDerive } from '@cennznet/api/derives';
import ApiBase from '@polkadot/api/base';
import { ApiOptions as ApiOptionsBase } from '@polkadot/api/types';
export * from '@polkadot/api/types';
export type ApiTypes = 'promise' | 'rxjs';
import { ProviderInterface } from '@polkadot/rpc-provider/types';

export interface ApiOptions extends Pick<ApiOptionsBase, Exclude<keyof ApiOptionsBase, 'provider'>> {
  /**
   * provider implement ProviderInterface or string url for WsProvider.
   * If not specified, it will default to connecting to the
   * localhost with the default port, i.e. `ws://127.0.0.1:9944`
   */
  provider?: ProviderInterface | string;
  /**
   * timeout for Api.create
   * default 10000 ms, 0 indicates no limit
   */
  timeout?: number;
}

export type Derives<ApiType extends ApiTypes> = ReturnType<ApiBase<ApiType>['_decorateDerive']> &
  DecoratedCennznetDerive<ApiType>;
