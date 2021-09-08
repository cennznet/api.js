// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Option, Vec, bool, u32, u64 } from '@polkadot/types';
import type { AttestationTopic, AttestationValue } from '@cennznet/types/interfaces/attestation';
import type { EthAddress, EventClaimId, EventProofId } from '@cennznet/types/interfaces/ethBridge';
import type { AssetInfoV41 as AssetInfo } from '@cennznet/types/interfaces/genericAsset';
import type { ProposalId } from '@cennznet/types/interfaces/governance';
import type { CollectionId, CollectionNameType, ListingId, Reason, SerialNumber, SeriesId, TokenCount, TokenId } from '@cennznet/types/interfaces/nft';
import type { ProposalIndex } from '@polkadot/types/interfaces/collective';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { AssetOptions, PermissionLatest } from '@polkadot/types/interfaces/genericAsset';
import type { AuthorityList } from '@polkadot/types/interfaces/grandpa';
import type { RegistrarIndex } from '@polkadot/types/interfaces/identity';
import type { Kind, OpaqueTimeSlot } from '@polkadot/types/interfaces/offences';
import type { AccountId, AssetId, Balance, BlockNumber, CallHash, Hash, Perbill } from '@polkadot/types/interfaces/runtime';
import type { TaskAddress } from '@polkadot/types/interfaces/scheduler';
import type { IdentificationTuple, SessionIndex } from '@polkadot/types/interfaces/session';
import type { ElectionCompute } from '@polkadot/types/interfaces/staking';
import type { DispatchError, DispatchInfo, DispatchResult } from '@polkadot/types/interfaces/system';
import type { Timepoint } from '@polkadot/types/interfaces/utility';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/events' {
  export interface AugmentedEvents<ApiType> {
    attestation: {
      [key: string]: AugmentedEvent<ApiType>;
      ClaimCreated: AugmentedEvent<ApiType, [AccountId, AccountId, AttestationTopic, AttestationValue]>;
      ClaimRemoved: AugmentedEvent<ApiType, [AccountId, AccountId, AttestationTopic]>;
      ClaimUpdated: AugmentedEvent<ApiType, [AccountId, AccountId, AttestationTopic, AttestationValue]>;
    };
    cennzx: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Provider, core asset amount, trade asset id, trade asset amount
       **/
      AddLiquidity: AugmentedEvent<ApiType, [AccountId, Balance, AssetId, Balance]>;
      /**
       * AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount
       **/
      AssetBought: AugmentedEvent<ApiType, [AssetId, AssetId, AccountId, Balance, Balance]>;
      /**
       * AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount
       **/
      AssetSold: AugmentedEvent<ApiType, [AssetId, AssetId, AccountId, Balance, Balance]>;
      /**
       * Provider, core asset amount, trade asset id, trade asset amount
       **/
      RemoveLiquidity: AugmentedEvent<ApiType, [AccountId, Balance, AssetId, Balance]>;
    };
    erc20Peg: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * ERC20 CENNZ deposits activated
       **/
      CENNZDepositsActive: AugmentedEvent<ApiType, []>;
      /**
       * An erc20 deposit claim has started. (deposit Id, sender)
       **/
      Erc20Claim: AugmentedEvent<ApiType, [u64, AccountId]>;
      /**
       * A bridged erc20 deposit succeeded.(deposit Id, asset, amount, beneficiary)
       **/
      Erc20Deposit: AugmentedEvent<ApiType, [u64, AssetId, Balance, AccountId]>;
      /**
       * A bridged erc20 deposit failed.(deposit Id)
       **/
      Erc20DepositFail: AugmentedEvent<ApiType, [u64]>;
      /**
       * Mock withdraw
       **/
      Erc20MockWithdraw: AugmentedEvent<ApiType, [u64]>;
      /**
       * Tokens were burnt for withdrawal on Ethereum as ERC20s (withdrawal Id, asset, amount, beneficiary)
       **/
      Erc20Withdraw: AugmentedEvent<ApiType, [u64, AssetId, Balance, EthAddress]>;
      /**
       * The peg contract address has been set
       **/
      SetContractAddress: AugmentedEvent<ApiType, [EthAddress]>;
    };
    ethBridge: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * A notary (validator) set change is in motion
       * A proof for the change will be generated with the given `event_id`
       **/
      AuthoritySetChange: AugmentedEvent<ApiType, [EventProofId]>;
      /**
       * Verifying an event failed
       **/
      Invalid: AugmentedEvent<ApiType, [EventClaimId]>;
      /**
       * Verifying an event succeeded
       **/
      Verified: AugmentedEvent<ApiType, [EventClaimId]>;
    };
    genericAsset: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Asset info updated (asset_id, asset_info).
       **/
      AssetInfoUpdated: AugmentedEvent<ApiType, [AssetId, AssetInfo]>;
      /**
       * Asset burned (asset_id, account, amount).
       **/
      Burned: AugmentedEvent<ApiType, [AssetId, AccountId, Balance]>;
      /**
       * Asset created (asset_id, creator, asset_options).
       **/
      Created: AugmentedEvent<ApiType, [AssetId, AccountId, AssetOptions]>;
      /**
       * Asset balance storage has been reclaimed due to falling below the existential deposit
       **/
      DustReclaimed: AugmentedEvent<ApiType, [AssetId, AccountId, Balance]>;
      /**
       * New asset minted (asset_id, account, amount).
       **/
      Minted: AugmentedEvent<ApiType, [AssetId, AccountId, Balance]>;
      /**
       * Asset permission updated (asset_id, new_permissions).
       **/
      PermissionUpdated: AugmentedEvent<ApiType, [AssetId, PermissionLatest]>;
      /**
       * Asset transfer succeeded (asset_id, from, to, amount).
       **/
      Transferred: AugmentedEvent<ApiType, [AssetId, AccountId, AccountId, Balance]>;
    };
    governance: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * A proposal was enacted, success
       **/
      EnactProposal: AugmentedEvent<ApiType, [ProposalId, bool]>;
      /**
       * A proposal was vetoed by the council
       **/
      ProposalVeto: AugmentedEvent<ApiType, [ProposalId]>;
      /**
       * A proposal was submitted
       **/
      SubmitProposal: AugmentedEvent<ApiType, [ProposalId]>;
    };
    grandpa: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * New authority set has been applied. \[authority_set\]
       **/
      NewAuthorities: AugmentedEvent<ApiType, [AuthorityList]>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
    };
    identity: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * A name was cleared, and the given balance returned. \[who, deposit\]
       **/
      IdentityCleared: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * A name was removed and the given balance slashed. \[who, deposit\]
       **/
      IdentityKilled: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * A name was set or reset (which will remove all judgements). \[who\]
       **/
      IdentitySet: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * A judgement was given by a registrar. \[target, registrar_index\]
       **/
      JudgementGiven: AugmentedEvent<ApiType, [AccountId, RegistrarIndex]>;
      /**
       * A judgement was asked from a registrar. \[who, registrar_index\]
       **/
      JudgementRequested: AugmentedEvent<ApiType, [AccountId, RegistrarIndex]>;
      /**
       * A judgement request was retracted. \[who, registrar_index\]
       **/
      JudgementUnrequested: AugmentedEvent<ApiType, [AccountId, RegistrarIndex]>;
      /**
       * A registrar was added. \[registrar_index\]
       **/
      RegistrarAdded: AugmentedEvent<ApiType, [RegistrarIndex]>;
      /**
       * A sub-identity was added to an identity and the deposit paid. \[sub, main, deposit\]
       **/
      SubIdentityAdded: AugmentedEvent<ApiType, [AccountId, AccountId, Balance]>;
      /**
       * A sub-identity was removed from an identity and the deposit freed.
       * \[sub, main, deposit\]
       **/
      SubIdentityRemoved: AugmentedEvent<ApiType, [AccountId, AccountId, Balance]>;
      /**
       * A sub-identity was cleared, and the given deposit repatriated from the
       * main identity account to the sub-identity account. \[sub, main, deposit\]
       **/
      SubIdentityRevoked: AugmentedEvent<ApiType, [AccountId, AccountId, Balance]>;
    };
    imOnline: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * At the end of the session, no offence was committed.
       **/
      AllGood: AugmentedEvent<ApiType, []>;
      /**
       * A new heartbeat was received from `AuthorityId` \[authority_id\]
       **/
      HeartbeatReceived: AugmentedEvent<ApiType, [AuthorityId]>;
      /**
       * At the end of the session, at least one validator was found to be \[offline\].
       **/
      SomeOffline: AugmentedEvent<ApiType, [Vec<IdentificationTuple>]>;
    };
    multisig: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * A multisig operation has been approved by someone.
       * \[approving, timepoint, multisig, call_hash\]
       **/
      MultisigApproval: AugmentedEvent<ApiType, [AccountId, Timepoint, AccountId, CallHash]>;
      /**
       * A multisig operation has been cancelled. \[cancelling, timepoint, multisig, call_hash\]
       **/
      MultisigCancelled: AugmentedEvent<ApiType, [AccountId, Timepoint, AccountId, CallHash]>;
      /**
       * A multisig operation has been executed. \[approving, timepoint, multisig, call_hash\]
       **/
      MultisigExecuted: AugmentedEvent<ApiType, [AccountId, Timepoint, AccountId, CallHash, DispatchResult]>;
      /**
       * A new multisig operation has begun. \[approving, multisig, call_hash\]
       **/
      NewMultisig: AugmentedEvent<ApiType, [AccountId, AccountId, CallHash]>;
    };
    nft: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * An auction has closed without selling (collection, listing, reason)
       **/
      AuctionClosed: AugmentedEvent<ApiType, [CollectionId, ListingId, Reason]>;
      /**
       * An auction has opened (collection, listing)
       **/
      AuctionOpen: AugmentedEvent<ApiType, [CollectionId, ListingId]>;
      /**
       * An auction has sold (collection, listing, payment asset, bid, new owner)
       **/
      AuctionSold: AugmentedEvent<ApiType, [CollectionId, ListingId, AssetId, Balance, AccountId]>;
      /**
       * A new highest bid was placed (collection, listing, amount)
       **/
      Bid: AugmentedEvent<ApiType, [CollectionId, ListingId, Balance]>;
      /**
       * Tokens were burned (collection, series id, serial numbers)
       **/
      Burn: AugmentedEvent<ApiType, [CollectionId, SeriesId, Vec<SerialNumber>]>;
      /**
       * Additional tokens were added to a series (collection, series id, quantity, owner)
       **/
      CreateAdditional: AugmentedEvent<ApiType, [CollectionId, SeriesId, TokenCount, AccountId]>;
      /**
       * A new token collection was created (collection, name, owner)
       **/
      CreateCollection: AugmentedEvent<ApiType, [CollectionId, CollectionNameType, AccountId]>;
      /**
       * A new series of tokens was created (collection, series id, quantity, owner)
       **/
      CreateSeries: AugmentedEvent<ApiType, [CollectionId, SeriesId, TokenCount, AccountId]>;
      /**
       * A unique token was created (collection, series id, serial number, owner)
       **/
      CreateToken: AugmentedEvent<ApiType, [CollectionId, TokenId, AccountId]>;
      /**
       * A fixed price sale has closed without selling (collection, listing)
       **/
      FixedPriceSaleClosed: AugmentedEvent<ApiType, [CollectionId, ListingId]>;
      /**
       * A fixed price sale has completed (collection, listing, buyer))
       **/
      FixedPriceSaleComplete: AugmentedEvent<ApiType, [CollectionId, ListingId, AccountId]>;
      /**
       * A fixed price sale has been listed (collection, listing)
       **/
      FixedPriceSaleListed: AugmentedEvent<ApiType, [CollectionId, ListingId]>;
      /**
       * Token(s) were transferred (previous owner, token Ids, new owner)
       **/
      Transfer: AugmentedEvent<ApiType, [AccountId, Vec<TokenId>, AccountId]>;
    };
    offences: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * There is an offence reported of the given `kind` happened at the `session_index` and
       * (kind-specific) time slot. This event is not deposited for duplicate slashes. last
       * element indicates of the offence was applied (true) or queued (false)
       * \[kind, timeslot, applied\].
       **/
      Offence: AugmentedEvent<ApiType, [Kind, OpaqueTimeSlot, bool]>;
    };
    rewards: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Era reward payout the total (amount to treasury, amount to stakers)
       **/
      EraPayout: AugmentedEvent<ApiType, [Balance, Balance]>;
      /**
       * Era ended abruptly e.g. due to early re-election, this amount will be deferred to the next full era
       **/
      EraPayoutDeferred: AugmentedEvent<ApiType, [Balance]>;
      /**
       * Staker payout (nominator/validator account, amount)
       **/
      EraStakerPayout: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * A fiscal era has begun with the parameter (target_inflation_per_staking_era)
       **/
      NewFiscalEra: AugmentedEvent<ApiType, [Balance]>;
    };
    scheduler: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Canceled some task. \[when, index\]
       **/
      Canceled: AugmentedEvent<ApiType, [BlockNumber, u32]>;
      /**
       * Dispatched some task. \[task, id, result\]
       **/
      Dispatched: AugmentedEvent<ApiType, [TaskAddress, Option<Bytes>, DispatchResult]>;
      /**
       * Scheduled some task. \[when, index\]
       **/
      Scheduled: AugmentedEvent<ApiType, [BlockNumber, u32]>;
    };
    session: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * New session has happened. Note that the argument is the \[session_index\], not the block
       * number as the type might suggest.
       **/
      NewSession: AugmentedEvent<ApiType, [SessionIndex]>;
    };
    staking: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * An account has bonded this amount. \[stash, amount\]
       *
       * NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
       * it will not be emitted for staking rewards when they are added to stake.
       **/
      Bonded: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * The validator is invulnerable, so it has NOT been slashed.
       **/
      InvulnerableNotSlashed: AugmentedEvent<ApiType, [AccountId, Perbill]>;
      /**
       * An old slashing report from a prior era was discarded because it could
       * not be processed.
       **/
      OldSlashingReportDiscarded: AugmentedEvent<ApiType, [SessionIndex]>;
      /**
       * A new set of validators are marked to be invulnerable
       **/
      SetInvulnerables: AugmentedEvent<ApiType, [Vec<AccountId>]>;
      /**
       * Minimum bond amount is changed.
       **/
      SetMinimumBond: AugmentedEvent<ApiType, [Balance]>;
      /**
       * One validator (and its nominators) has been slashed by the given amount.
       **/
      Slash: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * A new solution for the upcoming election has been stored. \[compute\]
       **/
      SolutionStored: AugmentedEvent<ApiType, [ElectionCompute]>;
      /**
       * A new set of stakers was elected with the given \[compute\].
       **/
      StakingElection: AugmentedEvent<ApiType, [ElectionCompute]>;
      /**
       * An account has unbonded this amount. \[stash, amount\]
       **/
      Unbonded: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
       * from the unlocking queue. \[stash, amount\]
       **/
      Withdrawn: AugmentedEvent<ApiType, [AccountId, Balance]>;
    };
    sudo: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * The \[sudoer\] just switched identity; the old key is supplied.
       **/
      KeyChanged: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [DispatchResult]>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [DispatchResult]>;
    };
    system: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed. \[error, info\]
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [DispatchError, DispatchInfo]>;
      /**
       * An extrinsic completed successfully. \[info\]
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [DispatchInfo]>;
      /**
       * An \[account\] was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * A new \[account\] was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * On on-chain remark happened. \[origin, remark_hash\]
       **/
      Remarked: AugmentedEvent<ApiType, [AccountId, Hash]>;
    };
    treasury: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Some funds have been allocated. \[proposal_index, award, beneficiary\]
       **/
      Awarded: AugmentedEvent<ApiType, [ProposalIndex, Balance, AccountId]>;
      /**
       * Some of our funds have been burnt. \[burn\]
       **/
      Burnt: AugmentedEvent<ApiType, [Balance]>;
      /**
       * Some funds have been deposited. \[deposit\]
       **/
      Deposit: AugmentedEvent<ApiType, [Balance]>;
      /**
       * New proposal. \[proposal_index\]
       **/
      Proposed: AugmentedEvent<ApiType, [ProposalIndex]>;
      /**
       * A proposal was rejected; funds were slashed. \[proposal_index, slashed\]
       **/
      Rejected: AugmentedEvent<ApiType, [ProposalIndex, Balance]>;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       * \[budget_remaining\]
       **/
      Rollover: AugmentedEvent<ApiType, [Balance]>;
      /**
       * We have ended a spend period and will now allocate funds. \[budget_remaining\]
       **/
      Spending: AugmentedEvent<ApiType, [Balance]>;
    };
    utility: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error. \[index, error\]
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [u32, DispatchError]>;
    };
  }

  export interface DecoratedEvents<ApiType extends ApiTypes> extends AugmentedEvents<ApiType> {
    [key: string]: ModuleEvents<ApiType>;
  }
}
