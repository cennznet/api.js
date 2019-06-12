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

/* tslint:disable no-magic-numbers */

import FeeExchange from '@cennznet/types/extrinsic/FeeExchange';
import {KeyringPair} from '@plugnet/keyring/types';
import {ExtrinsicEra, Hash, Method, RuntimeVersion, Struct} from '@plugnet/types';
import Nonce from '@plugnet/types/type/NonceCompact';
import {AnyNumber, AnyU8a, Codec} from '@plugnet/types/types';
import {blake2AsU8a} from '@plugnet/util-crypto';

import {Doughnut} from './Doughnut';
import {checkDoughnut, checkFeeExchange} from './ExtrinsicSignature';

type SignaturePayloadValue = {
    nonce?: AnyNumber;
    method?: Method;
    era?: AnyU8a | ExtrinsicEra;
    blockHash?: AnyU8a;
    doughnut?: Doughnut;
    feeExchange?: FeeExchange;
};

/**
 * @name SignaturePayload
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the conetnts included
 *
 *   8 bytes: The Transaction Index/Nonce as provided in the transaction itself.
 *   2+ bytes: The Function Descriptor as provided in the transaction itself.
 *   2 bytes: The Transaction Era as provided in the transaction itself.
 *   32 bytes: The hash of the authoring block implied by the Transaction Era and the current block.
 */
export default class SignaturePayload extends Struct {
    protected _signature?: Uint8Array;
    protected _extrinsicVersion: number = 0;

    constructor(value?: SignaturePayloadValue | Uint8Array) {
        super(
            {
                nonce: Nonce,
                method: Method,
                era: ExtrinsicEra,
                blockHash: Hash,
                doughnut: Doughnut,
                feeExchange: FeeExchange,
            },
            value
        );
    }

    /**
     * @description `true` if the payload refers to a valid signature
     */
    get isSigned(): boolean {
        return !!(this._signature && this._signature.length === 64);
    }

    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash(): Hash {
        return this.get('blockHash') as Hash;
    }

    /**
     * @description The [[Method]] contained in the payload
     */
    get method(): Method {
        return this.get('method') as Method;
    }

    /**
     * @description The [[ExtrinsicEra]]
     */
    get era(): ExtrinsicEra {
        return this.get('era') as ExtrinsicEra;
    }

    /**
     * @description The [[Nonce]]
     */
    get nonce(): Nonce {
        return this.get('nonce') as Nonce;
    }

    /**
     * @description The raw signature as a `Uint8Array`
     */
    get signature(): Uint8Array {
        if (!this.isSigned) {
            throw new Error('Transaction is not signed');
        }

        return this._signature as Uint8Array;
    }

    get doughnut(): Doughnut {
        return this.get('doughnut') as Doughnut;
    }

    get feeExchange(): FeeExchange {
        return this.get('feeExchange') as FeeExchange;
    }

    get extrinsicVersion(): number {
        return this._extrinsicVersion;
    }

    set extrinsicVersion(version: number) {
        this._extrinsicVersion = version;
    }

    toArray(): Array<Codec> {
        const arr: Codec[] = [this.nonce, this.method, this.era, this.blockHash];
        if (checkDoughnut(this.extrinsicVersion)) {
            arr.push(this.doughnut);
        }
        if (checkFeeExchange(this.extrinsicVersion)) {
            arr.push(this.feeExchange);
        }
        return arr;
    }

    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair: KeyringPair, version?: RuntimeVersion): Uint8Array {
        // for newer api versions, hash when length > 256
        const isLegacy =
            !version ||
            (version.specName.eq('node') && version.specVersion.ltn(18)) ||
            (version.specName.eq('polkadot') && version.specVersion.ltn(107));
        const u8a = this.toU8a();
        const encoded = !isLegacy && u8a.length > 256 ? blake2AsU8a(u8a) : u8a;
        this._signature = signerPair.sign(encoded);

        return this._signature;
    }
}
