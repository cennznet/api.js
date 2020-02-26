// import ExtrinsicSignatureV2 from '@cennznet/types/extrinsic/v2/ExtrinsicSignature';
// import {Call} from '@polkadot/types/interfaces/runtime';
export default {
  types: {
    ExtrinsicSignatureV4: {
      signer: 'Address',
      signature: 'MultiSignature',
      doughnut: 'Option<Doughnut>',
      era: 'ExtrinsicEra',
      nonce: 'Compact<Index>',
      transactionPayment: 'ChargeTransactionPayment',
    },
  },
};
