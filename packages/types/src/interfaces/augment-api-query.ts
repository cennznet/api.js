// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Data, Option, U8aFixed, Vec, bool, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { AttestationTopic, AttestationValue } from '@cennznet/types/interfaces/attestation';
import type { ExchangeKey, FeeRate } from '@cennznet/types/interfaces/cennzx';
import type { AssetInfo } from '@cennznet/types/interfaces/genericAsset';
import type { CollectionId, Listing, NFTAttributeValue, NFTSchema, RoyaltiesSchedule, TokenId } from '@cennznet/types/interfaces/nft';
import type { VecDeque } from '@cennznet/types/interfaces/staking';
import type { DeviceId, Group, Message, MessageId, PreKeyBundle, Response, VaultKey, VaultValue } from '@cennznet/types/interfaces/sylo';
import type { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import type { BabeAuthorityWeight, MaybeRandomness, NextConfigDescriptor, Randomness } from '@polkadot/types/interfaces/babe';
import type { BalanceLock } from '@polkadot/types/interfaces/balances';
import type { ProposalIndex } from '@polkadot/types/interfaces/collective';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { PermissionVersions } from '@polkadot/types/interfaces/genericAsset';
import type { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import type { RegistrarInfo, Registration } from '@polkadot/types/interfaces/identity';
import type { AuthIndex } from '@polkadot/types/interfaces/imOnline';
import type { DeferredOffenceOf, Kind, OffenceDetails, OpaqueTimeSlot, ReportIdOf } from '@polkadot/types/interfaces/offences';
import type { AccountId, AssetId, Balance, BalanceOf, BlockNumber, ExtrinsicsWeight, FixedU128, Hash, KeyTypeId, Moment, OpaqueCall, Perbill, Releases, ValidatorId } from '@polkadot/types/interfaces/runtime';
import type { Scheduled, TaskAddress } from '@polkadot/types/interfaces/scheduler';
import type { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import type { ActiveEraInfo, ElectionResult, ElectionScore, ElectionStatus, EraIndex, EraRewardPoints, Exposure, Forcing, Nominations, SlashingSpans, SpanIndex, SpanRecord, StakingLedger, UnappliedSlash, ValidatorPrefs } from '@polkadot/types/interfaces/staking';
import type { AccountInfo, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { Bounty, BountyIndex, OpenTip, TreasuryProposal } from '@polkadot/types/interfaces/treasury';
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
      issuers: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<AccountId>>> & QueryableStorageEntry<ApiType>;
      /**
       * A map from (holder, issuer) to attested topics
       **/
      topics: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, AccountId]> | [AccountId | string | Uint8Array, AccountId | string | Uint8Array]) => Observable<Vec<AttestationTopic>>> & QueryableStorageEntry<ApiType>;
      /**
       * A map from (holder, issuer, topic) to attested values
       **/
      values: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, AccountId, AttestationTopic]> | [AccountId | string | Uint8Array, AccountId | string | Uint8Array, AttestationTopic | AnyNumber | Uint8Array]) => Observable<AttestationValue>> & QueryableStorageEntry<ApiType>;
    };
    authorship: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Author of current block.
       **/
      author: AugmentedQuery<ApiType, () => Observable<Option<AccountId>>> & QueryableStorageEntry<ApiType>;
      /**
       * Whether uncles were already set in this block.
       **/
      didSetUncles: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Uncles
       **/
      uncles: AugmentedQuery<ApiType, () => Observable<Vec<UncleEntryItem>>> & QueryableStorageEntry<ApiType>;
    };
    babe: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Current epoch authorities.
       **/
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Temporary value (cleared at block finalization) that includes the VRF output generated
       * at this block. This field should always be populated during block processing unless
       * secondary plain slots are enabled (which don't contain a VRF output).
       **/
      authorVrfRandomness: AugmentedQuery<ApiType, () => Observable<MaybeRandomness>> & QueryableStorageEntry<ApiType>;
      /**
       * Current slot number.
       **/
      currentSlot: AugmentedQuery<ApiType, () => Observable<u64>> & QueryableStorageEntry<ApiType>;
      /**
       * Current epoch index.
       **/
      epochIndex: AugmentedQuery<ApiType, () => Observable<u64>> & QueryableStorageEntry<ApiType>;
      /**
       * The slot at which the first epoch actually started. This is 0
       * until the first block of the chain.
       **/
      genesisSlot: AugmentedQuery<ApiType, () => Observable<u64>> & QueryableStorageEntry<ApiType>;
      /**
       * Temporary value (cleared at block finalization) which is `Some`
       * if per-block initialization has already been called for current block.
       **/
      initialized: AugmentedQuery<ApiType, () => Observable<Option<MaybeRandomness>>> & QueryableStorageEntry<ApiType>;
      /**
       * How late the current block is compared to its parent.
       * 
       * This entry is populated as part of block execution and is cleaned up
       * on block finalization. Querying this storage entry outside of block
       * execution context should always yield zero.
       **/
      lateness: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      /**
       * Next epoch configuration, if changed.
       **/
      nextEpochConfig: AugmentedQuery<ApiType, () => Observable<Option<NextConfigDescriptor>>> & QueryableStorageEntry<ApiType>;
      /**
       * Next epoch randomness.
       **/
      nextRandomness: AugmentedQuery<ApiType, () => Observable<Randomness>> & QueryableStorageEntry<ApiType>;
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
      randomness: AugmentedQuery<ApiType, () => Observable<Randomness>> & QueryableStorageEntry<ApiType>;
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
      segmentIndex: AugmentedQuery<ApiType, () => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
       **/
      underConstruction: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Randomness>>> & QueryableStorageEntry<ApiType>;
    };
    cennzx: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Asset Id of the core liquidity asset
       **/
      coreAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>> & QueryableStorageEntry<ApiType>;
      /**
       * Default trading fee rate
       **/
      defaultFeeRate: AugmentedQuery<ApiType, () => Observable<FeeRate>> & QueryableStorageEntry<ApiType>;
      /**
       * Liquidity holdings of a user in an exchange pool.
       * Key: `(core_asset_id, trade_asset_id), account_id`
       **/
      liquidityBalance: AugmentedQueryDoubleMap<ApiType, (key1: ExchangeKey, key2: AccountId | string | Uint8Array) => Observable<BalanceOf>> & QueryableStorageEntry<ApiType>;
      /**
       * Total liquidity holdings of all investors in an exchange.
       * ie/ total_liquidity(exchange) == sum(liquidity_balance(exchange, user)) at all times
       **/
      totalLiquidity: AugmentedQuery<ApiType, (arg: ExchangeKey) => Observable<BalanceOf>> & QueryableStorageEntry<ApiType>;
    };
    genericAsset: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The info for assets
       **/
      assetMeta: AugmentedQuery<ApiType, (arg: AssetId | AnyNumber | Uint8Array) => Observable<AssetInfo>> & QueryableStorageEntry<ApiType>;
      /**
       * The free balance of a given asset under an account.
       * 
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      freeBalance: AugmentedQueryDoubleMap<ApiType, (key1: AssetId | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks on some account balances.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * Next available ID for user-created asset.
       **/
      nextAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>> & QueryableStorageEntry<ApiType>;
      /**
       * Permission options for a given asset.
       * 
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      permissions: AugmentedQuery<ApiType, (arg: AssetId | AnyNumber | Uint8Array) => Observable<PermissionVersions>> & QueryableStorageEntry<ApiType>;
      /**
       * The reserved balance of a given asset under an account.
       * 
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      reservedBalance: AugmentedQueryDoubleMap<ApiType, (key1: AssetId | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
      /**
       * The identity of the asset which is the one that is designated for paying the chain's transaction fee.
       **/
      spendingAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>> & QueryableStorageEntry<ApiType>;
      /**
       * The identity of the asset which is the one that is designated for the chain's staking system.
       **/
      stakingAssetId: AugmentedQuery<ApiType, () => Observable<AssetId>> & QueryableStorageEntry<ApiType>;
      /**
       * Total issuance of a given asset.
       * 
       * TWOX-NOTE: `AssetId` is trusted.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: AssetId | AnyNumber | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    grandpa: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<SetId>> & QueryableStorageEntry<ApiType>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>> & QueryableStorageEntry<ApiType>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<StoredPendingChange>>> & QueryableStorageEntry<ApiType>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its
       * members were responsible.
       * 
       * TWOX-NOTE: `SetId` is not under user control.
       **/
      setIdSession: AugmentedQuery<ApiType, (arg: SetId | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>> & QueryableStorageEntry<ApiType>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[BlockNumber, BlockNumber]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<StoredState>> & QueryableStorageEntry<ApiType>;
    };
    identity: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Information that is pertinent to identify the entity behind an account.
       * 
       * TWOX-NOTE: OK ― `AccountId` is a secure hash.
       **/
      identityOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Registration>>> & QueryableStorageEntry<ApiType>;
      /**
       * The set of registrars. Not expected to get very big as can only be added through a
       * special origin (likely a council motion).
       * 
       * The index into this can be cast to `RegistrarIndex` to get a valid value.
       **/
      registrars: AugmentedQuery<ApiType, () => Observable<Vec<Option<RegistrarInfo>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Alternative "sub" identities of this account.
       * 
       * The first item is the deposit, the second is a vector of the accounts.
       * 
       * TWOX-NOTE: OK ― `AccountId` is a secure hash.
       **/
      subsOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ITuple<[BalanceOf, Vec<AccountId>]>>> & QueryableStorageEntry<ApiType>;
      /**
       * The super-identity of an alternative "sub" identity together with its name, within that
       * context. If the account is not some other account's sub-identity, then just `None`.
       **/
      superOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<ITuple<[AccountId, Data]>>>> & QueryableStorageEntry<ApiType>;
    };
    imOnline: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * For each session index, we keep a mapping of `T::ValidatorId` to the
       * number of blocks authored by the given authority.
       **/
      authoredBlocks: AugmentedQueryDoubleMap<ApiType, (key1: SessionIndex | AnyNumber | Uint8Array, key2: ValidatorId | string | Uint8Array) => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * The block number after which it's ok to send heartbeats in current session.
       * 
       * At the beginning of each session we set this to a value that should
       * fall roughly in the middle of the session duration.
       * The idea is to first wait for the validators to produce a block
       * in the current session, so that the heartbeat later on will not be necessary.
       **/
      heartbeatAfter: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      /**
       * The current set of keys that may issue a heartbeat.
       **/
      keys: AugmentedQuery<ApiType, () => Observable<Vec<AuthorityId>>> & QueryableStorageEntry<ApiType>;
      /**
       * For each session index, we keep a mapping of `AuthIndex` to
       * `offchain::OpaqueNetworkState`.
       **/
      receivedHeartbeats: AugmentedQueryDoubleMap<ApiType, (key1: SessionIndex | AnyNumber | Uint8Array, key2: AuthIndex | AnyNumber | Uint8Array) => Observable<Option<Bytes>>> & QueryableStorageEntry<ApiType>;
    };
    multisig: {
      [key: string]: QueryableStorageEntry<ApiType>;
      calls: AugmentedQuery<ApiType, (arg: U8aFixed | string | Uint8Array) => Observable<Option<ITuple<[OpaqueCall, AccountId, BalanceOf]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * The set of open multisig operations.
       **/
      multisigs: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: U8aFixed | string | Uint8Array) => Observable<Option<Multisig>>> & QueryableStorageEntry<ApiType>;
    };
    nft: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Map from collection to owner address
       **/
      collectionOwner: AugmentedQuery<ApiType, (arg: CollectionId | string) => Observable<Option<AccountId>>> & QueryableStorageEntry<ApiType>;
      /**
       * Map from collection to it's defacto royalty scheme
       **/
      collectionRoyalties: AugmentedQuery<ApiType, (arg: CollectionId | string) => Observable<Option<RoyaltiesSchedule>>> & QueryableStorageEntry<ApiType>;
      /**
       * Map from collection to its schema definition
       **/
      collectionSchema: AugmentedQuery<ApiType, (arg: CollectionId | string) => Observable<Option<NFTSchema>>> & QueryableStorageEntry<ApiType>;
      /**
       * Block numbers where listings will close. It is `Some` if at block number, (collection id, token id) is listed and scheduled to close.
       **/
      listingEndSchedule: AugmentedQueryDoubleMap<ApiType, (key1: BlockNumber | AnyNumber | Uint8Array, key2: ITuple<[CollectionId, TokenId]> | [CollectionId | string, TokenId | AnyNumber | Uint8Array]) => Observable<Option<ITuple<[]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * NFT sale/auction listings. keyed by collection id and token id
       **/
      listings: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | string, key2: TokenId | AnyNumber | Uint8Array) => Observable<Option<Listing>>> & QueryableStorageEntry<ApiType>;
      /**
       * Winning bids on open listings. keyed by collection id and token id
       **/
      listingWinningBid: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | string, key2: TokenId | AnyNumber | Uint8Array) => Observable<Option<ITuple<[AccountId, Balance]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * The next available token Id for an NFT collection
       **/
      nextTokenId: AugmentedQuery<ApiType, (arg: CollectionId | string) => Observable<TokenId>> & QueryableStorageEntry<ApiType>;
      /**
       * The total number an NFT collection in circulation (excludes burnt tokens)
       **/
      tokenIssuance: AugmentedQuery<ApiType, (arg: CollectionId | string) => Observable<TokenId>> & QueryableStorageEntry<ApiType>;
      /**
       * Map from (collection, token) to it's owner
       **/
      tokenOwner: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | string, key2: TokenId | AnyNumber | Uint8Array) => Observable<AccountId>> & QueryableStorageEntry<ApiType>;
      /**
       * Map from a token to it's royalty scheme
       **/
      tokenRoyalties: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | string, key2: TokenId | AnyNumber | Uint8Array) => Observable<Option<RoyaltiesSchedule>>> & QueryableStorageEntry<ApiType>;
      /**
       * Map from (collection, token) to it's attributes (as defined by schema)
       **/
      tokens: AugmentedQueryDoubleMap<ApiType, (key1: CollectionId | string, key2: TokenId | AnyNumber | Uint8Array) => Observable<Vec<NFTAttributeValue>>> & QueryableStorageEntry<ApiType>;
    };
    offences: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * A vector of reports of the same kind that happened at the same time slot.
       **/
      concurrentReportsIndex: AugmentedQueryDoubleMap<ApiType, (key1: Kind | string | Uint8Array, key2: OpaqueTimeSlot | string | Uint8Array) => Observable<Vec<ReportIdOf>>> & QueryableStorageEntry<ApiType>;
      /**
       * Deferred reports that have been rejected by the offence handler and need to be submitted
       * at a later time.
       **/
      deferredOffences: AugmentedQuery<ApiType, () => Observable<Vec<DeferredOffenceOf>>> & QueryableStorageEntry<ApiType>;
      /**
       * The primary structure that holds all offence records keyed by report identifiers.
       **/
      reports: AugmentedQuery<ApiType, (arg: ReportIdOf | string | Uint8Array) => Observable<Option<OffenceDetails>>> & QueryableStorageEntry<ApiType>;
      /**
       * Enumerates all reports of a kind along with the time they happened.
       * 
       * All reports are sorted by the time of offence.
       * 
       * Note that the actual type of this mapping is `Vec<u8>`, this is because values of
       * different types are not supported at the moment so we are doing the manual serialization.
       **/
      reportsByKindIndex: AugmentedQuery<ApiType, (arg: Kind | string | Uint8Array) => Observable<Bytes>> & QueryableStorageEntry<ApiType>;
    };
    randomnessCollectiveFlip: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>> & QueryableStorageEntry<ApiType>;
    };
    rewards: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Inflation rate % to apply on reward payouts
       **/
      baseInflationRate: AugmentedQuery<ApiType, () => Observable<FixedU128>> & QueryableStorageEntry<ApiType>;
      /**
       * Authorship rewards for the current active era.
       **/
      currentEraRewardPoints: AugmentedQuery<ApiType, () => Observable<EraRewardPoints>> & QueryableStorageEntry<ApiType>;
      /**
       * Development fund % take for reward payouts, parts-per-billion
       **/
      developmentFundTake: AugmentedQuery<ApiType, () => Observable<Perbill>> & QueryableStorageEntry<ApiType>;
      /**
       * The staking era index that specifies the start of a fiscal era based on which
       * we can calculate the start of other fiscal eras. This is either 0 or forced by SUDO to
       * another value. Have a look at force_new_fiscal_era for more info.
       **/
      fiscalEraEpoch: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * When true the next staking era will become the start of a new fiscal era.
       **/
      forceFiscalEra: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Where the reward payment should be made. Keyed by stash.
       **/
      payee: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountId>> & QueryableStorageEntry<ApiType>;
      /**
       * The era index for current payouts
       **/
      scheduledPayoutEra: AugmentedQuery<ApiType, () => Observable<EraIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * Upcoming reward payouts scheduled for block number to a validator and it's stakers of amount earned in era
       **/
      scheduledPayouts: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Option<ITuple<[AccountId, BalanceOf]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * The amount of new reward tokens that will be minted on every staking era in order to
       * approximate the inflation rate. We calculate the target inflation based on
       * T::CurrencyToReward::TotalIssuance() at the beginning of a fiscal era.
       **/
      targetInflationPerStakingEra: AugmentedQuery<ApiType, () => Observable<BalanceOf>> & QueryableStorageEntry<ApiType>;
      /**
       * Accumulated transaction fees for reward payout
       **/
      transactionFeePot: AugmentedQuery<ApiType, () => Observable<BalanceOf>> & QueryableStorageEntry<ApiType>;
      /**
       * Historic accumulated transaction fees on reward payout
       **/
      transactionFeePotHistory: AugmentedQuery<ApiType, () => Observable<VecDeque>> & QueryableStorageEntry<ApiType>;
    };
    scheduler: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Items to be executed, indexed by the block number that they should be executed on.
       **/
      agenda: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Vec<Option<Scheduled>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Lookup from identity to the block number and index of the task.
       **/
      lookup: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<TaskAddress>>> & QueryableStorageEntry<ApiType>;
      /**
       * Storage version of the pallet.
       * 
       * New networks start with last version.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>> & QueryableStorageEntry<ApiType>;
    };
    session: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Current index of the session.
       **/
      currentIndex: AugmentedQuery<ApiType, () => Observable<SessionIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * Indices of disabled validators.
       * 
       * The set is cleared when `on_session_ending` returns a new set of identities.
       **/
      disabledValidators: AugmentedQuery<ApiType, () => Observable<Vec<u32>>> & QueryableStorageEntry<ApiType>;
      /**
       * The owner of a key. The key is the `KeyTypeId` + the encoded key.
       **/
      keyOwner: AugmentedQuery<ApiType, (arg: ITuple<[KeyTypeId, Bytes]> | [KeyTypeId | AnyNumber | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<ValidatorId>>> & QueryableStorageEntry<ApiType>;
      /**
       * The next session keys for a validator.
       **/
      nextKeys: AugmentedQuery<ApiType, (arg: ValidatorId | string | Uint8Array) => Observable<Option<Keys>>> & QueryableStorageEntry<ApiType>;
      /**
       * True if the underlying economic identities or weighting behind the validators
       * has changed in the queued validator set.
       **/
      queuedChanged: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * The queued keys for the next session. When the next session begins, these keys
       * will be used to determine the validator's session keys.
       **/
      queuedKeys: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[ValidatorId, Keys]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * The current set of validators.
       **/
      validators: AugmentedQuery<ApiType, () => Observable<Vec<ValidatorId>>> & QueryableStorageEntry<ApiType>;
    };
    staking: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The active era information, it holds index and start.
       * 
       * The active era is the era currently rewarded.
       * Validator set of this era must be equal to `SessionInterface::validators`.
       **/
      activeEra: AugmentedQuery<ApiType, () => Observable<Option<ActiveEraInfo>>> & QueryableStorageEntry<ApiType>;
      /**
       * Map from all locked "stash" accounts to the controller account.
       **/
      bonded: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AccountId>>> & QueryableStorageEntry<ApiType>;
      /**
       * A mapping from still-bonded eras to the first session index of that era.
       * 
       * Must contains information for eras for the range:
       * `[active_era - bounding_duration; active_era]`
       **/
      bondedEras: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[EraIndex, SessionIndex]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * The current era index.
       **/
      currentEra: AugmentedQuery<ApiType, () => Observable<Option<EraIndex>>> & QueryableStorageEntry<ApiType>;
      /**
       * The earliest era for which we have a pending, unapplied slash.
       **/
      earliestUnappliedSlash: AugmentedQuery<ApiType, () => Observable<Option<EraIndex>>> & QueryableStorageEntry<ApiType>;
      /**
       * Flag to control the execution of the offchain election. When `Open(_)`, we accept
       * solutions to be submitted.
       **/
      eraElectionStatus: AugmentedQuery<ApiType, () => Observable<ElectionStatus>> & QueryableStorageEntry<ApiType>;
      /**
       * Exposure of validator at era.
       * 
       * This is keyed first by the era index to allow bulk deletion and then the stash account.
       * 
       * Is it removed after `HISTORY_DEPTH` eras.
       * If stakers hasn't been set or has been removed then empty exposure is returned.
       **/
      erasStakers: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Exposure>> & QueryableStorageEntry<ApiType>;
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
      erasStakersClipped: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Exposure>> & QueryableStorageEntry<ApiType>;
      /**
       * The session index at which the era start for the last `HISTORY_DEPTH` eras.
       **/
      erasStartSessionIndex: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>> & QueryableStorageEntry<ApiType>;
      /**
       * The total amount staked for the last `HISTORY_DEPTH` eras.
       * If total hasn't been set or has been removed then 0 stake is returned.
       **/
      erasTotalStake: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<BalanceOf>> & QueryableStorageEntry<ApiType>;
      /**
       * Similar to `ErasStakers`, this holds the preferences of validators.
       * 
       * This is keyed first by the era index to allow bulk deletion and then the stash account.
       * 
       * Is it removed after `HISTORY_DEPTH` eras.
       **/
      erasValidatorPrefs: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<ValidatorPrefs>> & QueryableStorageEntry<ApiType>;
      /**
       * True if the next session change will be a new era regardless of index.
       **/
      forceEra: AugmentedQuery<ApiType, () => Observable<Forcing>> & QueryableStorageEntry<ApiType>;
      /**
       * Number of eras to keep in history.
       * 
       * Information is kept for eras in `[current_era - history_depth; current_era]`.
       * 
       * Must be more than the number of eras delayed by session otherwise. I.e. active era must
       * always be in history. I.e. `active_era > current_era - history_depth` must be
       * guaranteed.
       **/
      historyDepth: AugmentedQuery<ApiType, () => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
       * easy to initialize and the performance hit is minimal (we expect no more than four
       * invulnerables) and restricted to testnets.
       **/
      invulnerables: AugmentedQuery<ApiType, () => Observable<Vec<AccountId>>> & QueryableStorageEntry<ApiType>;
      /**
       * True if the current **planned** session is final. Note that this does not take era
       * forcing into account.
       **/
      isCurrentSessionFinal: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Map from all (unlocked) "controller" accounts to the info regarding the staking.
       **/
      ledger: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<StakingLedger>>> & QueryableStorageEntry<ApiType>;
      /**
       * Minimum amount to bond.
       **/
      minimumBond: AugmentedQuery<ApiType, () => Observable<BalanceOf>> & QueryableStorageEntry<ApiType>;
      /**
       * Minimum number of staking participants before emergency conditions are imposed.
       **/
      minimumValidatorCount: AugmentedQuery<ApiType, () => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * The map from nominator stash key to the set of stash keys of all validators to nominate.
       **/
      nominators: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Nominations>>> & QueryableStorageEntry<ApiType>;
      /**
       * All slashing events on nominators, mapped by era to the highest slash value of the era.
       **/
      nominatorSlashInEra: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Option<BalanceOf>>> & QueryableStorageEntry<ApiType>;
      /**
       * The next validator set. At the end of an era, if this is available (potentially from the
       * result of an offchain worker), it is immediately used. Otherwise, the on-chain election
       * is executed.
       **/
      queuedElected: AugmentedQuery<ApiType, () => Observable<Option<ElectionResult>>> & QueryableStorageEntry<ApiType>;
      /**
       * The score of the current [`QueuedElected`].
       **/
      queuedScore: AugmentedQuery<ApiType, () => Observable<Option<ElectionScore>>> & QueryableStorageEntry<ApiType>;
      /**
       * Slashing spans for stash accounts.
       **/
      slashingSpans: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<SlashingSpans>>> & QueryableStorageEntry<ApiType>;
      /**
       * The percentage of the slash that is distributed to reporters.
       * 
       * The rest of the slashed value is handled by the `Slash`.
       **/
      slashRewardFraction: AugmentedQuery<ApiType, () => Observable<Perbill>> & QueryableStorageEntry<ApiType>;
      /**
       * Snapshot of nominators at the beginning of the current election window. This should only
       * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
       **/
      snapshotNominators: AugmentedQuery<ApiType, () => Observable<Option<Vec<AccountId>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Snapshot of validators at the beginning of the current election window. This should only
       * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
       **/
      snapshotValidators: AugmentedQuery<ApiType, () => Observable<Option<Vec<AccountId>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Records information about the maximum slash of a stash within a slashing span,
       * as well as how much reward has been paid out.
       **/
      spanSlash: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, SpanIndex]> | [AccountId | string | Uint8Array, SpanIndex | AnyNumber | Uint8Array]) => Observable<SpanRecord>> & QueryableStorageEntry<ApiType>;
      /**
       * True if network has been upgraded to this version.
       * Storage version of the pallet.
       * 
       * This is set to v2 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * All unapplied slashes that are queued for later.
       **/
      unappliedSlashes: AugmentedQuery<ApiType, (arg: EraIndex | AnyNumber | Uint8Array) => Observable<Vec<UnappliedSlash>>> & QueryableStorageEntry<ApiType>;
      /**
       * The ideal number of staking participants.
       **/
      validatorCount: AugmentedQuery<ApiType, () => Observable<u32>> & QueryableStorageEntry<ApiType>;
      /**
       * The map from (wannabe) validator stash key to the preferences of that validator.
       **/
      validators: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<ValidatorPrefs>> & QueryableStorageEntry<ApiType>;
      /**
       * All slashing events on validators, mapped by era to the highest slash proportion
       * and slash value of the era.
       **/
      validatorSlashInEra: AugmentedQueryDoubleMap<ApiType, (key1: EraIndex | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Option<ITuple<[Perbill, BalanceOf]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Same as `will_era_be_forced()` but persists to `end_era`
       **/
      wasEndEraForced: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    sudo: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId>> & QueryableStorageEntry<ApiType>;
    };
    syloDevice: {
      [key: string]: QueryableStorageEntry<ApiType>;
      devices: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<DeviceId>>> & QueryableStorageEntry<ApiType>;
    };
    syloE2Ee: {
      [key: string]: QueryableStorageEntry<ApiType>;
      preKeyBundles: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, DeviceId]> | [AccountId | string | Uint8Array, DeviceId | AnyNumber | Uint8Array]) => Observable<Vec<PreKeyBundle>>> & QueryableStorageEntry<ApiType>;
    };
    syloGroups: {
      [key: string]: QueryableStorageEntry<ApiType>;
      groups: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Group>> & QueryableStorageEntry<ApiType>;
      /**
       * Stores the known member/deviceId tuples for a particular group
       **/
      memberDevices: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[AccountId, DeviceId]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * Stores the group ids that a user is a member of
       **/
      memberships: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<Hash>>> & QueryableStorageEntry<ApiType>;
    };
    syloInbox: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextIndexes: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<MessageId>> & QueryableStorageEntry<ApiType>;
      values: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<ITuple<[MessageId, Message]>>>> & QueryableStorageEntry<ApiType>;
    };
    syloResponse: {
      [key: string]: QueryableStorageEntry<ApiType>;
      responses: AugmentedQuery<ApiType, (arg: ITuple<[AccountId, Hash]> | [AccountId | string | Uint8Array, Hash | string | Uint8Array]) => Observable<Response>> & QueryableStorageEntry<ApiType>;
    };
    syloVault: {
      [key: string]: QueryableStorageEntry<ApiType>;
      vault: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<ITuple<[VaultKey, VaultValue]>>>> & QueryableStorageEntry<ApiType>;
    };
    system: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountInfo>> & QueryableStorageEntry<ApiType>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>> & QueryableStorageEntry<ApiType>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Hash>> & QueryableStorageEntry<ApiType>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<ExtrinsicsWeight>> & QueryableStorageEntry<ApiType>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<DigestOf>> & QueryableStorageEntry<ApiType>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<EventIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * Events deposited for the current block.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<EventRecord>>> & QueryableStorageEntry<ApiType>;
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
      eventTopics: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[BlockNumber, EventIndex]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<Phase>>> & QueryableStorageEntry<ApiType>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>> & QueryableStorageEntry<ApiType>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>> & QueryableStorageEntry<ApiType>;
      /**
       * Extrinsics root of the current block, also part of the block header.
       **/
      extrinsicsRoot: AugmentedQuery<ApiType, () => Observable<Hash>> & QueryableStorageEntry<ApiType>;
      /**
       * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
       **/
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<LastRuntimeUpgradeInfo>>> & QueryableStorageEntry<ApiType>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<Hash>> & QueryableStorageEntry<ApiType>;
      /**
       * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
       **/
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>> & QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>> & QueryableStorageEntry<ApiType>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>> & QueryableStorageEntry<ApiType>;
    };
    treasury: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Proposal indices that have been approved but not yet awarded.
       **/
      approvals: AugmentedQuery<ApiType, () => Observable<Vec<ProposalIndex>>> & QueryableStorageEntry<ApiType>;
      /**
       * Bounties that have been made.
       **/
      bounties: AugmentedQuery<ApiType, (arg: BountyIndex | AnyNumber | Uint8Array) => Observable<Option<Bounty>>> & QueryableStorageEntry<ApiType>;
      /**
       * Bounty indices that have been approved but not yet funded.
       **/
      bountyApprovals: AugmentedQuery<ApiType, () => Observable<Vec<BountyIndex>>> & QueryableStorageEntry<ApiType>;
      /**
       * Number of bounty proposals that have been made.
       **/
      bountyCount: AugmentedQuery<ApiType, () => Observable<BountyIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * The description of each bounty.
       **/
      bountyDescriptions: AugmentedQuery<ApiType, (arg: BountyIndex | AnyNumber | Uint8Array) => Observable<Option<Bytes>>> & QueryableStorageEntry<ApiType>;
      /**
       * Number of proposals that have been made.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<ProposalIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * Proposals that have been made.
       **/
      proposals: AugmentedQuery<ApiType, (arg: ProposalIndex | AnyNumber | Uint8Array) => Observable<Option<TreasuryProposal>>> & QueryableStorageEntry<ApiType>;
      /**
       * Simple preimage lookup from the reason's hash to the original data. Again, has an
       * insecure enumerable hash since the key is guaranteed to be the result of a secure hash.
       **/
      reasons: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<Bytes>>> & QueryableStorageEntry<ApiType>;
      /**
       * Tips that are not yet completed. Keyed by the hash of `(reason, who)` from the value.
       * This has the insecure enumerable hash function since the key itself is already
       * guaranteed to be a secure hash.
       **/
      tips: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<OpenTip>>> & QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
