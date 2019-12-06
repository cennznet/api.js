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
import {AnyAssetId, AnyNumber} from '@cennznet/types/types';
import {Hash} from '@polkadot/types/interfaces';
import BN from 'bn.js';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getLiquidityPrice} from '../utils/utils';
import {poolAssetBalance, poolAssetBalanceAt, poolCoreAssetBalance, poolCoreAssetBalanceAt} from './poolBalance';

export function liquidityPrice(api: ApiInterfaceRx) {
    return (assetId: AnyAssetId, coreAmount: AnyNumber): Observable<BN> => {
        return combineLatest([poolAssetBalance(api)(assetId), poolCoreAssetBalance(api)(assetId)]).pipe(
            map(([tradeAssetReserve, coreAssetReserve]) =>
                getLiquidityPrice(new BN(coreAmount), coreAssetReserve as any, tradeAssetReserve as any)
            )
        );
    };
}

export function liquidityPriceAt(api: ApiInterfaceRx) {
    return (hash: Hash, assetId: AnyAssetId, coreAmount: AnyNumber): Observable<BN> => {
        return combineLatest([poolAssetBalanceAt(api)(hash, assetId), poolCoreAssetBalanceAt(api)(hash, assetId)]).pipe(
            map(([tradeAssetReserve, coreAssetReserve]) =>
                getLiquidityPrice(new BN(coreAmount), coreAssetReserve as any, tradeAssetReserve as any)
            )
        );
    };
}
