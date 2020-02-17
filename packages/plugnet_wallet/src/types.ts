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
  generate(opt?: any): Promise<IKeyring<T>>;
}

export interface Encryptor {
  encrypt(passphrase: string, json: object): Promise<string>;

  decrypt(passphrase: string, encoded: string): Promise<object>;
}

export interface SignerPayloadRawBase {
  /**
   * @description The hex-encoded data for this request
   */
  data: string;

  /**
   * @description The type of the contained data
   */
  type?: 'bytes' | 'payload';
}

export interface SignerPayloadRaw extends SignerPayloadRawBase {
  /**
   * @description The ss-58 encoded address
   */
  address: string;

  /**
   * @description The type of the contained data
   */
  type: 'bytes' | 'payload';
}

export interface SignerResult {
  /**
   * @description The id for this request
   */
  id: number;

  /**
   * @description The resulting signature in hex
   */
  signature: string;
}

export interface RawPayloadSigner {
  /**
   * @description signs a raw payload, only the bytes data as supplied
   */
  signRaw: (raw: SignerPayloadRaw) => Promise<SignerResult>;
}

export type AnyU8a = Uint8Array | number[] | string;
