import { ExtDef } from './types';

const CheckMortality = {
  payload: {
    blockHash: 'Hash',
  },
  extrinsic: {
    era: 'ExtrinsicEra',
  },
};

export default {
  ChargeTransactionPayment: {
    payload: {},
    extrinsic: {
      transactionPayment: 'ChargeTransactionPayment',
    },
  },
  CheckEra: CheckMortality,
  CheckGenesis: {
    payload: {
      genesisHash: 'Hash',
    },
    extrinsic: {},
  },
  CheckNonce: {
    payload: {},
    extrinsic: {
      nonce: 'Compact<Index>',
    },
  },
  CheckSpecVersion: {
    payload: {
      specVersion: 'u32',
    },
    extrinsic: {},
  },
  CheckTxVersion: {
    payload: {
      transactionVersion: 'u32',
    },
    extrinsic: {},
  },
} as ExtDef;
