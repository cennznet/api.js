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

import { ApiTypes } from '@cennznet/api/types';
import { AnyFunction } from '@cennznet/types';
import { ApiInterfaceRx, MethodResult } from '@polkadot/api/types';
import { Observable } from 'rxjs';
import * as attestation from './attestation';
import * as cennzx from './cennzx';
import * as ethBridge from './ethBridge';
import * as fees from './fees';
import * as nft from './nft';
import * as session from './session';
import * as staking from './staking';
import * as balances from './balances';
import * as governance from './governance';

export type DeriveFunc = (instanceId: string, api: ApiInterfaceRx) => (...args: any[]) => Observable<any>;

export const derive = { attestation, balances, cennzx, ethBridge, fees, governance, nft, staking, session };

export type DecoratedCennznetDerive<
  ApiType extends ApiTypes,
  AllSections extends { [section: string]: { [method: string]: DeriveFunc } } = typeof derive
> = {
  [SectionName in keyof AllSections]: {
    [MethodName in keyof AllSections[SectionName]]: MethodResult<
      ApiType,
      ReturnType<AllSections[SectionName][MethodName]>
    >;
  };
};

export default derive;
