import initApiPromise from './initApiPromise';
import config from '../config';

process.env.DEBUG = '';

global.apiPromise = initApiPromise();
jest.setTimeout(config.apiTimeOut);

console.log('process.env.DEBUG', process.env.DEBUG);

console.log('jetSetup.js is loaded in env: ', process.env.NODE_ENV);
console.log('api timeout is: ', config.apiTimeOut);
