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
import { createType, Tuple, u64, u32, AnyAssetId, AnyNumber, Registry } from '@cennznet/types';
import { stringToU8a, u8aConcat } from '@polkadot/util';
import BN from 'bn.js';
import { blake2AsU8a } from '@polkadot/util-crypto';

/**
 * Generate the key of the balance storage
 * @param coreAssetId
 * @param assetId
 */
export function generateExchangeAddress(registry: Registry, coreAssetId: AnyNumber, assetId: AnyNumber): string {
  // key1 encoded
  const prefixU8a: Uint8Array = stringToU8a('cennz-x-spot:');
  const key1U8a: Uint8Array = new u64(registry, coreAssetId).toU8a(true);
  const key2U8a: Uint8Array = new u64(registry, assetId).toU8a(true);

  const keyEncoded = blake2AsU8a(u8aConcat(prefixU8a, key1U8a, key2U8a));
  return createType(registry, 'Address', keyEncoded).toString();
}

/**
 * create exchange key
 * @param coreAssetId
 * @param assetId
 */
export function getExchangeKey(registry: Registry, coreAssetId: AnyAssetId, assetId: AnyNumber): Tuple {
  return new Tuple(registry, [u32, u32], [coreAssetId, assetId]);
}

/**
 * get the amount of core asset and other asset that can be withdrawn for given liquidity amount
 * @param liquidity
 * @param coreReserve
 * @param assetReserve
 * @param totalLiquidity
 */
export function getAssetToWithdraw(
  liquidity: BN,
  coreReserve: BN,
  assetReserve: BN,
  totalLiquidity: BN
): { coreAmount: BN; assetAmount: BN } {
  if (liquidity.gt(totalLiquidity)) {
    throw new Error('Tried to overdraw liquidity');
  }
  const coreAmount = liquidity.mul(coreReserve).div(totalLiquidity);
  const assetAmount = liquidity.mul(assetReserve).div(totalLiquidity);
  return { coreAmount, assetAmount };
}
