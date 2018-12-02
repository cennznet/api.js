import Keyring from '@polkadot/keyring';
import {Prefix} from '@polkadot/keyring/address/types';
import {KeyringInstance, KeyringPair, KeyringPair$Json, KeyringPair$Meta} from '@polkadot/keyring/types';
import {AnyNumber, AnyU8a} from '@polkadot/types/types';
import Extrinsic from '@polkadot/types/Extrinsic';
import {WalletInterface} from 'cennznet-types';

export interface TxOpt {
    from: string;
    nonce?: AnyNumber;
    blockHash?: AnyU8a;
    genesisHash?: Uint8Array;
}

export class Wallet implements WalletInterface, KeyringInstance {
    protected _keyring: Keyring;
    constructor() {
        this._keyring = new Keyring();
    }

    public get keyring(): Keyring {
        return this._keyring;
    }

    public async sign(extrinsic: Extrinsic, opt: TxOpt): Promise<void> {
        const signerPair = this._keyring.getPair(opt.from);
        if (!signerPair) {
            throw new Error('Signer secretKey not found:' + opt.from);
        }

        extrinsic.sign(signerPair, opt.nonce, opt.genesisHash);
    }

    //all KeyringInstance functions redirect to _keyring
    addFromAddress(address: string | Uint8Array, meta?: KeyringPair$Meta): KeyringPair {
        return this._keyring.addFromAddress(address, meta);
    }

    addFromJson(pair: KeyringPair$Json): KeyringPair {
        return this._keyring.addFromJson(pair);
    }

    addFromMnemonic(mnemonic: string, meta?: KeyringPair$Meta): KeyringPair {
        return this._keyring.addFromMnemonic(mnemonic, meta);
    }

    addFromSeed(seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair {
        return this._keyring.addFromSeed(seed, meta);
    }

    addPair(pair: KeyringPair): KeyringPair {
        return this._keyring.addPair(pair);
    }

    decodeAddress(encoded: string | Uint8Array): Uint8Array {
        return this._keyring.decodeAddress(encoded);
    }

    encodeAddress(key: Uint8Array | string): string {
        return this._keyring.encodeAddress(key);
    }

    getPair(address: string | Uint8Array): KeyringPair {
        return this._keyring.getPair(address);
    }

    getPairs(): Array<KeyringPair> {
        return this._keyring.getPairs();
    }

    getPublicKeys(): Array<Uint8Array> {
        return this._keyring.getPublicKeys();
    }

    removePair(address: string | Uint8Array): void {
        this._keyring.removePair(address);
    }

    setAddressPrefix(prefix: Prefix): void {
        this._keyring.setAddressPrefix(prefix);
    }

    toJson(address: string | Uint8Array, passphrase?: string): KeyringPair$Json {
        return this._keyring.toJson(address, passphrase);
    }
}
