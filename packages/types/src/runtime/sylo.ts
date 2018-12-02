// Copyright 2019 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {AccountId, Bytes, EnumType, H256, Null, Struct, Text, Tuple, u32 as U32, Vector} from '@plugnet/types';
import {u8aToHex} from '@plugnet/util';

const GROUP_JSON_MAP = new Map([['groupId', 'group_id']]);

export class Group extends Struct {
    constructor(value) {
        super(
            {groupId: H256, members: Vector.with(Member), invites: Vector.with(PendingInvite), meta: Meta},
            value,
            GROUP_JSON_MAP
        );
    }
}

const MEMBER_JSON_MAP = new Map([['userId', 'user_id']]);

export class Member extends Struct {
    constructor(value) {
        super({userId: AccountId, roles: Vector.with(MemberRoles), meta: Meta}, value, MEMBER_JSON_MAP);
    }

    toJSON() {
        return {
            user_id: u8aToHex(this.get('userId').toU8a(), -1, false),
            roles: this.get('roles').toJSON(),
            meta: this.get('meta').toJSON(),
        };
    }
}

class AdminRole extends Null {
    toString() {
        return 'Admin';
    }
}
class MemberRole extends Null {
    toString() {
        return 'Member';
    }
}

export class MemberRoles extends EnumType<AdminRole | MemberRole> {
    constructor(value?: any, index?: number | EnumType<AdminRole | MemberRole>) {
        super([AdminRole, MemberRole] as any, value, index);
    }

    toJSON() {
        return this.value.toString();
    }
}

export class Meta extends Vector.with(Tuple.with([Text, Text])) {
    constructor(values) {
        super(values);
    }
}

const INVITE_JSON_MAP = new Map([['peerId', 'peer_id'], ['inviteData', 'invite_data'], ['inviteKey', 'invite_key']]);

export class Invite extends Struct {
    constructor(value) {
        super(
            {peerId: AccountId, inviteData: Bytes, inviteKey: H256, meta: Meta, roles: Vector.with(MemberRoles)},
            value,
            INVITE_JSON_MAP
        );
    }
}

const PENDING_INVITE_JSON_MAP = new Map([['inviteKey', 'invite_key']]);

export class PendingInvite extends Struct {
    constructor(value) {
        super({inviteKey: H256, meta: Meta, roles: Vector.with(MemberRoles)}, value, PENDING_INVITE_JSON_MAP);
    }

    toJSON() {
        return {
            invite_key: u8aToHex(this.get('inviteKey').toU8a(), -1, false),
            meta: this.get('meta').toJSON(),
            roles: this.get('roles').toJSON(),
        };
    }
}

export class AcceptPayload extends Struct {
    constructor(value) {
        super({account_id: AccountId}, value);
    }
}

export class DeviceId extends U32 {}

export class PreKeyBundle extends Bytes {
    constructor(values) {
        super(values);
    }
}

// Response enum constructors
class DeviceIdResponse extends DeviceId {}
class WithdrawnPreKeyBundle extends Tuple.with([AccountId, U32, Bytes]) {
    constructor(values) {
        super(values);
    }

    toJSON() {
        const values = this.toArray();
        const [accountId, deviceId, pkb] = values;
        return {
            accountId: u8aToHex(accountId.toU8a(), -1, false),
            deviceId: deviceId.toJSON(),
            pkb: pkb.toU8a(true),
        };
    }
}
class PreKeyBundlesResponse extends Vector.with(WithdrawnPreKeyBundle) {}
export class Response extends EnumType<DeviceIdResponse | PreKeyBundlesResponse> {
    constructor(value, index) {
        super([DeviceIdResponse, PreKeyBundlesResponse] as any, value, index);
    }
}

export class VaultKey extends Bytes {}

export class VaultValue extends Bytes {}
