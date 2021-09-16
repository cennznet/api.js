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

import { extractEthereumSignature } from '@cennznet/api/util/helper';
import { Observable, combineLatest } from '@polkadot/x-rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';

import { memo } from '@polkadot/api-derive/util';
import { map, filter } from '@polkadot/x-rxjs/operators';
import { EthyEventId } from '@cennznet/types';
import { EthEventProof } from './types';

/**
 * @description Retrieve event proof
 */
export function eventProof(instanceId: string, api: ApiInterfaceRx): () => Observable<EthEventProof> {
  return memo(
    instanceId,
    (eventId: EthyEventId): Observable<EthEventProof> =>
      combineLatest([
        api.rpc.ethy.getEventProof(eventId),
        api.derive.chain.bestNumberFinalized(), // use this so that the call keeps happening until eventProof value exist.
      ]).pipe(
        filter(([eventProof, header]) => {
          console.debug(
            `event proof recieved is ${eventProof.toHuman() === null ? null : eventProof} at block ${header.toString()}`
          );
          return eventProof.toHuman() !== null;
        }),
        map(
          ([versionedEventProof]): EthEventProof => {
            const eventProof = versionedEventProof.unwrap().asEventProof;
            const { r, s, v } = extractEthereumSignature(eventProof.signatures);
            return {
              eventId: eventProof.eventId.toString(),
              validatorSetId: eventProof.validatorSetId.toString(),
              r,
              s,
              v,
            };
          }
        )
      )
  );
}
