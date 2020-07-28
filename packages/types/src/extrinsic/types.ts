// Copyright 2017-2020 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {Option, Vec} from '@polkadot/types/codec';

import {AnyNumber, AnyU8a, InterfaceTypes, ITuple,} from '../types';

import Doughnut from '../Doughnut';
import {AssetId, AssetInfo} from '../runtime/ga';
import {ChargeTransactionPayment, FeeExchange} from '../runtime/transaction-payment';

export interface ExtrinsicOptions {
  isSigned: boolean;
  useDoughnut: boolean;
  useFeeExchange: boolean;
}

export interface ExtrinsicPayloadOptions {
  version: number;
}

export interface ExtrinsicSignatureOptions {
  isSigned?: boolean;
}

export interface ExtrinsicExtraValue {
  era?: Uint8Array;
  nonce?: AnyNumber;
  tip?: AnyNumber;
}

export type DoughnutValue = AnyU8a;

export type ChargeTransactionValue = AnyU8a;

export type FeeExchangeValue = {
  assetId: AnyNumber;
  maxPayment: AnyNumber;
};

export type CennznetInterfaceTypes = keyof InterfaceTypes;

// Merge the [[InterfaceRegistry]] definition from `@polkadot/types/interfaceRegistry` with cennznet types
declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    // Add types that only cennznet knows about.
    // TS will merge them into the polkadot provided [[InterfaceRegistry]]
    Doughnut: Doughnut;
    'Option<Doughnut>': Option<Doughnut>;
    ChargeTransactionPayment: ChargeTransactionPayment;
    FeeExchange: FeeExchange;
    'Option<FeeExchange>': Option<FeeExchange>;
    'Vec<(AssetId, AssetInfo)>': Vec<ITuple<[AssetId, AssetInfo]>>;
  }
}
