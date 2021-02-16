// CENNZnet specific staking types, the rest will be resolved from @polkadot/types

export default {
  rpc: {
    accruedPayout: {
      description: 'Retrieves the currently accrued reward for the specified payee (validator or nominator)',
      params: [
        {
          payee: 'payee',
          type: 'AccountId',
        },
      ],
      type: 'u64',
    },
  },
  types: {
    RewardBalance: 'Balance',
    RewardBalanceOf: 'Balance',
    RewardDestination: {
      _enum: {
        Stash: 'Null',
        Controller: 'Null',
        Account: 'AccountId',
      },
    },
    VecDeque: 'Vec<u64>'
  },
};
