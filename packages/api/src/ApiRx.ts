import {ApiRx as ApiRxBase} from '@polkadot/api';
import {isObject, isFunction} from '@polkadot/util';
import {ApiOptions} from '@cennznet/types';
import {ProviderInterface} from '@polkadot/rpc-provider/types';
import WsProvider from '@polkadot/rpc-provider/ws';
import {ApiOptions as ApiOptionsBase} from '@polkadot/api/types';
import {Observable} from 'rxjs';

const Types = require('@cennznet/runtime-types');

export class ApiRx extends ApiRxBase {
    static create(options: ApiOptions | ProviderInterface = {}): Observable<ApiRx> {
        return new ApiRx(options).isReady;
    }

    constructor(provider: ApiOptions | ProviderInterface = {}) {
        const options =
            isObject(provider) && isFunction((provider as ProviderInterface).send)
                ? ({provider} as ApiOptions)
                : (provider as ApiOptions);

        if (typeof options.provider === 'string') {
            options.provider = new WsProvider(options.provider);
        }

        options.types = {...Types, ...options.types};

        super(options as ApiOptionsBase);
    }
}
