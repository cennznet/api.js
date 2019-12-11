const defaultConfig = {
  apiTimeOut: 30000,
  wsProvider: {
    default: 'wss://dev-node.substrate.dev:9944',
    integration: 'ws://node_alice:9944',
    e2e: 'wss://dev-node.substrate.dev:9944'
  }
};

export default defaultConfig;
