import {KeyringPair} from '@polkadot/keyring/types';

export interface IWallet {
    lock(): Promise<void>;

    unlock(password?: string): Promise<void>;

    isLocked(): boolean;
}

export interface WalletOption {
    vault?: string;
    encryptor?: Encryptor;
    keyringTypes?: KeyringType<any>[];
    // defaultKeyring?: Newable<IKeyring<any>>;
}

export interface IKeyring<S> {
    serialize(): Promise<S>;

    deserialize(obj: S): Promise<this>;

    getPair(address: string): Promise<KeyringPair>;

    getPairs(): Promise<KeyringPair[]>;

    getAddresses(): Promise<string[]>;

    removePair(address: string): Promise<void>;

    addPair(): Promise<KeyringPair>;
}

export interface KeyringType<T> {
    name: string;
    generate(): Promise<IKeyring<T>>;
    new (data?: T): IKeyring<T>;
}

export interface Encryptor {
    encrypt(passphrase: string, json: object): Promise<string>;

    decrypt(passphrase: string, encoded: string): Promise<object>;
}
