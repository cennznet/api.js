// Copyright 2019 Centrality Investments Limited
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

import {ApiInterfaceRx} from '@cennznet/api/types';
import {AttestationValue} from '@cennznet/types';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Claim, Claims, ClaimsAsHexFunc, ClaimsAsU8aFunc, ClaimsObject} from '../types';
import {getClaim} from './getClaim';

export const claimsMapper = (
    valueMapper: (value: AttestationValue) => string | Uint8Array,
    claims: Claims
): ClaimsAsHexFunc | ClaimsAsU8aFunc => () => {
    const res = {};
    const topics = Object.keys(claims);

    topics.forEach(topic => {
        res[topic] = {};
        const issuers = Object.keys(claims[topic]);

        issuers.forEach(issuer => {
            const value = claims[topic][issuer];
            res[topic][issuer] = valueMapper(value);
        });
    });

    return res;
};

/**
 * @deprecated use api.derives.attestation.claims instead
 * @param api
 */
export function getClaims(api: ApiInterfaceRx) {
    return (holder: string, issuers: Array<string>, topics: Array<string>): Observable<ClaimsObject> => {
        const stream = getClaim(api);

        const observables: Array<Observable<Claim>> = issuers.reduce((prev, issuer) => {
            return [
                ...prev,
                ...topics.map(topic =>
                    stream(holder, issuer, topic).pipe(
                        map(value => ({
                            holder,
                            issuer,
                            topic,
                            value,
                        }))
                    )
                ),
            ];
        }, []);

        return combineLatest(observables).pipe(
            map(claimsArray => {
                const claims: Claims = claimsArray.reduce((prev, claim) => {
                    const {topic, issuer, value} = claim;

                    if (!prev[topic]) {
                        prev[topic] = {};
                    }

                    prev[topic][issuer] = value;
                    return prev;
                }, {});

                return {
                    claims,
                    claimsAsHex: claimsMapper(value => value.toHex(), claims) as ClaimsAsHexFunc,
                    claimsAsU8a: claimsMapper(value => value.toU8a(), claims) as ClaimsAsU8aFunc,
                };
            })
        );
    };
}
