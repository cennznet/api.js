// Copyright 2019-2020 Centrality Investments Limited
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

import { Compact, Struct, u8, Vec } from '@polkadot/types';
import { Text } from '@polkadot/types/primitive/Text';
import { Balance, BlockNumber, Call, ExtrinsicEra, Hash, RuntimeVersion } from '@polkadot/types/interfaces';
import {
  AnyJson,
  Codec,
  Constructor,
  ISignerPayload,
  SignerPayloadJSON as SignerPayloadJSONBase,
  SignerPayloadRaw,
} from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';

import { Address, Index } from '../types';
import { ChargeTransactionPayment } from '../transactionPayment';
import { defaultExtensions } from "./signedExtensions";

export interface SignerPayloadJSON extends SignerPayloadJSONBase {
  transactionPayment?: Record<string, AnyJson>;
}

export interface SignerPayloadType extends Codec {
  address: Address;
  blockHash: Hash;
  blockNumber: BlockNumber;
  era: ExtrinsicEra;
  genesisHash: Hash;
  method: Call;
  nonce: Compact<Index>;
  runtimeVersion: RuntimeVersion;
  signedExtensions: Vec<Text>;
  tip?: Compact<Balance>;
  version: u8;
  transactionPayment: ChargeTransactionPayment;
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
  transactionPayment: 'ChargeTransactionPayment',
  version: 'u8',
}) as any;

/**
 * @name SignerPayload
 * @description
 * A generic signer payload that can be used for serialization between API and signer
 */
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
      runtimeVersion: { specVersion, transactionVersion },
      transactionPayment,
      version,
      signedExtensions,
      tip
    } = this;

    if (signedExtensions) {
      console.warn(`custom signed extensions will be ignored`);
    }

    if (!tip.isEmpty) {
      console.warn(`ignoring tip. use transactionPayment.tip`);
    }

    return {
      address: address.toString(),
      blockHash: blockHash.toHex(),
      blockNumber: blockNumber.toHex(),
      era: era.toHex(),
      genesisHash: genesisHash.toHex(),
      method: method.toHex(),
      nonce: nonce.toHex(),
      specVersion: specVersion.toHex(),
      // [[tip]] is contained within [[transactionPayment]]
      tip: null,
      transactionVersion: transactionVersion.toHex(),
      transactionPayment: transactionPayment.toJSON(),
      version: version.toNumber(),
      signedExtensions: defaultExtensions
    };
  }

  /**
   * @description Creates a representation of the payload in raw Extrinsic form
   */
  toRaw(): SignerPayloadRaw {
    const payload = this.toPayload();
    // NOTE Explicitly pass the bare flag so the method is encoded un-prefixed (non-decodable, for signing only)
    const data = u8aToHex(
      this.registry.createType('ExtrinsicPayload', payload, { version: payload.version }).toU8a({ method: true })
    );

    return {
      address: payload.address,
      data,
      type: 'payload',
    };
  }
}
