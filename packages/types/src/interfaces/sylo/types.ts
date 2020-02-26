// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import {Enum, Struct, Vec} from '@polkadot/types/codec';
import {AccountId} from '@polkadot/types/interfaces/runtime';
import {Bytes, H256, Text, u32} from '@polkadot/types/primitive';
import {ITuple} from '@polkadot/types/types';

/** @name AcceptPayload */
export interface AcceptPayload extends Struct {
  readonly account_id: AccountId;
}

/** @name DeviceId */
export interface DeviceId extends u32 {}

/** @name DeviceIdResponse */
export interface DeviceIdResponse extends DeviceId {}

/** @name Group */
export interface Group extends Struct {
  readonly groupId: H256;
  readonly members: Vec<Member>;
  readonly invites: Vec<PendingInvite>;
  readonly meta: Meta;
}

/** @name Invite */
export interface Invite extends Struct {
  readonly peerId: AccountId;
  readonly inviteData: Bytes;
  readonly inviteKey: H256;
  readonly meta: Meta;
  readonly roles: Vec<MemberRoles>;
}

/** @name Member */
export interface Member extends Struct {
  readonly userId: AccountId;
  readonly roles: Vec<MemberRoles>;
  readonly meta: Meta;
}

/** @name MemberRoles */
export interface MemberRoles extends Enum {
  readonly isAdminRole: boolean;
  readonly isMemberRole: boolean;
}

/** @name Meta */
export interface Meta extends Vec<ITuple<[Text, Text]>> {}

/** @name PendingInvite */
export interface PendingInvite extends Struct {
  readonly inviteKey: H256;
  readonly meta: Meta;
  readonly roles: Vec<MemberRoles>;
}

/** @name PreKeyBundle */
export interface PreKeyBundle extends Bytes {}

/** @name PreKeyBundlesResponse */
export interface PreKeyBundlesResponse extends Vec<PreKeyBundlesResponse> {}

/** @name Response */
export interface Response extends Enum {
  readonly isDeviceIdResponse: boolean;
  readonly isPreKeyBundlesResponse: boolean;
}

/** @name VaultKey */
export interface VaultKey extends Bytes {}

/** @name VaultValue */
export interface VaultValue extends Bytes {}

/** @name WithdrawnPreKeyBundle */
export interface WithdrawnPreKeyBundle extends ITuple<[AccountId, u32, Bytes]> {}
