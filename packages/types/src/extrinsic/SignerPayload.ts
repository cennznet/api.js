// Copyright 2017-2020 Centrality Investments Limited & @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Address, Balance, BlockNumber, Call, ExtrinsicEra, Hash, Index, RuntimeVersion } from '@polkadot/types/interfaces';
import { Codec, Constructor } from '@polkadot/types/types';

import { u8aToHex } from '@polkadot/util';

import Compact from '@polkadot/types/codec/Compact';
import Option from '@polkadot/types/codec/Option';
import Struct from '@polkadot/types/codec/Struct';
import u8 from '@polkadot/types/primitive/U8';

import { SignerPayloadJSON, SignerPayloadRaw, ISignerPayload } from "../types";
import Doughnut from '../Doughnut';
import {ChargeTransactionPayment, FeeExchange} from '../runtime/transaction-payment';

export interface SignerPayloadType extends Codec {
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
  transactionPayment: ChargeTransactionPayment;
}

// We explicitly cast the type here to get the actual TypeScript exports right
// We can ignore the properties, added via Struct.with
const _Payload = Struct.with({
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
  transactionPayment: ChargeTransactionPayment.with({tip: 'Compact<Balance>', feeExchange: Option.with(FeeExchange)})
}) as unknown as Constructor<SignerPayloadType>;

/**
 * @name SignerPayload
 * @description
 * A generic signer payload that can be used for serialization between API and signer
 */
export default class SignerPayload extends _Payload implements ISignerPayload {
  /**
   * @description Creates an representation of the structure as an ISignerPayload JSON
   */
  public toPayload (): SignerPayloadJSON {
    const { address, blockHash, blockNumber, era, genesisHash, method, nonce, runtimeVersion: { specVersion }, tip, version, doughnut, transactionPayment } = this;

    let ret: SignerPayloadJSON = {
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
      transactionPayment: transactionPayment.toHex(),
    };

    if (doughnut.isSome) {
      ret.doughnut = doughnut.unwrap().toHex();
    }
    return ret;
  }

  /**
   * @description Creates a representation of the payload in raw Exrinsic form
   */
  public toRaw (): SignerPayloadRaw {
    const payload = this.toPayload();
    // NOTE Explicitly pass the bare flag so the method is encoded un-prefixed (non-decodable, for signing only)
    const data = u8aToHex(this.registry.createType('ExtrinsicPayload', payload, { version: payload.version }).toU8a({ method: true }));

    return {
      address: payload.address,
      data,
      type: 'payload'
    };
  }
}
