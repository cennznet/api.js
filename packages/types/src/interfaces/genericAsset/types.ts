// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Compact, Enum, Struct, u64, u8 } from '@polkadot/types-codec';
import type { Reasons } from '@polkadot/types/interfaces/balances';
import type { AccountId, Balance, LockIdentifier } from '@polkadot/types/interfaces/runtime';

/** @name AssetInfoV40 */
export interface AssetInfoV40 extends Struct {
  readonly symbol: Bytes;
  readonly decimalPlaces: u8;
}

/** @name AssetInfoV41 */
export interface AssetInfoV41 extends Struct {
  readonly symbol: Bytes;
  readonly decimalPlaces: u8;
  readonly existentialDeposit: u64;
}

/** @name AssetOptions */
export interface AssetOptions extends Struct {
  readonly initialIssuance: Compact<Balance>;
  readonly permissions: PermissionLatest;
}

/** @name BalanceInformation */
export interface BalanceInformation extends Struct {
  readonly reserved: Balance;
  readonly staked: Balance;
  readonly available: Balance;
}

/** @name BalanceLock */
export interface BalanceLock extends Struct {
  readonly id: LockIdentifier;
  readonly amount: Balance;
  readonly reasons: Reasons;
}

/** @name Owner */
export interface Owner extends Enum {
  readonly isNone: boolean;
  readonly isAddress: boolean;
  readonly asAddress: AccountId;
  readonly type: 'None' | 'Address';
}

/** @name PermissionLatest */
export interface PermissionLatest extends PermissionsV1 {}

/** @name PermissionsV1 */
export interface PermissionsV1 extends Struct {
  readonly update: Owner;
  readonly mint: Owner;
  readonly burn: Owner;
}

/** @name PermissionVersions */
export interface PermissionVersions extends Enum {
  readonly isV1: boolean;
  readonly asV1: PermissionsV1;
  readonly type: 'V1';
}

export type PHANTOM_GENERICASSET = 'genericAsset';
