## Constants

The following sections contain the module constants, also known as parameter types. These can only be changed as part of a runtime upgrade. On the api, these are exposed via `api.consts.<module>.<method>`. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[babe](#babe)**

- **[finalityTracker](#finalitytracker)**

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
- **summary**:   The number of **slots** that an epoch takes. We couple sessions to epochs, i.e. we start a new session once the new epoch begins. 
 
### expectedBlockTime: `Moment`
- **interface**: `api.consts.babe.expectedBlockTime`
- **summary**:   The expected average block time at which BABE should be creating blocks. Since BABE is probabilistic it is not trivial to figure out what the expected average block time should be based on the slot duration and the security parameter `c` (where `1 - c` represents the probability of a slot being empty). 

___


## finalityTracker
 
### reportLatency: `BlockNumber`
- **interface**: `api.consts.finalityTracker.reportLatency`
- **summary**:   The delay after which point things become suspicious. Default is 1000. 
 
### windowSize: `BlockNumber`
- **interface**: `api.consts.finalityTracker.windowSize`
- **summary**:   The number of recent samples to keep from this chain. Default is 101. 

___


## identity
 
### basicDeposit: `BalanceOf`
- **interface**: `api.consts.identity.basicDeposit`
- **summary**:   The amount held on deposit for a registered identity. 
 
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
 
### depositFactor: `BalanceOf`
- **interface**: `api.consts.multisig.depositFactor`
- **summary**:   The amount of currency needed per unit threshold when creating a multisig execution. 
 
### maxSignatories: `u16`
- **interface**: `api.consts.multisig.maxSignatories`
- **summary**:   The maximum amount of signatories allowed for a given multisig. 

___


## staking
 
### bondingDuration: `EraIndex`
- **interface**: `api.consts.staking.bondingDuration`
- **summary**:   Number of eras that staked funds must remain bonded for. 
 
### sessionsPerEra: `SessionIndex`
- **interface**: `api.consts.staking.sessionsPerEra`
- **summary**:   Number of sessions per era. 

___


## system
 
### blockExecutionWeight: `Weight`
- **interface**: `api.consts.system.blockExecutionWeight`
- **summary**:   The base weight of executing a block, independent of the transactions in the block. 
 
### blockHashCount: `BlockNumber`
- **interface**: `api.consts.system.blockHashCount`
- **summary**:   The maximum number of blocks to allow in mortal eras. 
 
### dbWeight: `RuntimeDbWeight`
- **interface**: `api.consts.system.dbWeight`
- **summary**:   The weight of runtime database operations the runtime can invoke. 
 
### extrinsicBaseWeight: `Weight`
- **interface**: `api.consts.system.extrinsicBaseWeight`
- **summary**:   The base weight of an Extrinsic in the block, independent of the of extrinsic being executed. 
 
### maximumBlockLength: `u32`
- **interface**: `api.consts.system.maximumBlockLength`
- **summary**:   The maximum length of a block (in bytes). 
 
### maximumBlockWeight: `Weight`
- **interface**: `api.consts.system.maximumBlockWeight`
- **summary**:   The maximum weight of a block. 

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
 
### bountyCuratorDeposit: `Permill`
- **interface**: `api.consts.treasury.bountyCuratorDeposit`
- **summary**:   Percentage of the curator fee that will be reserved upfront as deposit for bounty curator. 
 
### bountyDepositBase: `BalanceOf`
- **interface**: `api.consts.treasury.bountyDepositBase`
- **summary**:   The amount held on deposit for placing a bounty proposal. 
 
### bountyDepositPayoutDelay: `BlockNumber`
- **interface**: `api.consts.treasury.bountyDepositPayoutDelay`
- **summary**:   The delay period for which a bounty beneficiary need to wait before claim the payout. 
 
### bountyValueMinimum: `BalanceOf`
- **interface**: `api.consts.treasury.bountyValueMinimum`
 
### burn: `Permill`
- **interface**: `api.consts.treasury.burn`
- **summary**:   Percentage of spare funds (if any) that are burnt per spend period. 
 
### dataDepositPerByte: `BalanceOf`
- **interface**: `api.consts.treasury.dataDepositPerByte`
- **summary**:   The amount held on deposit per byte within the tip report reason or bounty description. 
 
### maximumReasonLength: `u32`
- **interface**: `api.consts.treasury.maximumReasonLength`
- **summary**:   Maximum acceptable reason length. 
 
### moduleId: `ModuleId`
- **interface**: `api.consts.treasury.moduleId`
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
 
### tipCountdown: `BlockNumber`
- **interface**: `api.consts.treasury.tipCountdown`
- **summary**:   The period for which a tip remains open after is has achieved threshold tippers. 
 
### tipFindersFee: `Percent`
- **interface**: `api.consts.treasury.tipFindersFee`
- **summary**:   The amount of the final tip which goes to the original reporter of the tip. 
 
### tipReportDepositBase: `BalanceOf`
- **interface**: `api.consts.treasury.tipReportDepositBase`
- **summary**:   The amount held on deposit for placing a tip report. 
