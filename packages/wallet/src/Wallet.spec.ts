import extrinsics from '@polkadot/extrinsics/static';
import {Extrinsic, Method} from '@polkadot/types';
import {hexToU8a} from '@polkadot/util';
import {Wallet} from './';
import TestingPairs from '@polkadot/keyring/testingPairs';
import {HDKeyring} from './keyrings/HDKeyring';
import {SimpleKeyring} from './keyrings/SimpleKeyring';

const TESTING_PAIRS = TestingPairs();

const TEST_ACCOUNT = {
    seed: '0x3cf2ec6ffd26587529ab06c82ba9b33110198085f5c6b8d882653d056bf9e0d3',
    address: '5DHzypfuQH7FPhCsrqMxpxkBaPHe8QNhc5s1PwEMDc5p5Nb7',
    publicKey: '0x366010e706af618a6037731b07663d4b6f10eac201c7fdd5fb0bd4727742524d',
    mnemonic: 'insane push cradle toilet token gate chair trim spare blush rebuild top',
};

const GENESIS_HASH = '0x14ba3ad1bf42740e82a408d57955b0c026bfc268ee559ce9081ba7fb530de815';

describe('a wallet', () => {
    let wallet: Wallet;
    let testExtrinsic: Extrinsic;
    const alice = TESTING_PAIRS.alice;
    const bob = TESTING_PAIRS.bob;
    const walletPassphase = 'a test wallet passphase';

    beforeAll(() => {
        Method.injectMethods(extrinsics);
    });

    beforeEach(async () => {
        wallet = new Wallet();
        await wallet.createNewVault(walletPassphase);
        testExtrinsic = new Extrinsic('0x010200ea51b75b00000000');
    });

    it('create and restore', async () => {
        const newPassphrase = 'new passphrase';
        const mnemonic = 'kite manual pizza regret forget edge jelly leaf draft arrest knock parade';
        const keyring = new HDKeyring({mnemonic});
        await wallet.createNewVaultAndRestore(newPassphrase, [keyring]);
        await expect(wallet.addAccount()).resolves.toBe('5HDruG9uYPyF2aRfYXwUhoEk4eZ8oZLbYr6KiHKR6AbTMyMR');
    });

    describe('accounts', () => {
        it('addKeyring(keyring)', async () => {
            const keyring = new SimpleKeyring();
            await keyring.addPair(alice);
            await wallet.addKeyring(keyring);
            await expect(wallet.getAddresses()).resolves.toEqual(expect.arrayContaining([alice.address()]));
        });

        it('remove removeAccount', async () => {
            const keyring = new SimpleKeyring();

            await keyring.addPair(alice);
            await keyring.addPair(bob);
            await wallet.addKeyring(keyring);
            await wallet.removeAccount(alice.address());
            await expect(wallet.getAddresses()).resolves.toEqual(expect.not.arrayContaining([alice.address()]));
        });

        it('throw error when trying to add keyring with duplicate accounts', async () => {
            const keyring = new SimpleKeyring();
            const keyring2 = new SimpleKeyring();
            [] = [await keyring.addPair(alice), await keyring2.addPair(alice)];
            await wallet.addKeyring(keyring);
            await expect(wallet.addKeyring(keyring2)).rejects.toThrow();
            await wallet.removeAccount(alice.address());
            await wallet.addKeyring(keyring2);
        });

        it('try resolve conflicts #1', async () => {
            const account0 = {
                address: '5DMoKb4xQBUgB8XRz3dPfkKkEYGrQ9UkUEYHrrucAfTqyBxm',
            };
            const account1 = {
                address: '5GnGjKZcdmbQfYUyShSkDi1PE9HE93wj1J5zxHtZ4cYP43fh',
                seed: '0x4175f9081d64c9eea1f1cf7dbdcd58069a0e8bf09e36facdd7e62c59f0c96124',
            };
            // keyring#0 is hdkeyring with 1 account(account0) and account1 is the next account
            const vault =
                '0x9f8d20b8b5e82ebc4a37a004e7dc0bdfce2176a4a0f2b8987c14261099766dda118ef4f7532521536cca69420a70fd3dd42f19fd239954c05ccdfb730566f47eadafae012680dec565e4ced5e01393aeb04c234354bf79697014c7f57b37eb3416b7ae0be7d06856734ed5bb33ab5bf32d0e4ecb8430b6654de7d006f922e479fdcb148015f56d3184ca6b80f30b778c5afb79620ebf59ea9e82d39b90c5a57ba8248d8f9024e655d156040144e21c';
            const wallet = new Wallet({vault});
            await wallet.unlock(null);
            await expect(wallet.getAddresses()).resolves.toEqual(expect.arrayContaining([account0.address]));
            // add a SimpleKeyring with the coming account in it
            const keyring = new SimpleKeyring();
            await keyring.addFromSeed(hexToU8a(account1.seed));
            await wallet.addKeyring(keyring);
            // call default keyring(hdkeyring)'s addAccount(), which will lead to a conflict with SimpleKeyring.
            await wallet.addAccount();
            // account1 can not be removed from hdkeyring, so it will be removed from SimpleKeyring
            await expect(keyring.getAddresses()).resolves.toHaveLength(0);
        });

        it('try resolve conflicts #2', async () => {
            const account0 = {
                address: '5DMoKb4xQBUgB8XRz3dPfkKkEYGrQ9UkUEYHrrucAfTqyBxm',
            };
            const account1 = {
                address: '5GnGjKZcdmbQfYUyShSkDi1PE9HE93wj1J5zxHtZ4cYP43fh',
                seed: '0x4175f9081d64c9eea1f1cf7dbdcd58069a0e8bf09e36facdd7e62c59f0c96124',
            };
            // keyring#0 is a SimpleKeyring with 1 account(account1)
            const vault =
                '0xbf44f9de75ae49c510ff145374d82352e9271c1e648d65c276e525cb95326f915b7e724758c955822435476061e0a5cad87075d693e60c61cc617b6f04949a99cfffa2b881048e5e03a6701480004614c14a037e2ab01a41b3776d6f1cc1a7578a0bc8eb5c5e9070181633b62b48430be4cf8ca9c4e8304c850029751f919f865b1e3dadf7a6e619cd57dd5c5c958c0c3ea928aa0d6993995cd725520a1df81526f6989d716f0a3fb07e48e4dbf73c59e6d849279a50198b50cf25046d24c663d4b6664a0040e91554aebfd1c8b1219533320c0cb8b90b99041eb3cf6e4a3165f5c01145d4579191aae066b7cf600493f783a2d89158f4bc415172d231b5f35940c9ff00ead6e924eed7c464934f105244a071367d53440745a1b066a7ecea37035c428d29bb08d25186e7ce86';
            const wallet = new Wallet({vault, keyringTypes: [SimpleKeyring, HDKeyring]});
            await wallet.unlock('test');
            await expect(wallet.getAddresses()).resolves.toEqual(expect.arrayContaining([account1.address]));
            // keyring#1 is a hdkeyring with 1 account(account0) and account1 is the next account
            const keyring = new HDKeyring();
            const mnemonic = 'urban tuna work fiber excuse gown adult grab winner rigid lamp appear';
            await keyring.deserialize({
                mnemonic,
                numberOfAccounts: 1,
                hdPath: "m/44'/392'/0'/0",
            });
            await wallet.addKeyring(keyring);
            expect((wallet as any)._accountKeyringMap[account1.address]).toBe(0);
            expect((wallet as any)._accountKeyringMap[account0.address]).toBe(1);
            // call generate next account in hdkeyring, which will lead to a conflict with SimpleKeyring.
            await keyring.addPair();
            // call wallet's addAccount() so that wallet can detect the account conflict.
            await wallet.addAccount();
            // conflict solved by removing account1 from simple keyring
            expect((wallet as any)._accountKeyringMap[account1.address]).toBe(1);
        });

        it('try resolve conflicts #3', async () => {
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

        it('recover wallet from vault could fail without correct keyringTypes', async () => {
            const vault =
                '0xbf44f9de75ae49c510ff145374d82352e9271c1e648d65c276e525cb95326f915b7e724758c955822435476061e0a5cad87075d693e60c61cc617b6f04949a99cfffa2b881048e5e03a6701480004614c14a037e2ab01a41b3776d6f1cc1a7578a0bc8eb5c5e9070181633b62b48430be4cf8ca9c4e8304c850029751f919f865b1e3dadf7a6e619cd57dd5c5c958c0c3ea928aa0d6993995cd725520a1df81526f6989d716f0a3fb07e48e4dbf73c59e6d849279a50198b50cf25046d24c663d4b6664a0040e91554aebfd1c8b1219533320c0cb8b90b99041eb3cf6e4a3165f5c01145d4579191aae066b7cf600493f783a2d89158f4bc415172d231b5f35940c9ff00ead6e924eed7c464934f105244a071367d53440745a1b066a7ecea37035c428d29bb08d25186e7ce86';
            const wallet = new Wallet({vault});
            await expect(wallet.unlock('test')).rejects.toThrow('keyring type SimpleKeyring not found');
            const wallet2 = new Wallet({vault, keyringTypes: [SimpleKeyring, HDKeyring]});
            await wallet2.unlock('test');
        });
    });

    describe('sign message', () => {
        it('the signer is managed by the wallet', async () => {
            const keyring = new SimpleKeyring();
            await keyring.addPair(alice);
            await wallet.addKeyring(keyring);
            await wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH});
            expect(testExtrinsic.isSigned).toBeTruthy();
            const anotherAccountAddress = await wallet.addAccount();
            const testExtrinsic2 = new Extrinsic('0x010200ea51b75b00000000');
            await wallet.sign(testExtrinsic2, {from: anotherAccountAddress, nonce: 0, blockHash: GENESIS_HASH});
            expect(testExtrinsic2.isSigned).toBeTruthy();
        });
        it('the signer is not in the wallet', async () => {
            await expect(
                wallet.sign(testExtrinsic, {from: bob.address(), nonce: 0, blockHash: GENESIS_HASH})
            ).rejects.toThrow();
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
                await expect(
                    wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH})
                ).rejects.toThrow();
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
                await expect(wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH}))
                    .resolves;
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
                await expect(wallet.removeAccount(alice.address())).rejects.toThrow('wallet is locked');
            });
            it('can not sign tx', async () => {
                await expect(
                    wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH})
                ).rejects.toThrow('wallet is locked');
            });
        });
    });

    describe('export', () => {
        it('all keyrings', async () => {
            const result = await wallet.export(walletPassphase);
            expect(result).toHaveLength(1);
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
