// Copyright 2019-2021 Centrality Investments Limited
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

import type { Observable } from 'rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';

import { map, switchMap } from 'rxjs/operators';

import { memo } from '@polkadot/api-derive/util';
import { combineLatest } from 'rxjs';
import { DeriveTokenInfo } from '@cennznet/api/derives/nft/types';
/**
 * @description Retrieve the list of all tokens in a collection
 */
export function tokenInfoForCollection(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveTokenInfo[]> {
  return memo(
    instanceId,
    (collectionId: string): Observable<DeriveTokenInfo[]> =>
      combineLatest([
        api.query.nft.tokenAttributes.entries(collectionId),
        api.query.nft.tokenAttributes.keys(collectionId),
      ]).pipe(
        switchMap(([entries, keys]) => {
          return api.query.nft.tokenOwner.multi(keys.map((key) => [collectionId, key.args[1]])).pipe(
            map((allOwners) => {
              const tokenInfo = entries.map((detail, idx) => {
                const tokenId = api.registry.createType('TokenId', keys[idx].args[1]);
                const owner = api.registry.createType('AccountId', allOwners[idx]);
                return { tokenId, tokenDetails: detail[1], owner };
              });
              return tokenInfo;
            })
          );
        })
      )
  );
}
