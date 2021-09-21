// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Raw, Struct, U8aFixed, bool, u32, u64 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { AllowedSlots } from '@polkadot/types/interfaces/babe';
import type { AccountId, LockIdentifier } from '@polkadot/types/interfaces/runtime';

/** @name Address */
export interface Address extends AccountId {}

/** @name BabeEpochConfiguration */
export interface BabeEpochConfiguration extends Struct {
  readonly c: ITuple<[u64, u64]>;
  readonly allowedSlots: AllowedSlots;
}

/** @name BeefyKey */
export interface BeefyKey extends U8aFixed {}

/** @name DispatchClassTo36 */
export interface DispatchClassTo36 extends Enum {
  readonly isNormal: boolean;
  readonly isOperational: boolean;
}

/** @name DispatchInfoTo36 */
export interface DispatchInfoTo36 extends Struct {
  readonly weight: WeightTo36;
  readonly class: DispatchClassTo36;
  readonly paysFee: bool;
}

/** @name doughnut */
export interface doughnut extends Raw {}

/** @name Index */
export interface Index extends u64 {}

/** @name PalletId */
export interface PalletId extends LockIdentifier {}

/** @name PhaseTo36 */
export interface PhaseTo36 extends Enum {
  readonly isApplyExtrinsic: boolean;
  readonly asApplyExtrinsic: u32;
  readonly isFinalization: boolean;
}

/** @name WeightTo36 */
export interface WeightTo36 extends u32 {}

export type PHANTOM_SYSTEM = 'system';
