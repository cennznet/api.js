import { Struct } from '@polkadot/types';
import { Codec, Registry } from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';
import { CollectionId, SerialNumber, SeriesId } from './types';

interface TokenIdValue {
    collectionId: string | number,
    seriesId: string | number,
    serialNumber: string | number,
}

export class EnhancedTokenId extends Struct implements Codec {
    constructor(registry: Registry, value?: TokenIdValue | [number, number, number] | any) {
      super(
        registry,
        {
            collectionId: 'CollectionId',
            seriesId: 'SeriesId',
            serialNumber: 'SerialNumber',
        },
        value
      );
    }

    /**
    * @description The collection the token belongs to
    */
    get collectionId(): CollectionId {
        return this.get('collectionId') as CollectionId;
    }

    /**
    * @description The collection series the token belongs to
    */
    get seriesId(): SeriesId {
        return this.get('seriesId') as SeriesId;
    }

    /**
    * @description The series number the token is in
    */
    get serialNumber(): SerialNumber {
        return this.get('serialNumber') as SerialNumber;
    }

    /**
    * @description Return the hex representation of the Id
    */
    toHex(): string {
        const tokenId = new Uint8Array([
            ...this.collectionId.toBn().toArray('le', 4),
            ...this.seriesId.toBn().toArray('le', 4),
            ...this.serialNumber.toBn().toArray('le', 4),
        ]);
        return u8aToHex(tokenId);
    }

    /**
    * @description Return the hex representation of the Id
    */
    toString(): string {
        return this.toHex();
    }

    /**
    * @description Returns the base runtime type name for this instance
    */
    toRawType(): string {
        return 'EnhancedTokenId';
    }
}
