import {AnyNumber, AnyU8a, Constructor} from '@polkadot/types/types';
import {ProviderInterface} from '@polkadot/rpc-provider/types';
import {ApiOptions as ApiOptionsBase} from '@polkadot/api/types';

export {Encryptor, IKeyring, IWallet} from './wallet';

export interface TxOpt {
    from: string;
    nonce?: AnyNumber;
    blockHash?: AnyU8a;
}

export interface ApiOptions extends Pick<ApiOptionsBase, Exclude<keyof ApiOptionsBase, 'provider'>> {
    /**
     * provider implement ProviderInterface or string url for WsProvider.
     * If not specified, it will default to connecting to the
     * localhost with the default port, i.e. `ws://127.0.0.1:9944`
     */
    provider?: ProviderInterface | string;
}

export type Newable<T> = {
    name: string;
    new (...args: any[]): T;
};

export function staticImplements<T>() {
    return (constructor: T) => {};
}
