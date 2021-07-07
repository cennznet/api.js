// CENNZnet specific system types
export default {
  types: {
    Address: 'AccountId',
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
    Supports: {},
    WeightTo36: 'u32',
    DispatchInfoTo36: {
      weight: 'WeightTo36',
      class: 'DispatchClassTo36',
      paysFee: 'bool',
    },
  },
};
