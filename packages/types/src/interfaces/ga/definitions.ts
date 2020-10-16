export default {
  rpc: {},
  types: {
    AssetOptions: {
      initialIssuance: 'Compact<Balance>',
      permissions: 'PermissionLatest',
    },
    AssetInfo: {
      symbol: 'Vec<u8>',
      decimalPlaces: 'u8',
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
  },
};
