// Copyright 2019-2020 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { EstimateFeeParams } from '@cennznet/api/derives/types';
import { ApiInterfaceRx } from '@cennznet/api/types';
import Extrinsic from '@polkadot/types/extrinsic/Extrinsic';
import { drr } from '@polkadot/rpc-core/rxjs';
import { TypeRegistry, RuntimeDispatchInfo, SignatureOptions, AssetId, Balance } from '@cennznet/types';
import ExtrinsicEra from '@polkadot/types/extrinsic/ExtrinsicEra';
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

export function estimateFee(instanceId: string, api: ApiInterfaceRx) {
  // We generate fake signature data here to ensure the estimated fee will correctly match the fee paid when the extrinsic is signed by a user.
  // This is because fees are currently based on the byte length of the extrinsic
  return ({ extrinsic, userFeeAssetId, maxPayment }: EstimateFeeParams): Observable<Balance | Error> => {
    return combineLatest([
      api.rpc.state.getRuntimeVersion(),
      api.rpc.chain.getBlockHash(),
      api.rpc.chain.getBlockHash(0),
      api.query.genericAsset.spendingAssetId(),
    ]).pipe(
      first(),
      switchMap(
        ([runtimeVersion, blockHash, genesisHash, networkFeeAssetId]): Observable<[RuntimeDispatchInfo, AssetId]> => {
          const registry = new TypeRegistry();
          const era = new ExtrinsicEra(registry, {
            current: 1,
            period: 1,
          });
          const nonce = null;
          const fake_sender = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
          let payload;
          if (userFeeAssetId.toString() === networkFeeAssetId.toString()) {
            payload = { runtimeVersion, era, blockHash, genesisHash, nonce };
          } else {
            const assetId = api.registry.createType('AssetId', userFeeAssetId);
            const feeExchange = api.registry.createType('FeeExchange', { assetId, maxPayment }, 0);
            const transactionPayment = api.registry.createType('ChargeTransactionPayment', { tip: 0, feeExchange });
            payload = { runtimeVersion, era, blockHash, genesisHash, nonce, transactionPayment };
          }
          (extrinsic as Extrinsic).signFake(fake_sender, payload as SignatureOptions);
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
      catchError((err: Error) => of(err)),
      map((err: Error) => err),
      drr()
    );
  };
}
