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
- **interface**: `api.events.baseFee.BaseFeeOverflow`
 
### IsActive(`bool`)
- **interface**: `api.events.baseFee.IsActive`
 
### NewBaseFeePerGas(`U256`)
- **interface**: `api.events.baseFee.NewBaseFeePerGas`
 
### NewElasticity(`Permill`)
- **interface**: `api.events.baseFee.NewElasticity`

___


## cennzx
 
### AddLiquidity(`AccountId32`, `u128`, `u32`, `u128`)
- **interface**: `api.events.cennzx.AddLiquidity`
- **summary**:   Provider, core asset amount, trade asset id, trade asset amount 
 
### AssetBought(`u32`, `u32`, `AccountId32`, `u128`, `u128`)
- **interface**: `api.events.cennzx.AssetBought`
- **summary**:   AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### AssetSold(`u32`, `u32`, `AccountId32`, `u128`, `u128`)
- **interface**: `api.events.cennzx.AssetSold`
- **summary**:   AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### RemoveLiquidity(`AccountId32`, `u128`, `u32`, `u128`)
- **interface**: `api.events.cennzx.RemoveLiquidity`
- **summary**:   Provider, core asset amount, trade asset id, trade asset amount 

___


## erc20Peg
 
### CENNZDepositsActive()
- **interface**: `api.events.erc20Peg.CENNZDepositsActive`
- **summary**:   ERC20 CENNZ deposits activated 
 
### Erc20Claim(`u64`, `AccountId32`)
- **interface**: `api.events.erc20Peg.Erc20Claim`
- **summary**:   An erc20 deposit claim has started. (deposit Id, sender) 
 
### Erc20Deposit(`u64`, `u32`, `u128`, `AccountId32`)
- **interface**: `api.events.erc20Peg.Erc20Deposit`
- **summary**:   A bridged erc20 deposit succeeded.(deposit Id, asset, amount, beneficiary) 
 
### Erc20DepositFail(`u64`)
- **interface**: `api.events.erc20Peg.Erc20DepositFail`
- **summary**:   A bridged erc20 deposit failed.(deposit Id) 
 
### Erc20Withdraw(`u64`, `u32`, `u128`, `H160`)
- **interface**: `api.events.erc20Peg.Erc20Withdraw`
- **summary**:   Tokens were burnt for withdrawal on Ethereum as ERC20s (withdrawal Id, asset, amount, beneficiary) 
 
### SetContractAddress(`H160`)
- **interface**: `api.events.erc20Peg.SetContractAddress`
- **summary**:   The peg contract address has been set 

___


## ethBridge
 
### AuthoritySetChange(`u64`, `u64`)
- **interface**: `api.events.ethBridge.AuthoritySetChange`
- **summary**:   A notary (validator) set change is in motion (event_id, new_validator_set_id) A proof for the change will be generated with the given `event_id` 
 
### Invalid(`u64`)
- **interface**: `api.events.ethBridge.Invalid`
- **summary**:   Verifying an event failed 
 
### Verified(`u64`)
- **interface**: `api.events.ethBridge.Verified`
- **summary**:   Verifying an event succeeded 

___


## ethereum
 
### Executed(`H160`, `H160`, `H256`, `EvmCoreErrorExitReason`)
- **interface**: `api.events.ethereum.Executed`
- **summary**:   An ethereum transaction was successfully executed. [from, to/contract_address, transaction_hash, exit_reason] 

___


## ethWallet
 
### Execute(`H160`, `AccountId32`, `Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.ethWallet.Execute`
- **summary**:   A call just executed. (Ethereum Address, CENNZnet Address, Result) 

___


## evm
 
### BalanceDeposit(`AccountId32`, `H160`, `U256`)
- **interface**: `api.events.evm.BalanceDeposit`
- **summary**:   A deposit has been made at a given address. \[sender, address, value\] 
 
### BalanceWithdraw(`AccountId32`, `H160`, `U256`)
- **interface**: `api.events.evm.BalanceWithdraw`
- **summary**:   A withdrawal has been made from a given address. \[sender, address, value\] 
 
