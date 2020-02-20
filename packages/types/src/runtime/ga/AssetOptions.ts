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

/*
 Custom `AssetOptions` type for generic asset module.
*/

import {Struct} from '@polkadot/types';
import {Balance} from '@polkadot/types/interfaces';
import {Registry} from '@polkadot/types/types';
import PermissionLatest from './PermissionsV1';

export default class AssetOptions extends Struct {
  constructor(registry: Registry, value: any) {
    super(registry, {initialIssuance: 'Compact<Balance>', permissions: PermissionLatest}, value);
  }

  get initialIssuance(): Balance {
    return this.get('initialIssuance') as Balance;
  }

  get permissions(): PermissionLatest {
    return this.get('permissions') as PermissionLatest;
  }
}
