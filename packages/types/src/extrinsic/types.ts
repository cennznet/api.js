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

import {Enum, u32} from '@polkadot/types';
import Compact from '@polkadot/types/codec/Compact';
import Option from '@polkadot/types/codec/Option';
import {InterfaceRegistry} from '@polkadot/types/interfaceRegistry';
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

import {Balance, BalanceOf} from '@polkadot/types/interfaces';
import '../Option';

export type FeeExchangeV1 = {
  assetId: u32;
  maxPayment: Balance;
};

export type FeeExchange = Enum;

export interface ChargeTransactionPayment {
  tip: Compact<BalanceOf>;
  feeExchange: Option<FeeExchange>;
}

export interface ExtrinsicOptions {
  isSigned?: boolean;
  useDoughnut?: boolean;
  useFeeExchange?: boolean;
}

export interface ExtrinsicSignatureOptions {
  isSigned?: boolean;
  doughnut?: Doughnut;
  feeExchange?: any;
}

export interface ExtrinsicV2SignatureOptions {
  blockHash?: AnyU8a;
  era?: IExtrinsicEra;
  doughnut?: Option<Doughnut>;
  genesisHash?: AnyU8a;
  nonce?: AnyNumber;
  runtimeVersion?: RuntimeVersionInterface;
  tip?: AnyNumber;
  transactionPayment?: ChargeTransactionPayment;
}

// export interface ExtrinsicPayloadOptions {
//   useDoughnut?: boolean;
//   useFeeExchange?: boolean;
// }

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
  feeExchange?: FeeExchangeValue;
}

export type DoughnutValue = AnyU8a;

export type FeeExchangeValue = {
  assetId: AnyNumber;
  maxPayment: AnyNumber;
};

export interface IExtrinsicImpl extends IExtrinsicImplBase {
  addDoughnut(doughnut: DoughnutValue): IExtrinsicImpl;
  addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): IExtrinsicImpl;
}

// export interface SignatureOptions extends SignatureOptionsBase {
//   doughnut?: AnyU8a | Doughnut;
//   feeExchange?: FeeExchangeValue;
// }

export interface SignatureOptions extends SignatureOptionsBase {
  transactionPayment?: ChargeTransactionPayment;
}

export type CennznetInterfaceTypes = keyof InterfaceRegistry;
