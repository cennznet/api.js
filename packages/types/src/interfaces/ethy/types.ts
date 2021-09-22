// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Struct, U8aFixed, Vec, u64 } from '@polkadot/types';
import type { EthereumSignature } from '@polkadot/types/interfaces/eth';

/** @name EthyEventId */
export interface EthyEventId extends u64 {}

/** @name EthyId */
export interface EthyId extends U8aFixed {}

/** @name EventProof */
export interface EventProof extends Struct {
  readonly digest: U8aFixed;
  readonly eventId: EthyEventId;
  readonly validatorSetId: u64;
  readonly signatures: Vec<EthereumSignature>;
}

/** @name VersionedEventProof */
export interface VersionedEventProof extends Enum {
  readonly isSentinel: boolean;
  readonly isEventProof: boolean;
  readonly asEventProof: EventProof;
}

export type PHANTOM_ETHY = 'ethy';