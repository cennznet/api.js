// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// tslint:disable member-ordering no-magic-numbers

import {Compact, Raw, u32} from '@polkadot/types';
import Base from '@polkadot/types/codec/Base';
import {Balance, Hash} from '@polkadot/types/interfaces/runtime';
import {IExtrinsicEra, IKeyringPair, Registry} from '@polkadot/types/types';

import {u8aToHex} from '@polkadot/util';

import {ChargeTransactionPayment, Index} from '../runtime';
import {DEFAULT_VERSION} from './constants';
import {ExtrinsicPayloadValue} from './types';
import ExtrinsicPayloadV2, {ExtrinsicPayloadValueV2} from './v2/ExtrinsicPayload';

interface ExtrinsicPayloadOptions {
  version?: number;
}

// all our known types that can be returned
type ExtrinsicPayloadVx = ExtrinsicPayloadV2;

/**
 * @name ExtrinsicPayload
 * @description
 * A signing payload for an [[Extrinsic]]. For the final encoding, it is variable length based
 * on the contents included
 */
export default class ExtrinsicPayload extends Base<ExtrinsicPayloadVx> {
  constructor(
    registry: Registry,
    value: Partial<ExtrinsicPayloadValue> | Uint8Array | string | undefined,
    {version}: ExtrinsicPayloadOptions = {}
  ) {
    super(registry, ExtrinsicPayload.decodeExtrinsicPayload(registry, value as ExtrinsicPayloadValue, version));
  }

  static decodeExtrinsicPayload(
    registry: Registry,
    value: ExtrinsicPayload | ExtrinsicPayloadValue | ExtrinsicPayloadValueV2 | Uint8Array | string | undefined,
    version: number = DEFAULT_VERSION
  ): ExtrinsicPayloadVx {
    if (value instanceof ExtrinsicPayload) {
      return value.raw;
    }

    return new ExtrinsicPayloadV2(registry, value as ExtrinsicPayloadValueV2);
  }

  /**
   * @description The block [[Hash]] the signature applies to (mortal/immortal)
   */
  get blockHash(): Hash {
    return this.raw.blockHash;
  }

  /**
   * @description The [[ExtrinsicEra]]
   */
  get era(): IExtrinsicEra {
    return this.raw.era;
  }

  /**
   * @description The genesis block [[Hash]] the signature applies to
   */
  get genesisHash(): Hash {
    return (this.raw as ExtrinsicPayloadV2).genesisHash;
  }

  /**
   * @description The [[U8a]] contained in the payload
   */
  get method(): Raw {
    return this.raw.method;
  }

  /**
   * @description The [[Index]]
   */
  get nonce(): Compact<Index> {
    return this.raw.nonce;
  }

  /**
   * @description The specVersion as a [[u32]] for this payload
   */
  get specVersion(): u32 {
    return (this.raw as ExtrinsicPayloadV2).specVersion;
  }

  /**
   * @description The tip [[Balance]] given to the transaction
   */
  get tip(): Compact<Balance> {
    return (this.raw as ExtrinsicPayloadV2).tip;
  }

  /**
   * @description The fee payment metadata (includes. tip)
   */
  get transactionPayment(): ChargeTransactionPayment {
    return (this.raw as ExtrinsicPayloadV2).transactionPayment;
  }

  /**
   * @description Compares the value of the input to see if there is a match
   */
  eq(other?: any): boolean {
    return this.raw.eq(other);
  }

  /**
   * @description Sign the payload with the keypair
   */
  sign(signerPair: IKeyringPair): {signature: string} {
    const signature = this.raw.sign(signerPair);

    // This is extensible, so we could quite readily extend to send back extra
    // information, such as for instance the payload, i.e. `payload: this.toHex()`
    // For the case here we sign via the extrinsic, we ignore the return, so generally
    // this is applicable for external signing
    return {
      signature: u8aToHex(signature),
    };
  }

  /**
   * @description Converts the Object to JSON, typically used for RPC transfers
   */
  toJSON(): any {
    return this.toHex();
  }

  /**
   * @description Returns the string representation of the value
   */
  toString(): string {
    return this.toHex();
  }
}
