import {ApiPromise} from '@polkadot/api';
import {ApiOptions as ApiOptionsBase} from '@polkadot/api/types';
import {ProviderInterface} from '@polkadot/rpc-provider/types';
import WsProvider from '@polkadot/rpc-provider/ws';
import {isFunction, isObject} from '@polkadot/util';
import {ApiOptions} from './types';

const Types = require('@cennznet/types');

export class Api extends ApiPromise {
    static async create(options: ApiOptions | ProviderInterface = {}): Promise<Api> {
        return new Api(options).isReady;
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
