import { Struct } from '@cennznet/types';
import { Balance, LockIdentifier } from '@cennznet/types/interfaces';
import { Registry } from '@cennznet/types/types';

import { WithdrawReasons } from './';

// It describes a lock on a GA account balance for some amount and reasons.
export default class BalanceLock extends Struct {
  constructor(registry: Registry, value?: any) {
    super(
      registry,
      {
        id: 'LockIdentifier',
        amount: 'Balance',
        reasons: 'WithdrawReasons',
      },
      value
    );
  }

  get id(): LockIdentifier {
    return this.get('id') as LockIdentifier;
  }

  get amount(): Balance {
    return this.get('amount') as Balance;
  }

  get reasons(): WithdrawReasons {
    return this.get('reasons') as WithdrawReasons;
  }
}
