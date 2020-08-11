import {ApiInterfaceRx} from '@cennznet/api/types';
import {memo} from '@polkadot/api-derive/util';
import {createType, Option, Vec} from '@polkadot/types';
import {
  AccountId,
  EraIndex,
  Exposure,
  Keys,
  Nominations,
  RewardDestination,
  StakingLedger,
  ValidatorPrefs,
} from '@polkadot/types/interfaces';
import {ITuple} from '@polkadot/types/types';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

type MultiResultV2 = [
  Option<AccountId>,
  Option<Nominations>,
  RewardDestination,
  Exposure,
  [ValidatorPrefs],
  Option<Keys>,
  Option<StakingLedger>
];

interface DerivedStakingInfo {
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
  nextSessionKeys?: Option<Keys>;
}

export interface DerivedSessionKeyInfo {
  nextSessionKeys: AccountId[];
  sessionKeys: AccountId[];
}

function unwrapSessionIds(
  stashId: AccountId,
  queuedKeys: [AccountId, Keys][],
  nextKeys: Option<Keys>
): {nextSessionKeys: AccountId[]; sessionKeys: AccountId[]} {
  let sessionKeys: AccountId[] = [];
  const idKeys = queuedKeys.find(([currentId]): boolean => currentId.eq(stashId));
  if (idKeys) {
    sessionKeys = idKeys[1];
  }
  const nextSessionKeys = nextKeys.unwrapOr([] as AccountId[]);

  return {
    nextSessionKeys,
    sessionKeys,
  };
}

function retrieveStakingAccountDetails(api: ApiInterfaceRx, stashId: AccountId): Observable<MultiResultV2> {
  return api.queryMulti([
    [api.query.staking.bonded, stashId],
    [api.query.staking.nominators, stashId],
    [api.query.staking.payee, stashId],
    [api.query.staking.stakers, stashId],
    [api.query.staking.validators, stashId],
    [api.query.session.nextKeys, stashId],
  ]) as Observable<MultiResultV2>;
}

function retrieveSessionDetails(api: ApiInterfaceRx): Observable<Vec<ITuple<[AccountId, Keys]>>> {
  return api.query.session.queuedKeys<Vec<ITuple<[AccountId, Keys]>>>();
}

/**
 * @description From a stash, retrieve the controller account ID and all relevant details
 */
export function queryStakingAccountDetails(
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
                      nextSessionKeys: nextKeys,
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

/**
 * @description From a stash and sessions nextKeys, filter session and next session details
 */
export function querySession(
  api: ApiInterfaceRx
): (accountId: Uint8Array | string, nextKeys) => Observable<DerivedSessionKeyInfo> {
  return memo(
    (accountId: Uint8Array | string, nextKeys): Observable<DerivedSessionKeyInfo> => {
      const stashId = createType(api.registry, 'AccountId', accountId);
      return retrieveSessionDetails(api).pipe(
        switchMap(
          (queuedKeys): Observable<DerivedSessionKeyInfo> => {
            return of(unwrapSessionIds(stashId, queuedKeys, nextKeys));
          }
        )
      );
    }
  );
}
