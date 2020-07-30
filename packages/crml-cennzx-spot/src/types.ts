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

import {AnyJson, BareOpts, Codec, Registry} from '@polkadot/types/types';
import {Balance, H256} from '@polkadot/types/interfaces';
import {u8aConcat} from '@polkadot/util';

export class LiquidatedAsset implements Codec {
    coreAmount: Balance;
    assetAmount: Balance;

    readonly encodedLength: number;
    readonly hash: H256;
    readonly isEmpty: boolean;
    readonly registry: Registry;

    constructor({coreAmount, assetAmount}) {
        this.coreAmount = coreAmount;
        this.assetAmount = assetAmount;
    }

    eq(other?: LiquidatedAsset): boolean {
        return this.coreAmount.eq(other.coreAmount) && this.assetAmount.eq(other.assetAmount);
    }

    toHex(isLe?: boolean): string {
        return this.coreAmount.toHex(isLe) + this.coreAmount.toHex(isLe);
    }

    toHuman(isExtended?: boolean): AnyJson {
        return "{ \"core\": \"" + this.coreAmount.toHuman(isExtended) + "\", \"asset\": \"" + this.assetAmount.toHuman(isExtended) + "\"}";
    }

    toJSON(): AnyJson {
        return "{ \"core\":" + this.coreAmount.toRawType() + ", \"asset\":" + this.assetAmount.toRawType() + "}";
    }

    toRawType(): string {
        return this.toJSON().toString();
    }

    toU8a(isBare?: BareOpts): Uint8Array {
        // TODO check for isBare
        return u8aConcat(this.coreAmount.toU8a(true), this.assetAmount.toU8a(true));
    }
}
