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
import { hexToString } from '@polkadot/util';
import type { ApiInterfaceRx } from '@polkadot/api/types';

import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { EthyEventId } from '@cennznet/types';
import { computePublicKey } from '@ethersproject/signing-key';
import { keccak256 } from '@ethersproject/keccak256';
import { EthEventProof } from './types';

// Ignore if validator public key is 0x000..
const IGNORE_KEY = '0x000000000000000000000000000000000000000000000000000000000000000000';
function extractValidators(notaryKeys) {
  const newValidators = notaryKeys.map((notaryKey) => {
    if (notaryKey.toString() === IGNORE_KEY) return '0x0000000000000000000000000000000000000000';
    const decompressedPk = computePublicKey(notaryKey);
    const h = keccak256(`0x${decompressedPk.slice(4)}`);
    return `0x${h.slice(26)}`;
  });
  return newValidators;
}

/**
 * @description Retrieve event proof
 */
export function eventProof(instanceId: string, api: ApiInterfaceRx) {
  return (eventId: EthyEventId): Observable<EthEventProof> =>
    combineLatest([
      api.rpc.ethy.getEventProof(eventId),
      api.derive.chain.bestNumberFinalized(), // use this so that the call keeps happening until eventProof value exist.
      api.query.ethBridge.notaryKeys(),
    ]).pipe(
      filter(([eventProof, header]) => {
        console.debug(
          `event proof recieved is ${eventProof.toHuman() === null ? null : eventProof} at block ${header.toString()}`
        );
        return eventProof.toHuman() !== null;
      }),
      map(
        ([versionedEventProof, , notaryKeys]): EthEventProof => {
          const eventProof = versionedEventProof.unwrap().asEventProof;
          const currentValidators = extractValidators(notaryKeys);
          const { r, s, v } = extractEthereumSignature(eventProof.signatures);
          return {
            eventId: eventProof.eventId.toString(),
            validatorSetId: eventProof.validatorSetId.toString(),
            validators: currentValidators,
            blockHash: eventProof.blockHash.toString(),
            tag: hexToString(eventProof.tag.toString()),
            r,
            s,
            v,
          };
        }
      )
    );
}
