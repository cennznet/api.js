export default {
  types: {
    Meta: '(Text, Text)',
    MemberRoles: {
      _enum: ['AdminRole', 'MemberRole'],
    },
    Member: {
      userId: 'AccountId',
      roles: 'Vec<MemberRoles>',
      meta: 'Meta',
    },
    Group: {
      groupId: 'H256',
      members: 'Vec<Member>',
      invites: 'Vec<PendingInvite>',
      meta: 'Meta',
    },
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
      accountId: 'AccountId',
    },
    DeviceId: 'u32',
    PreKeyBundle: 'Bytes',
    DeviceIdResponse: 'DeviceId',
    WithdrawnPreKeyBundle: "('AccountId', 'u32', 'Bytes')",
    PreKeyBundlesResponse: 'Vec<WithdrawnPreKeyBundle>',
    Response: {
      _enum: {
        DeviceIdResponse: 'DeviceIdResponse',
        PreKeyBundlesResponse: 'PreKeyBundlesResponse',
      },
    },
    VaultKey: 'Bytes',
    VaultValue: 'Bytes',
  },
};
