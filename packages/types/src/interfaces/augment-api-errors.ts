// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/errors' {
  export interface AugmentedErrors<ApiType> {
    authorship: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * The uncle is genesis.
       **/
      GenesisUncle: AugmentedError<ApiType>;
      /**
       * The uncle parent not in the chain.
       **/
      InvalidUncleParent: AugmentedError<ApiType>;
      /**
       * The uncle isn't recent enough to be included.
       **/
      OldUncle: AugmentedError<ApiType>;
      /**
       * The uncle is too high in chain.
       **/
      TooHighUncle: AugmentedError<ApiType>;
      /**
       * Too many uncles.
       **/
      TooManyUncles: AugmentedError<ApiType>;
      /**
       * The uncle is already included.
       **/
      UncleAlreadyIncluded: AugmentedError<ApiType>;
      /**
       * Uncles already set in the block.
       **/
      UnclesAlreadySet: AugmentedError<ApiType>;
    };
    cennzx: {
      [key: string]: AugmentedError<ApiType>;
      AssetCannotSwapForItself: AugmentedError<ApiType>;
      CannotAddLiquidityWithZero: AugmentedError<ApiType>;
      CannotTradeZero: AugmentedError<ApiType>;
      DivideByZero: AugmentedError<ApiType>;
      EmptyExchangePool: AugmentedError<ApiType>;
      InsufficientBalance: AugmentedError<ApiType>;
      InsufficientCoreAssetBalance: AugmentedError<ApiType>;
      InsufficientExchangePoolReserve: AugmentedError<ApiType>;
      InsufficientLiquidity: AugmentedError<ApiType>;
      InsufficientTradeAssetBalance: AugmentedError<ApiType>;
      InvalidAssetId: AugmentedError<ApiType>;
      MaximumSellRequirementNotMet: AugmentedError<ApiType>;
      MaximumTradeAssetRequirementNotMet: AugmentedError<ApiType>;
      MinimumBuyRequirementNotMet: AugmentedError<ApiType>;
      MinimumCoreAssetRequirementNotMet: AugmentedError<ApiType>;
      MinimumLiquidityRequirementNotMet: AugmentedError<ApiType>;
      MinimumTradeAssetRequirementNotMet: AugmentedError<ApiType>;
      Overflow: AugmentedError<ApiType>;
    };
    finalityTracker: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Final hint must be updated only once in the block
       **/
      AlreadyUpdated: AugmentedError<ApiType>;
      /**
       * Finalized height above block number
       **/
      BadHint: AugmentedError<ApiType>;
    };
    genericAsset: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * No new assets id available.
       **/
      AssetIdExhausted: AugmentedError<ApiType>;
      /**
       * Asset id is already taken.
       **/
      AssetIdExists: AugmentedError<ApiType>;
      /**
       * Failure due to asset id not existing on chain
       **/
      AssetIdNotExist: AugmentedError<ApiType>;
      /**
       * Free balance got underflowed after burning.
       **/
      FreeBurningUnderflow: AugmentedError<ApiType>;
      /**
       * Free balance got overflowed after minting.
       **/
      FreeMintingOverflow: AugmentedError<ApiType>;
      /**
       * The balance is too low to send amount.
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * The account liquidity restrictions prevent withdrawal.
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * The origin does not have permission to burn an asset.
       **/
      NoBurnPermission: AugmentedError<ApiType>;
      /**
       * The origin does not have permission to mint an asset.
       **/
      NoMintPermission: AugmentedError<ApiType>;
      /**
       * The origin does not have enough permission to update permissions.
       **/
      NoUpdatePermission: AugmentedError<ApiType>;
      /**
       * Total issuance got underflowed after burning.
       **/
      TotalBurningUnderflow: AugmentedError<ApiType>;
      /**
       * Total issuance got overflowed after minting.
       **/
      TotalMintingOverflow: AugmentedError<ApiType>;
      /**
       * The transfer will cause the account to overflow
       **/
      TransferOverflow: AugmentedError<ApiType>;
      /**
       * Cannot transfer zero amount.
       **/
      ZeroAmount: AugmentedError<ApiType>;
    };
    grandpa: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
    };
    identity: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Account ID is already named.
       **/
      AlreadyClaimed: AugmentedError<ApiType>;
      /**
       * Empty index.
       **/
      EmptyIndex: AugmentedError<ApiType>;
      /**
       * Fee is changed.
       **/
      FeeChanged: AugmentedError<ApiType>;
      /**
       * The index is invalid.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * Invalid judgement.
       **/
      InvalidJudgement: AugmentedError<ApiType>;
      /**
       * The target is invalid.
       **/
      InvalidTarget: AugmentedError<ApiType>;
      /**
       * Judgement given.
       **/
      JudgementGiven: AugmentedError<ApiType>;
      /**
       * No identity found.
       **/
      NoIdentity: AugmentedError<ApiType>;
      /**
       * Account isn't found.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Account isn't named.
       **/
      NotNamed: AugmentedError<ApiType>;
      /**
       * Sub-account isn't owned by sender.
       **/
      NotOwned: AugmentedError<ApiType>;
      /**
       * Sender is not a sub-account.
       **/
      NotSub: AugmentedError<ApiType>;
      /**
       * Sticky judgement.
       **/
      StickyJudgement: AugmentedError<ApiType>;
      /**
       * Too many additional fields.
       **/
      TooManyFields: AugmentedError<ApiType>;
      /**
       * Maximum amount of registrars reached. Cannot add any more.
       **/
      TooManyRegistrars: AugmentedError<ApiType>;
      /**
       * Too many subs-accounts.
       **/
      TooManySubAccounts: AugmentedError<ApiType>;
    };
    imOnline: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Duplicated heartbeat.
       **/
      DuplicatedHeartbeat: AugmentedError<ApiType>;
      /**
       * Non existent public key.
       **/
      InvalidKey: AugmentedError<ApiType>;
    };
    multisig: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Call is already approved by this signatory.
       **/
      AlreadyApproved: AugmentedError<ApiType>;
      /**
       * The data to be stored is already stored.
       **/
      AlreadyStored: AugmentedError<ApiType>;
      /**
       * Threshold must be 2 or greater.
       **/
      MinimumThreshold: AugmentedError<ApiType>;
      /**
       * Call doesn't need any (more) approvals.
       **/
      NoApprovalsNeeded: AugmentedError<ApiType>;
      /**
       * Multisig operation not found when attempting to cancel.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * No timepoint was given, yet the multisig operation is already underway.
       **/
      NoTimepoint: AugmentedError<ApiType>;
      /**
       * Only the account that originally created the multisig is able to cancel it.
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * The sender was contained in the other signatories; it shouldn't be.
       **/
      SenderInSignatories: AugmentedError<ApiType>;
      /**
       * The signatories were provided out of order; they should be ordered.
       **/
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      /**
       * There are too few signatories in the list.
       **/
      TooFewSignatories: AugmentedError<ApiType>;
      /**
       * There are too many signatories in the list.
       **/
      TooManySignatories: AugmentedError<ApiType>;
      /**
       * A timepoint was given, yet no multisig operation is underway.
       **/
      UnexpectedTimepoint: AugmentedError<ApiType>;
      /**
       * The maximum weight information provided was too low.
       **/
      WeightTooLow: AugmentedError<ApiType>;
      /**
       * A different timepoint was given to the multisig operation that is underway.
       **/
      WrongTimepoint: AugmentedError<ApiType>;
    };
    scheduler: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Failed to cancel a scheduled call
       **/
      FailedToCancel: AugmentedError<ApiType>;
      /**
       * Failed to schedule a call
       **/
      FailedToSchedule: AugmentedError<ApiType>;
      /**
       * Given target block number is in the past.
       **/
      TargetBlockNumberInPast: AugmentedError<ApiType>;
    };
    session: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Registered duplicate key.
       **/
      DuplicatedKey: AugmentedError<ApiType>;
      /**
       * Invalid ownership proof.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * No associated validator ID for account.
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * No keys are associated with this account.
       **/
      NoKeys: AugmentedError<ApiType>;
    };
    staking: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Stash is already bonded.
       **/
      AlreadyBonded: AugmentedError<ApiType>;
      /**
       * Controller is already paired.
       **/
      AlreadyPaired: AugmentedError<ApiType>;
      /**
       * Cannot nominate the same account multiple times
       **/
      DuplicateNominee: AugmentedError<ApiType>;
      /**
       * Targets cannot be empty.
       **/
      EmptyTargets: AugmentedError<ApiType>;
      /**
       * Attempting to target a stash that still has funds.
       **/
      FundedTarget: AugmentedError<ApiType>;
      /**
       * Can not bond with value less than minimum balance.
       **/
      InsufficientBond: AugmentedError<ApiType>;
      /**
       * Slash record index out of bounds.
       **/
      InvalidSlashIndex: AugmentedError<ApiType>;
      /**
       * Can not schedule more unlock chunks.
       **/
      NoMoreChunks: AugmentedError<ApiType>;
      /**
       * Not a controller account.
       **/
      NotController: AugmentedError<ApiType>;
      /**
       * Items are not sorted and unique.
       **/
      NotSortedAndUnique: AugmentedError<ApiType>;
      /**
       * Not a stash account.
       **/
      NotStash: AugmentedError<ApiType>;
      /**
       * Can not rebond without unlocking chunks.
       **/
      NoUnlockChunk: AugmentedError<ApiType>;
    };
    sudo: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
    };
    syloDevice: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Device is already registered to user (device_id is already in use)
       **/
      DeviceIdExists: AugmentedError<ApiType>;
      /**
       * A user can't have more than MAX_DEVICES registered devices
       **/
      MaxDeviceLimitReached: AugmentedError<ApiType>;
      /**
       * There are no devices registered for user (missing user_id in Devices)
       **/
      UserIdNotRegistered: AugmentedError<ApiType>;
    };
    syloInbox: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Cannot delete more than MAX_DELETE_MESSAGES at a time
       **/
      MaxDeleteMessage: AugmentedError<ApiType>;
      /**
       * A message cannot be greater than MAX_MESSAGE_LENGTH
       **/
      MaxMessageLength: AugmentedError<ApiType>;
      /**
       * Cannot assign any more ids to message due to overflow
       **/
      MessageIdOverflow: AugmentedError<ApiType>;
    };
    syloVault: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Cannot delete more than MAX_DELETE_KEYS at a time
       **/
      MaxDeleteKeys: AugmentedError<ApiType>;
      /**
       * Cannot store more than MAX_KEYS
       **/
      MaxKeys: AugmentedError<ApiType>;
      /**
       * Cannot store value larger than MAX_VALUE_LENGTH
       **/
      MaxValueLength: AugmentedError<ApiType>;
    };
    system: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
    };
    treasury: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * The tip was already found/started.
       **/
      AlreadyKnown: AugmentedError<ApiType>;
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * Invalid bounty fee.
       **/
      InvalidFee: AugmentedError<ApiType>;
      /**
       * No proposal or bounty at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * Invalid bounty value.
       **/
      InvalidValue: AugmentedError<ApiType>;
      /**
       * The account attempting to retract the tip is not the finder of the tip.
       **/
      NotFinder: AugmentedError<ApiType>;
      /**
       * A bounty payout is pending.
       * To cancel the bounty, you must unassign and slash the curator.
       **/
      PendingPayout: AugmentedError<ApiType>;
      /**
       * The tip cannot be claimed/closed because it's still in the countdown period.
       **/
      Premature: AugmentedError<ApiType>;
      /**
       * The reason given is just too big.
       **/
      ReasonTooBig: AugmentedError<ApiType>;
      /**
       * Require bounty curator.
       **/
      RequireCurator: AugmentedError<ApiType>;
      /**
       * The tip cannot be claimed/closed because there are not enough tippers yet.
       **/
      StillOpen: AugmentedError<ApiType>;
      /**
       * The bounty status is unexpected.
       **/
      UnexpectedStatus: AugmentedError<ApiType>;
      /**
       * The tip hash is unknown.
       **/
      UnknownTip: AugmentedError<ApiType>;
    };
  }

  export interface DecoratedErrors<ApiType extends ApiTypes> extends AugmentedErrors<ApiType> {
    [key: string]: ModuleErrors<ApiType>;
  }
}
