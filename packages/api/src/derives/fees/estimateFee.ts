import {ApiInterfaceRx} from '@cennznet/api/types';
import {DEFAULT_FEE_ASSET} from '@cennznet/types/extrinsic/constants';
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
  return (
    extrinsic: IExtrinsic,
    feeAssetId: AnyAssetId,
    sender: Address,
    transactionPayment: ChargeTransactionPayment
  ): Observable<any> => {
    return combineLatest([
      api.rpc.state.getRuntimeVersion(),
      api.rpc.chain.getBlockHash(),
      api.rpc.chain.getBlockHash(0),
      api.query.system.accountNonce(sender),
    ]).pipe(
      first(),
      switchMap(
        ([runtimeVersion, blockHash, genesisHash, nonce]): Observable<RuntimeDispatchInfo> => {
          const registry = new TypeRegistry();
          const era = new ExtrinsicEra(registry, {
            current: 1,
            period: 1,
          });
          (extrinsic as Extrinsic).signFake(sender, {
            runtimeVersion,
            era,
            blockHash,
            genesisHash,
            nonce: nonce.toString(),
            transactionPayment,
          });
          return api.rpc.payment.queryInfo(extrinsic.toHex());
        }
      ),
      switchMap(paymentInfo => {
        const feeInBaseCurrency = paymentInfo.partialFee;
        if (feeAssetId.toString() === DEFAULT_FEE_ASSET) {
          return of(feeInBaseCurrency);
        } else {
          return (api.rpc as any).cennzx.buyPrice(DEFAULT_FEE_ASSET, feeInBaseCurrency, feeAssetId);
        }
      }),
      map((price: BN) => price),
      catchError((err: any) => of(err)),
      map((err: Error) => err),
      drr()
    );
  };
}
