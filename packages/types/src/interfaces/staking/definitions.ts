// CENNZnet specific staking types, the rest will be resolved from @polkadot/types
export default {
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
  },
};
