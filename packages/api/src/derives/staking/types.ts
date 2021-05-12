// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, Exposure, StakingLedger, ValidatorPrefs } from '@cennznet/types';
import type { DeriveSessionIndexes } from '@polkadot/api-derive/session/types';
import type { RewardDestination } from '@cennznet/types/interfaces/staking';

export interface DeriveStakingStash {
  controllerId: AccountId | null;
  exposure: Exposure;
  nominators: AccountId[];
  rewardDestination: RewardDestination;
  stashId: AccountId;
  validatorPrefs: ValidatorPrefs;
}

export interface DeriveStakingQuery extends DeriveStakingStash {
  accountId: AccountId;
  stakingLedger: StakingLedger;
}

export interface DeriveStakingElected {
  info: DeriveStakingQuery[];
  nextElected: AccountId[];
  validators: AccountId[];
}

export interface DeriveStakingOverview extends DeriveSessionIndexes {
  nextElected: AccountId[];
  validators: AccountId[];
}

export interface DeriveStakingWaiting {
  info: DeriveStakingQuery[];
  waiting: AccountId[];
}