### Created(`H160`)
- **interface**: `api.events.evm.Created`
- **summary**:   A contract has been created at given \[address\]. 
 
### CreatedFailed(`H160`)
- **interface**: `api.events.evm.CreatedFailed`
- **summary**:   A \[contract\] was attempted to be created, but the execution failed. 
 
### Executed(`H160`)
- **interface**: `api.events.evm.Executed`
- **summary**:   A \[contract\] has been executed successfully with states applied. 
 
### ExecutedFailed(`H160`)
- **interface**: `api.events.evm.ExecutedFailed`
- **summary**:   A \[contract\] has been executed with errors. States are reverted with only gas fees applied. 
 
### Log(`EthereumLog`)
- **interface**: `api.events.evm.Log`
- **summary**:   Ethereum events from contracts. 

___


## genericAsset
 
### AssetInfoUpdated(`u32`, `CrmlGenericAssetAssetInfo`)
- **interface**: `api.events.genericAsset.AssetInfoUpdated`
- **summary**:   Asset info updated (asset_id, asset_info). 
 
### Burned(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Burned`
- **summary**:   Asset burned (asset_id, account, amount). 
 
### Created(`u32`, `AccountId32`, `CrmlGenericAssetAssetOptions`)
- **interface**: `api.events.genericAsset.Created`
- **summary**:   Asset created (asset_id, creator, asset_options). 
 
### DustReclaimed(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.DustReclaimed`
- **summary**:   Asset balance storage has been reclaimed due to falling below the existential deposit 
 
### Minted(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Minted`
- **summary**:   New asset minted (asset_id, account, amount). 
 
### PermissionUpdated(`u32`, `CrmlGenericAssetPermissionsV1`)
- **interface**: `api.events.genericAsset.PermissionUpdated`
- **summary**:   Asset permission updated (asset_id, new_permissions). 
 
### Transferred(`u32`, `AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Transferred`
- **summary**:   Asset transfer succeeded (asset_id, from, to, amount). 

___


## governance
 
### EnactReferendum(`u64`, `bool`)
- **interface**: `api.events.governance.EnactReferendum`
- **summary**:   A proposal was enacted, success 
 
### ProposalVeto(`u64`)
- **interface**: `api.events.governance.ProposalVeto`
- **summary**:   A proposal was vetoed by the council 
 
### ReferendumApproved(`u64`)
- **interface**: `api.events.governance.ReferendumApproved`
- **summary**:   A referendum has been approved and is awaiting enactment 
 
### ReferendumCreated(`u64`)
- **interface**: `api.events.governance.ReferendumCreated`
- **summary**:   A proposal was approved by council and a referendum has been created 
 
### ReferendumVeto(`u64`)
- **interface**: `api.events.governance.ReferendumVeto`
- **summary**:   A referendum was vetoed by vote 
 
### SubmitProposal(`u64`)
- **interface**: `api.events.governance.SubmitProposal`
- **summary**:   A proposal was submitted 

___


## grandpa
 
### NewAuthorities(`Vec<(SpFinalityGrandpaAppPublic,u64)>`)
- **interface**: `api.events.grandpa.NewAuthorities`
- **summary**:   New authority set has been applied. 
 
### Paused()
- **interface**: `api.events.grandpa.Paused`
- **summary**:   Current authority set has been paused. 
 
### Resumed()
- **interface**: `api.events.grandpa.Resumed`
- **summary**:   Current authority set has been resumed. 

___


## identity
 
### IdentityCleared(`AccountId32`, `u128`)
- **interface**: `api.events.identity.IdentityCleared`
- **summary**:   A name was cleared, and the given balance returned. 
 
### IdentityKilled(`AccountId32`, `u128`)
- **interface**: `api.events.identity.IdentityKilled`
- **summary**:   A name was removed and the given balance slashed. 
 
### IdentitySet(`AccountId32`)
- **interface**: `api.events.identity.IdentitySet`
- **summary**:   A name was set or reset (which will remove all judgements). 
 
