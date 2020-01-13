// Copyright 2019 Centrality Investments Limited & @polkadot/types authors & contributors
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
import {Compact, createType, Struct} from '@polkadot/types';
import {Address, Balance, Call, ExtrinsicEra, Index, Signature} from '@polkadot/types/interfaces/runtime';
import {IExtrinsicSignature, IKeyringPair} from '@polkadot/types/types';

import Option from '@polkadot/types/codec/Option';
import {ExtrinsicSignatureOptions} from '@polkadot/types/primitive/Extrinsic/types';
import Doughnut from '../../Doughnut';
import {ChargeTransactionPayment} from '../../runtime/transaction-payment';
import {EMPTY_U8A, IMMORTAL_ERA} from '../constants';
import {ExtrinsicV2SignatureOptions} from '../types';
import ExtrinsicPayloadV2, {ExtrinsicPayloadValueV2} from './ExtrinsicPayload';

/**
 * @name ExtrinsicSignature
 * @description
 * A container for the [[Signature]] associated with a specific [[Extrinsic]]
 */

export default class ExtrinsicSignatureV2 extends Struct implements IExtrinsicSignature {
  constructor(value?: ExtrinsicSignatureV2 | Uint8Array | undefined, {isSigned}: ExtrinsicSignatureOptions = {}) {
    super(
      {
        signer: 'Address',
        signature: 'Signature',
        doughnut: 'Option<Doughnut>',
        era: 'ExtrinsicEra',
        nonce: 'Compact<Index>',
        tip: 'Compact<Balance>',
        transactionPayment: 'ChargeTransactionPayment',
      },
      ExtrinsicSignatureV2.decodeExtrinsicSignature(value, isSigned)
    );
  }

  static decodeExtrinsicSignature(
    value: ExtrinsicSignatureV2 | Uint8Array | undefined,
    isSigned: boolean = false
  ): ExtrinsicSignatureV2 | Uint8Array {
    if (!value) {
      return EMPTY_U8A;
    } else if (value instanceof ExtrinsicSignatureV2) {
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
  get doughnut(): Option<Doughnut> {
    return this.get('doughnut') as Option<Doughnut>;
  }

  /**
   * @description The actuall [[Signature]] hash
   */
  //  get signature(): EcdsaSignature | Ed25519Signature | Sr25519Signature {
  get signature(): Signature {
    return this.get('signature') as Signature;
  }

  /**
   * @description The [[Address]] that signed
   */
  get signer(): Address {
    return this.get('signer') as Address;
  }

  /**
   * @description Forwards compat
   */
  get tip(): Compact<Balance> {
    return this.transactionPayment.get('tip') as Compact<Balance>;
  }

  /**
   * @description transaction fee payment metadata
   */
  get transactionPayment(): ChargeTransactionPayment {
    return this.get('transactionPayment') as ChargeTransactionPayment;
  }

  private injectSignature(
    signer: Address,
    signature: Signature,
    {doughnut, era, nonce, transactionPayment}: ExtrinsicPayloadV2
  ): IExtrinsicSignature {
    this.set('doughnut', doughnut);
    this.set('era', era);
    this.set('nonce', nonce);
    this.set('signer', signer);
    this.set('signature', signature);
    this.set('tip', transactionPayment.tip);
    this.set('transactionPayment', transactionPayment);

    return this;
  }

  /**
   * @description Adds a raw signature
   */
  addSignature(
    signer: Address | Uint8Array | string,
    signature: Uint8Array | string,
    payload: ExtrinsicPayloadValueV2 | Uint8Array | string
  ): IExtrinsicSignature {
    return this.injectSignature(
      createType('Address', signer),
      createType('Signature', signature),
      new ExtrinsicPayloadV2(payload)
    );
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
      runtimeVersion: {specVersion},
      tip,
      transactionPayment,
    }: ExtrinsicV2SignatureOptions
  ): IExtrinsicSignature {
    const signer = createType('Address', account.publicKey);
    const payloadValue: ExtrinsicPayloadValueV2 = {
      blockHash,
      doughnut: doughnut || createType('Option<Doughnut>'),
      era: era || IMMORTAL_ERA,
      genesisHash,
      method: method.toHex(),
      nonce,
      tip: tip || 0,
      transactionPayment: transactionPayment || createType('ChargeTransactionPayment'),
      specVersion,
    };
    const payload = new ExtrinsicPayloadV2(payloadValue);
    const signature = createType('Signature', payload.sign(account));
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
