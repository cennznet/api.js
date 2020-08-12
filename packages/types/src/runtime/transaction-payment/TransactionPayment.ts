export function generateTransactionPayment({tip, assetId, maxPayment}) {
  const feeExchange = {
    assetId: assetId,
    maxPayment: maxPayment,
  };
  const transactionPayment = {
    tip: tip,
    feeExchange: {
      FeeExchangeV1: feeExchange,
    },
  };
  return transactionPayment;
}
