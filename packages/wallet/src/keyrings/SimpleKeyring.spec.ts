import {cryptoWaitReady, hexToU8a, TestingPairs, u8aToHex} from '@cennznet/util';
import {SimpleKeyring} from './SimpleKeyring';
import {stringToU8a} from '@plugnet/util';

const TESTING_PAIRS = TestingPairs();

const TEST_ACCOUNT_SEED = {
    seed: '0x3cf2ec6ffd26587529ab06c82ba9b33110198085f5c6b8d882653d056bf9e0d3',
    address: '5Gj98ssm6wbq3WHgjuXmoMCrZQurBb85EwfwoHAmJr7W4iE6',
    publicKey: '0xce415b82522c8342768e165fceb76167334a903804f14aee214cae8284766c61',
};

// const TEST_ACCOUNT_SEED = {
//     seed: stringToU8a(('cennznetjstest2' as any).padEnd(32, ' '))
// };

const TEST_ACCOUNT_MNEMONIC = {
    addressSR: '5GRRiw6cCUJYHF2siie4smLvGcReyynk5Mxr7XYiR5rCthgf',
    addressED: '5CjYyitzVLkxJhoYi5mS8ALM7JrzKAqcz5rtXYpaAiLxEPnU',
    mnemonic: 'insane push cradle toilet token gate chair trim spare blush rebuild top',
};

describe('SimpleKeyring', () => {
    const alice = TESTING_PAIRS.alice;
    it('recover keyring', async () => {
        const json = alice.toJson();
        const kr = new SimpleKeyring([json]);
        await expect(kr.getAddresses()).resolves.toEqual(expect.arrayContaining([alice.address()]));
    });

    describe('import account', () => {
        let keyring: SimpleKeyring;
        beforeAll(async () => {
            await cryptoWaitReady();
        });

        beforeEach(() => {
            keyring = new SimpleKeyring();
        });

        describe('from json', () => {
            it('with currect password', async () => {
                const pwd = 'randompwd';
                const json = alice.toJson(pwd);
                const pair = keyring.addFromJson(json, undefined, pwd);
                expect(pair.isLocked()).toEqual(false);
                await expect(keyring.getPair(alice.address())).resolves.not.toBeUndefined();
            });

            it('with currect password, ignore checksum', async () => {
                const pwd = 'randompwd';
                const json = alice.toJson(pwd);
                const pair = keyring.addFromJson(json, true, pwd);
                expect(pair.isLocked()).toEqual(false);
                await expect(keyring.getPair(alice.address())).resolves.not.toBeUndefined();
            });

            it('with wrong password', async () => {
                const pwd = 'randompwd';
                const wrongPwd = 'wrongpwd';
                const json = alice.toJson(pwd);
                expect(() => keyring.addFromJson(json, undefined, wrongPwd)).toThrow();
            });
            it('with empty password', async () => {
                const json = alice.toJson();
                const pair = keyring.addFromJson(json);
                expect(pair.isLocked()).toEqual(false);
                await expect(keyring.getPair(alice.address())).resolves.not.toBeUndefined();
            });
            it('with wrong encoded data', async () => {
                const json = alice.toJson();
                json.encoded = json.encoded + '1';
                expect(() => keyring.addFromJson(json)).toThrow();
            });
        });
        it('from seed', async () => {
            const pair = keyring.addFromSeed(hexToU8a(TEST_ACCOUNT_SEED.seed));
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(TEST_ACCOUNT_SEED.address);
            await expect(keyring.getPair(TEST_ACCOUNT_SEED.address)).resolves.not.toBeUndefined();
        });

        describe('from mnemonic', () => {
            it('from mnemonic using ed25519', async () => {
                const pair = keyring.addFromMnemonic(TEST_ACCOUNT_MNEMONIC.mnemonic, {}, 'ed25519');
                expect(pair.isLocked()).toEqual(false);
                expect(pair.address()).toEqual(TEST_ACCOUNT_MNEMONIC.addressED);
                await expect(keyring.getPair(TEST_ACCOUNT_MNEMONIC.addressED)).resolves.not.toBeUndefined();
            });

            it('from mnemonic using sr25519', async () => {
                const pair = keyring.addFromMnemonic(TEST_ACCOUNT_MNEMONIC.mnemonic, {}, 'sr25519');
                expect(pair.isLocked()).toEqual(false);
                expect(pair.address()).toEqual(TEST_ACCOUNT_MNEMONIC.addressSR);
                await expect(keyring.getPair(TEST_ACCOUNT_MNEMONIC.addressSR)).resolves.not.toBeUndefined();
            });
        });

        it('from key pair', async () => {
            const pair = await keyring.addPair(alice);
            expect(pair.isLocked()).toEqual(false);
            expect(pair.address()).toEqual(alice.address());
            await expect(keyring.getPair(alice.address())).resolves.not.toBeUndefined();
        });
        it('from locked key pair', async () => {
            const pair = keyring.addFromSeed(hexToU8a(TEST_ACCOUNT_SEED.seed));
            pair.lock();
            await expect(keyring.addPair(pair)).rejects.toThrow();
        });
    });
});
