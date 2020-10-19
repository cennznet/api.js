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
    type: 'Balance',
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
    type: 'Balance',
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
    type: '(Balance, Balance) as any',
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
    type: '(Balance, Balance, Balance) as any',
  },
};
export default cennzxRpc;
