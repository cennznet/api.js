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

import {ApiInterfaceRx} from '@cennznet/api/types';
import {Fee} from '@cennznet/types';
import {IExtrinsic} from '@cennznet/types/types';
import {drr} from '@plugnet/api-derive/util/drr';
import {createType} from '@plugnet/types';
import {Address, Index} from '@plugnet/types/interfaces';
import BN from 'bn.js';
import {combineLatest, Observable, of} from 'rxjs';
import {first, map} from 'rxjs/operators';

// section -> method -> fee
const FEE_MAP = {
    genericAsset: {
        transfer: Fee.GenericAssetFee.TransferFee,
    },
};

export function estimateFee(api: ApiInterfaceRx) {
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
                calcFee(
                    baseFee as any,
                    byteFee as any,
                    methodFee,
                    nonce as any,
                    createType('Address', sender),
                    extrinsic
                )
            ),
            drr()
        );
    };
}

const SIGNED_VERSION = 129;
function calcFee(baseFee: BN, byteFee: BN, methodFee, nonce: Index, sender: Address, extrinsic: IExtrinsic) {
    const clone = createType('Extrinsic', extrinsic.toU8a(), true) as IExtrinsic;
    if (clone.version === 1) {
        const signature = (clone as any).raw.get('signature');
        signature.set('signer', sender);
        signature.set('nonce', createType('Compact<Index>', nonce));
        signature.set('version', createType('u8', SIGNED_VERSION));
        // to avoid isEmpty check
        signature.set('signature', createType('Signature', [1]));
        return byteFee
            .muln(clone.encodedLength)
            .add(baseFee)
            .add(methodFee);
    }
    //FIXME: to support Extrinsic v2
    throw new Error('Extrinsic v2 fee estimation is not supported');
}
