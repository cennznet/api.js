// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U256, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H160, H256, Perbill, Permill } from '@polkadot/types/interfaces/runtime';
import type { CrmlGenericAssetAssetInfo, CrmlGenericAssetAssetOptions, CrmlGenericAssetPermissionsV1, CrmlNftAuctionClosureReason, CrmlStakingElectionCompute, CrmlStakingExposure, EthereumLog, EvmCoreErrorExitReason, FrameSupportWeightsDispatchInfo, PalletImOnlineSr25519AppSr25519Public, SpFinalityGrandpaAppPublic, SpRuntimeDispatchError } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/events' {
  export interface AugmentedEvents<ApiType extends ApiTypes> {
    baseFee: {
      BaseFeeOverflow: AugmentedEvent<ApiType, []>;
      IsActive: AugmentedEvent<ApiType, [bool]>;
      NewBaseFeePerGas: AugmentedEvent<ApiType, [U256]>;
      NewElasticity: AugmentedEvent<ApiType, [Permill]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cennzx: {
      /**
       * Provider, core asset amount, trade asset id, trade asset amount
       **/
      AddLiquidity: AugmentedEvent<ApiType, [AccountId32, u128, u32, u128]>;
      /**
       * AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount
       **/
      AssetBought: AugmentedEvent<ApiType, [u32, u32, AccountId32, u128, u128]>;
      /**
       * AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount
       **/
      AssetSold: AugmentedEvent<ApiType, [u32, u32, AccountId32, u128, u128]>;
      /**
       * Provider, core asset amount, trade asset id, trade asset amount
       **/
      RemoveLiquidity: AugmentedEvent<ApiType, [AccountId32, u128, u32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    erc20Peg: {
      /**
       * ERC20 CENNZ deposits activated
       **/
      CENNZDepositsActive: AugmentedEvent<ApiType, []>;
      /**
       * An erc20 deposit claim has started. (deposit Id, sender)
       **/
      Erc20Claim: AugmentedEvent<ApiType, [u64, AccountId32]>;
      /**
       * A bridged erc20 deposit succeeded.(deposit Id, asset, amount, beneficiary)
       **/
      Erc20Deposit: AugmentedEvent<ApiType, [u64, u32, u128, AccountId32]>;
      /**
       * A bridged erc20 deposit failed.(deposit Id)
       **/
      Erc20DepositFail: AugmentedEvent<ApiType, [u64]>;
      /**
       * Tokens were burnt for withdrawal on Ethereum as ERC20s (withdrawal Id, asset, amount, beneficiary)
       **/
      Erc20Withdraw: AugmentedEvent<ApiType, [u64, u32, u128, H160]>;
      /**
       * The peg contract address has been set
       **/
      SetContractAddress: AugmentedEvent<ApiType, [H160]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    ethBridge: {
      /**
       * A notary (validator) set change is in motion (event_id, new_validator_set_id)
       * A proof for the change will be generated with the given `event_id`
       **/
      AuthoritySetChange: AugmentedEvent<ApiType, [u64, u64]>;
      /**
       * Verifying an event failed
       **/
      Invalid: AugmentedEvent<ApiType, [u64]>;
      /**
       * Verifying an event succeeded
       **/
      Verified: AugmentedEvent<ApiType, [u64]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    ethereum: {
      /**
       * An ethereum transaction was successfully executed. [from, to/contract_address, transaction_hash, exit_reason]
       **/
      Executed: AugmentedEvent<ApiType, [H160, H160, H256, EvmCoreErrorExitReason]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    ethWallet: {
      /**
       * A call just executed. (Ethereum Address, CENNZnet Address, Result)
       **/
      Execute: AugmentedEvent<ApiType, [H160, AccountId32, Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evm: {
      /**
       * A deposit has been made at a given address. \[sender, address, value\]
       **/
      BalanceDeposit: AugmentedEvent<ApiType, [AccountId32, H160, U256]>;
      /**
       * A withdrawal has been made from a given address. \[sender, address, value\]
       **/
      BalanceWithdraw: AugmentedEvent<ApiType, [AccountId32, H160, U256]>;
      /**
       * A contract has been created at given \[address\].
       **/
      Created: AugmentedEvent<ApiType, [H160]>;
      /**
       * A \[contract\] was attempted to be created, but the execution failed.
       **/
      CreatedFailed: AugmentedEvent<ApiType, [H160]>;
      /**
       * A \[contract\] has been executed successfully with states applied.
       **/
      Executed: AugmentedEvent<ApiType, [H160]>;
      /**
       * A \[contract\] has been executed with errors. States are reverted with only gas fees applied.
       **/
      ExecutedFailed: AugmentedEvent<ApiType, [H160]>;
      /**
       * Ethereum events from contracts.
       **/
      Log: AugmentedEvent<ApiType, [EthereumLog]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    genericAsset: {
      /**
       * Asset info updated (asset_id, asset_info).
       **/
      AssetInfoUpdated: AugmentedEvent<ApiType, [u32, CrmlGenericAssetAssetInfo]>;
      /**
       * Asset burned (asset_id, account, amount).
       **/
      Burned: AugmentedEvent<ApiType, [u32, AccountId32, u128]>;
      /**
       * Asset created (asset_id, creator, asset_options).
       **/
      Created: AugmentedEvent<ApiType, [u32, AccountId32, CrmlGenericAssetAssetOptions]>;
      /**
       * Asset balance storage has been reclaimed due to falling below the existential deposit
       **/
      DustReclaimed: AugmentedEvent<ApiType, [u32, AccountId32, u128]>;
      /**
       * New asset minted (asset_id, account, amount).
       **/
      Minted: AugmentedEvent<ApiType, [u32, AccountId32, u128]>;
      /**
       * Asset permission updated (asset_id, new_permissions).
       **/
      PermissionUpdated: AugmentedEvent<ApiType, [u32, CrmlGenericAssetPermissionsV1]>;
      /**
       * Asset transfer succeeded (asset_id, from, to, amount).
       **/
      Transferred: AugmentedEvent<ApiType, [u32, AccountId32, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    governance: {
      /**
       * A proposal was enacted, success
       **/
      EnactReferendum: AugmentedEvent<ApiType, [u64, bool]>;
      /**
       * A proposal was vetoed by the council
       **/
      ProposalVeto: AugmentedEvent<ApiType, [u64]>;
      /**
       * A referendum has been approved and is awaiting enactment
       **/
      ReferendumApproved: AugmentedEvent<ApiType, [u64]>;
      /**
       * A proposal was approved by council and a referendum has been created
       **/
      ReferendumCreated: AugmentedEvent<ApiType, [u64]>;
      /**
       * A referendum was vetoed by vote
       **/
      ReferendumVeto: AugmentedEvent<ApiType, [u64]>;
      /**
       * A proposal was submitted
       **/
      SubmitProposal: AugmentedEvent<ApiType, [u64]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<ApiType, [Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>]>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    identity: {
      /**
       * A name was cleared, and the given balance returned.
       **/
      IdentityCleared: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * A name was removed and the given balance slashed.
       **/
      IdentityKilled: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * A name was set or reset (which will remove all judgements).
       **/
      IdentitySet: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * A judgement was given by a registrar.
       **/
      JudgementGiven: AugmentedEvent<ApiType, [AccountId32, u32]>;
      /**
       * A judgement was asked from a registrar.
       **/
      JudgementRequested: AugmentedEvent<ApiType, [AccountId32, u32]>;
      /**
       * A judgement request was retracted.
       **/
      JudgementUnrequested: AugmentedEvent<ApiType, [AccountId32, u32]>;
      /**
       * A registrar was added.
       **/
      RegistrarAdded: AugmentedEvent<ApiType, [u32]>;
      /**
       * A sub-identity was added to an identity and the deposit paid.
       **/
      SubIdentityAdded: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      /**
       * A sub-identity was removed from an identity and the deposit freed.
       **/
      SubIdentityRemoved: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      /**
       * A sub-identity was cleared, and the given deposit repatriated from the
       * main identity account to the sub-identity account.
       **/
      SubIdentityRevoked: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    imOnline: {
      /**
       * At the end of the session, no offence was committed.
       **/
      AllGood: AugmentedEvent<ApiType, []>;
      /**
       * A new heartbeat was received from `AuthorityId`.
       **/
      HeartbeatReceived: AugmentedEvent<ApiType, [PalletImOnlineSr25519AppSr25519Public]>;
      /**
       * At the end of the session, at least one validator was found to be offline.
       **/
      SomeOffline: AugmentedEvent<ApiType, [Vec<ITuple<[AccountId32, CrmlStakingExposure]>>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    nft: {
      /**
       * An auction has closed without selling (collection, listing, reason)
       **/
      AuctionClosed: AugmentedEvent<ApiType, [u32, u128, CrmlNftAuctionClosureReason]>;
      /**
       * An auction has opened (collection, listing, marketplace_id)
       **/
      AuctionOpen: AugmentedEvent<ApiType, [u32, u128, Option<u32>]>;
      /**
       * An auction has sold (collection, listing, payment asset, bid, new owner)
       **/
      AuctionSold: AugmentedEvent<ApiType, [u32, u128, u32, u128, AccountId32]>;
      /**
       * A new highest bid was placed (collection, listing, amount)
       **/
      Bid: AugmentedEvent<ApiType, [u32, u128, u128]>;
      /**
       * Tokens were burned (collection, series id, serial numbers)
       **/
      Burn: AugmentedEvent<ApiType, [u32, u32, Vec<u32>]>;
      /**
       * A new token collection was created (collection, name, owner)
       **/
      CreateCollection: AugmentedEvent<ApiType, [u32, Bytes, AccountId32]>;
      /**
       * A new series of tokens was created (collection, series id, quantity, owner)
       **/
      CreateSeries: AugmentedEvent<ApiType, [u32, u32, u32, AccountId32]>;
      /**
       * Token(s) were created (collection, series id, quantity, owner)
       **/
      CreateTokens: AugmentedEvent<ApiType, [u32, u32, u32, AccountId32]>;
      /**
       * A fixed price sale has closed without selling (collection, listing)
       **/
      FixedPriceSaleClosed: AugmentedEvent<ApiType, [u32, u128]>;
      /**
       * A fixed price sale has completed (collection, listing, buyer))
       **/
      FixedPriceSaleComplete: AugmentedEvent<ApiType, [u32, u128, AccountId32]>;
      /**
       * A fixed price sale has been listed (collection, listing, marketplace_id)
       **/
      FixedPriceSaleListed: AugmentedEvent<ApiType, [u32, u128, Option<u32>]>;
      /**
       * An account has been registered as a marketplace (account, entitlement, marketplace_id)
       **/
      RegisteredMarketplace: AugmentedEvent<ApiType, [AccountId32, Permill, u32]>;
      /**
       * Token(s) were transferred (previous owner, token Ids, new owner)
       **/
      Transfer: AugmentedEvent<ApiType, [AccountId32, u32, u32, Vec<u32>, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    offences: {
      /**
       * There is an offence reported of the given `kind` happened at the `session_index` and
       * (kind-specific) time slot. This event is not deposited for duplicate slashes.
       * \[kind, timeslot\].
       **/
      Offence: AugmentedEvent<ApiType, [U8aFixed, Bytes]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    rewards: {
      /**
       * Era reward payout the total (amount to treasury, amount to stakers)
       **/
      EraPayout: AugmentedEvent<ApiType, [u128, u128]>;
      /**
       * Era ended abruptly e.g. due to early re-election, this amount will be deferred to the next full era
       **/
      EraPayoutDeferred: AugmentedEvent<ApiType, [u128]>;
      /**
       * Staker payout (nominator/validator account, amount)
       **/
      EraStakerPayout: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * A fiscal era has begun with the parameter (target_inflation_per_staking_era)
       **/
      NewFiscalEra: AugmentedEvent<ApiType, [u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [u32, u32]>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [ITuple<[u32, u32]>, Option<Bytes>, Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [u32, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      /**
       * New session has happened. Note that the argument is the session index, not the
       * block number as the type might suggest.
       **/
      NewSession: AugmentedEvent<ApiType, [u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    staking: {
      /**
       * An account has bonded this amount. \[stash, amount\]
       * 
       * NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
       * it will not be emitted for staking rewards when they are added to stake.
       **/
      Bonded: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * The validator is invulnerable, so it has NOT been slashed.
       **/
      InvulnerableNotSlashed: AugmentedEvent<ApiType, [AccountId32, Perbill]>;
      /**
       * An old slashing report from a prior era was discarded because it could
       * not be processed.
       **/
      OldSlashingReportDiscarded: AugmentedEvent<ApiType, [u32]>;
      /**
       * A new set of validators are marked to be invulnerable
       **/
      SetInvulnerables: AugmentedEvent<ApiType, [Vec<AccountId32>]>;
      /**
       * Minimum bond amount is changed.
       **/
      SetMinimumBond: AugmentedEvent<ApiType, [u128]>;
      /**
       * One validator (and its nominators) has been slashed by the given amount.
       **/
      Slash: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * One validator (and its nominators) has been slashed by the given amount.
       * \[validator, amount\]
       **/
      Slashed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * A new solution for the upcoming election has been stored. \[compute\]
       **/
      SolutionStored: AugmentedEvent<ApiType, [CrmlStakingElectionCompute]>;
      /**
       * A new set of stakers was elected with the given \[compute\].
       **/
      StakingElection: AugmentedEvent<ApiType, [CrmlStakingElectionCompute]>;
      /**
       * An account has unbonded this amount. \[stash, amount\]
       **/
      Unbonded: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
       * from the unlocking queue. \[stash, amount\]
       **/
      Withdrawn: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied.
       **/
      KeyChanged: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [SpRuntimeDispatchError, FrameSupportWeightsDispatchInfo]>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [FrameSupportWeightsDispatchInfo]>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [AccountId32, H256]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<ApiType, [u32, u128, AccountId32]>;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [u128]>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [u128]>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<ApiType, [u32]>;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<ApiType, [u32, u128]>;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<ApiType, [u128]>;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<ApiType, [u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [u32, SpRuntimeDispatchError]>;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
