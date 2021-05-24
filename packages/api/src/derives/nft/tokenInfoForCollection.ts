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
import { SerialNumber, SeriesId } from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';
/**
 * @description Retrieve the list of all tokens in a collection
 */
export function tokenInfoForCollection(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveTokenInfo[]> {
  return memo(
    instanceId,
    (collectionId: string): Observable<DeriveTokenInfo[]> =>
      combineLatest([
        api.query.nft.seriesAttributes.entries(collectionId),
        api.query.nft.seriesAttributes.keys(collectionId),
      ]).pipe(
        switchMap(([entries, seriesIds]) => {
          const seriesAttributeMap = entries.map((detail, idx) => {
            const seriesId = seriesIds[idx].args[1];
            return { id: seriesId, seriesAttribute: detail };
          });
          return api.query.nft.nextSerialNumber.multi(seriesIds.map((token) => [collectionId, token.args[1]])).pipe(
            switchMap((nextSerialNumber: SerialNumber[]) => {
              const queryArgs = seriesIds.map((token, idx) => {
                const nextSerial = nextSerialNumber[idx];
                const queryArgsList = [];
                for (let i = 0; i < nextSerial.toNumber(); i++) {
                  queryArgsList.push([{ seriesId: token.args[1], serialNumber: i }]);
                }
                return queryArgsList;
              });
              const args: { seriesId: SeriesId; serialNumber: number }[] = queryArgs.flat().flat();
              return api.query.nft.tokenOwner
                .multi(args.map((arg) => [[collectionId, arg.seriesId.toNumber()], arg.serialNumber]))
                .pipe(
                  map((allOwners) => {
                    return args.map(({ seriesId, serialNumber }, idx) => {
                      const attribute = seriesAttributeMap.find((series) => series.id === seriesId);
                      const emptyAddress = api.registry.createType('AccountId', null);
                      return {
                        tokenId: new EnhancedTokenId(api.registry, [collectionId, seriesId, serialNumber]),
                        attributes: attribute.seriesAttribute[1],
                        owner: allOwners[idx].toString() === emptyAddress.toString() ? null : allOwners[idx].toString(),
                      } as DeriveTokenInfo;
                    });
                  })
                );
            })
          );
        })
      )
  );
}
