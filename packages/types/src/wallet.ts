import {Extrinsic} from '@polkadot/types';
import {AnyNumber, AnyU8a} from '@polkadot/types/types';

export interface TxOpt {
    from: string;
    nonce?: AnyNumber;
    blockHash?: AnyU8a;
    genesisHash?: Uint8Array;
}

export interface WalletInterface {
    sign(extrinsic: Extrinsic, opt: TxOpt): Promise<void>;
}
