import {ProviderInterface} from '@polkadot/rpc-provider/types';
import WsProvider from '@polkadot/rpc-provider/ws';
import {Storage} from '@polkadot/storage/types';
import ApiBase from './Base';
import SubmittableExtrinsic from './SubmittableExtrinsic';
import {
    QueryableModuleStorage,
    QueryableStorage,
    QueryableStorageFunction,
    SubmittableExtrinsicFunction,
    SubmittableExtrinsics,
    SubmittableModuleExtrinsics,
} from './types';
import {StorageFunction} from '@polkadot/types/StorageKey';
import {Codec} from '@polkadot/types/types';
import {isFunction} from '@polkadot/util';
import {Extrinsics, ExtrinsicFunction} from '@polkadot/types/Method';

export class Api extends ApiBase {
    private readonly _isReady: Promise<Api>;

    static create(providerOrUrl?: ProviderInterface | string): Promise<Api> {
        if (typeof providerOrUrl === 'string') {
            return new Api(new WsProvider(providerOrUrl)).isReady;
        }
        return new Api(providerOrUrl).isReady;
    }

    constructor(provider: ProviderInterface) {
        super(provider);

        this._isReady = new Promise(resolveReady => this.on('ready', () => resolveReady(this)));
    }

    get isReady(): Promise<Api> {
        return this._isReady;
    }

    protected decorateExtrinsics(extrinsics: Extrinsics): SubmittableExtrinsics {
        return Object.keys(extrinsics).reduce(
            (result, sectionName) => {
                const section = extrinsics[sectionName];

                result[sectionName] = Object.keys(section).reduce(
                    (result, methodName) => {
                        result[methodName] = this.decorateExtrinsicEntry(section[methodName]);

                        return result;
                    },
                    {} as SubmittableModuleExtrinsics
                );

                return result;
            },
            {} as SubmittableExtrinsics
        );
    }

    private decorateExtrinsicEntry(method: ExtrinsicFunction): SubmittableExtrinsicFunction {
        const decorated: any = (...args: Array<any>): SubmittableExtrinsic =>
            new SubmittableExtrinsic(this, method(...args));

        return this.decorateFunctionMeta(method, decorated) as SubmittableExtrinsicFunction;
    }

    protected decorateStorage(storage: Storage): QueryableStorage {
        return Object.keys(storage).reduce(
            (result, sectionName) => {
                const section = storage[sectionName];

                result[sectionName] = Object.keys(section).reduce(
                    (result, methodName) => {
                        result[methodName] = this.decorateStorageEntry(section[methodName]);

                        return result;
                    },
                    {} as QueryableModuleStorage
                );

                return result;
            },
            {} as QueryableStorage
        );
    }

    private decorateStorageEntry(method: StorageFunction): QueryableStorageFunction {
        const decorated: any = (...args: Array<any>): Promise<Codec | null | undefined> => {
            if (args.length === 0 || !isFunction(args[args.length - 1])) {
                return this.rpc.state.getStorage([method, args[0]]);
            }

            return this.rpc.state.subscribeStorage(
                [[method, args.length === 1 ? undefined : args[0]]],
                (result: Array<Codec | null | undefined> = []) => args[args.length - 1](result[0])
            );
        };

        return this.decorateFunctionMeta(method, decorated) as QueryableStorageFunction;
    }
}
