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

import {Option, Vec} from '@polkadot/types/codec';
import {InterfaceRegistry} from '@polkadot/types/interfaceRegistry';
import {
  AnyNumber,
  AnyU8a,
  IExtrinsicEra,
  IExtrinsicImpl as IExtrinsicImplBase,
  IMethod,
  ITuple,
  RuntimeVersionInterface,
  SignatureOptions as SignatureOptionsBase,
} from '@polkadot/types/types';
import Doughnut from '../Doughnut';
import {AssetId, AssetInfo} from '../runtime/ga';
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

export type ChargeTransactionValue = AnyU8a;

export type FeeExchangeValue = {
  assetId: AnyNumber;
  maxPayment: AnyNumber;
};

export interface SignatureOptions extends SignatureOptionsBase {
  doughnut?: AnyU8a | Doughnut;
  transactionPayment?: AnyU8a | ChargeTransactionPayment;
}

export type CennznetInterfaceTypes = keyof InterfaceRegistry;

// Merge the [[InterfaceRegistry]] definition from `@polkadot/types/interfaceRegistry` with CENNZnet types
declare module '@polkadot/types/interfaceRegistry' {
  interface InterfaceRegistry {
    // Add types that only CENNZnet knows about.
    // TS will merge them into the polkadot provided [[InterfaceRegistry]]
    Doughnut: Doughnut;
    'Option<Doughnut>': Option<Doughnut>;
    ChargeTransactionPayment;
    FeeExchange: FeeExchange;
    'Option<FeeExchange>': Option<FeeExchange>;
    'Vec<(AssetId, AssetInfo)>': Vec<ITuple<[AssetId, AssetInfo]>>;
  }
}
