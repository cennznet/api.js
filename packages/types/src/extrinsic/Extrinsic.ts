// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// tslint:disable member-ordering no-magic-numbers

import {ExtrinsicPayloadValueV2} from '@cennznet/types/extrinsic/v2/ExtrinsicPayload';
import {ClassOf, Compact, TypeRegistry} from '@polkadot/types';
import Base from '@polkadot/types/codec/Base';
import {Address, Balance, Call, EcdsaSignature, Ed25519Signature, Sr25519Signature} from '@polkadot/types/interfaces';
import {FunctionMetadataLatest} from '@polkadot/types/interfaces/metadata';
import {AnyU8a, ArgsDef, Codec, IExtrinsic, IExtrinsicEra, IHash, IKeyringPair, Registry} from '@polkadot/types/types';
import {assert, isHex, isU8a, u8aConcat, u8aToHex, u8aToU8a} from '@polkadot/util';
import {ChargeTransactionPayment, Index} from '../runtime';
import {BIT_SIGNED, BIT_UNSIGNED, DEFAULT_VERSION} from './constants';
import {SignatureOptions} from './types';
import ExtrinsicV2, {ExtrinsicValueV2} from './v2/Extrinsic';

export type ExtrinsicImpl = ExtrinsicV2;
export type ExtrinsicValue = ExtrinsicValueV2;
export type ExtrinsicPayloadValue = ExtrinsicPayloadValueV2;

export interface ExtrinsicOptions {
  version?: number;
}

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
export default class Extrinsic extends Base<ExtrinsicImpl> implements IExtrinsic {
  constructor(
    registry: Registry,
    value: Extrinsic | AnyU8a | Call | ExtrinsicValue | undefined,
    {version}: ExtrinsicOptions = {}
  ) {
    super(registry, Extrinsic.decodeExtrinsic(registry, value, version));
  }

  private static newFromValue(registry: Registry, value: any, version: number): ExtrinsicImpl {
    if (value instanceof Extrinsic || value.constructor.name === 'Submittable') {
      return value.raw;
    }

    const isSigned = (version & BIT_SIGNED) === BIT_SIGNED;
    return new ExtrinsicV2(registry, value, {isSigned});
  }

  static decodeExtrinsic(
    registry: Registry,
    value: Extrinsic | AnyU8a | Call | ExtrinsicValue | undefined,
    version: number = DEFAULT_VERSION
  ): ExtrinsicV2 {
    // const registry = new TypeRegistry();
    if (Array.isArray(value) || isHex(value)) {
      // Instead of the block below, it should simply be:
      // return Extrinsic.decodeExtrinsic(hexToU8a(value as string));
      const u8a = u8aToU8a(value);

      // HACK 11 Jan 2019 - before https://github.com/paritytech/substrate/pull/1388
      // extrinsics didn't have the length, cater for both approaches
      const [offset, length] = Compact.decodeU8a(u8a);
      const withPrefix = u8a.length === offset + length.toNumber();

      return Extrinsic.decodeExtrinsic(registry, withPrefix ? u8a : Compact.addLengthPrefix(u8a), version);
    } else if (isU8a(value)) {
      if (!value.length) {
        return Extrinsic.newFromValue(registry, new Uint8Array(), version);
      }

      const [offset, length] = Compact.decodeU8a(value);
      const total = offset + length.toNumber();

      assert(
        total <= value.length,
        `Extrinsic: required length less than remainder, expected at least ${total}, found ${value.length}`
      );

      return Extrinsic.decodeU8a(registry, value.subarray(offset, total));
    } else if (value instanceof ClassOf(registry, 'Call')) {
      return Extrinsic.newFromValue(registry, {method: value}, version);
    }

    return Extrinsic.newFromValue(registry, value, version);
  }

  private static decodeU8a(registry: Registry, value: Uint8Array): ExtrinsicV2 {
    return Extrinsic.newFromValue(registry, value.subarray(1), value[0]);
  }
  /**
   * @description The arguments passed to for the call, exposes args so it is compatible with [[Call]]
   */
  get args(): Codec[] {
    return this.method.args;
  }

