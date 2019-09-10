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
import {assert, isString} from '@cennznet/util';
import {ASSET_DECIMALS, MAX_RESERVE_ID} from '../constants';
import {AssetType, IAsset} from '../types';
import {isAssetObj, isStringNumber} from '../utils/utils';
import {findAssetById, findAssetBySymbol} from './assetRegistry';

/**
 * enhance AssetId with addition info like symbol, decimals, asset type if it is a reserved asset
 */
export default class EnhancedAssetId extends AssetId {
    private readonly _asset: IAsset;
    /**
     *
     * @param value could be assetId (if value is a number in any form) or assetSymbol (if value is non-number string) or IAsset Object
     */
    constructor(value: any) {
        if (isString(value) && !isStringNumber(value as string)) {
            // value is asset symbol
            const asset = findAssetBySymbol(value as string);
            assert(asset, `invalid asset symbol ${value}`);
            super(asset.id);
            this._asset = asset;
        } else if (isAssetObj(value)) {
            // value is asset object
            super(value.id);
            this._asset = value;
        } else {
            super(value);
            this._asset = findAssetById(this.toNumber());
        }
    }

    /**
     * symbol of asset for reserved asset
     */
    get symbol() {
        return this._asset ? this._asset.symbol : undefined;
    }

    /**
     * decimals of asset for reserved asset
     * @deprecated decimals will always be 18 with no exception
     */
    get decimals() {
        return ASSET_DECIMALS;
    }

    /**
     * type of asset
     */
    get type() {
        return this._asset ? this._asset.type : AssetType.USER;
    }

    /**
     * check is reserve base on asset id range
     */
    isReserve(): boolean {
        return this.toNumber() <= MAX_RESERVE_ID;
    }
}
