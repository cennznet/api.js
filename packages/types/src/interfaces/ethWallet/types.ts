// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types-codec';
import type { Call, Index } from '@polkadot/types/interfaces/runtime';

/** @name EthWalletCall */
export interface EthWalletCall extends Struct {
  readonly call: Call;
  readonly nonce: Index;
}

export type PHANTOM_ETHWALLET = 'ethWallet';
