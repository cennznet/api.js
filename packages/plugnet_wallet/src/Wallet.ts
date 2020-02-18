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

import {KeyringPair$Json} from '@polkadot/keyring/types';
import {hexToU8a, u8aToHex, u8aToU8a} from '@polkadot/util';
import {persistBeforeReturn, requireUnlocked, synchronized, waitForCryptoReady} from './decorators';
import naclEncryptor from './encryptors/naclEncryptor';
import {HDKeyring} from './keyrings/HDKeyring';
import {
  AnyU8a,
  Encryptor,
  IKeyring,
  IWallet,
  KeyringType,
  RawPayloadSigner,
  SignerPayloadRaw,
  SignerResult,
  WalletOption,
} from './types';

export type SerializedWallet = {name: string; data: any}[];

let id = 0;

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
  // tslint:disable-next-line:no-console
  console.log('****** getKeyringByAddress');
  // tslint:disable-next-line:no-console
  console.log('Address:', address);
  // tslint:disable-next-line:no-console
  console.log('accountKeyringMap:', accountKeyringMap);
  const krIdx = accountKeyringMap[address];
  if (krIdx === undefined) {
    throw new Error('address not found in wallet');
  }
  //console.log('PairL',privateKeyrings.get(wallet)[krIdx]);
  return privateKeyrings.get(wallet)[krIdx];
}

/**
 * a Wallet implementation which can be used as signer in cennznet-api
 * support multi-keyring and shipped with a HD Keyring as default keyring type.
 */
export class Wallet implements RawPayloadSigner, IWallet {
  vault: string;
  protected _encryptor: Encryptor;
  protected _keyringTypes: KeyringType<any>[];
  protected _accountKeyringMap: AccountKeyringMap;
  protected _isLocked: boolean = true;

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
   * sign a raw payload
   * @param payload
   * @requires wallet unlocked
   * @throws when the account is not managed by the wallet.
   */
  @synchronized
  @requireUnlocked
  @waitForCryptoReady
  async signRaw(payload: SignerPayloadRaw): Promise<SignerResult> {
    const {address, data} = payload;
    const signerPair = await getKeyringByAddress(this, this._accountKeyringMap, address).getPair(address);
    const signature = u8aToHex(signerPair.sign(hexToU8a(data)));
    // tslint:disable-next-line:no-console
    console.log('TEST.. if this executed..', signature);

    return {
      id: ++id,
      signature,
    };

    // const signature = u8aToHex(this.keyringPair.sign(hexToU8a(data)));
    //
    // resolve({
    //   id: ++id,
    //   signature
    // });
  }

  /**
   * verify a signature using nacl or schnorrkel deps on keyring type
   * @param message
   * @param signature
   * @param address
   * @requires wallet unlocked
   * @throws when the account is not managed by the wallet.
   */
  @synchronized
  @requireUnlocked
  @waitForCryptoReady
  async verifySignature(message: AnyU8a, signature: AnyU8a, address: string): Promise<boolean> {
    const signerPair = await getKeyringByAddress(this, this._accountKeyringMap, address).getPair(address);
    return signerPair.verify(u8aToU8a(message), u8aToU8a(signature));
  }

  /**
   * erase the current wallet instance and create a new one with default keyring.
   * @param passphrase for the new created wallet.
   */
  @synchronized
  @waitForCryptoReady
  async createNewVault(passphrase: string, opt?: any): Promise<void> {
    privatePasswd.set(this, passphrase);
    privateKeyrings.set(this, [await this.defaultKeyringType.generate(opt)]);
    this._isLocked = false;
    await this.persistAll();
  }

  /**
   * erase the current wallet instance and create a new one with given keyrings.
   * @param passphrase for the new created wallet.
   */
  @synchronized
  @waitForCryptoReady
  async createNewVaultAndRestore(passphrase: string, keyrings: IKeyring<any>[]): Promise<void> {
    privatePasswd.set(this, passphrase);
    privateKeyrings.set(this, keyrings);
    this._isLocked = false;
    await this.syncAccountKeyringMap();
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
      serialized.map(async (serialized, idx) => {
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
  @waitForCryptoReady
  async addAccount(): Promise<string> {
    const defaultKeyring = getDefaultKeyring(this);
    const kp = await defaultKeyring.addPair();
    return kp.address;
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
   * it will be cloned to lose reference to the original keyring
   * @param keyring
   * @requires wallet unlocked
   */
  @synchronized
  @requireUnlocked
  @persistBeforeReturn
  async addKeyring(keyring: IKeyring<any>): Promise<void> {
    if (!this._keyringTypes.includes(keyring.constructor as any)) {
      this._keyringTypes.push(keyring.constructor as any);
    }
    const clonedKeying = await this.cloneKeying(keyring);
    await this.checkDuplicate(await clonedKeying.getAddresses());
    privateKeyrings.get(this).push(clonedKeying);
  }

  protected async cloneKeying(keyring: IKeyring<any>): Promise<IKeyring<any>> {
    const KeyringTypeInstance = new (keyring.constructor as any)();
    return KeyringTypeInstance.deserialize(await keyring.serialize());
  }

  protected async checkDuplicate(addresses: string[]): Promise<void> {
    const existingAddresses = Object.keys(this._accountKeyringMap);
    for (const address of addresses) {
      if (existingAddresses.includes(address)) {
        throw new Error('detected duplicate account, remove it before calling addKeyring()');
      }
    }
  }

  protected async persistAll(): Promise<void> {
    const serialized: SerializedWallet = [];
    const krs = privateKeyrings.get(this);
    const serializedPromiseArray = krs.map(async kr => kr.serialize());
    (await Promise.all(serializedPromiseArray)).forEach((data, index) => {
      serialized.push({name: krs[index].constructor.name, data});
    });
    this.vault = await this._encryptor.encrypt(privatePasswd.get(this), serialized);
  }

  protected async syncAccountKeyringMap(): Promise<void> {
    const newMap: {[address: string]: number} = {};
    const addressesArray = await Promise.all(privateKeyrings.get(this).map(async kr => kr.getAddresses()));
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
      return krIdx1;
    } catch (e) {
      try {
        await kr1.removePair(address);
        return krIdx2;
      } catch (e) {
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
}
