import {AnyNumber, AnyU8a} from '@polkadot/types/types';

export interface TxOpt {
    from: string;
    nonce?: AnyNumber;
    blockHash?: AnyU8a;
}

export {Encryptor, IKeyring, ISigner, IWallet} from './wallet';
