import {Extrinsic} from '@polkadot/types';
import {KeyringInstance, KeyringPair} from '@polkadot/keyring/types';
import {TxOpt} from './index';

export interface ISigner {
    sign(extrinsic: Extrinsic, opt: TxOpt): Promise<void>;
}

export interface IWallet {
    lock(): Promise<void>;

    unlock(password?: string): Promise<void>;

    isLocked(): boolean;
}

export interface WalletOption {
    vault?: string;
    encryptor?: Encryptor;
}

export interface IKeyring<S> extends KeyringInstance {
    serialize(): Promise<S>;

    deserialize(obj: S): Promise<KeyringPair[]>;
}

export interface Encryptor {
    encrypt(passphrase: string, json: object): Promise<string>;

    decrypt(passphrase: string, encoded: string): Promise<object>;
}
