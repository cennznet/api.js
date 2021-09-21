// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Data, Option, U8aFixed, Vec, bool, u32, u64, u8 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { AttestationTopic, AttestationValue } from '@cennznet/types/interfaces/attestation';
import type { ExchangeKey, FeeRate } from '@cennznet/types/interfaces/cennzx';
import type { EthAddress, EthHash, EventClaimId, EventClaimResult, EventProofId, EventTypeId } from '@cennznet/types/interfaces/ethBridge';
import type { EthyId } from '@cennznet/types/interfaces/ethy';
import type { AssetInfoV41 as AssetInfo } from '@cennznet/types/interfaces/genericAsset';
import type { ProposalId, ProposalStatusInfo, ProposalVoteInfo } from '@cennznet/types/interfaces/governance';
import type { CollectionId, CollectionNameType, Listing, ListingId, MetadataBaseURI, NFTAttributeValue, RoyaltiesSchedule, SerialNumber, SeriesId, TokenCount, TokenId, TokenLockReason } from '@cennznet/types/interfaces/nft';
import type { DeviceId, Group, Message, MessageId, PreKeyBundle, Response, VaultKey, VaultValue } from '@cennznet/types/interfaces/sylo';
import type { BabeEpochConfiguration } from '@cennznet/types/interfaces/system';
import type { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import type { BabeAuthorityWeight, MaybeRandomness, NextConfigDescriptor, Randomness } from '@polkadot/types/interfaces/babe';
import type { BalanceLock } from '@polkadot/types/interfaces/balances';
import type { ProposalIndex } from '@polkadot/types/interfaces/collective';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { Proposal } from '@polkadot/types/interfaces/democracy';
import type { PermissionVersions } from '@polkadot/types/interfaces/genericAsset';
import type { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import type { RegistrarInfo, Registration } from '@polkadot/types/interfaces/identity';
import type { AuthIndex } from '@polkadot/types/interfaces/imOnline';
import type { DeferredOffenceOf, Kind, OffenceDetails, OpaqueTimeSlot, ReportIdOf } from '@polkadot/types/interfaces/offences';
import type { AccountId, AssetId, Balance, BalanceOf, BlockNumber, FixedU128, Hash, KeyTypeId, Moment, OpaqueCall, Perbill, Percent, Releases, Slot, ValidatorId } from '@polkadot/types/interfaces/runtime';
import type { Scheduled, TaskAddress } from '@polkadot/types/interfaces/scheduler';
import type { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import type { ActiveEraInfo, ElectionResult, ElectionScore, ElectionStatus, EraIndex, EraRewardPoints, Exposure, Forcing, Nominations, SlashingSpans, SpanIndex, SpanRecord, StakingLedger, UnappliedSlash, ValidatorPrefs } from '@polkadot/types/interfaces/staking';
import type { AccountInfo, ConsumedWeight, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { TreasuryProposal } from '@polkadot/types/interfaces/treasury';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { Multisig } from '@polkadot/types/interfaces/utility';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    attestation: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * A map from holders to all their attesting issuers
       **/
      issuers: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<AccountId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * A map from (holder, issuer) to attested topics
       **/
      topics: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, AccountId]> | [AccountId | string | Uint8Array, AccountId | string | Uint8Array]) => Observable<Vec<AttestationTopic>>, [ITuple<[AccountId, AccountId]>]> & QueryableStorageEntry<ApiType, [ITuple<[AccountId, AccountId]>]>;
      /**
       * A map from (holder, issuer, topic) to attested values
       **/
      values: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, AccountId, AttestationTopic]> | [AccountId | string | Uint8Array, AccountId | string | Uint8Array, AttestationTopic | AnyNumber | Uint8Array]) => Observable<AttestationValue>, [ITuple<[AccountId, AccountId, AttestationTopic]>]> & QueryableStorageEntry<ApiType, [ITuple<[AccountId, AccountId, AttestationTopic]>]>;
    };
    authorship: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Author of current block.
       **/
      author: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Whether uncles were already set in this block.
       **/
      didSetUncles: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Uncles
       **/
      uncles: AugmentedQuery<ApiType, () => Observable<Vec<UncleEntryItem>>, []> & QueryableStorageEntry<ApiType, []>;
    };
    babe: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Current epoch authorities.
       **/
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Temporary value (cleared at block finalization) that includes the VRF output generated
       * at this block. This field should always be populated during block processing unless
       * secondary plain slots are enabled (which don't contain a VRF output).
       **/
      authorVrfRandomness: AugmentedQuery<ApiType, () => Observable<MaybeRandomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current slot number.
       **/
      currentSlot: AugmentedQuery<ApiType, () => Observable<Slot>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The configuration for the current epoch. Should never be `None` as it is initialized in genesis.
       **/
      epochConfig: AugmentedQuery<ApiType, () => Observable<Option<BabeEpochConfiguration>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current epoch index.
       **/
      epochIndex: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The slot at which the first epoch actually started. This is 0
       * until the first block of the chain.
       **/
      genesisSlot: AugmentedQuery<ApiType, () => Observable<Slot>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Temporary value (cleared at block finalization) which is `Some`
       * if per-block initialization has already been called for current block.
       **/
      initialized: AugmentedQuery<ApiType, () => Observable<Option<MaybeRandomness>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * How late the current block is compared to its parent.
       *
       * This entry is populated as part of block execution and is cleaned up
       * on block finalization. Querying this storage entry outside of block
       * execution context should always yield zero.
       **/
      lateness: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next epoch authorities.
       **/
      nextAuthorities: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The configuration for the next epoch, `None` if the config will not change
       * (you can fallback to `EpochConfig` instead in that case).
       **/
      nextEpochConfig: AugmentedQuery<ApiType, () => Observable<Option<BabeEpochConfiguration>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next epoch randomness.
       **/
      nextRandomness: AugmentedQuery<ApiType, () => Observable<Randomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Pending epoch configuration change that will be applied when the next epoch is enacted.
       **/
      pendingEpochConfigChange: AugmentedQuery<ApiType, () => Observable<Option<NextConfigDescriptor>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The epoch randomness for the *current* epoch.
       *
       * # Security
       *
       * This MUST NOT be used for gambling, as it can be influenced by a
       * malicious validator in the short term. It MAY be used in many
       * cryptographic protocols, however, so long as one remembers that this
       * (like everything else on-chain) it is public. For example, it can be
       * used where a number is needed that cannot have been chosen by an
       * adversary, for purposes such as public-coin zero-knowledge proofs.
       **/
      randomness: AugmentedQuery<ApiType, () => Observable<Randomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Randomness under construction.
       *
       * We make a tradeoff between storage accesses and list length.
       * We store the under-construction randomness in segments of up to
       * `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
       *
       * Once a segment reaches this length, we begin the next one.
       * We reset all segments and return to `0` at the beginning of every
       * epoch.
       **/
      segmentIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
       **/
      underConstruction: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Randomness>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
    };
    cennzx: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Asset Id of the core liquidity asset
       **/
      coreAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Default trading fee rate
       **/
      defaultFeeRate: AugmentedQuery<ApiType, () => Observable<FeeRate>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Liquidity holdings of a user in an exchange pool.
       * Key: `(core_asset_id, trade_asset_id), account_id`
       **/
      liquidityBalance: AugmentedQueryDoubleMap<ApiType, (key1: ExchangeKey, key2: AccountId | string | Uint8Array) => Observable<Balance>, [ExchangeKey, AccountId]> & QueryableStorageEntry<ApiType, [ExchangeKey, AccountId]>;
      /**
       * Total liquidity holdings of all investors in an exchange.
       * ie/ total_liquidity(exchange) == sum(liquidity_balance(exchange, user)) at all times
       **/
      totalLiquidity: AugmentedQuery<ApiType, (arg: ExchangeKey) => Observable<Balance>, [ExchangeKey]> & QueryableStorageEntry<ApiType, [ExchangeKey]>;
    };
    erc20Peg: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Map GA asset Id to ERC20 address
       **/
      assetIdToErc20: AugmentedQuery<ApiType, (arg: AssetId | AnyNumber | Uint8Array) => Observable<Option<EthAddress>>, [AssetId]> & QueryableStorageEntry<ApiType, [AssetId]>;
      /**
       * Whether CENNZ deposits are active
       **/
      cennzDepositsActive: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The peg contract address on Ethereum
       **/
      contractAddress: AugmentedQuery<ApiType, () => Observable<EthAddress>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Whether deposit are active
       **/
      depositsActive: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Metadata for well-known erc20 tokens (symbol, decimals)
       **/
      erc20Meta: AugmentedQuery<ApiType, (arg: EthAddress | string | Uint8Array) => Observable<Option<ITuple<[Bytes, u8]>>>, [EthAddress]> & QueryableStorageEntry<ApiType, [EthAddress]>;
      /**
       * Map ERC20 address to GA asset Id
       **/
      erc20ToAssetId: AugmentedQuery<ApiType, (arg: EthAddress | string | Uint8Array) => Observable<Option<AssetId>>, [EthAddress]> & QueryableStorageEntry<ApiType, [EthAddress]>;
      /**
       * Whether withdrawals are active
       **/
      withdrawalsActive: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
    };
    ethBridge: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Required % of validator support to signal readiness (default: 66%)
       **/
      activationThreshold: AugmentedQuery<ApiType, () => Observable<Percent>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Whether the bridge is paused (for validator transitions)
       **/
      bridgePaused: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Queued event claims, awaiting notarization
       **/
      eventClaims: AugmentedQuery<ApiType, (arg: EventClaimId | AnyNumber | Uint8Array) => Observable<ITuple<[EthHash, EventTypeId]>>, [EventClaimId]> & QueryableStorageEntry<ApiType, [EventClaimId]>;
      /**
       * The minimum number of block confirmations needed to notarize an Ethereum event
       **/
      eventConfirmations: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Event data for a given claim
       **/
      eventData: AugmentedQuery<ApiType, (arg: EventClaimId | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [EventClaimId]> & QueryableStorageEntry<ApiType, [EventClaimId]>;
      /**
       * Events cannot be claimed after this time (seconds)
       **/
      eventDeadlineSeconds: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Notarizations for queued messages
       * Either: None = no notarization exists OR Some(yay/nay)
       **/
      eventNotarizations: AugmentedQueryDoubleMap<ApiType, (key1: EventClaimId | AnyNumber | Uint8Array, key2: EthyId | string | Uint8Array) => Observable<Option<EventClaimResult>>, [EventClaimId, EthyId]> & QueryableStorageEntry<ApiType, [EventClaimId, EthyId]>;
      /**
       * Maps event types seen by the bridge ((contract address, event signature)) to unique type Ids
       **/
      eventTypeToTypeId: AugmentedQuery<ApiType, (arg: ITuple<[EthAddress, EthHash]> | [EthAddress | string | Uint8Array, EthHash | string | Uint8Array]) => Observable<EventTypeId>, [ITuple<[EthAddress, EthHash]>]> & QueryableStorageEntry<ApiType, [ITuple<[EthAddress, EthHash]>]>;
      /**
       * Id of the next Eth bridge event claim
       **/
      nextEventClaimId: AugmentedQuery<ApiType, () => Observable<EventClaimId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Id of the next event type (internal)
       **/
      nextEventTypeId: AugmentedQuery<ApiType, () => Observable<EventTypeId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Scheduled notary (validator) public keys for the next session
       **/
      nextNotaryKeys: AugmentedQuery<ApiType, () => Observable<Vec<EthyId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Id of the next event proof
       **/
      nextProofId: AugmentedQuery<ApiType, () => Observable<EventProofId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Active notary (validator) public keys
       **/
      notaryKeys: AugmentedQuery<ApiType, () => Observable<Vec<EthyId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current validator set id
       **/
      notarySetId: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Processed tx hashes bucketed by unix timestamp (`BUCKET_FACTOR_S`)
       **/
      processedTxBuckets: AugmentedQueryDoubleMap<ApiType, (key1: u64 | AnyNumber | Uint8Array, key2: EthHash | string | Uint8Array) => Observable<ITuple<[]>>, [u64, EthHash]> & QueryableStorageEntry<ApiType, [u64, EthHash]>;
      /**
       * Map from processed tx hash to status
       * Periodically cleared after `EventDeadlineSeconds` expires
       **/
      processedTxHashes: AugmentedQuery<ApiType, (arg: EthHash | string | Uint8Array) => Observable<ITuple<[]>>, [EthHash]> & QueryableStorageEntry<ApiType, [EthHash]>;
      /**
       * Maps event type ids to ((contract address, event signature))
       **/
      typeIdToEventType: AugmentedQuery<ApiType, (arg: EventTypeId | AnyNumber | Uint8Array) => Observable<ITuple<[EthAddress, EthHash]>>, [EventTypeId]> & QueryableStorageEntry<ApiType, [EventTypeId]>;
    };
    genericAsset: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The info for assets
       **/
      assetMeta: AugmentedQuery<ApiType, (arg: AssetId | AnyNumber | Uint8Array) => Observable<AssetInfo>, [AssetId]> & QueryableStorageEntry<ApiType, [AssetId]>;
      /**
       * The free balance of a given asset under an account.
       *
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      freeBalance: AugmentedQueryDoubleMap<ApiType, (key1: AssetId | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Balance>, [AssetId, AccountId]> & QueryableStorageEntry<ApiType, [AssetId, AccountId]>;
      /**
       * Any liquidity locks on some account balances.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AssetId | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>, [AssetId, AccountId]> & QueryableStorageEntry<ApiType, [AssetId, AccountId]>;
      /**
       * Next available ID for user-created asset.
       **/
      nextAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Permission options for a given asset.
       *
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      permissions: AugmentedQuery<ApiType, (arg: AssetId | AnyNumber | Uint8Array) => Observable<PermissionVersions>, [AssetId]> & QueryableStorageEntry<ApiType, [AssetId]>;
      /**
       * The reserved balance of a given asset under an account.
       *
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      reservedBalance: AugmentedQueryDoubleMap<ApiType, (key1: AssetId | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Balance>, [AssetId, AccountId]> & QueryableStorageEntry<ApiType, [AssetId, AccountId]>;
      /**
       * The identity of the asset which is the one that is designated for paying the chain's transaction fee.
       **/
      spendingAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The identity of the asset which is the one that is designated for the chain's staking system.
       **/
      stakingAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Storage version of the pallet.
       *
       * This is set to v1 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Total issuance of a given asset.
       *
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: AssetId | AnyNumber | Uint8Array) => Observable<Balance>, [AssetId]> & QueryableStorageEntry<ApiType, [AssetId]>;
    };
    governance: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Ordered set of active council members
       **/
      council: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next available ID for proposal
       **/
      nextProposalId: AugmentedQuery<ApiType, () => Observable<ProposalId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposal bond amount in 'wei'
       **/
      proposalBond: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map from proposal Id to call if any
       **/
      proposalCalls: AugmentedQuery<ApiType, (arg: ProposalId | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [ProposalId]> & QueryableStorageEntry<ApiType, [ProposalId]>;
      /**
       * Map from proposal Id to proposal info
       **/
      proposals: AugmentedQuery<ApiType, (arg: ProposalId | AnyNumber | Uint8Array) => Observable<Option<Proposal>>, [ProposalId]> & QueryableStorageEntry<ApiType, [ProposalId]>;
      /**
       * Map from proposal Id to status
       **/
      proposalStatus: AugmentedQuery<ApiType, (arg: ProposalId | AnyNumber | Uint8Array) => Observable<Option<ProposalStatusInfo>>, [ProposalId]> & QueryableStorageEntry<ApiType, [ProposalId]>;
      /**
       * Map from proposal Id to votes
       **/
      proposalVotes: AugmentedQuery<ApiType, (arg: ProposalId | AnyNumber | Uint8Array) => Observable<ProposalVoteInfo>, [ProposalId]> & QueryableStorageEntry<ApiType, [ProposalId]>;
    };
    grandpa: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<SetId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<StoredPendingChange>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its
       * members were responsible.
       *
       * TWOX-NOTE: `SetId` is not under user control.
       **/
      setIdSession: AugmentedQuery<ApiType, (arg: SetId | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>, [SetId]> & QueryableStorageEntry<ApiType, [SetId]>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[BlockNumber, BlockNumber]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<StoredState>, []> & QueryableStorageEntry<ApiType, []>;
    };
    identity: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Information that is pertinent to identify the entity behind an account.
       *
       * TWOX-NOTE: OK ― `AccountId` is a secure hash.
       **/
      identityOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Registration>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The set of registrars. Not expected to get very big as can only be added through a
       * special origin (likely a council motion).
       *
       * The index into this can be cast to `RegistrarIndex` to get a valid value.
       **/
      registrars: AugmentedQuery<ApiType, () => Observable<Vec<Option<RegistrarInfo>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Alternative "sub" identities of this account.
       *
       * The first item is the deposit, the second is a vector of the accounts.
       *
       * TWOX-NOTE: OK ― `AccountId` is a secure hash.
       **/
      subsOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ITuple<[BalanceOf, Vec<AccountId>]>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The super-identity of an alternative "sub" identity together with its name, within that
       * context. If the account is not some other account's sub-identity, then just `None`.
       **/
      superOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<ITuple<[AccountId, Data]>>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
    };
    imOnline: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * For each session index, we keep a mapping of `ValidatorId<T>` to the
       * number of blocks authored by the given authority.
       **/
      authoredBlocks: AugmentedQueryDoubleMap<ApiType, (key1: SessionIndex | AnyNumber | Uint8Array, key2: ValidatorId | string | Uint8Array) => Observable<u32>, [SessionIndex, ValidatorId]> & QueryableStorageEntry<ApiType, [SessionIndex, ValidatorId]>;
      /**
       * The block number after which it's ok to send heartbeats in current session.
       *
       * At the beginning of each session we set this to a value that should
       * fall roughly in the middle of the session duration.
       * The idea is to first wait for the validators to produce a block
       * in the current session, so that the heartbeat later on will not be necessary.
       **/
      heartbeatAfter: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current set of keys that may issue a heartbeat.
       **/
      keys: AugmentedQuery<ApiType, () => Observable<Vec<AuthorityId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * For each session index, we keep a mapping of `AuthIndex` to
       * `offchain::OpaqueNetworkState`.
       **/
      receivedHeartbeats: AugmentedQueryDoubleMap<ApiType, (key1: SessionIndex | AnyNumber | Uint8Array, key2: AuthIndex | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [SessionIndex, AuthIndex]> & QueryableStorageEntry<ApiType, [SessionIndex, AuthIndex]>;
    };
    multisig: {
      [key: string]: QueryableStorageEntry<ApiType>;
      calls: AugmentedQuery<ApiType, (arg: U8aFixed | string | Uint8Array) => Observable<Option<ITuple<[OpaqueCall, AccountId, BalanceOf]>>>, [U8aFixed]> & QueryableStorageEntry<ApiType, [U8aFixed]>;
      /**
       * The set of open multisig operations.
       **/
      multisigs: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: U8aFixed | string | Uint8Array) => Observable<Option<Multisig>>, [AccountId, U8aFixed]> & QueryableStorageEntry<ApiType, [AccountId, U8aFixed]>;
    };
    nft: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Map from collection to a base metadata URI for its token's offchain attributes
       **/
      collectionMetadataUri: AugmentedQuery<ApiType, (arg: CollectionId | AnyNumber | Uint8Array) => Observable<Option<MetadataBaseURI>>, [CollectionId]> & QueryableStorageEntry<ApiType, [CollectionId]>;
      /**
       * Map from collection to its human friendly name
       **/
      collectionName: AugmentedQuery<ApiType, (arg: CollectionId | AnyNumber | Uint8Array) => Observable<CollectionNameType>, [CollectionId]> & QueryableStorageEntry<ApiType, [CollectionId]>;
      /**
       * Map from collection to owner address
       **/
      collectionOwner: AugmentedQuery<ApiType, (arg: CollectionId | AnyNumber | Uint8Array) => Observable<Option<AccountId>>, [CollectionId]> & QueryableStorageEntry<ApiType, [CollectionId]>;
      /**
       * Map from collection to its defacto royalty scheme
       **/
      collectionRoyalties: AugmentedQuery<ApiType, (arg: CollectionId | AnyNumber | Uint8Array) => Observable<Option<RoyaltiesSchedule>>, [CollectionId]> & QueryableStorageEntry<ApiType, [CollectionId]>;
      /**
       * Demarcates a series limited to exactly one token
       **/
      isSingleIssue: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | AnyNumber | Uint8Array, key2: SeriesId | AnyNumber | Uint8Array) => Observable<bool>, [CollectionId, SeriesId]> & QueryableStorageEntry<ApiType, [CollectionId, SeriesId]>;
      /**
       * Block numbers where listings will close. Value is `true` if at block number `listing_id` is scheduled to close.
       **/
      listingEndSchedule: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: ListingId | AnyNumber | Uint8Array) => Observable<bool>, [BlockNumber, ListingId]> & QueryableStorageEntry<ApiType, [BlockNumber, ListingId]>;
      /**
       * NFT sale/auction listings keyed by collection id and token id
       **/
      listings: AugmentedQuery<ApiType, (arg: ListingId | AnyNumber | Uint8Array) => Observable<Option<Listing>>, [ListingId]> & QueryableStorageEntry<ApiType, [ListingId]>;
      /**
       * Winning bids on open listings. keyed by collection id and token id
       **/
      listingWinningBid: AugmentedQuery<ApiType, (arg: ListingId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[AccountId, Balance]>>>, [ListingId]> & QueryableStorageEntry<ApiType, [ListingId]>;
      /**
       * The next available collection Id
       **/
      nextCollectionId: AugmentedQuery<ApiType, () => Observable<CollectionId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The next available listing Id
       **/
      nextListingId: AugmentedQuery<ApiType, () => Observable<ListingId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The next available serial number in a given (collection, series)
       **/
      nextSerialNumber: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | AnyNumber | Uint8Array, key2: SeriesId | AnyNumber | Uint8Array) => Observable<SerialNumber>, [CollectionId, SeriesId]> & QueryableStorageEntry<ApiType, [CollectionId, SeriesId]>;
      /**
       * The next group Id within an NFT collection
       * It is used as material to generate the global `TokenId`
       **/
      nextSeriesId: AugmentedQuery<ApiType, (arg: CollectionId | AnyNumber | Uint8Array) => Observable<SeriesId>, [CollectionId]> & QueryableStorageEntry<ApiType, [CollectionId]>;
      /**
       * Map from collection to any open listings
       **/
      openCollectionListings: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | AnyNumber | Uint8Array, key2: ListingId | AnyNumber | Uint8Array) => Observable<bool>, [CollectionId, ListingId]> & QueryableStorageEntry<ApiType, [CollectionId, ListingId]>;
      /**
       * Map from (collection, series) to its attributes
       **/
      seriesAttributes: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | AnyNumber | Uint8Array, key2: SeriesId | AnyNumber | Uint8Array) => Observable<Vec<NFTAttributeValue>>, [CollectionId, SeriesId]> & QueryableStorageEntry<ApiType, [CollectionId, SeriesId]>;
      /**
       * Map from a (collection, series) to its total issuance
       **/
      seriesIssuance: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | AnyNumber | Uint8Array, key2: SeriesId | AnyNumber | Uint8Array) => Observable<TokenCount>, [CollectionId, SeriesId]> & QueryableStorageEntry<ApiType, [CollectionId, SeriesId]>;
      /**
       * Map from a token series to its metadata URI path. This should be joined wih the collection base path
       **/
      seriesMetadataUri: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | AnyNumber | Uint8Array, key2: SeriesId | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [CollectionId, SeriesId]> & QueryableStorageEntry<ApiType, [CollectionId, SeriesId]>;
      /**
       * Map from (collection, series) to configured royalties schedule
       **/
      seriesRoyalties: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | AnyNumber | Uint8Array, key2: SeriesId | AnyNumber | Uint8Array) => Observable<Option<RoyaltiesSchedule>>, [CollectionId, SeriesId]> & QueryableStorageEntry<ApiType, [CollectionId, SeriesId]>;
      /**
       * Version of this module's storage schema
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map from a token to lock status if any
       **/
      tokenLocks: AugmentedQuery<ApiType, (arg: TokenId) => Observable<Option<TokenLockReason>>, [TokenId]> & QueryableStorageEntry<ApiType, [TokenId]>;
      /**
       * Map from a token to its owner
       * The token Id is split in this map to allow better indexing (collection, series) + (serial number)
       **/
      tokenOwner: AugmentedQueryDoubleMap<ApiType, (key1: ITuple<[CollectionId, SeriesId]> | [CollectionId | AnyNumber | Uint8Array, SeriesId | AnyNumber | Uint8Array], key2: SerialNumber | AnyNumber | Uint8Array) => Observable<AccountId>, [ITuple<[CollectionId, SeriesId]>, SerialNumber]> & QueryableStorageEntry<ApiType, [ITuple<[CollectionId, SeriesId]>, SerialNumber]>;
    };
    offences: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * A vector of reports of the same kind that happened at the same time slot.
       **/
      concurrentReportsIndex: AugmentedQueryDoubleMap<ApiType, (key1: Kind | string | Uint8Array, key2: OpaqueTimeSlot | string | Uint8Array) => Observable<Vec<ReportIdOf>>, [Kind, OpaqueTimeSlot]> & QueryableStorageEntry<ApiType, [Kind, OpaqueTimeSlot]>;
      /**
       * Deferred reports that have been rejected by the offence handler and need to be submitted
       * at a later time.
       **/
      deferredOffences: AugmentedQuery<ApiType, () => Observable<Vec<DeferredOffenceOf>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The primary structure that holds all offence records keyed by report identifiers.
       **/
      reports: AugmentedQuery<ApiType, (arg: ReportIdOf | string | Uint8Array) => Observable<Option<OffenceDetails>>, [ReportIdOf]> & QueryableStorageEntry<ApiType, [ReportIdOf]>;
      /**
       * Enumerates all reports of a kind along with the time they happened.
       *
       * All reports are sorted by the time of offence.
       *
       * Note that the actual type of this mapping is `Vec<u8>`, this is because values of
       * different types are not supported at the moment so we are doing the manual serialization.
       **/
      reportsByKindIndex: AugmentedQuery<ApiType, (arg: Kind | string | Uint8Array) => Observable<Bytes>, [Kind]> & QueryableStorageEntry<ApiType, [Kind]>;
    };
    randomnessCollectiveFlip: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
    };
    rewards: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Inflation rate % to apply on reward payouts
       **/
      baseInflationRate: AugmentedQuery<ApiType, () => Observable<FixedU128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Authorship rewards for the current active era.
       **/
      currentEraRewardPoints: AugmentedQuery<ApiType, () => Observable<EraRewardPoints>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Development fund % take for reward payouts, parts-per-billion
       **/
      developmentFundTake: AugmentedQuery<ApiType, () => Observable<Perbill>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The staking era index that specifies the start of a fiscal era based on which
       * we can calculate the start of other fiscal eras. This is either 0 or forced by SUDO to
       * another value. Have a look at force_new_fiscal_era for more info.
       **/
      fiscalEraEpoch: AugmentedQuery<ApiType, () => Observable<EraIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * When true the next staking era will become the start of a new fiscal era.
       **/
      forceFiscalEra: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Where the reward payment should be made. Keyed by stash.
       **/
      payee: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountId>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The era index for current payouts
       **/
      scheduledPayoutEra: AugmentedQuery<ApiType, () => Observable<EraIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Upcoming reward payouts scheduled for block number to a validator and it's stakers of amount earned in era
       **/
      scheduledPayouts: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Option<ITuple<[AccountId, BalanceOf]>>>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * The amount of new reward tokens that will be minted on every staking era in order to
       * approximate the inflation rate. We calculate the target inflation based on
       * T::CurrencyToReward::TotalIssuance() at the beginning of a fiscal era.
       **/
      targetInflationPerStakingEra: AugmentedQuery<ApiType, () => Observable<BalanceOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Accumulated transaction fees for reward payout
       **/
      transactionFeePot: AugmentedQuery<ApiType, () => Observable<BalanceOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Historic accumulated transaction fees on reward payout
       **/
      transactionFeePotHistory: AugmentedQuery<ApiType, () => Observable<Vec<BalanceOf>>, []> & QueryableStorageEntry<ApiType, []>;
    };
    scheduler: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Items to be executed, indexed by the block number that they should be executed on.
       **/
      agenda: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Vec<Option<Scheduled>>>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * Lookup from identity to the block number and index of the task.
       **/
      lookup: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<TaskAddress>>, [Bytes]> & QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Storage version of the pallet.
       *
       * New networks start with last version.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
    };
    session: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Current index of the session.
       **/
      currentIndex: AugmentedQuery<ApiType, () => Observable<SessionIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Indices of disabled validators.
       *
       * The set is cleared when `on_session_ending` returns a new set of identities.
       **/
      disabledValidators: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The owner of a key. The key is the `KeyTypeId` + the encoded key.
       **/
      keyOwner: AugmentedQuery<ApiType, (arg: ITuple<[KeyTypeId, Bytes]> | [KeyTypeId | AnyNumber | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<ValidatorId>>, [ITuple<[KeyTypeId, Bytes]>]> & QueryableStorageEntry<ApiType, [ITuple<[KeyTypeId, Bytes]>]>;
      /**
       * The next session keys for a validator.
       **/
      nextKeys: AugmentedQuery<ApiType, (arg: ValidatorId | string | Uint8Array) => Observable<Option<Keys>>, [ValidatorId]> & QueryableStorageEntry<ApiType, [ValidatorId]>;
      /**
       * True if the underlying economic identities or weighting behind the validators
       * has changed in the queued validator set.
       **/
      queuedChanged: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The queued keys for the next session. When the next session begins, these keys
       * will be used to determine the validator's session keys.
       **/
      queuedKeys: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[ValidatorId, Keys]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current set of validators.
       **/
      validators: AugmentedQuery<ApiType, () => Observable<Vec<ValidatorId>>, []> & QueryableStorageEntry<ApiType, []>;
    };
    staking: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The active era information, it holds index and start.
       *
       * The active era is the era currently rewarded.
       * Validator set of this era must be equal to `SessionInterface::validators`.
       **/
      activeEra: AugmentedQuery<ApiType, () => Observable<Option<ActiveEraInfo>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map from all locked "stash" accounts to the controller account.
       **/
      bonded: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AccountId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * A mapping from still-bonded eras to the first session index of that era.
       *
       * Must contains information for eras for the range:
       * `[active_era - bounding_duration; active_era]`
       **/
      bondedEras: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[EraIndex, SessionIndex]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current era index.
       **/
      currentEra: AugmentedQuery<ApiType, () => Observable<Option<EraIndex>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The earliest era for which we have a pending, unapplied slash.
       **/
      earliestUnappliedSlash: AugmentedQuery<ApiType, () => Observable<Option<EraIndex>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Flag to control the execution of the offchain election. When `Open(_)`, we accept
       * solutions to be submitted.
       **/
      eraElectionStatus: AugmentedQuery<ApiType, () => Observable<ElectionStatus>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Exposure of validator at era.
       *
       * This is keyed first by the era index to allow bulk deletion and then the stash account.
       *
       * Is it removed after `HISTORY_DEPTH` eras.
       * If stakers hasn't been set or has been removed then empty exposure is returned.
       **/
      erasStakers: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Exposure>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * Clipped Exposure of validator at era.
       *
       * This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
       * `T::MaxNominatorRewardedPerValidator` biggest stakers.
       * (Note: the field `total` and `own` of the exposure remains unchanged).
       * This is used to limit the i/o cost for the nominator payout.
       *
       * This is keyed fist by the era index to allow bulk deletion and then the stash account.
       *
       * Is it removed after `HISTORY_DEPTH` eras.
       * If stakers hasn't been set or has been removed then empty exposure is returned.
       **/
      erasStakersClipped: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Exposure>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * The session index at which the era start for the last `HISTORY_DEPTH` eras.
       **/
      erasStartSessionIndex: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * The total amount staked for the last `HISTORY_DEPTH` eras.
       * If total hasn't been set or has been removed then 0 stake is returned.
       **/
      erasTotalStake: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<BalanceOf>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * Similar to `ErasStakers`, this holds the preferences of validators.
       *
       * This is keyed first by the era index to allow bulk deletion and then the stash account.
       *
       * Is it removed after `HISTORY_DEPTH` eras.
       **/
      erasValidatorPrefs: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<ValidatorPrefs>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * True if the next session change will be a new era regardless of index.
       **/
      forceEra: AugmentedQuery<ApiType, () => Observable<Forcing>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of eras to keep in history.
       *
       * Information is kept for eras in `[current_era - history_depth; current_era]`.
       *
       * Must be more than the number of eras delayed by session otherwise. I.e. active era must
       * always be in history. I.e. `active_era > current_era - history_depth` must be
       * guaranteed.
       **/
      historyDepth: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
       * easy to initialize and the performance hit is minimal (we expect no more than four
       * invulnerables) and restricted to testnets.
       **/
      invulnerables: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * NOTE:!! this is poorly named.
       * True if the _active_ session (session_index) is final (last in the era). Note that this does not take era
       * forcing into accoun
       **/
      isActiveSessionFinal: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * NOTE:!! this is poorly named.
       * True if the **planned** session (session_index + 1) is final (last in the era). Note that this does not take era
       * forcing into account
       **/
      isCurrentSessionFinal: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map from all (unlocked) "controller" accounts to the info regarding the staking.
       **/
      ledger: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<StakingLedger>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Minimum amount to bond.
       **/
      minimumBond: AugmentedQuery<ApiType, () => Observable<BalanceOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Minimum number of staking participants before emergency conditions are imposed.
       **/
      minimumValidatorCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The map from nominator stash key to the set of stash keys of all validators to nominate.
       **/
      nominators: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Nominations>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * All slashing events on nominators, mapped by era to the highest slash value of the era.
       **/
      nominatorSlashInEra: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Option<BalanceOf>>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * The next validator set. At the end of an era, if this is available (potentially from the
       * result of an offchain worker), it is immediately used. Otherwise, the on-chain election
       * is executed.
       **/
      queuedElected: AugmentedQuery<ApiType, () => Observable<Option<ElectionResult>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The score of the current [`QueuedElected`].
       **/
      queuedScore: AugmentedQuery<ApiType, () => Observable<Option<ElectionScore>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Slashing spans for stash accounts.
       **/
      slashingSpans: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<SlashingSpans>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * The percentage of the slash that is distributed to reporters.
       *
       * The rest of the slashed value is handled by the `Slash`.
       **/
      slashRewardFraction: AugmentedQuery<ApiType, () => Observable<Perbill>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Snapshot of nominators at the beginning of the current election window. This should only
       * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
       **/
      snapshotNominators: AugmentedQuery<ApiType, () => Observable<Option<Vec<AccountId>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Snapshot of validators at the beginning of the current election window. This should only
       * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
       **/
      snapshotValidators: AugmentedQuery<ApiType, () => Observable<Option<Vec<AccountId>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Records information about the maximum slash of a stash within a slashing span,
       * as well as how much reward has been paid out.
       **/
      spanSlash: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, SpanIndex]> | [AccountId | string | Uint8Array, SpanIndex | AnyNumber | Uint8Array]) => Observable<SpanRecord>, [ITuple<[AccountId, SpanIndex]>]> & QueryableStorageEntry<ApiType, [ITuple<[AccountId, SpanIndex]>]>;
      /**
       * True if network has been upgraded to this version.
       * Storage version of the pallet.
       *
       * This is set to v2 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * All unapplied slashes that are queued for later.
       **/
      unappliedSlashes: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<Vec<UnappliedSlash>>, [EraIndex]> & QueryableStorageEntry<ApiType, [EraIndex]>;
      /**
       * The ideal number of staking participants.
       **/
      validatorCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The map from (wannabe) validator stash key to the preferences of that validator.
       **/
      validators: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ValidatorPrefs>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * All slashing events on validators, mapped by era to the highest slash proportion
       * and slash value of the era.
       **/
      validatorSlashInEra: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Option<ITuple<[Perbill, BalanceOf]>>>, [EraIndex, AccountId]> & QueryableStorageEntry<ApiType, [EraIndex, AccountId]>;
      /**
       * Same as `will_era_be_forced()` but persists to `end_era`
       **/
      wasEndEraForced: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
    };
    sudo: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId>, []> & QueryableStorageEntry<ApiType, []>;
    };
    syloDevice: {
      [key: string]: QueryableStorageEntry<ApiType>;
      devices: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<DeviceId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
    };
    syloE2Ee: {
      [key: string]: QueryableStorageEntry<ApiType>;
      preKeyBundles: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, DeviceId]> | [AccountId | string | Uint8Array, DeviceId | AnyNumber | Uint8Array]) => Observable<Vec<PreKeyBundle>>, [ITuple<[AccountId, DeviceId]>]> & QueryableStorageEntry<ApiType, [ITuple<[AccountId, DeviceId]>]>;
    };
    syloGroups: {
      [key: string]: QueryableStorageEntry<ApiType>;
      groups: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Group>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Stores the known member/deviceId tuples for a particular group
       **/
      memberDevices: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[AccountId, DeviceId]>>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * Stores the group ids that a user is a member of
       **/
      memberships: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<Hash>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
    };
    syloInbox: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextIndexes: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<MessageId>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      values: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<ITuple<[MessageId, Message]>>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
    };
    syloResponse: {
      [key: string]: QueryableStorageEntry<ApiType>;
      responses: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, Hash]> | [AccountId | string | Uint8Array, Hash | string | Uint8Array]) => Observable<Response>, [ITuple<[AccountId, Hash]>]> & QueryableStorageEntry<ApiType, [ITuple<[AccountId, Hash]>]>;
    };
    syloVault: {
      [key: string]: QueryableStorageEntry<ApiType>;
      vault: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<ITuple<[VaultKey, VaultValue]>>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
    };
    system: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountInfo>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Hash>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<ConsumedWeight>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<DigestOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<EventIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Events deposited for the current block.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<EventRecord>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Mapping between a topic (represented by T::Hash) and a vector of indexes
       * of events in the `<Events<T>>` list.
       *
       * All topic vectors have deterministic storage locations depending on the topic. This
       * allows light-clients to leverage the changes trie storage tracking mechanism and
       * in case of changes fetch the list of events of interest.
       *
       * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
       * the `EventIndex` then in case if the topic has the same contents on the next block
       * no notification will be triggered thus the event might be lost.
       **/
      eventTopics: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[BlockNumber, EventIndex]>>>, [Hash]> & QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<Phase>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
       **/
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<LastRuntimeUpgradeInfo>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<Hash>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
       * (default) if not.
       **/
      upgradedToDualRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
       **/
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
    };
    timestamp: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>, []> & QueryableStorageEntry<ApiType, []>;
    };
    transactionPayment: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>, []> & QueryableStorageEntry<ApiType, []>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
    };
    treasury: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Proposal indices that have been approved but not yet awarded.
       **/
      approvals: AugmentedQuery<ApiType, () => Observable<Vec<ProposalIndex>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of proposals that have been made.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<ProposalIndex>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals that have been made.
       **/
      proposals: AugmentedQuery<ApiType, (arg: ProposalIndex | AnyNumber | Uint8Array) => Observable<Option<TreasuryProposal>>, [ProposalIndex]> & QueryableStorageEntry<ApiType, [ProposalIndex]>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