### JudgementGiven(`AccountId32`, `u32`)
- **interface**: `api.events.identity.JudgementGiven`
- **summary**:   A judgement was given by a registrar. 
 
### JudgementRequested(`AccountId32`, `u32`)
- **interface**: `api.events.identity.JudgementRequested`
- **summary**:   A judgement was asked from a registrar. 
 
### JudgementUnrequested(`AccountId32`, `u32`)
- **interface**: `api.events.identity.JudgementUnrequested`
- **summary**:   A judgement request was retracted. 
 
### RegistrarAdded(`u32`)
- **interface**: `api.events.identity.RegistrarAdded`
- **summary**:   A registrar was added. 
 
### SubIdentityAdded(`AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.identity.SubIdentityAdded`
- **summary**:   A sub-identity was added to an identity and the deposit paid. 
 
### SubIdentityRemoved(`AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.identity.SubIdentityRemoved`
- **summary**:   A sub-identity was removed from an identity and the deposit freed. 
 
### SubIdentityRevoked(`AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.identity.SubIdentityRevoked`
- **summary**:   A sub-identity was cleared, and the given deposit repatriated from the main identity account to the sub-identity account. 

___


## imOnline
 
### AllGood()
- **interface**: `api.events.imOnline.AllGood`
- **summary**:   At the end of the session, no offence was committed. 
 
### HeartbeatReceived(`PalletImOnlineSr25519AppSr25519Public`)
- **interface**: `api.events.imOnline.HeartbeatReceived`
- **summary**:   A new heartbeat was received from `AuthorityId`. 
 
### SomeOffline(`Vec<(AccountId32,CrmlStakingExposure)>`)
- **interface**: `api.events.imOnline.SomeOffline`
- **summary**:   At the end of the session, at least one validator was found to be offline. 

___


## nft
 
### AuctionClosed(`u32`, `u128`, `CrmlNftAuctionClosureReason`)
- **interface**: `api.events.nft.AuctionClosed`
- **summary**:   An auction has closed without selling (collection, listing, reason) 
 
### AuctionOpen(`u32`, `u128`, `Option<u32>`)
- **interface**: `api.events.nft.AuctionOpen`
- **summary**:   An auction has opened (collection, listing, marketplace_id) 
 
### AuctionSold(`u32`, `u128`, `u32`, `u128`, `AccountId32`)
- **interface**: `api.events.nft.AuctionSold`
- **summary**:   An auction has sold (collection, listing, payment asset, bid, new owner) 
 
### Bid(`u32`, `u128`, `u128`)
- **interface**: `api.events.nft.Bid`
- **summary**:   A new highest bid was placed (collection, listing, amount) 
 
### Burn(`u32`, `u32`, `Vec<u32>`)
- **interface**: `api.events.nft.Burn`
- **summary**:   Tokens were burned (collection, series id, serial numbers) 
 
### CreateCollection(`u32`, `Bytes`, `AccountId32`)
- **interface**: `api.events.nft.CreateCollection`
- **summary**:   A new token collection was created (collection, name, owner) 
 
### CreateSeries(`u32`, `u32`, `u32`, `AccountId32`)
- **interface**: `api.events.nft.CreateSeries`
- **summary**:   A new series of tokens was created (collection, series id, quantity, owner) 
 
### CreateTokens(`u32`, `u32`, `u32`, `AccountId32`)
- **interface**: `api.events.nft.CreateTokens`
- **summary**:   Token(s) were created (collection, series id, quantity, owner) 
 
### FixedPriceSaleClosed(`u32`, `u128`)
- **interface**: `api.events.nft.FixedPriceSaleClosed`
- **summary**:   A fixed price sale has closed without selling (collection, listing) 
 
### FixedPriceSaleComplete(`u32`, `u128`, `AccountId32`)
- **interface**: `api.events.nft.FixedPriceSaleComplete`
- **summary**:   A fixed price sale has completed (collection, listing, buyer)) 
 
