import {AnyNumber, AnyU8a, IExtrinsicEra, IExtrinsicImpl as IExtrinsicImplBase, IMethod} from '@plugnet/types/types';
import Doughnut from './v1/Doughnut';
import FeeExchange from './v1/FeeExchange';

// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface ExtrinsicOptions {
    isSigned?: boolean;
    useDoughnut?: boolean;
    useFeeExchange?: boolean;
}

export interface ExtrinsicSignatureOptions {
    isSigned?: boolean;
    doughnut?: Doughnut;
    feeExchange?: FeeExchange;
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
    feeExchange?: FeeExchangeValue | FeeExchange;
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
