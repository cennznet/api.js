import Struct from '@polkadot/types/codec/Struct';

declare module '@polkadot/types/codec/Struct' {
  interface Struct {
    toU8a: Uint8Array;
  }
}

/**
 * Patching Struct
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 *
 * TODO: //
 */
Struct.prototype.toU8a = function toU8a(isBare?: boolean): Uint8Array {
  if (this.isNone) {
    return new Uint8Array([0]);
  }
  if (isBare) {
    console.log('this.raw', this.raw);
    return this.raw ? this.raw.toU8a(true) : new Uint8Array([0, 0]);
  }

  const u8a = new Uint8Array(this.encodedLength);

  if (this.isSome) {
    u8a.set([1]);
    u8a.set(this.raw.toU8a(), 1);
  }

  return u8a;
};
