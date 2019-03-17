import {Keyring, mnemonicToSeed} from '@cennznet/util';
import {KeyringPair} from '@cennznet/util/types';
import {generateMnemonic} from 'bip39';
import HDKey from 'hdkey';
import {DEFAULT_KEYRING_TYPE} from '../constants';
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
