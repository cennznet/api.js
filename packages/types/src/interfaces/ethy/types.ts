// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, U8aFixed, Vec, u64 } from '@polkadot/types-codec';
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
  readonly blockHash: U8aFixed;
  readonly tag: Option<Bytes>;
}

/** @name VersionedEventProof */
export interface VersionedEventProof extends Enum {
  readonly isSentinel: boolean;
  readonly isEventProof: boolean;
  readonly asEventProof: EventProof;
  readonly type: 'Sentinel' | 'EventProof';
}

export type PHANTOM_ETHY = 'ethy';
