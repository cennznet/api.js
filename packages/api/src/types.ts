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

import {DoughnutValue, FeeExchangeValue} from '@cennznet/types/extrinsic/Extrinsic';
import {DeriveCustom} from '@plugnet/api-derive';
import {SubmittableExtrinsic} from '@plugnet/api/SubmittableExtrinsic';
import {ApiOptions as ApiOptionsBase} from '@plugnet/api/types';
import {ProviderInterface} from '@plugnet/rpc-provider/types';
import {AccountId, Address} from '@plugnet/types';
import {MethodFunction} from '@plugnet/types/primitive/Method';
import {CodecArg, Constructor, RegistryTypes} from '@plugnet/types/types';
import BN from 'bn.js';

export interface ApiOptions extends Pick<ApiOptionsBase, Exclude<keyof ApiOptionsBase, 'provider'>> {
    /**
     * provider implement ProviderInterface or string url for WsProvider.
     * If not specified, it will default to connecting to the
     * localhost with the default port, i.e. `ws://127.0.0.1:9944`
     */
    provider?: ProviderInterface | string;
    plugins?: IPlugin[];
}

export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;

export interface ICennznetExtrinsic<CodecResult, SubscriptionResult>
    extends SubmittableExtrinsic<CodecResult, SubscriptionResult> {
    addDoughnut(doughnut: DoughnutValue): this;
    addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): this;
}

export interface IPlugin {
    injectName?: string;
    sdkClass?: Constructor<any>;
    sdkRxClass?: Constructor<any>;
    types?: RegistryTypes;
    derives?: DeriveCustom;
}

// override types in @plugnet/api to return ICennznetExtrinsic
export interface SubmittableExtrinsicFunction<CodecResult, SubscriptionResult>
    extends Pick<MethodFunction, 'callIndex' | 'meta' | 'method' | 'section' | 'toJSON'> {
    (...params: Array<CodecArg>): ICennznetExtrinsic<CodecResult, SubscriptionResult>;
}

export interface SubmittableModuleExtrinsics<CodecResult, SubscriptionResult> {
    [index: string]: SubmittableExtrinsicFunction<CodecResult, SubscriptionResult>;
}
export interface SubmittableExtrinsics<CodecResult, SubscriptionResult> {
    [index: string]: SubmittableModuleExtrinsics<CodecResult, SubscriptionResult>;
}
