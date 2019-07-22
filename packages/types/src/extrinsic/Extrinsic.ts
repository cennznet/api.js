// Copyright 2019 Centrality Investments Limited
// Copyright 2017-2019 @polkadot/types authors & contributors
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

import {assert, blake2AsU8a} from '@cennznet/util';
import {KeyringPair} from '@plugnet/keyring/types';
import {Address, Compact, Hash, Method, Struct} from '@plugnet/types';
import {FunctionMetadata} from '@plugnet/types/Metadata/v5/Calls';
import {AnyNumber, AnyU8a, ArgsDef, Codec, IExtrinsic, SignatureOptions} from '@plugnet/types/types';
import {isHex, isU8a, u8aToHex, u8aToU8a} from '@plugnet/util';
import {DoughnutValue} from '../../../api/src/types';
import {Doughnut} from './Doughnut';
import ExtrinsicSignature, {checkDoughnut, checkFeeExchange} from './ExtrinsicSignature';
import FeeExchange from './FeeExchange';

type ExtrinsicValue = {
    method?: Method;
    signature?: ExtrinsicSignature;
    doughnut?: Doughnut;
    feeExchange?: FeeExchange;
};

export type FeeExchangeValue = {
    assetId: AnyNumber;
    maxPayment: AnyNumber;
};

// tslint:disable member-ordering no-magic-numbers
/**
 * @name Extrinsic
 * @description
 * Representation of an Extrinsic in the system. It contains the actual call,
 * (optional) signature and encodes with an actual length prefix
 *
 * {@link https://github.com/paritytech/wiki/blob/master/Extrinsic.md#the-extrinsic-format-for-node}.
 *
 * Can be:
 * - signed, to create a transaction
 * - left as is, to create an inherent
 */
export default class Extrinsic extends Struct implements IExtrinsic {
    constructor(value?: ExtrinsicValue | AnyU8a | Method) {
        super(...Extrinsic.decodeExtrinsic(value || {}));
    }

    static decodeExtrinsic(
        value: ExtrinsicValue | AnyU8a | Method = new Uint8Array()
    ): [any, ExtrinsicValue | Array<number> | Uint8Array] {
        const defaultDef = {
            signature: ExtrinsicSignature,
            method: Method,
        };

        if (Array.isArray(value) || isHex(value)) {
            // Instead of the block below, it should simply be:
            // return Extrinsic.decodeExtrinsic(hexToU8a(value as string));
            const u8a = u8aToU8a(value);

            // HACK 11 Jan 2019 - before https://github.com/paritytech/substrate/pull/1388
            // extrinsics didn't have the length, cater for both approaches
            const [offset, length] = Compact.decodeU8a(u8a);
            const withPrefix = u8a.length === offset + length.toNumber();

            return Extrinsic.decodeExtrinsic(withPrefix ? u8a : Compact.addLengthPrefix(u8a));
        } else if (isU8a(value)) {
            const [offset, length] = Compact.decodeU8a(value);

            const arr = value.subarray(offset, offset + length.toNumber());
            const [version] = arr;
            const definition: any = {...defaultDef};
            if (checkDoughnut(version)) {
                definition.doughnut = Doughnut;
            }
            if (checkFeeExchange(version)) {
                definition.feeExchange = FeeExchange;
            }
            return [definition, arr];
        } else if (value instanceof Method) {
            return [
                defaultDef,
                {
                    method: value,
                },
            ];
        }

        const definition: any = {...defaultDef};
        if (value.doughnut) {
            definition.doughnut = Doughnut;
        }
        if (value.feeExchange) {
            definition.feeExchange = FeeExchange;
        }
        return [definition, value];
    }

    /**
     * @description The arguments passed to for the call, exposes args so it is compatible with [[Method]]
     */
    get args(): Array<Codec> {
        return this.method.args;
    }

    /**
     * @description Thge argument defintions, compatible with [[Method]]
     */
    get argsDef(): ArgsDef {
        return this.method.argsDef;
    }

