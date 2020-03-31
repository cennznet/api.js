// Copyright 2019 Centrality Investments Limited
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

import {Enum, Option, Struct, Vec} from '@polkadot/types/codec';
import Option from '@polkadot/types/codec/Option';
import {InterfaceRegistry} from '@polkadot/types/interfaceRegistry';
import {bool, Bytes, Text, Type, u16, u8} from '@polkadot/types/primitive';
import {
  AnyNumber,
  AnyU8a,
  IExtrinsicEra,
  IExtrinsicImpl as IExtrinsicImplBase,
  IMethod,
  RuntimeVersionInterface,
  SignatureOptions as SignatureOptionsBase,
} from '@polkadot/types/types';
import Doughnut from '../Doughnut';
import {ChargeTransactionPayment, FeeExchange} from '../runtime/transaction-payment';

export interface ExtrinsicOptions {
  isSigned?: boolean;
}

export interface ExtrinsicSignatureOptions {
  isSigned?: boolean;
  doughnut?: Doughnut;
  transactionPayment?: ChargeTransactionPayment;
}

export interface ExtrinsicV2SignatureOptions {
  blockHash?: AnyU8a;
  era?: IExtrinsicEra;
  doughnut?: Option<Doughnut>;
  genesisHash?: AnyU8a;
  nonce?: AnyNumber;
  runtimeVersion?: RuntimeVersionInterface;
  tip?: AnyNumber;
  feeExchange?: any;
  transactionPayment?: ChargeTransactionPayment;
}

export interface ExtrinsicPayloadOptions {
  useDoughnut?: boolean;
  useFeeExchange?: boolean;
}

export interface ExtrinsicExtraValue {
  era?: Uint8Array;
  nonce?: AnyNumber;
  tip?: AnyNumber;
}

export interface ExtrinsicPayloadValue {
  blockHash: AnyU8a;
  era: AnyU8a | IExtrinsicEra;
  genesisHash: AnyU8a;
  method: AnyU8a | IMethod;
  nonce: AnyNumber;
  specVersion: AnyNumber;
  tip: AnyNumber;
  doughnut?: AnyU8a | Doughnut;
  transactionPayment?: AnyU8a | ChargeTransactionPayment;
}

export type DoughnutValue = AnyU8a;

export type ChargeTransactionValue = AnyU8a;

export type FeeExchangeValue = {
  assetId: AnyNumber;
  maxPayment: AnyNumber;
};

export interface IExtrinsicImpl extends IExtrinsicImplBase {
  addDoughnut(doughnut: DoughnutValue): IExtrinsicImpl;
  addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): IExtrinsicImpl;
}

export interface SignatureOptions extends SignatureOptionsBase {
  doughnut?: AnyU8a | Doughnut;
  transactionPayment?: AnyU8a | ChargeTransactionPayment;
}
const AllHashers = {
  Blake2_128: null, // eslint-disable-line @typescript-eslint/camelcase
  Blake2_256: null, // eslint-disable-line @typescript-eslint/camelcase
  Blake2_128Concat: null, // eslint-disable-line @typescript-eslint/camelcase
  Twox128: null,
  Twox256: null,
  Twox64Concat: null,
  // new in v11
  Identity: null,
};
/** @name ExtrinsicMetadataV11 */
export interface ExtrinsicMetadataV11 extends Struct {
  readonly version: u8;
  readonly signedExtensions: Vec<Text>;
}
/** @name MapTypeV11 */
export interface MapTypeV11 extends Struct {
  readonly hasher: StorageHasherV11;
  readonly key: Type;
  readonly value: Type;
  readonly linked: bool;
}
/** @name MetadataV11 */
export interface MetadataV11 extends Struct {
  readonly modules: Vec<ModuleMetadataV11>;
  readonly extrinsic: ExtrinsicMetadataV11;
}

/** @name DoubleMapTypeV11 */
export interface DoubleMapTypeV11 extends Struct {
  readonly hasher: StorageHasherV11;
  readonly key1: Type;
  readonly key2: Type;
  readonly value: Type;
  readonly key2Hasher: StorageHasherV11;
}

/** @name FunctionArgumentMetadataV0 */
export interface FunctionArgumentMetadataV11 extends Struct {
  readonly name: Text;
  readonly type: Type;
}

