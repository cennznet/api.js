// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import WsProvider from '@polkadot/rpc-provider/ws';
import {TypeRegistry} from '@polkadot/types/codec/typeRegistry';
import {ModulesWithMethods} from '@polkadot/types/Method';
import {Constructor} from '@polkadot/types/types';
import {ApiOptions, ISigner} from 'cennznet-types';
import {ApiInterface$Events, SubmittableExtrinsics, QueryableStorage} from './types';

import EventEmitter from 'eventemitter3';
import Rpc from '@polkadot/rpc-core/index';
import extrinsicsFromMeta from '@polkadot/extrinsics/fromMetadata';
import {Storage} from '@polkadot/storage/types';
import storageFromMeta from '@polkadot/storage/fromMetadata';
import {Hash, Method, RuntimeVersion, Metadata} from '@polkadot/types/index';
import Event from '@polkadot/types/Event';
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
    protected _runtimeMetadata?: Metadata;
    protected _runtimeVersion?: RuntimeVersion;
    protected _signer: ISigner;

    constructor(option: ApiOptions = {}) {
        let provider = option.provider;
        if (typeof provider === 'string') {
            provider = new WsProvider(provider);
        }
        this._rpc = new Rpc(provider);
        this._eventemitter = new EventEmitter();

        this.init(option);
    }

    /**
     * @description Contains the genesis Hash of the attached chain. Apart from being useful to determine the actual chain, it can also be used to sign immortal transactions.
     */
    get genesisHash(): Hash {
        assert(!isUndefined(this._genesisHash), INIT_ERROR);

        return this._genesisHash as Hash;
    }

    /**
     * @description `true` when subscriptions are supported
     */
    get hasSubscriptions(): boolean {
        return this._rpc._provider.hasSubscriptions;
    }

    /**
     * @description Yields the current attached runtime metadata. Generally this is only used to construct extrinsics & storage, but is useful for current runtime inspection.
     */
    get runtimeMetadata(): Metadata {
        assert(!isUndefined(this._runtimeMetadata), INIT_ERROR);

        return this._runtimeMetadata as Metadata;
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
    get tx(): SubmittableExtrinsics {
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
    on(type: ApiInterface$Events, handler: (...args: Array<any>) => any): this {
        this._eventemitter.on(type, handler);
        return this;
    }

    /**
     * @description Attach an one-time eventemitter handler to listen to a specific event
     *
     * @param type The type of event to listen to. Available events are `connected`, `disconnected`, `ready` and `error`
     * @param handler The callback to be called when the event fires. Depending on the event type, it could fire with additional arguments.
     *
     * @example
     * <BR>
     *
     * ```javascript
     * api.once('connected', () => {
     *   console.log('API has been connected to the endpoint');
     * });
     *
     * api.once('disconnected', () => {
     *   console.log('API has been disconnected from the endpoint');
     * });
     * ```
     */
    once(type: ApiInterface$Events, handler: (...args: Array<any>) => any): this {
        this._eventemitter.once(type, handler);
        return this;
    }

    protected emit(type: ApiInterface$Events, ...args: Array<any>): void {
        this._eventemitter.emit(type, ...args);
    }

    private init(option: ApiOptions): void {
        let isReady: boolean = false;
        this.loadRuntimeTypes(option.additionalTypes);

        this.rpc._provider.on('disconnected', () => {
            this.emit('disconnected');
        });

        this.rpc._provider.on('error', error => {
            this.emit('error', error);
        });

        this.rpc._provider.on('connected', async () => {
            this.emit('connected');

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

            const extrinsics = extrinsicsFromMeta(this.runtimeMetadata.asV0);
            const storage = storageFromMeta(this.runtimeMetadata.asV0);

            this._extrinsics = this.decorateExtrinsics(extrinsics);
            this._query = this.decorateStorage(storage);

            Event.injectMetadata(this.runtimeMetadata.asV0);
            Method.injectMethods(extrinsics);

            return true;
        } catch (error) {
            l.error('loadMeta', error);

            return false;
        }
    }

    private loadRuntimeTypes(additionalTypes: {[name: string]: Constructor} = {}): void {
        const Types = require('cennznet-runtime-types');
        TypeRegistry.defaultRegistry.register({...Types, ...additionalTypes});
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

    protected abstract decorateExtrinsics(extrinsics: ModulesWithMethods): SubmittableExtrinsics;
    protected abstract decorateStorage(storage: Storage): QueryableStorage;
}
