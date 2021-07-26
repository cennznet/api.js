export default {
  rpc: {
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
      type: 'PriceResponse',
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
      type: 'PriceResponse',
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
      type: 'LiquidityPriceResponse',
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
      type: 'LiquidityValueResponse',
    },
  },
  types: {
    ExchangeKey: '(AssetId, AssetId)',
    FeeRate: 'u128',
    LiquidityValueResponse: {
      liquidity: 'Balance',
      core: 'Balance',
      asset: 'Balance'
    },
    PriceResponse: {
      price: 'Balance'
    },
    LiquidityPriceResponse: {
      core: 'Balance',
      asset: 'Balance'
    }
  },
};
