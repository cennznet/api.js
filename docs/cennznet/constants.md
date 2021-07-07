---
title: Constants
---

The following sections contain the module constants, also known as parameter types. These can only be changed as part of a runtime upgrade. On the api, these are exposed via `api.consts.<module>.<method>`. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[babe](#babe)**

- **[electionProviderMultiPhase](#electionprovidermultiphase)**

- **[identity](#identity)**

- **[multisig](#multisig)**

- **[staking](#staking)**

- **[system](#system)**

- **[timestamp](#timestamp)**

- **[transactionPayment](#transactionpayment)**

- **[treasury](#treasury)**


___


## babe
 
### epochDuration: `u64`
- **interface**: `api.consts.babe.epochDuration`
- **summary**:   The amount of time, in slots, that each epoch should last. NOTE: Currently it is not possible to change the epoch duration after the chain has started. Attempting to do so will brick block production. 
 
### expectedBlockTime: `Moment`
- **interface**: `api.consts.babe.expectedBlockTime`
- **summary**:   The expected average block time at which BABE should be creating blocks. Since BABE is probabilistic it is not trivial to figure out what the expected average block time should be based on the slot duration and the security parameter `c` (where `1 - c` represents the probability of a slot being empty). 

___


## electionProviderMultiPhase
 
### offchainRepeat: `BlockNumber`
- **interface**: `api.consts.electionProviderMultiPhase.offchainRepeat`
- **summary**:   The repeat threshold of the offchain worker. 

  For example, if it is 5, that means that at least 5 blocks will elapse between attempts to submit the worker's solution. 
 
### signedDepositBase: `BalanceOf`
- **interface**: `api.consts.electionProviderMultiPhase.signedDepositBase`
- **summary**:   Base deposit for a signed solution. 
 
### signedDepositByte: `BalanceOf`
- **interface**: `api.consts.electionProviderMultiPhase.signedDepositByte`
- **summary**:   Per-byte deposit for a signed solution. 
 
### signedDepositWeight: `BalanceOf`
- **interface**: `api.consts.electionProviderMultiPhase.signedDepositWeight`
- **summary**:   Per-weight deposit for a signed solution. 
 
### signedMaxSubmissions: `u32`
- **interface**: `api.consts.electionProviderMultiPhase.signedMaxSubmissions`
- **summary**:   Maximum number of signed submissions that can be queued. 

  It is best to avoid adjusting this during an election, as it impacts downstream data structures. In particular, `SignedSubmissionIndices<T>` is bounded on this value. If you update this value during an election, you _must_ ensure that `SignedSubmissionIndices.len()` is less than or equal to the new value. Otherwise, attempts to submit new solutions may cause a runtime panic. 
 
### signedMaxWeight: `Weight`
- **interface**: `api.consts.electionProviderMultiPhase.signedMaxWeight`
- **summary**:   Maximum weight of a signed solution. 

  This should probably be similar to [`Config::MinerMaxWeight`]. 
 
### signedPhase: `BlockNumber`
- **interface**: `api.consts.electionProviderMultiPhase.signedPhase`
- **summary**:   Duration of the signed phase. 
 
### signedRewardBase: `BalanceOf`
- **interface**: `api.consts.electionProviderMultiPhase.signedRewardBase`
- **summary**:   Base reward for a signed solution 
 
### solutionImprovementThreshold: `Perbill`
- **interface**: `api.consts.electionProviderMultiPhase.solutionImprovementThreshold`
- **summary**:   The minimum amount of improvement to the solution score that defines a solution as "better" (in any phase). 
 
### unsignedPhase: `BlockNumber`
- **interface**: `api.consts.electionProviderMultiPhase.unsignedPhase`
- **summary**:   Duration of the unsigned phase. 

___


## identity
 
### basicDeposit: `BalanceOf`
- **interface**: `api.consts.identity.basicDeposit`
- **summary**:   The amount held on deposit for a registered identity 
 
### fieldDeposit: `BalanceOf`
- **interface**: `api.consts.identity.fieldDeposit`
- **summary**:   The amount held on deposit per additional field for a registered identity. 
 
### maxAdditionalFields: `u32`
- **interface**: `api.consts.identity.maxAdditionalFields`
- **summary**:   Maximum number of additional fields that may be stored in an ID. Needed to bound the I/O required to access an identity, but can be pretty high. 
 
### maxRegistrars: `u32`
- **interface**: `api.consts.identity.maxRegistrars`
- **summary**:   Maxmimum number of registrars allowed in the system. Needed to bound the complexity of, e.g., updating judgements. 
 
### maxSubAccounts: `u32`
- **interface**: `api.consts.identity.maxSubAccounts`
- **summary**:   The maximum number of sub-accounts allowed per identified account. 
 
### subAccountDeposit: `BalanceOf`
- **interface**: `api.consts.identity.subAccountDeposit`
- **summary**:   The amount held on deposit for a registered subaccount. This should account for the fact that one storage item's value will increase by the size of an account ID, and there will be another trie item whose value is the size of an account ID plus 32 bytes. 

___


## multisig
 
### depositBase: `BalanceOf`
- **interface**: `api.consts.multisig.depositBase`
- **summary**:   The base amount of currency needed to reserve for creating a multisig execution or to store a dispatch call for later. 

  This is held for an additional storage item whose value size is `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is `32 + sizeof(AccountId)` bytes. 
 
### depositFactor: `BalanceOf`
- **interface**: `api.consts.multisig.depositFactor`
- **summary**:   The amount of currency needed per unit threshold when creating a multisig execution. 

  This is held for adding 32 bytes more into a pre-existing storage value. 
 
### maxSignatories: `u16`
- **interface**: `api.consts.multisig.maxSignatories`
- **summary**:   The maximum amount of signatories allowed in the multisig. 

___


## staking
 
### bondingDuration: `EraIndex`
- **interface**: `api.consts.staking.bondingDuration`
- **summary**:   Number of eras that staked funds must remain bonded for. 
 
### maxNominatorRewardedPerValidator: `u32`
- **interface**: `api.consts.staking.maxNominatorRewardedPerValidator`
- **summary**:   The maximum number of nominators rewarded for each validator. 

  For each validator only the `$MaxNominatorRewardedPerValidator` biggest stakers can claim their reward. This used to limit the i/o cost for the nominator payout. 
 
### sessionsPerEra: `SessionIndex`
- **interface**: `api.consts.staking.sessionsPerEra`
- **summary**:   Number of sessions per era. 
 
### slashDeferDuration: `EraIndex`
- **interface**: `api.consts.staking.slashDeferDuration`
- **summary**:   Number of eras that slashes are deferred by, after computation. 

  This should be less than the bonding duration. Set to 0 if slashes should be applied immediately, without opportunity for intervention. 

___


## system
 
### blockHashCount: `BlockNumber`
- **interface**: `api.consts.system.blockHashCount`
- **summary**:   Maximum number of block number to block hash mappings to keep (oldest pruned first). 
 
### blockLength: `BlockLength`
- **interface**: `api.consts.system.blockLength`
- **summary**:   The maximum length of a block (in bytes). 
 
### blockWeights: `BlockWeights`
- **interface**: `api.consts.system.blockWeights`
- **summary**:   Block & extrinsics weights: base values and limits. 
 
### dbWeight: `RuntimeDbWeight`
- **interface**: `api.consts.system.dbWeight`
- **summary**:   The weight of runtime database operations the runtime can invoke. 
 
### ss58Prefix: `u16`
- **interface**: `api.consts.system.ss58Prefix`
- **summary**:   The designated SS85 prefix of this chain. 

  This replaces the "ss58Format" property declared in the chain spec. Reason is that the runtime should know about the prefix in order to make use of it as an identifier of the chain. 
 
### version: `RuntimeVersion`
- **interface**: `api.consts.system.version`
- **summary**:   Get the chain's current version. 

___


## timestamp
 
### minimumPeriod: `Moment`
- **interface**: `api.consts.timestamp.minimumPeriod`
- **summary**:   The minimum period between blocks. Beware that this is different to the *expected* period that the block production apparatus provides. Your chosen consensus system will generally work with this to determine a sensible block time. e.g. For Aura, it will be double this period on default settings. 

___


## transactionPayment
 
### transactionByteFee: `BalanceOf`
- **interface**: `api.consts.transactionPayment.transactionByteFee`
- **summary**:   The fee to be paid for making a transaction; the per-byte portion. 
 
### weightToFee: `Vec<WeightToFeeCoefficient>`
- **interface**: `api.consts.transactionPayment.weightToFee`
- **summary**:   The polynomial that is applied in order to derive fee from weight. 

___


## treasury
 
### burn: `Permill`
- **interface**: `api.consts.treasury.burn`
- **summary**:   Percentage of spare funds (if any) that are burnt per spend period. 
 
### palletId: `PalletId`
- **interface**: `api.consts.treasury.palletId`
- **summary**:   The treasury's module id, used for deriving its sovereign account ID. 
 
### proposalBond: `Permill`
- **interface**: `api.consts.treasury.proposalBond`
- **summary**:   Fraction of a proposal's value that should be bonded in order to place the proposal. An accepted proposal gets these back. A rejected proposal does not. 
 
### proposalBondMinimum: `BalanceOf`
- **interface**: `api.consts.treasury.proposalBondMinimum`
- **summary**:   Minimum amount of funds that should be placed in a deposit for making a proposal. 
 
### spendPeriod: `BlockNumber`
- **interface**: `api.consts.treasury.spendPeriod`
- **summary**:   Period between successive spends. 
