---
 Staking
---

The following sections contain the module details. 

- **[Constant](#Constant)**

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

- **[RPC](#RPC)**

- **[Derive queries](#derive-queries)**

 
# Constant
 
### bondingDuration: `EraIndex`
- **interface**: `api.consts.staking.bondingDuration`
- **summary**:   Number of eras that staked funds must remain bonded for. 
 
### electionLookahead: `BlockNumber`
- **interface**: `api.consts.staking.electionLookahead`
- **summary**:   The number of blocks before the end of the era from which election submissions are allowed. 

  Setting this to zero will disable the offchain compute and only on-chain seq-phragmen will be used. 

  This is bounded by being within the last session. Hence, setting it to a value more than the length of a session will be pointless. 
 
### maxIterations: `u32`
- **interface**: `api.consts.staking.maxIterations`
- **summary**:   Maximum number of balancing iterations to run in the offchain submission. 

  If set to 0, balance_solution will not be executed at all. 
 
### maxNominatorRewardedPerValidator: `u32`
- **interface**: `api.consts.staking.maxNominatorRewardedPerValidator`
- **summary**:   The maximum number of nominators rewarded for each validator. 

  For each validator only the `$MaxNominatorRewardedPerValidator` biggest stakers can claim their reward. This used to limit the i/o cost for the nominator payout. 
 
### minSolutionScoreBump: `Perbill`
- **interface**: `api.consts.staking.minSolutionScoreBump`
- **summary**:   The threshold of improvement that should be provided for a new solution to be accepted. 
 
### sessionsPerEra: `SessionIndex`
- **interface**: `api.consts.staking.sessionsPerEra`
- **summary**:   Number of sessions per era. 
 
### slashDeferDuration: `EraIndex`
- **interface**: `api.consts.staking.slashDeferDuration`
- **summary**:   Number of eras that slashes are deferred by, after computation. 

  This should be less than the bonding duration. Set to 0 if slashes should be applied immediately, without opportunity for intervention. 
 
# Storage
 
### activeEra(): `Option<ActiveEraInfo>`
- **interface**: `api.query.staking.activeEra`
- **summary**:   The active era information, it holds index and start. 

  The active era is the era currently rewarded. Validator set of this era must be equal to `SessionInterface::validators`. 
 
### bonded(`AccountId`): `Option<AccountId>`
- **interface**: `api.query.staking.bonded`
- **summary**:   Map from all locked "stash" accounts to the controller account. 
 
### bondedEras(): `Vec<(EraIndex,SessionIndex)>`
- **interface**: `api.query.staking.bondedEras`
- **summary**:   A mapping from still-bonded eras to the first session index of that era. 

  Must contains information for eras for the range: `[active_era - bounding_duration; active_era]` 
 
### currentEra(): `Option<EraIndex>`
- **interface**: `api.query.staking.currentEra`
- **summary**:   The current era index. 
 
### earliestUnappliedSlash(): `Option<EraIndex>`
- **interface**: `api.query.staking.earliestUnappliedSlash`
- **summary**:   The earliest era for which we have a pending, unapplied slash. 
 
### eraElectionStatus(): `ElectionStatus`
- **interface**: `api.query.staking.eraElectionStatus`
- **summary**:   Flag to control the execution of the offchain election. When `Open(_)`, we accept solutions to be submitted. 
 
### erasStakers(`EraIndex, AccountId`): `Exposure`
- **interface**: `api.query.staking.erasStakers`
- **summary**:   Exposure of validator at era. 

  This is keyed first by the era index to allow bulk deletion and then the stash account. 

  Is it removed after `HISTORY_DEPTH` eras. If stakers hasn't been set or has been removed then empty exposure is returned. 
 
### erasStakersClipped(`EraIndex, AccountId`): `Exposure`
- **interface**: `api.query.staking.erasStakersClipped`
- **summary**:   Clipped Exposure of validator at era. 

  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the `T::MaxNominatorRewardedPerValidator` biggest stakers. (Note: the field `total` and `own` of the exposure remains unchanged). This is used to limit the i/o cost for the nominator payout. 

  This is keyed fist by the era index to allow bulk deletion and then the stash account. 

  Is it removed after `HISTORY_DEPTH` eras. If stakers hasn't been set or has been removed then empty exposure is returned. 
 
### erasStartSessionIndex(`EraIndex`): `Option<SessionIndex>`
- **interface**: `api.query.staking.erasStartSessionIndex`
- **summary**:   The session index at which the era start for the last `HISTORY_DEPTH` eras. 
 
### erasTotalStake(`EraIndex`): `BalanceOf`
- **interface**: `api.query.staking.erasTotalStake`
- **summary**:   The total amount staked for the last `HISTORY_DEPTH` eras. If total hasn't been set or has been removed then 0 stake is returned. 
 
### erasValidatorPrefs(`EraIndex, AccountId`): `ValidatorPrefs`
- **interface**: `api.query.staking.erasValidatorPrefs`
- **summary**:   Similar to `ErasStakers`, this holds the preferences of validators. 

  This is keyed first by the era index to allow bulk deletion and then the stash account. 

  Is it removed after `HISTORY_DEPTH` eras. 
 
### forceEra(): `Forcing`
- **interface**: `api.query.staking.forceEra`
- **summary**:   True if the next session change will be a new era regardless of index. 
 
### historyDepth(): `u32`
- **interface**: `api.query.staking.historyDepth`
- **summary**:   Number of eras to keep in history. 

  Information is kept for eras in `[current_era - history_depth; current_era]`. 

  Must be more than the number of eras delayed by session otherwise. I.e. active era must always be in history. I.e. `active_era > current_era - history_depth` must be guaranteed. 
 
### invulnerables(): `Vec<AccountId>`
- **interface**: `api.query.staking.invulnerables`
- **summary**:   Any validators that may never be slashed or forcibly kicked. It's a Vec since they're easy to initialize and the performance hit is minimal (we expect no more than four invulnerables) and restricted to testnets. 
 
### isActiveSessionFinal(): `bool`
- **interface**: `api.query.staking.isActiveSessionFinal`
- **summary**:   NOTE:!! this is poorly named. True if the _active_ session (session_index) is final (last in the era). Note that this does not take era forcing into accoun 
 
### isCurrentSessionFinal(): `bool`
- **interface**: `api.query.staking.isCurrentSessionFinal`
- **summary**:   NOTE:!! this is poorly named. True if the **planned** session (session_index + 1) is final (last in the era). Note that this does not take era forcing into account 
 
### ledger(`AccountId`): `Option<StakingLedger>`
- **interface**: `api.query.staking.ledger`
- **summary**:   Map from all (unlocked) "controller" accounts to the info regarding the staking. 
 
### minimumBond(): `BalanceOf`
- **interface**: `api.query.staking.minimumBond`
- **summary**:   Minimum amount to bond. 
 
### minimumValidatorCount(): `u32`
- **interface**: `api.query.staking.minimumValidatorCount`
- **summary**:   Minimum number of staking participants before emergency conditions are imposed. 
 
### nominators(`AccountId`): `Option<Nominations>`
- **interface**: `api.query.staking.nominators`
- **summary**:   The map from nominator stash key to the set of stash keys of all validators to nominate. 
 
### nominatorSlashInEra(`EraIndex, AccountId`): `Option<BalanceOf>`
- **interface**: `api.query.staking.nominatorSlashInEra`
- **summary**:   All slashing events on nominators, mapped by era to the highest slash value of the era. 
 
### queuedElected(): `Option<ElectionResult>`
- **interface**: `api.query.staking.queuedElected`
- **summary**:   The next validator set. At the end of an era, if this is available (potentially from the result of an offchain worker), it is immediately used. Otherwise, the on-chain election is executed. 
 
### queuedScore(): `Option<ElectionScore>`
- **interface**: `api.query.staking.queuedScore`
- **summary**:   The score of the current [`QueuedElected`]. 
 
### slashingSpans(`AccountId`): `Option<SlashingSpans>`
- **interface**: `api.query.staking.slashingSpans`
- **summary**:   Slashing spans for stash accounts. 
 
### slashRewardFraction(): `Perbill`
- **interface**: `api.query.staking.slashRewardFraction`
- **summary**:   The percentage of the slash that is distributed to reporters. 

  The rest of the slashed value is handled by the `Slash`. 
 
### snapshotNominators(): `Option<Vec<AccountId>>`
- **interface**: `api.query.staking.snapshotNominators`
- **summary**:   Snapshot of nominators at the beginning of the current election window. This should only have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`. 
 
### snapshotValidators(): `Option<Vec<AccountId>>`
- **interface**: `api.query.staking.snapshotValidators`
- **summary**:   Snapshot of validators at the beginning of the current election window. This should only have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`. 
 
### spanSlash(`(AccountId,SpanIndex)`): `SpanRecord`
- **interface**: `api.query.staking.spanSlash`
- **summary**:   Records information about the maximum slash of a stash within a slashing span, as well as how much reward has been paid out. 
 
### storageVersion(): `u32`
- **interface**: `api.query.staking.storageVersion`
- **summary**:   True if network has been upgraded to this version. Storage version of the pallet. 

  This is set to v2 for new networks. 
 
### unappliedSlashes(`EraIndex`): `Vec<UnappliedSlash>`
- **interface**: `api.query.staking.unappliedSlashes`
- **summary**:   All unapplied slashes that are queued for later. 
 
### validatorCount(): `u32`
- **interface**: `api.query.staking.validatorCount`
- **summary**:   The ideal number of staking participants. 
 
### validators(`AccountId`): `ValidatorPrefs`
- **interface**: `api.query.staking.validators`
- **summary**:   The map from (wannabe) validator stash key to the preferences of that validator. 
 
### validatorSlashInEra(`EraIndex, AccountId`): `Option<(Perbill,BalanceOf)>`
- **interface**: `api.query.staking.validatorSlashInEra`
- **summary**:   All slashing events on validators, mapped by era to the highest slash proportion and slash value of the era. 
 
### wasEndEraForced(): `bool`
- **interface**: `api.query.staking.wasEndEraForced`
- **summary**:   Same as `will_era_be_forced()` but persists to `end_era` 
 
# Extrinsic
 
### bond(controller: `AccountId`, value: `Compact<BalanceOf>`, payee: `RewardDestination`)
- **interface**: `api.tx.staking.bond`
- **summary**:   Take the origin account as a stash and lock up `value` of its balance. `controller` will be the account that controls it. 

  `value` must be more than the `minimum_bond` specified in genesis config. 

  The dispatch origin for this call must be _Signed_ by the stash account. 

  Emits `Bonded`. 

   
 
### bondExtra(max_additional: `Compact<BalanceOf>`)
- **interface**: `api.tx.staking.bondExtra`
- **summary**:   Add some extra amount that have appeared in the stash `free_balance` into the balance up for staking. 

  Use this if there are additional funds in your stash account that you wish to bond. Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount that can be added. 

  The dispatch origin for this call must be _Signed_ by the stash, not the controller and it can be only called when [`EraElectionStatus`] is `Closed`. 

  Emits `Bonded`. 

   
 
### cancelDeferredSlash(era: `EraIndex`, slash_indices: `Vec<u32>`)
- **interface**: `api.tx.staking.cancelDeferredSlash`
- **summary**:   Cancel enactment of a deferred slash. 

  Parameters: era and indices of the slashes for that era to kill. 

   
 
### chill()
- **interface**: `api.tx.staking.chill`
- **summary**:   Declare no desire to either validate or nominate. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### forceNewEra()
- **interface**: `api.tx.staking.forceNewEra`
- **summary**:   Force there to be a new era at the end of the next session. After this, it will be reset to normal (non-forced) behaviour. 

   
 
### forceNewEraAlways()
- **interface**: `api.tx.staking.forceNewEraAlways`
- **summary**:   Force there to be a new era at the end of sessions indefinitely. 

  The dispatch origin must be Root. 

   
 
### forceNoEras()
- **interface**: `api.tx.staking.forceNoEras`
- **summary**:   Force there to be no new eras indefinitely. 

   
 
### forceUnstake(stash: `AccountId`)
- **interface**: `api.tx.staking.forceUnstake`
- **summary**:   Force a current staker to become completely unstaked, immediately. 

  The dispatch origin must be Root. 

   
 
### increaseValidatorCount(additional: `Compact<u32>`)
- **interface**: `api.tx.staking.increaseValidatorCount`
- **summary**:   Increments the ideal number of validators. 

  The dispatch origin must be Root. 

   
 
### nominate(targets: `Vec<AccountId>`)
- **interface**: `api.tx.staking.nominate`
- **summary**:   Declare the desire to nominate `targets` for the origin controller. 

  Effects will be felt at the beginning of the next era. This can only be called when [`EraElectionStatus`] is `Closed`. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### reapStash(stash: `AccountId`)
- **interface**: `api.tx.staking.reapStash`
- **summary**:   Remove all data structure concerning a staker/stash once its balance is zero. This is essentially equivalent to `withdraw_unbonded` except it can be called by anyone and the target `stash` must have no funds left. 

  This can be called from any origin. 

  - `stash`: The stash account to reap. Its balance must be zero. 

   
 
### rebond(value: `Compact<BalanceOf>`)
- **interface**: `api.tx.staking.rebond`
- **summary**:   Rebond a portion of the stash scheduled to be unlocked. 

  The dispatch origin must be signed by the controller, and it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### setController(controller: `AccountId`)
- **interface**: `api.tx.staking.setController`
- **summary**:   (Re-)set the controller of a stash. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the stash, not the controller. 

   
 
### setHistoryDepth(new_history_depth: `Compact<EraIndex>`, _era_items_deleted: `Compact<u32>`)
- **interface**: `api.tx.staking.setHistoryDepth`
- **summary**:   Set `HistoryDepth` value. This function will delete any history information when `HistoryDepth` is reduced. 

  Parameters: 

  - `new_history_depth`: The new history depth you would like to set.

  - `era_items_deleted`: The number of items that will be deleted by this dispatch.   This should report all the storage items that will be deleted by clearing old    era history. Needed to report an accurate weight for the dispatch. Trusted by    `Root` to report an accurate number. 

  Origin must be root. 

   
 
### setInvulnerables(validators: `Vec<AccountId>`)
- **interface**: `api.tx.staking.setInvulnerables`
- **summary**:   Set the validators who cannot be slashed (if any). 
 
### setMinimumBond(value: `BalanceOf`)
- **interface**: `api.tx.staking.setMinimumBond`
- **summary**:   Set the minimum bond amount. 
 
### setPayee(payee: `RewardDestination`)
- **interface**: `api.tx.staking.setPayee`
- **summary**:   (Re-)set the payment target for a controller. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

   
 
### setValidatorCount(new: `Compact<u32>`)
- **interface**: `api.tx.staking.setValidatorCount`
- **summary**:   Sets the ideal number of validators. 

  The dispatch origin must be Root. 

   
 
### submitElectionSolution(winners: `Vec<ValidatorIndex>`, compact: `CompactAssignments`, score: `ElectionScore`, era: `EraIndex`, size: `ElectionSize`)
- **interface**: `api.tx.staking.submitElectionSolution`
- **summary**:   Submit an election result to the chain. If the solution: 

  1. is valid. 2. has a better score than a potentially existing solution on chain. 

  then, it will be _put_ on chain. 

  A solution consists of two pieces of data: 

  1. `winners`: a flat vector of all the winners of the round. 2. `assignments`: the compact version of an assignment vector that encodes the edge    weights. 

  Both of which may be computed using _phragmen_, or any other algorithm. 

  Additionally, the submitter must provide: 

  - The `score` that they claim their solution has. 

  Both validators and nominators will be represented by indices in the solution. The indices should respect the corresponding types ([`ValidatorIndex`] and [`NominatorIndex`]). Moreover, they should be valid when used to index into [`SnapshotValidators`] and [`SnapshotNominators`]. Any invalid index will cause the solution to be rejected. These two storage items are set during the election window and may be used to determine the indices. 

  A solution is valid if: 

  0. It is submitted when [`EraElectionStatus`] is `Open`. 1. Its claimed score is equal to the score computed on-chain. 2. Presents the correct number of winners. 3. All indexes must be value according to the snapshot vectors. All edge values must    also be correct and should not overflow the granularity of the ratio type (i.e. 256    or billion). 4. For each edge, all targets are actually nominated by the voter. 5. Has correct self-votes. 

  A solutions score is consisted of 3 parameters: 

  1. `min { support.total }` for each support of a winner. This value should be maximized. 2. `sum { support.total }` for each support of a winner. This value should be minimized. 3. `sum { support.total^2 }` for each support of a winner. This value should be    minimized (to ensure less variance) 

   
 
### submitElectionSolutionUnsigned(winners: `Vec<ValidatorIndex>`, compact: `CompactAssignments`, score: `ElectionScore`, era: `EraIndex`, size: `ElectionSize`)
- **interface**: `api.tx.staking.submitElectionSolutionUnsigned`
- **summary**:   Unsigned version of `submit_election_solution`. 

  Note that this must pass the [`ValidateUnsigned`] check which only allows transactions from the local node to be included. In other words, only the block author can include a transaction in the block. 

   
 
### unbond(value: `Compact<BalanceOf>`)
- **interface**: `api.tx.staking.unbond`
- **summary**:   Schedule a portion of the stash to be unlocked ready for transfer out after the bond period ends. If this leaves an amount actively bonded less than T::Currency::minimum_balance(), then it is increased to the full amount. 

  Once the unlock period is done, you can call `withdraw_unbonded` to actually move the funds out of management ready for transfer. 

  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`) can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need to be called first to remove some of the chunks (if possible). 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

  Emits `Unbonded`. 

  See also [`Call::withdraw_unbonded`]. 

   
 
### validate(prefs: `ValidatorPrefs`)
- **interface**: `api.tx.staking.validate`
- **summary**:   Declare the desire to validate for the origin controller. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### withdrawUnbonded()
- **interface**: `api.tx.staking.withdrawUnbonded`
- **summary**:   Remove any unlocked chunks from the `unlocking` queue from our management. 

  This essentially frees up that balance to be used by the stash account to do whatever it wants. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

  Emits `Withdrawn`. 

  See also [`Call::unbond`]. 

   
 
# Error
 
### AlreadyBonded
- **summary**:   Stash is already bonded. 
 
### AlreadyPaired
- **summary**:   Controller is already paired. 
 
### CallNotAllowed
- **summary**:   The call is not allowed at the given time due to restrictions of election period. 
 
### DuplicateNominee
- **summary**:   Cannot nominate the same account multiple times 
 
### EmptyTargets
- **summary**:   Targets cannot be empty. 
 
### FundedTarget
- **summary**:   Attempting to target a stash that still has funds. 
 
### IncorrectHistoryDepth
- **summary**:   Incorrect previous history depth input provided. 
 
### InsufficientBond
- **summary**:   Can not bond with value less than minimum balance. 
 
### InsufficientFreeBalance
- **summary**:   User does not have enough free balance to bond this amount 
 
### InvalidSlashIndex
- **summary**:   Slash record index out of bounds. 
 
### NoMoreChunks
- **summary**:   Can not schedule more unlock chunks. 
 
### NotController
- **summary**:   Not a controller account. 
 
### NotSortedAndUnique
- **summary**:   Items are not sorted and unique. 
 
### NotStash
- **summary**:   Not a stash account. 
 
### NoUnlockChunk
- **summary**:   Can not rebond without unlocking chunks. 
 
### OffchainElectionBogusCompact
- **summary**:   Error while building the assignment type from the compact. This can happen if an index is invalid, or if the weights _overflow_. 
 
### OffchainElectionBogusEdge
- **summary**:   The submitted result has unknown edges that are not among the presented winners. 
 
### OffchainElectionBogusElectionSize
- **summary**:   The election size is invalid. 
 
### OffchainElectionBogusNomination
- **summary**:   One of the submitted nominators has an edge to which they have not voted on chain. 
 
### OffchainElectionBogusNominator
- **summary**:   One of the submitted nominators is not an active nominator on chain. 
 
### OffchainElectionBogusScore
- **summary**:   The claimed score does not match with the one computed from the data. 
 
### OffchainElectionBogusSelfVote
- **summary**:   A self vote must only be originated from a validator to ONLY themselves. 
 
### OffchainElectionBogusWinner
- **summary**:   One of the submitted winners is not an active candidate on chain (index is out of range in snapshot). 
 
### OffchainElectionBogusWinnerCount
- **summary**:   Incorrect number of winners were presented. 
 
### OffchainElectionEarlySubmission
- **summary**:   The submitted result is received out of the open window. 
 
### OffchainElectionSlashedNomination
- **summary**:   One of the submitted nominators has an edge which is submitted before the last non-zero slash of the target. 
 
### OffchainElectionWeakSubmission
- **summary**:   The submitted result is not as good as the one stored on chain. 
 
### SnapshotUnavailable
- **summary**:   The snapshot data of the current window is missing. 
 
# Events
 
### Bonded(`AccountId`, `Balance`)
- **summary**:   An account has bonded this amount. \[stash, amount\] 

  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably, it will not be emitted for staking rewards when they are added to stake. 
 
### InvulnerableNotSlashed(`AccountId`, `Perbill`)
- **summary**:   The validator is invulnerable, so it has NOT been slashed. 
 
### OldSlashingReportDiscarded(`SessionIndex`)
- **summary**:   An old slashing report from a prior era was discarded because it could not be processed. 
 
### SetInvulnerables(`Vec<AccountId>`)
- **summary**:   A new set of validators are marked to be invulnerable 
 
### SetMinimumBond(`Balance`)
- **summary**:   Minimum bond amount is changed. 
 
### Slash(`AccountId`, `Balance`)
- **summary**:   One validator (and its nominators) has been slashed by the given amount. 
 
### SolutionStored(`ElectionCompute`)
- **summary**:   A new solution for the upcoming election has been stored. \[compute\] 
 
### StakingElection(`ElectionCompute`)
- **summary**:   A new set of stakers was elected with the given \[compute\]. 
 
### Unbonded(`AccountId`, `Balance`)
- **summary**:   An account has unbonded this amount. \[stash, amount\] 
 
### Withdrawn(`AccountId`, `Balance`)
- **summary**:   An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance` from the unlocking queue. \[stash, amount\] 
 
# RPC
 
### accruedPayout(undefined: `AccountId`): `u64`
- **interface**: `api.rpc.staking.accruedPayout`
- **jsonrpc**: `staking_accruedPayout`
- **summary**: Retrieves the currently accrued reward for the specified stash
 
# Derive queries

- **interface**: api.derive.staking.function_name
# Module: staking/electedInfo


## Functions

### electedInfo

▸ **electedInfo**() => `Observable`<[`DeriveStakingElected`](../interfaces/staking_types.derivestakingelected.md)\>


`Observable`<[`DeriveStakingElected`](../interfaces/staking_types.derivestakingelected.md)\>

#### Defined in

[packages/api/src/derives/staking/electedInfo.ts:17](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/electedInfo.ts#L17)

# Module: staking/overview


## Functions

### overview

▸ **overview**() => `Observable`<`DeriveStakingOverview`\>

**`description`** Retrieve the staking overview, including elected and points earned


`Observable`<`DeriveStakingOverview`\>

#### Defined in

[packages/api/src/derives/staking/overview.ts:16](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/overview.ts#L16)

# Module: staking/query


## Functions

### query

▸ **query**(`accountId`: `Uint8Array` \| `string`, `flags`: `QueryFlags`) => `Observable`<[`DeriveStakingQuery`](../interfaces/staking_types.derivestakingquery.md)\>

**`description`** From a stash, retrieve the controllerId and all relevant details


| Name | Type |
| :------ | :------ |
| `accountId` | `Uint8Array` \| `string` |
| `flags` | `QueryFlags` |

##### Returns

`Observable`<[`DeriveStakingQuery`](../interfaces/staking_types.derivestakingquery.md)\>

#### Defined in

[packages/api/src/derives/staking/query.ts:127](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/query.ts#L127)

___

### queryMulti

▸ **queryMulti**(`accountIds`: (`Uint8Array` \| `string`)[], `flags`: `QueryFlags`) => `Observable`<[`DeriveStakingQuery`](../interfaces/staking_types.derivestakingquery.md)[]\>


| Name | Type |
| :------ | :------ |
| `accountIds` | (`Uint8Array` \| `string`)[] |
| `flags` | `QueryFlags` |

##### Returns

`Observable`<[`DeriveStakingQuery`](../interfaces/staking_types.derivestakingquery.md)[]\>

#### Defined in

[packages/api/src/derives/staking/query.ts:138](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/query.ts#L138)

# Module: staking/stakingAccount


## Functions

### queryStakingAccountInfo

▸ **queryStakingAccountInfo**(`accountId`: `Uint8Array` \| `string`, `activeEra`: `EraIndex`) => `Observable`<[`DerivedStakingInfo`](../interfaces/types.derivedstakinginfo.md)\>

**`description`** From a stash, retrieve the controller account ID and all relevant details


| Name | Type |
| :------ | :------ |
| `accountId` | `Uint8Array` \| `string` |
| `activeEra` | `EraIndex` |

##### Returns

`Observable`<[`DerivedStakingInfo`](../interfaces/types.derivedstakinginfo.md)\>

#### Defined in

[packages/api/src/derives/staking/stakingAccount.ts:47](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/stakingAccount.ts#L47)

# Module: staking/stashes


## Functions

### stashes

▸ **stashes**() => `Observable`<`AccountId`[]\>

**`description`** Retrieve the list of all validator stashes


`Observable`<`AccountId`[]\>

#### Defined in

[packages/api/src/derives/staking/stashes.ts:15](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/stashes.ts#L15)

# Module: staking/types


### Interfaces

- [DeriveStakingElected](../interfaces/staking_types.derivestakingelected.md)
- [DeriveStakingOverview](../interfaces/staking_types.derivestakingoverview.md)
- [DeriveStakingQuery](../interfaces/staking_types.derivestakingquery.md)
- [DeriveStakingStash](../interfaces/staking_types.derivestakingstash.md)
- [DeriveStakingWaiting](../interfaces/staking_types.derivestakingwaiting.md)

# Module: staking/validators


## Functions

### nextElected

▸ **nextElected**() => `Observable`<`AccountId`[]\>


`Observable`<`AccountId`[]\>

#### Defined in

[packages/api/src/derives/staking/validators.ts:14](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/validators.ts#L14)

___

### validators

▸ **validators**() => `Observable`<`DeriveStakingValidators`\>

**`description`** Retrieve latest list of validators


`Observable`<`DeriveStakingValidators`\>

#### Defined in

[packages/api/src/derives/staking/validators.ts:32](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/validators.ts#L32)

# Module: staking/waitingInfo


## Functions

### waitingInfo

▸ **waitingInfo**() => `Observable`<[`DeriveStakingWaiting`](../interfaces/staking_types.derivestakingwaiting.md)\>


`Observable`<[`DeriveStakingWaiting`](../interfaces/staking_types.derivestakingwaiting.md)\>

#### Defined in

[packages/api/src/derives/staking/waitingInfo.ts:13](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/waitingInfo.ts#L13)
