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

    const destinationAccountAddress = '5FEe8Ht1ZTzNjQcvrxbLxnykA2EXfqN5LMog2gaNPus4tfZR';
    const destinationAccount = createType(registry, 'RewardDestination', {account: destinationAccountAddress}, 2);
    expect(destinationAccount.asAccount.toString()).toEqual(destinationAccountAddress);
    expect(destinationAccount.isAccount).toBeTruthy();
    const destinationAccountStr = createType(registry, 'RewardDestination', {account: destinationAccountAddress});
    expect(destinationAccountStr.asAccount.toString()).toEqual(destinationAccountAddress);
    expect(destinationAccountStr.isAccount).toBeTruthy();

    const destinationPayee = new RewardDestination(registry, {account: destinationAccountAddress});
    expect(destinationPayee.asAccount.toString()).toEqual(destinationAccountAddress);
    expect(destinationPayee.isAccount).toBeTruthy();
  });
});
