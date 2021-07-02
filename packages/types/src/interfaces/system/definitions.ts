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
    WeightTo36: 'u32',
    DispatchInfoTo36: {
      weight: 'WeightTo36',
      class: 'DispatchClassTo36',
      paysFee: 'bool',
    },
    BlockLength: {
      max: 'PerDispatchClassU32'
    },
    BlockWeights: {
      baseBlock: 'Weight',
      maxBlock: 'Weight',
      perClass: 'PerDispatchClass'
    },
    PerDispatchClassU32: {
      normal: 'u32',
      operational: 'u32',
      mandatory: 'u32'
    },
    PerDispatchClass: {
      normal: 'WeightPerClass',
      operational: 'WeightPerClass',
      mandatory: 'WeightPerClass'
    },
    WeightPerClass: {
      baseExtrinsic: 'Weight',
      maxExtrinsic: 'Weight',
      maxTotal: 'Option<Weight>',
      reserved: 'Option<Weight>'
    },
    ConsumedWeight: 'PerDispatchClass',
    Slot: 'u64',
    Direction: {
      _enum: ["Up", "Left", "Down", "Right"]
    },
    Food: {
      x: "i8",
      y: "i8"
    },
    Snake: {
      body: "Vec<(i8,i8)>",
      dir: "Direction",
      direction_changed: "bool"
    },
    WindowSize: {
      window_width: "i8",
      window_height: "i8"
    }
  },
};
