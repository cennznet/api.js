// CENNZnet specific system types
export default {
  types: {
    Address: 'AccountId',
    BeefyKey: '[u8; 33]',
    Index: 'u64',
    doughnut: 'Raw',
    PhaseTo36: {
      _enum: {
        ApplyExtrinsic: 'u32',
        Finalization: 'Null',
      },
    },
    DispatchClassTo36: {
      _enum: ['Normal', 'Operational'],
    },
    WeightTo36: 'u32',
    DispatchInfoTo36: {
      weight: 'WeightTo36',
      class: 'DispatchClassTo36',
      paysFee: 'bool',
    },
    PalletId: 'LockIdentifier',
    BabeEpochConfiguration: {
      c: '(u64, u64)',
      allowedSlots: 'AllowedSlots'
    },
  },
};
