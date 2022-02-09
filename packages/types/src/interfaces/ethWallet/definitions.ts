export default {
  rpc: {
    addressNonce: {
      description: 'Get all governance proposal votes',
      params: [
        {
          name: 'EthAddress',
          type: 'EthAddress',
        },
      ],
      type: 'u32'
    }
  },
  types: {}
};
