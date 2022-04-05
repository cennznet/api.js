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

import { combineLatest, Observable, from, of } from 'rxjs';
import { switchMap, filter, map, mergeMap, catchError, reduce } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { CollectionId, Bytes, Option, SeriesId, TokenId } from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';
import { DeriveTokenInfo } from '@cennznet/api/derives/nft/types';
import { AccountId } from '@polkadot/types/interfaces';
import { CrmlNftMetadataScheme } from '@polkadot/types/lookup';

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

    return combineLatest([
      api.query.nft.tokenOwner([tokenId.collectionId, tokenId.seriesId], tokenId.serialNumber),
      api.query.nft.seriesAttributes(tokenId.collectionId, tokenId.seriesId),
    ]).pipe(
      switchMap(
        ([owner, attributes]): Observable<DeriveTokenInfo> => {
          return of(
            new Object({
              owner: owner.toString(),
              attributes: attributes,
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
            const tokenIdsFetched = entries
              .filter((detail) => detail[1].toString() === owner)
              .map((detail) => detail[0].args);
            return of(
              tokenIdsFetched.map((token) => {
                const collectionId = token[0][0].toNumber();
                const seriesId = token[0][1].toNumber();
                const serialNumber = token[1].toNumber();
                return new EnhancedTokenId(api.registry, [collectionId, seriesId, serialNumber]);
              })
            );
          })
        )
      : collectionTokens(collectionIds, api, owner);
  };
}

/**
 * Get metadata uri for a series, older runtime 45 (uses api.query.nft.seriesMetadataURI) new ones (api.query.nft.seriesMetadataScheme)
 *
 * @param collectionId  collection
 * @param seriesId
 *
 * @returns Observable<Option<CrmlNftMetadataScheme | MetadataBaseURI>>
 */
export function seriesMetadataUri(instanceId: string, api: ApiInterfaceRx) {
  return (
    collectionId: CollectionId | number,
    seriesId: SeriesId | number
  ): Observable<Option<CrmlNftMetadataScheme | Bytes>> => {
    return api.query.nft.seriesMetadataScheme(collectionId, seriesId).pipe(
      switchMap(
        (schema): Observable<Option<CrmlNftMetadataScheme | Bytes>> => {
          if (schema.isSome) return (of(schema) as unknown) as Observable<Option<CrmlNftMetadataScheme>>;
          return api.query.nft.seriesMetadataURI(collectionId, seriesId).pipe(
            map(
              (uri): Option<Bytes> => {
                return uri as Option<Bytes>;
              }
            )
          );
        }
      )
    );
  };
}