### FixedPriceSaleListed(`u32`, `u128`, `Option<u32>`)
- **interface**: `api.events.nft.FixedPriceSaleListed`
- **summary**:   A fixed price sale has been listed (collection, listing, marketplace_id) 
 
### FixedPriceSalePriceUpdated(`u32`, `u128`)
- **interface**: `api.events.nft.FixedPriceSalePriceUpdated`
- **summary**:   A fixed price sale has had its price updated (collection, listing) 
 
### RegisteredMarketplace(`AccountId32`, `Permill`, `u32`)
- **interface**: `api.events.nft.RegisteredMarketplace`
- **summary**:   An account has been registered as a marketplace (account, entitlement, marketplace_id) 
 
### Transfer(`AccountId32`, `u32`, `u32`, `Vec<u32>`, `AccountId32`)
- **interface**: `api.events.nft.Transfer`
- **summary**:   Token(s) were transferred (previous owner, token Ids, new owner) 

___


## offences
 
### Offence(`[u8;16]`, `Bytes`)
- **interface**: `api.events.offences.Offence`
- **summary**:   There is an offence reported of the given `kind` happened at the `session_index` and (kind-specific) time slot. This event is not deposited for duplicate slashes. \[kind, timeslot\]. 

___


## rewards
 
### EraPayout(`u128`, `u128`)
- **interface**: `api.events.rewards.EraPayout`
- **summary**:   Era reward payout the total (amount to treasury, amount to stakers) 
 
### EraPayoutDeferred(`u128`)
- **interface**: `api.events.rewards.EraPayoutDeferred`
- **summary**:   Era ended abruptly e.g. due to early re-election, this amount will be deferred to the next full era 
 
### EraStakerPayout(`AccountId32`, `u128`)
- **interface**: `api.events.rewards.EraStakerPayout`
- **summary**:   Staker payout (nominator/validator account, amount) 
 
### NewFiscalEra(`u128`)
- **interface**: `api.events.rewards.NewFiscalEra`
- **summary**:   A fiscal era has begun with the parameter (target_inflation_per_staking_era) 

___


## scheduler
 
### Canceled(`u32`, `u32`)
- **interface**: `api.events.scheduler.Canceled`
- **summary**:   Canceled some task. 
 
### Dispatched(`(u32,u32)`, `Option<Bytes>`, `Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.scheduler.Dispatched`
- **summary**:   Dispatched some task. 
 
### Scheduled(`u32`, `u32`)
- **interface**: `api.events.scheduler.Scheduled`
- **summary**:   Scheduled some task. 

___


## session
 
### NewSession(`u32`)
- **interface**: `api.events.session.NewSession`
- **summary**:   New session has happened. Note that the argument is the session index, not the block number as the type might suggest. 

___


## staking
 
### Bonded(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Bonded`
- **summary**:   An account has bonded this amount. \[stash, amount\] 

  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably, it will not be emitted for staking rewards when they are added to stake. 
 
### InvulnerableNotSlashed(`AccountId32`, `Perbill`)
- **interface**: `api.events.staking.InvulnerableNotSlashed`
- **summary**:   The validator is invulnerable, so it has NOT been slashed. 
 
### OldSlashingReportDiscarded(`u32`)
- **interface**: `api.events.staking.OldSlashingReportDiscarded`
- **summary**:   An old slashing report from a prior era was discarded because it could not be processed. 
 
### SetInvulnerables(`Vec<AccountId32>`)
- **interface**: `api.events.staking.SetInvulnerables`
- **summary**:   A new set of validators are marked to be invulnerable 
 
### SetMinimumBond(`u128`)
- **interface**: `api.events.staking.SetMinimumBond`
- **summary**:   Minimum bond amount is changed. 
 
### Slash(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Slash`
- **summary**:   One validator (and its nominators) has been slashed by the given amount. 
 
### Slashed(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Slashed`
- **summary**:   One validator (and its nominators) has been slashed by the given amount. \[validator, amount\] 
 
