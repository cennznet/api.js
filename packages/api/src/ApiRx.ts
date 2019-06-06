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
import * as Types from '@cennznet/types';
import Alias from '@cennznet/types/alias';
import {ApiRx as ApiRxBase} from '@plugnet/api';
import {RxResult} from '@plugnet/api/rx/types';
import {ApiOptions as ApiOptionsBase} from '@plugnet/api/types';
import {ProviderInterface} from '@plugnet/rpc-provider/types';
import {isFunction, isObject} from '@plugnet/util';
import {fromEvent, Observable, race, throwError} from 'rxjs';
import {switchMap, timeout} from 'rxjs/operators';

import {DEFAULT_TIMEOUT} from './Api';
import * as derives from './derives';
import staticMetadata from './staticMetadata';
import {ApiOptions, IPlugin, SubmittableExtrinsics} from './types';
import {getProvider} from './util/getProvider';
import {getTimeout} from './util/getTimeout';
import logger from './util/logging';

export class ApiRx extends ApiRxBase {
    static create(options: ApiOptions | ProviderInterface = {}): Observable<ApiRx> {
        const apiRx = new ApiRx(options);

        const timeoutMs = getTimeout(options);

        const rejectError = fromEvent((apiRx as any)._eventemitter, 'error').pipe(
            switchMap(err => {
                // Disconnect provider if API initialization fails
                apiRx.disconnect();

                return throwError(new Error('Connection fail'));
            })
        );
        const api$ = (apiRx.isReady as unknown) as Observable<ApiRx>;

        return timeoutMs === 0
            ? race(api$, rejectError)
            : race(api$.pipe(timeout(timeoutMs === undefined ? DEFAULT_TIMEOUT : timeoutMs)), rejectError);
    }

    // @ts-ignore
    get tx(): SubmittableExtrinsics<RxResult, RxResult>;

    // TODO: add other crml namespaces

    /**
     * Generic Asset CRML extention
     */
    get genericAsset(): GenericAssetRx {
        // `injectPlugins` will override this getter.
        throw new Error('Generic Asset plugin has not been injected.');
    }

    /**
     * Cennzx Spot CRML extention
     */
    get cennzxSpot(): CennzxSpotRx {
        // `injectPlugins` will override this getter.
        throw new Error('Cennzx Spot plugin has not been injected.');
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
