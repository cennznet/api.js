const defaultConfig = {
  apiTimeOut: 30000,
  wsProvider: {
    localhost: 'ws://localhost:9944',
    integration: 'ws://testnet_node_alice:9944',
    integrationV36: 'ws://v36_node:9944',
    e2e: 'wss://rimu.unfrastructure.io/public/ws'
  },
};

export default defaultConfig;
