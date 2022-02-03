// Copyright 2017-2021 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiRx } from '@cennznet/api';
import type { Observable } from 'rxjs';

import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { memo } from '@polkadot/api-derive/util';
import { DeriveStakingQuery, DeriveStakingWaiting } from './types';

export function waitingInfo(instanceId: string, api: ApiRx): () => Observable<DeriveStakingWaiting> {
  return memo(
    instanceId,
    (): Observable<DeriveStakingWaiting> =>
      combineLatest([api.derive.stakingCennznet.validators(), api.derive.stakingCennznet.stashes()]).pipe(
        switchMap(
          ([{ nextElected }, stashes]): Observable<DeriveStakingWaiting> => {
            const elected = nextElected.map((a) => a.toString());
            const waiting = stashes.filter((v) => !elected.includes(v.toString()));

            return api.derive.stakingCennznet.queryMulti(waiting, { withLedger: true, withPrefs: true }).pipe(
              map(
                (info: DeriveStakingQuery[]): DeriveStakingWaiting => ({
                  info,
                  waiting,
                })
              )
            );
          }
        )
      )
  );
}
