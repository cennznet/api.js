// import ExtrinsicSignatureV2 from '@cennznet/types/extrinsic/v2/ExtrinsicSignature';
// import {Call} from '@polkadot/types/interfaces/runtime';
export default {
  types: {
    Extrinsic: {
      signature: 'ExtrinsicSignatureV2',
      method: 'Call',
    },
  },
};
