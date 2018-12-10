import Keyring from '@polkadot/keyring';
import {KeyringPair, KeyringPair$Json, KeyringPair$Meta} from '@polkadot/keyring/types';
import Extrinsic from '@polkadot/types/Extrinsic';
import {TxOpt, WalletInterface} from 'cennznet-types';

const privateProps = new WeakMap<object, Keyring>();

export class Wallet implements WalletInterface {
    constructor() {
        privateProps.set(this, new Keyring());
    }

    public async sign(extrinsic: Extrinsic, opt: TxOpt): Promise<void> {
        const signerPair = privateProps.get(this).getPair(opt.from);

        extrinsic.sign(signerPair, opt.nonce, opt.blockHash);
    }

    //all KeyringInstance functions redirect to _keyring
    addFromJson(pair: KeyringPair$Json, passphrase?: string): KeyringPair {
        const keyPair = privateProps.get(this).addFromJson(pair);
        try {
            keyPair.decodePkcs8(passphrase);
        } catch (e) {
            privateProps.get(this).removePair(pair.address);
            throw e;
        }
        return keyPair;
    }

    addFromMnemonic(mnemonic: string, meta?: KeyringPair$Meta): KeyringPair {
        return privateProps.get(this).addFromMnemonic(mnemonic, meta);
    }

    addFromSeed(seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair {
        return privateProps.get(this).addFromSeed(seed, meta);
    }

    addPair(pair: KeyringPair): KeyringPair {
        if (pair.isLocked()) {
            throw new Error('key pair is locked. unlock before add it into wallet');
        }
        return privateProps.get(this).addPair(pair);
    }

    getPair(address: string | Uint8Array): KeyringPair {
        return privateProps.get(this).getPair(address);
    }

    getPairs(): Array<KeyringPair> {
        return privateProps.get(this).getPairs();
    }

    removePair(address: string | Uint8Array): void {
        privateProps.get(this).removePair(address);
    }
}
