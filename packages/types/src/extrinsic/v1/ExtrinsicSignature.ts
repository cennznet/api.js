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
import {Compact, createType, Struct} from '@plugnet/types';
import {Address, Balance, Call, ExtrinsicEra, Index, Signature} from '@plugnet/types/interfaces/runtime';
import {IExtrinsicSignature, IKeyringPair} from '@plugnet/types/types';

import {EMPTY_U8A, IMMORTAL_ERA} from '../constants';
import {ExtrinsicSignatureOptions, SignatureOptions} from '../types';
import ExtrinsicPayloadV1, {ExtrinsicPayloadValueV1} from './ExtrinsicPayload';

/**
 * @name ExtrinsicSignature
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class ExtrinsicSignatureV1 extends Struct implements IExtrinsicSignature {
    // Signature Information.
    //   1/3/5/9/33 bytes: The signing account identity, in Address format
    //   64 bytes: The sr25519/ed25519 signature of the Signing Payload
    //   1-8 bytes: The Compact<Nonce> of the signing account
    //   1/2 bytes: The Transaction Era
    constructor(value?: ExtrinsicSignatureV1 | Uint8Array, {isSigned}: ExtrinsicSignatureOptions = {}) {
        super(
            {
                signer: 'Address',
                signature: 'Signature',
                nonce: 'Compact<Index>',
                era: 'ExtrinsicEra',
            },
            ExtrinsicSignatureV1.decodeExtrinsicSignature(value, isSigned)
        );
    }

    static decodeExtrinsicSignature(
        value: ExtrinsicSignatureV1 | Uint8Array | undefined,
        isSigned: boolean = false
    ): ExtrinsicSignatureV1 | Uint8Array {
        if (!value) {
            return EMPTY_U8A;
        } else if (value instanceof ExtrinsicSignatureV1) {
            return value;
        }

        return isSigned ? value : EMPTY_U8A;
    }

    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength(): number {
        return this.isSigned ? super.encodedLength : 0;
    }

    /**
     * @description `true` if the signature is valid
     */
    get isSigned(): boolean {
        return !this.signature.isEmpty;
    }

    /**
     * @description The [[ExtrinsicEra]] (mortal or immortal) this signature applies to
     */
    get era(): ExtrinsicEra {
        return this.get('era') as ExtrinsicEra;
    }

    /**
     * @description The [[Index]] for the signature
     */
    get nonce(): Compact<Index> {
        return this.get('nonce') as Compact<Index>;
    }

    /**
     * @description The actuall [[Signature]] hash
     */
    get signature(): Signature {
        return this.get('signature') as Signature;
    }

    /**
     * @description The [[Address]] that signed
     */
    get signer(): Address {
        return this.get('signer') as Address;
    }

    /**
     * @description Forwards compat
     */
    get tip(): Compact<Balance> {
        return createType('Compact<Balance>', 0);
    }

    private injectSignature(
        signer: Address,
        signature: Signature,
        {era, nonce}: ExtrinsicPayloadV1
    ): IExtrinsicSignature {
        this.set('era', era);
        this.set('nonce', nonce);
        this.set('signer', signer);
        this.set('signature', signature);

        return this;
    }

    /**
     * @description Adds a raw signature
     */
    addSignature(
        signer: Address | Uint8Array | string,
        signature: Uint8Array | string,
        payload: ExtrinsicPayloadValueV1 | Uint8Array | string
    ): IExtrinsicSignature {
        return this.injectSignature(
            createType('Address', signer),
            createType('Signature', signature),
            new ExtrinsicPayloadV1(payload)
        );
    }

    /**
     * @description Generate a payload and pplies the signature from a keypair
     */
    sign(
        method: Call,
        account: IKeyringPair,
        {blockHash, era, genesisHash, nonce, doughnut, feeExchange}: SignatureOptions
    ): IExtrinsicSignature {
        const signer = createType('Address', account.publicKey);
        const payloadValue: ExtrinsicPayloadValueV1 = {
            blockHash,
            era: era || IMMORTAL_ERA,
            genesisHash,
            method: method.toHex(),
            nonce,
        };
        if (doughnut) {
            payloadValue.doughnut = doughnut;
        }
        if (feeExchange) {
            payloadValue.feeExchange = feeExchange;
        }
        const payload = new ExtrinsicPayloadV1(payloadValue);
        const signature = createType('Signature', payload.sign(account));

        return this.injectSignature(signer, signature, payload);
    }

    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare?: boolean): Uint8Array {
        return this.isSigned ? super.toU8a(isBare) : EMPTY_U8A;
    }
}
