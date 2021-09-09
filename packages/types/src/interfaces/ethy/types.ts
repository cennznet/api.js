// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, U8aFixed, Vec, u64 } from '@polkadot/types';
import type { EthereumSignature } from '@polkadot/types/interfaces/eth';

/** @name EthyId */
export interface EthyId extends U8aFixed {}

/** @name EventProof */
export interface EventProof extends Struct {
  readonly digest: U8aFixed;
  readonly eventId: u64;
  readonly validatorSetId: u64;
  readonly signatures: Vec<EthereumSignature>;
}

export type PHANTOM_ETHY = 'ethy';
