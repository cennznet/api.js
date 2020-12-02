// Copyright 2020 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// Adding this file to support extrinsic via rv36
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Observable, of, combineLatest } from 'rxjs';
import { DeriveBalancesAccount } from '@cennznet/api/derives/types';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '@polkadot/api-derive/util';
import { AccountId, Index } from '@cennznet/types';
import { AccountData, AccountInfo } from '@polkadot/types/interfaces';
import { ITuple } from '@polkadot/types/types';
import { isFunction } from '@polkadot/util';

function calcBalances(api: ApiInterfaceRx, [accountId, accountNonce]: [AccountId, Index]): DeriveBalancesAccount {
  return {
    accountId,
    accountNonce,
  };
}
// With runtime version <= 36, the way nonce is queried is as follows
function queryOldNonce(api: ApiInterfaceRx, accountId: AccountId): Observable<Index> {
  return api.query.system.accountNonce<Index>(accountId).pipe(map((accountNonce): Index => accountNonce));
}

function queryCurrentNonce(api: ApiInterfaceRx, accountId: AccountId): Observable<Index> {
  return api.rpc.system.accountNextIndex<Index>(accountId).pipe(map((accountNonce): Index => accountNonce));
}

export function account(
  instanceId: string,
  api: ApiInterfaceRx
): (address: AccountId | string) => Observable<DeriveBalancesAccount> {
  return memo(
    instanceId,
    (address: AccountId | string): Observable<DeriveBalancesAccount> =>
      api.derive.accounts.accountId(address).pipe(
        switchMap(
          (accountId): Observable<[AccountId, Index]> =>
            accountId
              ? combineLatest([
                  of(accountId),
                  isFunction(api.query.system.account)
                    ? (queryCurrentNonce(api, accountId) as Observable<Index>)
                    : (queryOldNonce(api, accountId) as Observable<Index>),
                ])
              : of([api.registry.createType('AccountId'), api.registry.createType('Index')])
        ),
        map((result): DeriveBalancesAccount => calcBalances(api, result))
      )
  );
}
