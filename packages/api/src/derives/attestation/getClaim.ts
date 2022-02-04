// Copyright 2019-2020 Centrality Investments Limited
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

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiInterfaceRx } from '@cennznet/api/types';
import { AttestationValue } from '@cennznet/types/interfaces/attestation';
import { drr } from '@polkadot/rpc-core/util';

import { Claim } from './types';

/**
 * Retrieve a single claim made about a holder by the given issuer on a given topic.
 *
 * @param holder  The claim holder address
 * @param issuer The claim issuer address
 * @param topic  The claim topic
 *
 *  @returns the claim
 */
export function getClaim(instanceId: string, api: ApiInterfaceRx) {
  return (holder: string, issuer: string, topic: string): Observable<Claim> => {
    return api.query.attestation
      .values<AttestationValue>([holder, issuer, topic])
      .pipe(drr())
      .pipe(
        map((value) => ({
          holder,
          issuer,
          topic,
          value,
        }))
      );
  };
}
