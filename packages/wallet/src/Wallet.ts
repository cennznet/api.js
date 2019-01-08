import {KeyringPair$Json} from '@polkadot/keyring/types';
import Extrinsic from '@polkadot/types/Extrinsic';
import {TxOpt, Encryptor, ISigner, IKeyring, IWallet} from 'cennznet-types';
import {KeyringType, WalletOption} from 'cennznet-types/wallet';
import {persistBeforeReturn, requireUnlocked, synchronized} from './decorators';
import {HDKeyring} from './keyrings/HDKeyring';
import naclEncryptor from './encryptors/naclEncryptor';

export type SerializedWallet = {name: string; data: any}[];

const privateKeyrings = new WeakMap<object, IKeyring<any>[]>();
const privatePasswd = new WeakMap<object, string>();
type AccountKeyringMap = {[address: string]: number};

/**
 * retrieve default keyring
 * @param wallet
 * @ignore
 */
function getDefaultKeyring(wallet: Wallet): IKeyring<any> {
    return privateKeyrings.get(wallet)[0];
}

/**
 * search for keyring which store the given address account
 * @param wallet
 * @param accountKeyringMap
 * @param address
 * @ignore
 */
function getKeyringByAddress(wallet: Wallet, accountKeyringMap: AccountKeyringMap, address: string): IKeyring<any> {
    const krIdx = accountKeyringMap[address];
    if (krIdx === undefined) {
        throw new Error('address not found in wallet');
    }
    return privateKeyrings.get(wallet)[krIdx];
}

/**
 * a Wallet implementation which can be used as signer in cennznet-api
 * support multi-keyring and shipped with a HD Keyring as default keyring type.
 */
export class Wallet implements ISigner, IWallet {
    protected _encryptor: Encryptor;
    protected _keyringTypes: KeyringType<any>[];
    protected _accountKeyringMap: AccountKeyringMap;
    protected _isLocked: boolean = true;
    public vault: string;

    /**
     * @return the constructor of default keyring
     */
    get defaultKeyringType(): KeyringType<any> {
        return this._keyringTypes[0];
    }

    constructor(option: WalletOption = {}) {
        this.vault = option.vault;
        this._encryptor = option.encryptor || naclEncryptor;
        this._keyringTypes = option.keyringTypes || [HDKeyring];
        this._accountKeyringMap = {};
        privateKeyrings.set(this, []);
    }

    /**
     * sign a extrinsic using the account specified by opt.from
     * @param extrinsic
     * @param opt
     * @requires wallet unlocked
     * @throws when the account(opt.from) is not managed by the wallet.
     */
    @synchronized
    @requireUnlocked
    public async sign(extrinsic: Extrinsic, opt: TxOpt): Promise<void> {
        const signerPair = await getKeyringByAddress(this, this._accountKeyringMap, opt.from).getPair(opt.from);

        extrinsic.sign(signerPair, opt.nonce, opt.blockHash);
    }

    /**
     * erase the current wallet instance and create a new one with default keyring.
     * @param passphrase for the new created wallet.
     */
    @synchronized
    async createNewVault(passphrase: string): Promise<void> {
        privatePasswd.set(this, passphrase);
        privateKeyrings.set(this, [await this.defaultKeyringType.generate()]);
        this._isLocked = false;
        await this.persistAll();
    }

    /**
     * erase the current wallet instance and create a new one with given keyrings.
     * @param passphrase for the new created wallet.
     */
    @synchronized
    async createNewVaultAndRestore(passphrase: string, keyrings: IKeyring<any>[]): Promise<void> {
        privatePasswd.set(this, passphrase);
        privateKeyrings.set(this, keyrings);
        this._isLocked = false;
        await this.persistAll();
    }

    /**
     * erase in-memory keyrings data and forbid any operation which read/write keyrings
     */
    @synchronized
    async lock(): Promise<void> {
        privatePasswd.set(this, null);
        privateKeyrings.set(this, []);
        this._isLocked = true;
    }

