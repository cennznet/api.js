import extrinsics from '@polkadot/extrinsics/static';
import {Extrinsic, Method} from '@polkadot/types';
import {hexToU8a} from '@polkadot/util';
import {Wallet} from './';
import TestingPairs from '@polkadot/keyring/testingPairs';

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
        Method.injectExtrinsics(extrinsics);
    });

    beforeEach(async () => {
        wallet = new Wallet();
        await wallet.createNewVault(walletPassphase);
        testExtrinsic = new Extrinsic('0x010200ea51b75b00000000');
    });

    describe('import account', () => {
        describe('from json', () => {
            it('with currect password', async () => {
                const pwd = 'randompwd';
                const json = alice.toJson(pwd);
                const pair = await wallet.addFromJson(json, pwd);
                expect(pair.isLocked()).toEqual(false);
                expect(() => wallet.getPair(alice.address())).not.toThrow();
            });
            it('with wrong password', async () => {
                const pwd = 'randompwd';
                const wrongPwd = 'wrongpwd';
                const json = alice.toJson(pwd);
                await expect(wallet.addFromJson(json, wrongPwd)).rejects.toThrow();
            });
            it('with empty password', async () => {
                const json = alice.toJson();
                const pair = await wallet.addFromJson(json);
                expect(pair.isLocked()).toEqual(false);
                expect(() => wallet.getPair(alice.address())).not.toThrow();
            });
            it('with wrong encoded data', async () => {
                const json = alice.toJson();
                json.encoded = json.encoded + '1';
                await expect(wallet.addFromJson(json)).rejects.toThrow();
            });
        });
        it('from seed', async () => {
            const pair = await wallet.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(TEST_ACCOUNT.address);
            expect(wallet.getPair(TEST_ACCOUNT.address)).not.toBeUndefined();
        });
        it('from mnemonic', async () => {
            const pair = await wallet.addFromMnemonic(TEST_ACCOUNT.mnemonic);
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(TEST_ACCOUNT.address);
            expect(wallet.getPair(TEST_ACCOUNT.address)).not.toBeUndefined();
        });
        it('from key pair', async () => {
            const pair = await wallet.addPair(alice);
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(alice.address());
            expect(wallet.getPair(alice.address())).not.toBeUndefined();
        });
        it('from locked key pair', async () => {
            const pair = await wallet.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
            pair.lock();
            await expect(wallet.addPair(pair)).rejects.toThrow();
        });
    });

    describe('get pair(s)', () => {
        beforeEach(() => {
            wallet.addPair(alice);
            wallet.addPair(bob);
        });

        it('get pair', () => {
            const pair = wallet.getPair(alice.address());
            expect(pair).not.toBeUndefined();
            expect(pair.address()).toBe(alice.address());
        });

        it('get pairs', () => {
            const pairs = wallet.getPairs();
            expect(pairs).toHaveLength(2);
            expect(pairs.findIndex(kp => kp.address() === alice.address())).toBeGreaterThan(-1);
            expect(pairs.findIndex(kp => kp.address() === bob.address())).toBeGreaterThan(-1);
        });
    });

    it('remove pair', async () => {
        await wallet.addPair(alice);
        await wallet.addPair(bob);
        await wallet.removePair(alice.address());
        await expect(() => wallet.getPair(alice.address())).toThrow();
        await expect(() => wallet.getPair(bob.address())).not.toThrow();
        expect(wallet.getPairs()).toHaveLength(1);
    });

    describe('sign message', () => {
        it('the signer is managed by the wallet', async () => {
            await wallet.addPair(alice);
            await wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH});
            expect(testExtrinsic.toHex()).toBe(
                '0xd50181ffd172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f72d4cd88ce13b18d86f4d0381dfa4aed3c29c73e2b1b7f37009cdee04ce47c6ad60287820845ed650009825791b478af85900c21f2512a559a3771fa9fb6800d0000000000000000000200ea51b75b00000000'
            );
        });
        it('the signer is not in the wallet', async () => {
            await expect(
                wallet.sign(testExtrinsic, {from: bob.address(), nonce: 0, blockHash: GENESIS_HASH})
            ).rejects.toThrow();
        });
    });

    describe('lock/unlock', () => {
        beforeEach(async () => {
            [] = [
                await wallet.addPair(alice),
                await wallet.addPair(bob),
                await wallet.addFromSeed(hexToU8a(TEST_ACCOUNT.seed)),
            ];
        });
        describe('when wallet is unlocked', () => {
            it('can lock', async () => {
                expect(wallet.getPairs()).toHaveLength(3);
                expect(wallet.isLocked()).not.toBeTruthy();
                await wallet.lock();
                expect(wallet.isLocked()).toBeTruthy();
                expect(() => wallet.getPairs()).toThrow();
                await expect(
                    wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH})
                ).rejects.toThrow();
            });
            it('can not unlock again', async () => {
                await expect(wallet.unlock(walletPassphase)).rejects.toThrow();
            });
        });
        describe('when wallet is locked', () => {
            beforeEach(async () => {
                await wallet.addPair(alice);
                await wallet.lock();
            });
            it('can unlock', async () => {
                expect(() => wallet.getPairs()).toThrow();
                expect(wallet.isLocked()).toBeTruthy();
                await wallet.unlock(walletPassphase);
                expect(wallet.isLocked()).not.toBeTruthy();
                expect(wallet.getPairs()).toHaveLength(3);
                await expect(wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH}))
                    .resolves;
            });
            it('can not add key pair', async () => {
                await expect(wallet.addPair(bob)).rejects.toThrow();
                await expect(wallet.addFromJson(bob.toJson())).rejects.toThrow();
                await expect(wallet.addFromSeed(hexToU8a(TEST_ACCOUNT.seed))).rejects.toThrow();
                await expect(wallet.addFromMnemonic(TEST_ACCOUNT.mnemonic)).rejects.toThrow();
            });
            it('can not get key pair', async () => {
                expect(() => wallet.getPairs()).toThrow();
                expect(() => wallet.getPair(alice.address())).toThrow();
            });
            it('can not remove key pair', async () => {
                await expect(wallet.removePair(alice.address())).rejects.toThrow();
            });
            it('can not sign tx', async () => {
                await expect(
                    wallet.sign(testExtrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH})
                ).rejects.toThrow();
            });
        });
    });
});
