export default {
  types: {
    Group: {
      groupId: 'H256',
      members: 'Vec<Member>',
      invites: 'Vec<PendingInvite>',
      meta: 'Meta',
    },
    Member: {
      userId: 'AccountId',
      roles: 'Vec<MemberRoles>',
      meta: 'Meta',
    },
    MemberRoles: {
      _enum: ['AdminRole', 'MemberRole'],
    },
    Meta: 'Vec<(Text, Text)>',
    Invite: {
      peerId: 'AccountId',
      inviteData: 'Bytes',
      inviteKey: 'H256',
      meta: 'Meta',
      roles: 'Vec<MemberRoles>',
    },
    PendingInvite: {
      inviteKey: 'H256',
      meta: 'Meta',
      roles: 'Vec<MemberRoles>',
    },
    AcceptPayload: {
      account_id: 'AccountId',
    },
    DeviceId: 'u32',
    PreKeyBundle: 'Bytes',
    DeviceIdResponse: 'DeviceId',
    WithdrawnPreKeyBundle: '(AccountId, u32, Bytes)',
    PreKeyBundlesResponse: 'Vec<PreKeyBundlesResponse>',
    Response: {
      _enum: ['DeviceIdResponse', 'PreKeyBundlesResponse'],
    },
    VaultKey: 'Bytes',
    VaultValue: 'Bytes',
  },
};
