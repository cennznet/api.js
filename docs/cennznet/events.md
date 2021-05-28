---
title: Events
---

Events are emitted for certain operations on the runtime. The following sections describe the events that are part of the default Substrate runtime. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[attestation](#attestation)**

- **[cennzx](#cennzx)**

- **[genericAsset](#genericasset)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[multisig](#multisig)**

- **[nft](#nft)**

- **[offences](#offences)**

- **[rewards](#rewards)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[system](#system)**

- **[treasury](#treasury)**

- **[utility](#utility)**


___


## attestation
 
### ClaimCreated(`AccountId`, `AccountId`, `AttestationTopic`, `AttestationValue`)
 
### ClaimRemoved(`AccountId`, `AccountId`, `AttestationTopic`)
 
### ClaimUpdated(`AccountId`, `AccountId`, `AttestationTopic`, `AttestationValue`)

___


## cennzx
 
### AddLiquidity(`AccountId`, `Balance`, `AssetId`, `Balance`)
- **summary**:   Provider, core asset amount, trade asset id, trade asset amount 
 
### AssetBought(`AssetId`, `AssetId`, `AccountId`, `Balance`, `Balance`)
- **summary**:   AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### AssetSold(`AssetId`, `AssetId`, `AccountId`, `Balance`, `Balance`)
- **summary**:   AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### RemoveLiquidity(`AccountId`, `Balance`, `AssetId`, `Balance`)
- **summary**:   Provider, core asset amount, trade asset id, trade asset amount 

___


## genericAsset
 
### AssetInfoUpdated(`AssetId`, `AssetInfo`)
- **summary**:   Asset info updated (asset_id, asset_info). 
 
### Burned(`AssetId`, `AccountId`, `Balance`)
- **summary**:   Asset burned (asset_id, account, amount). 
 
### Created(`AssetId`, `AccountId`, `AssetOptions`)
- **summary**:   Asset created (asset_id, creator, asset_options). 
 
### Minted(`AssetId`, `AccountId`, `Balance`)
- **summary**:   New asset minted (asset_id, account, amount). 
 
### PermissionUpdated(`AssetId`, `PermissionLatest`)
- **summary**:   Asset permission updated (asset_id, new_permissions). 
 
### Transferred(`AssetId`, `AccountId`, `AccountId`, `Balance`)
- **summary**:   Asset transfer succeeded (asset_id, from, to, amount). 

___


## grandpa
 
### NewAuthorities(`AuthorityList`)
- **summary**:   New authority set has been applied. \[authority_set\] 
 
### Paused()
- **summary**:   Current authority set has been paused. 
 
### Resumed()
- **summary**:   Current authority set has been resumed. 

___


## identity
 
### IdentityCleared(`AccountId`, `Balance`)
- **summary**:   A name was cleared, and the given balance returned. \[who, deposit\] 
 
### IdentityKilled(`AccountId`, `Balance`)
- **summary**:   A name was removed and the given balance slashed. \[who, deposit\] 
 
### IdentitySet(`AccountId`)
- **summary**:   A name was set or reset (which will remove all judgements). \[who\] 
 
### JudgementGiven(`AccountId`, `RegistrarIndex`)
- **summary**:   A judgement was given by a registrar. \[target, registrar_index\] 
 
### JudgementRequested(`AccountId`, `RegistrarIndex`)
- **summary**:   A judgement was asked from a registrar. \[who, registrar_index\] 
 
### JudgementUnrequested(`AccountId`, `RegistrarIndex`)
- **summary**:   A judgement request was retracted. \[who, registrar_index\] 
 
### RegistrarAdded(`RegistrarIndex`)
- **summary**:   A registrar was added. \[registrar_index\] 
 
### SubIdentityAdded(`AccountId`, `AccountId`, `Balance`)
- **summary**:   A sub-identity was added to an identity and the deposit paid. \[sub, main, deposit\] 
 
### SubIdentityRemoved(`AccountId`, `AccountId`, `Balance`)
- **summary**:   A sub-identity was removed from an identity and the deposit freed. \[sub, main, deposit\] 
 
### SubIdentityRevoked(`AccountId`, `AccountId`, `Balance`)
- **summary**:   A sub-identity was cleared, and the given deposit repatriated from the main identity account to the sub-identity account. \[sub, main, deposit\] 

___


## imOnline
 
### AllGood()
- **summary**:   At the end of the session, no offence was committed. 
 
### HeartbeatReceived(`AuthorityId`)
- **summary**:   A new heartbeat was received from `AuthorityId` \[authority_id\] 
 
### SomeOffline(`Vec<IdentificationTuple>`)
- **summary**:   At the end of the session, at least one validator was found to be \[offline\]. 

___


## multisig
 
### MultisigApproval(`AccountId`, `Timepoint`, `AccountId`, `CallHash`)
- **summary**:   A multisig operation has been approved by someone. \[approving, timepoint, multisig, call_hash\] 
 
### MultisigCancelled(`AccountId`, `Timepoint`, `AccountId`, `CallHash`)
- **summary**:   A multisig operation has been cancelled. \[cancelling, timepoint, multisig, call_hash\] 
 
### MultisigExecuted(`AccountId`, `Timepoint`, `AccountId`, `CallHash`, `DispatchResult`)
- **summary**:   A multisig operation has been executed. \[approving, timepoint, multisig, call_hash\] 
 
### NewMultisig(`AccountId`, `AccountId`, `CallHash`)
- **summary**:   A new multisig operation has begun. \[approving, multisig, call_hash\] 

___


## nft
 
### AuctionClosed(`CollectionId`, `ListingId`, `Reason`)
- **summary**:   An auction has closed without selling (collection, listing, reason) 
 
### AuctionOpen(`CollectionId`, `ListingId`)
- **summary**:   An auction has opened (collection, listing) 
 
### AuctionSold(`CollectionId`, `ListingId`, `AssetId`, `Balance`, `AccountId`)
- **summary**:   An auction has sold (collection, listing, payment asset, bid, new owner) 
 
### Bid(`CollectionId`, `ListingId`, `Balance`)
- **summary**:   A new highest bid was placed (collection, listing, amount) 
 
### Burn(`CollectionId`, `SeriesId`, `Vec<SerialNumber>`)
- **summary**:   Tokens were burned (collection, series id, serial numbers) 
 
### CreateAdditional(`CollectionId`, `SeriesId`, `TokenCount`, `AccountId`)
- **summary**:   Additional tokens were added to a series (collection, series id, quantity, owner) 
 
### CreateCollection(`CollectionId`, `CollectionNameType`, `AccountId`)
- **summary**:   A new token collection was created (collection, name, owner) 
 
### CreateSeries(`CollectionId`, `SeriesId`, `TokenCount`, `AccountId`)
- **summary**:   A new series of tokens was created (collection, series id, quantity, owner) 
 
### CreateToken(`CollectionId`, `TokenId`, `AccountId`)
- **summary**:   A unique token was created (collection, series id, serial number, owner) 
 
### FixedPriceSaleClosed(`CollectionId`, `ListingId`)
- **summary**:   A fixed price sale has closed without selling (collection, listing) 
 
### FixedPriceSaleComplete(`CollectionId`, `ListingId`, `AccountId`)
- **summary**:   A fixed price sale has completed (collection, listing, buyer)) 
 
### FixedPriceSaleListed(`CollectionId`, `ListingId`)
- **summary**:   A fixed price sale has been listed (collection, listing) 
 
### Transfer(`AccountId`, `Vec<TokenId>`, `AccountId`)
- **summary**:   Token(s) were transferred (previous owner, token Ids, new owner) 

___


## offences
 
### Offence(`Kind`, `OpaqueTimeSlot`, `bool`)
- **summary**:   There is an offence reported of the given `kind` happened at the `session_index` and (kind-specific) time slot. This event is not deposited for duplicate slashes. last element indicates of the offence was applied (true) or queued (false) \[kind, timeslot, applied\]. 

___


## rewards
 
### EraPayout(`Balance`, `Balance`)
- **summary**:   Era reward payout the total (amount to treasury, amount to stakers) 
 
### EraPayoutDeferred(`Balance`)
- **summary**:   Era ended abruptly e.g. due to early re-election, this amount will be deferred to the next full era 
 
### EraStakerPayout(`AccountId`, `Balance`)
- **summary**:   Staker payout (nominator/validator account, amount) 
 
### NewFiscalEra(`Balance`)
- **summary**:   A fiscal era has begun with the parameter (target_inflation_per_staking_era) 

___


## scheduler
 
### Canceled(`BlockNumber`, `u32`)
- **summary**:   Canceled some task. \[when, index\] 
 
### Dispatched(`TaskAddress`, `Option<Bytes>`, `DispatchResult`)
- **summary**:   Dispatched some task. \[task, id, result\] 
 
### Scheduled(`BlockNumber`, `u32`)
- **summary**:   Scheduled some task. \[when, index\] 

___


## session
 
### NewSession(`SessionIndex`)
- **summary**:   New session has happened. Note that the argument is the \[session_index\], not the block number as the type might suggest. 

___


## staking
 
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

___


## sudo
 
### KeyChanged(`AccountId`)
- **summary**:   The \[sudoer\] just switched identity; the old key is supplied. 
 
### Sudid(`DispatchResult`)
- **summary**:   A sudo just took place. \[result\] 
 
### SudoAsDone(`bool`)
- **summary**:   A sudo just took place. \[result\] 

___


## system
 
### CodeUpdated()
- **summary**:   `:code` was updated. 
 
### ExtrinsicFailed(`DispatchError`, `DispatchInfo`)
- **summary**:   An extrinsic failed. \[error, info\] 
 
### ExtrinsicSuccess(`DispatchInfo`)
- **summary**:   An extrinsic completed successfully. \[info\] 
 
### KilledAccount(`AccountId`)
- **summary**:   An \[account\] was reaped. 
 
### NewAccount(`AccountId`)
- **summary**:   A new \[account\] was created. 

___


## treasury
 
### Awarded(`ProposalIndex`, `Balance`, `AccountId`)
- **summary**:   Some funds have been allocated. \[proposal_index, award, beneficiary\] 
 
### BountyAwarded(`BountyIndex`, `AccountId`)
- **summary**:   A bounty is awarded to a beneficiary. [index, beneficiary] 
 
### BountyBecameActive(`BountyIndex`)
- **summary**:   A bounty proposal is funded and became active. [index] 
 
### BountyCanceled(`BountyIndex`)
- **summary**:   A bounty is cancelled. [index] 
 
### BountyClaimed(`BountyIndex`, `Balance`, `AccountId`)
- **summary**:   A bounty is claimed by beneficiary. [index, payout, beneficiary] 
 
### BountyExtended(`BountyIndex`)
- **summary**:   A bounty expiry is extended. [index] 
 
### BountyProposed(`BountyIndex`)
- **summary**:   New bounty proposal. [index] 
 
### BountyRejected(`BountyIndex`, `Balance`)
- **summary**:   A bounty proposal was rejected; funds were slashed. [index, bond] 
 
### Burnt(`Balance`)
- **summary**:   Some of our funds have been burnt. \[burn\] 
 
### Deposit(`Balance`)
- **summary**:   Some funds have been deposited. \[deposit\] 
 
### NewTip(`Hash`)
- **summary**:   A new tip suggestion has been opened. \[tip_hash\] 
 
### Proposed(`ProposalIndex`)
- **summary**:   New proposal. \[proposal_index\] 
 
### Rejected(`ProposalIndex`, `Balance`)
- **summary**:   A proposal was rejected; funds were slashed. \[proposal_index, slashed\] 
 
### Rollover(`Balance`)
- **summary**:   Spending has finished; this is the amount that rolls over until next spend. \[budget_remaining\] 
 
### Spending(`Balance`)
- **summary**:   We have ended a spend period and will now allocate funds. \[budget_remaining\] 
 
### TipClosed(`Hash`, `AccountId`, `Balance`)
- **summary**:   A tip suggestion has been closed. \[tip_hash, who, payout\] 
 
### TipClosing(`Hash`)
- **summary**:   A tip suggestion has reached threshold and is closing. \[tip_hash\] 
 
### TipRetracted(`Hash`)
- **summary**:   A tip suggestion has been retracted. \[tip_hash\] 

___


## utility
 
### BatchCompleted()
- **summary**:   Batch of dispatches completed fully with no error. 
 
### BatchInterrupted(`u32`, `DispatchError`)
- **summary**:   Batch of dispatches did not complete fully. Index of first failing dispatch given, as well as the error. \[index, error\] 
