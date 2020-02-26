// import ExtrinsicSignatureV2 from '@cennznet/types/extrinsic/v2/ExtrinsicSignature';
// import {Call} from '@polkadot/types/interfaces/runtime';
export default {
  types: {
    SignerPayload: {
      address: 'Address',
      blockHash: 'Hash',
      blockNumber: 'BlockNumber',
      era: 'ExtrinsicEra',
      genesisHash: 'Hash',
      method: 'Call',
      nonce: 'Compact<Index>',
      runtimeVersion: 'RuntimeVersion',
      tip: 'Compact<Balance>',
      version: 'u8',
      doughnut: 'Option<Doughnut>',
      transactionPayment: 'ChargeTransactionPayment',
    },
  },
};
