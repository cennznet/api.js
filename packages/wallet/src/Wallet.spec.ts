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
    const alice = TESTING_PAIRS.alice;
    const bob = TESTING_PAIRS.bob;

    beforeEach(() => {
        wallet = new Wallet();
    });

    describe('import account', () => {
        describe('from json', () => {
            it('with currect password', () => {
                const pwd = 'randompwd';
                const json = alice.toJson(pwd);
                const pair = wallet.addFromJson(json, pwd);
                expect(pair.isLocked()).toEqual(false);
                expect(() => wallet.getPair(alice.address())).not.toThrow();
            });
            it('with wrong password', () => {
                const pwd = 'randompwd';
                const wrongPwd = 'wrongpwd';
                const json = alice.toJson(pwd);
                expect(() => wallet.addFromJson(json, wrongPwd)).toThrow();
            });
            it('with empty password', () => {
                const json = alice.toJson();
                const pair = wallet.addFromJson(json);
                expect(pair.isLocked()).toEqual(false);
                expect(() => wallet.getPair(alice.address())).not.toThrow();
            });
            it('with wrong encoded data', () => {
                const json = alice.toJson();
                json.encoded = json.encoded + '1';
                expect(() => wallet.addFromJson(json)).toThrow();
            });
        });
        it('from seed', () => {
            const pair = wallet.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(TEST_ACCOUNT.address);
            expect(wallet.getPair(TEST_ACCOUNT.address)).not.toBeUndefined();
        });
        it('from mnemonic', () => {
            const pair = wallet.addFromMnemonic(TEST_ACCOUNT.mnemonic);
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(TEST_ACCOUNT.address);
            expect(wallet.getPair(TEST_ACCOUNT.address)).not.toBeUndefined();
        });
        it('from key pair', () => {
            const pair = wallet.addPair(alice);
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(alice.address());
            expect(wallet.getPair(alice.address())).not.toBeUndefined();
        });
        it('from locked key pair', () => {
            const pair = wallet.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
            pair.lock();
            expect(() => wallet.addPair(pair)).toThrow();
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

    it('remove pair', () => {
        wallet.addPair(alice);
        wallet.addPair(bob);
        wallet.removePair(alice.address());
        expect(() => wallet.getPair(alice.address())).toThrow();
        expect(() => wallet.getPair(bob.address())).not.toThrow();
        expect(wallet.getPairs()).toHaveLength(1);
    });

    describe('sign message', () => {
        beforeAll(() => {
            Method.injectExtrinsics(extrinsics);
        });
        it('the signer is managed by the wallet', async () => {
            wallet.addPair(alice);
            const extrinsic = new Extrinsic('0x010200ea51b75b00000000');
            await wallet.sign(extrinsic, {from: alice.address(), nonce: 0, blockHash: GENESIS_HASH});
            expect(extrinsic.toHex()).toBe(
                '0xd50181ffd172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f72d4cd88ce13b18d86f4d0381dfa4aed3c29c73e2b1b7f37009cdee04ce47c6ad60287820845ed650009825791b478af85900c21f2512a559a3771fa9fb6800d0000000000000000000200ea51b75b00000000'
            );
        });
        it('the signer is not in the wallet', async () => {
            wallet.addPair(alice);
            const extrinsic = new Extrinsic('0x010200ea51b75b00000000');
            await expect(
                wallet.sign(extrinsic, {from: bob.address(), nonce: 0, blockHash: GENESIS_HASH})
            ).rejects.not.toBeUndefined();
        });
    });
});
