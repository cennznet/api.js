// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiRx } from '@cennznet/api';
import type { Observable } from 'rxjs';
import type { DeriveStakingOverview } from '@polkadot/api-derive/types';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { memo } from '@polkadot/api-derive/util';

/**
 * @description Retrieve the staking overview, including elected and points earned
 */
export function overview(instanceId: string, api: ApiRx): () => Observable<DeriveStakingOverview> {
  return memo(
    instanceId,
    (): Observable<DeriveStakingOverview> =>
      combineLatest([api.derive.session.indexes(), api.derive.stakingCennznet.validators()]).pipe(
        map(
          ([indexes, { nextElected, validators }]): DeriveStakingOverview => ({
            ...indexes,
            nextElected,
            validators,
          })
        )
      )
  );
}
