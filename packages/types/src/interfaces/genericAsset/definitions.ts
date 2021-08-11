export default {
  rpc: {
    registeredAssets: {
      description: 'Get all registered generic assets (symbol, decimal places)',
      params: [],
      type: 'Vec<(AssetId, AssetInfo)>',
    },
  },
  types: {
    AssetOptions: {
      initialIssuance: 'Compact<Balance>',
      permissions: 'PermissionLatest',
    },
    // Asset info used till runtime version 40
    AssetInfoV40: {
      symbol: 'Vec<u8>',
      decimalPlaces: 'u8',
    },
    AssetInfoV41: {
      symbol: 'Vec<u8>',
      decimalPlaces: 'u8',
      existentialDeposit: 'u64'
    },
    Owner: {
      _enum: {
        None: 'Null',
        Address: 'AccountId',
      },
    },
    PermissionsV1: {
      update: 'Owner',
      mint: 'Owner',
      burn: 'Owner',
    },
    PermissionVersions: {
      _enum: {
        V1: 'PermissionsV1',
      },
    },
    PermissionLatest: 'PermissionsV1',
    WithdrawReasons: {
      _set: {
        TransactionPayment: 0b00000001,
        Transfer: 0b00000010,
        Reserve: 0b00000100,
        Fee: 0b00001000,
        Tip: 0b00010000,
      },
    },
    BalanceLock: {
      id: 'LockIdentifier',
      amount: 'Balance',
      reasons: 'WithdrawReasons',
    },
  },
};
