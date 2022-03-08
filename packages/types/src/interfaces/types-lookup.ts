// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */
import type { Data } from '@polkadot/types';
import type { BTreeMap, Bytes, Compact, Enum, Null, Option, Result, Set, Struct, Text, U256, U8aFixed, Vec, bool, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H160, H256, PerU16, Perbill, Permill } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {

  /** @name FrameSystemAccountInfo (3) */
  export interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u64;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: Null;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  export interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (10) */
  export interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (12) */
  export interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (15) */
  export interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (17) */
  export interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportWeightsDispatchInfo (18) */
  export interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (19) */
  export interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (20) */
  export interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (21) */
  export interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: {
      readonly index: u8;
      readonly error: u8;
    } & Struct;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'Token' | 'Arithmetic';
  }

  /** @name SpRuntimeTokenError (22) */
  export interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (23) */
  export interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name PalletSchedulerEvent (24) */
  export interface PalletSchedulerEvent extends Enum {
    readonly isScheduled: boolean;
    readonly asScheduled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isCanceled: boolean;
    readonly asCanceled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isDispatched: boolean;
    readonly asDispatched: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<Bytes>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched';
  }

  /** @name CrmlGenericAssetRawEvent (28) */
  export interface CrmlGenericAssetRawEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: ITuple<[u32, AccountId32, CrmlGenericAssetAssetOptions]>;
    readonly isTransferred: boolean;
    readonly asTransferred: ITuple<[u32, AccountId32, AccountId32, u128]>;
    readonly isPermissionUpdated: boolean;
    readonly asPermissionUpdated: ITuple<[u32, CrmlGenericAssetPermissionsV1]>;
    readonly isAssetInfoUpdated: boolean;
    readonly asAssetInfoUpdated: ITuple<[u32, CrmlGenericAssetAssetInfo]>;
    readonly isMinted: boolean;
    readonly asMinted: ITuple<[u32, AccountId32, u128]>;
    readonly isBurned: boolean;
    readonly asBurned: ITuple<[u32, AccountId32, u128]>;
    readonly isDustReclaimed: boolean;
    readonly asDustReclaimed: ITuple<[u32, AccountId32, u128]>;
    readonly type: 'Created' | 'Transferred' | 'PermissionUpdated' | 'AssetInfoUpdated' | 'Minted' | 'Burned' | 'DustReclaimed';
  }

  /** @name CrmlGenericAssetAssetOptions (30) */
  export interface CrmlGenericAssetAssetOptions extends Struct {
    readonly initialIssuance: Compact<u128>;
    readonly permissions: CrmlGenericAssetPermissionsV1;
  }

  /** @name CrmlGenericAssetPermissionsV1 (32) */
  export interface CrmlGenericAssetPermissionsV1 extends Struct {
    readonly update: CrmlGenericAssetOwner;
    readonly mint: CrmlGenericAssetOwner;
    readonly burn: CrmlGenericAssetOwner;
  }

  /** @name CrmlGenericAssetOwner (33) */
  export interface CrmlGenericAssetOwner extends Enum {
    readonly isNone: boolean;
    readonly isAddress: boolean;
    readonly asAddress: AccountId32;
    readonly type: 'None' | 'Address';
  }

  /** @name CrmlGenericAssetAssetInfo (34) */
  export interface CrmlGenericAssetAssetInfo extends Struct {
    readonly symbol: Bytes;
    readonly decimalPlaces: u8;
    readonly existentialDeposit: u64;
  }

  /** @name CrmlStakingRawEvent (35) */
  export interface CrmlStakingRawEvent extends Enum {
    readonly isSlash: boolean;
    readonly asSlash: ITuple<[AccountId32, u128]>;
    readonly isInvulnerableNotSlashed: boolean;
    readonly asInvulnerableNotSlashed: ITuple<[AccountId32, Perbill]>;
    readonly isSetMinimumBond: boolean;
    readonly asSetMinimumBond: u128;
    readonly isOldSlashingReportDiscarded: boolean;
    readonly asOldSlashingReportDiscarded: u32;
    readonly isStakingElection: boolean;
    readonly asStakingElection: CrmlStakingElectionCompute;
    readonly isSolutionStored: boolean;
    readonly asSolutionStored: CrmlStakingElectionCompute;
    readonly isSetInvulnerables: boolean;
    readonly asSetInvulnerables: Vec<AccountId32>;
    readonly isBonded: boolean;
    readonly asBonded: ITuple<[AccountId32, u128]>;
    readonly isUnbonded: boolean;
    readonly asUnbonded: ITuple<[AccountId32, u128]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isSlashed: boolean;
    readonly asSlashed: ITuple<[AccountId32, u128]>;
    readonly type: 'Slash' | 'InvulnerableNotSlashed' | 'SetMinimumBond' | 'OldSlashingReportDiscarded' | 'StakingElection' | 'SolutionStored' | 'SetInvulnerables' | 'Bonded' | 'Unbonded' | 'Withdrawn' | 'Slashed';
  }

  /** @name CrmlStakingElectionCompute (37) */
  export interface CrmlStakingElectionCompute extends Enum {
    readonly isOnChain: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly type: 'OnChain' | 'Signed' | 'Unsigned';
  }

  /** @name PalletOffencesEvent (39) */
  export interface PalletOffencesEvent extends Enum {
    readonly isOffence: boolean;
    readonly asOffence: {
      readonly kind: U8aFixed;
      readonly timeslot: Bytes;
    } & Struct;
    readonly type: 'Offence';
  }

  /** @name PalletSessionEvent (41) */
  export interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (42) */
  export interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (45) */
  export interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (46) */
  export interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletImOnlineEvent (47) */
  export interface PalletImOnlineEvent extends Enum {
    readonly isHeartbeatReceived: boolean;
    readonly asHeartbeatReceived: {
      readonly authorityId: PalletImOnlineSr25519AppSr25519Public;
    } & Struct;
    readonly isAllGood: boolean;
    readonly isSomeOffline: boolean;
    readonly asSomeOffline: {
      readonly offline: Vec<ITuple<[AccountId32, CrmlStakingExposure]>>;
    } & Struct;
    readonly type: 'HeartbeatReceived' | 'AllGood' | 'SomeOffline';
  }

  /** @name PalletImOnlineSr25519AppSr25519Public (48) */
  export interface PalletImOnlineSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (49) */
  export interface SpCoreSr25519Public extends U8aFixed {}

  /** @name CrmlStakingExposure (52) */
  export interface CrmlStakingExposure extends Struct {
    readonly total: Compact<u128>;
    readonly own: Compact<u128>;
    readonly others: Vec<CrmlStakingIndividualExposure>;
  }

  /** @name CrmlStakingIndividualExposure (54) */
  export interface CrmlStakingIndividualExposure extends Struct {
    readonly who: AccountId32;
    readonly value: Compact<u128>;
  }

  /** @name PalletSudoEvent (55) */
  export interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly newSudoer: AccountId32;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletTreasuryEvent (56) */
  export interface PalletTreasuryEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
    } & Struct;
    readonly isSpending: boolean;
    readonly asSpending: {
      readonly budgetRemaining: u128;
    } & Struct;
    readonly isAwarded: boolean;
    readonly asAwarded: {
      readonly proposalIndex: u32;
      readonly award: u128;
      readonly account: AccountId32;
    } & Struct;
    readonly isRejected: boolean;
    readonly asRejected: {
      readonly proposalIndex: u32;
      readonly slashed: u128;
    } & Struct;
    readonly isBurnt: boolean;
    readonly asBurnt: {
      readonly burntFunds: u128;
    } & Struct;
    readonly isRollover: boolean;
    readonly asRollover: {
      readonly rolloverBalance: u128;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly value: u128;
    } & Struct;
    readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit';
  }

  /** @name PalletUtilityEvent (57) */
  export interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isItemCompleted: boolean;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'ItemCompleted' | 'DispatchedAs';
  }

  /** @name PalletIdentityEvent (58) */
  export interface PalletIdentityEvent extends Enum {
    readonly isIdentitySet: boolean;
    readonly asIdentitySet: {
      readonly who: AccountId32;
    } & Struct;
    readonly isIdentityCleared: boolean;
    readonly asIdentityCleared: {
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isIdentityKilled: boolean;
    readonly asIdentityKilled: {
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isJudgementRequested: boolean;
    readonly asJudgementRequested: {
      readonly who: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isJudgementUnrequested: boolean;
    readonly asJudgementUnrequested: {
      readonly who: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isJudgementGiven: boolean;
    readonly asJudgementGiven: {
      readonly target: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isRegistrarAdded: boolean;
    readonly asRegistrarAdded: {
      readonly registrarIndex: u32;
    } & Struct;
    readonly isSubIdentityAdded: boolean;
    readonly asSubIdentityAdded: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isSubIdentityRemoved: boolean;
    readonly asSubIdentityRemoved: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isSubIdentityRevoked: boolean;
    readonly asSubIdentityRevoked: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly type: 'IdentitySet' | 'IdentityCleared' | 'IdentityKilled' | 'JudgementRequested' | 'JudgementUnrequested' | 'JudgementGiven' | 'RegistrarAdded' | 'SubIdentityAdded' | 'SubIdentityRemoved' | 'SubIdentityRevoked';
  }

  /** @name CrmlCennzxRawEvent (59) */
  export interface CrmlCennzxRawEvent extends Enum {
    readonly isAddLiquidity: boolean;
    readonly asAddLiquidity: ITuple<[AccountId32, u128, u32, u128]>;
    readonly isRemoveLiquidity: boolean;
    readonly asRemoveLiquidity: ITuple<[AccountId32, u128, u32, u128]>;
    readonly isAssetBought: boolean;
    readonly asAssetBought: ITuple<[u32, u32, AccountId32, u128, u128]>;
    readonly isAssetSold: boolean;
    readonly asAssetSold: ITuple<[u32, u32, AccountId32, u128, u128]>;
    readonly type: 'AddLiquidity' | 'RemoveLiquidity' | 'AssetBought' | 'AssetSold';
  }

  /** @name CrmlStakingRewardsRawEvent (60) */
  export interface CrmlStakingRewardsRawEvent extends Enum {
    readonly isEraStakerPayout: boolean;
    readonly asEraStakerPayout: ITuple<[AccountId32, u128]>;
    readonly isEraPayout: boolean;
    readonly asEraPayout: ITuple<[u128, u128]>;
    readonly isEraPayoutDeferred: boolean;
    readonly asEraPayoutDeferred: u128;
    readonly isNewFiscalEra: boolean;
    readonly asNewFiscalEra: u128;
    readonly type: 'EraStakerPayout' | 'EraPayout' | 'EraPayoutDeferred' | 'NewFiscalEra';
  }

  /** @name CrmlNftRawEvent (61) */
  export interface CrmlNftRawEvent extends Enum {
    readonly isCreateCollection: boolean;
    readonly asCreateCollection: ITuple<[u32, Bytes, AccountId32]>;
    readonly isCreateSeries: boolean;
    readonly asCreateSeries: ITuple<[u32, u32, u32, AccountId32]>;
    readonly isCreateTokens: boolean;
    readonly asCreateTokens: ITuple<[u32, u32, u32, AccountId32]>;
    readonly isTransfer: boolean;
    readonly asTransfer: ITuple<[AccountId32, u32, u32, Vec<u32>, AccountId32]>;
    readonly isBurn: boolean;
    readonly asBurn: ITuple<[u32, u32, Vec<u32>]>;
    readonly isFixedPriceSaleListed: boolean;
    readonly asFixedPriceSaleListed: ITuple<[u32, u128, Option<u32>]>;
    readonly isFixedPriceSaleComplete: boolean;
    readonly asFixedPriceSaleComplete: ITuple<[u32, u128, AccountId32]>;
    readonly isFixedPriceSaleClosed: boolean;
    readonly asFixedPriceSaleClosed: ITuple<[u32, u128]>;
    readonly isAuctionOpen: boolean;
    readonly asAuctionOpen: ITuple<[u32, u128, Option<u32>]>;
    readonly isAuctionSold: boolean;
    readonly asAuctionSold: ITuple<[u32, u128, u32, u128, AccountId32]>;
    readonly isAuctionClosed: boolean;
    readonly asAuctionClosed: ITuple<[u32, u128, CrmlNftAuctionClosureReason]>;
    readonly isBid: boolean;
    readonly asBid: ITuple<[u32, u128, u128]>;
    readonly isRegisteredMarketplace: boolean;
    readonly asRegisteredMarketplace: ITuple<[AccountId32, Permill, u32]>;
    readonly type: 'CreateCollection' | 'CreateSeries' | 'CreateTokens' | 'Transfer' | 'Burn' | 'FixedPriceSaleListed' | 'FixedPriceSaleComplete' | 'FixedPriceSaleClosed' | 'AuctionOpen' | 'AuctionSold' | 'AuctionClosed' | 'Bid' | 'RegisteredMarketplace';
  }

  /** @name CrmlNftAuctionClosureReason (62) */
  export interface CrmlNftAuctionClosureReason extends Enum {
    readonly isExpiredNoBids: boolean;
    readonly isSettlementFailed: boolean;
    readonly isVendorCancelled: boolean;
    readonly type: 'ExpiredNoBids' | 'SettlementFailed' | 'VendorCancelled';
  }

  /** @name CrmlGovernanceEvent (66) */
  export interface CrmlGovernanceEvent extends Enum {
    readonly isSubmitProposal: boolean;
    readonly asSubmitProposal: u64;
    readonly isEnactReferendum: boolean;
    readonly asEnactReferendum: ITuple<[u64, bool]>;
    readonly isProposalVeto: boolean;
    readonly asProposalVeto: u64;
    readonly isReferendumVeto: boolean;
    readonly asReferendumVeto: u64;
    readonly isReferendumCreated: boolean;
    readonly asReferendumCreated: u64;
    readonly isReferendumApproved: boolean;
    readonly asReferendumApproved: u64;
    readonly type: 'SubmitProposal' | 'EnactReferendum' | 'ProposalVeto' | 'ReferendumVeto' | 'ReferendumCreated' | 'ReferendumApproved';
  }

  /** @name CrmlEthBridgeEvent (68) */
  export interface CrmlEthBridgeEvent extends Enum {
    readonly isVerified: boolean;
    readonly asVerified: u64;
    readonly isInvalid: boolean;
    readonly asInvalid: u64;
    readonly isAuthoritySetChange: boolean;
    readonly asAuthoritySetChange: ITuple<[u64, u64]>;
    readonly type: 'Verified' | 'Invalid' | 'AuthoritySetChange';
  }

  /** @name CrmlErc20PegRawEvent (69) */
  export interface CrmlErc20PegRawEvent extends Enum {
    readonly isErc20Claim: boolean;
    readonly asErc20Claim: ITuple<[u64, AccountId32]>;
    readonly isErc20Deposit: boolean;
    readonly asErc20Deposit: ITuple<[u64, u32, u128, AccountId32]>;
    readonly isErc20Withdraw: boolean;
    readonly asErc20Withdraw: ITuple<[u64, u32, u128, H160]>;
    readonly isErc20DepositFail: boolean;
    readonly asErc20DepositFail: u64;
    readonly isSetContractAddress: boolean;
    readonly asSetContractAddress: H160;
    readonly isCennzDepositsActive: boolean;
    readonly type: 'Erc20Claim' | 'Erc20Deposit' | 'Erc20Withdraw' | 'Erc20DepositFail' | 'SetContractAddress' | 'CennzDepositsActive';
  }

  /** @name CrmlEthWalletRawEvent (72) */
  export interface CrmlEthWalletRawEvent extends Enum {
    readonly isExecute: boolean;
    readonly asExecute: ITuple<[H160, AccountId32, Result<Null, SpRuntimeDispatchError>]>;
    readonly type: 'Execute';
  }

  /** @name PalletEthereumEvent (73) */
  export interface PalletEthereumEvent extends Enum {
    readonly isExecuted: boolean;
    readonly asExecuted: ITuple<[H160, H160, H256, EvmCoreErrorExitReason]>;
    readonly type: 'Executed';
  }

  /** @name EvmCoreErrorExitReason (74) */
  export interface EvmCoreErrorExitReason extends Enum {
    readonly isSucceed: boolean;
    readonly asSucceed: EvmCoreErrorExitSucceed;
    readonly isError: boolean;
    readonly asError: EvmCoreErrorExitError;
    readonly isRevert: boolean;
    readonly asRevert: EvmCoreErrorExitRevert;
    readonly isFatal: boolean;
    readonly asFatal: EvmCoreErrorExitFatal;
    readonly type: 'Succeed' | 'Error' | 'Revert' | 'Fatal';
  }

  /** @name EvmCoreErrorExitSucceed (75) */
  export interface EvmCoreErrorExitSucceed extends Enum {
    readonly isStopped: boolean;
    readonly isReturned: boolean;
    readonly isSuicided: boolean;
    readonly type: 'Stopped' | 'Returned' | 'Suicided';
  }

  /** @name EvmCoreErrorExitError (76) */
  export interface EvmCoreErrorExitError extends Enum {
    readonly isStackUnderflow: boolean;
    readonly isStackOverflow: boolean;
    readonly isInvalidJump: boolean;
    readonly isInvalidRange: boolean;
    readonly isDesignatedInvalid: boolean;
    readonly isCallTooDeep: boolean;
    readonly isCreateCollision: boolean;
    readonly isCreateContractLimit: boolean;
    readonly isInvalidCode: boolean;
    readonly isOutOfOffset: boolean;
    readonly isOutOfGas: boolean;
    readonly isOutOfFund: boolean;
    readonly isPcUnderflow: boolean;
    readonly isCreateEmpty: boolean;
    readonly isOther: boolean;
    readonly asOther: Text;
    readonly type: 'StackUnderflow' | 'StackOverflow' | 'InvalidJump' | 'InvalidRange' | 'DesignatedInvalid' | 'CallTooDeep' | 'CreateCollision' | 'CreateContractLimit' | 'InvalidCode' | 'OutOfOffset' | 'OutOfGas' | 'OutOfFund' | 'PcUnderflow' | 'CreateEmpty' | 'Other';
  }

  /** @name EvmCoreErrorExitRevert (79) */
  export interface EvmCoreErrorExitRevert extends Enum {
    readonly isReverted: boolean;
    readonly type: 'Reverted';
  }

  /** @name EvmCoreErrorExitFatal (80) */
  export interface EvmCoreErrorExitFatal extends Enum {
    readonly isNotSupported: boolean;
    readonly isUnhandledInterrupt: boolean;
    readonly isCallErrorAsFatal: boolean;
    readonly asCallErrorAsFatal: EvmCoreErrorExitError;
    readonly isOther: boolean;
    readonly asOther: Text;
    readonly type: 'NotSupported' | 'UnhandledInterrupt' | 'CallErrorAsFatal' | 'Other';
  }

  /** @name PalletEvmEvent (81) */
  export interface PalletEvmEvent extends Enum {
    readonly isLog: boolean;
    readonly asLog: EthereumLog;
    readonly isCreated: boolean;
    readonly asCreated: H160;
    readonly isCreatedFailed: boolean;
    readonly asCreatedFailed: H160;
    readonly isExecuted: boolean;
    readonly asExecuted: H160;
    readonly isExecutedFailed: boolean;
    readonly asExecutedFailed: H160;
    readonly isBalanceDeposit: boolean;
    readonly asBalanceDeposit: ITuple<[AccountId32, H160, U256]>;
    readonly isBalanceWithdraw: boolean;
    readonly asBalanceWithdraw: ITuple<[AccountId32, H160, U256]>;
    readonly type: 'Log' | 'Created' | 'CreatedFailed' | 'Executed' | 'ExecutedFailed' | 'BalanceDeposit' | 'BalanceWithdraw';
  }

  /** @name EthereumLog (82) */
  export interface EthereumLog extends Struct {
    readonly address: H160;
    readonly topics: Vec<H256>;
    readonly data: Bytes;
  }

  /** @name PalletBaseFeeEvent (86) */
  export interface PalletBaseFeeEvent extends Enum {
    readonly isNewBaseFeePerGas: boolean;
    readonly asNewBaseFeePerGas: U256;
    readonly isBaseFeeOverflow: boolean;
    readonly isIsActive: boolean;
    readonly asIsActive: bool;
    readonly isNewElasticity: boolean;
    readonly asNewElasticity: Permill;
    readonly type: 'NewBaseFeePerGas' | 'BaseFeeOverflow' | 'IsActive' | 'NewElasticity';
  }

  /** @name FrameSystemPhase (87) */
  export interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (89) */
  export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (91) */
  export interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (95) */
  export interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (96) */
  export interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (97) */
  export interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (99) */
  export interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (100) */
  export interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (101) */
  export interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (102) */
  export interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
  }

  /** @name FrameSystemError (108) */
  export interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletSchedulerScheduledV2 (111) */
  export interface PalletSchedulerScheduledV2 extends Struct {
    readonly maybeId: Option<Bytes>;
    readonly priority: u8;
    readonly call: Call;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: CennznetRuntimeOriginCaller;
  }

  /** @name PalletSchedulerCall (113) */
  export interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: Bytes;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: Bytes;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: Bytes;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name PalletBabeCall (115) */
  export interface PalletBabeCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isPlanConfigChange: boolean;
    readonly asPlanConfigChange: {
      readonly config: SpConsensusBabeDigestsNextConfigDescriptor;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'PlanConfigChange';
  }

  /** @name SpConsensusSlotsEquivocationProof (116) */
  export interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }

  /** @name SpRuntimeHeader (117) */
  export interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpRuntimeBlakeTwo256 (118) */
  export type SpRuntimeBlakeTwo256 = Null;

  /** @name SpConsensusBabeAppPublic (119) */
  export interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}

  /** @name SpSessionMembershipProof (121) */
  export interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }

  /** @name SpConsensusBabeDigestsNextConfigDescriptor (122) */
  export interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: 'V1';
  }

  /** @name SpConsensusBabeAllowedSlots (124) */
  export interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type: 'PrimarySlots' | 'PrimaryAndSecondaryPlainSlots' | 'PrimaryAndSecondaryVRFSlots';
  }

  /** @name PalletTimestampCall (125) */
  export interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name CrmlGenericAssetCall (127) */
  export interface CrmlGenericAssetCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly owner: AccountId32;
      readonly options: CrmlGenericAssetAssetOptions;
      readonly info: CrmlGenericAssetAssetInfo;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly assetId: Compact<u32>;
      readonly to: AccountId32;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly assetId: Compact<u32>;
      readonly to: AccountId32;
    } & Struct;
    readonly isUpdatePermission: boolean;
    readonly asUpdatePermission: {
      readonly assetId: Compact<u32>;
      readonly newPermission: CrmlGenericAssetPermissionsV1;
    } & Struct;
    readonly isUpdateAssetInfo: boolean;
    readonly asUpdateAssetInfo: {
      readonly assetId: Compact<u32>;
      readonly info: CrmlGenericAssetAssetInfo;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly assetId: Compact<u32>;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly assetId: Compact<u32>;
      readonly target: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isCreateReserved: boolean;
    readonly asCreateReserved: {
      readonly assetId: u32;
      readonly options: CrmlGenericAssetAssetOptions;
      readonly info: CrmlGenericAssetAssetInfo;
    } & Struct;
    readonly type: 'Create' | 'Transfer' | 'TransferAll' | 'UpdatePermission' | 'UpdateAssetInfo' | 'Mint' | 'Burn' | 'CreateReserved';
  }

  /** @name PalletAuthorshipCall (128) */
  export interface PalletAuthorshipCall extends Enum {
    readonly isSetUncles: boolean;
    readonly asSetUncles: {
      readonly newUncles: Vec<SpRuntimeHeader>;
    } & Struct;
    readonly type: 'SetUncles';
  }

  /** @name CrmlStakingCall (130) */
  export interface CrmlStakingCall extends Enum {
    readonly isBond: boolean;
    readonly asBond: {
      readonly controller: AccountId32;
      readonly value: Compact<u128>;
      readonly payee: CrmlStakingRewardDestination;
    } & Struct;
    readonly isBondExtra: boolean;
    readonly asBondExtra: {
      readonly maxAdditional: Compact<u128>;
    } & Struct;
    readonly isUnbond: boolean;
    readonly asUnbond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isWithdrawUnbonded: boolean;
    readonly isValidate: boolean;
    readonly asValidate: {
      readonly prefs: CrmlStakingValidatorPrefs;
    } & Struct;
    readonly isNominate: boolean;
    readonly asNominate: {
      readonly targets: Vec<AccountId32>;
    } & Struct;
    readonly isChill: boolean;
    readonly isSetPayee: boolean;
    readonly asSetPayee: {
      readonly payee: CrmlStakingRewardDestination;
    } & Struct;
    readonly isSetController: boolean;
    readonly asSetController: {
      readonly controller: AccountId32;
    } & Struct;
    readonly isSetValidatorCount: boolean;
    readonly asSetValidatorCount: {
      readonly new_: Compact<u32>;
    } & Struct;
    readonly isIncreaseValidatorCount: boolean;
    readonly asIncreaseValidatorCount: {
      readonly additional: Compact<u32>;
    } & Struct;
    readonly isForceNoEras: boolean;
    readonly isForceNewEra: boolean;
    readonly isSetMinimumBond: boolean;
    readonly asSetMinimumBond: {
      readonly value: u128;
    } & Struct;
    readonly isSetInvulnerables: boolean;
    readonly asSetInvulnerables: {
      readonly validators: Vec<AccountId32>;
    } & Struct;
    readonly isForceUnstake: boolean;
    readonly asForceUnstake: {
      readonly stash: AccountId32;
    } & Struct;
    readonly isForceNewEraAlways: boolean;
    readonly isCancelDeferredSlash: boolean;
    readonly asCancelDeferredSlash: {
      readonly era: u32;
      readonly slashIndices: Vec<u32>;
    } & Struct;
    readonly isRebond: boolean;
    readonly asRebond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetHistoryDepth: boolean;
    readonly asSetHistoryDepth: {
      readonly newHistoryDepth: Compact<u32>;
      readonly eraItemsDeleted: Compact<u32>;
    } & Struct;
    readonly isReapStash: boolean;
    readonly asReapStash: {
      readonly stash: AccountId32;
    } & Struct;
    readonly isSubmitElectionSolution: boolean;
    readonly asSubmitElectionSolution: {
      readonly winners: Vec<u16>;
      readonly compact: CrmlStakingCompactAssignments;
      readonly score: Vec<u128>;
      readonly era: u32;
      readonly size_: CrmlStakingElectionSize;
    } & Struct;
    readonly isSubmitElectionSolutionUnsigned: boolean;
    readonly asSubmitElectionSolutionUnsigned: {
      readonly winners: Vec<u16>;
      readonly compact: CrmlStakingCompactAssignments;
      readonly score: Vec<u128>;
      readonly era: u32;
      readonly size_: CrmlStakingElectionSize;
    } & Struct;
    readonly type: 'Bond' | 'BondExtra' | 'Unbond' | 'WithdrawUnbonded' | 'Validate' | 'Nominate' | 'Chill' | 'SetPayee' | 'SetController' | 'SetValidatorCount' | 'IncreaseValidatorCount' | 'ForceNoEras' | 'ForceNewEra' | 'SetMinimumBond' | 'SetInvulnerables' | 'ForceUnstake' | 'ForceNewEraAlways' | 'CancelDeferredSlash' | 'Rebond' | 'SetHistoryDepth' | 'ReapStash' | 'SubmitElectionSolution' | 'SubmitElectionSolutionUnsigned';
  }

  /** @name CrmlStakingRewardDestination (131) */
  export interface CrmlStakingRewardDestination extends Enum {
    readonly isStash: boolean;
    readonly isController: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly type: 'Stash' | 'Controller' | 'Account';
  }

  /** @name CrmlStakingValidatorPrefs (132) */
  export interface CrmlStakingValidatorPrefs extends Struct {
    readonly commission: Compact<Perbill>;
  }

  /** @name CrmlStakingCompactAssignments (135) */
  export interface CrmlStakingCompactAssignments extends Struct {
    readonly votes1: Vec<ITuple<[Compact<u32>, Compact<u16>]>>;
    readonly votes2: Vec<ITuple<[Compact<u32>, ITuple<[Compact<u16>, Compact<PerU16>]>, Compact<u16>]>>;
    readonly votes3: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes4: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes5: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes6: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes7: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes8: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes9: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes10: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes11: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes12: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes13: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes14: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes15: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes16: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
  }

  /** @name CrmlStakingElectionSize (187) */
  export interface CrmlStakingElectionSize extends Struct {
    readonly validators: Compact<u16>;
    readonly nominators: Compact<u32>;
  }

  /** @name PalletSessionCall (188) */
  export interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: CennznetRuntimeSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name CennznetRuntimeSessionKeys (189) */
  export interface CennznetRuntimeSessionKeys extends Struct {
    readonly grandpa: SpFinalityGrandpaAppPublic;
    readonly babe: SpConsensusBabeAppPublic;
    readonly imOnline: PalletImOnlineSr25519AppSr25519Public;
    readonly authorityDiscovery: SpAuthorityDiscoveryAppPublic;
    readonly ethBridge: CennznetPrimitivesEthCryptoAppCryptoPublic;
  }

  /** @name SpAuthorityDiscoveryAppPublic (190) */
  export interface SpAuthorityDiscoveryAppPublic extends SpCoreSr25519Public {}

  /** @name CennznetPrimitivesEthCryptoAppCryptoPublic (191) */
  export interface CennznetPrimitivesEthCryptoAppCryptoPublic extends SpCoreEcdsaPublic {}

  /** @name SpCoreEcdsaPublic (192) */
  export interface SpCoreEcdsaPublic extends U8aFixed {}

  /** @name PalletGrandpaCall (194) */
  export interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (195) */
  export interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (196) */
  export interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (197) */
  export interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (198) */
  export interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (199) */
  export interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (200) */
  export interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (203) */
  export interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (204) */
  export interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name PalletImOnlineCall (206) */
  export interface PalletImOnlineCall extends Enum {
    readonly isHeartbeat: boolean;
    readonly asHeartbeat: {
      readonly heartbeat: PalletImOnlineHeartbeat;
      readonly signature: PalletImOnlineSr25519AppSr25519Signature;
    } & Struct;
    readonly type: 'Heartbeat';
  }

  /** @name PalletImOnlineHeartbeat (207) */
  export interface PalletImOnlineHeartbeat extends Struct {
    readonly blockNumber: u32;
    readonly networkState: SpCoreOffchainOpaqueNetworkState;
    readonly sessionIndex: u32;
    readonly authorityIndex: u32;
    readonly validatorsLen: u32;
  }

  /** @name SpCoreOffchainOpaqueNetworkState (208) */
  export interface SpCoreOffchainOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineSr25519AppSr25519Signature (212) */
  export interface PalletImOnlineSr25519AppSr25519Signature extends SpCoreSr25519Signature {}

  /** @name SpCoreSr25519Signature (213) */
  export interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name PalletSudoCall (214) */
  export interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: AccountId32;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: AccountId32;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletTreasuryCall (215) */
  export interface PalletTreasuryCall extends Enum {
    readonly isProposeSpend: boolean;
    readonly asProposeSpend: {
      readonly value: Compact<u128>;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isRejectProposal: boolean;
    readonly asRejectProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isApproveProposal: boolean;
    readonly asApproveProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal';
  }

  /** @name PalletUtilityCall (216) */
  export interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: CennznetRuntimeOriginCaller;
      readonly call: Call;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs';
  }

  /** @name CennznetRuntimeOriginCaller (218) */
  export interface CennznetRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSystemRawOrigin;
    readonly isVoid: boolean;
    readonly isEthereum: boolean;
    readonly asEthereum: PalletEthereumRawOrigin;
    readonly type: 'System' | 'Void' | 'Ethereum';
  }

  /** @name FrameSystemRawOrigin (219) */
  export interface FrameSystemRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletEthereumRawOrigin (220) */
  export interface PalletEthereumRawOrigin extends Enum {
    readonly isEthereumTransaction: boolean;
    readonly asEthereumTransaction: H160;
    readonly type: 'EthereumTransaction';
  }

  /** @name SpCoreVoid (221) */
  export type SpCoreVoid = Null;

  /** @name PalletIdentityCall (222) */
  export interface PalletIdentityCall extends Enum {
    readonly isAddRegistrar: boolean;
    readonly asAddRegistrar: {
      readonly account: AccountId32;
    } & Struct;
    readonly isSetIdentity: boolean;
    readonly asSetIdentity: {
      readonly info: PalletIdentityIdentityInfo;
    } & Struct;
    readonly isSetSubs: boolean;
    readonly asSetSubs: {
      readonly subs: Vec<ITuple<[AccountId32, Data]>>;
    } & Struct;
    readonly isClearIdentity: boolean;
    readonly isRequestJudgement: boolean;
    readonly asRequestJudgement: {
      readonly regIndex: Compact<u32>;
      readonly maxFee: Compact<u128>;
    } & Struct;
    readonly isCancelRequest: boolean;
    readonly asCancelRequest: {
      readonly regIndex: u32;
    } & Struct;
    readonly isSetFee: boolean;
    readonly asSetFee: {
      readonly index: Compact<u32>;
      readonly fee: Compact<u128>;
    } & Struct;
    readonly isSetAccountId: boolean;
    readonly asSetAccountId: {
      readonly index: Compact<u32>;
      readonly new_: AccountId32;
    } & Struct;
    readonly isSetFields: boolean;
    readonly asSetFields: {
      readonly index: Compact<u32>;
      readonly fields: PalletIdentityBitFlags;
    } & Struct;
    readonly isProvideJudgement: boolean;
    readonly asProvideJudgement: {
      readonly regIndex: Compact<u32>;
      readonly target: AccountId32;
      readonly judgement: PalletIdentityJudgement;
    } & Struct;
    readonly isKillIdentity: boolean;
    readonly asKillIdentity: {
      readonly target: AccountId32;
    } & Struct;
    readonly isAddSub: boolean;
    readonly asAddSub: {
      readonly sub: AccountId32;
      readonly data: Data;
    } & Struct;
    readonly isRenameSub: boolean;
    readonly asRenameSub: {
      readonly sub: AccountId32;
      readonly data: Data;
    } & Struct;
    readonly isRemoveSub: boolean;
    readonly asRemoveSub: {
      readonly sub: AccountId32;
    } & Struct;
    readonly isQuitSub: boolean;
    readonly type: 'AddRegistrar' | 'SetIdentity' | 'SetSubs' | 'ClearIdentity' | 'RequestJudgement' | 'CancelRequest' | 'SetFee' | 'SetAccountId' | 'SetFields' | 'ProvideJudgement' | 'KillIdentity' | 'AddSub' | 'RenameSub' | 'RemoveSub' | 'QuitSub';
  }

  /** @name PalletIdentityIdentityInfo (223) */
  export interface PalletIdentityIdentityInfo extends Struct {
    readonly additional: Vec<ITuple<[Data, Data]>>;
    readonly display: Data;
    readonly legal: Data;
    readonly web: Data;
    readonly riot: Data;
    readonly email: Data;
    readonly pgpFingerprint: Option<U8aFixed>;
    readonly image: Data;
    readonly twitter: Data;
  }

  /** @name PalletIdentityBitFlags (259) */
  export interface PalletIdentityBitFlags extends Set {
    readonly isDisplay: boolean;
    readonly isLegal: boolean;
    readonly isWeb: boolean;
    readonly isRiot: boolean;
    readonly isEmail: boolean;
    readonly isPgpFingerprint: boolean;
    readonly isImage: boolean;
    readonly isTwitter: boolean;
  }

  /** @name PalletIdentityIdentityField (260) */
  export interface PalletIdentityIdentityField extends Enum {
    readonly isDisplay: boolean;
    readonly isLegal: boolean;
    readonly isWeb: boolean;
    readonly isRiot: boolean;
    readonly isEmail: boolean;
    readonly isPgpFingerprint: boolean;
    readonly isImage: boolean;
    readonly isTwitter: boolean;
    readonly type: 'Display' | 'Legal' | 'Web' | 'Riot' | 'Email' | 'PgpFingerprint' | 'Image' | 'Twitter';
  }

  /** @name PalletIdentityJudgement (261) */
  export interface PalletIdentityJudgement extends Enum {
    readonly isUnknown: boolean;
    readonly isFeePaid: boolean;
    readonly asFeePaid: u128;
    readonly isReasonable: boolean;
    readonly isKnownGood: boolean;
    readonly isOutOfDate: boolean;
    readonly isLowQuality: boolean;
    readonly isErroneous: boolean;
    readonly type: 'Unknown' | 'FeePaid' | 'Reasonable' | 'KnownGood' | 'OutOfDate' | 'LowQuality' | 'Erroneous';
  }

  /** @name CrmlCennzxCall (262) */
  export interface CrmlCennzxCall extends Enum {
    readonly isBuyAsset: boolean;
    readonly asBuyAsset: {
      readonly recipient: Option<AccountId32>;
      readonly assetToSell: Compact<u32>;
      readonly assetToBuy: Compact<u32>;
      readonly buyAmount: Compact<u128>;
      readonly maximumSell: Compact<u128>;
    } & Struct;
    readonly isSellAsset: boolean;
    readonly asSellAsset: {
      readonly recipient: Option<AccountId32>;
      readonly assetToSell: Compact<u32>;
      readonly assetToBuy: Compact<u32>;
      readonly sellAmount: Compact<u128>;
      readonly minimumBuy: Compact<u128>;
    } & Struct;
    readonly isAddLiquidity: boolean;
    readonly asAddLiquidity: {
      readonly assetId: Compact<u32>;
      readonly minLiquidity: Compact<u128>;
      readonly maxAssetAmount: Compact<u128>;
      readonly coreAmount: Compact<u128>;
    } & Struct;
    readonly isRemoveLiquidity: boolean;
    readonly asRemoveLiquidity: {
      readonly assetId: Compact<u32>;
      readonly liquidityToWithdraw: Compact<u128>;
      readonly minAssetWithdraw: Compact<u128>;
      readonly minCoreWithdraw: Compact<u128>;
    } & Struct;
    readonly isSetFeeRate: boolean;
    readonly asSetFeeRate: {
      readonly newFeeRate: u128;
    } & Struct;
    readonly type: 'BuyAsset' | 'SellAsset' | 'AddLiquidity' | 'RemoveLiquidity' | 'SetFeeRate';
  }

  /** @name CrmlCennzxPerMillion (265) */
  export type CrmlCennzxPerMillion = Null;

  /** @name CrmlStakingRewardsCall (266) */
  export interface CrmlStakingRewardsCall extends Enum {
    readonly isSetInflationRate: boolean;
    readonly asSetInflationRate: {
      readonly numerator: u64;
      readonly denominator: u64;
    } & Struct;
    readonly isSetDevelopmentFundTake: boolean;
    readonly asSetDevelopmentFundTake: {
      readonly newTakePercent: u32;
    } & Struct;
    readonly isForceNewFiscalEra: boolean;
    readonly type: 'SetInflationRate' | 'SetDevelopmentFundTake' | 'ForceNewFiscalEra';
  }

  /** @name CrmlNftCall (267) */
  export interface CrmlNftCall extends Enum {
    readonly isSetOwner: boolean;
    readonly asSetOwner: {
      readonly collectionId: u32;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isSetSeriesName: boolean;
    readonly asSetSeriesName: {
      readonly collectionId: u32;
      readonly seriesId: u32;
      readonly name: Bytes;
    } & Struct;
    readonly isRegisterMarketplace: boolean;
    readonly asRegisterMarketplace: {
      readonly marketplaceAccount: Option<AccountId32>;
      readonly entitlement: Permill;
    } & Struct;
    readonly isCreateCollection: boolean;
    readonly asCreateCollection: {
      readonly name: Bytes;
      readonly royaltiesSchedule: Option<CrmlNftRoyaltiesSchedule>;
    } & Struct;
    readonly isMintSeries: boolean;
    readonly asMintSeries: {
      readonly collectionId: u32;
      readonly quantity: u32;
      readonly owner: Option<AccountId32>;
      readonly metadataScheme: CrmlNftMetadataScheme;
      readonly royaltiesSchedule: Option<CrmlNftRoyaltiesSchedule>;
    } & Struct;
    readonly isMintAdditional: boolean;
    readonly asMintAdditional: {
      readonly collectionId: u32;
      readonly seriesId: u32;
      readonly quantity: u32;
      readonly owner: Option<AccountId32>;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly tokenId: ITuple<[u32, u32, u32]>;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isTransferBatch: boolean;
    readonly asTransferBatch: {
      readonly collectionId: u32;
      readonly seriesId: u32;
      readonly serialNumbers: Vec<u32>;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly tokenId: ITuple<[u32, u32, u32]>;
    } & Struct;
    readonly isBurnBatch: boolean;
    readonly asBurnBatch: {
      readonly collectionId: u32;
      readonly seriesId: u32;
      readonly serialNumbers: Vec<u32>;
    } & Struct;
    readonly isSell: boolean;
    readonly asSell: {
      readonly tokenId: ITuple<[u32, u32, u32]>;
      readonly buyer: Option<AccountId32>;
      readonly paymentAsset: u32;
      readonly fixedPrice: u128;
      readonly duration: Option<u32>;
      readonly marketplaceId: Option<u32>;
    } & Struct;
    readonly isSellBundle: boolean;
    readonly asSellBundle: {
      readonly tokens: Vec<ITuple<[u32, u32, u32]>>;
      readonly buyer: Option<AccountId32>;
      readonly paymentAsset: u32;
      readonly fixedPrice: u128;
      readonly duration: Option<u32>;
      readonly marketplaceId: Option<u32>;
    } & Struct;
    readonly isBuy: boolean;
    readonly asBuy: {
      readonly listingId: u128;
    } & Struct;
    readonly isAuction: boolean;
    readonly asAuction: {
      readonly tokenId: ITuple<[u32, u32, u32]>;
      readonly paymentAsset: u32;
      readonly reservePrice: u128;
      readonly duration: Option<u32>;
      readonly marketplaceId: Option<u32>;
    } & Struct;
    readonly isAuctionBundle: boolean;
    readonly asAuctionBundle: {
      readonly tokens: Vec<ITuple<[u32, u32, u32]>>;
      readonly paymentAsset: u32;
      readonly reservePrice: u128;
      readonly duration: Option<u32>;
      readonly marketplaceId: Option<u32>;
    } & Struct;
    readonly isBid: boolean;
    readonly asBid: {
      readonly listingId: u128;
      readonly amount: u128;
    } & Struct;
    readonly isCancelSale: boolean;
    readonly asCancelSale: {
      readonly listingId: u128;
    } & Struct;
    readonly type: 'SetOwner' | 'SetSeriesName' | 'RegisterMarketplace' | 'CreateCollection' | 'MintSeries' | 'MintAdditional' | 'Transfer' | 'TransferBatch' | 'Burn' | 'BurnBatch' | 'Sell' | 'SellBundle' | 'Buy' | 'Auction' | 'AuctionBundle' | 'Bid' | 'CancelSale';
  }

  /** @name CrmlNftRoyaltiesSchedule (269) */
  export interface CrmlNftRoyaltiesSchedule extends Struct {
    readonly entitlements: Vec<ITuple<[AccountId32, Permill]>>;
  }

  /** @name CrmlNftMetadataScheme (272) */
  export interface CrmlNftMetadataScheme extends Enum {
    readonly isHttps: boolean;
    readonly asHttps: Bytes;
    readonly isHttp: boolean;
    readonly asHttp: Bytes;
    readonly isIpfsDir: boolean;
    readonly asIpfsDir: Bytes;
    readonly isIpfsShared: boolean;
    readonly asIpfsShared: Bytes;
    readonly type: 'Https' | 'Http' | 'IpfsDir' | 'IpfsShared';
  }

  /** @name CrmlGovernanceCall (275) */
  export interface CrmlGovernanceCall extends Enum {
    readonly isSubmitProposal: boolean;
    readonly asSubmitProposal: {
      readonly call: Bytes;
      readonly justificationUri: Bytes;
      readonly enactmentDelay: u32;
    } & Struct;
    readonly isVoteOnProposal: boolean;
    readonly asVoteOnProposal: {
      readonly proposalId: u64;
      readonly vote: bool;
    } & Struct;
    readonly isAddCouncilMember: boolean;
    readonly asAddCouncilMember: {
      readonly newMember: AccountId32;
    } & Struct;
    readonly isRemoveCouncilMember: boolean;
    readonly asRemoveCouncilMember: {
      readonly removeMember: AccountId32;
    } & Struct;
    readonly isCancelEnactment: boolean;
    readonly asCancelEnactment: {
      readonly proposalId: u64;
    } & Struct;
    readonly isVoteAgainstReferendum: boolean;
    readonly asVoteAgainstReferendum: {
      readonly proposalId: u64;
    } & Struct;
    readonly isEnactReferendum: boolean;
    readonly asEnactReferendum: {
      readonly proposalId: u64;
    } & Struct;
    readonly isSetProposalBond: boolean;
    readonly asSetProposalBond: {
      readonly newProposalBond: u128;
    } & Struct;
    readonly isSetMinimumCouncilStake: boolean;
    readonly asSetMinimumCouncilStake: {
      readonly newMinimumCouncilStake: u128;
    } & Struct;
    readonly isSetReferendumThreshold: boolean;
    readonly asSetReferendumThreshold: {
      readonly newReferendumThreshold: Permill;
    } & Struct;
    readonly isSetMinimumVoterStakedAmount: boolean;
    readonly asSetMinimumVoterStakedAmount: {
      readonly newMinimumStakedAmount: u128;
    } & Struct;
    readonly type: 'SubmitProposal' | 'VoteOnProposal' | 'AddCouncilMember' | 'RemoveCouncilMember' | 'CancelEnactment' | 'VoteAgainstReferendum' | 'EnactReferendum' | 'SetProposalBond' | 'SetMinimumCouncilStake' | 'SetReferendumThreshold' | 'SetMinimumVoterStakedAmount';
  }

  /** @name CrmlEthBridgeCall (276) */
  export interface CrmlEthBridgeCall extends Enum {
    readonly isSetEventConfirmations: boolean;
    readonly asSetEventConfirmations: {
      readonly confirmations: u64;
    } & Struct;
    readonly isSetEventDeadline: boolean;
    readonly asSetEventDeadline: {
      readonly seconds: u64;
    } & Struct;
    readonly isSubmitNotarization: boolean;
    readonly asSubmitNotarization: {
      readonly payload: CrmlEthBridgeNotarizationPayload;
      readonly signature: CennznetPrimitivesEthCryptoAppCryptoSignature;
    } & Struct;
    readonly type: 'SetEventConfirmations' | 'SetEventDeadline' | 'SubmitNotarization';
  }

  /** @name CrmlEthBridgeNotarizationPayload (277) */
  export interface CrmlEthBridgeNotarizationPayload extends Struct {
    readonly eventClaimId: u64;
    readonly authorityIndex: u16;
    readonly result: CrmlEthBridgeEventClaimResult;
  }

  /** @name CrmlEthBridgeEventClaimResult (278) */
  export interface CrmlEthBridgeEventClaimResult extends Enum {
    readonly isValid: boolean;
    readonly isDataProviderErr: boolean;
    readonly isTxStatusFailed: boolean;
    readonly isUnexpectedContractAddress: boolean;
    readonly isNoTxLogs: boolean;
    readonly isNotEnoughConfirmations: boolean;
    readonly isUnexpectedData: boolean;
    readonly isExpired: boolean;
    readonly type: 'Valid' | 'DataProviderErr' | 'TxStatusFailed' | 'UnexpectedContractAddress' | 'NoTxLogs' | 'NotEnoughConfirmations' | 'UnexpectedData' | 'Expired';
  }

  /** @name CennznetPrimitivesEthCryptoAppCryptoSignature (279) */
  export interface CennznetPrimitivesEthCryptoAppCryptoSignature extends SpCoreEcdsaSignature {}

  /** @name SpCoreEcdsaSignature (280) */
  export interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name CrmlErc20PegCall (282) */
  export interface CrmlErc20PegCall extends Enum {
    readonly isActivateDeposits: boolean;
    readonly asActivateDeposits: {
      readonly activate: bool;
    } & Struct;
    readonly isActivateWithdrawals: boolean;
    readonly asActivateWithdrawals: {
      readonly activate: bool;
    } & Struct;
    readonly isDepositClaim: boolean;
    readonly asDepositClaim: {
      readonly txHash: H256;
      readonly claim: CrmlErc20PegErc20DepositEvent;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly assetId: u32;
      readonly amount: u128;
      readonly beneficiary: H160;
    } & Struct;
    readonly isSetContractAddress: boolean;
    readonly asSetContractAddress: {
      readonly ethAddress: H160;
    } & Struct;
    readonly isActivateCennzDeposits: boolean;
    readonly isSetErc20Meta: boolean;
    readonly asSetErc20Meta: {
      readonly details: Vec<ITuple<[H160, Bytes, u8]>>;
    } & Struct;
    readonly type: 'ActivateDeposits' | 'ActivateWithdrawals' | 'DepositClaim' | 'Withdraw' | 'SetContractAddress' | 'ActivateCennzDeposits' | 'SetErc20Meta';
  }

  /** @name CrmlErc20PegErc20DepositEvent (283) */
  export interface CrmlErc20PegErc20DepositEvent extends Struct {
    readonly tokenAddress: H160;
    readonly amount: U256;
    readonly beneficiary: H256;
  }

  /** @name CrmlEthWalletCall (286) */
  export interface CrmlEthWalletCall extends Enum {
    readonly isCall: boolean;
    readonly asCall: {
      readonly call: Call;
      readonly ethAddress: H160;
      readonly signature: CrmlEthWalletEthereumEthereumSignature;
    } & Struct;
    readonly type: 'Call';
  }

  /** @name CrmlEthWalletEthereumEthereumSignature (287) */
  export interface CrmlEthWalletEthereumEthereumSignature extends U8aFixed {}

  /** @name PalletEthereumCall (288) */
  export interface PalletEthereumCall extends Enum {
    readonly isTransact: boolean;
    readonly asTransact: {
      readonly transaction: EthereumTransactionTransactionV2;
    } & Struct;
    readonly type: 'Transact';
  }

  /** @name EthereumTransactionTransactionV2 (289) */
  export interface EthereumTransactionTransactionV2 extends Enum {
    readonly isLegacy: boolean;
    readonly asLegacy: EthereumTransactionLegacyTransaction;
    readonly isEip2930: boolean;
    readonly asEip2930: EthereumTransactionEip2930Transaction;
    readonly isEip1559: boolean;
    readonly asEip1559: EthereumTransactionEip1559Transaction;
    readonly type: 'Legacy' | 'Eip2930' | 'Eip1559';
  }

  /** @name EthereumTransactionLegacyTransaction (290) */
  export interface EthereumTransactionLegacyTransaction extends Struct {
    readonly nonce: U256;
    readonly gasPrice: U256;
    readonly gasLimit: U256;
    readonly action: EthereumTransactionTransactionAction;
    readonly value: U256;
    readonly input: Bytes;
    readonly signature: EthereumTransactionTransactionSignature;
  }

  /** @name EthereumTransactionTransactionAction (291) */
  export interface EthereumTransactionTransactionAction extends Enum {
    readonly isCall: boolean;
    readonly asCall: H160;
    readonly isCreate: boolean;
    readonly type: 'Call' | 'Create';
  }

  /** @name EthereumTransactionTransactionSignature (292) */
  export interface EthereumTransactionTransactionSignature extends Struct {
    readonly v: u64;
    readonly r: H256;
    readonly s: H256;
  }

  /** @name EthereumTransactionEip2930Transaction (294) */
  export interface EthereumTransactionEip2930Transaction extends Struct {
    readonly chainId: u64;
    readonly nonce: U256;
    readonly gasPrice: U256;
    readonly gasLimit: U256;
    readonly action: EthereumTransactionTransactionAction;
    readonly value: U256;
    readonly input: Bytes;
    readonly accessList: Vec<EthereumTransactionAccessListItem>;
    readonly oddYParity: bool;
    readonly r: H256;
    readonly s: H256;
  }

  /** @name EthereumTransactionAccessListItem (296) */
  export interface EthereumTransactionAccessListItem extends Struct {
    readonly address: H160;
    readonly slots: Vec<H256>;
  }

  /** @name EthereumTransactionEip1559Transaction (297) */
  export interface EthereumTransactionEip1559Transaction extends Struct {
    readonly chainId: u64;
    readonly nonce: U256;
    readonly maxPriorityFeePerGas: U256;
    readonly maxFeePerGas: U256;
    readonly gasLimit: U256;
    readonly action: EthereumTransactionTransactionAction;
    readonly value: U256;
    readonly input: Bytes;
    readonly accessList: Vec<EthereumTransactionAccessListItem>;
    readonly oddYParity: bool;
    readonly r: H256;
    readonly s: H256;
  }

  /** @name PalletEvmCall (298) */
  export interface PalletEvmCall extends Enum {
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly address: H160;
      readonly value: u128;
    } & Struct;
    readonly isCall: boolean;
    readonly asCall: {
      readonly source: H160;
      readonly target: H160;
      readonly input: Bytes;
      readonly value: U256;
      readonly gasLimit: u64;
      readonly maxFeePerGas: U256;
      readonly maxPriorityFeePerGas: Option<U256>;
      readonly nonce: Option<U256>;
      readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
    } & Struct;
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly source: H160;
      readonly init: Bytes;
      readonly value: U256;
      readonly gasLimit: u64;
      readonly maxFeePerGas: U256;
      readonly maxPriorityFeePerGas: Option<U256>;
      readonly nonce: Option<U256>;
      readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
    } & Struct;
    readonly isCreate2: boolean;
    readonly asCreate2: {
      readonly source: H160;
      readonly init: Bytes;
      readonly salt: H256;
      readonly value: U256;
      readonly gasLimit: u64;
      readonly maxFeePerGas: U256;
      readonly maxPriorityFeePerGas: Option<U256>;
      readonly nonce: Option<U256>;
      readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
    } & Struct;
    readonly type: 'Withdraw' | 'Call' | 'Create' | 'Create2';
  }

  /** @name PalletBaseFeeCall (302) */
  export interface PalletBaseFeeCall extends Enum {
    readonly isSetBaseFeePerGas: boolean;
    readonly asSetBaseFeePerGas: {
      readonly fee: U256;
    } & Struct;
    readonly isSetIsActive: boolean;
    readonly asSetIsActive: {
      readonly isActive: bool;
    } & Struct;
    readonly isSetElasticity: boolean;
    readonly asSetElasticity: {
      readonly elasticity: Permill;
    } & Struct;
    readonly type: 'SetBaseFeePerGas' | 'SetIsActive' | 'SetElasticity';
  }

  /** @name CrmlTokenApprovalsCall (303) */
  export interface CrmlTokenApprovalsCall extends Enum {
    readonly isErc721Approval: boolean;
    readonly asErc721Approval: {
      readonly caller: H160;
      readonly operatorAccount: H160;
      readonly tokenId: ITuple<[u32, u32, u32]>;
    } & Struct;
    readonly isErc20Approval: boolean;
    readonly asErc20Approval: {
      readonly caller: H160;
      readonly spender: H160;
      readonly assetId: u32;
      readonly amount: u128;
    } & Struct;
    readonly isErc20RemoveApproval: boolean;
    readonly asErc20RemoveApproval: {
      readonly caller: H160;
      readonly spender: H160;
      readonly assetId: u32;
    } & Struct;
    readonly type: 'Erc721Approval' | 'Erc20Approval' | 'Erc20RemoveApproval';
  }

  /** @name PalletSchedulerReleases (304) */
  export interface PalletSchedulerReleases extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name PalletSchedulerError (305) */
  export interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange';
  }

  /** @name SpConsensusBabeBabeEpochConfiguration (312) */
  export interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }

  /** @name PalletBabeError (313) */
  export interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'InvalidEquivocationProof' | 'InvalidKeyOwnershipProof' | 'DuplicateOffenceReport';
  }

  /** @name CrmlGenericAssetPermissionVersions (315) */
  export interface CrmlGenericAssetPermissionVersions extends Enum {
    readonly isV1: boolean;
    readonly asV1: CrmlGenericAssetPermissionsV1;
    readonly type: 'V1';
  }

  /** @name CrmlGenericAssetBalanceLock (317) */
  export interface CrmlGenericAssetBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: CrmlGenericAssetReasons;
  }

  /** @name CrmlGenericAssetReasons (318) */
  export interface CrmlGenericAssetReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name CrmlGenericAssetError (319) */
  export interface CrmlGenericAssetError extends Enum {
    readonly isAssetIdExhausted: boolean;
    readonly isZeroAmount: boolean;
    readonly isNoUpdatePermission: boolean;
    readonly isNoMintPermission: boolean;
    readonly isNoBurnPermission: boolean;
    readonly isTotalMintingOverflow: boolean;
    readonly isFreeMintingOverflow: boolean;
    readonly isTotalBurningUnderflow: boolean;
    readonly isFreeBurningUnderflow: boolean;
    readonly isAssetIdExists: boolean;
    readonly isAssetIdNotExist: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isTransferOverflow: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isZeroExistentialDeposit: boolean;
    readonly isAccountIdNotExist: boolean;
    readonly isDecimalTooLarge: boolean;
    readonly isInitialIssuanceTooLarge: boolean;
    readonly type: 'AssetIdExhausted' | 'ZeroAmount' | 'NoUpdatePermission' | 'NoMintPermission' | 'NoBurnPermission' | 'TotalMintingOverflow' | 'FreeMintingOverflow' | 'TotalBurningUnderflow' | 'FreeBurningUnderflow' | 'AssetIdExists' | 'AssetIdNotExist' | 'InsufficientBalance' | 'TransferOverflow' | 'LiquidityRestrictions' | 'ZeroExistentialDeposit' | 'AccountIdNotExist' | 'DecimalTooLarge' | 'InitialIssuanceTooLarge';
  }

  /** @name PalletAuthorshipUncleEntryItem (321) */
  export interface PalletAuthorshipUncleEntryItem extends Enum {
    readonly isInclusionHeight: boolean;
    readonly asInclusionHeight: u32;
    readonly isUncle: boolean;
    readonly asUncle: ITuple<[H256, Option<AccountId32>]>;
    readonly type: 'InclusionHeight' | 'Uncle';
  }

  /** @name PalletAuthorshipError (322) */
  export interface PalletAuthorshipError extends Enum {
    readonly isInvalidUncleParent: boolean;
    readonly isUnclesAlreadySet: boolean;
    readonly isTooManyUncles: boolean;
    readonly isGenesisUncle: boolean;
    readonly isTooHighUncle: boolean;
    readonly isUncleAlreadyIncluded: boolean;
    readonly isOldUncle: boolean;
    readonly type: 'InvalidUncleParent' | 'UnclesAlreadySet' | 'TooManyUncles' | 'GenesisUncle' | 'TooHighUncle' | 'UncleAlreadyIncluded' | 'OldUncle';
  }

  /** @name CrmlStakingStakingLedger (325) */
  export interface CrmlStakingStakingLedger extends Struct {
    readonly stash: AccountId32;
    readonly total: Compact<u128>;
    readonly active: Compact<u128>;
    readonly unlocking: Vec<CrmlStakingUnlockChunk>;
  }

  /** @name CrmlStakingUnlockChunk (327) */
  export interface CrmlStakingUnlockChunk extends Struct {
    readonly value: Compact<u128>;
    readonly era: Compact<u32>;
  }

  /** @name CrmlStakingNominations (328) */
  export interface CrmlStakingNominations extends Struct {
    readonly targets: Vec<AccountId32>;
    readonly submittedIn: u32;
  }

  /** @name CrmlStakingActiveEraInfo (329) */
  export interface CrmlStakingActiveEraInfo extends Struct {
    readonly index: u32;
    readonly start: Option<u64>;
  }

  /** @name CrmlStakingForcing (330) */
  export interface CrmlStakingForcing extends Enum {
    readonly isNotForcing: boolean;
    readonly isForceNew: boolean;
    readonly isForceNone: boolean;
    readonly isForceAlways: boolean;
    readonly type: 'NotForcing' | 'ForceNew' | 'ForceNone' | 'ForceAlways';
  }

  /** @name CrmlStakingUnappliedSlash (332) */
  export interface CrmlStakingUnappliedSlash extends Struct {
    readonly validator: AccountId32;
    readonly own: u128;
    readonly others: Vec<ITuple<[AccountId32, u128]>>;
    readonly reporters: Vec<AccountId32>;
    readonly payout: u128;
  }

  /** @name CrmlStakingSlashingSlashingSpans (336) */
  export interface CrmlStakingSlashingSlashingSpans extends Struct {
    readonly spanIndex: u32;
    readonly lastStart: u32;
    readonly lastNonzeroSlash: u32;
    readonly prior: Vec<u32>;
  }

  /** @name CrmlStakingSlashingSpanRecord (338) */
  export interface CrmlStakingSlashingSpanRecord extends Struct {
    readonly slashed: u128;
    readonly paidOut: u128;
  }

  /** @name CrmlStakingElectionResult (339) */
  export interface CrmlStakingElectionResult extends Struct {
    readonly electedStashes: Vec<AccountId32>;
    readonly exposures: Vec<ITuple<[AccountId32, CrmlStakingExposure]>>;
    readonly compute: CrmlStakingElectionCompute;
  }

  /** @name CrmlStakingElectionStatus (340) */
  export interface CrmlStakingElectionStatus extends Enum {
    readonly isClosed: boolean;
    readonly isOpen: boolean;
    readonly asOpen: u32;
    readonly type: 'Closed' | 'Open';
  }

  /** @name SpStakingOffenceOffenceDetails (344) */
  export interface SpStakingOffenceOffenceDetails extends Struct {
    readonly offender: ITuple<[AccountId32, CrmlStakingExposure]>;
    readonly reporters: Vec<AccountId32>;
  }

  /** @name CrmlStakingError (346) */
  export interface CrmlStakingError extends Enum {
    readonly isNotController: boolean;
    readonly isNotStash: boolean;
    readonly isAlreadyBonded: boolean;
    readonly isAlreadyPaired: boolean;
    readonly isEmptyTargets: boolean;
    readonly isInvalidSlashIndex: boolean;
    readonly isInsufficientBond: boolean;
    readonly isInsufficientFreeBalance: boolean;
    readonly isNoMoreChunks: boolean;
    readonly isNoUnlockChunk: boolean;
    readonly isFundedTarget: boolean;
    readonly isNotSortedAndUnique: boolean;
    readonly isDuplicateNominee: boolean;
    readonly isOffchainElectionEarlySubmission: boolean;
    readonly isOffchainElectionWeakSubmission: boolean;
    readonly isSnapshotUnavailable: boolean;
    readonly isOffchainElectionBogusWinnerCount: boolean;
    readonly isOffchainElectionBogusWinner: boolean;
    readonly isOffchainElectionBogusCompact: boolean;
    readonly isOffchainElectionBogusNominator: boolean;
    readonly isOffchainElectionBogusNomination: boolean;
    readonly isOffchainElectionSlashedNomination: boolean;
    readonly isOffchainElectionBogusSelfVote: boolean;
    readonly isOffchainElectionBogusEdge: boolean;
    readonly isOffchainElectionBogusScore: boolean;
    readonly isOffchainElectionBogusElectionSize: boolean;
    readonly isCallNotAllowed: boolean;
    readonly isIncorrectHistoryDepth: boolean;
    readonly isIncorrectSlashingSpans: boolean;
    readonly type: 'NotController' | 'NotStash' | 'AlreadyBonded' | 'AlreadyPaired' | 'EmptyTargets' | 'InvalidSlashIndex' | 'InsufficientBond' | 'InsufficientFreeBalance' | 'NoMoreChunks' | 'NoUnlockChunk' | 'FundedTarget' | 'NotSortedAndUnique' | 'DuplicateNominee' | 'OffchainElectionEarlySubmission' | 'OffchainElectionWeakSubmission' | 'SnapshotUnavailable' | 'OffchainElectionBogusWinnerCount' | 'OffchainElectionBogusWinner' | 'OffchainElectionBogusCompact' | 'OffchainElectionBogusNominator' | 'OffchainElectionBogusNomination' | 'OffchainElectionSlashedNomination' | 'OffchainElectionBogusSelfVote' | 'OffchainElectionBogusEdge' | 'OffchainElectionBogusScore' | 'OffchainElectionBogusElectionSize' | 'CallNotAllowed' | 'IncorrectHistoryDepth' | 'IncorrectSlashingSpans';
  }

  /** @name SpCoreCryptoKeyTypeId (351) */
  export interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (352) */
  export interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (353) */
  export interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (354) */
  export interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaError (356) */
  export interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletImOnlineBoundedOpaqueNetworkState (360) */
  export interface PalletImOnlineBoundedOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineError (364) */
  export interface PalletImOnlineError extends Enum {
    readonly isInvalidKey: boolean;
    readonly isDuplicatedHeartbeat: boolean;
    readonly type: 'InvalidKey' | 'DuplicatedHeartbeat';
  }

  /** @name PalletSudoError (365) */
  export interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletTreasuryProposal (366) */
  export interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly beneficiary: AccountId32;
    readonly bond: u128;
  }

  /** @name FrameSupportPalletId (368) */
  export interface FrameSupportPalletId extends U8aFixed {}

  /** @name PalletTreasuryError (369) */
  export interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals';
  }

  /** @name PalletUtilityError (370) */
  export interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletIdentityRegistration (371) */
  export interface PalletIdentityRegistration extends Struct {
    readonly judgements: Vec<ITuple<[u32, PalletIdentityJudgement]>>;
    readonly deposit: u128;
    readonly info: PalletIdentityIdentityInfo;
  }

  /** @name PalletIdentityRegistrarInfo (379) */
  export interface PalletIdentityRegistrarInfo extends Struct {
    readonly account: AccountId32;
    readonly fee: u128;
    readonly fields: PalletIdentityBitFlags;
  }

  /** @name PalletIdentityError (381) */
  export interface PalletIdentityError extends Enum {
    readonly isTooManySubAccounts: boolean;
    readonly isNotFound: boolean;
    readonly isNotNamed: boolean;
    readonly isEmptyIndex: boolean;
    readonly isFeeChanged: boolean;
    readonly isNoIdentity: boolean;
    readonly isStickyJudgement: boolean;
    readonly isJudgementGiven: boolean;
    readonly isInvalidJudgement: boolean;
    readonly isInvalidIndex: boolean;
    readonly isInvalidTarget: boolean;
    readonly isTooManyFields: boolean;
    readonly isTooManyRegistrars: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isNotSub: boolean;
    readonly isNotOwned: boolean;
    readonly type: 'TooManySubAccounts' | 'NotFound' | 'NotNamed' | 'EmptyIndex' | 'FeeChanged' | 'NoIdentity' | 'StickyJudgement' | 'JudgementGiven' | 'InvalidJudgement' | 'InvalidIndex' | 'InvalidTarget' | 'TooManyFields' | 'TooManyRegistrars' | 'AlreadyClaimed' | 'NotSub' | 'NotOwned';
  }

  /** @name CrmlTransactionPaymentReleases (383) */
  export interface CrmlTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name FrameSupportWeightsWeightToFeeCoefficient (385) */
  export interface FrameSupportWeightsWeightToFeeCoefficient extends Struct {
    readonly coeffInteger: u128;
    readonly coeffFrac: Perbill;
    readonly negative: bool;
    readonly degree: u8;
  }

  /** @name CrmlCennzxError (387) */
  export interface CrmlCennzxError extends Enum {
    readonly isEmptyExchangePool: boolean;
    readonly isInsufficientExchangePoolReserve: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isInsufficientLiquidity: boolean;
    readonly isInsufficientTradeAssetBalance: boolean;
    readonly isInsufficientCoreAssetBalance: boolean;
    readonly isCannotTradeZero: boolean;
    readonly isCannotAddLiquidityWithZero: boolean;
    readonly isMinimumBuyRequirementNotMet: boolean;
    readonly isMaximumSellRequirementNotMet: boolean;
    readonly isMinimumTradeAssetRequirementNotMet: boolean;
    readonly isMinimumCoreAssetRequirementNotMet: boolean;
    readonly isMinimumLiquidityRequirementNotMet: boolean;
    readonly isMaximumTradeAssetRequirementNotMet: boolean;
    readonly isAssetCannotSwapForItself: boolean;
    readonly isInvalidAssetId: boolean;
    readonly isOverflow: boolean;
    readonly isDivideByZero: boolean;
    readonly type: 'EmptyExchangePool' | 'InsufficientExchangePoolReserve' | 'InsufficientBalance' | 'InsufficientLiquidity' | 'InsufficientTradeAssetBalance' | 'InsufficientCoreAssetBalance' | 'CannotTradeZero' | 'CannotAddLiquidityWithZero' | 'MinimumBuyRequirementNotMet' | 'MaximumSellRequirementNotMet' | 'MinimumTradeAssetRequirementNotMet' | 'MinimumCoreAssetRequirementNotMet' | 'MinimumLiquidityRequirementNotMet' | 'MaximumTradeAssetRequirementNotMet' | 'AssetCannotSwapForItself' | 'InvalidAssetId' | 'Overflow' | 'DivideByZero';
  }

  /** @name CrmlStakingRewardsTypesEraRewardPoints (389) */
  export interface CrmlStakingRewardsTypesEraRewardPoints extends Struct {
    readonly total: u32;
    readonly individual: BTreeMap<AccountId32, u32>;
  }

  /** @name CrmlNftTokenLockReason (392) */
  export interface CrmlNftTokenLockReason extends Enum {
    readonly isListed: boolean;
    readonly asListed: u128;
    readonly type: 'Listed';
  }

  /** @name CrmlNftMarketplace (396) */
  export interface CrmlNftMarketplace extends Struct {
    readonly account: AccountId32;
    readonly entitlement: Permill;
  }

  /** @name CrmlNftNftAttributeValue (398) */
  export interface CrmlNftNftAttributeValue extends Enum {
    readonly isI32: boolean;
    readonly asI32: i32;
    readonly isU8: boolean;
    readonly asU8: u8;
    readonly isU16: boolean;
    readonly asU16: u16;
    readonly isU32: boolean;
    readonly asU32: u32;
    readonly isU64: boolean;
    readonly asU64: u64;
    readonly isU128: boolean;
    readonly asU128: u128;
    readonly isBytes32: boolean;
    readonly asBytes32: U8aFixed;
    readonly isBytes: boolean;
    readonly asBytes: Bytes;
    readonly isString: boolean;
    readonly asString: Bytes;
    readonly isHash: boolean;
    readonly asHash: U8aFixed;
    readonly isTimestamp: boolean;
    readonly asTimestamp: u64;
    readonly isUrl: boolean;
    readonly asUrl: Bytes;
    readonly type: 'I32' | 'U8' | 'U16' | 'U32' | 'U64' | 'U128' | 'Bytes32' | 'Bytes' | 'String' | 'Hash' | 'Timestamp' | 'Url';
  }

  /** @name CrmlNftListing (400) */
  export interface CrmlNftListing extends Enum {
    readonly isFixedPrice: boolean;
    readonly asFixedPrice: CrmlNftFixedPriceListing;
    readonly isAuction: boolean;
    readonly asAuction: CrmlNftAuctionListing;
    readonly type: 'FixedPrice' | 'Auction';
  }

  /** @name CrmlNftFixedPriceListing (401) */
  export interface CrmlNftFixedPriceListing extends Struct {
    readonly paymentAsset: u32;
    readonly fixedPrice: u128;
    readonly close: u32;
    readonly buyer: Option<AccountId32>;
    readonly seller: AccountId32;
    readonly tokens: Vec<ITuple<[u32, u32, u32]>>;
    readonly royaltiesSchedule: CrmlNftRoyaltiesSchedule;
    readonly marketplaceId: Option<u32>;
  }

  /** @name CrmlNftAuctionListing (402) */
  export interface CrmlNftAuctionListing extends Struct {
    readonly paymentAsset: u32;
    readonly reservePrice: u128;
    readonly close: u32;
    readonly seller: AccountId32;
    readonly tokens: Vec<ITuple<[u32, u32, u32]>>;
    readonly royaltiesSchedule: CrmlNftRoyaltiesSchedule;
    readonly marketplaceId: Option<u32>;
  }

  /** @name CrmlNftError (404) */
  export interface CrmlNftError extends Enum {
    readonly isCollectionIdExists: boolean;
    readonly isCollectionNameInvalid: boolean;
    readonly isNoAvailableIds: boolean;
    readonly isSchemaMaxAttributes: boolean;
    readonly isMaxAttributeLength: boolean;
    readonly isNoPermission: boolean;
    readonly isNoCollection: boolean;
    readonly isNoToken: boolean;
    readonly isNotForFixedPriceSale: boolean;
    readonly isNotForAuction: boolean;
    readonly isTokenListingProtection: boolean;
    readonly isInternalPayment: boolean;
    readonly isRoyaltiesInvalid: boolean;
    readonly isBidTooLow: boolean;
    readonly isMixedBundleSale: boolean;
    readonly isRoyaltiesProtection: boolean;
    readonly isMarketplaceNotRegistered: boolean;
    readonly isNoSeries: boolean;
    readonly isNameAlreadySet: boolean;
    readonly isInvalidMetadataPath: boolean;
    readonly type: 'CollectionIdExists' | 'CollectionNameInvalid' | 'NoAvailableIds' | 'SchemaMaxAttributes' | 'MaxAttributeLength' | 'NoPermission' | 'NoCollection' | 'NoToken' | 'NotForFixedPriceSale' | 'NotForAuction' | 'TokenListingProtection' | 'InternalPayment' | 'RoyaltiesInvalid' | 'BidTooLow' | 'MixedBundleSale' | 'RoyaltiesProtection' | 'MarketplaceNotRegistered' | 'NoSeries' | 'NameAlreadySet' | 'InvalidMetadataPath';
  }

  /** @name CrmlGovernanceProposal (405) */
  export interface CrmlGovernanceProposal extends Struct {
    readonly sponsor: AccountId32;
    readonly justificationUri: Bytes;
    readonly enactmentDelay: u32;
  }

  /** @name CrmlGovernanceProposalVoteInfo (406) */
  export interface CrmlGovernanceProposalVoteInfo extends Struct {
    readonly voteBits: ITuple<[u128, u128]>;
    readonly activeBits: ITuple<[u128, u128]>;
  }

  /** @name CrmlGovernanceProposalStatusInfo (408) */
  export interface CrmlGovernanceProposalStatusInfo extends Enum {
    readonly isDeliberation: boolean;
    readonly isReferendumDeliberation: boolean;
    readonly isApprovedWaitingEnactment: boolean;
    readonly isApprovedEnacted: boolean;
    readonly asApprovedEnacted: bool;
    readonly isApprovedEnactmentCancelled: boolean;
    readonly isDisapproved: boolean;
    readonly isReferendumVetoed: boolean;
    readonly type: 'Deliberation' | 'ReferendumDeliberation' | 'ApprovedWaitingEnactment' | 'ApprovedEnacted' | 'ApprovedEnactmentCancelled' | 'Disapproved' | 'ReferendumVetoed';
  }

  /** @name CrmlEthWalletError (417) */
  export interface CrmlEthWalletError extends Enum {
    readonly isInvalidSignature: boolean;
    readonly isCantPay: boolean;
    readonly type: 'InvalidSignature' | 'CantPay';
  }

  /** @name FpRpcTransactionStatus (420) */
  export interface FpRpcTransactionStatus extends Struct {
    readonly transactionHash: H256;
    readonly transactionIndex: u32;
    readonly from: H160;
    readonly to: Option<H160>;
    readonly contractAddress: Option<H160>;
    readonly logs: Vec<EthereumLog>;
    readonly logsBloom: EthbloomBloom;
  }

  /** @name EthbloomBloom (423) */
  export interface EthbloomBloom extends U8aFixed {}

  /** @name EthereumReceiptReceiptV3 (425) */
  export interface EthereumReceiptReceiptV3 extends Enum {
    readonly isLegacy: boolean;
    readonly asLegacy: EthereumReceiptEip658ReceiptData;
    readonly isEip2930: boolean;
    readonly asEip2930: EthereumReceiptEip658ReceiptData;
    readonly isEip1559: boolean;
    readonly asEip1559: EthereumReceiptEip658ReceiptData;
    readonly type: 'Legacy' | 'Eip2930' | 'Eip1559';
  }

  /** @name EthereumReceiptEip658ReceiptData (426) */
  export interface EthereumReceiptEip658ReceiptData extends Struct {
    readonly statusCode: u8;
    readonly usedGas: U256;
    readonly logsBloom: EthbloomBloom;
    readonly logs: Vec<EthereumLog>;
  }

  /** @name EthereumBlock (427) */
  export interface EthereumBlock extends Struct {
    readonly header: EthereumHeader;
    readonly transactions: Vec<EthereumTransactionTransactionV2>;
    readonly ommers: Vec<EthereumHeader>;
  }

  /** @name EthereumHeader (428) */
  export interface EthereumHeader extends Struct {
    readonly parentHash: H256;
    readonly ommersHash: H256;
    readonly beneficiary: H160;
    readonly stateRoot: H256;
    readonly transactionsRoot: H256;
    readonly receiptsRoot: H256;
    readonly logsBloom: EthbloomBloom;
    readonly difficulty: U256;
    readonly number: U256;
    readonly gasLimit: U256;
    readonly gasUsed: U256;
    readonly timestamp: u64;
    readonly extraData: Bytes;
    readonly mixHash: H256;
    readonly nonce: EthereumTypesHashH64;
  }

  /** @name EthereumTypesHashH64 (429) */
  export interface EthereumTypesHashH64 extends U8aFixed {}

  /** @name PalletEthereumError (434) */
  export interface PalletEthereumError extends Enum {
    readonly isInvalidSignature: boolean;
    readonly isPreLogExists: boolean;
    readonly type: 'InvalidSignature' | 'PreLogExists';
  }

  /** @name PalletEvmError (435) */
  export interface PalletEvmError extends Enum {
    readonly isBalanceLow: boolean;
    readonly isFeeOverflow: boolean;
    readonly isPaymentOverflow: boolean;
    readonly isWithdrawFailed: boolean;
    readonly isGasPriceTooLow: boolean;
    readonly isInvalidNonce: boolean;
    readonly type: 'BalanceLow' | 'FeeOverflow' | 'PaymentOverflow' | 'WithdrawFailed' | 'GasPriceTooLow' | 'InvalidNonce';
  }

  /** @name SpRuntimeMultiSignature (441) */
  export interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name FrameSystemExtensionsCheckSpecVersion (443) */
  export type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (444) */
  export type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (445) */
  export type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (448) */
  export interface FrameSystemExtensionsCheckNonce extends Compact<u64> {}

  /** @name FrameSystemExtensionsCheckWeight (449) */
  export type FrameSystemExtensionsCheckWeight = Null;

  /** @name CrmlTransactionPaymentChargeTransactionPayment (450) */
  export interface CrmlTransactionPaymentChargeTransactionPayment extends Struct {
    readonly tip: Compact<u128>;
    readonly feeExchange: Option<CennznetPrimitivesFeeExchange>;
  }

  /** @name CennznetPrimitivesFeeExchange (452) */
  export interface CennznetPrimitivesFeeExchange extends Enum {
    readonly isV1: boolean;
    readonly asV1: CennznetPrimitivesFeeExchangeV1;
    readonly type: 'V1';
  }

  /** @name CennznetPrimitivesFeeExchangeV1 (453) */
  export interface CennznetPrimitivesFeeExchangeV1 extends Struct {
    readonly assetId: Compact<u32>;
    readonly maxPayment: Compact<u128>;
  }

  /** @name CennznetRuntimeRuntime (455) */
  export type CennznetRuntimeRuntime = Null;

} // declare module
