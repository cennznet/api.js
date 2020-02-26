// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import {AssetId} from '@polkadot/types/interfaces/runtime';
import {u128} from '@polkadot/types/primitive';
import {ITuple} from '@polkadot/types/types';

/** @name ExchangeKey */
export interface ExchangeKey extends ITuple<[AssetId, AssetId]> {}

/** @name FeeRate */
export interface FeeRate extends u128 {}
