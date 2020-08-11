// Copyright 2020 Centrality Investments Limited
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
import * as cennzxSpot from '@cennznet/crml-cennzx-spot/derives';
import * as genericAsset from '@cennznet/crml-generic-asset/derives';
import { AnyFunction } from '@polkadot/types/types';
import { ApiInterfaceRx, MethodResult } from '@polkadot/api/types';
import * as accounts from '@polkadot/api-derive/accounts';
import * as chain from '@polkadot/api-derive/chain';
import * as contracts from '@polkadot/api-derive/contracts';
import * as elections from '@polkadot/api-derive/elections';
import * as imOnline from '@polkadot/api-derive/imOnline';
import * as session from '@polkadot/api-derive/session';
import * as treasury from '@polkadot/api-derive/treasury';
import * as tx from '@polkadot/api-derive/tx';
export * from '@polkadot/api-derive/type';
import { Observable } from 'rxjs';
import * as fees from './fees';

export type DeriveFunc = (api: ApiInterfaceRx) => (...args: any[]) => Observable<any>;

export const derive = { accounts, chain, contracts, elections, imOnline, session, treasury, tx, attestation, cennzxSpot, genericAsset, fees };

type DeriveSection<Section> = {
  [Method in keyof Section]: Section[Method] extends AnyFunction
    ? ReturnType<Section[Method]> // ReturnType<Section[Method]> will be the inner function, i.e. without (api) argument
    : never;
};
type DeriveAllSections<AllSections> = {
  [Section in keyof AllSections]: DeriveSection<AllSections[Section]>
};

export type DeriveCustom = Record<string, Record<string, (api: ApiInterfaceRx) => (...args: any[]) => Observable<any>>>;

export type ExactDerive = DeriveAllSections<typeof derive>;

// Enable derive only if some of these modules are available
const deriveAvail: Record<string, string[]> = {
  contracts: ['contracts'],
  elections: ['electionsPhragmen', 'elections'],
  imOnline: ['imOnline'],
  session: ['session'],
  treasury: ['treasury'],
};

/**
 * Returns an object that will inject `api` into all the functions inside
 * `allSections`, and keep the object architecture of `allSections`.
 */
/** @internal */
function injectFunctions<AllSections> (api: ApiInterfaceRx, allSections: AllSections): DeriveAllSections<AllSections> {
  const queryKeys = Object.keys(api.query);

  return Object
    .keys(allSections)
    .filter((sectionName): boolean =>
      !deriveAvail[sectionName] || deriveAvail[sectionName].some((query): boolean => queryKeys.includes(query))
    )
    .reduce((deriveAcc, sectionName): DeriveAllSections<AllSections> => {
      const section = allSections[sectionName as keyof AllSections];

      deriveAcc[sectionName as keyof AllSections] = Object
        .keys(section)
        .reduce((sectionAcc, _methodName): DeriveSection<typeof section> => {
          const methodName = _methodName as keyof typeof section;
          // Not sure what to do here, casting as any. Though the final types are good
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
          const method = (section[methodName] as any)(api);

          // idem
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          (sectionAcc as any)[methodName] = method;

          return sectionAcc;
        }, {} as DeriveSection<typeof section>);

      return deriveAcc;
    }, {} as DeriveAllSections<AllSections>);
}

// FIXME The return type of this function should be {...ExactDerive, ...DeriveCustom}
// For now we just drop the custom derive typings
/** @internal */
export default function decorateDerive (api: ApiInterfaceRx, custom: DeriveCustom = {}): ExactDerive {
  return {
    ...injectFunctions(api, derive),
    ...injectFunctions(api, custom)
  };
}

export type DecoratedCennznetDerive<
  ApiType extends ApiTypes,
  AllSections extends {[section: string]: {[method: string]: DeriveFunc}} = typeof derive
> = {
  [SectionName in keyof AllSections]: {
    [MethodName in keyof AllSections[SectionName]]: ReturnType<AllSections[SectionName][MethodName]> extends AnyFunction
      ? MethodResult<ApiType, ReturnType<AllSections[SectionName][MethodName]>>
      : never;
  };
};
