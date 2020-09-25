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

import { mergeDeriveOptions } from '@cennznet/api/util/derives';
import Types from '@cennznet/types/injects';
import { ApiRx as ApiRxBase } from '@polkadot/api';
import { ApiOptions as ApiOptionsBase } from '@polkadot/api/types';
import { fromEvent, Observable, race, throwError } from 'rxjs';
import { switchMap, timeout } from 'rxjs/operators';

import rpc from '@cennznet/api/rpc';
import { DEFAULT_TIMEOUT } from './Api';
import derives from './derives';
import staticMetadata from './staticMetadata';
import { ApiOptions, Derives, SubmittableExtrinsics } from './types';
import { getProvider } from './util/getProvider';
import { getTimeout } from './util/getTimeout';

export class ApiRx extends ApiRxBase {
  static create(options: ApiOptions = {}): Observable<ApiRx> {
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
    // api$.subscribe(api => api.decorateCennznetExtrinsics());

    return timeoutMs === 0
      ? race(api$, rejectError)
      : race(api$.pipe(timeout(timeoutMs || DEFAULT_TIMEOUT)), rejectError);
  }

  get tx(): SubmittableExtrinsics<'rxjs'> {
    return super.tx as SubmittableExtrinsics<'rxjs'>;
  }

  get derive(): Derives<'rxjs'> {
    return super.derive as Derives<'rxjs'>;
  }

  constructor(_options: ApiOptions = {}) {
    const options = { ..._options };
    if (typeof options.provider === 'string') {
      options.provider = getProvider(options.provider);
    }
    options.metadata = Object.assign(staticMetadata, options.metadata);
    options.types = { ...options.types, ...Types };
    options.derives = mergeDeriveOptions(derives as any, options.derives);
    options.rpc = { ...(rpc as any), ...options.rpc };

    super(options as ApiOptionsBase);
  }
}
