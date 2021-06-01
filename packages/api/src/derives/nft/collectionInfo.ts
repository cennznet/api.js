import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { CollectionNameType } from '@cennznet/types';
import { CollectionMap } from '@cennznet/api/derives/nft/types';

/**
 * Get map of collection id to collection name
 *
 * @returns [id: name]
 */
export function collectionInfo(instanceId: string, api: ApiInterfaceRx) {
  return (): Observable<CollectionMap> => {
    return api.query.nft.nextCollectionId().pipe(
      switchMap(
        (nextCollectionId): Observable<any> => {
          const queryArgsList = [];
          for (let i = 0; i < nextCollectionId.toNumber(); i++) {
            queryArgsList.push({ collectionId: i });
          }
          return api.query.nft.collectionName.multi(queryArgsList.map((arg) => [arg.collectionId])).pipe(
            map((collectionNames: CollectionNameType[]) => {
              const collectionMap = collectionNames.reduce((acc, name, idx) => {
                acc[idx] = name.toHuman();
                return acc;
              }, {});
              return collectionMap;
            })
          );
        }
      )
    );
  };
}
