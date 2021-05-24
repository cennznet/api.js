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
import { switchMap } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { TokenId } from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';
import {DeriveTokenInfo} from "@cennznet/api/derives/nft/types";

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

    return api
      .queryMulti([
        [api.query.nft.tokenOwner, [tokenId.collectionId, tokenId.seriesId], tokenId.serialNumber],
        [api.query.nft.seriesAttributes, [tokenId.collectionId, tokenId.seriesId]],
      ])
      .pipe(
        switchMap(
          ([owner, attributes]): Observable<DeriveTokenInfo> => {
            return of(
              new Object({
                owner: owner.toString(),
                attributes: attributes.toJSON(),
                tokenId: tokenId as EnhancedTokenId,
              }) as DeriveTokenInfo
            );
          }
        )
      );
  };
}
