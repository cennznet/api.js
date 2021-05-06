// Copyright 2019-2020 Centrality Investments Limited
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

import Types, { typesBundle } from '@cennznet/types/interfaces/injects';
import { ApiPromise } from '@polkadot/api';
import { ApiOptions as ApiOptionsBase, SubmittableExtrinsics } from '@polkadot/api/types';

import * as definitions from '@cennznet/types/interfaces/definitions';
import derives from './derives';
import staticMetadata from './staticMetadata';
import { ApiOptions, Derives } from './types';
import { mergeDeriveOptions } from './util/derives';
import { getProvider } from './util/getProvider';
import { getTimeout } from './util/getTimeout';

export class Api extends ApiPromise {
  static create(options: ApiOptions = {}): Promise<Api> {
    const api = new Api(options);
    return withTimeout(
      new Promise((resolve, reject) => {
        const rejectError = () => {
          // Disconnect provider if API initialization fails
          if (api.isConnected) {
            void api.disconnect();
          }
          reject(new Error('Connection fail'));
        };

        api.isReady.then((res) => {
          //  Remove error listener if API initialization success.
          (api as ApiPromise).off('error', rejectError);
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

  constructor(_options: ApiOptions = {}) {
    const options = { ..._options };

    if (typeof options.provider === 'string') {
      options.provider = getProvider(options.provider);
    }
    const rpc = {};
    const sectionsList = Object.keys(definitions);
    Object.values(definitions).forEach((value: { rpc; types }, index) => {
      const section = sectionsList[index];
      if (value.rpc) {
        rpc[section] = value.rpc;
      }
    });
    options.metadata = Object.assign(staticMetadata, options.metadata);
    options.types = { ...options.types, ...Types };
    options.derives = mergeDeriveOptions(derives, options.derives);
    options.rpc = { ...rpc, ...options.rpc };
    options.typesBundle = typesBundle;
    super(options as ApiOptionsBase);
  }
}

function withTimeout(promise: Promise<Api>, timeoutMs: number): Promise<Api> {
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
