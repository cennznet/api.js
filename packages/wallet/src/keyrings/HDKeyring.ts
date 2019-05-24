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

import {Keyring, mnemonicToSeed} from '@cennznet/util';
import {KeyringPair} from '@cennznet/util/types';
import {generateMnemonic} from 'bip39';
import HDKey from 'hdkey';
import {DEFAULT_KEYRING_TYPE} from '../constants';
import {waitForCryptoReady} from '../decorators';
import {IKeyring} from '../types';

const DEFAULT_HD_PATH = "m/44'/392'/0'/0";

interface SerializedHDKeyring {
    mnemonic: string;
    numberOfAccounts?: number;
    hdPath?: string;
}

const privateMnemonic = new WeakMap<object, string>();

/**
 * a HD Keyring implementation of ${IKeyring}
 * will use hd path "m/44'/392'/0'/0" (for CENNZ) by default
 */
export class HDKeyring implements IKeyring<SerializedHDKeyring> {

    @waitForCryptoReady
    static async generate(): Promise<HDKeyring> {
        const mnemonic = generateMnemonic();
        const keyring = new HDKeyring({
            mnemonic,
            numberOfAccounts: 0,
            hdPath: DEFAULT_HD_PATH,
        });
        return keyring;
    }
    private rootKey: HDKey;
    private pairs: KeyringPair[];
    private hdPath: string;

    constructor(opt?: SerializedHDKeyring) {
        this.pairs = [];
        if (opt) {
            this._deserialize(opt);
        }
    }

    @waitForCryptoReady
    async deserialize(opt: SerializedHDKeyring): Promise<this> {
        this._deserialize(opt);
        return this;
    }

    async serialize(): Promise<SerializedHDKeyring> {
        return {
            mnemonic: privateMnemonic.get(this),
            numberOfAccounts: this.pairs.length,
            hdPath: this.hdPath,
        };
    }

    @waitForCryptoReady
    async addPair(): Promise<KeyringPair> {
        if (!this.rootKey) {
            throw new Error('hd wallet not initialized');
        }
        const keyring = new Keyring({type: DEFAULT_KEYRING_TYPE});
        const kp = keyring.addFromSeed(this.rootKey.deriveChild(this.pairs.length).privateKey);
        this.pairs.push(kp);
        return kp;
    }

    async getAddresses(): Promise<string[]> {
        return this.pairs.map(kp => kp.address());
    }

    async getPair(address: string): Promise<KeyringPair> {
        const pair = this.pairs.find(kp => kp.address() === address);
        if (!pair) {
            throw new Error(`Unable to retrieve keypair ${address}`);
        }
        return pair;
    }

    async getPairs(): Promise<KeyringPair[]> {
        return this.pairs;
    }

    async removePair(address: string): Promise<void> {
        return Promise.reject(new Error("HD Keyring doesn't support removePair"));
    }

    private _deserialize(opt: SerializedHDKeyring): void {
        const {mnemonic, numberOfAccounts = 0, hdPath = DEFAULT_HD_PATH} = opt;
        const hdKey = HDKey.fromMasterSeed(Buffer.from(mnemonicToSeed(mnemonic)));
        this.hdPath = hdPath;
        this.rootKey = hdKey.derive(hdPath);
        privateMnemonic.set(this, mnemonic);
        const keyring = new Keyring({type: DEFAULT_KEYRING_TYPE});
        for (let i = 0; i < numberOfAccounts; i++) {
            const kp = keyring.addFromSeed(this.rootKey.deriveChild(i).privateKey);
            this.pairs.push(kp);
        }
    }
}
