import Option from '@polkadot/types/codec/Option';

declare module '@polkadot/types/codec/Option' {
  interface Option {
    toU8a: Uint8Array;
  }
}

/**
 * Patching Option
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 *
 */
Option.prototype.toU8a = function toU8a(isBare?: boolean): Uint8Array {
  if (this.isNone) {
    return new Uint8Array([0]);
  }
  if (isBare) {
    console.log('option: this.raw', this.raw);
    console.log('option: uinitarray', new Uint8Array([0]));
    return !this.raw ? new Uint8Array([0]) : this.raw.toU8a(true);
  }

  const u8a = new Uint8Array(this.encodedLength);

  if (this.isSome) {
    u8a.set([1]);
    u8a.set(this.raw.toU8a(), 1);
  }

  return u8a;
};
