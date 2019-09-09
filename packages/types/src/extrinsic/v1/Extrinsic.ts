// Copyright 2019 Centrality Investments Limited & @polkadot/types authors & contributors
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

// tslint:disable member-ordering no-magic-numbers

import {createType, Struct} from '@plugnet/types';
import {Address, Call} from '@plugnet/types/interfaces';
import {IKeyringPair, SignatureOptions} from '@plugnet/types/types';
import {isU8a} from '@plugnet/util';

import {BIT_DOUGHNUT, BIT_FEE_EXCHANGE} from '../constants';
import {DoughnutValue, ExtrinsicOptions, FeeExchangeValue, IExtrinsicImpl} from '../types';
import Doughnut from './Doughnut';
import {ExtrinsicPayloadValueV1} from './ExtrinsicPayload';
import ExtrinsicSignatureV1 from './ExtrinsicSignature';
import FeeExchange from './FeeExchange';

export interface ExtrinsicValueV1 {
    method?: Call;
    signature?: ExtrinsicSignatureV1;
    doughnut?: Doughnut;
    feeExchange?: FeeExchange;
}

const TRANSACTION_VERSION = 1;

/**
 * @name ExtrinsicV1
 * @description
 * The first generation of compact extrinsics
 */
export default class ExtrinsicV1 extends Struct implements IExtrinsicImpl {
    constructor(
        value: Uint8Array | ExtrinsicValueV1,
        {isSigned, useDoughnut = false, useFeeExchange = false}: ExtrinsicOptions
    ) {
        super(...ExtrinsicV1.decodeExtrinsic(value, isSigned, useDoughnut, useFeeExchange));
    }

    static decodeExtrinsic(
        value?: Uint8Array | ExtrinsicValueV1,
        isSigned: boolean = false,
        useDoughnut: boolean = false,
        useFeeExchange: boolean = false
    ): [any, ExtrinsicValueV1] {
        const typeDefs: any = {
            signature: ExtrinsicSignatureV1,
            method: 'Call',
        };
        if (!value) {
            return [typeDefs, {}];
        } else if (value instanceof ExtrinsicV1) {
            if (value.doughnut) {
                typeDefs.doughnut = Doughnut;
            }
            if (value.feeExchange) {
                typeDefs.feeExchange = FeeExchange;
            }
            return [typeDefs, value];
        } else if (isU8a(value)) {
            // here we decode manually since we need to pull through the version information
            let v = value;
            const signature = new ExtrinsicSignatureV1(v, {isSigned});
            v = v.subarray(signature.encodedLength);
            const method = createType('Call', v);
            v = v.subarray(method.encodedLength);

            const extrinsicValue: ExtrinsicValueV1 = {signature, method};
            if (useDoughnut) {
                typeDefs.doughnut = Doughnut;
                extrinsicValue.doughnut = new Doughnut(v);
                v = v.subarray(extrinsicValue.doughnut.encodedLength);
            }

            if (useFeeExchange) {
                typeDefs.feeExchange = FeeExchange;
                extrinsicValue.feeExchange = new FeeExchange(v);
            }

            return [typeDefs, extrinsicValue];
        }

        return [typeDefs, value];
    }

    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength(): number {
        return this.toU8a().length;
    }

    /**
     * @description The [[Call]] this extrinsic wraps
     */
    get method(): Call {
        return this.get('method') as Call;
    }

    /**
     * @description The [[ExtrinsicSignatureV1]]
     */
    get signature(): ExtrinsicSignatureV1 {
        return this.get('signature') as ExtrinsicSignatureV1;
    }

    /**
     * @description The version for the signature
     */
    get version(): number {
        let retVersion = TRANSACTION_VERSION;
        if (this.feeExchange) {
            retVersion = retVersion | BIT_FEE_EXCHANGE;
        }
        if (this.doughnut) {
            retVersion = retVersion | BIT_DOUGHNUT;
        }
        return retVersion;
    }

    get doughnut(): Doughnut | undefined {
        return this.get('doughnut') as Doughnut;
    }

    get feeExchange(): FeeExchange | undefined {
        return this.get('feeExchange') as FeeExchange;
    }

    /**
     * @description Add an [[ExtrinsicSignatureV1]] to the extrinsic (already generated)
     */
    addSignature(
        signer: Address | Uint8Array | string,
        signature: Uint8Array | string,
        payload: ExtrinsicPayloadValueV1 | Uint8Array | string
    ): ExtrinsicV1 {
        this.signature.addSignature(signer, signature, payload);

        return this;
    }

    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account: IKeyringPair, options: SignatureOptions): ExtrinsicV1 {
        this.signature.sign(this.method, account, options);

        return this;
    }

    addDoughnut(doughnut: DoughnutValue): ExtrinsicV1 {
        this.set('doughnut', new Doughnut(doughnut));

        return this;
    }

    addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): ExtrinsicV1 {
        this.set('feeExchange', new FeeExchange(feeExchangeOpt));

        return this;
    }
}
