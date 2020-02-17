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

import {hexToU8a} from '@polkadot/util';
import {cryptoWaitReady} from '@polkadot/util-crypto';
import TestingPairs from '@polkadot/keyring/testingPairs';
// import {SignerPayloadRaw} from '../../wallet/types';
import {Wallet} from './';
import {HDKeyring} from './keyrings/HDKeyring';
import {SimpleKeyring} from './keyrings/SimpleKeyring';
import {SignerPayloadRaw} from './types';

const TESTING_PAIRS = TestingPairs();
const DEFAULT_HD_PATH = "m/44'/392'/0'/0";

const TEST_ACCOUNT = {
  seed: '0x3cf2ec6ffd26587529ab06c82ba9b33110198085f5c6b8d882653d056bf9e0d3',
  address: '5DHzypfuQH7FPhCsrqMxpxkBaPHe8QNhc5s1PwEMDc5p5Nb7',
  publicKey: '0x366010e706af618a6037731b07663d4b6f10eac201c7fdd5fb0bd4727742524d',
  mnemonic: 'insane push cradle toilet token gate chair trim spare blush rebuild top',
};

const GENESIS_HASH = '0x14ba3ad1bf42740e82a408d57955b0c026bfc268ee559ce9081ba7fb530de815';

const testPayload = (address: string): SignerPayloadRaw => ({
  data: '0x010200ea51b75b00000000',
  type: 'payload',
  address,
});

