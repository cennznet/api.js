import {createType, Struct, Vec} from '@polkadot/types';
import {Digest, DigestItem, Hash, Header, Justification} from '@polkadot/types/interfaces';
import {AnyNumber, AnyU8a, Registry} from '@polkadot/types/types';
import {blake2AsU8a} from '@polkadot/util-crypto';
import {Extrinsic} from '../../extrinsic';

export interface HeaderValue {
  digest?:
    | Digest
    | {
        logs: DigestItem[];
      };
  extrinsicsRoot?: AnyU8a;
  number?: AnyNumber;
  parentHash?: AnyU8a;
  stateRoot?: AnyU8a;
}

export interface BlockValue {
  extrinsics?: AnyU8a[];
  header?: HeaderValue;
}
/**
 * @name Block
 * @description
 * A block encoded with header and extrinsics
 */
export default class Block extends Struct {
  constructor(registry, value) {
    super(
      registry,
      {
        header: 'Header',
        extrinsics: 'Vec<Extrinsic>',
      },
      value
    );
  }
  /**
   * @description Encodes a content [[Hash]] for the block
   */
  get contentHash() {
    // tslint:disable-next-line:no-magic-numbers
    return createType(this.registry, 'Hash', blake2AsU8a(this.toU8a(), 256));
  }
  /**
   * @description The [[Extrinsic]] contained in the block
   */
  get extrinsics(): Vec<Extrinsic> {
    // console.log('*************** INSIDE GET EXTRINSIC FROM BLOCK************');
    return this.get('extrinsics');
  }
  /**
   * @description Block/header [[Hash]]
   */
  get hash(): Hash {
    return this.header.hash;
  }
  /**
   * @description The [[Header]] of the block
   */
  get header(): Header {
    // @ts-ignore
    return this.get('header');
  }
}

export interface SignedBlock extends Struct {
  readonly block: Block;
  readonly justification: Justification;
}
