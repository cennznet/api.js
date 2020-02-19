/**
 * TODO: create files based on env, and merge env setting with default settings
 *
 * module.exports = require(`./${process.env.NODE_ENV}`);
 */

const defaultConfig = {
  apiTimeOut: 30000,
  wsProvider: {
    localhost: 'ws://localhost:9944',
    integration: 'ws://localhost:9944',
    e2e: 'ws://localhost:9944',
  },
};

export default defaultConfig;
