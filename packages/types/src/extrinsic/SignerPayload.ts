// Copyright 2017-2019 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {Compact, Option, Struct, u8} from '@plugnet/types';
import {
    Address,
    Balance,
    BlockNumber,
    Call,
    ExtrinsicEra,
    Hash,
    Index,
    RuntimeVersion,
} from '@plugnet/types/interfaces';
import {
    Codec,
    Constructor,
    ISignerPayload,
    SignerPayloadJSON as SignerPayloadJSONBase,
    SignerPayloadRaw,
} from '@plugnet/types/types';
import {u8aToHex} from '@plugnet/util';

import ExtrinsicPayload from './ExtrinsicPayload';
import Doughnut from './v1/Doughnut';
import FeeExchange from './v1/FeeExchange';

export interface SignerPayloadType extends Struct {
    address: Address;
    blockHash: Hash;
    blockNumber: BlockNumber;
    era: ExtrinsicEra;
    genesisHash: Hash;
    method: Call;
    nonce: Compact<Index>;
    runtimeVersion: RuntimeVersion;
    tip: Compact<Balance>;
    version: u8;
    doughnut: Option<Doughnut>;
    feeExchange: Option<FeeExchange>;
}

export interface SignerPayloadJSON extends SignerPayloadJSONBase {
    doughnut?: string;
    feeExchange?: {
        assetId: number;
        maxPayment: string;
    };
}

// We explicitly cast the type here to get the actual TypeScript exports right
// We can ignore the properties, added via Struct.with
const _Payload: Constructor<SignerPayloadType> = Struct.with({
    address: 'Address',
    blockHash: 'Hash',
    blockNumber: 'BlockNumber',
    era: 'ExtrinsicEra',
    genesisHash: 'Hash',
    method: 'Call',
    nonce: 'Compact<Index>',
    runtimeVersion: 'RuntimeVersion',
    tip: 'Compact<Balance>',
    version: 'u8',
    doughnut: Option.with(Doughnut),
    feeExchange: Option.with(FeeExchange),
}) as any;

export default class SignerPayload extends _Payload implements ISignerPayload {
    /**
     * @description Creates an representation of the structure as an ISignerPayload JSON
     */
    toPayload(): SignerPayloadJSON {
        const {
            address,
            blockHash,
            blockNumber,
            era,
            genesisHash,
            method,
            nonce,
            runtimeVersion: {specVersion},
            tip,
            version,
            doughnut,
            feeExchange,
        } = this;
        const ret: SignerPayloadJSON = {
            address: address.toString(),
            blockHash: blockHash.toHex(),
            blockNumber: blockNumber.toHex(),
            era: era.toHex(),
            genesisHash: genesisHash.toHex(),
            method: method.toHex(),
            nonce: nonce.toHex(),
            specVersion: specVersion.toHex(),
            tip: tip.toHex(),
            version: version.toNumber(),
        };
        if (doughnut.isSome) {
            ret.doughnut = doughnut.unwrap().toHex();
        }
        if (feeExchange.isSome) {
            ret.feeExchange = feeExchange.unwrap().toJSON();
        }
        return ret;
    }

    /**
     * @description Creates a representation of the payload in raw Exrinsic form
     */
    toRaw(): SignerPayloadRaw {
        const payload = this.toPayload();
        // NOTE Explicitly pass the bare flag so the method is encoded un-prefixed (non-decodable, for signing only)
        const data = u8aToHex(new ExtrinsicPayload(payload, {version: payload.version}).toU8a(true));

        return {
            address: payload.address,
            data,
            type: 'payload',
        };
    }

    toArray(): Codec[] {
        return super.toArray();
    }
}
