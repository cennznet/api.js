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

import { ApiTypes } from '@cennznet/api/types';
import * as attestation from '@cennznet/crml-attestation/derives';
import * as cennzx from '@cennznet/crml-cennzx-spot/derives';
import * as genericAsset from '@cennznet/crml-generic-asset/derives';
import { AnyFunction } from '@cennznet/types/types';
import { ApiInterfaceRx, MethodResult } from '@polkadot/api/types';
import { Observable } from 'rxjs';
import * as fees from './fees';
import * as session from './session';
import * as staking from './staking';

export type DeriveFunc = (api: ApiInterfaceRx) => (...args: any[]) => Observable<any>;

export const derive = { attestation, cennzx, fees, staking, session, genericAsset };

export type DecoratedCennznetDerive<
  ApiType extends ApiTypes,
  AllSections extends { [section: string]: { [method: string]: DeriveFunc } } = typeof derive
> = {
  [SectionName in keyof AllSections]: {
    [MethodName in keyof AllSections[SectionName]]: ReturnType<AllSections[SectionName][MethodName]> extends AnyFunction
      ? MethodResult<ApiType, ReturnType<AllSections[SectionName][MethodName]>>
      : never;
  };
};

export default derive;
