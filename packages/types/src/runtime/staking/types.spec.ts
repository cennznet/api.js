import {RewardDestination} from '.';
import {TypeRegistry, createType} from '@polkadot/types';

const registry = new TypeRegistry();
registry.register(RewardDestination);

describe('RewardDestination', (): void => {
  it('Respects CENNZnet options: 0/Stash, 1/Controller', () => {
    const destinationStash = createType(registry, 'RewardDestination', 0);
    expect(destinationStash.isStash).toBeTruthy();
    const destinationStashStr = createType(registry, 'RewardDestination', 'stash');
    expect(destinationStashStr.isStash).toBeTruthy();

    const destinationController = createType(registry, 'RewardDestination', 1);
    expect(destinationController.isController).toBeTruthy();
    const destinationControllerStr = createType(registry, 'RewardDestination', 'controller');
    expect(destinationControllerStr.isController).toBeTruthy();
  });
});
