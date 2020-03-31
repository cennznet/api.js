import {WsProvider} from '@polkadot/api';
import {TypeRegistry} from '@polkadot/types';
import config from '../config';
import {Api as ApiPromise} from '../packages/api/src/Api';

const initApiPromise = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE}`] || 'ws://localhost:9944';
  const wsProvider = new WsProvider(providerUrl);
  const registry = new TypeRegistry();

  console.log('providerUrl', providerUrl);
  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);

  const api = await ApiPromise.create({
    provider: wsProvider,
    registry,
  });

  await api.isReady;

  return api;
};

export default initApiPromise;
