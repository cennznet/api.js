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

import {KeyringPair, KeyringPair$Json, KeyringPair$Meta} from '@cennznet/util/types';
import {Keyring} from '@plugnet/keyring';
import {KeypairType} from '@plugnet/util-crypto/types';
import {generateMnemonic} from 'bip39';
import {DEFAULT_KEYRING_TYPE} from '../constants';
import {waitForCryptoReady} from '../decorators';
import {IKeyring} from '../types';

type SerializedSimpleKeyring = KeyringPair$Json[];

/**
 * a Simple Keyring implementation of ${IKeyring} can be used to manage individual key pairs
 */
export class SimpleKeyring implements IKeyring<SerializedSimpleKeyring> {
    @waitForCryptoReady
    static async generate(): Promise<SimpleKeyring> {
        return new SimpleKeyring();
    }

    private _keyring = new Keyring({type: DEFAULT_KEYRING_TYPE});

    constructor(opt?: SerializedSimpleKeyring) {
        if (opt) {
            this._deserialize(opt);
        }
    }

    async serialize(): Promise<SerializedSimpleKeyring> {
        return (await this.getPairs()).map(pair => pair.toJson());
    }

    @waitForCryptoReady
    async deserialize(data: SerializedSimpleKeyring): Promise<this> {
        this._deserialize(data);
        return this;
    }

    @waitForCryptoReady
    async addPair(pair?: KeyringPair): Promise<KeyringPair> {
        if (pair === undefined) {
            return this._keyring.addFromMnemonic(generateMnemonic());
        } else {
            if (pair.isLocked) {
                throw new Error('key pair is locked. unlock before add it into wallet');
            }
            return this._keyring.addPair(pair);
        }
    }

    async getAddresses(): Promise<string[]> {
        return this._keyring.getPairs().map(kp => kp.address);
    }

    async getPair(address: string): Promise<KeyringPair> {
        return this._keyring.getPair(address);
    }

    async getPairs(): Promise<KeyringPair[]> {
        return this._keyring.getPairs();
    }

    async removePair(address: string): Promise<void> {
        this._keyring.removePair(address);
    }

    addFromJson(pair: KeyringPair$Json, ignoreChecksum?: boolean, passphrase?: string): KeyringPair {
        let keyPair: KeyringPair;
        if (ignoreChecksum === undefined || ignoreChecksum === null) {
            keyPair = this._keyring.addFromJson(pair);
        } else {
            keyPair = this._keyring.addFromJson(pair, ignoreChecksum);
        }
        try {
            keyPair.decodePkcs8(passphrase);
        } catch (e) {
            this._keyring.removePair(pair.address);
            throw e;
        }
        return keyPair;
    }

    addFromMnemonic(
        mnemonic: string,
        meta: KeyringPair$Meta = {},
        type: KeypairType = DEFAULT_KEYRING_TYPE
    ): KeyringPair {
        return this._keyring.addFromMnemonic(mnemonic, meta, type);
    }

    addFromSeed(seed: Uint8Array, meta: KeyringPair$Meta = {}, type: KeypairType = DEFAULT_KEYRING_TYPE): KeyringPair {
        return this._keyring.addFromSeed(seed, meta, type);
    }

    addFromUri(suri: string, meta: KeyringPair$Meta = {}, type: KeypairType = DEFAULT_KEYRING_TYPE): KeyringPair {
        return this._keyring.addFromUri(suri, meta, type);
    }

    private _deserialize(data: SerializedSimpleKeyring): void {
        this._keyring = new Keyring({type: DEFAULT_KEYRING_TYPE});
        for (const json of data) {
            this.addFromJson(json);
        }
    }
}
