// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import {Api as ApiPromise, ApiRx} from "@cennznet/api";
import {ApiTypes} from "@cennznet/api/types";
import {SubmittableExtrinsic as SubmittableExtrinsicBase} from "@polkadot/api/submittable/types";

export * from './attestation/types';
export * from './cennzx/types';
export * from './genericAsset/types';
export * from './grandpa/types';
export * from './nft/types';
export * from './staking/types';
export * from './sylo/types';
export * from './system/types';
export * from './transactionPayment/types';
export * from './governance/types';
export * from './ethBridge/types';
export * from './ethy/types';
export interface SubmittableExtrinsic<ApiType extends ApiTypes> extends SubmittableExtrinsicBase<ApiType> {
  setPaymentOpts(api: ApiPromise | ApiRx, FeeOpts);
}
