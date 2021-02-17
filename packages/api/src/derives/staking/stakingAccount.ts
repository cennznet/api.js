import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { memo } from '@polkadot/api-derive/util';
import {
  createType,
  AccountId,
  Exposure,
  Keys,
  Nominations,
  Option,
  RewardDestination,
  StakingLedger,
  ValidatorPrefs,
} from '@cennznet/types';
import { DerivedStakingInfo } from '../types';

type MultiResultV2 = [
  Option<AccountId>,
  Option<Nominations>,
  RewardDestination,
  Exposure,
  [ValidatorPrefs],
  Option<Keys>,
  Option<StakingLedger>
];

function retrieveStakingAccountDetails(api: ApiInterfaceRx, stashId: AccountId): Observable<MultiResultV2> {
  return api.queryMulti([
    [api.query.staking.bonded, stashId],
    [api.query.staking.nominators, stashId],
    [api.query.rewards.payee, stashId],
    [api.query.staking.stakers, stashId],
    [api.query.staking.validators, stashId],
  ]) as Observable<MultiResultV2>;
}

/**
 * @description From a stash, retrieve the controller account ID and all relevant details
 */
export function queryStakingAccountInfo(
  instanceId: string,
  api: ApiInterfaceRx
): (accountId: Uint8Array | string) => Observable<DerivedStakingInfo> {
  return memo(
    instanceId,
    (accountId: Uint8Array | string): Observable<DerivedStakingInfo> => {
      const stashId = createType(api.registry, 'AccountId', accountId);

      return retrieveStakingAccountDetails(api, stashId).pipe(
        switchMap(
          ([controllerIdOpt, nominatorsOpt, rewardDestination, stakers, [validatorPrefs]]): Observable<
            DerivedStakingInfo
          > => {
            const controllerId = controllerIdOpt.unwrapOr(null);

            return controllerId
              ? api.query.staking.ledger(controllerId).pipe(
                  map(
                    (stakingLedgerOpt): DerivedStakingInfo => ({
                      accountId: stashId,
                      controllerId,
                      nominators: nominatorsOpt.unwrapOr({ targets: [] }).targets,
                      rewardDestination,
                      stakers,
                      stakingLedger: stakingLedgerOpt.unwrapOr(undefined),
                      stashId,
                      validatorPrefs,
                    })
                  )
                )
              : of({ accountId: stashId });
          }
        )
      );
    }
  );
}
