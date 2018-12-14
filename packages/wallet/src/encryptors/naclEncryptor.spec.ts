import naclEncryptor from './naclEncryptor';

describe('nacl encryptor', () => {
    it('can encrypt and decrypt with a passphrase', async () => {
        const data = {
            'account#1':
                '0x3053020101300506032b657004220420426f622020202020202020202020202020202020202020202020202020202020a123032100d7568e5f0a7eda67a82691ff379ac4bba4f9c9b859fe779b5d46363b61ad2db9',
            'account#2':
                '0x3053020101300506032b657004220420416c696365202020202020202020202020202020202020202020202020202020a123032100d172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f',
            'account#3':
                '0x3053020101300506032b657004220420416c696365202020202020202020202020202020202020202020202020202020a123032100d172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f',
        };
        const password = 'any string password is fine';
        const encrypted = await naclEncryptor.encrypt(password, data);
        expect(encrypted).not.toBeUndefined();
        const decrypted = await naclEncryptor.decrypt(password, encrypted);
        expect(decrypted).toEqual(data);
    });
    it('throw error when using wrong passphrase', async () => {
        const data = {
            'account#1':
                '0x3053020101300506032b657004220420426f622020202020202020202020202020202020202020202020202020202020a123032100d7568e5f0a7eda67a82691ff379ac4bba4f9c9b859fe779b5d46363b61ad2db9',
            'account#2':
                '0x3053020101300506032b657004220420416c696365202020202020202020202020202020202020202020202020202020a123032100d172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f',
            'account#3':
                '0x3053020101300506032b657004220420416c696365202020202020202020202020202020202020202020202020202020a123032100d172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f',
        };
        const password = 'any string password is fine';
        const encrypted = await naclEncryptor.encrypt(password, data);
        expect(encrypted).not.toBeUndefined();
        await expect(naclEncryptor.decrypt('wrong passphrase', encrypted)).rejects.toThrow();
    });
});
