import {ClassOf, TypeRegistry} from '@polkadot/types';

const registry = new TypeRegistry();
export default class FeeRate extends ClassOf(registry, 'u128') {
  // eslint-disable-next-line no-magic-numbers
  static readonly SCALE_FACTOR = 1000000;
}
