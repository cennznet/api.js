import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ApiInterfaceRx} from '@cennznet/api/types';
import {RewardDestination} from '@cennznet/types';
import {memo} from '@polkadot/api-derive/util';
import {createType, Option} from '@polkadot/types';
import {
  AccountId,
  EraIndex,
  Exposure,
  Keys,
  Nominations,
  StakingLedger,
  ValidatorPrefs,
} from '@polkadot/types/interfaces';

type MultiResultV2 = [
  Option<AccountId>,
  Option<Nominations>,
  RewardDestination,
  Exposure,
  [ValidatorPrefs],
  Option<Keys>,
  Option<StakingLedger>
];

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

function retrieveStakingAccountDetails(api: ApiInterfaceRx, stashId: AccountId): Observable<MultiResultV2> {
  return api.queryMulti([
    [api.query.staking.bonded, stashId],
    [api.query.staking.nominators, stashId],
    [api.query.staking.payee, stashId],
    [api.query.staking.stakers, stashId],
    [api.query.staking.validators, stashId],
  ]) as Observable<MultiResultV2>;
}

/**
 * @description From a stash, retrieve the controller account ID and all relevant details
 */
export function queryStakingAccountInfo(
  api: ApiInterfaceRx
): (accountId: Uint8Array | string) => Observable<DerivedStakingInfo> {
  return memo(
    (accountId: Uint8Array | string): Observable<DerivedStakingInfo> => {
      const stashId = createType(api.registry, 'AccountId', accountId);

      return retrieveStakingAccountDetails(api, stashId).pipe(
        switchMap(
          ([controllerIdOpt, nominatorsOpt, rewardDestination, stakers, [validatorPrefs], nextKeys]): Observable<
            DerivedStakingInfo
          > => {
            const controllerId = controllerIdOpt.unwrapOr(null);

            return controllerId
              ? api.query.staking.ledger(controllerId).pipe(
                  map(
                    (stakingLedgerOpt): DerivedStakingInfo => ({
                      accountId: stashId,
                      controllerId,
                      nominators: nominatorsOpt.unwrapOr({targets: []}).targets,
                      rewardDestination,
                      stakers,
                      stakingLedger: stakingLedgerOpt.unwrapOr(undefined),
                      stashId,
                      validatorPrefs,
                    })
                  )
                )
              : of({accountId: stashId});
          }
        )
      );
    }
  );
}
