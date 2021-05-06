// Copyright 2019-2021 Centrality Investments Limited
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

import { AccountId, Address } from '@polkadot/types/interfaces';
import { AnyNumber } from '@polkadot/types/types';
import BN from 'bn.js';
export type {
  Hash,
  Block,
  AccountId,
  EventRecord,
  AssetId,
  Keys,
  Balance,
  Nominations,
  Permill,
  RuntimeDispatchInfo,
  EraIndex,
  Exposure,
  StakingLedger,
  ValidatorPrefs,
  Forcing,
} from '@polkadot/types/interfaces';
export * from '@polkadot/types/types';
export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;
export type AnyAssetId = AnyNumber;
export declare type AnyFunction = (...args: any[]) => any;
