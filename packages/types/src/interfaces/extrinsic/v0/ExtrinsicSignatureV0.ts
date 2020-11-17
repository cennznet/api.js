// Copyright 2019-2020 Centrality Investments Limited & @polkadot/types authors & contributors
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
import { Compact, createType, Struct } from '@polkadot/types';
import Option from '@polkadot/types/codec/Option';
import {
  Address,
  Balance,
  Call,
  Index,
  EcdsaSignature,
  Ed25519Signature,
  ExtrinsicEra,
  MultiSignature,
  Sr25519Signature,
} from '@polkadot/types/interfaces';
import { EMPTY_U8A, IMMORTAL_ERA } from '@polkadot/types/extrinsic/constants';
import { IExtrinsicSignature, IKeyringPair, Registry } from '@polkadot/types/types';
import { u8aConcat } from '@polkadot/util';
import { ExtrinsicSignatureOptions } from '@polkadot/types/extrinsic/types';
import { ExtrinsicV0SignatureOptions } from '../types';
import { ChargeTransactionPayment, doughnut } from '../../types';
import ExtrinsicPayloadV0, { ExtrinsicPayloadValueV0 } from './ExtrinsicPayloadV0';

/**
 * @name ExtrinsicSignature
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class ExtrinsicSignatureV0 extends Struct implements IExtrinsicSignature {
  constructor(
    registry: Registry,
    value: ExtrinsicSignatureV0 | Uint8Array | undefined,
    { isSigned }: ExtrinsicSignatureOptions = {}
  ) {
    super(
      registry,
      {
        signer: 'Address',
        signature: 'MultiSignature',
        doughnut: 'Option<doughnut>',
        era: 'ExtrinsicEra',
        nonce: 'Compact<Index>',
        transactionPayment: 'ChargeTransactionPayment',
      },
      ExtrinsicSignatureV0.decodeExtrinsicSignature(value, isSigned)
    );
  }

  static decodeExtrinsicSignature(
    value: ExtrinsicSignatureV0 | Uint8Array | undefined,
    isSigned = false
  ): ExtrinsicSignatureV0 | Uint8Array {
    if (!value) {
      return EMPTY_U8A;
    } else if (value instanceof ExtrinsicSignatureV0) {
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
   * @description The [[Doughnut]]
   */
  get doughnut(): Option<doughnut> {
    return this.get('doughnut') as Option<doughnut>;
  }

  /**
   * @description The actuall [[Signature]] hash
   */
  //  get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature {
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
   * @description tip (here for compatibility with [[IExtrinsic]] definition)
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

  private injectSignature(
    signer: Address,
    signature: MultiSignature,
    { doughnut, era, nonce, transactionPayment }: ExtrinsicPayloadV0
  ): IExtrinsicSignature {
    this.set('doughnut', doughnut);
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
    payload: ExtrinsicPayloadValueV0 | Uint8Array | string
  ): IExtrinsicSignature {
    return this.injectSignature(
      createType(this.registry, 'Address', signer),
      createType(this.registry, 'MultiSignature', signature),
      new ExtrinsicPayloadV0(this.registry, payload)
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
      doughnut,
      runtimeVersion: { specVersion },
      transactionPayment,
    }: ExtrinsicV0SignatureOptions
  ): ExtrinsicPayloadV0 {
    return new ExtrinsicPayloadV0(this.registry, {
      blockHash,
      doughnut: doughnut || createType(this.registry, 'Option<doughnut>'),
      era: era || IMMORTAL_ERA,
      genesisHash,
      method: method.toHex(),
      nonce,
      specVersion,
      // [[tip]] is now set inside [[transactionPayment]]
      // This doesn't do anything, just signalling our intention not to use it.
      tip: null,
      transactionPayment: transactionPayment || createType(this.registry, 'ChargeTransactionPayment'),
    });
  }

  /**
   * @description Generate a payload and pplies the signature from a keypair
   */
  sign(
    method: Call,
    account: IKeyringPair,
    {
      blockHash,
      era,
      genesisHash,
      nonce,
      doughnut,
      runtimeVersion: { specVersion },
      tip,
      transactionPayment,
    }: ExtrinsicV0SignatureOptions
  ): IExtrinsicSignature {
    const signer = createType(this.registry, 'Address', account.publicKey);
    const payload = this.createPayload(method, {
      blockHash,
      era,
      genesisHash,
      nonce,
      doughnut,
      runtimeVersion: { specVersion },
      transactionPayment,
    } as ExtrinsicV0SignatureOptions);
    const signature = createType(this.registry, 'MultiSignature', payload.sign(account));
    return this.injectSignature(signer, signature, payload);
  }

  /**
   * @description Generate a payload and applies a fake signature
   */
  signFake(
    method: Call,
    address: Address | Uint8Array | string,
    {
      blockHash,
      era,
      genesisHash,
      nonce,
      doughnut,
      runtimeVersion: { specVersion },
      tip,
      transactionPayment,
    }: ExtrinsicV0SignatureOptions
  ): IExtrinsicSignature {
    const signer = createType(this.registry, 'Address', address);
    const payload = this.createPayload(method, {
      blockHash,
      era,
      genesisHash,
      nonce,
      doughnut,
      runtimeVersion: { specVersion },
      tip,
      transactionPayment,
    } as ExtrinsicV0SignatureOptions);
    const signature = createType(
      this.registry,
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
