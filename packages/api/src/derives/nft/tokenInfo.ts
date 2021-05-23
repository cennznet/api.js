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

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { AccountId, AnyJson, CollectionId, TokenId } from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';

/** Info about a token  */
export interface TokenInfo {
  /** The token's id */
  tokenId: EnhancedTokenId;
  /** The token's owner */
  owner: string;
  /** The token's data attributes */
  attributes: Array<number | string>;
}

/**
 * Get info on the current token
 *
 * @param tokenId  The token Id value
 *
 * @returns [[TokenInfo]]
 */
export function tokenInfo(instanceId: string, api: ApiInterfaceRx) {
  return (tokenId: TokenId | EnhancedTokenId): Observable<TokenInfo> => {
    tokenId = new EnhancedTokenId(api.registry, tokenId);

    return api
      .queryMulti([
        [api.query.nft.tokenOwner, [tokenId.collectionId, tokenId.seriesId], tokenId.serialNumber],
        [api.query.nft.seriesAttributes, [tokenId.collectionId, tokenId.seriesId]],
      ])
      .pipe(
        switchMap(
          ([owner, attributes]): Observable<TokenInfo> => {
            return of(
              new Object({
                owner: owner.toString(),
                attributes: attributes.toJSON(),
                tokenId: tokenId as EnhancedTokenId,
              }) as TokenInfo
            );
          }
        )
      );
  };
}

// /**
//  * Get the tokens owned by address from the given collection
//  *
//  * @param collectionId  The collection Id value
//  * @param address  The owner of the tokens
//  *
//  * @returns The owned token Ids [[EnhancedTokenId]]
//  */
//  export function collectedToken(instanceId: string, api: ApiInterfaceRx) {
//   return (collectionId: CollectionId, address: AccountId): Observable<Array<EnhancedTokenId>> => {
//     return (api.rpc as any).nft.collectedTokens(collectionId, address)
//       .pipe(
//         map((tokenIds: Array<[number, number, number]>) => tokenIds.map(t => new EnhancedTokenId(api.registry, t)))
//       )
//   }
// }
