/* eslint-disable no-dupe-class-members */
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

import {
    AccountId,
    Address,
    Call,
    EventRecord,
    Extrinsic,
    ExtrinsicEra,
    ExtrinsicStatus,
    Hash,
    Header,
    Index,
} from '@plugnet/types/interfaces';
import {Callback, Codec, Constructor, IKeyringPair, SignatureOptions} from '@plugnet/types/types';
import {ApiInterfaceRx, ApiTypes, SignerResult} from '../types';
import {
    SignerOptions,
    SubmitableResultResult,
    SubmitableResultSubscription,
    SubmittableExtrinsic,
    SubmittableResultImpl,
} from './types';

import {ClassOf, createType, Vec} from '@plugnet/types';
import {isBn, isFunction, isNumber, isUndefined} from '@plugnet/util';
import {combineLatest, Observable, of} from 'rxjs';
import {first, map, mergeMap, switchMap, tap} from 'rxjs/operators';

//import ApiBase from '../base1';
import ApiBase from '@plugnet/api/base';
import SubmittableResult from './Result';
import {filterEvents, isKeyringPair} from './util';

interface SubmittableOptions<ApiType> {
    api: ApiInterfaceRx;
    decorateMethod: ApiBase<ApiType>['decorateMethod'];
    type: ApiTypes;
}

// The default for 6s allowing for 5min eras. When translating this to faster blocks -
//   - 4s = (10 / 15) * 5 = 3.33m
//   - 2s = (10 / 30) * 5 = 1.66m
const BLOCKTIME = 6;
const MIN = 60;
const ONE_MINUTE = MIN / BLOCKTIME;
const LEN = 5;
const DEFAULT_MORTAL_LENGTH = LEN * ONE_MINUTE;

const _Extrinsic: Constructor<Extrinsic> = ClassOf('Extrinsic');

export default class Submittable<ApiType> extends _Extrinsic implements SubmittableExtrinsic<ApiType> {
    private readonly _api: ApiInterfaceRx;

    private readonly _decorateMethod: ApiBase<ApiType>['decorateMethod'];

    private readonly _ignoreStatusCb: boolean;

    constructor(extrinsic: Call | Uint8Array | string, {api, decorateMethod, type}: SubmittableOptions<ApiType>) {
        super(extrinsic, {version: api.extrinsicType});

        this._api = api;
        this._decorateMethod = decorateMethod;
        this._ignoreStatusCb = type === 'rxjs';
    }

    // sign a transaction, returning the this to allow cianing, i.e. .sign(...).send()
    sign(account: IKeyringPair, optionsOrNonce: Partial<SignerOptions>): this {
        // NOTE here we actually override nonce if it was specified (backwards compat for
        // the previous signature - don't let userspace break, but allow then time to upgrade)
        const options: Partial<SignerOptions> =
            isBn(optionsOrNonce) || isNumber(optionsOrNonce) ? {nonce: optionsOrNonce} : optionsOrNonce;

        super.sign(account, this._makeSignOptions(options, {}));

        return this;
    }

    // signAndSend with an immediate Hash result
    signAndSend(
        account: IKeyringPair | string | AccountId | Address,
        options?: Partial<SignerOptions>
    ): SubmitableResultResult<ApiType>;

    // signAndSend with a subscription, i.e. callback provided
    signAndSend(
        account: IKeyringPair | string | AccountId | Address,
        statusCb: Callback<SubmittableResultImpl>
    ): SubmitableResultSubscription<ApiType>;

    // signAndSend with options and a callback
    signAndSend(
        account: IKeyringPair | string | AccountId | Address,
        options: Partial<SignerOptions>,
        statusCb?: Callback<SubmittableResultImpl>
    ): SubmitableResultSubscription<ApiType>;

    // signAndSend implementation for all 3 cases above
    signAndSend(
        account: IKeyringPair | string | AccountId | Address,
        optionsOrStatus?: Partial<SignerOptions> | Callback<SubmittableResultImpl>,
        optionalStatusCb?: Callback<SubmittableResultImpl>
    ): SubmitableResultResult<ApiType> | SubmitableResultSubscription<ApiType> {
        const [options, statusCb] = this._makeSignAndSendOptions(optionsOrStatus, optionalStatusCb);
        const isSubscription = this._ignoreStatusCb || !!statusCb;
        const address = isKeyringPair(account) ? account.address : account.toString();
        let updateId: number | undefined;

        return this._decorateMethod(
            (): Observable<Codec> =>
                this._getPrelimState(address, options).pipe(
                    first(),
                    mergeMap(
                        async ([nonce, header]): Promise<void> => {
                            const eraOptions = this._makeEraOptions(options, {header, nonce});

                            if (isKeyringPair(account)) {
                                this.sign(account, eraOptions);
                            } else {
                                updateId = await this._signViaSigner(address, eraOptions, header);
                            }
                        }
                    ),
                    switchMap((): Observable<SubmittableResultImpl> | Observable<Hash> => {
                        return isSubscription ? this._subscribeObservable(updateId) : this._sendObservable(updateId);
                    })
                ) as Observable<Codec> // FIXME This is wrong, SubmittableResult is _not_ a codec
        )(statusCb) as SubmitableResultResult<ApiType> | SubmitableResultSubscription<ApiType>;
    }

    // send with an immediate Hash result
    send(): SubmitableResultResult<ApiType>;

