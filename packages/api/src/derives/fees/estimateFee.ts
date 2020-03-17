import {ApiInterfaceRx} from '@cennznet/api/types';
import {generateTransactionPayment} from '@cennznet/api/util/FeeExchange';
import Extrinsic from '@cennznet/types/extrinsic/Extrinsic';
import {AnyAssetId, IExtrinsic} from '@cennznet/types/types';
import {drr} from '@polkadot/rpc-core/rxjs';
import {TypeRegistry} from '@polkadot/types';
import {RuntimeDispatchInfo} from '@polkadot/types/interfaces/rpc';
import ExtrinsicEra from '@polkadot/types/primitive/Extrinsic/ExtrinsicEra';
import BN from 'bn.js';
import {combineLatest, Observable, of} from 'rxjs';
import {catchError, first, map, switchMap} from 'rxjs/operators';

export function estimateFee(api: ApiInterfaceRx) {
  // We generate fake signature data here to ensure the estimated fee will correctly match the fee paid when the extrinsic is signed by a user.
  // This is because fees are currently based on the byte length of the extrinsic
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
          const transactionPayment =
            userFeeAssetId.toString() === networkFeeAssetId.toString()
              ? null
              : generateTransactionPayment(0, userFeeAssetId, maxPayment);
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
