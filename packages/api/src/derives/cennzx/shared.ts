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
import { AssetId } from '@cennznet/types';
import { drr } from '@polkadot/rpc-core/rxjs';
import { Hash, Permill } from '@cennznet/types/interfaces';
import { Observable } from 'rxjs';

export function coreAssetId(api: ApiInterfaceRx) {
  return (): Observable<AssetId> => api.query.cennzx.coreAssetId().pipe(drr()) as Observable<AssetId>;
}

export function coreAssetIdAt(api: ApiInterfaceRx) {
  return (hash: Hash): Observable<AssetId> => api.query.cennzx.coreAssetId.at(hash).pipe(drr()) as Observable<AssetId>;
}

export function defaultFeeRate(api: ApiInterfaceRx) {
  return (): Observable<Permill> => api.query.cennzx.defaultFeeRate().pipe(drr()) as Observable<Permill>;
}

export function defaultFeeRateAt(api: ApiInterfaceRx) {
  return (hash: Hash): Observable<Permill> =>
    api.query.cennzx.defaultFeeRate.at(hash).pipe(drr()) as Observable<Permill>;
}
