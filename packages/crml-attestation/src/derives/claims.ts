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
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Claim} from '../types';
import {getClaim} from './getClaim';

export function claims(api: ApiInterfaceRx) {
    return (holder: string, issuers: Array<string>, topics: Array<string>): Observable<Claim[]> => {
        const observables = issuers.reduce(
            (prev, issuer) => {
                prev.push(
                    ...topics.map(topic =>
                        getClaim(api)(holder, issuer, topic).pipe(
                            map(value => ({
                                holder,
                                issuer,
                                topic,
                                value,
                            }))
                        )
                    )
                );
                return prev;
            },
            [] as Observable<Claim>[]
        );

        return combineLatest(observables);
    };
}
