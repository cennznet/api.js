import {createType, TypeRegistry} from '@polkadot/types';

import BalanceLock from './BalanceLock';

const registry = new TypeRegistry();
registry.register(BalanceLock);

describe('BalanceLock', () => {
  // See: https://github.com/cennznet/api.js/issues/131
  it('It can decode', () => {
    const b = createType(registry, 'Vec<BalanceLock>', '0x047374616b696e6720000064a7b3b6e00d00000000000000001f');
  });
});
