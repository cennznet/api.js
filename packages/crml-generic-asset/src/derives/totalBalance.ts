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

import { AnyAddress, AnyAssetId } from '@cennznet/types/types';
import { ApiInterfaceRx } from '@polkadot/api/types';
// import {drr} from '@polkadot/api-derive/util/drr';
import { drr } from '@polkadot/rpc-core/rxjs';
import { Balance, Hash } from '@polkadot/types/interfaces';
import BN from 'bn.js';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function totalBalance(api: ApiInterfaceRx) {
  return (assetId: AnyAssetId, address: AnyAddress): Observable<BN> => {
    return combineLatest([
      api.query.genericAsset.freeBalance(assetId, address),
      api.query.genericAsset.reservedBalance(assetId, address),
    ]).pipe(
      map(([freeBalance, reservedBalance]) => (freeBalance as Balance).add(reservedBalance as Balance)),
      drr()
    );
  };
}

export function totalBalanceAt(api: ApiInterfaceRx) {
  return (hash: Hash, assetId: AnyAssetId, address: AnyAddress): Observable<BN> => {
    return combineLatest([
      api.query.genericAsset.freeBalance.at(hash, assetId, address),
      api.query.genericAsset.reservedBalance.at(hash, assetId, address),
    ]).pipe(
      map(([freeBalance, reservedBalance]) => (freeBalance as Balance).add(reservedBalance as Balance)),
      drr()
    );
  };
}
