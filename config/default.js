const defaultConfig = {
  apiTimeOut: 30000,
  wsProvider: {
    default: 'ws://localhost:9944',
    integration: 'ws://localhost:9944',
    e2e: 'wss://dev-node.substrate.dev:9944', // TODO: Switch to RIMU once its ready
  },
};

export default defaultConfig;
