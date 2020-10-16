import { ApiInterfaceRx } from '@cennznet/api/types';
import { memo } from '@polkadot/api-derive/util';
import { createType, ITuple, Option, Vec } from '@cennznet/types/interfaces';
import { AccountId, Keys } from '@polkadot/types/interfaces';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DerivedSessionKeyInfo } from '../types';

function unwrapSessionIds(
  stashId: AccountId,
  queuedKeys: [AccountId, Keys][],
  nextKeys: Option<Keys>
): { nextSessionKeys: AccountId[]; sessionKeys: AccountId[] } {
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

function retrieveSessionDetails(
  api: ApiInterfaceRx,
  stashId: AccountId
): Observable<[Vec<ITuple<[AccountId, Keys]>>, Option<Keys>]> {
  return combineLatest([
    api.query.session.queuedKeys<Vec<ITuple<[AccountId, Keys]>>>(),
    api.query.session.nextKeys(stashId),
  ]) as Observable<[Vec<ITuple<[AccountId, Keys]>>, Option<Keys>]>;
}

/**
 * @description From a stash and sessions nextKeys, filter session and next session details
 */
export function queryKeyInfo(
  instanceId: string,
  api: ApiInterfaceRx
): (accountId: Uint8Array) => Observable<DerivedSessionKeyInfo> {
  return memo(
    instanceId,
    (accountId: Uint8Array | string): Observable<DerivedSessionKeyInfo> => {
      const stashId = createType(api.registry, 'AccountId', accountId);
      return retrieveSessionDetails(api, stashId).pipe(
        switchMap(
          ([queuedKeys, nextKeys]): Observable<DerivedSessionKeyInfo> => {
            return of(unwrapSessionIds(stashId, queuedKeys, nextKeys));
          }
        )
      );
    }
  );
}
