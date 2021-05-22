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

import { catchError, map, switchMap } from 'rxjs/operators';

import { memo } from '@polkadot/api-derive/util';
import { combineLatest, EMPTY } from 'rxjs';
import { DeriveTokenInfo } from '@cennznet/api/derives/nft/types';
import { flatMap, uniq } from 'lodash';
import { u32 } from '@polkadot/types';
import { SerialNumber } from '@cennznet/types';
import {EnhancedTokenId} from "@cennznet/types/interfaces/nft/enhanced-token-id";
/**
 * @description Retrieve the list of all tokens in a collection
 */
export function tokenInfoForCollection(instanceId: string, api: ApiInterfaceRx): () => Observable<any> {
  return memo(
    instanceId,
    (collectionId: string): Observable<any> =>
      combineLatest([
        api.query.nft.seriesAttributes.entries(collectionId),
        api.query.nft.seriesAttributes.keys(collectionId),
      ]).pipe(
        switchMap(([entries, tokenIds]) => {
          const tokenAttributeMap = entries.map((detail, idx) => {
            const tokenId = tokenIds[idx].args[1];
            return { tokenId: tokenId, tokenAttribute: detail };
          });
          return api.query.nft.nextSerialNumber.multi(tokenIds.map((token) => [collectionId, token.args[1]])).pipe(
            switchMap((nextSerialNumber: SerialNumber[]) => {
              const queryArgs = tokenIds.map((token, idx) => {
                const nextSerial = nextSerialNumber[idx];
                const queryArgsList = [];
                for (let i = 0; i <= nextSerial.toNumber() - 1; i++) {
                  queryArgsList.push([{ tokenId: token.args[1], serialId: i }]);
                }
                return queryArgsList;
              });
              const args: { tokenId: u32; serialId: number }[] = queryArgs.flat().flat();
              return api.query.nft.tokenOwner
                .multi(args.map((arg) => [[collectionId, arg.tokenId.toNumber()], arg.serialId]))
                .pipe(
                  map((allOwners) => {
                    return args.map(({ tokenId, serialId }, idx) => {
                      const attribute = tokenAttributeMap.find((token) => token.tokenId === tokenId);
                      return {
                        tokenId: new EnhancedTokenId(api.registry, [collectionId, tokenId, serialId]),
                        tokenDetails: attribute.tokenAttribute[1],
                        owner: allOwners[idx],
                      };
                    });
                  })
                );
            })
          );
        })
      )
  );
}
