import { ExtDef } from './types';

const CheckMortality = {
  extra: {
    blockHash: 'Hash',
  },
  types: {
    era: 'ExtrinsicEra',
  },
};

export default {
  ChargeTransactionPayment: {
    extra: {},
    types: {
      transactionPayment: 'ChargeTransactionPayment',
    },
  },
  CheckEra: CheckMortality,
  CheckGenesis: {
    extra: {
      genesisHash: 'Hash',
    },
    types: {},
  },
  CheckNonce: {
    extra: {},
    types: {
      nonce: 'Compact<Index>',
    },
  },
  CheckSpecVersion: {
    extra: {
      specVersion: 'u32',
    },
    types: {},
  },
  CheckTxVersion: {
    extra: {
      transactionVersion: 'u32',
    },
    types: {},
  },
} as ExtDef;
