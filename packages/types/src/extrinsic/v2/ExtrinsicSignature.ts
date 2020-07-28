// Copyright 2017-2020 Centrality Investments Limited & @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {
  EcdsaSignature,
  Ed25519Signature,
  ExtrinsicEra,
  MultiSignature,
  Sr25519Signature,
} from '@polkadot/types/interfaces/extrinsics';
import {Address, Balance, Call, Index} from '@polkadot/types/interfaces/runtime';
import {u8aConcat} from '@polkadot/util';
import {blake2AsU8a} from '@polkadot/util-crypto';
import {createType} from '@polkadot/types';
import {Option} from '@polkadot/types/codec';
import Compact from '@polkadot/types/codec/Compact';
import Struct from '@polkadot/types/codec/Struct';

import {ChargeTransactionPayment} from '../../runtime/transaction-payment';
import {ExtrinsicPayloadValue, IExtrinsicSignature, IKeyringPair, Registry, SignatureOptions} from '../../types';
import Doughnut from '../../Doughnut';
import {ExtrinsicSignatureOptions} from '../types';
import {EMPTY_U8A, IMMORTAL_ERA} from '../constants';
import ExtrinsicPayloadV2 from './ExtrinsicPayload';

/**
 * @name GenericExtrinsicSignatureV2
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */
export default class ExtrinsicSignatureV2 extends Struct implements IExtrinsicSignature {
  constructor(
    registry: Registry,
    value: ExtrinsicSignatureV2 | Uint8Array | undefined,
    {isSigned}: ExtrinsicSignatureOptions = {}
  ) {
    super(
      registry,
      {
        signer: 'Address',
        signature: 'MultiSignature',
        doughnut: 'Option<Doughnut>',
        era: 'ExtrinsicEra',
        nonce: 'Compact<Index>',
        transactionPayment: 'ChargeTransactionPayment',
      },
      ExtrinsicSignatureV2.decodeExtrinsicSignature(value, isSigned)
    );
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  public get encodedLength(): number {
    return this.isSigned ? super.encodedLength : 0;
  }

  /**
   * @description `true` if the signature is valid
   */
  public get isSigned(): boolean {
    return !this.signature.isEmpty;
  }

  /**
   * @description The [[ExtrinsicEra]] (mortal or immortal) this signature applies to
   */
  public get era(): ExtrinsicEra {
    return this.get('era') as ExtrinsicEra;
  }

  /**
   * @description The [[Index]] for the signature
   */
  public get nonce(): Compact<Index> {
    return this.get('nonce') as Compact<Index>;
  }

  /**
   * @description The [[Doughnut]]
   */
  public get doughnut(): Option<Doughnut> {
    return this.get('doughnut') as Option<Doughnut>;
  }

  /**
   * @description The actual [[EcdsaSignature]], [[Ed25519Signature]] or [[Sr25519Signature]]
   */
  public get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature {
    return this.multiSignature.value as Sr25519Signature;
  }

  /**
   * @description The raw [[MultiSignature]]
   */
  public get multiSignature(): MultiSignature {
    return this.get('signature') as MultiSignature;
  }

  /**
   * @description The [[Address]] that signed
   */
  public get signer(): Address {
    return this.get('signer') as Address;
  }

  /**
   * @description tip (here for compatibility with [[IExtrinsic]] definition)
   */
  public get tip(): Compact<Balance> {
    return this.transactionPayment.tip as Compact<Balance>;
  }

  /**
   * @description The transaction fee metadata e.g tip, fee exchange
   */
  public get transactionPayment(): ChargeTransactionPayment {
    return this.get('transactionPayment') as ChargeTransactionPayment;
  }

  /** @internal */
  public static decodeExtrinsicSignature(
    value: ExtrinsicSignatureV2 | Uint8Array | undefined,
    isSigned = false
  ): ExtrinsicSignatureV2 | Uint8Array {
    if (!value) {
      return EMPTY_U8A;
    } else if (value instanceof ExtrinsicSignatureV2) {
      return value;
    }

    return isSigned ? value : EMPTY_U8A;
  }

  /**
   * @description Adds a raw signature
   */
  public addSignature(
    signer: Address | Uint8Array | string,
    signature: Uint8Array | string,
    payload: ExtrinsicPayloadValue | Uint8Array | string
  ): IExtrinsicSignature {
    return this._injectSignature(
      this.registry.createType('Address', signer),
      this.registry.createType('MultiSignature', signature),
      new ExtrinsicPayloadV2(this.registry, payload)
    );
  }

  /**
   * @description Creates a payload from the supplied options
   */
  public createPayload(
    method: Call,
    {
      blockHash,
      era,
      genesisHash,
      nonce,
      doughnut,
      runtimeVersion: {specVersion},
      tip,
      transactionPayment,
    }: SignatureOptions
  ): ExtrinsicPayloadV2 {
    return new ExtrinsicPayloadV2(this.registry, {
      blockHash,
      doughnut: doughnut || createType(this.registry, 'Option<Doughnut>'),
      era: era || IMMORTAL_ERA,
      genesisHash,
      method: method.toHex(),
      nonce,
      specVersion,
      tip: tip || 0,
      transactionPayment: transactionPayment || createType(this.registry, 'ChargeTransactionPayment'),
    });
  }

  /**
   * @description Generate a payload and applies the signature from a keypair
   */
  public sign(method: Call, account: IKeyringPair, options: SignatureOptions): IExtrinsicSignature {
    const address = account.publicKey.length > 32 ? blake2AsU8a(account.publicKey, 256) : account.publicKey;
    const signer = this.registry.createType('Address', address);
    const payload = this.createPayload(method, options);
    const signature = this.registry.createType('MultiSignature', payload.sign(account));

    return this._injectSignature(signer, signature, payload);
  }

  /**
   * @description Generate a payload and applies a fake signature
   */
  public signFake(
    method: Call,
    address: Address | Uint8Array | string,
    options: SignatureOptions
  ): IExtrinsicSignature {
    const signer = this.registry.createType('Address', address);
    const payload = this.createPayload(method, options);
    const signature = this.registry.createType(
      'MultiSignature',
      u8aConcat(new Uint8Array([1]), new Uint8Array(64).fill(0x42))
    );

    return this._injectSignature(signer, signature, payload);
  }

  /**
   * @description Encodes the value as a Uint8Array as per the SCALE specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  public toU8a(isBare?: boolean): Uint8Array {
    return this.isSigned ? super.toU8a(isBare) : EMPTY_U8A;
  }

  protected _injectSignature(
    signer: Address,
    signature: MultiSignature,
    {era, nonce, doughnut, transactionPayment}: ExtrinsicPayloadV2
  ): IExtrinsicSignature {
    this.set('doughnut', doughnut);
    this.set('era', era);
    this.set('nonce', nonce);
    this.set('signer', signer);
    this.set('signature', signature);
    this.set('transactionPayment', transactionPayment);

    return this;
  }
}
