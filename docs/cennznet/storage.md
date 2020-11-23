## Storage

The following sections contain Storage methods are part of the default Substrate runtime. On the api, these are exposed via `api.query.<module>.<method>`. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[attestation](#attestation)**

- **[authorship](#authorship)**

- **[babe](#babe)**

- **[cennzx](#cennzx)**

- **[finalityTracker](#finalitytracker)**

- **[genericAsset](#genericasset)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[multisig](#multisig)**

- **[offences](#offences)**

- **[randomnessCollectiveFlip](#randomnesscollectiveflip)**

- **[rewards](#rewards)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[syloDevice](#sylodevice)**

- **[syloE2Ee](#syloe2ee)**

- **[syloGroups](#sylogroups)**

- **[syloInbox](#syloinbox)**

- **[syloPayment](#sylopayment)**

- **[syloResponse](#syloresponse)**

- **[syloVault](#sylovault)**

- **[system](#system)**

- **[timestamp](#timestamp)**

- **[transactionPayment](#transactionpayment)**

- **[treasury](#treasury)**

- **[](#)**


___


## attestation
 
### issuers(`AccountId`): `Vec<AccountId>`
- **interface**: `api.query.attestation.issuers`
- **summary**:   A map from holders to all their attesting issuers 
 
### topics(`(AccountId,AccountId)`): `Vec<AttestationTopic>`
- **interface**: `api.query.attestation.topics`
- **summary**:   A map from (holder, issuer) to attested topics 
 
### values(`(AccountId,AccountId,AttestationTopic)`): `AttestationValue`
- **interface**: `api.query.attestation.values`
- **summary**:   A map from (holder, issuer, topic) to attested values 

___


## authorship
 
### author(): `Option<AccountId>`
- **interface**: `api.query.authorship.author`
- **summary**:   Author of current block. 
 
### didSetUncles(): `bool`
- **interface**: `api.query.authorship.didSetUncles`
- **summary**:   Whether uncles were already set in this block. 
 
### uncles(): `Vec<UncleEntryItem>`
- **interface**: `api.query.authorship.uncles`
- **summary**:   Uncles 

___


## babe
 
### authorities(): `Vec<(AuthorityId,BabeAuthorityWeight)>`
- **interface**: `api.query.babe.authorities`
- **summary**:   Current epoch authorities. 
 
### currentSlot(): `u64`
- **interface**: `api.query.babe.currentSlot`
- **summary**:   Current slot number. 
 
### epochIndex(): `u64`
- **interface**: `api.query.babe.epochIndex`
- **summary**:   Current epoch index. 
 
### genesisSlot(): `u64`
- **interface**: `api.query.babe.genesisSlot`
- **summary**:   The slot at which the first epoch actually started. This is 0 until the first block of the chain. 
 
### initialized(): `Option<MaybeRandomness>`
- **interface**: `api.query.babe.initialized`
- **summary**:   Temporary value (cleared at block finalization) which is `Some` if per-block initialization has already been called for current block. 
 
### lateness(): `BlockNumber`
- **interface**: `api.query.babe.lateness`
- **summary**:   How late the current block is compared to its parent. 

  This entry is populated as part of block execution and is cleaned up on block finalization. Querying this storage entry outside of block execution context should always yield zero. 
 
### nextEpochConfig(): `Option<NextConfigDescriptor>`
- **interface**: `api.query.babe.nextEpochConfig`
- **summary**:   Next epoch configuration, if changed. 
 
### nextRandomness(): `Randomness`
- **interface**: `api.query.babe.nextRandomness`
- **summary**:   Next epoch randomness. 
 
### randomness(): `Randomness`
- **interface**: `api.query.babe.randomness`
- **summary**:   The epoch randomness for the *current* epoch. 

  #### Security 

  This MUST NOT be used for gambling, as it can be influenced by a malicious validator in the short term. It MAY be used in many cryptographic protocols, however, so long as one remembers that this (like everything else on-chain) it is public. For example, it can be used where a number is needed that cannot have been chosen by an adversary, for purposes such as public-coin zero-knowledge proofs. 
 
### segmentIndex(): `u32`
- **interface**: `api.query.babe.segmentIndex`
- **summary**:   Randomness under construction. 

  We make a tradeoff between storage accesses and list length. We store the under-construction randomness in segments of up to `UNDER_CONSTRUCTION_SEGMENT_LENGTH`. 

  Once a segment reaches this length, we begin the next one. We reset all segments and return to `0` at the beginning of every epoch. 
 
### underConstruction(`u32`): `Vec<Randomness>`
- **interface**: `api.query.babe.underConstruction`
- **summary**:   TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay. 

___


## cennzx
 
### coreAssetId(): `AssetId`
- **interface**: `api.query.cennzx.coreAssetId`
- **summary**:   Asset Id of the core liquidity asset 
 
### defaultFeeRate(): `FeeRate`
- **interface**: `api.query.cennzx.defaultFeeRate`
- **summary**:   Default trading fee rate 
 
### liquidityBalance(`ExchangeKey, AccountId`): `BalanceOf`
- **interface**: `api.query.cennzx.liquidityBalance`
- **summary**:   Liquidity holdings of a user in an exchange pool. Key: `(core_asset_id, trade_asset_id), account_id` 
 
### totalLiquidity(`ExchangeKey`): `BalanceOf`
- **interface**: `api.query.cennzx.totalLiquidity`
- **summary**:   Total liquidity holdings of all investors in an exchange. ie/ total_liquidity(exchange) == sum(liquidity_balance(exchange, user)) at all times 

___


## finalityTracker
 
### initialized(): `bool`
- **interface**: `api.query.finalityTracker.initialized`
 
### median(): `BlockNumber`
- **interface**: `api.query.finalityTracker.median`
- **summary**:   The median. 
 
### orderedHints(): `Vec<BlockNumber>`
- **interface**: `api.query.finalityTracker.orderedHints`
- **summary**:   Ordered recent hints. 
 
### recentHints(): `Vec<BlockNumber>`
- **interface**: `api.query.finalityTracker.recentHints`
- **summary**:   Recent hints. 
 
### update(): `Option<BlockNumber>`
- **interface**: `api.query.finalityTracker.update`
- **summary**:   Final hint to apply in the block. `None` means "same as parent". 

___


## genericAsset
 
### assetMeta(`AssetId`): `AssetInfo`
- **interface**: `api.query.genericAsset.assetMeta`
- **summary**:   The info for assets 
 
### freeBalance(`AssetId, AccountId`): `Balance`
- **interface**: `api.query.genericAsset.freeBalance`
- **summary**:   The free balance of a given asset under an account. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### locks(`AccountId`): `Vec<BalanceLock>`
- **interface**: `api.query.genericAsset.locks`
- **summary**:   Any liquidity locks on some account balances. 
 
### nextAssetId(): `AssetId`
- **interface**: `api.query.genericAsset.nextAssetId`
- **summary**:   Next available ID for user-created asset. 
 
### permissions(`AssetId`): `PermissionVersions`
- **interface**: `api.query.genericAsset.permissions`
- **summary**:   Permission options for a given asset. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### reservedBalance(`AssetId, AccountId`): `Balance`
- **interface**: `api.query.genericAsset.reservedBalance`
- **summary**:   The reserved balance of a given asset under an account. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### spendingAssetId(): `AssetId`
- **interface**: `api.query.genericAsset.spendingAssetId`
- **summary**:   The identity of the asset which is the one that is designated for paying the chain's transaction fee. 
 
### stakingAssetId(): `AssetId`
- **interface**: `api.query.genericAsset.stakingAssetId`
- **summary**:   The identity of the asset which is the one that is designated for the chain's staking system. 
 
### totalIssuance(`AssetId`): `Balance`
- **interface**: `api.query.genericAsset.totalIssuance`
- **summary**:   Total issuance of a given asset. 

  TWOX-NOTE: `AssetId` is trusted. 

___


## grandpa
 
### currentSetId(): `SetId`
- **interface**: `api.query.grandpa.currentSetId`
- **summary**:   The number of changes (both in terms of keys and underlying economic responsibilities) in the "set" of Grandpa validators from genesis. 
 
### nextForced(): `Option<BlockNumber>`
- **interface**: `api.query.grandpa.nextForced`
- **summary**:   next block number where we can force a change. 
 
### pendingChange(): `Option<StoredPendingChange>`
- **interface**: `api.query.grandpa.pendingChange`
- **summary**:   Pending change: (signaled at, scheduled change). 
 
### setIdSession(`SetId`): `Option<SessionIndex>`
- **interface**: `api.query.grandpa.setIdSession`
- **summary**:   A mapping from grandpa set ID to the index of the *most recent* session for which its members were responsible. 

  TWOX-NOTE: `SetId` is not under user control. 
 
### stalled(): `Option<(BlockNumber,BlockNumber)>`
- **interface**: `api.query.grandpa.stalled`
- **summary**:   `true` if we are currently stalled. 
 
### state(): `StoredState`
- **interface**: `api.query.grandpa.state`
- **summary**:   State of the current authority set. 

___


## identity
 
### identityOf(`AccountId`): `Option<Registration>`
- **interface**: `api.query.identity.identityOf`
- **summary**:   Information that is pertinent to identify the entity behind an account. 

  TWOX-NOTE: OK ― `AccountId` is a secure hash. 
 
### registrars(): `Vec<Option<RegistrarInfo>>`
- **interface**: `api.query.identity.registrars`
- **summary**:   The set of registrars. Not expected to get very big as can only be added through a special origin (likely a council motion). 

  The index into this can be cast to `RegistrarIndex` to get a valid value. 
 
### subsOf(`AccountId`): `(BalanceOf,Vec<AccountId>)`
- **interface**: `api.query.identity.subsOf`
- **summary**:   Alternative "sub" identities of this account. 

  The first item is the deposit, the second is a vector of the accounts. 

  TWOX-NOTE: OK ― `AccountId` is a secure hash. 
 
### superOf(`AccountId`): `Option<(AccountId,Data)>`
- **interface**: `api.query.identity.superOf`
- **summary**:   The super-identity of an alternative "sub" identity together with its name, within that context. If the account is not some other account's sub-identity, then just `None`. 

___


## imOnline
 
### authoredBlocks(`SessionIndex, ValidatorId`): `u32`
- **interface**: `api.query.imOnline.authoredBlocks`
- **summary**:   For each session index, we keep a mapping of `T::ValidatorId` to the number of blocks authored by the given authority. 
 
### heartbeatAfter(): `BlockNumber`
- **interface**: `api.query.imOnline.heartbeatAfter`
- **summary**:   The block number after which it's ok to send heartbeats in current session. 

  At the beginning of each session we set this to a value that should fall roughly in the middle of the session duration. The idea is to first wait for the validators to produce a block in the current session, so that the heartbeat later on will not be necessary. 
 
### keys(): `Vec<AuthorityId>`
- **interface**: `api.query.imOnline.keys`
- **summary**:   The current set of keys that may issue a heartbeat. 
 
### receivedHeartbeats(`SessionIndex, AuthIndex`): `Option<Bytes>`
- **interface**: `api.query.imOnline.receivedHeartbeats`
- **summary**:   For each session index, we keep a mapping of `AuthIndex` to `offchain::OpaqueNetworkState`. 

___


## multisig
 
### calls(`[u8;32]`): `Option<(OpaqueCall,AccountId,BalanceOf)>`
- **interface**: `api.query.multisig.calls`
 
### multisigs(`AccountId, [u8;32]`): `Option<Multisig>`
- **interface**: `api.query.multisig.multisigs`
- **summary**:   The set of open multisig operations. 

___


## offences
 
### concurrentReportsIndex(`Kind, OpaqueTimeSlot`): `Vec<ReportIdOf>`
- **interface**: `api.query.offences.concurrentReportsIndex`
- **summary**:   A vector of reports of the same kind that happened at the same time slot. 
 
### deferredOffences(): `Vec<DeferredOffenceOf>`
- **interface**: `api.query.offences.deferredOffences`
- **summary**:   Deferred reports that have been rejected by the offence handler and need to be submitted at a later time. 
 
### reports(`ReportIdOf`): `Option<OffenceDetails>`
- **interface**: `api.query.offences.reports`
- **summary**:   The primary structure that holds all offence records keyed by report identifiers. 
 
### reportsByKindIndex(`Kind`): `Bytes`
- **interface**: `api.query.offences.reportsByKindIndex`
- **summary**:   Enumerates all reports of a kind along with the time they happened. 

  All reports are sorted by the time of offence. 

  Note that the actual type of this mapping is `Vec<u8>`, this is because values of different types are not supported at the moment so we are doing the manual serialization. 

___


## randomnessCollectiveFlip
 
### randomMaterial(): `Vec<Hash>`
- **interface**: `api.query.randomnessCollectiveFlip.randomMaterial`
- **summary**:   Series of block headers from the last 81 blocks that acts as random seed material. This is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of the oldest hash. 

___


## rewards
 
### developmentFundTake(): `Perbill`
- **interface**: `api.query.rewards.developmentFundTake`
- **summary**:   Development fund % take for reward payouts, parts-per-billion 
 
### inflationRate(): `FixedI128`
- **interface**: `api.query.rewards.inflationRate`
- **summary**:   Inflation rate % to apply on reward payouts, it may be negative 
 
### transactionFeePot(): `BalanceOf`
- **interface**: `api.query.rewards.transactionFeePot`
- **summary**:   Accumulated transaction fees for reward payout 
 
### transactionFeePotHistory(): `VecDeque`
- **interface**: `api.query.rewards.transactionFeePotHistory`
- **summary**:   Historic accumulated transaction fees on reward payout 

___


## scheduler
 
### agenda(`BlockNumber`): `Vec<Option<Scheduled>>`
- **interface**: `api.query.scheduler.agenda`
- **summary**:   Items to be executed, indexed by the block number that they should be executed on. 
 
### lookup(`Bytes`): `Option<TaskAddress>`
- **interface**: `api.query.scheduler.lookup`
- **summary**:   Lookup from identity to the block number and index of the task. 
 
### storageVersion(): `Releases`
- **interface**: `api.query.scheduler.storageVersion`
- **summary**:   Storage version of the pallet. 

  New networks start with last version. 

___


## session
 
### currentIndex(): `SessionIndex`
- **interface**: `api.query.session.currentIndex`
- **summary**:   Current index of the session. 
 
### disabledValidators(): `Vec<u32>`
- **interface**: `api.query.session.disabledValidators`
- **summary**:   Indices of disabled validators. 

  The set is cleared when `on_session_ending` returns a new set of identities. 
 
### keyOwner(`(KeyTypeId,Bytes)`): `Option<ValidatorId>`
- **interface**: `api.query.session.keyOwner`
- **summary**:   The owner of a key. The key is the `KeyTypeId` + the encoded key. 
 
### nextKeys(`ValidatorId`): `Option<Keys>`
- **interface**: `api.query.session.nextKeys`
- **summary**:   The next session keys for a validator. 
 
### queuedChanged(): `bool`
- **interface**: `api.query.session.queuedChanged`
- **summary**:   True if the underlying economic identities or weighting behind the validators has changed in the queued validator set. 
 
### queuedKeys(): `Vec<(ValidatorId,Keys)>`
- **interface**: `api.query.session.queuedKeys`
- **summary**:   The queued keys for the next session. When the next session begins, these keys will be used to determine the validator's session keys. 
 
### validators(): `Vec<ValidatorId>`
- **interface**: `api.query.session.validators`
- **summary**:   The current set of validators. 

___


## staking
 
### blockBonding(): `bool`
- **interface**: `api.query.staking.blockBonding`
- **summary**:   Used to toggle the bonding functionality off/on 
 
### bonded(`AccountId`): `Option<AccountId>`
- **interface**: `api.query.staking.bonded`
- **summary**:   Map from all locked "stash" accounts to the controller account. 
 
### bondedEras(): `Vec<(EraIndex,SessionIndex)>`
- **interface**: `api.query.staking.bondedEras`
- **summary**:   A mapping from still-bonded eras to the first session index of that era. 
 
### canceledSlashPayout(): `BalanceOf`
- **interface**: `api.query.staking.canceledSlashPayout`
- **summary**:   The amount of currency given to reporters of a slash event which was canceled by extraordinary circumstances (e.g. governance). 
 
### currentElected(): `Vec<AccountId>`
- **interface**: `api.query.staking.currentElected`
- **summary**:   The currently elected validator set keyed by stash account ID. 
 
### currentEra(): `EraIndex`
- **interface**: `api.query.staking.currentEra`
- **summary**:   The current era index. 
 
### currentEraPointsEarned(): `EraPoints`
- **interface**: `api.query.staking.currentEraPointsEarned`
- **summary**:   Rewards for the current era. Using indices of current elected set. 
 
### currentEraStart(): `MomentOf`
- **interface**: `api.query.staking.currentEraStart`
- **summary**:   The start of the current era. 
 
### currentEraStartSessionIndex(): `SessionIndex`
- **interface**: `api.query.staking.currentEraStartSessionIndex`
- **summary**:   The session index at which the current era started. 
 
### earliestUnappliedSlash(): `Option<EraIndex>`
- **interface**: `api.query.staking.earliestUnappliedSlash`
- **summary**:   The earliest era for which we have a pending, unapplied slash. 
 
### forceEra(): `Forcing`
- **interface**: `api.query.staking.forceEra`
- **summary**:   True if the next session change will be a new era regardless of index. 
 
### invulnerables(): `Vec<AccountId>`
- **interface**: `api.query.staking.invulnerables`
- **summary**:   Any validators that may never be slashed or forcibly kicked. It's a Vec since they're easy to initialize and the performance hit is minimal (we expect no more than four invulnerables) and restricted to testnets. 
 
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

  NOTE: is private so that we can ensure upgraded before all typical accesses. Direct storage APIs can still bypass this protection. 
 
### nominatorSlashInEra(`EraIndex, AccountId`): `Option<BalanceOf>`
- **interface**: `api.query.staking.nominatorSlashInEra`
- **summary**:   All slashing events on nominators, mapped by era to the highest slash value of the era. 
 
### payee(`AccountId`): `RewardDestination`
- **interface**: `api.query.staking.payee`
- **summary**:   Where the reward payment should be made. Keyed by stash. 
 
### slashingSpans(`AccountId`): `Option<SlashingSpans>`
- **interface**: `api.query.staking.slashingSpans`
- **summary**:   Slashing spans for stash accounts. 
 
### slashRewardFraction(): `Perbill`
- **interface**: `api.query.staking.slashRewardFraction`
- **summary**:   The percentage of the slash that is distributed to reporters. 

  The rest of the slashed value is handled by the `Slash`. 
 
### slotStake(): `BalanceOf`
- **interface**: `api.query.staking.slotStake`
- **summary**:   The amount of balance actively at stake for each validator slot, currently. 

  This is used to derive rewards and punishments. 
 
### spanSlash(`(AccountId,SpanIndex)`): `SpanRecord`
- **interface**: `api.query.staking.spanSlash`
- **summary**:   Records information about the maximum slash of a stash within a slashing span, as well as how much reward has been paid out. 
 
### stakers(`AccountId`): `Exposure`
- **interface**: `api.query.staking.stakers`
- **summary**:   Nominators for a particular account that is in action right now. You can't iterate through validators here, but you can find them in the Session module. 

  This is keyed by the stash account. 
 
### storageVersion(): `u32`
- **interface**: `api.query.staking.storageVersion`
- **summary**:   The version of storage for upgrade. 
 
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

___


## sudo
 
### key(): `AccountId`
- **interface**: `api.query.sudo.key`
- **summary**:   The `AccountId` of the sudo key. 

___


## syloDevice
 
### devices(`AccountId`): `Vec<DeviceId>`
- **interface**: `api.query.syloDevice.devices`

___


## syloE2EE
 
### preKeyBundles(`(AccountId,DeviceId)`): `Vec<PreKeyBundle>`
- **interface**: `api.query.syloE2EE.preKeyBundles`

___


## syloGroups
 
### groups(`Hash`): `Group`
- **interface**: `api.query.syloGroups.groups`
 
### memberDevices(`Hash`): `Vec<(AccountId,DeviceId)>`
- **interface**: `api.query.syloGroups.memberDevices`
- **summary**:   Stores the known member/deviceId tuples for a particular group 
 
### memberships(`AccountId`): `Vec<Hash>`
- **interface**: `api.query.syloGroups.memberships`
- **summary**:   Stores the group ids that a user is a member of 

___


## syloInbox
 
### nextIndexes(`AccountId`): `MessageId`
- **interface**: `api.query.syloInbox.nextIndexes`
 
### values(`AccountId`): `Vec<(MessageId,Message)>`
- **interface**: `api.query.syloInbox.values`

___


## syloPayment
 
### authorisedPayers(): `Vec<AccountId>`
- **interface**: `api.query.syloPayment.authorisedPayers`
- **summary**:   Accounts which have authority to pay for Sylo fees on behalf of the users 

___


## syloResponse
 
### responses(`(AccountId,Hash)`): `Response`
- **interface**: `api.query.syloResponse.responses`

___


## syloVault
 
### vault(`AccountId`): `Vec<(VaultKey,VaultValue)>`
- **interface**: `api.query.syloVault.vault`

___


## system
 
### account(`AccountId`): `AccountInfo`
- **interface**: `api.query.system.account`
- **summary**:   The full account information for a particular account ID. 
 
### allExtrinsicsLen(): `Option<u32>`
- **interface**: `api.query.system.allExtrinsicsLen`
- **summary**:   Total length (in bytes) for all extrinsics put together, for the current block. 
 
### blockHash(`BlockNumber`): `Hash`
- **interface**: `api.query.system.blockHash`
- **summary**:   Map of block numbers to block hashes. 
 
### blockWeight(): `ExtrinsicsWeight`
- **interface**: `api.query.system.blockWeight`
- **summary**:   The current weight for the block. 
 
### digest(): `DigestOf`
- **interface**: `api.query.system.digest`
- **summary**:   Digest of the current block, also part of the block header. 
 
### eventCount(): `EventIndex`
- **interface**: `api.query.system.eventCount`
- **summary**:   The number of events in the `Events<T>` list. 
 
### events(): `Vec<EventRecord>`
- **interface**: `api.query.system.events`
- **summary**:   Events deposited for the current block. 
 
### eventTopics(`Hash`): `Vec<(BlockNumber,EventIndex)>`
- **interface**: `api.query.system.eventTopics`
- **summary**:   Mapping between a topic (represented by T::Hash) and a vector of indexes of events in the `<Events<T>>` list. 

  All topic vectors have deterministic storage locations depending on the topic. This allows light-clients to leverage the changes trie storage tracking mechanism and in case of changes fetch the list of events of interest. 

  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just the `EventIndex` then in case if the topic has the same contents on the next block no notification will be triggered thus the event might be lost. 
 
### executionPhase(): `Option<Phase>`
- **interface**: `api.query.system.executionPhase`
- **summary**:   The execution phase of the block. 
 
### extrinsicCount(): `Option<u32>`
- **interface**: `api.query.system.extrinsicCount`
- **summary**:   Total extrinsics count for the current block. 
 
### extrinsicData(`u32`): `Bytes`
- **interface**: `api.query.system.extrinsicData`
- **summary**:   Extrinsics data for the current block (maps an extrinsic's index to its data). 
 
### extrinsicsRoot(): `Hash`
- **interface**: `api.query.system.extrinsicsRoot`
- **summary**:   Extrinsics root of the current block, also part of the block header. 
 
### lastRuntimeUpgrade(): `Option<LastRuntimeUpgradeInfo>`
- **interface**: `api.query.system.lastRuntimeUpgrade`
- **summary**:   Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened. 
 
### number(): `BlockNumber`
- **interface**: `api.query.system.number`
- **summary**:   The current block number being processed. Set by `execute_block`. 
 
### parentHash(): `Hash`
- **interface**: `api.query.system.parentHash`
- **summary**:   Hash of the previous block. 
 
### upgradedToU32RefCount(): `bool`
- **interface**: `api.query.system.upgradedToU32RefCount`
- **summary**:   True if we have upgraded so that `type RefCount` is `u32`. False (default) if not. 

___


## timestamp
 
### didUpdate(): `bool`
- **interface**: `api.query.timestamp.didUpdate`
- **summary**:   Did the timestamp get updated in this block? 
 
### now(): `Moment`
- **interface**: `api.query.timestamp.now`
- **summary**:   Current time for the current block. 

___


## transactionPayment
 
### nextFeeMultiplier(): `Multiplier`
- **interface**: `api.query.transactionPayment.nextFeeMultiplier`
 
### storageVersion(): `Releases`
- **interface**: `api.query.transactionPayment.storageVersion`

___


## treasury
 
### approvals(): `Vec<ProposalIndex>`
- **interface**: `api.query.treasury.approvals`
- **summary**:   Proposal indices that have been approved but not yet awarded. 
 
### bounties(`BountyIndex`): `Option<Bounty>`
- **interface**: `api.query.treasury.bounties`
- **summary**:   Bounties that have been made. 
 
### bountyApprovals(): `Vec<BountyIndex>`
- **interface**: `api.query.treasury.bountyApprovals`
- **summary**:   Bounty indices that have been approved but not yet funded. 
 
### bountyCount(): `BountyIndex`
- **interface**: `api.query.treasury.bountyCount`
- **summary**:   Number of bounty proposals that have been made. 
 
### bountyDescriptions(`BountyIndex`): `Option<Bytes>`
- **interface**: `api.query.treasury.bountyDescriptions`
- **summary**:   The description of each bounty. 
 
### proposalCount(): `ProposalIndex`
- **interface**: `api.query.treasury.proposalCount`
- **summary**:   Number of proposals that have been made. 
 
### proposals(`ProposalIndex`): `Option<TreasuryProposal>`
- **interface**: `api.query.treasury.proposals`
- **summary**:   Proposals that have been made. 
 
### reasons(`Hash`): `Option<Bytes>`
- **interface**: `api.query.treasury.reasons`
- **summary**:   Simple preimage lookup from the reason's hash to the original data. Again, has an insecure enumerable hash since the key is guaranteed to be the result of a secure hash. 
 
### tips(`Hash`): `Option<OpenTip>`
- **interface**: `api.query.treasury.tips`
- **summary**:   Tips that are not yet completed. Keyed by the hash of `(reason, who)` from the value. This has the insecure enumerable hash function since the key itself is already guaranteed to be a secure hash. 

___


## undefined
