// Copyright 2020 Centrality Investments Limited
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

// Adding this file to support extrinsic via rv36
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Observable, of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function account(instanceId: string, api: ApiInterfaceRx) {
  return (address: string): Observable<any> => of(address);
}
