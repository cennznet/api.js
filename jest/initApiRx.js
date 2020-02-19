import {WsProvider} from '@polkadot/api';
import config from '../config';
import {ApiRx} from '../packages/api/src/ApiRx';
import ExtrinsicSignatureV2 from '@cennznet/types/src/extrinsic/v2/ExtrinsicSignature';
import { TypeRegistry } from '@polkadot/types';

const initApiRx = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE}`] || 'ws://localhost:9944';
  const wsProvider = new WsProvider(providerUrl);
  const registry = new TypeRegistry();
  console.log('providerUrl', providerUrl);
  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);

  const apiRx = await ApiRx.create(
    {provider: wsProvider,
      types: {
        ExtrinsicSignatureV4: ExtrinsicSignatureV2,
      },
      registry
  });
  await apiRx.toPromise().isReady;

  return apiRx;
};

export default initApiRx;
