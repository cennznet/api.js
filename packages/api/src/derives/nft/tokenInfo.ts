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

import { Observable, from, of } from 'rxjs';
import { switchMap, filter, map, mergeMap, catchError, reduce } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { CollectionId, TokenId } from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';
import { DeriveCollectionInfo, DeriveTokenInfo } from '@cennznet/api/derives/nft/types';
import { AccountId } from '@polkadot/types/interfaces';

/**
 * Get info on the current token
 *
 * @param tokenId  The token Id value
 *
 * @returns [[TokenInfo]]
 */
export function tokenInfo(instanceId: string, api: ApiInterfaceRx) {
  return (tokenId: TokenId | EnhancedTokenId): Observable<DeriveTokenInfo> => {
    tokenId = new EnhancedTokenId(api.registry, tokenId);
    return api.query.nft
      .tokenOwner([tokenId.collectionId.toNumber(), tokenId.seriesId.toNumber()], tokenId.serialNumber.toNumber())
      .pipe(
        switchMap(
          (owner): Observable<DeriveTokenInfo> => {
            console.log('Token info::', owner);
            return of(
              new Object({
                owner: owner.toString(),
                tokenId: tokenId as EnhancedTokenId,
              }) as DeriveTokenInfo
            );
          }
        )
      );
  };
}

function collectionTokens(collectionIdsFetched, api: ApiInterfaceRx, owner: AccountId | string) {
  return from(collectionIdsFetched).pipe(
    mergeMap((collectionId) => {
      return api.rpc.nft.collectedTokens(collectionId as CollectionId, owner).pipe(
        filter((ownedTokens: EnhancedTokenId[]) => {
          return ownedTokens.length !== 0;
        }),
        map((ownedTokens) => {
          return ownedTokens;
        }),
        catchError((err: Error) => of(err))
      );
    }),
    reduce((a, i) => [...a, i], [])
  );
}

/**
 * Get info on the current token
 *
 * @param owner  The owner address
 * @param collectionIds - list of collectionIds [0,1,2..] (if not specified returns all the tokens in all the collections)
 *
 * @returns [[EnchanceTokenId]]
 */
export function tokensOf(instanceId: string, api: ApiInterfaceRx) {
  return (owner: AccountId | string, collectionIds?: CollectionId[]): Observable<EnhancedTokenId[] | Error> => {
    return collectionIds === undefined
      ? api.query.nft.tokenOwner.entries().pipe(
          switchMap((entries) => {
            const tokenIdsFetched = (entries as DeriveCollectionInfo)
              .filter((detail) => detail[1].toString() === owner)
              .map((detail) => detail[0].toHuman());
            return of(
              tokenIdsFetched.map((token) => {
                // here token is of the format [ [ 'collectionId', 'seriesId' ], 'serialNumber' ] - api.query.nft.tokenOwner
                return new EnhancedTokenId(api.registry, [token[0][0], token[0][1], token[1][0]]);
              })
            );
          })
        )
      : collectionTokens(collectionIds as CollectionId[], api, owner);
  };
}
