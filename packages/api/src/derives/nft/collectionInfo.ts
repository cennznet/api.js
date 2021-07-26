import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { CollectionNameType } from '@cennznet/types';
import { CollectionInfo } from '@cennznet/api/derives/nft/types';

/**
 * Get map of collection id to collection name
 *
 * @returns [[CollectionInfo]]
 */
export function collectionInfo(instanceId: string, api: ApiInterfaceRx) {
  return (): Observable<CollectionInfo[]> => {
    return api.query.nft.nextCollectionId().pipe(
      switchMap(
        (nextCollectionId): Observable<CollectionInfo[]> => {
          const queryArgsList = [];
          for (let i = 0; i < nextCollectionId.toNumber(); i++) {
            queryArgsList.push({ collectionId: i });
          }
          return api.query.nft.collectionName.multi(queryArgsList.map((arg) => [arg.collectionId])).pipe(
            map((collectionNames: CollectionNameType[]) => {
              return collectionNames.map((name, idx) => {
                return {
                  id: idx,
                  name: name.toHuman(),
                };
              }) as CollectionInfo[];
            })
          );
        }
      )
    );
  };
}
