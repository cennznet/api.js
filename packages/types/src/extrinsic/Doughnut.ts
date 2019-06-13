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

import {u8aToHex} from '@plugnet/util';

/**
 * An encoded, signed v0 Doughnut certificate
 *
 * Doughnut has its own binary codec. We hide this behind the parity codec interface
 * to support integration as an extrinsic data/field.
 *
 **/
export class Doughnut extends Uint8Array {
    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get isEmpty(): boolean {
        return this.encodedLength == 0;
    }

    /**
     * @description Decode a Doughnut from a Uint8Array
     * @param encoded A doughnut in v0 binary format, fails otherwise
     */
    decode(encoded: Uint8Array): Doughnut | undefined {
        return encoded as Doughnut;
    }

    /**
     * @description The length of the value when encoded as a Uint8Array
     */
    get encodedLength(): number {
        return this.length;
    }

    /**
     * @description Returns a hex string representation of the value
     */
    toHex(): string {
        return u8aToHex(this);
    }

    /**
     * @description Encodes the value as a Uint8Array as per the parity-codec specifications
     * @param isBare true when the value has none of the type-specific prefixes (internal)
     */
    toU8a(isBare?: boolean): Uint8Array {
        return this as Uint8Array;
    }

    /**
     * @description Converts the Object to JSON, typically used for RPC transfers
     */
    toJSON(): any {
        return this.values();
    }

    /**
     * @description Returns the string representation of the value
     */
    toString(): string {
        return this.toHex();
    }

    /**
     * @description Compares the value of the input to see if there is a match
     */
    eq(other?: any): boolean {
        // TODO: This is just to satisfy the interface.
        // Expecting feedback on correct implementation in PR review
        return Object.is(this, other);
    }
}