    /**
     * @description The actual `[sectionIndex, methodIndex]` as used in the Method
     */
    get callIndex(): Uint8Array {
        return this.method.callIndex;
    }

    /**
     * @description The actual data for the Method
     */
    get data(): Uint8Array {
        return this.method.data;
    }

    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength(): number {
        const length = this.length;

        return length + Compact.encodeU8a(length).length;
    }

    /**
     * @description Convernience function, encodes the extrinsic and returns the actual hash
     */
    get hash(): Hash {
        return new Hash(blake2AsU8a(this.toU8a(), 256));
    }

    /**
     * @description `true` is method has `Origin` argument (compatibility with [[Method]])
     */
    get hasOrigin(): boolean {
        return this.method.hasOrigin;
    }

    /**
     * @description `true` id the extrinsic is signed
     */
    get isSigned(): boolean {
        return this.signature.isSigned;
    }

    /**
     * @description The length of the encoded value
     */
    get length(): number {
        return this.toU8a(true).length;
    }

    /**
     * @description The [[FunctionMetadata]] that describes the extrinsic
     */
    get meta(): FunctionMetadata {
        return this.method.meta;
    }

    /**
     * @description The [[Method]] this extrinsic wraps
     */
    get method(): Method {
        return this.get('method') as Method;
    }

    /**
     * @description The [[ExtrinsicSignature]]
     */
    get signature(): ExtrinsicSignature {
        return this.get('signature') as ExtrinsicSignature;
    }

    get doughnut(): Doughnut | undefined {
        return this.get('doughnut') as Doughnut;
    }

    get feeExchange(): FeeExchange | undefined {
        return this.get('feeExchange') as FeeExchange;
    }

    /**
     * @description Add an [[ExtrinsicSignature]] to the extrinsic (already generated)
     */
    addSignature(
        signer: Address | Uint8Array | string,
        signature: Uint8Array | string,
        nonce: AnyNumber,
        era?: Uint8Array
    ): Extrinsic {
        this.signature.addSignature(signer, signature, nonce, era);

        return this;
    }

    /**
     * @description Attach a signed doughnut to the Extrinsic
     * @param doughnut Signed and encoded doughnut bytes
     */
    addDoughnut(doughnut: DoughnutValue): Extrinsic {
        assert(doughnut, 'doughnut is empty');
        this.set('doughnut', new Doughnut(doughnut));
        this.signature.withDoughnut();
        return this;
    }

    /**
     * @description append fee exchange options to Extrinsic
     */
    addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): Extrinsic {
        assert(feeExchangeOpt, 'feeExchangeOpt is empty');
        this.set('feeExchange', new FeeExchange(feeExchangeOpt));
        this.signature.withFeeExchange();
        return this;
    }

    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account: KeyringPair, options: SignatureOptions): Extrinsic {
        this.signature.sign(this, account, options);

        return this;
    }

    /**
     * @description Returns a hex string representation of the value
     */
    toHex(): string {
        return u8aToHex(this.toU8a());
    }

    /**
     * @description Converts the Object to JSON, typically used for RPC transfers
     */
    toJSON(): any {
        return this.toHex();
    }

    /**
     * @description Returns the base runtime type name for this instance
     */
    toRawType(): string {
        // We are treating this in the same way we do a primitive, this is known
        return 'Extrinsic';
    }

    toPlain(): any {
        return super.toJSON();
    }

    toArray(): Array<Codec> {
        const arr: Codec[] = [this.signature];
        arr.push(this.method);
        if (this.doughnut) {
            arr.push(this.doughnut);
        }
        if (this.feeExchange) {
            arr.push(this.feeExchange);
        }
        return arr;
    }

    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare?: boolean): Uint8Array {
        const encoded = super.toU8a();
        return isBare ? encoded : Compact.addLengthPrefix(encoded);
    }
}
