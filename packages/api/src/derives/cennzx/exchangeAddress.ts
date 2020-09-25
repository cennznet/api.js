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

import { ApiInterfaceRx } from '@cennznet/api/types';
import { AnyAssetId } from '@cennznet/types/types';
import { drr } from '@polkadot/rpc-core/rxjs';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { generateExchangeAddress } from './utils';
import { coreAssetId } from './shared';

/**
 * Returns the exchange address for a given assetId
 @param assetId
 */
export function exchangeAddress(api: ApiInterfaceRx) {
  return (assetId: AnyAssetId): Observable<string> =>
    coreAssetId(api)().pipe(
      map(coreAssetId => generateExchangeAddress(api.registry, coreAssetId, assetId)),
      first(),
      drr()
    );
}
