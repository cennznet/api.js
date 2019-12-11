import {WsProvider} from '@polkadot/api';
import config from '../config';
import {ApiRx} from '../packages/api/src/ApiRx';

const initApiRx = async () => {
  const providerUrl = config.wsProvider[`${process.env.TEST_TYPE}`] || 'ws://localhost:9944';
  const wsProvider = new WsProvider(providerUrl);

  console.log('providerUrl', providerUrl);
  console.log('process.env.TEST_TYPE: ', process.env.TEST_TYPE);

  const apiRx = await ApiRx.create({provider: wsProvider});
  await apiRx.toPromise().isReady;

  return apiRx;
};

export default initApiRx;
