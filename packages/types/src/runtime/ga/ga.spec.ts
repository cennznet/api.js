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

import '@polkadot/types/injector';
import {createTypeUnsafe, TypeRegistry, u32} from '@polkadot/types';

import * as gaTypes from './';
import AssetOptions from './AssetOptions';
import PermissionsV1 from './PermissionsV1';
import ExchangeKey from '@cennznet/types/runtime/cennzx/ExchangeKey';
import FeeRate from '@cennznet/types/runtime/cennzx/FeeRate';

const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

const registry = new TypeRegistry();
registry.register(gaTypes);
// registry.register(gaTypes);
// registry.register(typeof u32, gaTypes.AssetId);
// registry.register(typeof AssetOptions, AssetOptions);
// registry.register(typeof gaTypes.Owner, gaTypes.Owner);

describe('ga types', () => {
  describe('Permission', () => {
    it('empty permissions', () => {
      const permission = createTypeUnsafe<PermissionsV1>(registry, 'PermissionLatest', [{}]);
      expect(permission.burn.isNone).toBeTruthy();
      expect(permission.mint.isNone).toBeTruthy();
      expect(permission.update.isNone).toBeTruthy();
    });

    it('full permissions', () => {
      const permission = createTypeUnsafe<PermissionsV1>(registry, 'PermissionLatest', [
        {
          burn: BOB,
          mint: BOB,
          update: BOB,
        },
      ]);
      expect(permission.burn.unwrap().toString()).toEqual(BOB);
      expect(permission.mint.unwrap().toString()).toEqual(BOB);
      expect(permission.update.unwrap().toString()).toEqual(BOB);
    });
  });

  it('AssetOptions', () => {
    const assetOptions = createTypeUnsafe<AssetOptions>(registry, 'AssetOptions', [
      {
        initialIssuance: 1000,
      },
    ]);
    expect(assetOptions.initialIssuance.toNumber()).toEqual(1000);
  });
});
