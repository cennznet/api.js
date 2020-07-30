import {TypeRegistry, createType} from '@polkadot/types';
import {Phase} from './types';

const registry = new TypeRegistry();
registry.register(Phase);

describe('Extrinsic Phase', () => {
  it('decodes phase: Initialization', () => {
    const phase = createType(registry, 'Phase', 2);
    expect(phase.toString()).toEqual('Initialization');
  });
});
