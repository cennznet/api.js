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
import {LiquidatedAsset} from '../types'
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getAssetToWithdraw} from '../utils/utils';
import {poolAssetBalance, poolAssetBalanceAt, poolCoreAssetBalance, poolCoreAssetBalanceAt} from './poolBalance';
import {totalLiquidity, totalLiquidityAt} from './totalLiquidity';

export function assetToWithdraw(api: ApiInterfaceRx) {
    return (assetId: AnyAssetId, liquidity: AnyNumber): Observable<LiquidatedAsset> => {
        return combineLatest([
            poolAssetBalance(api)(assetId),
            poolCoreAssetBalance(api)(assetId),
            totalLiquidity(api)(assetId),
        ]).pipe(
            map(([tradeAssetReserve, coreAssetReserve, totalLiquidity]) =>
                new LiquidatedAsset(getAssetToWithdraw(
                    liquidity as any,
                    coreAssetReserve as any,
                    tradeAssetReserve as any,
                    totalLiquidity as any
                ))
            )
        );
    };
}

export function assetToWithdrawAt(api: ApiInterfaceRx) {
    return (hash: Hash, assetId: AnyAssetId, liquidity: AnyNumber): Observable<LiquidatedAsset> => {
        return combineLatest([
            poolAssetBalanceAt(api)(hash, assetId),
            poolCoreAssetBalanceAt(api)(hash, assetId),
            totalLiquidityAt(api)(hash, assetId),
        ]).pipe(
            map(([tradeAssetReserve, coreAssetReserve, totalLiquidity]) =>
                new LiquidatedAsset(getAssetToWithdraw(
                    liquidity as any,
                    coreAssetReserve as any,
                    tradeAssetReserve as any,
                    totalLiquidity as any
                ))
            )
        );
    };
}
