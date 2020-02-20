import {ClassOf, TypeRegistry} from '@polkadot/types';

const registry = new TypeRegistry();
export default class FeeRate extends ClassOf(registry, 'u128') {
  static readonly SCALE_FACTOR = 1000000;
}
