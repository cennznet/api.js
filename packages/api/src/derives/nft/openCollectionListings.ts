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

import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, reduce, mergeAll, first } from 'rxjs/operators';
import { ApiInterfaceRx } from '@cennznet/api/types';
import { DeriveTokenInfo } from '@cennznet/api/derives/nft/types';
import { Listing, TokenId } from '@cennznet/types';
import { Option } from '@polkadot/types/codec/Option';
import { UInt } from '@polkadot/types';

/**
 * Gets all tokens in a collection that have an open listing
 *
 * @param collectionId  The collection Id value
 *
 * @returns List of tokens that have open listings in given collection
 */
export function openCollectionListings(instanceId: string, api: ApiInterfaceRx) {
  return (collectionId: string): Observable<DeriveTokenInfo[]> => {
    return api.query.nft.openCollectionListings.keys(collectionId).pipe(
      switchMap(
        (storageKeys): Observable<DeriveTokenInfo[]> => {
          if (storageKeys.length === 0) {
            return of([]);
          }
          const listingIDs = storageKeys.map((storageKey) => {
            return storageKey.args.map((k) => k.toHuman())[1];
          });
          return api.query.nft.listings.multi(listingIDs.map((listingID) => listingID)).pipe(
            switchMap(
              (listingsCodec: Option<Listing>[]): Observable<DeriveTokenInfo[]> => {
                const tokenIds = listingsCodec.map((listingCodec) => {
                  const listing: Listing = listingCodec.unwrapOrDefault();
                  const tokenID: TokenId = listing.isAuction
                    ? listing.asAuction.toJSON().tokens[0]
                    : listing.asFixedPrice.toJSON().tokens[0];
                  return tokenID;
                });
                const listingTokenIds = listingIDs.map((listingId, i) => {
                  return [listingId, tokenIds[i]];
                });
                return combineLatest(
                  tokenIds.map((tokenId): DeriveTokenInfo[] => {
                    return (api.derive as any).nft.tokenInfo(tokenId);
                  })
                ).pipe(
                  first(),
                  map((tokenInfos: DeriveTokenInfo[]): DeriveTokenInfo[] => {
                    const tokenInfoWithListingId = tokenInfos.map((tokenInfo) => {
                      const listingIdStr = listingTokenIds.find(([_listing, tokenId]) => {
                        return (
                          tokenId.toString() ===
                          [
                            tokenInfo.tokenId.collectionId,
                            tokenInfo.tokenId.seriesId,
                            tokenInfo.tokenId.serialNumber,
                          ].toString()
                        );
                      })[0];
                      const listingId = new UInt(api.registry, parseInt(listingIdStr as string));
                      tokenInfo.listingId = listingId;
                      return tokenInfo;
                    });
                    return tokenInfoWithListingId;
                  }),
                  reduce((a, i) => {
                    const allTokens = [...a, i];
                    return allTokens;
                  }, []),
                  mergeAll()
                );
              }
            )
          );
        }
      )
    );
  };
}
