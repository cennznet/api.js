// import ExtrinsicSignatureV2 from '@cennznet/types/extrinsic/v2/ExtrinsicSignature';
// import {Call} from '@polkadot/types/interfaces/runtime';
export default {
  types: {
    ExtrinsicPayloadV4: {
      blockHash: 'AnyU8a',
      doughnut: 'Option<Doughnut>',
      era: 'AnyU8a | IExtrinsicEra',
      genesisHash: 'AnyU8a',
      method: 'AnyU8a',
      nonce: 'AnyNumber',
      specVersion: 'AnyNumber',
      tip: 'AnyNumber',
      transactionPayment: 'ChargeTransactionPayment',
    },
  },
};
