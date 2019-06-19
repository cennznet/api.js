// Copyright 2019 Centrality Investments Limited
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

import {ApiInterface$Rx} from '@cennznet/api/polkadot.types';
import {Fee} from '@cennznet/types';
import {drr} from '@plugnet/api-derive/util/drr';
import {Address, Compact, createType, Index, Struct, U8} from '@plugnet/types';
import {IExtrinsic} from '@plugnet/types/types';
import BN from 'bn.js';
import {combineLatest, Observable, of} from 'rxjs';
import {first, map} from 'rxjs/operators';

// section -> method -> fee
const FEE_MAP = {
    genericAsset: {
        transfer: Fee.GenericAssetFee.TransferFee,
    },
};

export function estimateFee(api: ApiInterface$Rx) {
    return (extrinsic: IExtrinsic, sender: Address): Observable<BN> => {
        const methodFeeEntry = (FEE_MAP[extrinsic.method.sectionName] || {})[extrinsic.method.methodName];
        const methodFee$ = methodFeeEntry ? api.query.fees.feeRegistry(methodFeeEntry) : of(new BN(0));
        return combineLatest([
            api.query.fees.feeRegistry(Fee.FeesFee.BaseFee),
            api.query.fees.feeRegistry(Fee.FeesFee.BytesFee),
            methodFee$,
            api.query.system.accountNonce(sender),
        ]).pipe(
            first(),
            map(([baseFee, byteFee, methodFee, nonce]) =>
                calcFee(baseFee as any, byteFee as any, methodFee, nonce as any, new Address(sender), extrinsic)
            ),
            drr()
        );
    };
}

// export function estimateFeeAt(api: ApiInterface$Rx) {
//     return (hash: IHash, extrinsic: IExtrinsic, sender: AnyAddress): Observable<BN> =>
//         combineLatest([
//             api.query.fees.transactionBaseFee.at(hash),
//             api.query.fees.transactionByteFee.at(hash),
//             api.query.system.accountNonce.at(hash, sender),
//         ]).pipe(
//             map(([baseFee, byteFee, nonce]) =>
//                 calcFee(baseFee as any, byteFee as any, nonce as any, new Address(sender), extrinsic)
//             )
//         );
// }

const SIGNED_VERSION = 129;
function calcFee(baseFee: BN, byteFee: BN, methodFee, nonce: Index, sender: Address, extrinsic: IExtrinsic) {
    const clone = createType('Extrinsic', extrinsic.toU8a(), true) as IExtrinsic;
    const signature = (clone.signature as unknown) as Struct;
    signature.set('signer', sender);
    signature.set('nonce', new (Compact.with(Index))(nonce));
    signature.set('version', new U8(SIGNED_VERSION));
    return ((byteFee as unknown) as BN)
        .muln(clone.encodedLength)
        .add((baseFee as unknown) as BN)
        .add(methodFee);
}