  /**
   * @description Thge argument defintions, compatible with [[Call]]
   */
  get argsDef(): ArgsDef {
    return this.method.argsDef;
  }

  /**
   * @description The actual `[sectionIndex, methodIndex]` as used in the Call
   */
  get callIndex(): Uint8Array {
    return this.method.callIndex;
  }

  /**
   * @description The actual data for the Call
   */
  get data(): Uint8Array {
    return this.method.data;
  }

  /**
   * @description The era for this extrinsic
   */
  get era(): IExtrinsicEra {
    return (this.raw as ExtrinsicImpl).signature.era;
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  get encodedLength(): number {
    return this.toU8a().length;
  }

  /**
   * @description `true` is method has `Origin` argument (compatibility with [Call])
   */
  get hasOrigin(): boolean {
    return this.method.hasOrigin;
  }

  /**
   * @description `true` id the extrinsic is signed
   */
  get isSigned(): boolean {
    return (this.raw as ExtrinsicImpl).signature.isSigned;
  }

  /**
   * @description The length of the actual data, excluding prefix
   */
  get length(): number {
    return this.toU8a(true).length;
  }

  /**
   * @description The [[FunctionMetadataLatest]] that describes the extrinsic
   */
  get meta(): FunctionMetadataLatest {
    return this.method.meta;
  }

  /**
   * @description The [[Call]] this extrinsic wraps
   */
  get method(): Call {
    return (this.raw as ExtrinsicImpl).method;
  }

  /**
   * @description The nonce for this extrinsic
   */
  get nonce(): Compact<Index> {
    return (this.raw as ExtrinsicImpl).signature.nonce;
  }

  /**
   * @description The [[ExtrinsicSignature]]
   */
  get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature {
    return (this.raw as ExtrinsicImpl).signature.signature;
  }

  /**
   * @description The [[Address]] that signed
   */
  get signer(): Address {
    return (this.raw as ExtrinsicImpl).signature.signer;
  }

  /**
   * @description Extrinsic fee metadata e.g. tip, fee exchange parameters
   */
  get tip(): Compact<Balance> {
    return (this.raw as ExtrinsicImpl).signature.transactionPayment.tip as Compact<Balance>;
  }

  /**
   * @description Extrinsic fee metadata e.g. tip, fee exchange parameters
   */
  get transactionPayment(): ChargeTransactionPayment {
    return (this.raw as ExtrinsicImpl).signature.transactionPayment;
  }

  /**
   * @description Returns the raw transaction version (not flagged with signing information)
   */
  get type(): number {
    return (this.raw as ExtrinsicImpl).version;
  }

  /**
   * @description Returns the encoded version flag
   */
  get version(): number {
    return this.type | (this.isSigned ? BIT_SIGNED : BIT_UNSIGNED);
  }

  /**
   * @description Add an [[ExtrinsicSignature]] to the extrinsic (already generated)
   */
  addSignature(
    signer: Address | Uint8Array | string,
    signature: Uint8Array | string,
    payload: ExtrinsicPayloadValue | Uint8Array | string
  ): Extrinsic {
    (this.raw as ExtrinsicV2).addSignature(signer, signature, payload as ExtrinsicPayloadValueV2);

    return this;
  }

  /**
   * @description Sign the extrinsic with a specific keypair
   */
  sign(account: IKeyringPair, options: SignatureOptions): Extrinsic {
    (this.raw as ExtrinsicImpl).sign(account, options);

    return this;
  }

  /**
   * @describe Adds a fake signature to the extrinsic
   */
  signFake(signer: Address | Uint8Array | string, options: SignatureOptions): Extrinsic {
    (this.raw as ExtrinsicImpl).signFake(signer, options);

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
  toJSON(): string {
    return this.toHex();
  }

  /**
   * @description Returns the base runtime type name for this instance
   */
  toRawType(): string {
    return 'Extrinsic';
  }

  /**
   * @description Encodes the value as a Uint8Array as per the SCALE specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  toU8a(isBare?: boolean): Uint8Array {
    const encoded = u8aConcat(new Uint8Array([this.version]), this.raw.toU8a());
    return isBare ? encoded : Compact.addLengthPrefix(encoded);
  }
}