    /**
     * unlock the wallet
     * @param passphrase
     */
    @synchronized
    @persistBeforeReturn
    async unlock(passphrase: string): Promise<void> {
        if (!this.isLocked()) {
            throw new Error('Wallet has already been unlocked');
        }
        const serialized: SerializedWallet = ((await this._encryptor.decrypt(
            passphrase,
            this.vault
        )) as unknown) as SerializedWallet;
        const krs = [];
        await Promise.all(
            serialized.map((serialized, idx) => {
                const KeyringType = this.getKeyringTypeByName(serialized.name);
                const kr = new KeyringType();
                krs[idx] = kr;
                return kr.deserialize(serialized.data);
            })
        );
        privateKeyrings.set(this, krs);
        privatePasswd.set(this, passphrase);
        this._isLocked = false;
    }

    /**
     * export all keyrings in the wallet
     * @param passphrase
     * @requires wallet unlocked
     * @throw when passphrase is wrong
     */
    @synchronized
    @requireUnlocked
    async export(passphrase: string): Promise<SerializedWallet> {
        const serialized: SerializedWallet = ((await this._encryptor.decrypt(
            passphrase,
            this.vault
        )) as unknown) as SerializedWallet;
        return serialized;
    }

    /**
     * export the specified account in a json format which can be re-imported via SimpleKeyring's addFromJson()
     * @param address
     * @param passphrase
     * @requires wallet unlocked
     * @throw when passphrase is wrong
     * @throw when account doesn't exist
     */
    @synchronized
    @requireUnlocked
    async exportAccount(address: string, passphrase: string): Promise<KeyringPair$Json> {
        await this._encryptor.decrypt(passphrase, this.vault);
        const signerPair = await getKeyringByAddress(this, this._accountKeyringMap, address).getPair(address);
        return signerPair.toJson();
    }

    /**
     * @return the lock status
     */
    isLocked(): boolean {
        return this._isLocked;
    }

    /**
     * generate a new account using default keyring and add it into wallet
     * @return address of the new generated account
     * @requires wallet unlocked
     */
    @synchronized
    @requireUnlocked
    @persistBeforeReturn
    async addAccount(): Promise<string> {
        const defaultKeyring = getDefaultKeyring(this);
        const kp = await defaultKeyring.addPair();
        return kp.address();
    }

    /**
     * remove the spedified account from wallet
     * @param address
     * @requires wallet unlocked
     * @throws when the account is not managed by this wallet
     * @throws when the account is managed by a hd keyring
     */
    @synchronized
    @requireUnlocked
    @persistBeforeReturn
    async removeAccount(address: string): Promise<void> {
        const kr = getKeyringByAddress(this, this._accountKeyringMap, address);
        await kr.removePair(address);
    }

    /**
     * @return all addresses managed by this wallet
     * @requires wallet unlocked
     */
    @synchronized
    @requireUnlocked
    async getAddresses(): Promise<string[]> {
        return Object.keys(this._accountKeyringMap);
    }

    /**
     * add a keyring instance along with all key pairs in it.
     * addresses already exist in the wallet will be removed from the keyring before it's been added
     * @param keyring
     * @requires wallet unlocked
     */
    @synchronized
    @requireUnlocked
    @persistBeforeReturn
    async addKeyring(keyring: IKeyring<any>): Promise<void> {
        await this.checkDuplicate(await keyring.getAddresses());
        if (!this._keyringTypes.includes(keyring.constructor as any)) {
            this._keyringTypes.push(keyring.constructor as any);
        }
        privateKeyrings.get(this).push(keyring);
    }

    protected async checkDuplicate(addresses: string[]): Promise<void> {
        const existingAddresses = Object.keys(this._accountKeyringMap);
        for (const address of addresses) {
            if (existingAddresses.includes(address)) {
                throw new Error('detect duplicate account, remove before call addKeyring()');
            }
        }
    }

