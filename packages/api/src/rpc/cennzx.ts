const cennzxRpc = {
  buyPrice: {
    description: 'Retrieves the spot exchange buy price',
    params: [
      {
        name: 'AssetToBuy',
        type: 'AssetId',
      },
      {
        name: 'Amount',
        type: 'Balance',
      },
      {
        name: 'AssetToPay',
        type: 'AssetId',
      },
    ],
    type: 'u64',
  },
  sellPrice: {
    description: 'Retrieves the spot exchange sell price',
    params: [
      {
        name: 'AssetToSell',
        type: 'AssetId',
      },
      {
        name: 'Amount',
        type: 'Balance',
      },
      {
        name: 'AssetToPayout',
        type: 'AssetId',
      },
    ],
    type: 'u64',
  },
  liquidityPrice: {
    description: 'Get the price of liquidity for the given asset ID',
    params: [
      {
        name: 'AssetId',
        type: 'AssetId',
      },
      {
        name: 'liquidityToBuy',
        type: 'Balance',
      },
    ],
    type: '(u64, u64)',
  },
  liquidityValue: {
    description: "Get the value of an account's liquidity for the given asset",
    params: [
      {
        name: 'AccountId',
        type: 'Address',
      },
      {
        name: 'AssetId',
        type: 'AssetId',
      },
    ],
    type: '(u64, u64, u64)',
  },
};
export default cennzxRpc;
