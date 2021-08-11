// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, Vec, bool, u128, u64 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name GovernanceProposal */
export interface GovernanceProposal extends Struct {
  readonly sponsor: AccountId;
  readonly justificationUri: Bytes;
  readonly enactmentDelay: BlockNumber;
}

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

/** @name ProposalVotes */
export interface ProposalVotes extends Struct {
  readonly proposalId: ProposalId;
  readonly votes: Vec<ITuple<[AccountId, Option<bool>]>>;
}

export type PHANTOM_GOVERNANCE = 'governance';
