import {ApiPromise, WsProvider} from '@polkadot/api';
import config from '../config';
// import {Api as ApiPromise} from '../packages/api/src/Api';
import typesSpec from '../packages/api/src/overrides/spec';
import OwnExtrinsic from '../packages/types/src/extrinsic/v4/Extrinsic';
import OwnExtrinsicPayload from '../packages/types/src/extrinsic/v4/ExtrinsicPayload';
import OwnExtrinsicSignature from '../packages/types/src/extrinsic/v4/ExtrinsicSignature';

const initApiPromise = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE}`] || 'ws://localhost:9944';
  const wsProvider = new WsProvider(providerUrl);

  const types = {
    ExtrinsicV4: OwnExtrinsic,
    ExtrinsicV4Payload: OwnExtrinsicPayload,
    ExtrinsicV4Signature: OwnExtrinsicSignature,
  };

  console.log('providerUrl', providerUrl);
  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);

  const api = await ApiPromise.create({provider: wsProvider, types, typesSpec});
  await api.isReady;

  return api;
};

export default initApiPromise;
