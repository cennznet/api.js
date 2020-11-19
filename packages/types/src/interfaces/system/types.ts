// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { u64 } from '@polkadot/types/primitive';
import { AccountId } from '@polkadot/types/interfaces/runtime';
import { Raw } from '@polkadot/types';

/** @name Address */
export interface Address extends AccountId {}

/** @name Index */
export interface Index extends u64 {}

export type PHANTOM_SYSTEM = 'system';

export interface doughnut extends Raw {}
