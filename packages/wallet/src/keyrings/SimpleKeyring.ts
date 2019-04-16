import {Keyring} from '@cennznet/util';
import {KeyringPair, KeyringPair$Json, KeyringPair$Meta} from '@cennznet/util/types';
import {KeypairType} from '@plugnet/util-crypto/types';
import {generateMnemonic} from 'bip39';
import {DEFAULT_KEYRING_TYPE} from '../constants';
import {IKeyring} from '../types';

type SerializedSimpleKeyring = KeyringPair$Json[];

/**
 * a Simple Keyring implementation of ${IKeyring} can be used to manage individual key pairs
 */
export class SimpleKeyring implements IKeyring<SerializedSimpleKeyring> {
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

    private _deserialize(data: SerializedSimpleKeyring): void {
        this._keyring = new Keyring({type: DEFAULT_KEYRING_TYPE});
        for (const json of data) {
            this.addFromJson(json);
        }
    }
}
