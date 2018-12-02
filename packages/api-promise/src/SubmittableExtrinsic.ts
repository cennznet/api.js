// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {KeyringPair} from '@polkadot/keyring/types';
import {AnyNumber, AnyU8a} from '@polkadot/types/types';

import {Extrinsic, ExtrinsicStatus, Hash} from '@polkadot/types/index';
import {TxOpt} from 'cennznet-types';
import {Api} from './Api';

export default class SubmittableExtrinsic extends Extrinsic {
    private _api: Api;

    constructor(api: Api, extrinsic: Extrinsic) {
        super(extrinsic);

        this._api = api;
    }

    public async send(txOpt?: TxOpt, statusCb?: (status: ExtrinsicStatus) => any): Promise<Hash> {
        if (!this.isSigned) {
            if (!txOpt) {
                throw new Error('txOpt is required for signing extrinsic');
            }
            let nonce: AnyNumber = txOpt.nonce;
            if (!nonce) {
                try {
                    nonce = (await this._api.query.system.accountNonce(txOpt.from)).toString();
                } catch (e) {
                    throw new Error('Failed to fetch nonce for account: ' + txOpt.from);
                }
            }
            const genesisHash = txOpt.genesisHash || this._api.genesisHash;
            await this._api.wallet.sign(this, {...txOpt, nonce, genesisHash});
        }
        if (statusCb) {
            return this._api.rpc.author.submitAndWatchExtrinsic(this, statusCb);
        }

        return this._api.rpc.author.submitExtrinsic(this);
    }

    public sign(signerPair: KeyringPair, nonce: AnyNumber, blockHash?: AnyU8a): SubmittableExtrinsic {
        super.sign(signerPair, nonce, blockHash || this._api.genesisHash);

        return this;
    }
}
