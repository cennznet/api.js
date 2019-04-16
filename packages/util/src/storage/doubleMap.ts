import {Codec} from '@plugnet/types/types';
import {stringToU8a, u8aToHex} from '@plugnet/util';
import {xxhashAsHex} from '@plugnet/util-crypto';

/**
 * Generate the key of a double map storage
 * @param prefixString
 * @param key1
 * @param key2
 */
export function generateStorageDoubleMapKey(prefixString: string, key1: Codec, key2: Codec): string {
    // key1 encoded
    const prefixU8a: Uint8Array = stringToU8a(prefixString);
    const key1U8a: Uint8Array = key1.toU8a(true);
    const key1Encoded: Uint8Array = new Uint8Array(prefixU8a.length + key1U8a.length);
    key1Encoded.set(prefixU8a);
    key1Encoded.set(key1U8a, prefixU8a.length);
    // key2 encoded
    const length = 2;
    const key2Encoded: string = u8aToHex(key2.toU8a(true)).substr(length);
    const bitLength: number = 128;

    return xxhashAsHex(key1Encoded, bitLength) + key2Encoded;
}
