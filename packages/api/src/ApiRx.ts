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

import getPlugins from '@cennznet/api/plugins';
import {mergeDeriveOptions} from '@cennznet/api/util/derives';
import {injectOption, injectPlugins, mergePlugins} from '@cennznet/api/util/injectPlugin';
import {CennzxSpotRx} from '@cennznet/crml-cennzx-spot';
import {GenericAssetRx} from '@cennznet/crml-generic-asset';
import Alias from '@cennznet/types/alias';
import {ApiRx as ApiRxBase} from '@plugnet/api';
import {ApiOptions as ApiOptionsBase} from '@plugnet/api/types';
import {ProviderInterface} from '@plugnet/rpc-provider/types';
import {isFunction, isObject} from '@plugnet/util';

import {Observable} from 'rxjs';
import * as derives from './derives';
import staticMetadata from './staticMetadata';
import {ApiOptions, IPlugin} from './types';
import {getProvider} from './util/getProvider';
import logger from './util/logging';
const Types = require('@cennznet/types');

export class ApiRx extends ApiRxBase {
    static create(options: ApiOptions | ProviderInterface = {}): Observable<ApiRx> {
        return new ApiRx(options).isReady as Observable<ApiRx>;
    }

    // TODO: add other crml namespaces
    
    private _genericAsset?: GenericAssetRx;
    private _cennzxSpot?: CennzxSpotRx;

    /**
     * Generic Asset CRML extention
     */
    get genericAsset(): GenericAssetRx {
        if (!this._genericAsset) {
            throw new Error('Generic Asset plugin has not been injected.');
        }

        return this._genericAsset;
    }

    set genericAsset(value: GenericAssetRx) {
        this._genericAsset = value;
    }

    /**
     * Cennzx Spot CRML extention
     */
    get cennzxSpot(): CennzxSpotRx {
        if (!this._cennzxSpot) {
            throw new Error('Cennzx Spot plugin has not been injected.');
        }

        return this._cennzxSpot;
    }

    set cennzxSpot(value: CennzxSpotRx) {
        this._cennzxSpot = value;
    }

    constructor(provider: ApiOptions | ProviderInterface = {}) {
        const options =
            isObject(provider) && isFunction((provider as ProviderInterface).send)
                ? ({provider} as ApiOptions)
                : ({...provider} as ApiOptions);
        if (typeof options.provider === 'string') {
            options.provider = getProvider(options.provider);
        }
        options.metadata = Object.assign(staticMetadata, options.metadata);
        let plugins: IPlugin[] = options.plugins || [];
        try {
            plugins = mergePlugins(plugins, getPlugins());
            injectOption(options, plugins);
        } catch (e) {
            logger.error('plugin loading failed');
        }

        options.types = {...Types, ...options.types, ...Alias};
        options.derives = mergeDeriveOptions(derives, options.derives);

        super(options as ApiOptionsBase);

        if (plugins) {
            injectPlugins(this, plugins);
        }
    }
}
