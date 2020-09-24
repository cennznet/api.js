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

import { CennzxSpot } from '@cennznet/crml-cennzx-spot';
import Types from '@cennznet/types/injects';
import { ApiPromise } from '@polkadot/api';
import { ApiOptions as ApiOptionsBase } from '@polkadot/api/types';

import derives from './derives';
import rpc from './rpc';
import staticMetadata from './staticMetadata';
import { ApiOptions, Derives, SubmittableExtrinsics } from './types';
import { mergeDeriveOptions } from './util/derives';
import { getProvider } from './util/getProvider';
import { getTimeout } from './util/getTimeout';

export const DEFAULT_TIMEOUT = 10000;

export class Api extends ApiPromise {
  static async create(options: ApiOptions = {}): Promise<Api> {
    const api = new Api(options);
    return withTimeout(
      new Promise((resolve, reject) => {
        const rejectError = err => {
          // Disconnect provider if API initialization fails
          api.disconnect();

          reject(new Error('Connection fail'));
        };

        api.isReady.then(res => {
          //  Remove error listener if API initialization success.
          (api as any)._eventemitter.removeListener('error', rejectError);
          resolve((res as unknown) as Api);
        }, reject);

        api.once('error', rejectError);
      }),
      getTimeout(options)
    );
  }

  get tx(): SubmittableExtrinsics<'promise'> {
    return super.tx as SubmittableExtrinsics<'promise'>;
  }

  get derive(): Derives<'promise'> {
    return super.derive as Derives<'promise'>;
  }

  /**
   * Cennzx Spot CRML extention
   */
  get cennzxSpot(): CennzxSpot {
    // `injectPlugins` will override this getter.
    throw new Error('Cennzx Spot plugin has not been injected.');
  }

  constructor(_options: ApiOptions = {}) {
    const options = { ..._options };

    if (typeof options.provider === 'string') {
      options.provider = getProvider(options.provider);
    }
    options.metadata = Object.assign(staticMetadata, options.metadata);
    options.types = { ...options.types, ...Types };
    options.derives = mergeDeriveOptions(derives, options.derives);
    options.rpc = { ...(rpc as any), ...options.rpc };

    super(options as ApiOptionsBase);
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
