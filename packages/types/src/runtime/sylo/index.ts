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

import {ClassOf, Enum, Struct, Text, Tuple, Vec} from '@polkadot/types';
import {u8aToHex} from '@polkadot/util';

const GROUP_JSON_MAP = new Map([['groupId', 'group_id']]);

export class Group extends Struct {
    constructor(value) {
        super(
            {
                groupId: 'H256',
                members: Vec.with(Member),
                invites: Vec.with(PendingInvite),
                meta: Meta,
            },
            value,
            GROUP_JSON_MAP
        );
    }
}

const MEMBER_JSON_MAP = new Map([['userId', 'user_id']]);

export class Member extends Struct {
    constructor(value) {
        super({userId: 'AccountId', roles: Vec.with(MemberRoles), meta: Meta}, value, MEMBER_JSON_MAP);
    }

    toJSON() {
        return {
            user_id: u8aToHex(this.get('userId').toU8a(), -1, false),
            roles: this.get('roles').toJSON(),
            meta: this.get('meta').toJSON(),
        };
    }
}

export class MemberRoles extends Enum.with(['AdminRole', 'MemberRole']) {}

export class Meta extends Vec.with(Tuple.with([Text, Text])) {}

const INVITE_JSON_MAP = new Map([
    ['peerId', 'peer_id'],
    ['inviteData', 'invite_data'],
    ['inviteKey', 'invite_key'],
]);

export class Invite extends Struct {
    constructor(value) {
        super(
            {
                peerId: 'AccountId',
                inviteData: 'Bytes',
                inviteKey: 'H256',
                meta: Meta,
                roles: Vec.with(MemberRoles),
            },
            value,
            INVITE_JSON_MAP
        );
    }
}

const PENDING_INVITE_JSON_MAP = new Map([['inviteKey', 'invite_key']]);

export class PendingInvite extends Struct {
    constructor(value) {
        super({inviteKey: 'H256', meta: Meta, roles: Vec.with(MemberRoles)}, value, PENDING_INVITE_JSON_MAP);
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
        super({account_id: 'AccountId'}, value);
    }
}

export class DeviceId extends ClassOf('u32') {}

export class PreKeyBundle extends ClassOf('Bytes') {
    constructor(values) {
        super(values);
    }
}

// Response enum constructors
class DeviceIdResponse extends DeviceId {}
class WithdrawnPreKeyBundle extends Tuple.with(['AccountId', 'u32', 'Bytes']) {
    constructor(values) {
        super(values);
    }

    toJSON() {
        const values = this.toArray();
        const [accountId, deviceId, pkb] = values;
        return [u8aToHex(accountId.toU8a(), -1, false), deviceId.toJSON(), u8aToHex(pkb.toU8a(true))];
    }
}
class PreKeyBundlesResponse extends Vec.with(WithdrawnPreKeyBundle) {}

export class Response extends Enum.with({DeviceIdResponse, PreKeyBundlesResponse}) {}

export class VaultKey extends ClassOf('Bytes') {}

export class VaultValue extends ClassOf('Bytes') {}
