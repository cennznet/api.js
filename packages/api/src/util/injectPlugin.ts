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

import {IPlugin} from '@cennznet/api/types';
import {mergeDeriveOptions} from '@cennznet/api/util/derives';
import {TypeRegistry} from '@polkadot/types';
import {Api} from '../Api';
import {ApiRx} from '../ApiRx';
import {ApiOptions} from '../types';

export function injectOption(options: ApiOptions, plugins: IPlugin[] = []): void {
  for (const plugin of plugins) {
    if (plugin.types) {
      options.types = Object.assign({}, options.types, plugin.types);
    }
    if (plugin.derives) {
      options.derives = mergeDeriveOptions(options.derives || {}, plugin.derives);
    }
  }
}

export function injectPlugins(api: Api | ApiRx, plugins: IPlugin[] = []): void {
  const registry = new TypeRegistry();
  for (const plugin of plugins) {
    if (plugin.sdkClass && plugin.injectName && api.type === 'promise') {
      Object.defineProperty(api, plugin.injectName, {
        value: new plugin.sdkClass(registry, api),
      });
    }
    if (plugin.sdkRxClass && plugin.injectName && api.type === 'rxjs') {
      Object.defineProperty(api, plugin.injectName, {
        value: new plugin.sdkRxClass(registry, api),
      });
    }
  }
}

export function mergePlugins(originPlugins: IPlugin[], incomePlugins: IPlugin[]) {
  return incomePlugins.reduce((acc, plugin) => {
    if (acc.findIndex(p => p.injectName === plugin.injectName) < 0) {
      acc.push(plugin);
    }
    return acc;
  }, originPlugins);
}
