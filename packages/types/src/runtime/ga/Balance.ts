/** @name BalanceLock */
import {Struct} from '@polkadot/types';
import {Balance, BlockNumber, LockIdentifier, Reasons, WithdrawReasons} from '@polkadot/types/interfaces';

export interface BalanceLock extends Struct {
  readonly id: LockIdentifier;
  readonly amount: Balance;
  readonly reasons: Reasons;
}

/** @name BalanceLockTo212 */
export interface BalanceLockTo212 extends Struct {
  readonly id: LockIdentifier;
  readonly amount: Balance;
  readonly until: BlockNumber;
  readonly reasons: WithdrawReasons;
}
