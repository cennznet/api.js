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

import {mergeDeriveOptions} from '@cennznet/api/util/derives';
import {CennzxSpot} from '@cennznet/crml-cennzx-spot';
import {GenericAsset} from '@cennznet/crml-generic-asset';
import * as Types from '@cennznet/types';
import Alias from '@cennznet/types/alias';
import {ApiPromise} from '@plugnet/api';
import {CodecResult, SubscriptionResult} from '@plugnet/api/promise/types';
import {ApiOptions as ApiOptionsBase} from '@plugnet/api/types';
import {ProviderInterface} from '@plugnet/rpc-provider/types';
import {isFunction, isObject} from '@plugnet/util';

import * as derives from './derives';
import getPlugins from './plugins';
import staticMetadata from './staticMetadata';
import {ApiOptions, IPlugin, SubmittableExtrinsics} from './types';
import {decorateExtrinsics} from './util/customDecorators';
import {getProvider} from './util/getProvider';
import {getTimeout} from './util/getTimeout';
import {injectOption, injectPlugins, mergePlugins} from './util/injectPlugin';
import logger from './util/logging';

export const DEFAULT_TIMEOUT = 10000;

export class Api extends ApiPromise {
    static async create(options: ApiOptions | ProviderInterface = {}): Promise<Api> {
        const api = new Api(options);
        return withTimeout(
            new Promise((resolve, reject) => {
                const rejectError = err => {
                    // Disconnect provider if API initialization fails
                    api.disconnect();

                    reject(new Error('Connection fail'));
                };

                api.isReady.then(res => {
                    api.decorateCennznetExtrinsics();
                    //  Remove error listener if API initialization success.
                    (api as any)._eventemitter.removeListener('error', rejectError);
                    resolve((res as unknown) as Api);
                }, reject);

                api.once('error', rejectError);
            }),
            getTimeout(options)
        );
    }

    // @ts-ignore
    get tx(): SubmittableExtrinsics<CodecResult, SubscriptionResult>;

    // TODO: add other crml namespaces

    /**
     * Generic Asset CRML extention
     */
    get genericAsset(): GenericAsset {
        // `injectPlugins` will override this getter.
        throw new Error('Generic Asset plugin has not been injected.');
    }

    /**
     * Cennzx Spot CRML extention
     */
    get cennzxSpot(): CennzxSpot {
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

    decorateCennznetExtrinsics(): void {
        decorateExtrinsics(this);
    }
}

async function withTimeout(promise: Promise<Api>, timeoutMs: number = DEFAULT_TIMEOUT): Promise<Api> {
    if (timeoutMs === 0) {
        return promise;
    }

    return Promise.race<Api>([
        promise,
        new Promise<Api>((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Timed out in ${timeoutMs} ms.`));
            }, timeoutMs);
        }),
    ]);
}
