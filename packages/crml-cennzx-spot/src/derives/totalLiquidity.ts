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

import {ApiInterfaceRx} from '@cennznet/api/polkadot.types';
import {AnyAssetId} from '@cennznet/crml-generic-asset/types';
import {Hash} from '@plugnet/types/interfaces';
import BN from 'bn.js';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {getExchangeKey} from '../utils/utils';
import {coreAssetId, coreAssetIdAt} from './shared';

export function totalLiquidity(api: ApiInterfaceRx) {
    return (assetId: AnyAssetId): Observable<BN> => {
        return coreAssetId(api)().pipe(
            switchMap(coreAssetId => {
                const exchangeKey = getExchangeKey(coreAssetId, assetId);
                return (api.query.cennzxSpot.totalSupply(exchangeKey) as unknown) as Observable<BN>;
            })
        );
    };
}

export function totalLiquidityAt(api: ApiInterfaceRx) {
    return (hash: Hash, assetId: AnyAssetId): Observable<BN> => {
        return coreAssetIdAt(api)(hash).pipe(
            switchMap(coreAssetId => {
                const exchangeKey = getExchangeKey(coreAssetId, assetId);
                return (api.query.cennzxSpot.totalSupply.at(hash, exchangeKey) as unknown) as Observable<BN>;
            })
        );
    };
}
