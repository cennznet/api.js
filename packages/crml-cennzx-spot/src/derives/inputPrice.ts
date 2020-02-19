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
import {getInputPrice} from '../utils/utils';
import {exchangeAddress} from './exchangeAddress';
import {coreAssetId, coreAssetIdAt, defaultFeeRate, defaultFeeRateAt} from './shared';

export function inputPrice(api: ApiInterfaceRx) {
  return (assetA: AnyAssetId, assetB: AnyAssetId, sellAmount: AnyNumber): Observable<BN> => {
    return coreAssetId(api)().pipe(
      switchMap(coreAssetId => {
        if (createType(api.registry, 'AssetId', assetA).eq(coreAssetId)) {
          return coreToAssetInputPrice(assetB, assetA, sellAmount, api);
        } else if (createType(api.registry, 'AssetId', assetB).eq(coreAssetId)) {
          return assetToCoreInputPrice(assetA, assetB, sellAmount, api);
        } else {
          return assetToAssetInputPrice(assetA, assetB, coreAssetId, sellAmount, api);
        }
      }),
      drr()
    );
  };
}

export function inputPriceAt(api: ApiInterfaceRx) {
  return (hash: Hash, assetA: AnyAssetId, assetB: AnyAssetId, sellAmount: AnyNumber): Observable<BN> => {
    return coreAssetIdAt(api)(hash).pipe(
      switchMap(coreAssetId => {
        if (createType(api.registry, 'AssetId', assetA).eq(coreAssetId)) {
          return coreToAssetInputPriceAt(hash, assetB, assetA, sellAmount, api);
        } else if (createType(api.registry, 'AssetId', assetB).eq(coreAssetId)) {
          return assetToCoreInputPriceAt(hash, assetA, assetB, sellAmount, api);
        } else {
          return assetToAssetInputPriceAt(hash, assetA, assetB, coreAssetId, sellAmount, api);
        }
      }),
      drr()
    );
  };
}

// Returns amount of core that can be bought with input assets.
function assetToCoreInputPrice(
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  sellAmount: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRate(api)()]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance(assetId, exchangeAddress),
        api.query.genericAsset.freeBalance(coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getInputPrice(new BN(sellAmount), tradeAssetReserve as any, coreAssetReserve as any, feeRate)
        )
      )
    )
  );
}

/// Returns amount of core that can be bought with input assets.
function assetToCoreInputPriceAt(
  hash: Hash,
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  sellAmount: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRateAt(api)(hash)]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance.at(hash, assetId, exchangeAddress),
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getInputPrice(new BN(sellAmount), tradeAssetReserve as any, coreAssetReserve as any, feeRate)
        )
      )
    )
  );
}

// Returns the amount of trade asset to pay for `sellAmount` of core sold.
function coreToAssetInputPrice(
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  sellAmount: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRate(api)()]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance(assetId, exchangeAddress),
        api.query.genericAsset.freeBalance(coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getInputPrice(new BN(sellAmount), coreAssetReserve as any, tradeAssetReserve as any, feeRate)
        )
      )
    )
  );
}

// Returns the amount of trade asset to pay for `sellAmount` of core sold.
function coreToAssetInputPriceAt(
  hash: Hash,
  assetId: AnyAssetId,
  coreAssetId: AnyAssetId,
  sellAmount: AnyNumber,
  api: ApiInterfaceRx
) {
  return combineLatest([exchangeAddress(api)(assetId), defaultFeeRateAt(api)(hash)]).pipe(
    switchMap(([exchangeAddress, feeRate]) =>
      combineLatest([
        api.query.genericAsset.freeBalance.at(hash, assetId, exchangeAddress),
        api.query.genericAsset.freeBalance.at(hash, coreAssetId, exchangeAddress),
      ]).pipe(
        map(([tradeAssetReserve, coreAssetReserve]) =>
          getInputPrice(new BN(sellAmount), coreAssetReserve as any, tradeAssetReserve as any, feeRate)
        )
      )
    )
  );
}

function assetToAssetInputPrice(
  assetA: AnyAssetId,
  assetB: AnyAssetId,
  coreAssetId: AnyAssetId,
  sellAmount: AnyNumber,
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
          const saleValueA = getInputPrice(
            new BN(sellAmount),
            tradeAssetReserveA as any,
            coreAssetReserveA as any,
            feeRate
          );
          return getInputPrice(new BN(saleValueA), coreAssetReserveB as any, tradeAssetReserveB as any, feeRate);
        })
      )
    )
  );
}

function assetToAssetInputPriceAt(
  hash: Hash,
  assetA: AnyAssetId,
  assetB: AnyAssetId,
  coreAssetId: AnyAssetId,
  sellAmount: AnyNumber,
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
          const saleValueA = getInputPrice(
            new BN(sellAmount),
            tradeAssetReserveA as any,
            coreAssetReserveA as any,
            feeRate
          );
          return getInputPrice(new BN(saleValueA), coreAssetReserveB as any, tradeAssetReserveB as any, feeRate);
        })
      )
    )
  );
}
