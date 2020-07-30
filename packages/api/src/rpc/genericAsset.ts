const genericAssetRpc = {
  registeredAssets: {
    description: 'Get all registered generic assets (symbol, decimal places)',
    params: [],
    type: 'Vec<(AssetId, AssetInfo)>',
  },
};

export default genericAssetRpc;
