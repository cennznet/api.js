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

import {AnyAddress, AnyNumber, CodecArg, IHash} from '@cennznet/types/types';
import BN from 'bn.js';
import {Observable} from 'rxjs';

export interface CodecArgObject {
    [index: string]: CodecArg;
}

export enum AssetType {
    STAKING = 'staking',
    SPENDING = 'spending',
    RESERVE = 'reserve',
    USER = 'user',
}

export interface IAsset {
    id: number;
    symbol: string;
    /**
     * @deprecated decimals will always be 18, and we expose it in constants.ts
     */
    decimals: number;
    type: AssetType;
}

export interface AssetOptionsValue extends CodecArgObject {
    initialIssuance: AnyNumber;
    permissions?: {
        update?: AnyAddress;
        mint?: AnyAddress;
        burn?: AnyAddress;
    };
}

export interface QueryableGetBalance {
    (assetId: AnyNumber, address: AnyAddress): Promise<BN>;

    (assetId: AnyNumber, address: AnyAddress, cb: any): Promise<() => any>;

    at(hash: IHash, assetId: AnyNumber, address: AnyAddress): Promise<BN>;
}

export interface QueryableGetBalanceRx {
    (assetId: AnyNumber, address: AnyAddress): Observable<BN>;

    at(hash: IHash, assetId: AnyNumber, address: AnyAddress): Observable<BN>;
}