/** @name FunctionMetadataV1 */
export interface FunctionMetadataV11 extends Struct {
  readonly name: Text;
  readonly args: Vec<FunctionArgumentMetadataV11>;
  readonly documentation: Vec<Text>;
}

export interface ModuleMetadataV11 extends Struct {
  readonly name: Text;
  readonly storage: Option<StorageMetadataV11>;
  readonly calls: Option<Vec<FunctionMetadataV11>>;
  readonly events: Option<Vec<EventMetadataV11>>;
  readonly constants: Vec<ModuleConstantMetadataV11>;
  readonly errors: Vec<ErrorMetadataV11>;
}

/** @name ErrorMetadataV8 */
export interface ErrorMetadataV11 extends Struct {
  readonly name: Text;
  readonly documentation: Vec<Text>;
}

/** @name ModuleConstantMetadataV6 */
export interface ModuleConstantMetadataV11 extends Struct {
  readonly name: Text;
  readonly type: Type;
  readonly value: Bytes;
  readonly documentation: Vec<Text>;
}

/** @name EventMetadataV0 */
export interface EventMetadataV11 extends Struct {
  readonly name: Text;
  readonly args: Vec<Type>;
  readonly documentation: Vec<Text>;
}

/** @name StorageEntryMetadataV11 */
export interface StorageEntryMetadataV11 extends Struct {
  readonly name: Text;
  readonly modifier: StorageEntryModifierV11;
  readonly type: StorageEntryTypeV11;
  readonly fallback: Bytes;
  readonly documentation: Vec<Text>;
}

/** @name StorageEntryModifierV11 */
export interface StorageEntryModifierV11 extends Enum {
  readonly isOptional: boolean;
  readonly isDefault: boolean;
  readonly isRequired: boolean;
}
/** @name PlainTypeV11 */
export interface PlainTypeV11 extends Type {}

/** @name StorageEntryTypeV11 */
export interface StorageEntryTypeV11 extends Enum {
  readonly isPlain: boolean;
  readonly asPlain: PlainTypeV11;
  readonly isMap: boolean;
  readonly asMap: MapTypeV11;
  readonly isDoubleMap: boolean;
  readonly asDoubleMap: DoubleMapTypeV11;
}
/** @name StorageHasherV11 */
export interface StorageHasherV11 extends Enum {
  readonly isBlake2128: boolean;
  readonly isBlake2256: boolean;
  readonly isBlake2128Concat: boolean;
  readonly isTwox128: boolean;
  readonly isTwox256: boolean;
  readonly isTwox64Concat: boolean;
  readonly isIdentity: boolean;
}

/** @name StorageMetadataV11 */
export interface StorageMetadataV11 extends Struct {
  readonly prefix: Text;
  readonly items: Vec<StorageEntryMetadataV11>;
}

export type CennznetInterfaceTypes = keyof InterfaceRegistry;

// Merge the [[InterfaceRegistry]] definition from `@polkadot/types/interfaceRegistry` with cennznet types
declare module '@polkadot/types/interfaceRegistry' {
  interface InterfaceRegistry {
    // Add types that only cennznet knows about.
    // TS will merge them into the polkadot provided [[InterfaceRegistry]]
    Doughnut: Doughnut;
    'Option<Doughnut>': Option<Doughnut>;
    ChargeTransactionPayment;
    FeeExchange: FeeExchange;
    'Option<FeeExchange>': Option<FeeExchange>;
    // v11
    StorageHasherV11: StorageHasherV11;
    DoubleMapTypeV11: DoubleMapTypeV11;
    ExtrinsicMetadataV11: ExtrinsicMetadataV11;
    // FunctionArgumentMetadataV11: 'FunctionArgumentMetadataV10';
    // FunctionMetadataV11: 'FunctionMetadataV10';
    MapTypeV11: MapTypeV11;
    MetadataV11: MetadataV11;
    ModuleMetadataV11: ModuleMetadataV11;
    StorageEntryMetadataV11: StorageEntryMetadataV11;
    StorageEntryTypeV11: {
      _enum: {
        Plain: 'PlainTypeV11';
        Map: 'MapTypeV11';
        DoubleMap: 'DoubleMapTypeV11';
      };
    };
    StorageMetadataV11: StorageMetadataV11;
  }
}
