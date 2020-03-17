import {AnyAssetId} from '@cennznet/types/types';

export function generateTransactionPayment(tip: number, assetId: AnyAssetId, maxPayment: string) {
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
