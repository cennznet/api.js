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

import {ClassOf, createType, Struct, TypeRegistry} from '@polkadot/types';
import {Address, Call} from '@polkadot/types/interfaces/runtime';
import {IExtrinsicImpl, IKeyringPair, Registry, SignatureOptions} from '@polkadot/types/types';
import {isU8a, u8aConcat} from '@polkadot/util';

import {ExtrinsicOptions} from '../types';
import {ExtrinsicPayloadValueV2} from './ExtrinsicPayload';
import ExtrinsicSignatureV2 from './ExtrinsicSignature';

export interface ExtrinsicValueV2 {
  signature?: ExtrinsicSignatureV2;
  method?: Call;
}

const TRANSACTION_VERSION = 4;

/**
 * @name ExtrinsicV2
 * @description
 * The second generation of compact extrinsics
 */
export default class ExtrinsicV2 extends Struct implements IExtrinsicImpl {
  constructor(
    registry: Registry,
    value?: Uint8Array | ExtrinsicValueV2 | Call,
    {isSigned}: Partial<ExtrinsicOptions> = {}
  ) {
    super(
      registry,
      {
        signature: ExtrinsicSignatureV2,
        method: 'Call',
      },
      ExtrinsicV2.decodeExtrinsic(registry, value, isSigned)
    );
  }

  static decodeExtrinsic(
    registry: Registry,
    value?: Call | Uint8Array | ExtrinsicValueV2,
    isSigned: boolean = false
  ): ExtrinsicValueV2 {
    // const registry = new TypeRegistry();
    if (!value) {
      return {};
    } else if (value instanceof ExtrinsicV2) {
      return value;
    } else if (value instanceof ClassOf(registry, 'Call')) {
      return {method: value as Call};
    } else if (isU8a(value)) {
      // here we decode manually since we need to pull through the version information
      // let v = value;
      const signature = new ExtrinsicSignatureV2(registry, value, {isSigned});
      // v = v.subarray(signature.encodedLength);
      // const method = createType(registry, 'Call', v);

      // here we decode manually since we need to pull through the version information
      // const signature = createType(registry, 'ExtrinsicSignatureV2', value, { isSigned });
      const method = createType(registry, 'Call', value.subarray(signature.encodedLength));

      return {
        method,
        signature,
      };
    }

    return value as ExtrinsicValueV2 | {};
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  get encodedLength(): number {
    return this.toU8a().length;
  }

  /**
   * @description The [[Call]] this extrinsic wraps
   */
  get method(): Call {
    return this.get('method') as Call;
  }

  /**
   * @description The [[ExtrinsicSignatureV2]]
   */
  get signature(): ExtrinsicSignatureV2 {
    return this.get('signature') as ExtrinsicSignatureV2;
  }

  /**
   * @description The version for the signature
   */
  get version(): number {
    return TRANSACTION_VERSION;
  }

  /**
   * @description Add an [[ExtrinsicSignatureV2]] to the extrinsic (already generated)
   */
  addSignature(
    signer: Address | Uint8Array | string,
    signature: Uint8Array | string,
    payload: ExtrinsicPayloadValueV2 | Uint8Array | string
  ): ExtrinsicV2 {
    this.signature.addSignature(signer, signature, payload);

    return this;
  }

  /**
   * @describe Adds a fake signature to the extrinsic
   */
  signFake(signer: Address | Uint8Array | string, options: SignatureOptions): ExtrinsicV2 {
    this.signature.signFake(this.method, signer, options);

    return this;
  }
  /**
   * @description Sign the extrinsic with a specific keypair
   */
  sign(account: IKeyringPair, options: SignatureOptions): ExtrinsicV2 {
    this.signature.sign(this.method, account, options);

    return this;
  }
}
