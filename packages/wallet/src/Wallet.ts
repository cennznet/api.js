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

import {SignerPayloadJSON} from '@cennznet/types/extrinsic/SignerPayload';
import {Signer, SignerResult} from '@plugnet/api/types';
import {createType} from '@plugnet/types';
import {u8aToHex} from '@plugnet/util';
import {Wallet as Base} from '@plugnet/wallet';
import {requireUnlocked, waitForCryptoReady} from '@plugnet/wallet/decorators';
import {IWallet, WalletOption} from '@plugnet/wallet/types';
import {HDKeyring} from './keyrings/HDKeyring';

/**
 * a Wallet implementation which can be used as signer in cennznet-api
 * support multi-keyring and shipped with a HD Keyring as default keyring type.
 */
export class Wallet extends Base implements Signer, IWallet {
    constructor(option: WalletOption = {}) {
        const opt = {...option};
        opt.keyringTypes = option.keyringTypes || [HDKeyring];
        super(option);
    }

    /**
     * sign a extrinsic payload (for the new Signer interface)
     * @param extrinsic
     * @param opt
     * @requires wallet unlocked
     * @throws when the account is not managed by the wallet.
     */
    @requireUnlocked
    @waitForCryptoReady
    async signPayload(payload: SignerPayloadJSON): Promise<SignerResult> {
        const {address, version} = payload;
        const hexPayload = u8aToHex(createType('ExtrinsicPayload', payload, {version}).toU8a(true));
        return this.signRaw({type: 'payload', data: hexPayload, address});
    }
}
