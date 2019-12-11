/**
 * TODO: create files based on env, and merge env setting with default settings
 *
 * module.exports = require(`./${process.env.NODE_ENV}`);
 */

const defaultConfig = {
  apiTimeOut: 30000,
  wsProvider: {
    localhost: 'ws://localhost:9944',
    integration: 'ws://testnet_node_alice:9944',
    e2e: 'wss://rimu.unfrastructure.io/public/ws',
  },
};

export default defaultConfig;
