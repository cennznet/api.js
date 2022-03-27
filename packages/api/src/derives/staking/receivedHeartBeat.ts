import { ApiRx } from '@cennznet/api';
import { memo } from '@polkadot/api-derive/util';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { PalletImOnlineBoundedOpaqueNetworkState } from '@polkadot/types/lookup';
import type { Observable } from 'rxjs';
import type { DeriveHeartbeats } from '@polkadot/api-derive/types';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import type { AccountId, u32, Option, WrapperOpaque } from '@cennznet/types';
import { BN_ZERO } from '@polkadot/util';

type HeartbeatsOpt = Option<WrapperOpaque<PalletImOnlineBoundedOpaqueNetworkState>>;

function mapResult([result, validators, heartbeats, numBlocks]: [
  DeriveHeartbeats,
  AccountId[],
  HeartbeatsOpt[],
  u32[]
]): DeriveHeartbeats {
  validators.forEach((validator, index): void => {
    const validatorId = validator.toString();
    const blockCount = numBlocks[index];
    const hasMessage = !heartbeats[index].isEmpty;
    const prev = result[validatorId];

    if (!prev || prev.hasMessage !== hasMessage || !prev.blockCount.eq(blockCount)) {
      result[validatorId] = {
        blockCount,
        hasMessage,
        isOnline: hasMessage || blockCount.gt(BN_ZERO),
      };
    }
  });

  return result;
}

/**
 * @description Return a boolean array indicating whether the passed accounts had received heartbeats in the current session
 */
export function receivedHeartbeats(instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveHeartbeats> {
  return memo(
    instanceId,
    (): Observable<DeriveHeartbeats> =>
      api.query.imOnline?.receivedHeartbeats
        ? ((api as unknown) as ApiRx).derive.stakingCennznet.overview().pipe(
            switchMap(
              ({ currentIndex, validators }): Observable<[DeriveHeartbeats, AccountId[], HeartbeatsOpt[], u32[]]> =>
                combineLatest([
                  of({}),
                  of(validators),
                  api.query.imOnline.receivedHeartbeats.multi(
                    validators.map((_address, index) => [currentIndex, index])
                  ),
                  api.query.imOnline.authoredBlocks.multi(validators.map((address) => [currentIndex, address])),
                ])
            ),
            map(mapResult)
          )
        : of({})
  );
}
