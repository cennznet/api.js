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

import {Struct} from '@polkadot/types';
import {Registry} from '@polkadot/types/types';
import Owner from './Owner';

/**
 * alias for PermissionLatest and PermissionOptions
 */
export default class PermissionsV1 extends Struct {
  constructor(registry: Registry, value: any) {
    super(registry, {update: Owner, mint: Owner, burn: Owner}, value);
  }

  get update(): Owner {
    return this.get('update') as Owner;
  }

  get mint(): Owner {
    return this.get('mint') as Owner;
  }

  get burn(): Owner {
    return this.get('burn') as Owner;
  }
}
