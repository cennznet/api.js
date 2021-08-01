// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Struct, u128, u64 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';

/** @name ProposalId */
export interface ProposalId extends u64 {}

/** @name ProposalStatusInfo */
export interface ProposalStatusInfo extends Enum {
  readonly isDeliberation: boolean;
  readonly isApprovedWaitingEnactment: boolean;
  readonly isApprovedEnactmentCancelled: boolean;
  readonly isDisapproved: boolean;
}

/** @name ProposalVoteInfo */
export interface ProposalVoteInfo extends Struct {
  readonly voteBits: ITuple<[u128, u128]>;
  readonly activeBits: ITuple<[u128, u128]>;
}

export type PHANTOM_GOVERNANCE = 'governance';
