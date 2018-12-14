import {KeyringPair, KeyringPair$Json, KeyringPair$Meta} from '@polkadot/keyring/types';
import Extrinsic from '@polkadot/types/Extrinsic';
import {TxOpt, Encryptor, ISigner, IKeyring, IWallet} from 'cennznet-types';
import {WalletOption} from 'cennznet-types/wallet';
import {persistBeforeReturn, requireUnlocked} from './decorators';
import {SimpleKeyring} from './keyrings/SimpleKeyring';
import naclEncryptor from './encryptors/naclEncryptor';

const privateKeyring = new WeakMap<object, IKeyring<any>>();
const privatePasswd = new WeakMap<object, string>();

export class Wallet implements ISigner, IWallet {
    private _vault: string;
    private _encrytpor: Encryptor;

    private _isLocked: boolean = true;

    constructor(option: WalletOption = {}) {
        this._vault = option.vault;
        this._encrytpor = option.encryptor || naclEncryptor;
    }

    @requireUnlocked
    public async sign(extrinsic: Extrinsic, opt: TxOpt): Promise<void> {
        const signerPair = privateKeyring.get(this).getPair(opt.from);

        extrinsic.sign(signerPair, opt.nonce, opt.blockHash);
    }

    async createNewVault(password: string): Promise<void> {
        privatePasswd.set(this, password);
        privateKeyring.set(this, new SimpleKeyring());
        this._isLocked = false;
        await this.persistAll();
    }

    @requireUnlocked
    async persistAll(): Promise<void> {
        const serialized = await privateKeyring.get(this).serialize();
        this._vault = await this._encrytpor.encrypt(privatePasswd.get(this), serialized);
    }

    async lock(): Promise<void> {
        privatePasswd.set(this, null);
        privateKeyring.set(this, null);
        this._isLocked = true;
    }

    async unlock(password?: string): Promise<void> {
        if (!this.isLocked()) {
            throw new Error('Wallet has already been unlocked.');
        }
        const serialized = await this._encrytpor.decrypt(password, this._vault);
        const keyring = new SimpleKeyring();
        await keyring.deserialize(serialized as any);
        privateKeyring.set(this, keyring);
        privatePasswd.set(this, password);
        this._isLocked = false;
    }

    isLocked(): boolean {
        return this._isLocked;
    }

    //all KeyringInstance functions redirect to _keyring
    @persistBeforeReturn
    @requireUnlocked
    async addFromJson(pair: KeyringPair$Json, passphrase?: string): Promise<KeyringPair> {
        const keyPair = privateKeyring.get(this).addFromJson(pair);
        try {
            keyPair.decodePkcs8(passphrase);
        } catch (e) {
            privateKeyring.get(this).removePair(pair.address);
            throw e;
        }
        await this.persistAll();
        return keyPair;
    }

    @persistBeforeReturn
    @requireUnlocked
    async addFromMnemonic(mnemonic: string, meta?: KeyringPair$Meta): Promise<KeyringPair> {
        return privateKeyring.get(this).addFromMnemonic(mnemonic, meta);
    }

    @persistBeforeReturn
    @requireUnlocked
    async addFromSeed(seed: Uint8Array, meta?: KeyringPair$Meta): Promise<KeyringPair> {
        return privateKeyring.get(this).addFromSeed(seed, meta);
    }

    @persistBeforeReturn
    @requireUnlocked
    async addPair(pair: KeyringPair): Promise<KeyringPair> {
        if (pair.isLocked()) {
            throw new Error('key pair is locked. unlock before add it into wallet');
        }
        return privateKeyring.get(this).addPair(pair);
    }

    @requireUnlocked
    getPair(address: string | Uint8Array): KeyringPair {
        return privateKeyring.get(this).getPair(address);
    }

    @requireUnlocked
    getPairs(): Array<KeyringPair> {
        return privateKeyring.get(this).getPairs();
    }

    @persistBeforeReturn
    @requireUnlocked
    async removePair(address: string | Uint8Array): Promise<void> {
        privateKeyring.get(this).removePair(address);
    }
}
