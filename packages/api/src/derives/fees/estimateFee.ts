import {ApiInterfaceRx} from '@cennznet/api/types';
import Extrinsic from '@cennznet/types/extrinsic/Extrinsic';
import {ChargeTransactionPayment} from '@cennznet/types/runtime/transaction-payment';
import {AnyAssetId, IExtrinsic} from '@cennznet/types/types';
import {drr} from '@polkadot/rpc-core/rxjs';
import {TypeRegistry} from '@polkadot/types';
import {Address} from '@polkadot/types/interfaces';
import {RuntimeDispatchInfo} from '@polkadot/types/interfaces/rpc';
import ExtrinsicEra from '@polkadot/types/primitive/Extrinsic/ExtrinsicEra';
import BN from 'bn.js';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, first, map, switchMap} from 'rxjs/operators';

export function estimateFee(api: ApiInterfaceRx) {
  /* To estimate fee correctly using extrinsic's fake signature */
  return (extrinsic: IExtrinsic, userFeeAssetId: AnyAssetId, maxPayment?: string): Observable<any> => {
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
          const sender = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
          const feeExchange = {
            assetId: userFeeAssetId,
            maxPayment: maxPayment,
          };
          const transactionPayment =
            userFeeAssetId.toString() === networkFeeAssetId.toString()
              ? null
              : {
                  tip: 0,
                  feeExchange: {
                    FeeExchangeV1: feeExchange,
                  },
                };

          const payload = {runtimeVersion, era, blockHash, genesisHash, nonce, transactionPayment};
          (extrinsic as Extrinsic).signFake(sender, payload as any);
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
