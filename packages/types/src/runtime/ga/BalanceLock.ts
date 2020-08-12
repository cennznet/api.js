import {Struct} from '@polkadot/types';
import {Balance, BlockNumber, LockIdentifier} from '@polkadot/types/interfaces';

import WithdrawReasons from './WithdrawReasons';

// Describe locks on GA balances
export default interface BalanceLock extends Struct {
  readonly id: LockIdentifier;
  readonly amount: Balance;
  readonly until: BlockNumber;
  readonly reasons: WithdrawReasons;
}
