export default {
  rpc: {
    cennzx_buyPrice: {
      description: 'Queries the CENNZX spot price to buy an asset',
      params: [
        {
          name: 'assetToBuy',
          type: 'AssetId',
        },
        {
          name: 'amountToBuy',
          type: 'Balance',
        },
        {
          name: 'assetToSell',
          type: 'AssetId',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'CENNZXSpotRpcResult',
    },
    cennzx_sellPrice: {
      description: 'Queries the CENNZX spot price to sell an asset',
      params: [
        {
          name: 'assetToSell',
          type: 'AssetId',
        },
        {
          name: 'amountToSell',
          type: 'Balance',
        },
        {
          name: 'assetToBuy',
          type: 'AssetId',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'CENNZXSpotRpcResult',
    },
  },
  types: {
    ExchangeKey: '(AssetId, AssetId)',
    FeeRate: 'u128',
  },
};
