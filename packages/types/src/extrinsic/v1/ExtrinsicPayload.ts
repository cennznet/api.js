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
import {Bytes, Compact, Struct} from '@polkadot/types';
import {ExtrinsicEra, Hash, Index} from '@polkadot/types/interfaces/runtime';
import {sign} from '@polkadot/types/primitive/Extrinsic/util';
import {AnyNumber, AnyU8a, IExtrinsicEra, IKeyringPair, IMethod} from '@polkadot/types/types';

import {ExtrinsicPayloadOptions, FeeExchangeValue} from '../types';
import Doughnut from './Doughnut';
import FeeExchange from './FeeExchange';

export interface ExtrinsicPayloadValueV1 {
    blockHash: AnyU8a;
    era: AnyU8a | IExtrinsicEra;
    genesisHash: AnyU8a;
    method: AnyU8a | IMethod;
    nonce: AnyNumber;
    doughnut?: AnyU8a | Doughnut;
    feeExchange?: FeeExchangeValue | FeeExchange;
}

/**
 * @name ExtrinsicPayloadV1
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 *
 *   1-8 bytes: The Transaction Compact<Index/Nonce> as provided in the transaction itself.
 *   2+ bytes: The Function Descriptor as provided in the transaction itself.
 *   1/2 bytes: The Transaction Era as provided in the transaction itself.
 *   32 bytes: The hash of the authoring block implied by the Transaction Era and the current block.
 */
export default class ExtrinsicPayloadV1 extends Struct {
    constructor(
        value: ExtrinsicPayloadValueV1 | Uint8Array | string,
        {useDoughnut, useFeeExchange}: ExtrinsicPayloadOptions = {useFeeExchange: false, useDoughnut: false}
    ) {
        const def: any = {
            nonce: 'Compact<Index>',
            method: 'Bytes',
            era: 'ExtrinsicEra',
            blockHash: 'Hash',
        };
        if (useDoughnut || Object.keys(value).includes('doughnut')) {
            def.doughnut = Doughnut;
        }
        if (useFeeExchange || Object.keys(value).includes('feeExchange')) {
            def.feeExchange = FeeExchange;
        }
        super(def, value);
    }

    /**
     * @description The block [[Hash]] the signature applies to (mortal/immortal)
     */
    get blockHash(): Hash {
        return this.get('blockHash') as Hash;
    }

    /**
     * @description The [[Bytes]] contained in the payload
     */
    get method(): Bytes {
        return this.get('method') as Bytes;
    }

    /**
     * @description The [[ExtrinsicEra]]
     */
    get era(): ExtrinsicEra {
        return this.get('era') as ExtrinsicEra;
    }

    /**
     * @description The [[Index]]
     */
    get nonce(): Compact<Index> {
        return this.get('nonce') as Compact<Index>;
    }

    /**
     * @description Sign the payload with the keypair
     */
    sign(signerPair: IKeyringPair): Uint8Array {
        return sign(signerPair, this.toU8a(true));
    }
}