### SolutionStored(`CrmlStakingElectionCompute`)
- **interface**: `api.events.staking.SolutionStored`
- **summary**:   A new solution for the upcoming election has been stored. \[compute\] 
 
### StakingElection(`CrmlStakingElectionCompute`)
- **interface**: `api.events.staking.StakingElection`
- **summary**:   A new set of stakers was elected with the given \[compute\]. 
 
### Unbonded(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Unbonded`
- **summary**:   An account has unbonded this amount. \[stash, amount\] 
 
### Withdrawn(`AccountId32`, `u128`)
- **interface**: `api.events.staking.Withdrawn`
- **summary**:   An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance` from the unlocking queue. \[stash, amount\] 

___


## sudo
 
### KeyChanged(`AccountId32`)
- **interface**: `api.events.sudo.KeyChanged`
- **summary**:   The \[sudoer\] just switched identity; the old key is supplied. 
 
### Sudid(`Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.sudo.Sudid`
- **summary**:   A sudo just took place. \[result\] 
 
### SudoAsDone(`Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.sudo.SudoAsDone`
- **summary**:   A sudo just took place. \[result\] 

___


## system
 
### CodeUpdated()
- **interface**: `api.events.system.CodeUpdated`
- **summary**:   `:code` was updated. 
 
### ExtrinsicFailed(`SpRuntimeDispatchError`, `FrameSupportWeightsDispatchInfo`)
- **interface**: `api.events.system.ExtrinsicFailed`
- **summary**:   An extrinsic failed. 
 
### ExtrinsicSuccess(`FrameSupportWeightsDispatchInfo`)
- **interface**: `api.events.system.ExtrinsicSuccess`
- **summary**:   An extrinsic completed successfully. 
 
### KilledAccount(`AccountId32`)
- **interface**: `api.events.system.KilledAccount`
- **summary**:   An account was reaped. 
 
### NewAccount(`AccountId32`)
- **interface**: `api.events.system.NewAccount`
- **summary**:   A new account was created. 
 
### Remarked(`AccountId32`, `H256`)
- **interface**: `api.events.system.Remarked`
- **summary**:   On on-chain remark happened. 

___


## treasury
 
### Awarded(`u32`, `u128`, `AccountId32`)
- **interface**: `api.events.treasury.Awarded`
- **summary**:   Some funds have been allocated. 
 
### Burnt(`u128`)
- **interface**: `api.events.treasury.Burnt`
- **summary**:   Some of our funds have been burnt. 
 
### Deposit(`u128`)
- **interface**: `api.events.treasury.Deposit`
- **summary**:   Some funds have been deposited. 
 
### Proposed(`u32`)
- **interface**: `api.events.treasury.Proposed`
- **summary**:   New proposal. 
 
### Rejected(`u32`, `u128`)
- **interface**: `api.events.treasury.Rejected`
- **summary**:   A proposal was rejected; funds were slashed. 
 
### Rollover(`u128`)
- **interface**: `api.events.treasury.Rollover`
- **summary**:   Spending has finished; this is the amount that rolls over until next spend. 
 
### Spending(`u128`)
- **interface**: `api.events.treasury.Spending`
- **summary**:   We have ended a spend period and will now allocate funds. 

___


## utility
 
### BatchCompleted()
- **interface**: `api.events.utility.BatchCompleted`
- **summary**:   Batch of dispatches completed fully with no error. 
 
### BatchInterrupted(`u32`, `SpRuntimeDispatchError`)
- **interface**: `api.events.utility.BatchInterrupted`
- **summary**:   Batch of dispatches did not complete fully. Index of first failing dispatch given, as well as the error. 
 
### DispatchedAs(`Result<Null, SpRuntimeDispatchError>`)
- **interface**: `api.events.utility.DispatchedAs`
- **summary**:   A call was dispatched. 
 
### ItemCompleted()
- **interface**: `api.events.utility.ItemCompleted`
- **summary**:   A single item within a Batch of dispatches has completed with no error. 
