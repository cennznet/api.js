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

import {AssetId} from '@cennznet/types';
import {isBn} from '@cennznet/util';
import {ASSET_DECIMALS, MAX_RESERVE_ID} from '../constants';
import {AssetType} from '../types';
import EnhancedAssetId from './EnhancedAssetId';

const CENTRAPAY = {
    id: 1,
    symbol: 'CENTRAPAY',
    decimals: 18,
    type: AssetType.SPENDING,
};

describe('EnhancedAssetId', () => {
    describe('decoding', () => {
        it('from u8a', () => {
            const assetId = new AssetId(CENTRAPAY.id);
            const enhanced = new EnhancedAssetId(assetId.toU8a());
            expect(enhanced.toString()).toEqual(assetId.toString());
        });

        it('from number (reserve asset)', () => {
            const assetId = new AssetId(CENTRAPAY.id);
            const enhanced = new EnhancedAssetId(CENTRAPAY);
            expect(enhanced.toString()).toEqual(assetId.toString());
            expect(enhanced.isReserve()).toBeTruthy();
            expect(enhanced.symbol).toEqual(CENTRAPAY.symbol);
            expect(enhanced.decimals).toEqual(CENTRAPAY.decimals);
            expect(enhanced.type).toEqual(CENTRAPAY.type);
        });

        it('from number (not reserve asset)', () => {
            const enhanced = new EnhancedAssetId(MAX_RESERVE_ID + 1);
            expect(enhanced.toNumber()).toEqual(MAX_RESERVE_ID + 1);
            expect(enhanced.isReserve()).toBeFalsy();
            expect(enhanced.symbol).toBeUndefined();
            expect(enhanced.decimals).toEqual(ASSET_DECIMALS);
            expect(enhanced.type).toEqual(AssetType.USER);
        });

        it('from symbol', () => {
            const assetId = new AssetId(CENTRAPAY.id);
            const enhanced = new EnhancedAssetId(CENTRAPAY.symbol);
            expect(enhanced.toString()).toEqual(assetId.toString());
        });

        it('from invalid symbol', () => {
            expect(() => new EnhancedAssetId('xxx')).toThrow(/invalid asset/);
        });

        it('from asset object', () => {
            const enhanced = new EnhancedAssetId(CENTRAPAY);
            expect(enhanced.toString()).toEqual(CENTRAPAY.id.toString());
            expect(enhanced.isReserve()).toBeTruthy();
            expect(enhanced.symbol).toEqual(CENTRAPAY.symbol);
            expect(enhanced.decimals).toEqual(CENTRAPAY.decimals);
            expect(enhanced.type).toEqual(CENTRAPAY.type);
        });

        it('from BN', () => {
            const enhanced = new EnhancedAssetId(new AssetId(CENTRAPAY.id));
            expect(enhanced.toString()).toEqual(CENTRAPAY.id.toString());
            expect(enhanced.isReserve()).toBeTruthy();
            expect(enhanced.symbol).toEqual(CENTRAPAY.symbol);
            expect(enhanced.decimals).toEqual(CENTRAPAY.decimals);
            expect(enhanced.type).toEqual(CENTRAPAY.type);
        });
    });

    it('encoding the same', () => {
        const assetId = new AssetId(CENTRAPAY.id);
        const enhanced = new EnhancedAssetId(CENTRAPAY.id);
        expect(assetId.toU8a()).toEqual(enhanced.toU8a());
        expect(assetId.toU8a(true)).toEqual(enhanced.toU8a(true));
        expect(assetId.toHex()).toEqual(enhanced.toHex());
        expect(assetId.toBn().toString()).toEqual(enhanced.toBn().toString());
        expect(assetId.toNumber()).toEqual(enhanced.toNumber());
        expect(assetId.toString()).toEqual(enhanced.toString());
        expect(isBn(enhanced)).toBeTruthy();
    });
});
