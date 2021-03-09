// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiInterfaceRx } from '@polkadot/api/types';
import { EraIndex, Moment, SessionIndex } from '@polkadot/types/interfaces';
import { DeriveSessionIndexes } from '@polkadot/api-derive/types';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Option, u32 } from '@polkadot/types';
import { isFunction } from '@polkadot/util';

import { memo } from '@polkadot/api-derive/util';

function isEraOpt(era: Option<EraIndex> | EraIndex): era is Option<EraIndex> {
  return isFunction((era as Option<EraIndex>).unwrapOrDefault);
}

// parse into Indexes
function parse([activeEra, activeEraStart, currentEra, currentIndex, validatorCount]: [
  EraIndex,
  Option<Moment>,
  EraIndex,
  SessionIndex,
  u32
]): DeriveSessionIndexes {
  return {
    activeEra,
    activeEraStart,
    currentEra,
    currentIndex,
    validatorCount,
  };
}

// query for previous V2
function queryNoActive(api: ApiInterfaceRx): Observable<DeriveSessionIndexes> {
  return api
    .queryMulti<[Option<EraIndex> | EraIndex, SessionIndex, u32]>([
      api.query.staking.currentEra,
      api.query.session.currentIndex,
      api.query.staking.validatorCount,
    ])
    .pipe(
      map(
        ([currentEraOpt, currentIndex, validatorCount]): DeriveSessionIndexes => {
          const currentEra = isEraOpt(currentEraOpt) ? currentEraOpt.unwrapOrDefault() : currentEraOpt;

          return parse([
            currentEra,
            api.registry.createType('Option<Moment>'),
            currentEra,
            currentIndex,
            validatorCount,
          ]);
        }
      )
    );
}

// empty set when none is available
function empty(api: ApiInterfaceRx): Observable<DeriveSessionIndexes> {
  return of(
    parse([
      api.registry.createType('EraIndex'),
      api.registry.createType('Option<Moment>'),
      api.registry.createType('EraIndex'),
      api.registry.createType('SessionIndex', 1),
      api.registry.createType('u32'),
    ])
  );
}

export function indexes(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveSessionIndexes> {
  return memo(
    instanceId,
    (): Observable<DeriveSessionIndexes> => (api.query.session && api.query.staking ? queryNoActive(api) : empty(api))
  );
}
