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

import {
  Address,
  Balance,
  Call,
  EcdsaSignature,
  Ed25519Signature,
  ExtrinsicEra,
  Index,
  MultiSignature,
  Sr25519Signature,
} from '@polkadot/types/interfaces';
import { Compact, Struct } from '@polkadot/types';
import { ExtrinsicPayloadValue, IExtrinsicSignature, IKeyringPair, Registry } from '@polkadot/types/types';
import { EMPTY_U8A, IMMORTAL_ERA } from '@polkadot/types/extrinsic/constants';
import { u8aConcat } from '@polkadot/util';

import { ExtrinsicSignatureOptions } from '@polkadot/types/extrinsic/types';
import { expandExtensionTypes, defaultExtensions } from '../signedExtensions';
import { ChargeTransactionPayment } from '../../transactionPayment';
import { SignatureOptions } from '../types';
import ExtrinsicPayloadV4 from './ExtrinsicPayload';

/**
 * @name CENNZnetExtrinsicSignatureV1
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class CENNZnetExtrinsicSignatureV1 extends Struct implements IExtrinsicSignature {
  constructor(
    registry: Registry,
    value: CENNZnetExtrinsicSignatureV1 | Uint8Array | undefined,
    extSigOpt: ExtrinsicSignatureOptions = {}
  ) {
    const isSigned = extSigOpt.isSigned;
    super(
      registry,
      {
        signer: 'Address',
        signature: 'MultiSignature',
        ...expandExtensionTypes(defaultExtensions as string[], 'extrinsic'),
      },
      CENNZnetExtrinsicSignatureV1.decodeExtrinsicSignature(value, isSigned)
    );
  }

  /** @internal */
  static decodeExtrinsicSignature(
    value: CENNZnetExtrinsicSignatureV1 | Uint8Array | undefined,
    isSigned = false
  ): CENNZnetExtrinsicSignatureV1 | Uint8Array {
    if (!value) {
      return EMPTY_U8A;
    } else if (value instanceof CENNZnetExtrinsicSignatureV1) {
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
   * @description The actual [[EcdsaSignature]], [[Ed25519Signature]] or [[Sr25519Signature]]
   */
  get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature {
    return this.multiSignature.value as Sr25519Signature;
  }

  /**
   * @description The raw [[MultiSignature]]
   */
  get multiSignature(): MultiSignature {
    return this.get('signature') as MultiSignature;
  }

  /**
   * @description The [[Address]] that signed
   */
  get signer(): Address {
    return this.get('signer') as Address;
  }

  /**
   * @description tip [[Balance]] (here for compatibility with [[IExtrinsic]] definition)
   */
  get tip(): Compact<Balance> {
    return this.transactionPayment.tip as Compact<Balance>;
  }

  /**
   * @description The transaction fee metadata e.g tip, fee exchange
   */
  get transactionPayment(): ChargeTransactionPayment {
    return this.get('transactionPayment') as ChargeTransactionPayment;
  }

  protected injectSignature(
    signer: Address,
    signature: MultiSignature,
    { era, nonce, transactionPayment }: ExtrinsicPayloadV4
  ): IExtrinsicSignature {
    this.set('era', era);
    this.set('nonce', nonce);
    this.set('signer', signer);
    this.set('signature', signature);
    this.set('transactionPayment', transactionPayment);

    return this;
  }

  /**
   * @description Adds a raw signature
   */
  addSignature(
    signer: Address | Uint8Array | string,
    signature: Uint8Array | string,
    payload: ExtrinsicPayloadValue | Uint8Array | string
  ): IExtrinsicSignature {
    return this.injectSignature(
      this.registry.createType('Address', signer),
      this.registry.createType('MultiSignature', signature),
      new ExtrinsicPayloadV4(this.registry, payload)
    );
  }

  /**
   * @description Creates a payload from the supplied options
   */
  createPayload(
    method: Call,
    {
      blockHash,
      era,
      genesisHash,
      nonce,
      runtimeVersion: { specVersion, transactionVersion },
      transactionPayment,
    }: SignatureOptions
  ): ExtrinsicPayloadV4 {
    return new ExtrinsicPayloadV4(this.registry, {
      blockHash,
      era: era || IMMORTAL_ERA,
      genesisHash,
      method: method.toHex(),
      nonce,
      specVersion,
      // [[tip]] is now set inside [[transactionPayment]]
      // This doesn't do anything, just signalling our intention not to use it.
      tip: null,
      transactionVersion: transactionVersion || 0,
      transactionPayment: transactionPayment,
    });
  }

  /**
   * @description Generate a payload and applies the signature from a keypair
   */
  sign(method: Call, account: IKeyringPair, options: SignatureOptions): IExtrinsicSignature {
    const signer = this.registry.createType('Address', account.addressRaw);
    const payload = this.createPayload(method, options);
    const signature = this.registry.createType('MultiSignature', payload.sign(account));
    return this.injectSignature(signer, signature, payload);
  }

  /**
   * @description Generate a payload and applies a fake signature
   */
  signFake(method: Call, address: Address | Uint8Array | string, options: SignatureOptions): IExtrinsicSignature {
    const signer = this.registry.createType('Address', address);
    const payload = this.createPayload(method, options);
    const signature = this.registry.createType(
      'MultiSignature',
      u8aConcat(new Uint8Array([1]), new Uint8Array(64).fill(0x42))
    );

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
