import {Api as ApiPromise, ApiRx} from "@cennznet/api";
import {ApiTypes} from "@cennznet/api/types";
import {AssetId} from "@cennznet/types/types";
import {SubmittableExtrinsic as SubmittableExtrinsicBase} from "@polkadot/api/submittable/types";

export * from '@polkadot/types';
export * from './interfaces/types';
export * from './types';
export interface SubmittableExtrinsic<ApiType extends ApiTypes> extends SubmittableExtrinsicBase<ApiType> {
  setPaymentOpts(api: ApiPromise | ApiRx, FeeOpts: { feeAssetId: AssetId; slippage: number; tip?: number; });
}
