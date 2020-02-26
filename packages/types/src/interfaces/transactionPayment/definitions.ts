export default {
  types: {
    ChargeTransactionPayment: {
      tip: 'Compact<Balance>',
      feeExchange: 'Option<FeeExchange>',
    },
    FeeExchange: {
      _enum: ['FeeExchangeV1'],
    },
    FeeExchangeV1: {
      assetId: 'Compact<AssetId>',
      maxPayment: 'Compact<Balance>',
    },
  },
};