    protected async persistAll(): Promise<void> {
        const serialized: SerializedWallet = [];
        const krs = privateKeyrings.get(this);
        const serializedPromiseArray = krs.map(kr => kr.serialize());
        (await Promise.all(serializedPromiseArray)).forEach((data, index) => {
            serialized.push({name: krs[index].constructor.name, data});
        });
        this.vault = await this._encryptor.encrypt(privatePasswd.get(this), serialized);
    }

    protected async syncAccountKeyringMap(): Promise<void> {
        const newMap: {[address: string]: number} = {};
        const addressesArray = await Promise.all(privateKeyrings.get(this).map(kr => kr.getAddresses()));
        for (const [idx, addresses] of addressesArray.entries()) {
            for (const address of addresses) {
                if (newMap[address] !== undefined) {
                    newMap[address] = await this.trySolveConflicts(address, newMap[address], idx);
                } else {
                    newMap[address] = idx;
                }
            }
        }
        this._accountKeyringMap = newMap;
    }

    protected async trySolveConflicts(address: string, krIdx1: number, krIdx2: number): Promise<number> {
        const keyrings = privateKeyrings.get(this);
        const kr1 = keyrings[krIdx1];
        const kr2 = keyrings[krIdx2];
        try {
            await kr2.removePair(address);
            console.info(
                `conflicts solved for account ${address}, chose keyring ${krIdx1}, remove from keyring ${krIdx2}`
            );
            return krIdx1;
        } catch (e) {
            try {
                await kr1.removePair(address);
                console.info(
                    `conflicts solved for account ${address}, chose keyring ${krIdx2}, remove from keyring ${krIdx1}`
                );
                return krIdx2;
            } catch (e) {
                console.info(
                    `detect conflicts solved for account ${address}, chose keyring ${krIdx1}, ` +
                        `fail to remove from keyring ${krIdx2}`
                );
                return krIdx1;
            }
        }
    }

    private getKeyringTypeByName(name: string): KeyringType<any> {
        const KeyringType = this._keyringTypes.find(t => t.name === name);
        if (!KeyringType) {
            throw new Error(`keyring type ${name} not found`);
        }
        return KeyringType;
    }

    //all KeyringInstance functions redirect to _keyring
    // @persistBeforeReturn
    // @requireUnlocked
    // async addFromJson(pair: KeyringPair$Json, passphrase?: string): Promise<KeyringPair> {
    //     const keyPair = privateKeyring.get(this).addFromJson(pair);
    //     try {
    //         keyPair.decodePkcs8(passphrase);
    //     } catch (e) {
    //         privateKeyring.get(this).removePair(pair.address);
    //         throw e;
    //     }
    //     await this.persistAll();
    //     return keyPair;
    // }

    // @persistBeforeReturn
    // @requireUnlocked
    // async addFromMnemonic(mnemonic: string, meta?: KeyringPair$Meta): Promise<KeyringPair> {
    //     return privateKeyring.get(this).addFromMnemonic(mnemonic, meta);
    // }

    // @persistBeforeReturn
    // @requireUnlocked
    // async addFromSeed(seed: Uint8Array, meta?: KeyringPair$Meta): Promise<KeyringPair> {
    //     return privateKeyring.get(this).addFromSeed(seed, meta);
    // }

    // @persistBeforeReturn
    // @requireUnlocked
    // async addPair(pair: KeyringPair): Promise<KeyringPair> {
    //     if (pair.isLocked()) {
    //         throw new Error('key pair is locked. unlock before add it into wallet');
    //     }
    //     return privateKeyring.get(this).addPair(pair);
    // }

    // @requireUnlocked
    // getPair(address: string | Uint8Array): KeyringPair {
    //     return privateKeyring.get(this).getPair(address);
    // }

    // @requireUnlocked
    // getPairs(): Array<KeyringPair> {
    //     return privateKeyring.get(this).getPairs();
    // }

    // @persistBeforeReturn
    // @requireUnlocked
    // async removePair(address: string | Uint8Array): Promise<void> {
    //     privateKeyring.get(this).removePair(address);
    // }
}
