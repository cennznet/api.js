// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { AccountId } from '@polkadot/types/interfaces';

import { map, switchMap } from 'rxjs/operators';

import { memo } from '@polkadot/api-derive/util';
import type { DeriveStakingElected } from './types';

function combineAccounts(nextElected: AccountId[], validators: AccountId[]): AccountId[] {
  return [...nextElected].concat(...validators.filter((v) => !nextElected.find((n) => n.eq(v))));
}

export function electedInfo(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveStakingElected> {
  return memo(
    instanceId,
    (): Observable<DeriveStakingElected> =>
      api.derive.staking.validators().pipe(
        switchMap(
          ({ nextElected, validators }): Observable<DeriveStakingElected> => {
            const allAccounts = combineAccounts(nextElected, validators);
            const flags = { withExposure: true, withLedger: true, withPrefs: true };

            // @ts-ignore
            return api.derive.staking.queryMulti(allAccounts, flags).pipe(
              map(
                (info): DeriveStakingElected => ({
                  info,
                  nextElected,
                  validators,
                })
              )
            );
          }
        )
      )
  );
}
