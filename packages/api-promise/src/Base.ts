// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {ProviderInterface} from '@polkadot/rpc-provider/types';
import {ISigner} from 'cennznet-types';
import {ApiInterface$Events, SubmittableExtrinsics, QueryableStorage} from './types';

import EventEmitter from 'eventemitter3';
import Rpc from '@polkadot/rpc-core/index';
import extrinsicsFromMeta from '@polkadot/extrinsics/fromMetadata';
import {Storage} from '@polkadot/storage/types';
import storageFromMeta from '@polkadot/storage/fromMetadata';
import {Hash, Method, RuntimeVersion} from '@polkadot/types/index';
import Event from '@polkadot/types/Event';
import RuntimeMetadata from '@polkadot/types/Metadata';
import {Extrinsics} from '@polkadot/types/Method';
import {assert, isUndefined, logger} from '@polkadot/util';

type MetaDecoration = {
    callIndex?: Uint8Array;
    meta: any;
    method: string;
    section: string;
    toJSON: () => any;
};

const l = logger('api');

const INIT_ERROR = `Api needs to be initialised before using, listen on 'ready'`;

export default abstract class ApiBase {
    private _eventemitter: EventEmitter;
    protected _extrinsics?: SubmittableExtrinsics;
    protected _genesisHash?: Hash;
    protected _query?: QueryableStorage;
    protected _rpc: Rpc;
    protected _runtimeMetadata?: RuntimeMetadata;
    protected _runtimeVersion?: RuntimeVersion;
    protected _signer: ISigner;

    constructor(provider: ProviderInterface) {
        this._rpc = new Rpc(provider);
        this._eventemitter = new EventEmitter();

        this.init();
    }

    /**
     * @description Contains the genesis Hash of the attached chain. Apart from being useful to determine the actual chain, it can also be used to sign immortal transactions.
     */
    get genesisHash(): Hash {
        assert(!isUndefined(this._genesisHash), INIT_ERROR);

        return this._genesisHash as Hash;
    }

    /**
     * @description Yields the current attached runtime metadata. Generally this is only used to construct extrinsics & storage, but is useful for current runtime inspection.
     */
    get runtimeMetadata(): RuntimeMetadata {
        assert(!isUndefined(this._runtimeMetadata), INIT_ERROR);

        return this._runtimeMetadata as RuntimeMetadata;
    }

    /**
     * @description Contains the version information for the current runtime.
     */
    get runtimeVersion(): RuntimeVersion {
        assert(!isUndefined(this._runtimeVersion), INIT_ERROR);

        return this._runtimeVersion as RuntimeVersion;
    }

    /**
     * @description Contains all the chain state modules and their subsequent methods in the API. These are attached dynamically from the runtime metadata.
     *
     * All calls inside the namespace, is denoted by `section`.`method` and may take an optional query parameter. As an example, `api.query.timestamp.now()` (current block timestamp) does not take parameters, while `api.query.system.accountNonce(<accountId>)` (retrieving the associated nonce for an account), takes the `AccountId` as a parameter.
     *
     * @example
     * <BR>
     *
     * ```javascript
     * api.query.balances.freeBalance(<accountId>, (balance) => {
     *   console.log('new balance', balance);
     * });
     * ```
     */
    get query(): QueryableStorage {
        assert(!isUndefined(this._query), INIT_ERROR);

        return this._query;
    }

    /**
     * @description Contains all the extrinsic modules and their subsequent methods in the API. It allows for the construction of transactions and the submission thereof. These are attached dynamically from the runtime metadata.
     *
     * @example
     * <BR>
     *
     * ```javascript
     * api.tx.balances
     *   .transfer(<recipientId>, <balance>)
     *   .sign(<keyPair>, <accountNonce>, <blockHash (optional)>)
     *   .send((status) => {
     *     console.log('tx status', status);
     *   });
     * ```
     */
    get tx(): Extrinsics {
        assert(!isUndefined(this._extrinsics), INIT_ERROR);

        return this._extrinsics;
    }

    get rpc(): Rpc {
        return this._rpc;
    }

    get signer(): ISigner {
        return this._signer;
    }

    public setSigner(signer: ISigner) {
        this._signer = signer;
    }

    /**
     * @description Attach an eventemitter handler to listen to a specific event
     *
     * @param type The type of event to listen to. Available events are `connected`, `disconnected` and `ready`
     * @param handler The callback to be called when the event fires. Depending on the event type, it could fire with additional arguments.
     *
     * @example
     * <BR>
     *
     * ```javascript
     * api.on('disconnected', () => {
     *   console.log('API has been connected to the endpoint');
     * });
     *
     * api.on('disconnected', () => {
     *   console.log('API has been disconnected from the endpoint');
     * });
     * ```
     */
    on(type: ApiInterface$Events, handler: (...args: Array<any>) => any): void {
        this._eventemitter.on(type, handler);
    }

    protected emit(type: ApiInterface$Events, ...args: Array<any>): void {
        this._eventemitter.emit(type, ...args);
    }

    private init(): void {
        let isReady: boolean = false;

        this.rpc._provider.on('disconnected', () => {
            this.emit('disconnected');
        });

        this.rpc._provider.on('connected', async () => {
            this.emit('connected');

            // TODO When re-connected (i.e. disconnected and then connected), we want to do a couple of things
            //   - refresh metadata as needed, decorating again
            //   - need to refresh genesisHash, extrinsic resub only when it matches
            if (isReady) {
                return;
            }

            const hasMeta = await this.loadMeta();

            if (hasMeta && !isReady) {
                isReady = true;

                this.emit('ready', this);
            }
        });
    }

    private async loadMeta(): Promise<boolean> {
        try {
            this._runtimeMetadata = await this.rpc.state.getMetadata();
            this._runtimeVersion = await this.rpc.chain.getRuntimeVersion();
            this._genesisHash = await this.rpc.chain.getBlockHash(0);

            const extrinsics = extrinsicsFromMeta(this.runtimeMetadata);
            const storage = storageFromMeta(this.runtimeMetadata);

            this._extrinsics = this.decorateExtrinsics(extrinsics);
            this._query = this.decorateStorage(storage);

            Event.injectMetadata(this.runtimeMetadata);
            Method.injectExtrinsics(extrinsics);

            return true;
        } catch (error) {
            l.error('loadMeta', error);

            return false;
        }
    }

    protected decorateFunctionMeta(input: MetaDecoration, output: MetaDecoration): MetaDecoration {
        output.meta = input.meta;
        output.method = input.method;
        output.section = input.section;
        output.toJSON = input.toJSON;

        if (input.callIndex) {
            output.callIndex = input.callIndex;
        }

        return output;
    }

    protected abstract decorateExtrinsics(extrinsics: Extrinsics): SubmittableExtrinsics;
    protected abstract decorateStorage(storage: Storage): QueryableStorage;
}
