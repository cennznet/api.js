import {ApiRx as ApiRxBase} from '@polkadot/api';
import {ApiOptions as ApiOptionsBase} from '@polkadot/api/types';
import {ProviderInterface} from '@polkadot/rpc-provider/types';
import WsProvider from '@polkadot/rpc-provider/ws';
import {isFunction, isObject} from '@polkadot/util';
import {Observable} from 'rxjs';
import * as derives from './derives';
import {ApiOptions} from './types';

const Types = require('@cennznet/types');

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
        options.derives = {...derives, ...options.derives};

        super(options as ApiOptionsBase);
    }
}
