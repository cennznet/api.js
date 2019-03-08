import {Keyring} from '@cennznet/util';
import {KeyringPair, KeyringPair$Json, KeyringPair$Meta} from '@cennznet/util/types';
import {generateMnemonic} from 'bip39';
import {IKeyring} from '../types';

interface SerializedSimpleKeyring {
    [address: string]: string;
}

/**
 * a Simple Keyring implementation of ${IKeyring} can be used to manage individual key pairs
 */
export class SimpleKeyring implements IKeyring<SerializedSimpleKeyring> {
    static async generate(): Promise<SimpleKeyring> {
        return new SimpleKeyring();
    }
    private _keyring = new Keyring();

    constructor(opt?: SerializedSimpleKeyring) {
        if (opt) {
            this._deserialize(opt);
        }
    }

    async serialize(): Promise<SerializedSimpleKeyring> {
        return (await this.getPairs()).reduce((acc, pair) => {
            acc[pair.address()] = pair.toJson().encoded;
            return acc;
        }, {});
    }

    async deserialize(data: SerializedSimpleKeyring): Promise<this> {
        this._deserialize(data);
        return this;
    }

    async addPair(pair?: KeyringPair): Promise<KeyringPair> {
        if (pair === undefined) {
            return this._keyring.addFromMnemonic(generateMnemonic());
        } else {
            if (pair.isLocked()) {
                throw new Error('key pair is locked. unlock before add it into wallet');
            }
            return this._keyring.addPair(pair);
        }
    }

    async getAddresses(): Promise<string[]> {
        return this._keyring.getPairs().map(kp => kp.address());
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

    addFromJson(pair: KeyringPair$Json, passphrase?: string): KeyringPair {
        const keyPair = this._keyring.addFromJson(pair);
        try {
            keyPair.decodePkcs8(passphrase);
        } catch (e) {
            this._keyring.removePair(pair.address);
            throw e;
        }
        return keyPair;
    }

    addFromMnemonic(mnemonic: string, meta?: KeyringPair$Meta): KeyringPair {
        return this._keyring.addFromMnemonic(mnemonic, meta);
    }

    addFromSeed(seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair {
        return this._keyring.addFromSeed(seed, meta);
    }

    private _deserialize(data: SerializedSimpleKeyring): void {
        this._keyring = new Keyring();
        for (const address of Object.keys(data)) {
            this.addFromJson({
                address,
                encoded: data[address],
                encoding: {type: null, version: null, content: null},
                meta: null,
            });
        }
    }
}
