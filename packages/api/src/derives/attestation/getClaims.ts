// // Copyright 2019-2020 Centrality Investments Limited
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
//
// import { combineLatest, Observable } from 'rxjs';
//
// import { ApiInterfaceRx } from '@cennznet/api/types';
//
// import { Claim } from './types';
// import { getClaim } from './getClaim';
//
// /**
//  * Get all claims made about a holder by the given issuers on the given topics.
//  *
//  * @param holder  The claims' holder address
//  * @param issuers  A list of claim issuer addresses to include
//  * @param topics  A list of claim topics to include
//  */
// export function getClaims(api: ApiInterfaceRx) {
//   return (holder: string, issuers: Array<string>, topics: Array<string>): Observable<Claim[]> => {
//     const observables = issuers.reduce((prev, issuer) => {
//       prev.push(...topics.map(topic => getClaim(api)(holder, issuer, topic)));
//       return prev;
//     }, [] as Observable<Claim>[]);
//
//     return combineLatest(observables);
//   };
// }
