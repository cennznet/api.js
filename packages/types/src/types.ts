import {AccountId, Address} from '@plugnet/types/interfaces';
import {AnyNumber} from '@plugnet/types/types';
import BN from 'bn.js';

export * from '@plugnet/types/types';

export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;

export type AnyAssetId = AnyNumber;

export {
    ExtrinsicExtraValue,
    ExtrinsicOptions,
    ExtrinsicPayloadOptions,
    ExtrinsicPayloadValue,
    ExtrinsicSignatureOptions,
    DoughnutValue,
    FeeExchangeValue,
    IExtrinsicImpl,
    SignatureOptions,
} from './extrinsic/types';
