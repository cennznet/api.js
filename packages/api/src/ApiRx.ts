import getPlugins from '@cennznet/api/plugins';
import {mergeDeriveOptions} from '@cennznet/api/util/derives';
import {injectOption, injectPlugins} from '@cennznet/api/util/injectPlugin';
import {GenericAsset} from '@cennznet/crml-generic-asset';
import {ApiRx as ApiRxBase} from '@polkadot/api';
import {ApiOptions as ApiOptionsBase} from '@polkadot/api/types';
import {ProviderInterface} from '@polkadot/rpc-provider/types';
import WsProvider from '@polkadot/rpc-provider/ws';
import {isFunction, isObject} from '@polkadot/util';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as derives from './derives';
import {ApiOptions, IPlugin} from './types';
import logger from './util/logging';

const Types = require('@cennznet/types');

export class ApiRx extends ApiRxBase {
    static create(options: ApiOptions | ProviderInterface = {}): Observable<ApiRx> {
        return (new ApiRx(options).isReady as Observable<ApiRx>).pipe(
            tap(api => {
                injectPlugins(api, api._plugins);
            })
        );
    }

    // TODO: add other crml namespaces
    /**
     * Generic Asset CRML extention
     */
    genericAsset?: GenericAsset;

    protected _plugins: IPlugin[];

    constructor(provider: ApiOptions | ProviderInterface = {}) {
        const options =
            isObject(provider) && isFunction((provider as ProviderInterface).send)
                ? ({provider} as ApiOptions)
                : ({...provider} as ApiOptions);
        if (typeof options.provider === 'string') {
            options.provider = new WsProvider(options.provider);
        }
        let plugins: IPlugin[] = options.plugins || [];
        try {
            plugins = Object.values(getPlugins()).concat(plugins);
            injectOption(options, plugins);
        } catch (e) {
            logger.error('plugin loading failed');
        }

        options.types = {...Types, ...options.types};
        options.derives = mergeDeriveOptions(derives, options.derives);

        super(options as ApiOptionsBase);

        if (plugins) {
            this._plugins = plugins;
        }
    }
}
