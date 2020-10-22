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
import { AnyAssetId, AnyNumber, Hash } from '@cennznet/types';
import BN from 'bn.js';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAssetToWithdraw } from './utils';
import { poolAssetBalance, poolAssetBalanceAt, poolCoreAssetBalance, poolCoreAssetBalanceAt } from './poolBalance';
import { totalLiquidity, totalLiquidityAt } from './totalLiquidity';

/**
 * Given an asset Id and liquidity amount, the function returns the core and asset that can be withdrawn from exchange
 * @param assetId
 * @param liquidty
 */
export function assetToWithdraw(instanceId: string, api: ApiInterfaceRx) {
  return (assetId: AnyAssetId, liquidity: AnyNumber): Observable<{ coreAmount: BN; assetAmount: BN }> => {
    return combineLatest([
      poolAssetBalance(instanceId, api)(assetId),
      poolCoreAssetBalance(instanceId, api)(assetId),
      totalLiquidity(instanceId, api)(assetId),
    ]).pipe(
      map(([tradeAssetReserve, coreAssetReserve, totalLiquidity]) =>
        getAssetToWithdraw(
          new BN(liquidity.toString()),
          new BN(coreAssetReserve.toString()),
          new BN(tradeAssetReserve.toString()),
          new BN(totalLiquidity.toString())
        )
      )
    );
  };
}

/**
 * Given an asset Id and liquidity amount, the function returns the core and asset that can be withdrawn from exchange at a blockHash
 * @param hash - blockHash
 * @param assetId
 * @param liquidty
 */
export function assetToWithdrawAt(instanceId: string, api: ApiInterfaceRx) {
  return (hash: Hash, assetId: AnyAssetId, liquidity: AnyNumber): Observable<{ coreAmount: BN; assetAmount: BN }> => {
    return combineLatest([
      poolAssetBalanceAt(instanceId, api)(hash, assetId),
      poolCoreAssetBalanceAt(instanceId, api)(hash, assetId),
      totalLiquidityAt(instanceId, api)(hash, assetId),
    ]).pipe(
      map(([tradeAssetReserve, coreAssetReserve, totalLiquidity]) =>
        getAssetToWithdraw(
          new BN(liquidity.toString()),
          new BN(coreAssetReserve.toString()),
          new BN(tradeAssetReserve.toString()),
          new BN(totalLiquidity.toString())
        )
      )
    );
  };
}
