// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */
import { AccountId, Address } from '@polkadot/types/interfaces';
import { AnyNumber } from '@polkadot/types/types';
import BN from 'bn.js';

export * from '@polkadot/types/types';

export * from './attestation/types';
export * from './cennzx/types';
export * from './ga/types';
export * from './staking/types';
export * from './sylo/types';
export * from './system/types';
export * from './transactionPayment/types';
export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;
export type AnyAssetId = AnyNumber;
export declare type AnyFunction = (...args: any[]) => any;
