// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u32 } from '@polkadot/types';
import type { Address } from '@polkadot/types/interfaces/runtime';

/** @name NotarizationPayload */
export interface NotarizationPayload extends Struct {
  readonly claimId: u32;
  readonly public: Address;
  readonly isValid: bool;
}

export type PHANTOM_ETHBRIDGE = 'ethBridge';
