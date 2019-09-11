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

import {AssetId, createType, Tuple, u64} from '@cennznet/types';
import {AnyAssetId, AnyNumber} from '@cennznet/types/types';
import {blake2AsU8a, stringToU8a, u8aConcat} from '@cennznet/util';
import BN from 'bn.js';

import {MAX_U128, PERMILL_BASE, ROUND_UP} from '../constants';

/**
 * Generate the key of the balance storage
 * @param prefixString
 * @param assetId
 * @param address
 */
export function generateExchangeAddress(coreAssetId: AnyNumber, assetId: AnyNumber): string {
    // key1 encoded
    const prefixU8a: Uint8Array = stringToU8a('cennz-x-spot:');
    const key1U8a: Uint8Array = new u64(coreAssetId).toU8a(true);
    const key2U8a: Uint8Array = new u64(assetId).toU8a(true);

    const keyEncoded = blake2AsU8a(u8aConcat(prefixU8a, key1U8a, key2U8a));
    return createType('Address', keyEncoded).toString();
}

/**
 * create exchange key
 * @param coreAssetId
 * @param assetId
 */
export function getExchangeKey(coreAssetId: AnyAssetId, assetId: AnyNumber): Tuple {
    return new Tuple([AssetId, AssetId], [coreAssetId, assetId]);
}

export function getOutputPrice(outputAmount: BN, inputReserve: BN, outputReserve: BN, feeRate: BN): BN {
    if (inputReserve.isZero() || outputReserve.isZero() || outputAmount.gt(outputReserve)) {
        //return new BN(0);
        throw new Error('Pool balance is low');
    }
    if (outputAmount.eq(outputReserve)) {
        return new BN(MAX_U128);
    }
    const output = inputReserve
        .mul(outputAmount)
        .div(outputReserve.sub(outputAmount))
        .addn(1);
    return feeRate
        .mul(output)
        .divn(PERMILL_BASE)
        .add(output);
}

export function getInputPrice(inputAmount: BN, inputReserve: BN, outputReserve: BN, feeRate: BN): BN {
    if (inputReserve.isZero() || outputReserve.isZero()) {
        //return new BN(0);
        throw new Error('Pool balance is low');
    }
    const divRate = feeRate.addn(PERMILL_BASE);
    const inputAmountLessFee = inputAmount.muln(PERMILL_BASE).div(divRate);
    const numerator = inputAmountLessFee.mul(outputReserve);
    const denominator = inputAmountLessFee.add(inputReserve);
    const price = numerator.div(denominator);
    if (price.gte(outputReserve)) {
        throw new Error('Pool balance is low');
    }
    return price;
}

export function getLiquidityPrice(coreAmount: BN, coreReserve: BN, assetReserve: BN) {
    if (coreReserve.isZero() || assetReserve.isZero()) {
        return coreAmount;
    } else {
        return coreAmount
            .mul(assetReserve)
            .div(coreReserve)
            .addn(ROUND_UP);
    }
}

export function getAssetToWithdraw(liquidity: BN, coreReserve: BN, assetReserve: BN, totalLiquidity: BN) {
    if (liquidity.gt(totalLiquidity)) {
        throw new Error('Tried to overdraw liquidity');
    }
    const coreAmount = liquidity.mul(coreReserve).div(totalLiquidity);
    const assetAmount = liquidity.mul(assetReserve).div(totalLiquidity);
    return {coreAmount, assetAmount};
}
