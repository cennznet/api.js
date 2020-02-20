import {AccountId, Address} from '@polkadot/types/interfaces';
import {AnyNumber} from '@polkadot/types/types';
import BN from 'bn.js';
export * from '@polkadot/types/types';

export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;

export type AnyAssetId = AnyNumber;

export {
  ExtrinsicExtraValue,
  ExtrinsicOptions,
  ExtrinsicPayloadOptions,
  ExtrinsicPayloadValue,
  ExtrinsicSignatureOptions,
  DoughnutValue,
  IExtrinsicImpl,
  SignatureOptions,
} from './extrinsic/types';
