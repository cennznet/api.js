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

import {ApiInterfaceRx} from '@cennznet/api/types';
import {AnyAssetId} from '@cennznet/types/types';
import {drr} from '@polkadot/rpc-core/rxjs';
import {Hash} from '@polkadot/types/interfaces';
import {combineLatest, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {exchangeAddress} from './exchangeAddress';

export function poolAssetBalance(api: ApiInterfaceRx) {
  return (assetId: AnyAssetId): Observable<any> => {
    return exchangeAddress(api)(assetId).pipe(
      switchMap(exchangeAddress => api.query.genericAsset.freeBalance(assetId, exchangeAddress)),
      drr()
    );
  };
}

export function poolCoreAssetBalance(api: ApiInterfaceRx) {
  return (assetId: AnyAssetId): Observable<any> => {
    return combineLatest([exchangeAddress(api)(assetId), api.query.cennzxSpot.coreAssetId()]).pipe(
      switchMap(([exchangeAddress, coreAssetId]) => api.query.genericAsset.freeBalance(coreAssetId, exchangeAddress)),
      drr()
    );
  };
}

export function poolAssetBalanceAt(api: ApiInterfaceRx) {
  return (hash: Hash, assetId: AnyAssetId): Observable<any> => {
    return exchangeAddress(api)(assetId).pipe(
      switchMap(exchangeAddress => api.query.genericAsset.freeBalance.at(hash, assetId, exchangeAddress)),
      drr()
    );
  };
}

export function poolCoreAssetBalanceAt(api: ApiInterfaceRx) {
  return (hash: Hash, assetId: AnyAssetId): Observable<any> => {
    return combineLatest([exchangeAddress(api)(assetId), api.query.cennzxSpot.coreAssetId()]).pipe(
      switchMap(([exchangeAddress, coreAssetId]) =>
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddress)
      ),
      drr()
    );
  };
}
