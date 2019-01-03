import TestingPairs from '@polkadot/keyring/testingPairs';
import {hexToU8a} from '@polkadot/util';
import {SimpleKeyring} from './SimpleKeyring';

const TESTING_PAIRS = TestingPairs();

const TEST_ACCOUNT = {
    seed: '0x3cf2ec6ffd26587529ab06c82ba9b33110198085f5c6b8d882653d056bf9e0d3',
    address: '5DHzypfuQH7FPhCsrqMxpxkBaPHe8QNhc5s1PwEMDc5p5Nb7',
    publicKey: '0x366010e706af618a6037731b07663d4b6f10eac201c7fdd5fb0bd4727742524d',
    mnemonic: 'insane push cradle toilet token gate chair trim spare blush rebuild top',
};

describe('SimpleKeyring', () => {
    const alice = TESTING_PAIRS.alice;
    const bob = TESTING_PAIRS.bob;
    describe('import account', () => {
        let keyring: SimpleKeyring;
        beforeEach(() => {
            keyring = new SimpleKeyring();
        });

        describe('from json', () => {
            it('with currect password', async () => {
                const pwd = 'randompwd';
                const json = alice.toJson(pwd);
                const pair = await keyring.addFromJson(json, pwd);
                expect(pair.isLocked()).toEqual(false);
                expect(() => keyring.getPair(alice.address())).not.toThrow();
            });
            it('with wrong password', async () => {
                const pwd = 'randompwd';
                const wrongPwd = 'wrongpwd';
                const json = alice.toJson(pwd);
                await expect(keyring.addFromJson(json, wrongPwd)).rejects.toThrow();
            });
            it('with empty password', async () => {
                const json = alice.toJson();
                const pair = await keyring.addFromJson(json);
                expect(pair.isLocked()).toEqual(false);
                expect(() => keyring.getPair(alice.address())).not.toThrow();
            });
            it('with wrong encoded data', async () => {
                const json = alice.toJson();
                json.encoded = json.encoded + '1';
                await expect(keyring.addFromJson(json)).rejects.toThrow();
            });
        });
        it('from seed', async () => {
            const pair = await keyring.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(TEST_ACCOUNT.address);
            expect(keyring.getPair(TEST_ACCOUNT.address)).not.toBeUndefined();
        });
        it('from mnemonic', async () => {
            const pair = await keyring.addFromMnemonic(TEST_ACCOUNT.mnemonic);
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(TEST_ACCOUNT.address);
            expect(keyring.getPair(TEST_ACCOUNT.address)).not.toBeUndefined();
        });
        it('from key pair', async () => {
            const pair = await keyring.addPair(alice);
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(alice.address());
            expect(keyring.getPair(alice.address())).not.toBeUndefined();
        });
        it('from locked key pair', async () => {
            const pair = await keyring.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
            pair.lock();
            await expect(keyring.addPair(pair)).rejects.toThrow();
        });
    });
});
