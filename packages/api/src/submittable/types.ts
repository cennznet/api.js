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

// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {AccountId, Address, EventRecord, ExtrinsicStatus, Hash} from '@plugnet/types/interfaces';
import {
    AnyNumber,
    AnyU8a,
    Callback,
    IExtrinsic,
    IExtrinsicEra,
    IKeyringPair,
    SignatureOptions,
} from '@plugnet/types/types';

import {Observable} from 'rxjs';

export interface SubmittableResultImpl {
    readonly events: EventRecord[];
    readonly status: ExtrinsicStatus;
    readonly isCompleted: boolean;
    readonly isError: boolean;
    readonly isFinalized: boolean;

    findRecord(section: string, method: string): EventRecord | undefined;
}

export interface SubmittableResultValue {
    events?: EventRecord[];
    status: ExtrinsicStatus;
}

export type SubmitableResultResult<ApiType> = ApiType extends 'rxjs'
    ? Observable<SubmittableResultImpl>
    : Promise<Hash>;

export type SubmitableResultSubscription<ApiType> = ApiType extends 'rxjs'
    ? Observable<SubmittableResultImpl>
    : Promise<() => void>;

export interface SignerOptions {
    blockHash: AnyU8a;
    era?: IExtrinsicEra | number;
    nonce: AnyNumber;
    tip?: AnyNumber;
}

export interface SubmittableExtrinsic<ApiType> extends IExtrinsic {
    send(): SubmitableResultResult<ApiType>;

    send(statusCb: Callback<SubmittableResultImpl>): SubmitableResultSubscription<ApiType>;

    sign(account: IKeyringPair, _options: Partial<SignatureOptions>): this;

    signAndSend(
        account: IKeyringPair | string | AccountId | Address,
        options?: Partial<SignerOptions>
    ): SubmitableResultResult<ApiType>;

    signAndSend(
        account: IKeyringPair | string | AccountId | Address,
        statusCb: Callback<SubmittableResultImpl>
    ): SubmitableResultSubscription<ApiType>;

    signAndSend(
        account: IKeyringPair | string | AccountId | Address,
        options: Partial<SignerOptions>,
        statusCb?: Callback<SubmittableResultImpl>
    ): SubmitableResultSubscription<ApiType>;
}
