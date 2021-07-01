import { InterfaceTypes } from '@polkadot/types/types';

export type ExtTypes = Record<string, keyof InterfaceTypes>;

export type ExtInfo = {
  extrinsic: ExtTypes;
  payload: ExtTypes;
};

export type ExtDef = Record<string, ExtInfo>;

const CheckMortality = {
  payload: {
    blockHash: 'Hash',
  },
  extrinsic: {
    era: 'ExtrinsicEra',
  },
};

export const cennznetExtensions: ExtDef = ({
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
} as unknown) as ExtDef;
