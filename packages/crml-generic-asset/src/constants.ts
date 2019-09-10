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

import {AssetType, IAsset} from './types';

export const ASSET_DECIMALS = 18;

export const defaultAssets: IAsset[] = [
    {
        id: 0,
        symbol: 'CENNZ',
        decimals: ASSET_DECIMALS,
        type: AssetType.STAKING,
    },
    {
        id: 1,
        symbol: 'CENTRAPAY',
        decimals: ASSET_DECIMALS,
        type: AssetType.SPENDING,
    },
    {
        id: 2,
        symbol: 'PLUG',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
    {
        id: 3,
        symbol: 'SYLO',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
    {
        id: 4,
        symbol: 'CERTI',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
    {
        id: 5,
        symbol: 'ARDA',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
    {
        id: 16000,
        symbol: 'CENNZ-T',
        decimals: ASSET_DECIMALS,
        type: AssetType.STAKING,
    },
    {
        id: 16001,
        symbol: 'CENTRAPAY-T',
        decimals: ASSET_DECIMALS,
        type: AssetType.SPENDING,
    },
    {
        id: 16002,
        symbol: 'PLUG-T',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
    {
        id: 16003,
        symbol: 'SYLO-T',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
    {
        id: 16004,
        symbol: 'CERTI-T',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
    {
        id: 16005,
        symbol: 'ARDA-T',
        decimals: ASSET_DECIMALS,
        type: AssetType.RESERVE,
    },
];

export const MAX_RESERVE_ID = 1000000;
