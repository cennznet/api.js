// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Raw, Struct, bool, u32, u64 } from '@polkadot/types-codec';
import type { AccountId } from '@polkadot/types/interfaces/runtime';

/** @name Address */
export interface Address extends AccountId {}

/** @name DispatchClassTo36 */
export interface DispatchClassTo36 extends Enum {
  readonly isNormal: boolean;
  readonly isOperational: boolean;
  readonly type: 'Normal' | 'Operational';
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

/** @name PhaseTo36 */
export interface PhaseTo36 extends Enum {
  readonly isApplyExtrinsic: boolean;
  readonly asApplyExtrinsic: u32;
  readonly isFinalization: boolean;
  readonly type: 'ApplyExtrinsic' | 'Finalization';
}

/** @name WeightTo36 */
export interface WeightTo36 extends u32 {}

export type PHANTOM_SYSTEM = 'system';
