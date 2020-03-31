import {WsProvider} from '@polkadot/api';
import {TypeRegistry} from '@polkadot/types';
// import Metadata from '@polkadot/metadata/Metadata';

import config from '../config';
import {ApiRx} from '../packages/api/src/ApiRx';
// import metadataStatic from '../packages/api/src/staticMetadata';

const initApiRx = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE}`] || 'ws://localhost:9944';
  const wsProvider = new WsProvider(providerUrl);
  const registry = new TypeRegistry();
  // const metadata = new Metadata(registry, metadataStatic);

  console.log('providerUrl', providerUrl);
  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);

  const apiRx = await ApiRx.create({
    provider: wsProvider,
    registry,
    // metadata,
  });

  await apiRx.toPromise().isReady;

  return apiRx;
};

export default initApiRx;
