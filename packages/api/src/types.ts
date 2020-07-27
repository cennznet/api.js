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

import {DecoratedCennznetDerive} from '@cennznet/api/derives';
import {DoughnutValue, FeeExchangeValue} from '@cennznet/types/extrinsic/types';
import {
  AnyAddress,
  Callback,
  CallFunction,
  Codec,
  CodecArg,
  Constructor,
  IExtrinsic as IExtrinsicBase,
  IKeyringPair,
  RegistryTypes,
  SignatureOptions,
} from '@cennznet/types/types';
import {DeriveCustom} from '@polkadot/api-derive';
import ApiBase from '@polkadot/api/base';
import {
  ApiOptions as ApiOptionsBase,
  SignerOptions as SignerOptionsBase,
  SubmittableExtrinsic,
  SubmittableResultResult,
  SubmittableResultSubscription,
  UnsubscribePromise,
} from '@polkadot/api/types';

import {ChargeTransactionPayment} from '@cennznet/types';
import {ProviderInterface} from '@polkadot/rpc-provider/types';
import {u64} from '@polkadot/types';
import {AccountId, Address, Hash} from '@polkadot/types/interfaces';
import {StorageEntry} from '@polkadot/types/primitive/StorageKey';
import {Observable} from 'rxjs';

export * from '@polkadot/api/types';
export type ApiTypes = 'promise' | 'rxjs';

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

export interface SignerOptions extends SignerOptionsBase {
  doughnut?: DoughnutValue;
  transactionPayment?: ChargeTransactionPayment;
}

export interface IExtrinsic extends IExtrinsicBase {
  sign(account: IKeyringPair, options: SignatureOptions): IExtrinsic;
}

export type Derives<ApiType extends ApiTypes> = ReturnType<ApiBase<ApiType>['decorateDerive']> &
  DecoratedCennznetDerive<ApiType>;

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
