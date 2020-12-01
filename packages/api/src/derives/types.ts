import {
  AccountId,
  EraIndex,
  Exposure,
  Keys,
  StakingLedger,
  ValidatorPrefs,
  RewardDestination,
  Index,
  Balance,
} from '@cennznet/types';
import { ApiTypes, SubmittableExtrinsic } from '@cennznet/api/types';

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

export interface EstimateFeeParams {
  extrinsic: SubmittableExtrinsic<ApiTypes>;
  userFeeAssetId: string | number;
  maxPayment?: string;
}

export interface DeriveBalancesAccount {
  accountId: AccountId;
  accountNonce: Index;
}
