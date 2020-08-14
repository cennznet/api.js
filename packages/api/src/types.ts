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

import type BN from 'bn.js';
import {Observable} from 'rxjs';

// Augment the modules
import '@cennznet/api/augment';

import {Constants} from '@polkadot/metadata/Decorated/types';
import {RpcInterface} from '@polkadot/rpc-core/types';
import {ProviderInterface, ProviderInterfaceEmitted} from '@polkadot/rpc-provider/types';
import {Metadata, u64} from '@polkadot/types';
import {AccountId, Address, Hash, RuntimeVersion} from '@polkadot/types/interfaces';
import {
  AnyFunction,
  AnyNumber,
  AnyU8a,
  CallBase,
  DefinitionRpc,
  DefinitionRpcSub, IExtrinsicEra,
  ISubmittableResult,
  RegisteredTypes,
  Registry,
  Signer
} from '@polkadot/types/types';
import {DeriveAllSections} from '@polkadot/api/util/decorate';
import {DecoratedRpc} from '@polkadot/api/types/rpc';
import {QueryableStorage, QueryableStorageMulti} from '@polkadot/api/types/storage';
import {
  UnsubscribePromise,
} from '@polkadot/api/types';
import {StorageEntry} from '@polkadot/types/primitive/StorageKey';

import {DeriveCustom, ExactDerive} from '@cennznet/api-derive';
import {ChargeTransactionPayment} from '@cennznet/types';
import {
  Callback,
  Codec,
  CodecArg,
  Constructor,
  IExtrinsic as IExtrinsicBase,
  IKeyringPair,
  RegistryTypes,
  SignatureOptions,
} from '@cennznet/types/types';
import ApiBase from './base';
import {SubmittableExtrinsic, SubmittableExtrinsics} from '@cennznet/api/submittable'

export {Signer, SignerResult} from '@polkadot/types/types';
export * from './submittable/types';
export * from '@polkadot/api/types/base';
export * from '@polkadot/api/types/rpc';
export * from '@polkadot/api/types/storage';

export {default as ApiBase} from './base';

export type ApiTypes = 'promise' | 'rxjs';

export type AnyDerive = Record<string, Record<string, AnyFunction>>;

export interface ApiOptionsBase extends RegisteredTypes {
  /**
   * @description Add custom derives to be injected
   */
  derives?: DeriveCustom;
  /**
   * @description Control the initialization of the wasm libraries. When not specified, it defaults to `true`, initializing the wasm libraries, set to `false` to not initialize wasm. (No sr25519 support)
   */
  initWasm?: boolean;
  /**
   * @description pre-bundles is a map of 'genesis hash and runtime spec version' as key to a metadata hex string
   * if genesis hash and runtime spec version matches, then use metadata, else fetch it from chain
   */
  metadata?: Record<string, string>;
  /**
   * @description Transport Provider from rpc-provider. If not specified, it will default to
   * connecting to a WsProvider connecting localhost with the default port, i.e. `ws://127.0.0.1:9944`
   */
  provider?: ProviderInterface;
  /**
   * @description A type registry to use along with this instance
   */
  registry?: Registry;
  /**
   * @description User-defined RPC methods
   */
  rpc?: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>>;
  /**
   * @description An external signer which will be used to sign extrinsic when account passed in is not KeyringPair
   */
  signer?: Signer;
  /**
   * @description The source object to use for runtime information (only used when cloning)
   */
  source?: ApiBase<any>;
}

// A smaller interface of ApiRx, used in derive and in SubmittableExtrinsic
export interface ApiInterfaceRx {
  consts: Constants;
  // TODO This needs to be typed correctly
  derive: DeriveAllSections<'rxjs', ExactDerive>;
  extrinsicType: number;
  genesisHash?: Hash;
  hasSubscriptions: boolean;
  registry: Registry;
  runtimeMetadata: Metadata;
  runtimeVersion?: RuntimeVersion;
  query: QueryableStorage<'rxjs'>;
  queryMulti: QueryableStorageMulti<'rxjs'>;
  rpc: DecoratedRpc<'rxjs', RpcInterface>;
  tx: SubmittableExtrinsics<'rxjs'>;
  signer?: Signer;
}

export type ApiInterfaceEvents = ProviderInterfaceEmitted | 'ready';

export interface ApiOptions extends Pick<ApiOptionsBase, Exclude<keyof ApiOptionsBase, 'provider'>> {
  /**
   * provider implement ProviderInterface or string url for WsProvider.
   * If not specified, it will default to connecting to the
   * localhost with the default port, i.e. `ws://127.0.0.1:9944`
   */
  provider?: ProviderInterface | string;
  plugins?: IPlugin[];
  /**
   * timeout for Api.create
   * default 10000 ms, 0 indicates no limit
   */
  timeout?: number;
}

export interface IPlugin {
  injectName?: string;
  sdkClass?: Constructor<any>;
  sdkRxClass?: Constructor<any>;
  types?: RegistryTypes;
  derives?: DeriveCustom;
}

export interface IExtrinsic extends IExtrinsicBase {
  sign(account: IKeyringPair, options: SignatureOptions): IExtrinsic;
}

export type Derives<ApiType extends ApiTypes, AllSections extends AnyDerive> = ReturnType<ApiBase<ApiType>['_decorateDerive']> & DeriveAllSections<ApiType, AllSections>;

interface StorageEntryBase<C, H, U> {
  at: (hash: Hash | Uint8Array | string, arg1?: CodecArg, arg2?: CodecArg) => C;
  creator: StorageEntry;
  hash: (arg1?: CodecArg, arg2?: CodecArg) => H;
  key: (arg1?: CodecArg, arg2?: CodecArg) => string;
  size: (arg1?: CodecArg, arg2?: CodecArg) => U;
}

export interface StorageEntryObservable<T extends Codec>
  extends StorageEntryBase<Observable<T>, Observable<Hash>, Observable<u64>> {
  (arg1?: CodecArg, arg2?: CodecArg): Observable<T>;

  multi: (args: (CodecArg[] | CodecArg)[]) => Observable<T[]>;
}

export interface StorageEntryPromiseOverloads<T extends Codec> {
  (arg1?: CodecArg, arg2?: CodecArg): Promise<T>;

  (callback: Callback<T>): UnsubscribePromise;

  (arg: CodecArg, callback: Callback<T>): UnsubscribePromise;

  (arg1: CodecArg, arg2: CodecArg, callback: Callback<T>): UnsubscribePromise;
}

export interface StorageEntryPromiseMulti<T extends Codec> {
  (args: (CodecArg[] | CodecArg)[]): Promise<T[]>;

  (args: (CodecArg[] | CodecArg)[], callback: Callback<T[]>): UnsubscribePromise;
}

export interface StorageEntryPromise<T extends Codec>
  extends StorageEntryBase<Promise<T>, Promise<Hash>, Promise<u64>>,
    StorageEntryPromiseOverloads<T> {
  multi: StorageEntryPromiseMulti<T>;
}

export declare type QueryableStorageEntry<ApiType, T extends Codec> = ApiType extends 'rxjs'
  ? StorageEntryObservable<T>
  : StorageEntryPromise<T>;

export interface AugmentedSubmittables<ApiType extends ApiTypes> {
}

export declare type AugmentedSubmittable<T extends AnyFunction> = T & CallBase;

export interface SubmittableExtrinsicFunction<ApiType extends ApiTypes> extends CallBase {
  (...params: any[]): SubmittableExtrinsic<ApiType>;
}

export interface SubmittableModuleExtrinsics<ApiType extends ApiTypes> {
  [index: string]: SubmittableExtrinsicFunction<ApiType>;
}
