import {
  AccountId,
  EraIndex,
  Exposure,
  Keys,
  StakingLedger,
  ValidatorPrefs,
  RewardDestination,
  Index,
  Codec,
} from '@cennznet/types';
import { ApiTypes, SubmittableExtrinsic } from '@cennznet/api/types';
import CENNZnetExtrinsic from '@cennznet/types/interfaces/extrinsic/v1/Extrinsic';

export interface DerivedStakingInfo {
  accountId: AccountId;
  controllerId?: AccountId;
  nominators?: AccountId[];
  nominateAt?: EraIndex;
  rewardDestination?: RewardDestination;
  nextKeys?: Keys;
  stakers?: Exposure;
  stashId?: AccountId;
  validatorPrefs?: ValidatorPrefs;
  stakingLedger?: StakingLedger;
}

export interface DerivedSessionKeyInfo {
  nextSessionKeys: AccountId[];
  sessionKeys: AccountId[];
}

export interface EstimateFeeParams extends Codec {
  extrinsic: SubmittableExtrinsic<ApiTypes> | CENNZnetExtrinsic;
  userFeeAssetId: string | number;
  maxPayment?: string;
}

export interface DeriveBalancesAccount {
  accountId: AccountId;
  accountNonce: Index;
}

export interface PaymentOptions {
  feeAssetId: number | string;
  slippage?: number;
  tip?: number;
}
