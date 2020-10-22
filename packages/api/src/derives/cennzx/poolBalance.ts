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
import { AnyAssetId, Balance, Hash } from '@cennznet/types';
import { drr } from '@polkadot/rpc-core/rxjs';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { exchangeAddress } from './exchangeAddress';

/**
 * Returns the amount of asset in the exchange
 * @param assetId
 */
export function poolAssetBalance(instanceId: string, api: ApiInterfaceRx) {
  return (assetId: AnyAssetId): Observable<Balance> => {
    return exchangeAddress(
      instanceId,
      api
    )(assetId).pipe(
      switchMap(exchangeAddress => api.query.genericAsset.freeBalance(assetId, exchangeAddress)),
      drr()
    );
  };
}

/**
 * Returns the amount of core asset in the exchange for the asset
 * @param assetId
 */
export function poolCoreAssetBalance(instanceId: string, api: ApiInterfaceRx) {
  return (assetId: AnyAssetId): Observable<Balance> => {
    return combineLatest([exchangeAddress(instanceId, api)(assetId), api.query.cennzx.coreAssetId()]).pipe(
      switchMap(([exchangeAddress, coreAssetId]) => api.query.genericAsset.freeBalance(coreAssetId, exchangeAddress)),
      drr()
    );
  };
}

/**
 * Returns the amount of asset in the exchange at a blockHash
 * @param hash - blockHash
 * @param assetId
 */
export function poolAssetBalanceAt(instanceId: string, api: ApiInterfaceRx) {
  return (hash: Hash, assetId: AnyAssetId): Observable<Balance> => {
    return exchangeAddress(
      instanceId,
      api
    )(assetId).pipe(
      switchMap(exchangeAddress => api.query.genericAsset.freeBalance.at(hash, assetId, exchangeAddress)),
      drr()
    );
  };
}

/**
 * Returns the amount of core asset in the exchange for the asset at a blockHash
 * @param hash - blockHash
 * @param assetId
 */
export function poolCoreAssetBalanceAt(instanceId: string, api: ApiInterfaceRx) {
  return (hash: Hash, assetId: AnyAssetId): Observable<Balance> => {
    return combineLatest([exchangeAddress(instanceId, api)(assetId), api.query.cennzx.coreAssetId()]).pipe(
      switchMap(([exchangeAddress, coreAssetId]) =>
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddress)
      ),
      drr()
    );
  };
}
