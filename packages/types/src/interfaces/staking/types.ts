// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Struct, Vec, u32, u64 } from '@polkadot/types-codec';
import type { AccountId, AccountId32, Balance } from '@polkadot/types/interfaces/runtime';

/** @name Nominations */
export interface Nominations extends Struct {
  readonly targets: Vec<AccountId32>;
  readonly submittedIn: u32;
}

/** @name RewardBalance */
export interface RewardBalance extends Balance {}

/** @name RewardBalanceOf */
export interface RewardBalanceOf extends Balance {}

/** @name RewardDestination */
export interface RewardDestination extends Enum {
  readonly isStash: boolean;
  readonly isController: boolean;
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
  readonly type: 'Stash' | 'Controller' | 'Account';
}

/** @name VecDeque */
export interface VecDeque extends Vec<u64> {}

export type PHANTOM_STAKING = 'staking';
