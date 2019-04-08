import {IPlugin} from '@cennznet/api/types';
import {mergeDeriveOptions} from '@cennznet/api/util/derives';
import {ApiType} from '@polkadot/api/types';
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
    for (const plugin of plugins) {
        Object.defineProperty(api, plugin.injectName, {
            value: api.type === 'promise' ? new plugin.sdkClass(api) : new plugin.sdkRxClass(api),
        });
    }
}
