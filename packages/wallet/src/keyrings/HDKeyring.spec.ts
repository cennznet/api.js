import {KeyringPair} from '@polkadot/keyring/types';
import {IKeyring} from 'cennznet-types';
import {HDKeyring} from './HDKeyring';

describe('HDKeyring', () => {
    describe('happy path', () => {
        const times = 10;
        let keyring: IKeyring<any>;
        let keyPairs: KeyringPair[];
        beforeEach(async () => {
            keyring = await HDKeyring.generate();
            keyPairs = [];
            for (let i = 0; i < times; i++) {
                const keyPair = await keyring.addPair();
                keyPairs.push(keyPair);
            }
            expect(keyPairs).toHaveLength(times);
        });

        it('removePair(address) not support', async () => {
            const kp = keyPairs[0];
            await expect(keyring.removePair(kp.address())).rejects.toThrow("doesn't support removePair");
        });
    });

    it('throw error if not initialized', async () => {
        const keyring = new HDKeyring();
        await expect(keyring.addPair()).rejects.toThrow('hd wallet not initialized');
    });

    it('recover from mnemonic', async () => {
        const keyring = new HDKeyring();
        await keyring.deserialize({mnemonic: 'urban tuna work fiber excuse gown adult grab winner rigid lamp appear'});
    });
});
