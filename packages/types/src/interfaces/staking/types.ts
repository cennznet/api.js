// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum, Vec } from '@polkadot/types/codec';
import { AccountId, Balance } from '@polkadot/types/interfaces/runtime';

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
}

/** @name VecDeque */
export interface VecDeque extends Vec<any> {}

export type PHANTOM_STAKING = 'staking';
