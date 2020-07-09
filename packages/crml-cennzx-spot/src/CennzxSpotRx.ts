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

import {ApiRx} from '@cennznet/api';
import {QueryableStorageEntry, SubmittableExtrinsic} from '@cennznet/api/types';
import {AssetId} from '@cennznet/types';
import {AnyAddress, AnyAssetId, AnyNumber} from '@cennznet/types/types';
import {assert} from '@cennznet/util';
import {
  QueryableGetAssetWithdrawnRx,
  QueryableGetLiquidityBalancePriceRx,
  QueryableGetLiquidityBalanceRx,
  QueryableGetPoolBalanceRx,
  QueryableTotalLiquidityBalanceRx,
} from './types';

export class CennzxSpotRx {
  private readonly _api: ApiRx;

  constructor(api: ApiRx) {
    assert(
      (api as any)._options.derives.cennzxSpot || ((api as any)._derive || {}).cennzxSpot,
      "init cennzx spot's derives first"
    );
    this._api = api;
  }

  get api(): ApiRx {
    return this._api;
  }

  /**
   * add liquidity
   * @param {assetId} - The trade asset ID
   * @param {minLiquidity} - The minimum liquidity to add
   * @param {maxAssetAmount} - Amount of trade asset to add
   * @param {coreAmount} - Amount of core asset to add
   */
  addLiquidity(
    assetId: AnyNumber,
    minLiquidity: AnyNumber,
    maxAssetAmount: AnyNumber,
    coreAmount: AnyNumber,
    expire: AnyNumber
  ): SubmittableExtrinsic<'rxjs'> {
    return this.api.tx.cennzxSpot.addLiquidity(assetId, minLiquidity, maxAssetAmount, coreAmount);
  }

  /**
   * remove liquidity
   * @param assetId - The asset to remove
   * @param assetAmount - Amount of exchange asset to burn
   * @param minAssetWithdraw - The minimum trade asset withdrawn
   * @param minCoreWithdraw - The minimum core asset withdrawn
   */
  removeLiquidity(
    assetId: AnyAssetId,
    assetAmount: AnyNumber,
    minAssetWithdraw: AnyNumber,
    minCoreAssetWithdraw: AnyNumber
  ): SubmittableExtrinsic<'rxjs'> {
    return this.api.tx.cennzxSpot.removeLiquidity(assetId, assetAmount, minAssetWithdraw, minCoreAssetWithdraw);
  }

  /**
   * Asset 1 to asset 2 swap output
   * @param assetSold The asset to sell
   * @param assetBuy The asset to Buy
   * @param amountBought amount of asset 2 to buy
   * @param maxAmountSold maximum amount of asset 1 allowed to sell
   */
  assetSwapOutput(
    assetSold: AnyAssetId,
    assetBought: AnyAssetId,
    amountBought: AnyNumber,
    maxAmountSold: AnyNumber
  ): SubmittableExtrinsic<'rxjs'> {
    return this.api.tx.cennzxSpot.assetSwapOutput(null, assetSold, assetBought, amountBought, maxAmountSold);
  }

  /**
   * Asset 1 to asset 2 transfer output
   * @param recipient - The address that receives the output asset
   * @param assetSold The asset to sell
   * @param assetBuy The asset to buy
   * @param amountBought amount of asset 2 to buy
   * @param maxAmountSold maximum amount of asset allowed to sell
   */
  assetTransferOutput(
    recipient: AnyAddress,
    assetSold: AnyAssetId,
    assetBought: AnyAssetId,
    amountBought: AnyNumber,
    maxAmountSold: AnyNumber
  ): SubmittableExtrinsic<'rxjs'> {
    return this.api.tx.cennzxSpot.assetSwapOutput(recipient, assetSold, assetBought, amountBought, maxAmountSold);
  }

  /**
   * Asset 1 to asset 2 swap input
   * @param assetSold The asset to sell
   * @param assetBuy The asset to buy
   * @param amountSell amount of trade asset 1 to sell
   * @param minSale Min trade asset 2 to receive from sale (output)
   */
  assetSwapInput(
    assetSold: AnyAssetId,
    assetBought: AnyAssetId,
    amountSell: AnyNumber,
    minReceive: AnyNumber
  ): SubmittableExtrinsic<'rxjs'> {
    return this.api.tx.cennzxSpot.assetSwapInput(null, assetSold, assetBought, amountSell, minReceive);
  }

  /**
   * Asset 1 to asset 2 transfer input
   * @param recipient - The address that receives the output asset
   * @param assetSold The asset to sell
   * @param assetBuy The asset to buy
   * @param amountSell amount of trade asset to sell
   * @param minSale Min core asset to receive from sale (output)
   */
  assetTransferInput(
    recipient: AnyAddress,
    assetSold: AnyAssetId,
    assetBought: AnyAssetId,
    amountSell: AnyNumber,
    minReceive: AnyNumber
  ): SubmittableExtrinsic<'rxjs'> {
    return this.api.tx.cennzxSpot.assetSwapInput(recipient, assetSold, assetBought, amountSell, minReceive);
  }

  /**
   * Query the total liquidity of an exchange pool
   * @param assetId
   */
  get getTotalLiquidity(): QueryableTotalLiquidityBalanceRx {
    const _fn = this.api.derive.cennzxSpot.totalLiquidity as QueryableTotalLiquidityBalanceRx;
    _fn.at = this.api.derive.cennzxSpot.totalLiquidityAt;

    return _fn;
  }

  /**
   * Query the core asset id
   */
  get getCoreAssetId(): QueryableStorageEntry<'rxjs', AssetId> {
    return this.api.query.cennzxSpot.coreAssetId as any;
  }

  // tslint:disable:member-ordering
  /**
   * Query liquidity balance for an account
   * @param {(AnyNumber,AnyNumber)} coreAssetIs, assetId The id of the asset
   * @param {AnyAddress} address The address of the account
   */
  get getLiquidityBalance(): QueryableGetLiquidityBalanceRx {
    const _fn = this.api.derive.cennzxSpot.liquidityBalance as QueryableGetLiquidityBalanceRx;
    _fn.at = this.api.derive.cennzxSpot.liquidityBalanceAt;

    return _fn;
  }

  // tslint:disable:member-ordering
  /**
   * Query balance for an exchange pool
   * @param assetId The id of the asset
   */
  get getPoolAssetBalance(): QueryableGetPoolBalanceRx {
    const _fn = this.api.derive.cennzxSpot.poolAssetBalance as QueryableGetPoolBalanceRx;
    _fn.at = this.api.derive.cennzxSpot.poolAssetBalanceAt;

    return _fn;
  }

  // tslint:disable:member-ordering
  /**
   * Query balance for an exchange pool
   * @param assetId The id of the asset
   */
  get getPoolCoreAssetBalance(): QueryableGetPoolBalanceRx {
    const _fn = this.api.derive.cennzxSpot.poolCoreAssetBalance as QueryableGetPoolBalanceRx;
    _fn.at = this.api.derive.cennzxSpot.poolCoreAssetBalanceAt;

    return _fn;
  }

  /**
   * Query asset withdrawn to get the max core and max asset which can we withdrawn with the input liquidity
   * @param assetId The id of the asset
   * @param liquidity - user liquidity
   */
  get assetToWithdraw(): QueryableGetAssetWithdrawnRx {
    const _fn = this.api.derive.cennzxSpot.assetToWithdraw as QueryableGetAssetWithdrawnRx;
    _fn.at = this.api.derive.cennzxSpot.assetToWithdraw;

    return _fn;
  }
}
