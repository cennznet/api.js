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
import { AnyAssetId } from '@cennznet/types/interfaces';
import { Hash } from '@polkadot/types/interfaces';
import BN from 'bn.js';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getExchangeKey } from './utils';
import { coreAssetId, coreAssetIdAt } from './shared';

/**
 * Returns the total liqudity in the exchange for the asset
 * @param assetId
 */
export function totalLiquidity(instanceId: string, api: ApiInterfaceRx) {
  return (assetId: AnyAssetId): Observable<BN> => {
    return coreAssetId(instanceId, api)().pipe(
      switchMap(coreAssetId => {
        const exchangeKey = getExchangeKey(api.registry, coreAssetId, assetId);
        return (api.query.cennzx.totalLiquidity(exchangeKey) as unknown) as Observable<BN>;
      })
    );
  };
}

/**
 * Returns the total liqudity in the exchange for the asset at a blockHash
 * @param hash - blockHash
 * @param assetId
 */
export function totalLiquidityAt(instanceId: string, api: ApiInterfaceRx) {
  return (hash: Hash, assetId: AnyAssetId): Observable<BN> => {
    return coreAssetIdAt(
      instanceId,
      api
    )(hash).pipe(
      switchMap(coreAssetId => {
        const exchangeKey = getExchangeKey(api.registry, coreAssetId, assetId);
        return (api.query.cennzx.totalLiquidity.at(hash, exchangeKey) as unknown) as Observable<BN>;
      })
    );
  };
}
