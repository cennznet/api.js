import { ApiInterfaceRx } from '@cennznet/api/types';
import Extrinsic from '@cennznet/types/extrinsic/Extrinsic';
import { generateTransactionPayment } from '@cennznet/types/runtime/transaction-payment/TransactionPayment';
import { drr } from '@polkadot/rpc-core/rxjs';
import { TypeRegistry } from '@cennznet/types';
import { RuntimeDispatchInfo } from '@cennznet/types/interfaces';
import { ExtrinsicEra } from '@cennznet/types/primitive';
import BN from 'bn.js';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';

// This interface is to determine fee estimate for any transaction that is going to be executed..
// The estimate can be in any currency(userFeeAssetId) provided there is enough liquidity in the exchange pool for that currency.
// In case user wants to know estimated fee in different currency, the interface also needs the maxPayment that can used from currency as fee.
// Scenarios when this function can be useful
// 1. DAPP creator wants to show price the extrinsic will cost in default currency
//   const extrinsic = api.tx.genericAsset
//             .transfer(assetId, address, amount);
//   const userFeeAssetId = '16001' // default spending asset
//   const feeFromQuery = await api.derive.fees.estimateFee({extrinsic, userFeeAssetId})
// 2. DAPP user desire to pay fee in different asset(not the default fee asset)
//    const extrinsic = api.tx.genericAsset
//              .transfer(assetId, address, amount);
//    const userFeeAssetId = '16005' // asset to pay fee in
//    const maxPayment = 'xxx' // Max amount user is ok to pay in 'fee asset'
//    const feeFromQuery = await api.derive.fees.estimateFee({extrinsic, userFeeAssetId, maxPayment}) // this will only be successful if their is enough liquidity of users asset in exchange pool

export function estimateFee(api: ApiInterfaceRx) {
  // We generate fake signature data here to ensure the estimated fee will correctly match the fee paid when the extrinsic is signed by a user.
  // This is because fees are currently based on the byte length of the extrinsic
  return ({ extrinsic, userFeeAssetId, maxPayment }): Observable<any> => {
    return combineLatest([
      api.rpc.state.getRuntimeVersion(),
      api.rpc.chain.getBlockHash(),
      api.rpc.chain.getBlockHash(0),
      api.query.genericAsset.spendingAssetId(),
    ]).pipe(
      first(),
      switchMap(
        ([runtimeVersion, blockHash, genesisHash, networkFeeAssetId]): Observable<[RuntimeDispatchInfo, any]> => {
          const registry = new TypeRegistry();
          const era = new ExtrinsicEra(registry, {
            current: 1,
            period: 1,
          });
          const nonce = null;
          const fake_sender = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
          const transactionPayment =
            userFeeAssetId.toString() === networkFeeAssetId.toString()
              ? null
              : generateTransactionPayment({ tip: 0, assetId: userFeeAssetId, maxPayment });
          const payload = { runtimeVersion, era, blockHash, genesisHash, nonce, transactionPayment };
          (extrinsic as Extrinsic).signFake(fake_sender, payload as any);
          return combineLatest([api.rpc.payment.queryInfo(extrinsic.toHex()), of(networkFeeAssetId)]);
        }
      ),
      switchMap(([paymentInfo, networkFeeAssetId]) => {
        const feeInBaseCurrency = paymentInfo.partialFee;
        if (userFeeAssetId.toString() === networkFeeAssetId.toString()) {
          return of(feeInBaseCurrency);
        } else {
          return (api.rpc as any).cennzx.buyPrice(networkFeeAssetId, feeInBaseCurrency, userFeeAssetId);
        }
      }),
      map((price: BN) => price),
      catchError((err: any) => of(err)),
      map((err: Error) => err),
      drr()
    );
  };
}