describe('a wallet', () => {
  let wallet: Wallet;
  const alice = TESTING_PAIRS.alice;
  const bob = TESTING_PAIRS.bob;
  const walletPassphase = 'a test wallet passphase';

  beforeAll(async () => {
    await cryptoWaitReady();
  });

  beforeEach(async () => {
    wallet = new Wallet();
    await wallet.createNewVault(walletPassphase);
  });

  it('create and restore', async () => {
    const newPassphrase = 'new passphrase';
    const mnemonic = 'kite manual pizza regret forget edge jelly leaf draft arrest knock parade';
    const keyring = new HDKeyring({mnemonic, hdPath: DEFAULT_HD_PATH});
    await wallet.createNewVaultAndRestore(newPassphrase, [keyring]);
    await expect(wallet.addAccount()).resolves.toBe('5CzSXa5da4KdaPgEhDNShUAjP3fcdGdXPpenrm8zv54HG7C3');
  });

  it('create and restore#2', async () => {
    const newPassphrase = 'new passphrase';
    const mnemonic = 'kite manual pizza regret forget edge jelly leaf draft arrest knock parade';
    const keyring = new HDKeyring({mnemonic, numberOfAccounts: 5, hdPath: DEFAULT_HD_PATH});
    await wallet.createNewVaultAndRestore(newPassphrase, [keyring]);
    console.log('Address:');
    const a = await wallet.getAddresses();
    console.log(a);
    await expect(wallet.getAddresses()).resolves.toHaveLength(5);
  });

  it('create with custom word counts', async () => {
    const wallet = new Wallet();
    await wallet.createNewVault(walletPassphase, {words: 24});
    const walletExport = await wallet.export(walletPassphase);
    expect(walletExport[0].data.mnemonic.split(' ').length).toBe(24);
  });

  describe('accounts', () => {
    it('addKeyring(keyring)', async () => {
      const keyring = new SimpleKeyring();
      await keyring.addPair(alice);
      await wallet.addKeyring(keyring);
      await expect(wallet.getAddresses()).resolves.toEqual(expect.arrayContaining([alice.address]));
    });

    it('remove removeAccount', async () => {
      const keyring = new SimpleKeyring();

      await keyring.addPair(alice);
      await keyring.addPair(bob);
      await wallet.addKeyring(keyring);
      await wallet.removeAccount(alice.address);
      await expect(wallet.getAddresses()).resolves.toEqual(expect.not.arrayContaining([alice.address]));
    });

    it('throw error when trying to add keyring with duplicate accounts', async () => {
      const keyring = new SimpleKeyring();
      const keyring2 = new SimpleKeyring();
      [] = [await keyring.addPair(alice), await keyring2.addPair(alice)];
      await wallet.addKeyring(keyring);
      await expect(wallet.addKeyring(keyring2)).rejects.toThrow();
      await wallet.removeAccount(alice.address);
      await wallet.addKeyring(keyring2);
    });

    it('try resolve conflicts #1', async () => {
      const account0 = {
        address: '5HTkvBrPpfrSZCoHE9qBMyNmV2JVJcKLNswwXvWdZjizCMHj',
      };
      const account1 = {
        address: '5GnGjKZcdmbQfYUyShSkDi1PE9HE93wj1J5zxHtZ4cYP43fh',
        seed: '0x4175f9081d64c9eea1f1cf7dbdcd58069a0e8bf09e36facdd7e62c59f0c96124',
      };
      // keyring#0 is hdkeyring with 1 account(account0) and account1 is the next account
      const vault =
        '0x574e6ec7eaa0ba4e8404a6127c7d8e7d665f51d2d048bc6848d556145bd5c960bb2dd0823f1cde6f821b56579be9f9cbdf9baaf8c5ad790ad30f3aa6bf8715f4585406c7a93108d28bec4137926aa6df7446b6f9baace6fdbab06a4d72a83da267b66415d1b0916581fb35934538d6443e93430e792f7f54791d412231858c008929ce64cbbe9e84906bd0124694899aa6de715cb2f2d8e387d6484ac37ac8e23a8523ee326629bd6921b02009fab5dfab2bf686e9b7fde5ffe12c4a3b523529d9e7855dea03d93b004a60977f41bf83a60c890caef324ac21efa642cebbcc22fe3e';
      const wallet = new Wallet({vault});
      await wallet.unlock(null);
      await expect(wallet.getAddresses()).resolves.toEqual(expect.arrayContaining([account0.address]));
      // add a SimpleKeyring with the coming account in it
      const keyring = new SimpleKeyring();
      await keyring.addFromSeed(hexToU8a(account1.seed));
      await wallet.addKeyring(keyring);
      // call default keyring(hdkeyring)'s addAccount(), which will lead to a conflict with SimpleKeyring i.e:
      // this will add the first account in wallet privateKeyrings (5DMoKb4xQBUgB8XRz3dPfkKkEYGrQ9UkUEYHrrucAfTqyBxm) as a hdkr,
      // however this addresses is already added as a skr, trySolveConflicts must find the duplicate addresss and remove it from skr
      await wallet.addAccount();
      // account1 can not be removed from hdkeyring, so it will be removed from SimpleKeyring

      const keyrings = await wallet.export(null);
      const SIMPLE_KEY_RING = 1;

      expect(keyrings[SIMPLE_KEY_RING].data[account1.address]).toBeUndefined();
    });

    // TODO: update test data
    it.skip('try resolve conflicts #2', async () => {
      const account0 = {
        address: '5DMoKb4xQBUgB8XRz3dPfkKkEYGrQ9UkUEYHrrucAfTqyBxm',
      };
      const account1 = {
        address: '5GnGjKZcdmbQfYUyShSkDi1PE9HE93wj1J5zxHtZ4cYP43fh',
        seed: '0x4175f9081d64c9eea1f1cf7dbdcd58069a0e8bf09e36facdd7e62c59f0c96124',
      };
      // keyring#0 is hdkeyring with 1 account(account0) and account1 is the next account
      const vault =
        '0xd60592af94417cc3c35b3feacebe3993532bd075bb8e80a90d5ca4a9f611bf961014a529aeff6ccc31d797220131f90f62f2fdd6474abfe0a8aa84916bd23e7718e64a109b6472f6c0b9af58ed1ec34ca94c6d9c7ae9e87ba3a525545a2c397eba78a7370e7781987138c534e4b547ad6ca29da9a3408cbafffbfd37915e412ab058ebac5b6bf7576601479a78691e7f8715dd7f12b28e3c631e000152255d613424989e535af9b9b764659e834d7d';
      const wallet = new Wallet({vault});
      await wallet.unlock('test');
      await expect(wallet.getAddresses()).resolves.toHaveLength(0);
      const keyring = new HDKeyring();
      const mnemonic = 'urban tuna work fiber excuse gown adult grab winner rigid lamp appear';
      await keyring.deserialize({
        mnemonic,
        numberOfAccounts: 1,
        hdPath: "m/44'/392'/0'/0",
      });
      await wallet.addKeyring(keyring);
      expect((wallet as any)._accountKeyringMap[account0.address]).toBe(1);
      // generate account0 in default keyring and result to a conflict
      await wallet.addAccount();
      // can not remove account0 from either keyring, so chose default keyring but keep it in another keyring as well
      expect((wallet as any)._accountKeyringMap[account0.address]).toBe(0);
      await expect(keyring.getAddresses()).resolves.toEqual(expect.arrayContaining([account0.address]));
    });

    // TODO: update test data
    it.skip('recover wallet from vault could fail without correct keyringTypes', async () => {
      const vault =
        '0xbf44f9de75ae49c510ff145374d82352e9271c1e648d65c276e525cb95326f915b7e724758c955822435476061e0a5cad87075d693e60c61cc617b6f04949a99cfffa2b881048e5e03a6701480004614c14a037e2ab01a41b3776d6f1cc1a7578a0bc8eb5c5e9070181633b62b48430be4cf8ca9c4e8304c850029751f919f865b1e3dadf7a6e619cd57dd5c5c958c0c3ea928aa0d6993995cd725520a1df81526f6989d716f0a3fb07e48e4dbf73c59e6d849279a50198b50cf25046d24c663d4b6664a0040e91554aebfd1c8b1219533320c0cb8b90b99041eb3cf6e4a3165f5c01145d4579191aae066b7cf600493f783a2d89158f4bc415172d231b5f35940c9ff00ead6e924eed7c464934f105244a071367d53440745a1b066a7ecea37035c428d29bb08d25186e7ce86';
      const wallet = new Wallet({vault});
      await expect(wallet.unlock('test')).rejects.toThrow('keyring type SimpleKeyring not found');
      const wallet2 = new Wallet({
        vault,
        keyringTypes: [SimpleKeyring, HDKeyring],
      });
      await wallet2.unlock('test');
    });
  });

  describe('sign raw message', () => {
    it('the signer is managed by the wallet', async () => {
      const keyring = new SimpleKeyring();
      await keyring.addPair(alice);
      await wallet.addKeyring(keyring);
      await expect(wallet.signRaw(testPayload(alice.address))).resolves.toBeDefined();
    });
    it('the signer is not in the wallet', async () => {
      await expect(wallet.signRaw(testPayload(alice.address))).rejects.toThrow();
    });
  });

  describe('lock/unlock', () => {
    beforeEach(async () => {
      for (let i = 0; i < 10; i++) {
        await wallet.addAccount();
      }
      const keyring = new SimpleKeyring();
      [] = [
        await keyring.addPair(alice),
        await keyring.addPair(bob),
        await keyring.addFromSeed(hexToU8a(TEST_ACCOUNT.seed)),
      ];
      await wallet.addKeyring(keyring);
    });
    describe('when wallet is unlocked', () => {
      it('can lock', async () => {
        await expect(wallet.getAddresses()).resolves.toHaveLength(13);
        expect(wallet.isLocked()).not.toBeTruthy();
        await wallet.lock();
        expect(wallet.isLocked()).toBeTruthy();
        await expect(wallet.getAddresses()).rejects.toThrow();
        await expect(wallet.signRaw(testPayload(alice.address))).rejects.toThrow();
      });
      it('can not unlock again', async () => {
        await expect(wallet.unlock(walletPassphase)).rejects.toThrow('Wallet has already been unlocked');
      });
    });
    describe('when wallet is locked', () => {
      beforeEach(async () => {
        await wallet.lock();
        expect(wallet.isLocked()).toBeTruthy();
      });
      it('can unlock', async () => {
        await wallet.unlock(walletPassphase);
        expect(wallet.isLocked()).not.toBeTruthy();
        await expect(wallet.getAddresses()).resolves.toHaveLength(13);
        await expect(wallet.signRaw(testPayload(alice.address))).resolves;
      });
      it('can not add key pair', async () => {
        const keyring = new SimpleKeyring();
        await expect(wallet.addKeyring(keyring)).rejects.toThrow('wallet is locked');
        await expect(wallet.addAccount()).rejects.toThrow('wallet is locked');
      });
      it('can not get addresses', async () => {
        await expect(wallet.getAddresses()).rejects.toThrow('wallet is locked');
      });
      it('can not remove key pair', async () => {
        await expect(wallet.removeAccount(alice.address)).rejects.toThrow('wallet is locked');
      });
      it('can not sign tx', async () => {
        await expect(wallet.signRaw(testPayload(alice.address))).rejects.toThrow('wallet is locked');
      });
    });
  });

  describe('export', () => {
    beforeEach(async () => {
      const keyring = new SimpleKeyring();
      await keyring.addPair(alice);
      await wallet.addKeyring(keyring);
    });

    it('all keyrings', async () => {
      const result = await wallet.export(walletPassphase);
      expect(result).toHaveLength(2);
      expect(result[0].data).toHaveProperty('mnemonic');
      expect(result[0].data).toHaveProperty('hdPath');
      expect(result[0].data).toHaveProperty('numberOfAccounts');
    });

    it('all keyrings will fail with wrong passphrase', async () => {
      await expect(wallet.export('wrong passphrase')).rejects.toThrow('wrong passphrase');
    });

    it('any account', async () => {
      const address = await wallet.addAccount();
      const result = await wallet.exportAccount(address, walletPassphase);
      expect(result.address).toBe(address);
      expect(result.encoded).not.toBeUndefined();
    });

    it('exportAccount() will fail with wrong passphrase', async () => {
      const address = await wallet.addAccount();
      await expect(wallet.exportAccount(address, 'wrong passphrase')).rejects.toThrow('wrong passphrase');
    });

    it('exportAccount() will fail when account not exists', async () => {
      await expect(wallet.exportAccount(TEST_ACCOUNT.address, walletPassphase)).rejects.toThrow();
    });
  });
});
