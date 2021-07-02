// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Option, Raw, Struct, Vec, bool, i8, u32, u64 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { AccountId, Weight } from '@polkadot/types/interfaces/runtime';

/** @name Address */
export interface Address extends AccountId {}

/** @name BlockLength */
export interface BlockLength extends Struct {
  readonly max: PerDispatchClassU32;
}

/** @name BlockWeights */
export interface BlockWeights extends Struct {
  readonly baseBlock: Weight;
  readonly maxBlock: Weight;
  readonly perClass: PerDispatchClass;
}

/** @name ConsumedWeight */
export interface ConsumedWeight extends PerDispatchClass {}

/** @name Direction */
export interface Direction extends Enum {
  readonly isUp: boolean;
  readonly isLeft: boolean;
  readonly isDown: boolean;
  readonly isRight: boolean;
}

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

/** @name Food */
export interface Food extends Struct {
  readonly x: i8;
  readonly y: i8;
}

/** @name Index */
export interface Index extends u64 {}

/** @name PerDispatchClass */
export interface PerDispatchClass extends Struct {
  readonly normal: WeightPerClass;
  readonly operational: WeightPerClass;
  readonly mandatory: WeightPerClass;
}

/** @name PerDispatchClassU32 */
export interface PerDispatchClassU32 extends Struct {
  readonly normal: u32;
  readonly operational: u32;
  readonly mandatory: u32;
}

/** @name PhaseTo36 */
export interface PhaseTo36 extends Enum {
  readonly isApplyExtrinsic: boolean;
  readonly asApplyExtrinsic: u32;
  readonly isFinalization: boolean;
}

/** @name Slot */
export interface Slot extends u64 {}

/** @name Snake */
export interface Snake extends Struct {
  readonly body: Vec<ITuple<[i8, i8]>>;
  readonly dir: Direction;
  readonly direction_changed: bool;
}

/** @name WeightPerClass */
export interface WeightPerClass extends Struct {
  readonly baseExtrinsic: Weight;
  readonly maxExtrinsic: Weight;
  readonly maxTotal: Option<Weight>;
  readonly reserved: Option<Weight>;
}

/** @name WeightTo36 */
export interface WeightTo36 extends u32 {}

/** @name WindowSize */
export interface WindowSize extends Struct {
  readonly window_width: i8;
  readonly window_height: i8;
}

export type PHANTOM_SYSTEM = 'system';
