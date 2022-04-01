---
title: Events
---

Events are emitted for certain operations on the runtime. The following sections describe the events that are part of the default Substrate runtime. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[baseFee](#basefee)**

- **[cennzx](#cennzx)**

- **[erc20Peg](#erc20peg)**

- **[ethBridge](#ethbridge)**

- **[ethereum](#ethereum)**

- **[ethWallet](#ethwallet)**

- **[evm](#evm)**

- **[genericAsset](#genericasset)**

- **[governance](#governance)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

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


## baseFee
 
### BaseFeeOverflow()
- **interface**: `api.events.baseFee.BaseFeeOverflow.is`
 
### IsActive(`bool`)
- **interface**: `api.events.baseFee.IsActive.is`
 
### NewBaseFeePerGas(`U256`)
- **interface**: `api.events.baseFee.NewBaseFeePerGas.is`
 
### NewElasticity(`Permill`)
- **interface**: `api.events.baseFee.NewElasticity.is`

___


## cennzx
 
### AddLiquidity(`AccountId32`, `u128`, `u32`, `u128`)
- **interface**: `api.events.cennzx.AddLiquidity.is`
- **summary**:   rovider, core asset amount, trade asset id, trade asset amount 
 
### AssetBought(`u32`, `u32`, `AccountId32`, `u128`, `u128`)
- **interface**: `api.events.cennzx.AssetBought.is`
- **summary**:   ssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### AssetSold(`u32`, `u32`, `AccountId32`, `u128`, `u128`)
- **interface**: `api.events.cennzx.AssetSold.is`
- **summary**:   ssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### RemoveLiquidity(`AccountId32`, `u128`, `u32`, `u128`)
- **interface**: `api.events.cennzx.RemoveLiquidity.is`
- **summary**:   rovider, core asset amount, trade asset id, trade asset amount 

___


## erc20Peg
 
### CENNZDepositsActive()
- **interface**: `api.events.erc20Peg.CENNZDepositsActive.is`
- **summary**:   RC20 CENNZ deposits activated 
 
### Erc20Claim(`u64`, `AccountId32`)
- **interface**: `api.events.erc20Peg.Erc20Claim.is`
- **summary**:   n erc20 deposit claim has started. (deposit Id, sender) 
 
### Erc20Deposit(`u64`, `u32`, `u128`, `AccountId32`)
- **interface**: `api.events.erc20Peg.Erc20Deposit.is`
- **summary**:    bridged erc20 deposit succeeded.(deposit Id, asset, amount, beneficiary) 
 
### Erc20DepositFail(`u64`)
- **interface**: `api.events.erc20Peg.Erc20DepositFail.is`
- **summary**:    bridged erc20 deposit failed.(deposit Id) 
 
### Erc20Withdraw(`u64`, `u32`, `u128`, `H160`)
- **interface**: `api.events.erc20Peg.Erc20Withdraw.is`
- **summary**:   okens were burnt for withdrawal on Ethereum as ERC20s (withdrawal Id, asset, amount, beneficiary) 
 
### SetContractAddress(`H160`)
- **interface**: `api.events.erc20Peg.SetContractAddress.is`
- **summary**:   he peg contract address has been set 

___


## ethBridge
 
### AuthoritySetChange(`u64`, `u64`)
- **interface**: `api.events.ethBridge.AuthoritySetChange.is`
- **summary**:    notary (validator) set change is in motion (event_id, new_validator_set_id)  proof for the change will be generated with the given `event_id` 
 
### Invalid(`u64`)
- **interface**: `api.events.ethBridge.Invalid.is`
- **summary**:   erifying an event failed 
 
### Verified(`u64`)
- **interface**: `api.events.ethBridge.Verified.is`
- **summary**:   erifying an event succeeded 

___


## ethereum
 
### Executed(`H160`, `H160`, `H256`, `EvmCoreErrorExitReason`)
- **interface**: `api.events.ethereum.Executed.is`
- **summary**:   n ethereum transaction was successfully executed. [from, to/contract_address, transaction_hash, exit_reason] 

___


## ethWallet
 
### Execute(`H160`, `AccountId32`, `Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.ethWallet.Execute.is`
- **summary**:    call just executed. (Ethereum Address, CENNZnet Address, Result) 

___


## evm
 
### BalanceDeposit(`AccountId32`, `H160`, `U256`)
- **interface**: `api.events.evm.BalanceDeposit.is`
- **summary**:    deposit has been made at a given address. \[sender, address, value\] 
 
### BalanceWithdraw(`AccountId32`, `H160`, `U256`)
- **interface**: `api.events.evm.BalanceWithdraw.is`
- **summary**:    withdrawal has been made from a given address. \[sender, address, value\] 
 
### Created(`H160`)
- **interface**: `api.events.evm.Created.is`
- **summary**:    contract has been created at given \[address\]. 
 
### CreatedFailed(`H160`)
- **interface**: `api.events.evm.CreatedFailed.is`
- **summary**:    \[contract\] was attempted to be created, but the execution failed. 
 
### Executed(`H160`)
- **interface**: `api.events.evm.Executed.is`
- **summary**:    \[contract\] has been executed successfully with states applied. 
 
### ExecutedFailed(`H160`)
- **interface**: `api.events.evm.ExecutedFailed.is`
- **summary**:    \[contract\] has been executed with errors. States are reverted with only gas fees applied. 
 
### Log(`EthereumLog`)
- **interface**: `api.events.evm.Log.is`
- **summary**:   thereum events from contracts. 

___


## genericAsset
 
### AssetInfoUpdated(`u32`, `CrmlGenericAssetAssetInfo`)
- **interface**: `api.events.genericAsset.AssetInfoUpdated.is`
- **summary**:   sset info updated (asset_id, asset_info). 
 
### Burned(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Burned.is`
- **summary**:   sset burned (asset_id, account, amount). 
 
### Created(`u32`, `AccountId32`, `CrmlGenericAssetAssetOptions`)
- **interface**: `api.events.genericAsset.Created.is`
- **summary**:   sset created (asset_id, creator, asset_options). 
 
### DustReclaimed(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.DustReclaimed.is`
- **summary**:   sset balance storage has been reclaimed due to falling below the existential deposit 
 
### Minted(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Minted.is`
- **summary**:   ew asset minted (asset_id, account, amount). 
 
### PermissionUpdated(`u32`, `CrmlGenericAssetPermissionsV1`)
- **interface**: `api.events.genericAsset.PermissionUpdated.is`
- **summary**:   sset permission updated (asset_id, new_permissions). 
 
### Transferred(`u32`, `AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Transferred.is`
- **summary**:   sset transfer succeeded (asset_id, from, to, amount). 

___


## governance
 
### EnactReferendum(`u64`, `bool`)
- **interface**: `api.events.governance.EnactReferendum.is`
- **summary**:    proposal was enacted, success 
 
### ProposalVeto(`u64`)
- **interface**: `api.events.governance.ProposalVeto.is`
- **summary**:    proposal was vetoed by the council 
 
### ReferendumApproved(`u64`)
- **interface**: `api.events.governance.ReferendumApproved.is`
- **summary**:    referendum has been approved and is awaiting enactment 
 
### ReferendumCreated(`u64`)
- **interface**: `api.events.governance.ReferendumCreated.is`
- **summary**:    proposal was approved by council and a referendum has been created 
 
### ReferendumVeto(`u64`)
- **interface**: `api.events.governance.ReferendumVeto.is`
- **summary**:    referendum was vetoed by vote 
 
### SubmitProposal(`u64`)
- **interface**: `api.events.governance.SubmitProposal.is`
- **summary**:    proposal was submitted 

___


## grandpa
 
### NewAuthorities(`Vec<(SpFinalityGrandpaAppPublic,u64)>`)
- **interface**: `api.events.grandpa.NewAuthorities.is`
- **summary**:   ew authority set has been applied. 
 
### Paused()
- **interface**: `api.events.grandpa.Paused.is`
- **summary**:   urrent authority set has been paused. 
 
### Resumed()
- **interface**: `api.events.grandpa.Resumed.is`
- **summary**:   urrent authority set has been resumed. 

___


## identity
 
### IdentityCleared(`AccountId32`, `u128`)
- **interface**: `api.events.identity.IdentityCleared.is`
- **summary**:    name was cleared, and the given balance returned. 
 
### IdentityKilled(`AccountId32`, `u128`)
- **interface**: `api.events.identity.IdentityKilled.is`
- **summary**:    name was removed and the given balance slashed. 
 
### IdentitySet(`AccountId32`)
- **interface**: `api.events.identity.IdentitySet.is`
- **summary**:    name was set or reset (which will remove all judgements). 
 
### JudgementGiven(`AccountId32`, `u32`)
- **interface**: `api.events.identity.JudgementGiven.is`
- **summary**:    judgement was given by a registrar. 
 
### JudgementRequested(`AccountId32`, `u32`)
- **interface**: `api.events.identity.JudgementRequested.is`
- **summary**:    judgement was asked from a registrar. 
 
### JudgementUnrequested(`AccountId32`, `u32`)
- **interface**: `api.events.identity.JudgementUnrequested.is`
- **summary**:    judgement request was retracted. 
 
### RegistrarAdded(`u32`)
- **interface**: `api.events.identity.RegistrarAdded.is`
- **summary**:    registrar was added. 
 
### SubIdentityAdded(`AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.identity.SubIdentityAdded.is`
- **summary**:    sub-identity was added to an identity and the deposit paid. 
 
### SubIdentityRemoved(`AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.identity.SubIdentityRemoved.is`
- **summary**:    sub-identity was removed from an identity and the deposit freed. 
 
### SubIdentityRevoked(`AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.identity.SubIdentityRevoked.is`
- **summary**:    sub-identity was cleared, and the given deposit repatriated from the ain identity account to the sub-identity account. 

___


## imOnline
 
### AllGood()
- **interface**: `api.events.imOnline.AllGood.is`
- **summary**:   t the end of the session, no offence was committed. 
 
### HeartbeatReceived(`PalletImOnlineSr25519AppSr25519Public`)
- **interface**: `api.events.imOnline.HeartbeatReceived.is`
- **summary**:    new heartbeat was received from `AuthorityId`. 
 
### SomeOffline(`Vec<(AccountId32,CrmlStakingExposure)>`)
- **interface**: `api.events.imOnline.SomeOffline.is`
- **summary**:   t the end of the session, at least one validator was found to be offline. 

___


## nft
 
### AuctionClosed(`u32`, `u128`, `CrmlNftAuctionClosureReason`)
- **interface**: `api.events.nft.AuctionClosed.is`
- **summary**:   n auction has closed without selling (collection, listing, reason) 
 
### AuctionOpen(`u32`, `u128`, `Option<u32>`)
- **interface**: `api.events.nft.AuctionOpen.is`
- **summary**:   n auction has opened (collection, listing, marketplace_id) 
 
### AuctionSold(`u32`, `u128`, `u32`, `u128`, `AccountId32`)
- **interface**: `api.events.nft.AuctionSold.is`
- **summary**:   n auction has sold (collection, listing, payment asset, bid, new owner) 
 
### Bid(`u32`, `u128`, `u128`)
- **interface**: `api.events.nft.Bid.is`
- **summary**:    new highest bid was placed (collection, listing, amount) 
 
### Burn(`u32`, `u32`, `Vec<u32>`)
- **interface**: `api.events.nft.Burn.is`
- **summary**:   okens were burned (collection, series id, serial numbers) 
 
### CreateCollection(`u32`, `Bytes`, `AccountId32`)
- **interface**: `api.events.nft.CreateCollection.is`
- **summary**:    new token collection was created (collection, name, owner) 
 
### CreateSeries(`u32`, `u32`, `u32`, `AccountId32`)
- **interface**: `api.events.nft.CreateSeries.is`
- **summary**:    new series of tokens was created (collection, series id, quantity, owner) 
 
### CreateTokens(`u32`, `u32`, `u32`, `AccountId32`)
- **interface**: `api.events.nft.CreateTokens.is`
- **summary**:   oken(s) were created (collection, series id, quantity, owner) 
 
### FixedPriceSaleClosed(`u32`, `u128`)
- **interface**: `api.events.nft.FixedPriceSaleClosed.is`
- **summary**:    fixed price sale has closed without selling (collection, listing) 
 
### FixedPriceSaleComplete(`u32`, `u128`, `AccountId32`)
- **interface**: `api.events.nft.FixedPriceSaleComplete.is`
- **summary**:    fixed price sale has completed (collection, listing, buyer)) 
 
### FixedPriceSaleListed(`u32`, `u128`, `Option<u32>`)
- **interface**: `api.events.nft.FixedPriceSaleListed.is`
- **summary**:    fixed price sale has been listed (collection, listing, marketplace_id) 
 
### RegisteredMarketplace(`AccountId32`, `Permill`, `u32`)
- **interface**: `api.events.nft.RegisteredMarketplace.is`
- **summary**:   n account has been registered as a marketplace (account, entitlement, marketplace_id) 
 
### Transfer(`AccountId32`, `u32`, `u32`, `Vec<u32>`, `AccountId32`)
- **interface**: `api.events.nft.Transfer.is`
- **summary**:   oken(s) were transferred (previous owner, token Ids, new owner) 

___


## offences
 
### Offence(`[u8;16]`, `Bytes`)
- **interface**: `api.events.offences.Offence.is`
- **summary**:   here is an offence reported of the given `kind` happened at the `session_index` and kind-specific) time slot. This event is not deposited for duplicate slashes. [kind, timeslot\]. 

___


## rewards
 
### EraPayout(`u128`, `u128`)
- **interface**: `api.events.rewards.EraPayout.is`
- **summary**:   ra reward payout the total (amount to treasury, amount to stakers) 
 
### EraPayoutDeferred(`u128`)
- **interface**: `api.events.rewards.EraPayoutDeferred.is`
- **summary**:   ra ended abruptly e.g. due to early re-election, this amount will be deferred to the next full era 
 
### EraStakerPayout(`AccountId32`, `u128`)
- **interface**: `api.events.rewards.EraStakerPayout.is`
- **summary**:   taker payout (nominator/validator account, amount) 
 
### NewFiscalEra(`u128`)
- **interface**: `api.events.rewards.NewFiscalEra.is`
- **summary**:    fiscal era has begun with the parameter (target_inflation_per_staking_era) 

___


## scheduler
 
### Canceled(`u32`, `u32`)
- **interface**: `api.events.scheduler.Canceled.is`
- **summary**:   anceled some task. 
 
### Dispatched(`(u32,u32)`, `Option<Bytes>`, `Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.scheduler.Dispatched.is`
- **summary**:   ispatched some task. 
 
### Scheduled(`u32`, `u32`)
- **interface**: `api.events.scheduler.Scheduled.is`
- **summary**:   cheduled some task. 

___


## session
 
### NewSession(`u32`)
- **interface**: `api.events.session.NewSession.is`
- **summary**:   ew session has happened. Note that the argument is the session index, not the lock number as the type might suggest. 

___


## staking
 
### Bonded(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Bonded.is`
- **summary**:   n account has bonded this amount. \[stash, amount\] 

  OTE: This event is only emitted when funds are bonded via a dispatchable. Notably, t will not be emitted for staking rewards when they are added to stake. 
 
### InvulnerableNotSlashed(`AccountId32`, `Perbill`)
- **interface**: `api.events.staking.InvulnerableNotSlashed.is`
- **summary**:   he validator is invulnerable, so it has NOT been slashed. 
 
### OldSlashingReportDiscarded(`u32`)
- **interface**: `api.events.staking.OldSlashingReportDiscarded.is`
- **summary**:   n old slashing report from a prior era was discarded because it could ot be processed. 
 
### SetInvulnerables(`Vec<AccountId32>`)
- **interface**: `api.events.staking.SetInvulnerables.is`
- **summary**:    new set of validators are marked to be invulnerable 
 
### SetMinimumBond(`u128`)
- **interface**: `api.events.staking.SetMinimumBond.is`
- **summary**:   inimum bond amount is changed. 
 
### Slash(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Slash.is`
- **summary**:   ne validator (and its nominators) has been slashed by the given amount. 
 
### Slashed(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Slashed.is`
- **summary**:   ne validator (and its nominators) has been slashed by the given amount. [validator, amount\] 
 
### SolutionStored(`CrmlStakingElectionCompute`)
- **interface**: `api.events.staking.SolutionStored.is`
- **summary**:    new solution for the upcoming election has been stored. \[compute\] 
 
### StakingElection(`CrmlStakingElectionCompute`)
- **interface**: `api.events.staking.StakingElection.is`
- **summary**:    new set of stakers was elected with the given \[compute\]. 
 
### Unbonded(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Unbonded.is`
- **summary**:   n account has unbonded this amount. \[stash, amount\] 
 
### Withdrawn(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Withdrawn.is`
- **summary**:   n account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance` rom the unlocking queue. \[stash, amount\] 

___


## sudo
 
### KeyChanged(`AccountId32`)
- **interface**: `api.events.sudo.KeyChanged.is`
- **summary**:   he \[sudoer\] just switched identity; the old key is supplied. 
 
### Sudid(`Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.sudo.Sudid.is`
- **summary**:    sudo just took place. \[result\] 
 
### SudoAsDone(`Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.sudo.SudoAsDone.is`
- **summary**:    sudo just took place. \[result\] 

___


## system
 
### CodeUpdated()
- **interface**: `api.events.system.CodeUpdated.is`
- **summary**:   :code` was updated. 
 
### ExtrinsicFailed(`SpRuntimeDispatchError`, `FrameSupportWeightsDispatchInfo`)
- **interface**: `api.events.system.ExtrinsicFailed.is`
- **summary**:   n extrinsic failed. 
 
### ExtrinsicSuccess(`FrameSupportWeightsDispatchInfo`)
- **interface**: `api.events.system.ExtrinsicSuccess.is`
- **summary**:   n extrinsic completed successfully. 
 
### KilledAccount(`AccountId32`)
- **interface**: `api.events.system.KilledAccount.is`
- **summary**:   n account was reaped. 
 
### NewAccount(`AccountId32`)
- **interface**: `api.events.system.NewAccount.is`
- **summary**:    new account was created. 
 
### Remarked(`AccountId32`, `H256`)
- **interface**: `api.events.system.Remarked.is`
- **summary**:   n on-chain remark happened. 

___


## treasury
 
### Awarded(`u32`, `u128`, `AccountId32`)
- **interface**: `api.events.treasury.Awarded.is`
- **summary**:   ome funds have been allocated. 
 
### Burnt(`u128`)
- **interface**: `api.events.treasury.Burnt.is`
- **summary**:   ome of our funds have been burnt. 
 
### Deposit(`u128`)
- **interface**: `api.events.treasury.Deposit.is`
- **summary**:   ome funds have been deposited. 
 
### Proposed(`u32`)
- **interface**: `api.events.treasury.Proposed.is`
- **summary**:   ew proposal. 
 
### Rejected(`u32`, `u128`)
- **interface**: `api.events.treasury.Rejected.is`
- **summary**:    proposal was rejected; funds were slashed. 
 
### Rollover(`u128`)
- **interface**: `api.events.treasury.Rollover.is`
- **summary**:   pending has finished; this is the amount that rolls over until next spend. 
 
### Spending(`u128`)
- **interface**: `api.events.treasury.Spending.is`
- **summary**:   e have ended a spend period and will now allocate funds. 

___


## utility
 
### BatchCompleted()
- **interface**: `api.events.utility.BatchCompleted.is`
- **summary**:   atch of dispatches completed fully with no error. 
 
### BatchInterrupted(`u32`, `SpRuntimeDispatchError`)
- **interface**: `api.events.utility.BatchInterrupted.is`
- **summary**:   atch of dispatches did not complete fully. Index of first failing dispatch given, as ell as the error. 
 
### DispatchedAs(`Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.utility.DispatchedAs.is`
- **summary**:    call was dispatched. 
 
### ItemCompleted()
- **interface**: `api.events.utility.ItemCompleted.is`
- **summary**:    single item within a Batch of dispatches has completed with no error. 
