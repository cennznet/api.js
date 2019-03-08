import {KeyringPair} from '@cennznet/util/types';

export interface IWallet {
    lock(): Promise<void>;

    unlock(password?: string): Promise<void>;

    isLocked(): boolean;
}

export interface WalletOption {
    vault?: string;
    encryptor?: Encryptor;
    keyringTypes?: KeyringType<any>[];
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
    new (data?: T): IKeyring<T>;
    generate(): Promise<IKeyring<T>>;
}

export interface Encryptor {
    encrypt(passphrase: string, json: object): Promise<string>;

    decrypt(passphrase: string, encoded: string): Promise<object>;
}
