export default {
  types: {
    Meta: 'Vec<(Text, Text)>',
    MemberRoles: {
      _enum: ['AdminRole', 'MemberRole'],
    },
    Member: {
      _alias: {
        userId: 'user_id',
      },
      userId: 'AccountId',
      roles: 'Vec<MemberRoles>',
      meta: 'Meta',
    },
    Group: {
      _alias: {
        groupId: 'group_id',
      },
      groupId: 'H256',
      members: 'Vec<Member>',
      invites: 'Vec<PendingInvite>',
      meta: 'Meta',
    },
    Invite: {
      _alias: {
        peerId: 'peer_id',
        inviteData: 'invite_data',
        inviteKey: 'invite_key',
      },
      peerId: 'AccountId',
      inviteData: 'Bytes',
      inviteKey: 'H256',
      meta: 'Meta',
      roles: 'Vec<MemberRoles>',
    },
    PendingInvite: {
      _alias: {
        inviteKey: 'invite_key',
      },
      inviteKey: 'H256',
      meta: 'Meta',
      roles: 'Vec<MemberRoles>',
    },
    AcceptPayload: {
      accountId: 'AccountId',
    },
    DeviceId: 'u32',
    PreKeyBundle: 'Bytes',
    DeviceIdResponse: 'DeviceId',
    WithdrawnPreKeyBundle: '(AccountId, u32, Bytes)',
    PreKeyBundlesResponse: 'Vec<WithdrawnPreKeyBundle>',
    Response: {
      _enum: {
        DeviceIdResponse: 'DeviceIdResponse',
        PreKeyBundlesResponse: 'PreKeyBundlesResponse',
      },
    },
    VaultKey: 'Bytes',
    VaultValue: 'Bytes',
    // Updated MessageId here to SyloMessageId as a runtime (Cumulus as similar type) - export interface MessageId extends U8aFixed
    SyloMessageId: 'u32',
    Message: 'Bytes',
  },
};
