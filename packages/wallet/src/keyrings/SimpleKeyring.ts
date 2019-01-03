import Keyring from '@polkadot/keyring';
import {KeyringPair, KeyringPair$Json, KeyringPair$Meta} from '@polkadot/keyring/types';
import {generateMnemonic} from 'bip39';
import {IKeyring} from 'cennznet-types';

interface SerializedSimpleKeyring {
    [address: string]: string;
}

/**
 * a Simple Keyring implementation of ${IKeyring} can be used to manage individual key pairs
 */
export class SimpleKeyring implements IKeyring<SerializedSimpleKeyring> {
    private _keyring = new Keyring();

    static async generate(): Promise<SimpleKeyring> {
        return new SimpleKeyring();
    }

    public async serialize(): Promise<SerializedSimpleKeyring> {
        return (await this.getPairs()).reduce((acc, pair) => {
            acc[pair.address()] = pair.toJson().encoded;
            return acc;
        }, {});
    }

    public async deserialize(data: SerializedSimpleKeyring): Promise<this> {
        this._keyring = new Keyring();
        await Promise.all(
            Object.keys(data).map(address =>
                this._keyring.addFromJson({address, encoded: data[address], encoding: null, meta: null})
            )
        ).then(keyPairs => {
            for (const keyPair of keyPairs) {
                keyPair.decodePkcs8();
            }
        });
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

    async addFromJson(pair: KeyringPair$Json, passphrase?: string): Promise<KeyringPair> {
        const keyPair = this._keyring.addFromJson(pair);
        try {
            keyPair.decodePkcs8(passphrase);
        } catch (e) {
            this._keyring.removePair(pair.address);
            throw e;
        }
        return keyPair;
    }

    async addFromMnemonic(mnemonic: string, meta?: KeyringPair$Meta): Promise<KeyringPair> {
        return this._keyring.addFromMnemonic(mnemonic, meta);
    }

    async addFromSeed(seed: Uint8Array, meta?: KeyringPair$Meta): Promise<KeyringPair> {
        return this._keyring.addFromSeed(seed, meta);
    }
}