    // send with a status callback
    send(statusCb: Callback<SubmittableResultImpl>): SubmitableResultSubscription<ApiType>;

    // send implementation for both immediate Hash and statusCb variants
    send(
        statusCb?: Callback<SubmittableResultImpl>
    ): SubmitableResultResult<ApiType> | SubmitableResultSubscription<ApiType> {
        const isSubscription = this._ignoreStatusCb || !!statusCb;

        return this._decorateMethod(isSubscription ? this._subscribeObservable : this._sendObservable)(statusCb);
    }

    private _makeSignAndSendOptions(
        optionsOrStatus?: Partial<SignerOptions> | Callback<SubmittableResultImpl>,
        statusCb?: Callback<SubmittableResultImpl>
    ): [Partial<SignerOptions>, Callback<SubmittableResultImpl>?] {
        let options: Partial<SignerOptions> = {};
        let statusCbNew;
        if (isFunction(optionsOrStatus)) {
            statusCbNew = optionsOrStatus;
        } else {
            options = {...optionsOrStatus};
        }

        return [options, statusCbNew];
    }

    private async _signViaSigner(
        address: string,
        optionsWithEra: SignatureOptions,
        header: Header | null
    ): Promise<number> {
        if (!this._api.signer) {
            throw new Error('no signer attached');
        }

        const payload = createType('SignerPayload', {
            ...optionsWithEra,
            address,
            method: this.method,
            blockNumber: header ? header.number : 0,
        });
        let result: SignerResult;

        if (this._api.signer.signPayload) {
            result = await this._api.signer.signPayload(payload.toPayload());
        } else if (this._api.signer.signRaw) {
            result = await this._api.signer.signRaw(payload.toRaw());
        } else {
            throw new Error('Invalid signer interface, it should implement either signPayload or signRaw (or both)');
        }

        // Here we explicitly call `toPayload()` again instead of working with an object
        // (reference) as passed to the signer. This means that we are sure that the
        // payload data is not modified from our inputs, but the signer
        super.addSignature(address, result.signature, payload.toPayload());

        return result.id;
    }

    private _makeSignOptions(
        options: Partial<SignerOptions>,
        extras: {blockHash?: Hash; era?: ExtrinsicEra; nonce?: Index}
    ): SignatureOptions {
        return ({
            blockHash: this._api.genesisHash,
            ...options,
            ...extras,
            genesisHash: this._api.genesisHash,
            runtimeVersion: this._api.runtimeVersion,
            version: this._api.extrinsicType,
        } as unknown) as SignatureOptions;
    }

    private _makeEraOptions(
        options: Partial<SignerOptions>,
        {header, nonce}: {header: Header | null; nonce: Index}
    ): SignatureOptions {
        if (!header) {
            if (isNumber(options.era)) {
                // since we have no header, it is immortal, remove any option overrides
                // so we only supply the genesisHash and no era to the construction
                delete options.era;
                delete options.blockHash;
            }

            return this._makeSignOptions(options, {nonce});
        }

        return this._makeSignOptions(options, {
            blockHash: header.hash,
            era: createType('ExtrinsicEra', {
                current: header.number,
                period: options.era || DEFAULT_MORTAL_LENGTH,
            }),
            nonce,
        });
    }

    private _getPrelimState(address: string, options: Partial<SignerOptions>): Observable<[Index, Header | null]> {
        return combineLatest([
            // if we have a nonce already, don't retrieve the latest, use what is there
            isUndefined(options.nonce)
                ? this._api.query.system.accountNonce<Index>(address)
                : of(createType('Index', options.nonce)),
            // if we have an era provided already or eraLength is <= 0 (immortal)
            // don't get the latest block, just pass null, handle in mergeMap
            isUndefined(options.era) || (isNumber(options.era) && options.era > 0)
                ? this._api.rpc.chain.getHeader()
                : of(null),
        ]);
    }

    private _updateSigner(updateId: number, status: Hash | SubmittableResultImpl): void {
        if (updateId !== -1 && this._api.signer && this._api.signer.update) {
            this._api.signer.update(updateId, status);
        }
    }

    private _statusObservable(status: ExtrinsicStatus): Observable<SubmittableResultImpl> {
        if (!status.isFinalized) {
            return of(new SubmittableResult({status}));
        }

        const blockHash = status.asFinalized;

        return combineLatest([
            this._api.rpc.chain.getBlock(blockHash),
            this._api.query.system.events.at(blockHash) as Observable<Vec<EventRecord>>,
        ]).pipe(
            map(
                ([signedBlock, allEvents]): SubmittableResultImpl =>
                    new SubmittableResult({
                        events: filterEvents(this.hash, signedBlock, allEvents),
                        status,
                    })
            )
        );
    }

    private _sendObservable = (updateId = -1): Observable<Hash> => {
        return this._api.rpc.author.submitExtrinsic(this).pipe(
            tap((hash): void => {
                this._updateSigner(updateId, hash);
            })
        );
    };

    private _subscribeObservable = (updateId = -1): Observable<SubmittableResultImpl> => {
        return this._api.rpc.author.submitAndWatchExtrinsic(this).pipe(
            switchMap((status): Observable<SubmittableResultImpl> => this._statusObservable(status)),
            tap((status): void => {
                this._updateSigner(updateId, status);
            })
        );
    };
}
