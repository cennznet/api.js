import initApiPromise from './initApiPromise';
import config from '../config';

module.exports = async () => {
  global.apiPromise = await initApiPromise();

  console.log('global.apiPromise', global.apiPromise);
  console.log('jest.setup.js is loaded in env: ', process.env.NODE_ENV);
  console.log('api timeout is: ', config.apiTimeOut);
};
