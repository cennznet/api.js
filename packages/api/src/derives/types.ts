import { RewardDestination } from '@cennznet/types';
import { AccountId, EraIndex, Exposure, Keys, StakingLedger, ValidatorPrefs } from '@cennznet/types/interfaces';

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
