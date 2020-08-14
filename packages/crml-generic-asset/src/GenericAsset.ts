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

import {Api} from '@cennznet/api';
import {QueryableStorageEntry, SubmittableExtrinsic} from '@cennznet/api/types';
import {AssetId} from '@cennznet/types';
import {AnyAddress, AnyAssetId, AnyNumber} from '@cennznet/types/types';
import {assert} from '@cennznet/util';
import {Balance} from '@polkadot/types/interfaces';
import {AssetOptionsValue} from './types';

export class GenericAsset {
    private _api: Api;

    constructor(api: Api) {
        assert(
            (api as any)._options.derives.genericAsset || ((api as any)._derive || {}).genericAsset,
            "init generic asset's derives first"
        );
        this._api = api;
    }

    get api(): Api {
        return this._api;
    }

    /**
     * Create an asset
     * @param options Initialization options of an asset
     */
    create(owner: AnyAddress, options: AssetOptionsValue): SubmittableExtrinsic<'promise'> {
        return this.api.tx.genericAsset.create(owner, options);
    }

    /**
     * Transfer asset to the destination account
     * @param assetId The id or symbol (for reserved asset) of the transferred asset
     * @param dest The address of the destination account
     * @param amount The amount to be transferred
     */
    transfer(assetId: AnyAssetId, dest: AnyAddress, amount: AnyNumber): SubmittableExtrinsic<'promise'> {
        return this.api.tx.genericAsset.transfer(assetId, dest, amount);
    }

    /**
     * Mint asset to the destination account
     * @param assetId The ID or symbol (for reserved asset) of the asset to be minted
     * @param destination The address of the destination account
     * @param amount The amount to be minted
     */
    mint(assetId: AnyAssetId, destination: AnyAddress, amount: AnyNumber): SubmittableExtrinsic<'promise'> {
        return this.api.tx.genericAsset.mint(assetId, destination, amount);
    }

    /**
     * Burn asset from the source account
     * @param assetId The ID or symbol (for reserved asset) of the asset to be minted
     * @param source The address of the source account
     * @param amount The amount to be burned
     */
    burn(assetId: AnyAssetId, source: AnyAddress, amount: AnyNumber): SubmittableExtrinsic<'promise'> {
        return this.api.tx.genericAsset.burn(assetId, source, amount);
    }

    /**
     * Query the next available asset ID
     */
    get getNextAssetId(): QueryableStorageEntry<'promise', AssetId> {
        return this.api.query.genericAsset.nextAssetId as any;
    }

    /**
     * Query the total issuance of an asset
     * @return a QueryableStorageFunction that needs a argument assetId
     * @param assetId id or symbol (for reserved asset) of the asset
     */
    get getTotalIssuance(): QueryableStorageEntry<'promise', Balance> {
        return this.api.query.genericAsset.totalIssuance as any;
    }

    // tslint:disable:member-ordering
    /**
     * Query free balance of an asset for an account
     * @param assetId The id or symbol (for reserved asset) of the asset
     * @param address The address of the account
     */
    get getFreeBalance(): QueryableStorageEntry<'promise', Balance> {
        return this.api.query.genericAsset.freeBalance as any;
    }

    /**
     * Query reserved balance of an asset for an account
     * @param assetId The id or symbol (for reserved asset) of the asset
     * @param address The address of the account
     */
    get getReservedBalance(): QueryableStorageEntry<'promise', Balance> {
        return this.api.query.genericAsset.reservedBalance as any;
    }

    /**
     * Query total balance of an asset for an account
     * @param assetId The id or symbol (for reserved asset) of the asset
     * @param address The address of the account
     */
    get getTotalBalance(): QueryableStorageEntry<'promise', Balance> {
        return this.api.derive.genericAsset.totalBalance as any;
    }

    // tslint:enable:member-ordering
}
