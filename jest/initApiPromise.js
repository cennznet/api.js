import {WsProvider} from '@polkadot/api';
import config from '../config';
import {Api as ApiPromise} from '../packages/api/src/Api';

const initApiPromise = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE}`] || 'ws://8219160c.ngrok.io';
  const wsProvider = new WsProvider(providerUrl);

  console.log('providerUrl', providerUrl);
  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);

  const api = await ApiPromise.create({provider: wsProvider});
  await api.isReady;

  return api;
};

export default initApiPromise;
