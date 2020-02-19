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
import {drr} from '@polkadot/rpc-core/rxjs';
import {createType} from '@polkadot/types';
import {Hash} from '@polkadot/types/interfaces';
import BN from 'bn.js';
import {combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {getOutputPrice} from '../utils/utils';
import {exchangeAddress} from './exchangeAddress';
import {coreAssetId, coreAssetIdAt, defaultFeeRate, defaultFeeRateAt} from './shared';

export function outputPrice(api: ApiInterfaceRx) {
  return (assetA: AnyAssetId, assetB: AnyAssetId, amountBought: AnyNumber): Observable<BN> => {
    return coreAssetId(api)().pipe(
      switchMap(coreAssetId => {
        if (createType(api.registry, 'AssetId', assetA).eq(coreAssetId)) {
          return coreToAssetOutputPrice(assetB, assetA, amountBought, api);
        } else if (createType(api.registry, 'AssetId', assetB).eq(coreAssetId)) {
          return assetToCoreOutputPrice(assetA, assetB, amountBought, api);
        } else {
          return assetToAssetOutputPrice(assetA, assetB, coreAssetId, amountBought, api);
        }
      }),
      drr()
    );
  };
}

export function outputPriceAt(api: ApiInterfaceRx) {
  return (hash: Hash, assetA: AnyAssetId, assetB: AnyAssetId, amountBought: AnyNumber): Observable<BN> => {
    return coreAssetIdAt(api)(hash).pipe(
      switchMap(coreAssetId => {
        if (createType(api.registry, 'AssetId', assetA).eq(coreAssetId)) {
          return coreToAssetOutputPriceAt(hash, assetB, assetA, amountBought, api);
        } else if (createType(api.registry, 'AssetId', assetB).eq(coreAssetId)) {
          return assetToCoreOutputPriceAt(hash, assetA, assetB, amountBought, api);
        } else {
          return assetToAssetOutputPriceAt(hash, assetA, assetB, coreAssetId, amountBought, api);
        }
      })
    );
  };
}

// Returns the amount of trade assets needed to buy `amountBought` core assets.
function assetToCoreOutputPrice(
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  amountBought: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRate(api)()]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance(assetId, exchangeAddress),
        api.query.genericAsset.freeBalance(coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getOutputPrice(new BN(amountBought), tradeAssetReserve as any, coreAssetReserve as any, feeRate)
        )
      )
    )
  );
}

// Returns the amount of trade assets needed to buy `amountBought` core assets.
function assetToCoreOutputPriceAt(
  hash: Hash,
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  amountBought: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRateAt(api)(hash)]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance.at(hash, assetId, exchangeAddress),
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getOutputPrice(new BN(amountBought), tradeAssetReserve as any, coreAssetReserve as any, feeRate)
        )
      )
    )
  );
}

// Returns the amount of core asset needed to purchase `amountBought` of trade asset.
function coreToAssetOutputPrice(
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  amountBought: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRate(api)()]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance(assetId, exchangeAddress),
        api.query.genericAsset.freeBalance(coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getOutputPrice(new BN(amountBought), coreAssetReserve as any, tradeAssetReserve as any, feeRate)
        )
      )
    )
  );
}

// Returns the amount of core asset needed to purchase `amountBought` of trade asset.
function coreToAssetOutputPriceAt(
  hash: Hash,
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  amountBought: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRateAt(api)(hash)]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance.at(hash, assetId, exchangeAddress),
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getOutputPrice(new BN(amountBought), coreAssetReserve as any, tradeAssetReserve as any, feeRate)
        )
      )
    )
  );
}

function assetToAssetOutputPrice(
  assetA: AnyAssetId,
  assetB: AnyAssetId,
  coreAssetId: AnyAssetId,
  amountBought: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetA), exchangeAddress(api)(assetB), defaultFeeRate(api)()]).pipe(
    switchMap(([exchangeAddressForA, exchangeAddressForB, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance(assetA, exchangeAddressForA),
        api.query.genericAsset.freeBalance(coreAssetId, exchangeAddressForA),
        api.query.genericAsset.freeBalance(assetB, exchangeAddressForB),
        api.query.genericAsset.freeBalance(coreAssetId, exchangeAddressForB),
      ]).pipe(
        map(([tradeAssetReserveA, coreAssetReserveA, tradeAssetReserveB, coreAssetReserveB]) => {
          const coreForB = getOutputPrice(
            new BN(amountBought),
            coreAssetReserveB as any,
            tradeAssetReserveB as any,
            feeRate
          );
          return getOutputPrice(new BN(coreForB), tradeAssetReserveA as any, coreAssetReserveA as any, feeRate);
        })
      )
    )
  );
}

function assetToAssetOutputPriceAt(
  hash: Hash,
  assetA: AnyAssetId,
  assetB: AnyAssetId,
  coreAssetId: AnyAssetId,
  amountBought: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetA), exchangeAddress(api)(assetB), defaultFeeRateAt(api)(hash)]).pipe(
    switchMap(([exchangeAddressForA, exchangeAddressForB, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance.at(hash, assetA, exchangeAddressForA),
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddressForA),
        api.query.genericAsset.freeBalance.at(hash, assetB, exchangeAddressForB),
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddressForB),
      ]).pipe(
        map(([tradeAssetReserveA, coreAssetReserveA, tradeAssetReserveB, coreAssetReserveB]) => {
          const coreForB = getOutputPrice(
            new BN(amountBought),
            coreAssetReserveB as any,
            tradeAssetReserveB as any,
            feeRate
          );
          return getOutputPrice(new BN(coreForB), tradeAssetReserveA as any, coreAssetReserveA as any, feeRate);
        })
      )
    )
  );
}
