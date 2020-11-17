// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Compact, Option, Raw, Vec } from '@polkadot/types/codec';
import {
  BitVec,
  Bytes,
  Data,
  DoNotConstruct,
  Null,
  StorageKey,
  Text,
  Type,
  U256,
  bool,
  i128,
  i16,
  i256,
  i32,
  i64,
  i8,
  u128,
  u16,
  u256,
  u32,
  u64,
  u8,
  usize,
} from '@polkadot/types/primitive';
import { AttestationTopic, AttestationValue } from './attestation';
import { ExchangeKey, FeeRate } from './cennzx';
import { AssetInfo } from './ga';
import { RewardBalance, RewardBalanceOf, RewardDestination } from './staking';
import {
  AcceptPayload,
  DeviceId,
  DeviceIdResponse,
  Group,
  Invite,
  Member,
  MemberRoles,
  Message,
  MessageId,
  Meta,
  PendingInvite,
  PreKeyBundle,
  PreKeyBundlesResponse,
  Response,
  VaultKey,
  VaultValue,
  WithdrawnPreKeyBundle,
} from './sylo';
import { doughnut } from './system';
import { ChargeTransactionPayment, FeeExchange, FeeExchangeV1 } from './transactionPayment';
import { BlockAttestations, IncludedBlocks, MoreAttestations } from '@polkadot/types/interfaces/attestations';
import { RawAuraPreDigest } from '@polkadot/types/interfaces/aura';
import { ExtrinsicOrHash, ExtrinsicStatus } from '@polkadot/types/interfaces/author';
import { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import {
  AllowedSlots,
  BabeAuthorityWeight,
  BabeBlockWeight,
  BabeEquivocationProof,
  BabeWeight,
  EpochAuthorship,
  MaybeRandomness,
  MaybeVrf,
  NextConfigDescriptor,
  NextConfigDescriptorV1,
  Randomness,
  RawBabePreDigest,
  RawBabePreDigestCompat,
  RawBabePreDigestPrimary,
  RawBabePreDigestPrimaryTo159,
  RawBabePreDigestSecondaryPlain,
  RawBabePreDigestSecondaryTo159,
  RawBabePreDigestSecondaryVRF,
  RawBabePreDigestTo159,
  SlotNumber,
  VrfData,
  VrfOutput,
  VrfProof,
} from '@polkadot/types/interfaces/babe';
import {
  AccountData,
  BalanceLock,
  BalanceLockTo212,
  BalanceStatus,
  Reasons,
  VestingSchedule,
  WithdrawReasons,
} from '@polkadot/types/interfaces/balances';
import { BlockHash } from '@polkadot/types/interfaces/chain';
import { PrefixedStorageKey } from '@polkadot/types/interfaces/childstate';
import { EthereumAddress, StatementKind } from '@polkadot/types/interfaces/claims';
import { CollectiveOrigin, MemberCount, ProposalIndex, Votes, VotesTo230 } from '@polkadot/types/interfaces/collective';
import { AuthorityId, RawVRFOutput } from '@polkadot/types/interfaces/consensus';
import {
  AliveContractInfo,
  CodeHash,
  ContractCallRequest,
  ContractExecResult,
  ContractExecResultSuccess,
  ContractExecResultSuccessTo255,
  ContractExecResultTo255,
  ContractInfo,
  ContractStorageKey,
  Gas,
  HostFnWeights,
  InstructionWeights,
  PrefabWasmModule,
  PrefabWasmModuleReserved,
  Schedule,
  ScheduleTo212,
  ScheduleTo258,
  SeedOf,
  TombstoneContractInfo,
  TrieId,
} from '@polkadot/types/interfaces/contracts';
import {
  ContractConstructorSpec,
  ContractContractSpec,
  ContractCryptoHasher,
  ContractDiscriminant,
  ContractDisplayName,
  ContractEventParamSpec,
  ContractEventSpec,
  ContractLayoutArray,
  ContractLayoutCell,
  ContractLayoutEnum,
  ContractLayoutHash,
  ContractLayoutHashingStrategy,
  ContractLayoutKey,
  ContractLayoutStruct,
  ContractLayoutStructField,
  ContractMessageParamSpec,
  ContractMessageSpec,
  ContractProject,
  ContractProjectContract,
  ContractProjectSource,
  ContractSelector,
  ContractStorageLayout,
  ContractTypeSpec,
} from '@polkadot/types/interfaces/contractsAbi';
import {
  AccountVote,
  AccountVoteSplit,
  AccountVoteStandard,
  Conviction,
  Delegations,
  PreimageStatus,
  PreimageStatusAvailable,
  PriorLock,
  PropIndex,
  Proposal,
  ProxyState,
  ReferendumIndex,
  ReferendumInfo,
  ReferendumInfoFinished,
  ReferendumInfoTo239,
  ReferendumStatus,
  Tally,
  Voting,
  VotingDelegating,
  VotingDirect,
  VotingDirectVote,
} from '@polkadot/types/interfaces/democracy';
import {
  ApprovalFlag,
  DefunctVoter,
  Renouncing,
  SetIndex,
  Vote,
  VoteIndex,
  VoteThreshold,
  VoterInfo,
} from '@polkadot/types/interfaces/elections';
import { CreatedBlock, ImportedAux } from '@polkadot/types/interfaces/engine';
import { EthereumAccountId, EthereumLookupSource } from '@polkadot/types/interfaces/ethereum';
import { Account, Log, Vicinity } from '@polkadot/types/interfaces/evm';
import {
  EcdsaSignature,
  Ed25519Signature,
  Extrinsic,
  ExtrinsicEra,
  ExtrinsicPayload,
  ExtrinsicPayloadUnknown,
  ExtrinsicPayloadV4,
  ExtrinsicSignatureV4,
  ExtrinsicUnknown,
  ExtrinsicV4,
  ImmortalEra,
  MortalEra,
  MultiSignature,
  Signature,
  SignerPayload,
  Sr25519Signature,
} from '@polkadot/types/interfaces/extrinsics';
import {
  AssetOptions,
  Owner,
  PermissionLatest,
  PermissionVersions,
  PermissionsV1,
} from '@polkadot/types/interfaces/genericAsset';
import {
  AuthorityIndex,
  AuthorityList,
  AuthorityWeight,
  EncodedFinalityProofs,
  GrandpaEquivocation,
  GrandpaEquivocationProof,
  GrandpaEquivocationValue,
  GrandpaPrevote,
  JustificationNotification,
  KeyOwnerProof,
  NextAuthority,
  PendingPause,
  PendingResume,
  Precommits,
  Prevotes,
  ReportedRoundStates,
  RoundState,
  SetId,
  StoredPendingChange,
  StoredState,
} from '@polkadot/types/interfaces/grandpa';
import {
  IdentityFields,
  IdentityInfo,
  IdentityInfoAdditional,
  IdentityJudgement,
  RegistrarIndex,
  RegistrarInfo,
  Registration,
  RegistrationJudgement,
} from '@polkadot/types/interfaces/identity';
import {
  AuthIndex,
  AuthoritySignature,
  Heartbeat,
  HeartbeatTo244,
  OpaqueMultiaddr,
  OpaqueNetworkState,
  OpaquePeerId,
} from '@polkadot/types/interfaces/imOnline';
import {
  DoubleMapTypeLatest,
  DoubleMapTypeV10,
  DoubleMapTypeV11,
  DoubleMapTypeV12,
  DoubleMapTypeV9,
  ErrorMetadataV10,
  ErrorMetadataV11,
  ErrorMetadataV12,
  ErrorMetadataV9,
  EventMetadataLatest,
  EventMetadataV10,
  EventMetadataV11,
  EventMetadataV12,
  EventMetadataV9,
  ExtrinsicMetadataLatest,
  ExtrinsicMetadataV11,
  ExtrinsicMetadataV12,
  FunctionArgumentMetadataLatest,
  FunctionArgumentMetadataV10,
  FunctionArgumentMetadataV11,
  FunctionArgumentMetadataV12,
  FunctionArgumentMetadataV9,
  FunctionMetadataLatest,
  FunctionMetadataV10,
  FunctionMetadataV11,
  FunctionMetadataV12,
  FunctionMetadataV9,
  MapTypeLatest,
  MapTypeV10,
  MapTypeV11,
  MapTypeV12,
  MapTypeV9,
  MetadataAll,
  MetadataLatest,
  MetadataV10,
  MetadataV11,
  MetadataV12,
  MetadataV9,
  ModuleConstantMetadataLatest,
  ModuleConstantMetadataV10,
  ModuleConstantMetadataV11,
  ModuleConstantMetadataV12,
  ModuleConstantMetadataV9,
  ModuleMetadataLatest,
  ModuleMetadataV10,
  ModuleMetadataV11,
  ModuleMetadataV12,
  ModuleMetadataV9,
  StorageEntryMetadataLatest,
  StorageEntryMetadataV10,
  StorageEntryMetadataV11,
  StorageEntryMetadataV12,
  StorageEntryMetadataV9,
  StorageEntryModifierLatest,
  StorageEntryModifierV10,
  StorageEntryModifierV11,
  StorageEntryModifierV12,
  StorageEntryModifierV9,
  StorageEntryTypeLatest,
  StorageEntryTypeV10,
  StorageEntryTypeV11,
  StorageEntryTypeV12,
  StorageEntryTypeV9,
  StorageHasher,
  StorageHasherV10,
  StorageHasherV11,
  StorageHasherV12,
  StorageHasherV9,
  StorageMetadataLatest,
  StorageMetadataV10,
  StorageMetadataV11,
  StorageMetadataV12,
  StorageMetadataV9,
} from '@polkadot/types/interfaces/metadata';
import { StorageKind } from '@polkadot/types/interfaces/offchain';
import {
  DeferredOffenceOf,
  Kind,
  OffenceDetails,
  Offender,
  OpaqueTimeSlot,
  ReportIdOf,
  Reporter,
} from '@polkadot/types/interfaces/offences';
import {
  AbridgedCandidateReceipt,
  AttestedCandidate,
  AuctionIndex,
  Bidder,
  CandidateCommitments,
  CandidateReceipt,
  CollatorId,
  CollatorSignature,
  DoubleVoteReport,
  DownwardMessage,
  GlobalValidationSchedule,
  HeadData,
  IncomingParachain,
  IncomingParachainDeploy,
  IncomingParachainFixed,
  LeasePeriod,
  LeasePeriodOf,
  LocalValidationData,
  NewBidder,
  ParaId,
  ParaInfo,
  ParaPastCodeMeta,
  ParaScheduling,
  ParachainDispatchOrigin,
  ParachainProposal,
  RegisteredParachainInfo,
  RelayChainBlockNumber,
  Remark,
  Retriable,
  Scheduling,
  SigningContext,
  SlotRange,
  Statement,
  SubId,
  UpwardMessage,
  ValidationCode,
  ValidationFunctionParams,
  ValidatorSignature,
  ValidityAttestation,
  WinningData,
  WinningDataEntry,
} from '@polkadot/types/interfaces/parachains';
import { RuntimeDispatchInfo } from '@polkadot/types/interfaces/payment';
import { Approvals } from '@polkadot/types/interfaces/poll';
import { ProxyAnnouncement, ProxyDefinition, ProxyType } from '@polkadot/types/interfaces/proxy';
import { AccountStatus, AccountValidity } from '@polkadot/types/interfaces/purchase';
import { ActiveRecovery, RecoveryConfig } from '@polkadot/types/interfaces/recovery';
import { RpcMethods } from '@polkadot/types/interfaces/rpc';
import {
  AccountId,
  AccountIdOf,
  AccountIndex,
  Address,
  AssetId,
  Balance,
  BalanceOf,
  Block,
  BlockNumber,
  Call,
  CallHash,
  CallHashOf,
  ChangesTrieConfiguration,
  Consensus,
  ConsensusEngineId,
  Digest,
  DigestItem,
  ExtrinsicsWeight,
  Fixed128,
  Fixed64,
  FixedI128,
  FixedI64,
  FixedU128,
  FixedU64,
  GenericAddress,
  H160,
  H256,
  H512,
  Hash,
  Header,
  I32F32,
  Index,
  Justification,
  KeyTypeId,
  KeyValue,
  LockIdentifier,
  LookupSource,
  LookupTarget,
  ModuleId,
  Moment,
  OpaqueCall,
  Origin,
  OriginCaller,
  PalletVersion,
  PalletsOrigin,
  Pays,
  PerU16,
  Perbill,
  Percent,
  Permill,
  Perquintill,
  Phantom,
  PhantomData,
  PreRuntime,
  Releases,
  RuntimeDbWeight,
  Seal,
  SealV0,
  SignedBlock,
  StorageData,
  TransactionPriority,
  U32F32,
  ValidatorId,
  Weight,
  WeightMultiplier,
} from '@polkadot/types/interfaces/runtime';
import {
  SiField,
  SiLookupTypeId,
  SiPath,
  SiType,
  SiTypeDef,
  SiTypeDefArray,
  SiTypeDefComposite,
  SiTypeDefPrimitive,
  SiTypeDefSequence,
  SiTypeDefTuple,
  SiTypeDefVariant,
  SiVariant,
} from '@polkadot/types/interfaces/scaleInfo';
import {
  Period,
  Priority,
  SchedulePeriod,
  SchedulePriority,
  Scheduled,
  ScheduledTo254,
  TaskAddress,
} from '@polkadot/types/interfaces/scheduler';
import {
  FullIdentification,
  IdentificationTuple,
  Keys,
  MembershipProof,
  SessionIndex,
  SessionKeys1,
  SessionKeys2,
  SessionKeys3,
  SessionKeys4,
  SessionKeys5,
  SessionKeys6,
  ValidatorCount,
} from '@polkadot/types/interfaces/session';
import {
  Bid,
  BidKind,
  SocietyJudgement,
  SocietyVote,
  StrikeCount,
  VouchingStatus,
} from '@polkadot/types/interfaces/society';
import {
  ApiId,
  KeyValueOption,
  ReadProof,
  RuntimeVersion,
  RuntimeVersionApi,
  StorageChangeSet,
} from '@polkadot/types/interfaces/state';
import { WeightToFeeCoefficient } from '@polkadot/types/interfaces/support';
import {
  Bounty,
  BountyIndex,
  BountyStatus,
  BountyStatusActive,
  BountyStatusCuratorProposed,
  BountyStatusPendingPayout,
  OpenTip,
  OpenTipFinderTo225,
  OpenTipTip,
  OpenTipTo225,
  TreasuryProposal,
} from '@polkadot/types/interfaces/treasury';
import { Multiplier } from '@polkadot/types/interfaces/txpayment';
import { Multisig, Timepoint } from '@polkadot/types/interfaces/utility';
import { VestingInfo } from '@polkadot/types/interfaces/vesting';

declare module '@polkadot/types/types/registry' {
  export interface InterfaceTypes {
    BitVec: BitVec;
    'Option<BitVec>': Option<BitVec>;
    'Vec<BitVec>': Vec<BitVec>;
    bool: bool;
    'Option<bool>': Option<bool>;
    'Vec<bool>': Vec<bool>;
    Bytes: Bytes;
    'Option<Bytes>': Option<Bytes>;
    'Vec<Bytes>': Vec<Bytes>;
    Data: Data;
    'Option<Data>': Option<Data>;
    'Vec<Data>': Vec<Data>;
    DoNotConstruct: DoNotConstruct;
    'Option<DoNotConstruct>': Option<DoNotConstruct>;
    'Vec<DoNotConstruct>': Vec<DoNotConstruct>;
    i8: i8;
    'Option<i8>': Option<i8>;
    'Vec<i8>': Vec<i8>;
    i16: i16;
    'Option<i16>': Option<i16>;
    'Vec<i16>': Vec<i16>;
    i32: i32;
    'Option<i32>': Option<i32>;
    'Vec<i32>': Vec<i32>;
    i64: i64;
    'Option<i64>': Option<i64>;
    'Vec<i64>': Vec<i64>;
    i128: i128;
    'Option<i128>': Option<i128>;
    'Vec<i128>': Vec<i128>;
    i256: i256;
    'Option<i256>': Option<i256>;
    'Vec<i256>': Vec<i256>;
    Null: Null;
    'Option<Null>': Option<Null>;
    'Vec<Null>': Vec<Null>;
    StorageKey: StorageKey;
    'Option<StorageKey>': Option<StorageKey>;
    'Vec<StorageKey>': Vec<StorageKey>;
    Text: Text;
    'Option<Text>': Option<Text>;
    'Vec<Text>': Vec<Text>;
    Type: Type;
    'Option<Type>': Option<Type>;
    'Vec<Type>': Vec<Type>;
    u8: u8;
    'Compact<u8>': Compact<u8>;
    'Option<u8>': Option<u8>;
    'Vec<u8>': Vec<u8>;
    u16: u16;
    'Compact<u16>': Compact<u16>;
    'Option<u16>': Option<u16>;
    'Vec<u16>': Vec<u16>;
    u32: u32;
    'Compact<u32>': Compact<u32>;
    'Option<u32>': Option<u32>;
    'Vec<u32>': Vec<u32>;
    u64: u64;
    'Compact<u64>': Compact<u64>;
    'Option<u64>': Option<u64>;
    'Vec<u64>': Vec<u64>;
    u128: u128;
    'Compact<u128>': Compact<u128>;
    'Option<u128>': Option<u128>;
    'Vec<u128>': Vec<u128>;
    u256: u256;
    'Compact<u256>': Compact<u256>;
    'Option<u256>': Option<u256>;
    'Vec<u256>': Vec<u256>;
    U256: U256;
    'Compact<U256>': Compact<U256>;
    'Option<U256>': Option<U256>;
    'Vec<U256>': Vec<U256>;
    usize: usize;
    'Compact<usize>': Compact<usize>;
    'Option<usize>': Option<usize>;
    'Vec<usize>': Vec<usize>;
    Raw: Raw;
    'Option<Raw>': Option<Raw>;
    'Vec<Raw>': Vec<Raw>;
    Fixed64: Fixed64;
    'Option<Fixed64>': Option<Fixed64>;
    'Vec<Fixed64>': Vec<Fixed64>;
    FixedI64: FixedI64;
    'Option<FixedI64>': Option<FixedI64>;
    'Vec<FixedI64>': Vec<FixedI64>;
    FixedU64: FixedU64;
    'Compact<FixedU64>': Compact<FixedU64>;
    'Option<FixedU64>': Option<FixedU64>;
    'Vec<FixedU64>': Vec<FixedU64>;
    Fixed128: Fixed128;
    'Option<Fixed128>': Option<Fixed128>;
    'Vec<Fixed128>': Vec<Fixed128>;
    FixedI128: FixedI128;
    'Option<FixedI128>': Option<FixedI128>;
    'Vec<FixedI128>': Vec<FixedI128>;
    FixedU128: FixedU128;
    'Compact<FixedU128>': Compact<FixedU128>;
    'Option<FixedU128>': Option<FixedU128>;
    'Vec<FixedU128>': Vec<FixedU128>;
    I32F32: I32F32;
    'Option<I32F32>': Option<I32F32>;
    'Vec<I32F32>': Vec<I32F32>;
    U32F32: U32F32;
    'Compact<U32F32>': Compact<U32F32>;
    'Option<U32F32>': Option<U32F32>;
    'Vec<U32F32>': Vec<U32F32>;
    PerU16: PerU16;
    'Compact<PerU16>': Compact<PerU16>;
    'Option<PerU16>': Option<PerU16>;
    'Vec<PerU16>': Vec<PerU16>;
    Perbill: Perbill;
    'Compact<Perbill>': Compact<Perbill>;
    'Option<Perbill>': Option<Perbill>;
    'Vec<Perbill>': Vec<Perbill>;
    Percent: Percent;
    'Compact<Percent>': Compact<Percent>;
    'Option<Percent>': Option<Percent>;
    'Vec<Percent>': Vec<Percent>;
    Permill: Permill;
    'Compact<Permill>': Compact<Permill>;
    'Option<Permill>': Option<Permill>;
    'Vec<Permill>': Vec<Permill>;
    Perquintill: Perquintill;
    'Compact<Perquintill>': Compact<Perquintill>;
    'Option<Perquintill>': Option<Perquintill>;
    'Vec<Perquintill>': Vec<Perquintill>;
    AccountId: AccountId;
    'Option<AccountId>': Option<AccountId>;
    'Vec<AccountId>': Vec<AccountId>;
    AccountIdOf: AccountIdOf;
    'Option<AccountIdOf>': Option<AccountIdOf>;
    'Vec<AccountIdOf>': Vec<AccountIdOf>;
    AccountIndex: AccountIndex;
    'Compact<AccountIndex>': Compact<AccountIndex>;
    'Option<AccountIndex>': Option<AccountIndex>;
    'Vec<AccountIndex>': Vec<AccountIndex>;
    Address: Address;
    'Option<Address>': Option<Address>;
    'Vec<Address>': Vec<Address>;
    AssetId: AssetId;
    'Compact<AssetId>': Compact<AssetId>;
    'Option<AssetId>': Option<AssetId>;
    'Vec<AssetId>': Vec<AssetId>;
    Balance: Balance;
    'Compact<Balance>': Compact<Balance>;
    'Option<Balance>': Option<Balance>;
    'Vec<Balance>': Vec<Balance>;
    BalanceOf: BalanceOf;
    'Compact<BalanceOf>': Compact<BalanceOf>;
    'Option<BalanceOf>': Option<BalanceOf>;
    'Vec<BalanceOf>': Vec<BalanceOf>;
    Block: Block;
    'Option<Block>': Option<Block>;
    'Vec<Block>': Vec<Block>;
    BlockNumber: BlockNumber;
    'Compact<BlockNumber>': Compact<BlockNumber>;
    'Option<BlockNumber>': Option<BlockNumber>;
    'Vec<BlockNumber>': Vec<BlockNumber>;
    Call: Call;
    'Option<Call>': Option<Call>;
    'Vec<Call>': Vec<Call>;
    CallHash: CallHash;
    'Option<CallHash>': Option<CallHash>;
    'Vec<CallHash>': Vec<CallHash>;
    CallHashOf: CallHashOf;
    'Option<CallHashOf>': Option<CallHashOf>;
    'Vec<CallHashOf>': Vec<CallHashOf>;
    ChangesTrieConfiguration: ChangesTrieConfiguration;
    'Option<ChangesTrieConfiguration>': Option<ChangesTrieConfiguration>;
    'Vec<ChangesTrieConfiguration>': Vec<ChangesTrieConfiguration>;
    ConsensusEngineId: ConsensusEngineId;
    'Compact<ConsensusEngineId>': Compact<ConsensusEngineId>;
    'Option<ConsensusEngineId>': Option<ConsensusEngineId>;
    'Vec<ConsensusEngineId>': Vec<ConsensusEngineId>;
    Digest: Digest;
    'Option<Digest>': Option<Digest>;
    'Vec<Digest>': Vec<Digest>;
    DigestItem: DigestItem;
    'Option<DigestItem>': Option<DigestItem>;
    'Vec<DigestItem>': Vec<DigestItem>;
    ExtrinsicsWeight: ExtrinsicsWeight;
    'Option<ExtrinsicsWeight>': Option<ExtrinsicsWeight>;
    'Vec<ExtrinsicsWeight>': Vec<ExtrinsicsWeight>;
    GenericAddress: GenericAddress;
    'Option<GenericAddress>': Option<GenericAddress>;
    'Vec<GenericAddress>': Vec<GenericAddress>;
    H160: H160;
    'Option<H160>': Option<H160>;
    'Vec<H160>': Vec<H160>;
    H256: H256;
    'Option<H256>': Option<H256>;
    'Vec<H256>': Vec<H256>;
    H512: H512;
    'Option<H512>': Option<H512>;
    'Vec<H512>': Vec<H512>;
    Hash: Hash;
    'Option<Hash>': Option<Hash>;
    'Vec<Hash>': Vec<Hash>;
    Header: Header;
    'Option<Header>': Option<Header>;
    'Vec<Header>': Vec<Header>;
    Index: Index;
    'Compact<Index>': Compact<Index>;
    'Option<Index>': Option<Index>;
    'Vec<Index>': Vec<Index>;
    Justification: Justification;
    'Option<Justification>': Option<Justification>;
    'Vec<Justification>': Vec<Justification>;
    KeyValue: KeyValue;
    'Option<KeyValue>': Option<KeyValue>;
    'Vec<KeyValue>': Vec<KeyValue>;
    KeyTypeId: KeyTypeId;
    'Compact<KeyTypeId>': Compact<KeyTypeId>;
    'Option<KeyTypeId>': Option<KeyTypeId>;
    'Vec<KeyTypeId>': Vec<KeyTypeId>;
    LockIdentifier: LockIdentifier;
    'Option<LockIdentifier>': Option<LockIdentifier>;
    'Vec<LockIdentifier>': Vec<LockIdentifier>;
    LookupSource: LookupSource;
    'Option<LookupSource>': Option<LookupSource>;
    'Vec<LookupSource>': Vec<LookupSource>;
    LookupTarget: LookupTarget;
    'Option<LookupTarget>': Option<LookupTarget>;
    'Vec<LookupTarget>': Vec<LookupTarget>;
    ModuleId: ModuleId;
    'Option<ModuleId>': Option<ModuleId>;
    'Vec<ModuleId>': Vec<ModuleId>;
    Moment: Moment;
    'Compact<Moment>': Compact<Moment>;
    'Option<Moment>': Option<Moment>;
    'Vec<Moment>': Vec<Moment>;
    OpaqueCall: OpaqueCall;
    'Option<OpaqueCall>': Option<OpaqueCall>;
    'Vec<OpaqueCall>': Vec<OpaqueCall>;
    Origin: Origin;
    'Option<Origin>': Option<Origin>;
    'Vec<Origin>': Vec<Origin>;
    OriginCaller: OriginCaller;
    'Option<OriginCaller>': Option<OriginCaller>;
    'Vec<OriginCaller>': Vec<OriginCaller>;
    PalletsOrigin: PalletsOrigin;
    'Option<PalletsOrigin>': Option<PalletsOrigin>;
    'Vec<PalletsOrigin>': Vec<PalletsOrigin>;
    PalletVersion: PalletVersion;
    'Option<PalletVersion>': Option<PalletVersion>;
    'Vec<PalletVersion>': Vec<PalletVersion>;
    Pays: Pays;
    'Option<Pays>': Option<Pays>;
    'Vec<Pays>': Vec<Pays>;
    Phantom: Phantom;
    'Option<Phantom>': Option<Phantom>;
    'Vec<Phantom>': Vec<Phantom>;
    PhantomData: PhantomData;
    'Option<PhantomData>': Option<PhantomData>;
    'Vec<PhantomData>': Vec<PhantomData>;
    Releases: Releases;
    'Option<Releases>': Option<Releases>;
    'Vec<Releases>': Vec<Releases>;
    RuntimeDbWeight: RuntimeDbWeight;
    'Option<RuntimeDbWeight>': Option<RuntimeDbWeight>;
    'Vec<RuntimeDbWeight>': Vec<RuntimeDbWeight>;
    SignedBlock: SignedBlock;
    'Option<SignedBlock>': Option<SignedBlock>;
    'Vec<SignedBlock>': Vec<SignedBlock>;
    StorageData: StorageData;
    'Option<StorageData>': Option<StorageData>;
    'Vec<StorageData>': Vec<StorageData>;
    TransactionPriority: TransactionPriority;
    'Compact<TransactionPriority>': Compact<TransactionPriority>;
    'Option<TransactionPriority>': Option<TransactionPriority>;
    'Vec<TransactionPriority>': Vec<TransactionPriority>;
    ValidatorId: ValidatorId;
    'Option<ValidatorId>': Option<ValidatorId>;
    'Vec<ValidatorId>': Vec<ValidatorId>;
    Weight: Weight;
    'Compact<Weight>': Compact<Weight>;
    'Option<Weight>': Option<Weight>;
    'Vec<Weight>': Vec<Weight>;
    WeightMultiplier: WeightMultiplier;
    'Option<WeightMultiplier>': Option<WeightMultiplier>;
    'Vec<WeightMultiplier>': Vec<WeightMultiplier>;
    PreRuntime: PreRuntime;
    'Option<PreRuntime>': Option<PreRuntime>;
    'Vec<PreRuntime>': Vec<PreRuntime>;
    SealV0: SealV0;
    'Option<SealV0>': Option<SealV0>;
    'Vec<SealV0>': Vec<SealV0>;
    Seal: Seal;
    'Option<Seal>': Option<Seal>;
    'Vec<Seal>': Vec<Seal>;
    Consensus: Consensus;
    'Option<Consensus>': Option<Consensus>;
    'Vec<Consensus>': Vec<Consensus>;
    UncleEntryItem: UncleEntryItem;
    'Option<UncleEntryItem>': Option<UncleEntryItem>;
    'Vec<UncleEntryItem>': Vec<UncleEntryItem>;
    RawAuraPreDigest: RawAuraPreDigest;
    'Option<RawAuraPreDigest>': Option<RawAuraPreDigest>;
    'Vec<RawAuraPreDigest>': Vec<RawAuraPreDigest>;
    AllowedSlots: AllowedSlots;
    'Option<AllowedSlots>': Option<AllowedSlots>;
    'Vec<AllowedSlots>': Vec<AllowedSlots>;
    BabeAuthorityWeight: BabeAuthorityWeight;
    'Compact<BabeAuthorityWeight>': Compact<BabeAuthorityWeight>;
    'Option<BabeAuthorityWeight>': Option<BabeAuthorityWeight>;
    'Vec<BabeAuthorityWeight>': Vec<BabeAuthorityWeight>;
    BabeBlockWeight: BabeBlockWeight;
    'Compact<BabeBlockWeight>': Compact<BabeBlockWeight>;
    'Option<BabeBlockWeight>': Option<BabeBlockWeight>;
    'Vec<BabeBlockWeight>': Vec<BabeBlockWeight>;
    BabeEquivocationProof: BabeEquivocationProof;
    'Option<BabeEquivocationProof>': Option<BabeEquivocationProof>;
    'Vec<BabeEquivocationProof>': Vec<BabeEquivocationProof>;
    BabeWeight: BabeWeight;
    'Compact<BabeWeight>': Compact<BabeWeight>;
    'Option<BabeWeight>': Option<BabeWeight>;
    'Vec<BabeWeight>': Vec<BabeWeight>;
    MaybeRandomness: MaybeRandomness;
    'Option<MaybeRandomness>': Option<MaybeRandomness>;
    'Vec<MaybeRandomness>': Vec<MaybeRandomness>;
    MaybeVrf: MaybeVrf;
    'Option<MaybeVrf>': Option<MaybeVrf>;
    'Vec<MaybeVrf>': Vec<MaybeVrf>;
    EpochAuthorship: EpochAuthorship;
    'Option<EpochAuthorship>': Option<EpochAuthorship>;
    'Vec<EpochAuthorship>': Vec<EpochAuthorship>;
    NextConfigDescriptor: NextConfigDescriptor;
    'Option<NextConfigDescriptor>': Option<NextConfigDescriptor>;
    'Vec<NextConfigDescriptor>': Vec<NextConfigDescriptor>;
    NextConfigDescriptorV1: NextConfigDescriptorV1;
    'Option<NextConfigDescriptorV1>': Option<NextConfigDescriptorV1>;
    'Vec<NextConfigDescriptorV1>': Vec<NextConfigDescriptorV1>;
    Randomness: Randomness;
    'Option<Randomness>': Option<Randomness>;
    'Vec<Randomness>': Vec<Randomness>;
    RawBabePreDigest: RawBabePreDigest;
    'Option<RawBabePreDigest>': Option<RawBabePreDigest>;
    'Vec<RawBabePreDigest>': Vec<RawBabePreDigest>;
    RawBabePreDigestPrimary: RawBabePreDigestPrimary;
    'Option<RawBabePreDigestPrimary>': Option<RawBabePreDigestPrimary>;
    'Vec<RawBabePreDigestPrimary>': Vec<RawBabePreDigestPrimary>;
    RawBabePreDigestSecondaryPlain: RawBabePreDigestSecondaryPlain;
    'Option<RawBabePreDigestSecondaryPlain>': Option<RawBabePreDigestSecondaryPlain>;
    'Vec<RawBabePreDigestSecondaryPlain>': Vec<RawBabePreDigestSecondaryPlain>;
    RawBabePreDigestSecondaryVRF: RawBabePreDigestSecondaryVRF;
    'Option<RawBabePreDigestSecondaryVRF>': Option<RawBabePreDigestSecondaryVRF>;
    'Vec<RawBabePreDigestSecondaryVRF>': Vec<RawBabePreDigestSecondaryVRF>;
    RawBabePreDigestTo159: RawBabePreDigestTo159;
    'Option<RawBabePreDigestTo159>': Option<RawBabePreDigestTo159>;
    'Vec<RawBabePreDigestTo159>': Vec<RawBabePreDigestTo159>;
    RawBabePreDigestPrimaryTo159: RawBabePreDigestPrimaryTo159;
    'Option<RawBabePreDigestPrimaryTo159>': Option<RawBabePreDigestPrimaryTo159>;
    'Vec<RawBabePreDigestPrimaryTo159>': Vec<RawBabePreDigestPrimaryTo159>;
    RawBabePreDigestSecondaryTo159: RawBabePreDigestSecondaryTo159;
    'Option<RawBabePreDigestSecondaryTo159>': Option<RawBabePreDigestSecondaryTo159>;
    'Vec<RawBabePreDigestSecondaryTo159>': Vec<RawBabePreDigestSecondaryTo159>;
    RawBabePreDigestCompat: RawBabePreDigestCompat;
    'Option<RawBabePreDigestCompat>': Option<RawBabePreDigestCompat>;
    'Vec<RawBabePreDigestCompat>': Vec<RawBabePreDigestCompat>;
    SlotNumber: SlotNumber;
    'Compact<SlotNumber>': Compact<SlotNumber>;
    'Option<SlotNumber>': Option<SlotNumber>;
    'Vec<SlotNumber>': Vec<SlotNumber>;
    VrfData: VrfData;
    'Option<VrfData>': Option<VrfData>;
    'Vec<VrfData>': Vec<VrfData>;
    VrfOutput: VrfOutput;
    'Option<VrfOutput>': Option<VrfOutput>;
    'Vec<VrfOutput>': Vec<VrfOutput>;
    VrfProof: VrfProof;
    'Option<VrfProof>': Option<VrfProof>;
    'Vec<VrfProof>': Vec<VrfProof>;
    AccountData: AccountData;
    'Option<AccountData>': Option<AccountData>;
    'Vec<AccountData>': Vec<AccountData>;
    BalanceLockTo212: BalanceLockTo212;
    'Option<BalanceLockTo212>': Option<BalanceLockTo212>;
    'Vec<BalanceLockTo212>': Vec<BalanceLockTo212>;
    BalanceLock: BalanceLock;
    'Option<BalanceLock>': Option<BalanceLock>;
    'Vec<BalanceLock>': Vec<BalanceLock>;
    BalanceStatus: BalanceStatus;
    'Option<BalanceStatus>': Option<BalanceStatus>;
    'Vec<BalanceStatus>': Vec<BalanceStatus>;
    Reasons: Reasons;
    'Option<Reasons>': Option<Reasons>;
    'Vec<Reasons>': Vec<Reasons>;
    VestingSchedule: VestingSchedule;
    'Option<VestingSchedule>': Option<VestingSchedule>;
    'Vec<VestingSchedule>': Vec<VestingSchedule>;
    WithdrawReasons: WithdrawReasons;
    'Option<WithdrawReasons>': Option<WithdrawReasons>;
    'Vec<WithdrawReasons>': Vec<WithdrawReasons>;
    CollectiveOrigin: CollectiveOrigin;
    'Option<CollectiveOrigin>': Option<CollectiveOrigin>;
    'Vec<CollectiveOrigin>': Vec<CollectiveOrigin>;
    MemberCount: MemberCount;
    'Compact<MemberCount>': Compact<MemberCount>;
    'Option<MemberCount>': Option<MemberCount>;
    'Vec<MemberCount>': Vec<MemberCount>;
    ProposalIndex: ProposalIndex;
    'Compact<ProposalIndex>': Compact<ProposalIndex>;
    'Option<ProposalIndex>': Option<ProposalIndex>;
    'Vec<ProposalIndex>': Vec<ProposalIndex>;
    VotesTo230: VotesTo230;
    'Option<VotesTo230>': Option<VotesTo230>;
    'Vec<VotesTo230>': Vec<VotesTo230>;
    Votes: Votes;
    'Option<Votes>': Option<Votes>;
    'Vec<Votes>': Vec<Votes>;
    AuthorityId: AuthorityId;
    'Option<AuthorityId>': Option<AuthorityId>;
    'Vec<AuthorityId>': Vec<AuthorityId>;
    RawVRFOutput: RawVRFOutput;
    'Option<RawVRFOutput>': Option<RawVRFOutput>;
    'Vec<RawVRFOutput>': Vec<RawVRFOutput>;
    AliveContractInfo: AliveContractInfo;
    'Option<AliveContractInfo>': Option<AliveContractInfo>;
    'Vec<AliveContractInfo>': Vec<AliveContractInfo>;
    CodeHash: CodeHash;
    'Option<CodeHash>': Option<CodeHash>;
    'Vec<CodeHash>': Vec<CodeHash>;
    ContractCallRequest: ContractCallRequest;
    'Option<ContractCallRequest>': Option<ContractCallRequest>;
    'Vec<ContractCallRequest>': Vec<ContractCallRequest>;
    ContractExecResultSuccessTo255: ContractExecResultSuccessTo255;
    'Option<ContractExecResultSuccessTo255>': Option<ContractExecResultSuccessTo255>;
    'Vec<ContractExecResultSuccessTo255>': Vec<ContractExecResultSuccessTo255>;
    ContractExecResultTo255: ContractExecResultTo255;
    'Option<ContractExecResultTo255>': Option<ContractExecResultTo255>;
    'Vec<ContractExecResultTo255>': Vec<ContractExecResultTo255>;
    ContractExecResultSuccess: ContractExecResultSuccess;
    'Option<ContractExecResultSuccess>': Option<ContractExecResultSuccess>;
    'Vec<ContractExecResultSuccess>': Vec<ContractExecResultSuccess>;
    ContractExecResult: ContractExecResult;
    'Option<ContractExecResult>': Option<ContractExecResult>;
    'Vec<ContractExecResult>': Vec<ContractExecResult>;
    ContractInfo: ContractInfo;
    'Option<ContractInfo>': Option<ContractInfo>;
    'Vec<ContractInfo>': Vec<ContractInfo>;
    ContractStorageKey: ContractStorageKey;
    'Option<ContractStorageKey>': Option<ContractStorageKey>;
    'Vec<ContractStorageKey>': Vec<ContractStorageKey>;
    Gas: Gas;
    'Compact<Gas>': Compact<Gas>;
    'Option<Gas>': Option<Gas>;
    'Vec<Gas>': Vec<Gas>;
    HostFnWeights: HostFnWeights;
    'Option<HostFnWeights>': Option<HostFnWeights>;
    'Vec<HostFnWeights>': Vec<HostFnWeights>;
    InstructionWeights: InstructionWeights;
    'Option<InstructionWeights>': Option<InstructionWeights>;
    'Vec<InstructionWeights>': Vec<InstructionWeights>;
    PrefabWasmModule: PrefabWasmModule;
    'Option<PrefabWasmModule>': Option<PrefabWasmModule>;
    'Vec<PrefabWasmModule>': Vec<PrefabWasmModule>;
    PrefabWasmModuleReserved: PrefabWasmModuleReserved;
    'Option<PrefabWasmModuleReserved>': Option<PrefabWasmModuleReserved>;
    'Vec<PrefabWasmModuleReserved>': Vec<PrefabWasmModuleReserved>;
    ScheduleTo212: ScheduleTo212;
    'Option<ScheduleTo212>': Option<ScheduleTo212>;
    'Vec<ScheduleTo212>': Vec<ScheduleTo212>;
    ScheduleTo258: ScheduleTo258;
    'Option<ScheduleTo258>': Option<ScheduleTo258>;
    'Vec<ScheduleTo258>': Vec<ScheduleTo258>;
    Schedule: Schedule;
    'Option<Schedule>': Option<Schedule>;
    'Vec<Schedule>': Vec<Schedule>;
    SeedOf: SeedOf;
    'Option<SeedOf>': Option<SeedOf>;
    'Vec<SeedOf>': Vec<SeedOf>;
    TombstoneContractInfo: TombstoneContractInfo;
    'Option<TombstoneContractInfo>': Option<TombstoneContractInfo>;
    'Vec<TombstoneContractInfo>': Vec<TombstoneContractInfo>;
    TrieId: TrieId;
    'Option<TrieId>': Option<TrieId>;
    'Vec<TrieId>': Vec<TrieId>;
    AccountVote: AccountVote;
    'Option<AccountVote>': Option<AccountVote>;
    'Vec<AccountVote>': Vec<AccountVote>;
    AccountVoteSplit: AccountVoteSplit;
    'Option<AccountVoteSplit>': Option<AccountVoteSplit>;
    'Vec<AccountVoteSplit>': Vec<AccountVoteSplit>;
    AccountVoteStandard: AccountVoteStandard;
    'Option<AccountVoteStandard>': Option<AccountVoteStandard>;
    'Vec<AccountVoteStandard>': Vec<AccountVoteStandard>;
    Conviction: Conviction;
    'Option<Conviction>': Option<Conviction>;
    'Vec<Conviction>': Vec<Conviction>;
    Delegations: Delegations;
    'Option<Delegations>': Option<Delegations>;
    'Vec<Delegations>': Vec<Delegations>;
    PreimageStatus: PreimageStatus;
    'Option<PreimageStatus>': Option<PreimageStatus>;
    'Vec<PreimageStatus>': Vec<PreimageStatus>;
    PreimageStatusAvailable: PreimageStatusAvailable;
    'Option<PreimageStatusAvailable>': Option<PreimageStatusAvailable>;
    'Vec<PreimageStatusAvailable>': Vec<PreimageStatusAvailable>;
    PriorLock: PriorLock;
    'Option<PriorLock>': Option<PriorLock>;
    'Vec<PriorLock>': Vec<PriorLock>;
    PropIndex: PropIndex;
    'Compact<PropIndex>': Compact<PropIndex>;
    'Option<PropIndex>': Option<PropIndex>;
    'Vec<PropIndex>': Vec<PropIndex>;
    Proposal: Proposal;
    'Option<Proposal>': Option<Proposal>;
    'Vec<Proposal>': Vec<Proposal>;
    ProxyState: ProxyState;
    'Option<ProxyState>': Option<ProxyState>;
    'Vec<ProxyState>': Vec<ProxyState>;
    ReferendumIndex: ReferendumIndex;
    'Compact<ReferendumIndex>': Compact<ReferendumIndex>;
    'Option<ReferendumIndex>': Option<ReferendumIndex>;
    'Vec<ReferendumIndex>': Vec<ReferendumIndex>;
    ReferendumInfoTo239: ReferendumInfoTo239;
    'Option<ReferendumInfoTo239>': Option<ReferendumInfoTo239>;
    'Vec<ReferendumInfoTo239>': Vec<ReferendumInfoTo239>;
    ReferendumInfo: ReferendumInfo;
    'Option<ReferendumInfo>': Option<ReferendumInfo>;
    'Vec<ReferendumInfo>': Vec<ReferendumInfo>;
    ReferendumInfoFinished: ReferendumInfoFinished;
    'Option<ReferendumInfoFinished>': Option<ReferendumInfoFinished>;
    'Vec<ReferendumInfoFinished>': Vec<ReferendumInfoFinished>;
    ReferendumStatus: ReferendumStatus;
    'Option<ReferendumStatus>': Option<ReferendumStatus>;
    'Vec<ReferendumStatus>': Vec<ReferendumStatus>;
    Tally: Tally;
    'Option<Tally>': Option<Tally>;
    'Vec<Tally>': Vec<Tally>;
    Voting: Voting;
    'Option<Voting>': Option<Voting>;
    'Vec<Voting>': Vec<Voting>;
    VotingDirect: VotingDirect;
    'Option<VotingDirect>': Option<VotingDirect>;
    'Vec<VotingDirect>': Vec<VotingDirect>;
    VotingDirectVote: VotingDirectVote;
    'Option<VotingDirectVote>': Option<VotingDirectVote>;
    'Vec<VotingDirectVote>': Vec<VotingDirectVote>;
    VotingDelegating: VotingDelegating;
    'Option<VotingDelegating>': Option<VotingDelegating>;
    'Vec<VotingDelegating>': Vec<VotingDelegating>;
    ApprovalFlag: ApprovalFlag;
    'Compact<ApprovalFlag>': Compact<ApprovalFlag>;
    'Option<ApprovalFlag>': Option<ApprovalFlag>;
    'Vec<ApprovalFlag>': Vec<ApprovalFlag>;
    DefunctVoter: DefunctVoter;
    'Option<DefunctVoter>': Option<DefunctVoter>;
    'Vec<DefunctVoter>': Vec<DefunctVoter>;
    Renouncing: Renouncing;
    'Option<Renouncing>': Option<Renouncing>;
    'Vec<Renouncing>': Vec<Renouncing>;
    SetIndex: SetIndex;
    'Compact<SetIndex>': Compact<SetIndex>;
    'Option<SetIndex>': Option<SetIndex>;
    'Vec<SetIndex>': Vec<SetIndex>;
    Vote: Vote;
    'Option<Vote>': Option<Vote>;
    'Vec<Vote>': Vec<Vote>;
    VoteIndex: VoteIndex;
    'Compact<VoteIndex>': Compact<VoteIndex>;
    'Option<VoteIndex>': Option<VoteIndex>;
    'Vec<VoteIndex>': Vec<VoteIndex>;
    VoterInfo: VoterInfo;
    'Option<VoterInfo>': Option<VoterInfo>;
    'Vec<VoterInfo>': Vec<VoterInfo>;
    VoteThreshold: VoteThreshold;
    'Option<VoteThreshold>': Option<VoteThreshold>;
    'Vec<VoteThreshold>': Vec<VoteThreshold>;
    CreatedBlock: CreatedBlock;
    'Option<CreatedBlock>': Option<CreatedBlock>;
    'Vec<CreatedBlock>': Vec<CreatedBlock>;
    ImportedAux: ImportedAux;
    'Option<ImportedAux>': Option<ImportedAux>;
    'Vec<ImportedAux>': Vec<ImportedAux>;
    Account: Account;
    'Option<Account>': Option<Account>;
    'Vec<Account>': Vec<Account>;
    Log: Log;
    'Option<Log>': Option<Log>;
    'Vec<Log>': Vec<Log>;
    Vicinity: Vicinity;
    'Option<Vicinity>': Option<Vicinity>;
    'Vec<Vicinity>': Vec<Vicinity>;
    Extrinsic: Extrinsic;
    'Option<Extrinsic>': Option<Extrinsic>;
    'Vec<Extrinsic>': Vec<Extrinsic>;
    ExtrinsicEra: ExtrinsicEra;
    'Option<ExtrinsicEra>': Option<ExtrinsicEra>;
    'Vec<ExtrinsicEra>': Vec<ExtrinsicEra>;
    ExtrinsicPayload: ExtrinsicPayload;
    'Option<ExtrinsicPayload>': Option<ExtrinsicPayload>;
    'Vec<ExtrinsicPayload>': Vec<ExtrinsicPayload>;
    ExtrinsicV4: ExtrinsicV4;
    'Option<ExtrinsicV4>': Option<ExtrinsicV4>;
    'Vec<ExtrinsicV4>': Vec<ExtrinsicV4>;
    ExtrinsicPayloadV4: ExtrinsicPayloadV4;
    'Option<ExtrinsicPayloadV4>': Option<ExtrinsicPayloadV4>;
    'Vec<ExtrinsicPayloadV4>': Vec<ExtrinsicPayloadV4>;
    ExtrinsicSignatureV4: ExtrinsicSignatureV4;
    'Option<ExtrinsicSignatureV4>': Option<ExtrinsicSignatureV4>;
    'Vec<ExtrinsicSignatureV4>': Vec<ExtrinsicSignatureV4>;
    ExtrinsicUnknown: ExtrinsicUnknown;
    'Option<ExtrinsicUnknown>': Option<ExtrinsicUnknown>;
    'Vec<ExtrinsicUnknown>': Vec<ExtrinsicUnknown>;
    ExtrinsicPayloadUnknown: ExtrinsicPayloadUnknown;
    'Option<ExtrinsicPayloadUnknown>': Option<ExtrinsicPayloadUnknown>;
    'Vec<ExtrinsicPayloadUnknown>': Vec<ExtrinsicPayloadUnknown>;
    ImmortalEra: ImmortalEra;
    'Option<ImmortalEra>': Option<ImmortalEra>;
    'Vec<ImmortalEra>': Vec<ImmortalEra>;
    MortalEra: MortalEra;
    'Option<MortalEra>': Option<MortalEra>;
    'Vec<MortalEra>': Vec<MortalEra>;
    MultiSignature: MultiSignature;
    'Option<MultiSignature>': Option<MultiSignature>;
    'Vec<MultiSignature>': Vec<MultiSignature>;
    Signature: Signature;
    'Option<Signature>': Option<Signature>;
    'Vec<Signature>': Vec<Signature>;
    SignerPayload: SignerPayload;
    'Option<SignerPayload>': Option<SignerPayload>;
    'Vec<SignerPayload>': Vec<SignerPayload>;
    EcdsaSignature: EcdsaSignature;
    'Option<EcdsaSignature>': Option<EcdsaSignature>;
    'Vec<EcdsaSignature>': Vec<EcdsaSignature>;
    Ed25519Signature: Ed25519Signature;
    'Option<Ed25519Signature>': Option<Ed25519Signature>;
    'Vec<Ed25519Signature>': Vec<Ed25519Signature>;
    Sr25519Signature: Sr25519Signature;
    'Option<Sr25519Signature>': Option<Sr25519Signature>;
    'Vec<Sr25519Signature>': Vec<Sr25519Signature>;
    AssetOptions: AssetOptions;
    'Option<AssetOptions>': Option<AssetOptions>;
    'Vec<AssetOptions>': Vec<AssetOptions>;
    Owner: Owner;
    'Option<Owner>': Option<Owner>;
    'Vec<Owner>': Vec<Owner>;
    PermissionsV1: PermissionsV1;
    'Option<PermissionsV1>': Option<PermissionsV1>;
    'Vec<PermissionsV1>': Vec<PermissionsV1>;
    PermissionVersions: PermissionVersions;
    'Option<PermissionVersions>': Option<PermissionVersions>;
    'Vec<PermissionVersions>': Vec<PermissionVersions>;
    PermissionLatest: PermissionLatest;
    'Option<PermissionLatest>': Option<PermissionLatest>;
    'Vec<PermissionLatest>': Vec<PermissionLatest>;
    AuthorityIndex: AuthorityIndex;
    'Compact<AuthorityIndex>': Compact<AuthorityIndex>;
    'Option<AuthorityIndex>': Option<AuthorityIndex>;
    'Vec<AuthorityIndex>': Vec<AuthorityIndex>;
    AuthorityList: AuthorityList;
    'Option<AuthorityList>': Option<AuthorityList>;
    'Vec<AuthorityList>': Vec<AuthorityList>;
    AuthorityWeight: AuthorityWeight;
    'Compact<AuthorityWeight>': Compact<AuthorityWeight>;
    'Option<AuthorityWeight>': Option<AuthorityWeight>;
    'Vec<AuthorityWeight>': Vec<AuthorityWeight>;
    EncodedFinalityProofs: EncodedFinalityProofs;
    'Option<EncodedFinalityProofs>': Option<EncodedFinalityProofs>;
    'Vec<EncodedFinalityProofs>': Vec<EncodedFinalityProofs>;
    GrandpaEquivocation: GrandpaEquivocation;
    'Option<GrandpaEquivocation>': Option<GrandpaEquivocation>;
    'Vec<GrandpaEquivocation>': Vec<GrandpaEquivocation>;
    GrandpaEquivocationProof: GrandpaEquivocationProof;
    'Option<GrandpaEquivocationProof>': Option<GrandpaEquivocationProof>;
    'Vec<GrandpaEquivocationProof>': Vec<GrandpaEquivocationProof>;
    GrandpaEquivocationValue: GrandpaEquivocationValue;
    'Option<GrandpaEquivocationValue>': Option<GrandpaEquivocationValue>;
    'Vec<GrandpaEquivocationValue>': Vec<GrandpaEquivocationValue>;
    GrandpaPrevote: GrandpaPrevote;
    'Option<GrandpaPrevote>': Option<GrandpaPrevote>;
    'Vec<GrandpaPrevote>': Vec<GrandpaPrevote>;
    JustificationNotification: JustificationNotification;
    'Option<JustificationNotification>': Option<JustificationNotification>;
    'Vec<JustificationNotification>': Vec<JustificationNotification>;
    KeyOwnerProof: KeyOwnerProof;
    'Option<KeyOwnerProof>': Option<KeyOwnerProof>;
    'Vec<KeyOwnerProof>': Vec<KeyOwnerProof>;
    NextAuthority: NextAuthority;
    'Option<NextAuthority>': Option<NextAuthority>;
    'Vec<NextAuthority>': Vec<NextAuthority>;
    PendingPause: PendingPause;
    'Option<PendingPause>': Option<PendingPause>;
    'Vec<PendingPause>': Vec<PendingPause>;
    PendingResume: PendingResume;
    'Option<PendingResume>': Option<PendingResume>;
    'Vec<PendingResume>': Vec<PendingResume>;
    Precommits: Precommits;
    'Option<Precommits>': Option<Precommits>;
    'Vec<Precommits>': Vec<Precommits>;
    Prevotes: Prevotes;
    'Option<Prevotes>': Option<Prevotes>;
    'Vec<Prevotes>': Vec<Prevotes>;
    ReportedRoundStates: ReportedRoundStates;
    'Option<ReportedRoundStates>': Option<ReportedRoundStates>;
    'Vec<ReportedRoundStates>': Vec<ReportedRoundStates>;
    RoundState: RoundState;
    'Option<RoundState>': Option<RoundState>;
    'Vec<RoundState>': Vec<RoundState>;
    SetId: SetId;
    'Compact<SetId>': Compact<SetId>;
    'Option<SetId>': Option<SetId>;
    'Vec<SetId>': Vec<SetId>;
    StoredPendingChange: StoredPendingChange;
    'Option<StoredPendingChange>': Option<StoredPendingChange>;
    'Vec<StoredPendingChange>': Vec<StoredPendingChange>;
    StoredState: StoredState;
    'Option<StoredState>': Option<StoredState>;
    'Vec<StoredState>': Vec<StoredState>;
    IdentityFields: IdentityFields;
    'Option<IdentityFields>': Option<IdentityFields>;
    'Vec<IdentityFields>': Vec<IdentityFields>;
    IdentityInfoAdditional: IdentityInfoAdditional;
    'Option<IdentityInfoAdditional>': Option<IdentityInfoAdditional>;
    'Vec<IdentityInfoAdditional>': Vec<IdentityInfoAdditional>;
    IdentityInfo: IdentityInfo;
    'Option<IdentityInfo>': Option<IdentityInfo>;
    'Vec<IdentityInfo>': Vec<IdentityInfo>;
    IdentityJudgement: IdentityJudgement;
    'Option<IdentityJudgement>': Option<IdentityJudgement>;
    'Vec<IdentityJudgement>': Vec<IdentityJudgement>;
    RegistrationJudgement: RegistrationJudgement;
    'Option<RegistrationJudgement>': Option<RegistrationJudgement>;
    'Vec<RegistrationJudgement>': Vec<RegistrationJudgement>;
    Registration: Registration;
    'Option<Registration>': Option<Registration>;
    'Vec<Registration>': Vec<Registration>;
    RegistrarIndex: RegistrarIndex;
    'Compact<RegistrarIndex>': Compact<RegistrarIndex>;
    'Option<RegistrarIndex>': Option<RegistrarIndex>;
    'Vec<RegistrarIndex>': Vec<RegistrarIndex>;
    RegistrarInfo: RegistrarInfo;
    'Option<RegistrarInfo>': Option<RegistrarInfo>;
    'Vec<RegistrarInfo>': Vec<RegistrarInfo>;
    AuthIndex: AuthIndex;
    'Compact<AuthIndex>': Compact<AuthIndex>;
    'Option<AuthIndex>': Option<AuthIndex>;
    'Vec<AuthIndex>': Vec<AuthIndex>;
    AuthoritySignature: AuthoritySignature;
    'Option<AuthoritySignature>': Option<AuthoritySignature>;
    'Vec<AuthoritySignature>': Vec<AuthoritySignature>;
    Heartbeat: Heartbeat;
    'Option<Heartbeat>': Option<Heartbeat>;
    'Vec<Heartbeat>': Vec<Heartbeat>;
    HeartbeatTo244: HeartbeatTo244;
    'Option<HeartbeatTo244>': Option<HeartbeatTo244>;
    'Vec<HeartbeatTo244>': Vec<HeartbeatTo244>;
    OpaqueMultiaddr: OpaqueMultiaddr;
    'Option<OpaqueMultiaddr>': Option<OpaqueMultiaddr>;
    'Vec<OpaqueMultiaddr>': Vec<OpaqueMultiaddr>;
    OpaquePeerId: OpaquePeerId;
    'Option<OpaquePeerId>': Option<OpaquePeerId>;
    'Vec<OpaquePeerId>': Vec<OpaquePeerId>;
    OpaqueNetworkState: OpaqueNetworkState;
    'Option<OpaqueNetworkState>': Option<OpaqueNetworkState>;
    'Vec<OpaqueNetworkState>': Vec<OpaqueNetworkState>;
    DeferredOffenceOf: DeferredOffenceOf;
    'Option<DeferredOffenceOf>': Option<DeferredOffenceOf>;
    'Vec<DeferredOffenceOf>': Vec<DeferredOffenceOf>;
    Kind: Kind;
    'Option<Kind>': Option<Kind>;
    'Vec<Kind>': Vec<Kind>;
    OffenceDetails: OffenceDetails;
    'Option<OffenceDetails>': Option<OffenceDetails>;
    'Vec<OffenceDetails>': Vec<OffenceDetails>;
    Offender: Offender;
    'Option<Offender>': Option<Offender>;
    'Vec<Offender>': Vec<Offender>;
    OpaqueTimeSlot: OpaqueTimeSlot;
    'Option<OpaqueTimeSlot>': Option<OpaqueTimeSlot>;
    'Vec<OpaqueTimeSlot>': Vec<OpaqueTimeSlot>;
    ReportIdOf: ReportIdOf;
    'Option<ReportIdOf>': Option<ReportIdOf>;
    'Vec<ReportIdOf>': Vec<ReportIdOf>;
    Reporter: Reporter;
    'Option<Reporter>': Option<Reporter>;
    'Vec<Reporter>': Vec<Reporter>;
    ProxyDefinition: ProxyDefinition;
    'Option<ProxyDefinition>': Option<ProxyDefinition>;
    'Vec<ProxyDefinition>': Vec<ProxyDefinition>;
    ProxyType: ProxyType;
    'Option<ProxyType>': Option<ProxyType>;
    'Vec<ProxyType>': Vec<ProxyType>;
    ProxyAnnouncement: ProxyAnnouncement;
    'Option<ProxyAnnouncement>': Option<ProxyAnnouncement>;
    'Vec<ProxyAnnouncement>': Vec<ProxyAnnouncement>;
    ActiveRecovery: ActiveRecovery;
    'Option<ActiveRecovery>': Option<ActiveRecovery>;
    'Vec<ActiveRecovery>': Vec<ActiveRecovery>;
    RecoveryConfig: RecoveryConfig;
    'Option<RecoveryConfig>': Option<RecoveryConfig>;
    'Vec<RecoveryConfig>': Vec<RecoveryConfig>;
    Period: Period;
    'Option<Period>': Option<Period>;
    'Vec<Period>': Vec<Period>;
    Priority: Priority;
    'Compact<Priority>': Compact<Priority>;
    'Option<Priority>': Option<Priority>;
    'Vec<Priority>': Vec<Priority>;
    SchedulePeriod: SchedulePeriod;
    'Option<SchedulePeriod>': Option<SchedulePeriod>;
    'Vec<SchedulePeriod>': Vec<SchedulePeriod>;
    SchedulePriority: SchedulePriority;
    'Compact<SchedulePriority>': Compact<SchedulePriority>;
    'Option<SchedulePriority>': Option<SchedulePriority>;
    'Vec<SchedulePriority>': Vec<SchedulePriority>;
    Scheduled: Scheduled;
    'Option<Scheduled>': Option<Scheduled>;
    'Vec<Scheduled>': Vec<Scheduled>;
    ScheduledTo254: ScheduledTo254;
    'Option<ScheduledTo254>': Option<ScheduledTo254>;
    'Vec<ScheduledTo254>': Vec<ScheduledTo254>;
    TaskAddress: TaskAddress;
    'Option<TaskAddress>': Option<TaskAddress>;
    'Vec<TaskAddress>': Vec<TaskAddress>;
    Keys: Keys;
    'Option<Keys>': Option<Keys>;
    'Vec<Keys>': Vec<Keys>;
    SessionKeys1: SessionKeys1;
    'Option<SessionKeys1>': Option<SessionKeys1>;
    'Vec<SessionKeys1>': Vec<SessionKeys1>;
    SessionKeys2: SessionKeys2;
    'Option<SessionKeys2>': Option<SessionKeys2>;
    'Vec<SessionKeys2>': Vec<SessionKeys2>;
    SessionKeys3: SessionKeys3;
    'Option<SessionKeys3>': Option<SessionKeys3>;
    'Vec<SessionKeys3>': Vec<SessionKeys3>;
    SessionKeys4: SessionKeys4;
    'Option<SessionKeys4>': Option<SessionKeys4>;
    'Vec<SessionKeys4>': Vec<SessionKeys4>;
    SessionKeys5: SessionKeys5;
    'Option<SessionKeys5>': Option<SessionKeys5>;
    'Vec<SessionKeys5>': Vec<SessionKeys5>;
    SessionKeys6: SessionKeys6;
    'Option<SessionKeys6>': Option<SessionKeys6>;
    'Vec<SessionKeys6>': Vec<SessionKeys6>;
    FullIdentification: FullIdentification;
    'Option<FullIdentification>': Option<FullIdentification>;
    'Vec<FullIdentification>': Vec<FullIdentification>;
    IdentificationTuple: IdentificationTuple;
    'Option<IdentificationTuple>': Option<IdentificationTuple>;
    'Vec<IdentificationTuple>': Vec<IdentificationTuple>;
    MembershipProof: MembershipProof;
    'Option<MembershipProof>': Option<MembershipProof>;
    'Vec<MembershipProof>': Vec<MembershipProof>;
    SessionIndex: SessionIndex;
    'Compact<SessionIndex>': Compact<SessionIndex>;
    'Option<SessionIndex>': Option<SessionIndex>;
    'Vec<SessionIndex>': Vec<SessionIndex>;
    ValidatorCount: ValidatorCount;
    'Compact<ValidatorCount>': Compact<ValidatorCount>;
    'Option<ValidatorCount>': Option<ValidatorCount>;
    'Vec<ValidatorCount>': Vec<ValidatorCount>;
    Bid: Bid;
    'Option<Bid>': Option<Bid>;
    'Vec<Bid>': Vec<Bid>;
    BidKind: BidKind;
    'Option<BidKind>': Option<BidKind>;
    'Vec<BidKind>': Vec<BidKind>;
    SocietyJudgement: SocietyJudgement;
    'Option<SocietyJudgement>': Option<SocietyJudgement>;
    'Vec<SocietyJudgement>': Vec<SocietyJudgement>;
    SocietyVote: SocietyVote;
    'Option<SocietyVote>': Option<SocietyVote>;
    'Vec<SocietyVote>': Vec<SocietyVote>;
    StrikeCount: StrikeCount;
    'Compact<StrikeCount>': Compact<StrikeCount>;
    'Option<StrikeCount>': Option<StrikeCount>;
    'Vec<StrikeCount>': Vec<StrikeCount>;
    VouchingStatus: VouchingStatus;
    'Option<VouchingStatus>': Option<VouchingStatus>;
    'Vec<VouchingStatus>': Vec<VouchingStatus>;
    WeightToFeeCoefficient: WeightToFeeCoefficient;
    'Option<WeightToFeeCoefficient>': Option<WeightToFeeCoefficient>;
    'Vec<WeightToFeeCoefficient>': Vec<WeightToFeeCoefficient>;
    Bounty: Bounty;
    'Option<Bounty>': Option<Bounty>;
    'Vec<Bounty>': Vec<Bounty>;
    BountyIndex: BountyIndex;
    'Compact<BountyIndex>': Compact<BountyIndex>;
    'Option<BountyIndex>': Option<BountyIndex>;
    'Vec<BountyIndex>': Vec<BountyIndex>;
    BountyStatus: BountyStatus;
    'Option<BountyStatus>': Option<BountyStatus>;
    'Vec<BountyStatus>': Vec<BountyStatus>;
    BountyStatusActive: BountyStatusActive;
    'Option<BountyStatusActive>': Option<BountyStatusActive>;
    'Vec<BountyStatusActive>': Vec<BountyStatusActive>;
    BountyStatusCuratorProposed: BountyStatusCuratorProposed;
    'Option<BountyStatusCuratorProposed>': Option<BountyStatusCuratorProposed>;
    'Vec<BountyStatusCuratorProposed>': Vec<BountyStatusCuratorProposed>;
    BountyStatusPendingPayout: BountyStatusPendingPayout;
    'Option<BountyStatusPendingPayout>': Option<BountyStatusPendingPayout>;
    'Vec<BountyStatusPendingPayout>': Vec<BountyStatusPendingPayout>;
    OpenTip: OpenTip;
    'Option<OpenTip>': Option<OpenTip>;
    'Vec<OpenTip>': Vec<OpenTip>;
    OpenTipTo225: OpenTipTo225;
    'Option<OpenTipTo225>': Option<OpenTipTo225>;
    'Vec<OpenTipTo225>': Vec<OpenTipTo225>;
    OpenTipFinderTo225: OpenTipFinderTo225;
    'Option<OpenTipFinderTo225>': Option<OpenTipFinderTo225>;
    'Vec<OpenTipFinderTo225>': Vec<OpenTipFinderTo225>;
    OpenTipTip: OpenTipTip;
    'Option<OpenTipTip>': Option<OpenTipTip>;
    'Vec<OpenTipTip>': Vec<OpenTipTip>;
    TreasuryProposal: TreasuryProposal;
    'Option<TreasuryProposal>': Option<TreasuryProposal>;
    'Vec<TreasuryProposal>': Vec<TreasuryProposal>;
    Multiplier: Multiplier;
    'Option<Multiplier>': Option<Multiplier>;
    'Vec<Multiplier>': Vec<Multiplier>;
    Multisig: Multisig;
    'Option<Multisig>': Option<Multisig>;
    'Vec<Multisig>': Vec<Multisig>;
    Timepoint: Timepoint;
    'Option<Timepoint>': Option<Timepoint>;
    'Vec<Timepoint>': Vec<Timepoint>;
    VestingInfo: VestingInfo;
    'Option<VestingInfo>': Option<VestingInfo>;
    'Vec<VestingInfo>': Vec<VestingInfo>;
    BlockAttestations: BlockAttestations;
    'Option<BlockAttestations>': Option<BlockAttestations>;
    'Vec<BlockAttestations>': Vec<BlockAttestations>;
    IncludedBlocks: IncludedBlocks;
    'Option<IncludedBlocks>': Option<IncludedBlocks>;
    'Vec<IncludedBlocks>': Vec<IncludedBlocks>;
    MoreAttestations: MoreAttestations;
    'Option<MoreAttestations>': Option<MoreAttestations>;
    'Vec<MoreAttestations>': Vec<MoreAttestations>;
    EthereumAddress: EthereumAddress;
    'Option<EthereumAddress>': Option<EthereumAddress>;
    'Vec<EthereumAddress>': Vec<EthereumAddress>;
    StatementKind: StatementKind;
    'Option<StatementKind>': Option<StatementKind>;
    'Vec<StatementKind>': Vec<StatementKind>;
    ParachainProposal: ParachainProposal;
    'Option<ParachainProposal>': Option<ParachainProposal>;
    'Vec<ParachainProposal>': Vec<ParachainProposal>;
    RegisteredParachainInfo: RegisteredParachainInfo;
    'Option<RegisteredParachainInfo>': Option<RegisteredParachainInfo>;
    'Vec<RegisteredParachainInfo>': Vec<RegisteredParachainInfo>;
    AbridgedCandidateReceipt: AbridgedCandidateReceipt;
    'Option<AbridgedCandidateReceipt>': Option<AbridgedCandidateReceipt>;
    'Vec<AbridgedCandidateReceipt>': Vec<AbridgedCandidateReceipt>;
    AttestedCandidate: AttestedCandidate;
    'Option<AttestedCandidate>': Option<AttestedCandidate>;
    'Vec<AttestedCandidate>': Vec<AttestedCandidate>;
    AuctionIndex: AuctionIndex;
    'Compact<AuctionIndex>': Compact<AuctionIndex>;
    'Option<AuctionIndex>': Option<AuctionIndex>;
    'Vec<AuctionIndex>': Vec<AuctionIndex>;
    Bidder: Bidder;
    'Option<Bidder>': Option<Bidder>;
    'Vec<Bidder>': Vec<Bidder>;
    CandidateCommitments: CandidateCommitments;
    'Option<CandidateCommitments>': Option<CandidateCommitments>;
    'Vec<CandidateCommitments>': Vec<CandidateCommitments>;
    CandidateReceipt: CandidateReceipt;
    'Option<CandidateReceipt>': Option<CandidateReceipt>;
    'Vec<CandidateReceipt>': Vec<CandidateReceipt>;
    CollatorId: CollatorId;
    'Option<CollatorId>': Option<CollatorId>;
    'Vec<CollatorId>': Vec<CollatorId>;
    CollatorSignature: CollatorSignature;
    'Option<CollatorSignature>': Option<CollatorSignature>;
    'Vec<CollatorSignature>': Vec<CollatorSignature>;
    DoubleVoteReport: DoubleVoteReport;
    'Option<DoubleVoteReport>': Option<DoubleVoteReport>;
    'Vec<DoubleVoteReport>': Vec<DoubleVoteReport>;
    DownwardMessage: DownwardMessage;
    'Option<DownwardMessage>': Option<DownwardMessage>;
    'Vec<DownwardMessage>': Vec<DownwardMessage>;
    GlobalValidationSchedule: GlobalValidationSchedule;
    'Option<GlobalValidationSchedule>': Option<GlobalValidationSchedule>;
    'Vec<GlobalValidationSchedule>': Vec<GlobalValidationSchedule>;
    HeadData: HeadData;
    'Option<HeadData>': Option<HeadData>;
    'Vec<HeadData>': Vec<HeadData>;
    IncomingParachain: IncomingParachain;
    'Option<IncomingParachain>': Option<IncomingParachain>;
    'Vec<IncomingParachain>': Vec<IncomingParachain>;
    IncomingParachainFixed: IncomingParachainFixed;
    'Option<IncomingParachainFixed>': Option<IncomingParachainFixed>;
    'Vec<IncomingParachainFixed>': Vec<IncomingParachainFixed>;
    IncomingParachainDeploy: IncomingParachainDeploy;
    'Option<IncomingParachainDeploy>': Option<IncomingParachainDeploy>;
    'Vec<IncomingParachainDeploy>': Vec<IncomingParachainDeploy>;
    LeasePeriod: LeasePeriod;
    'Compact<LeasePeriod>': Compact<LeasePeriod>;
    'Option<LeasePeriod>': Option<LeasePeriod>;
    'Vec<LeasePeriod>': Vec<LeasePeriod>;
    LeasePeriodOf: LeasePeriodOf;
    'Compact<LeasePeriodOf>': Compact<LeasePeriodOf>;
    'Option<LeasePeriodOf>': Option<LeasePeriodOf>;
    'Vec<LeasePeriodOf>': Vec<LeasePeriodOf>;
    LocalValidationData: LocalValidationData;
    'Option<LocalValidationData>': Option<LocalValidationData>;
    'Vec<LocalValidationData>': Vec<LocalValidationData>;
    NewBidder: NewBidder;
    'Option<NewBidder>': Option<NewBidder>;
    'Vec<NewBidder>': Vec<NewBidder>;
    ParachainDispatchOrigin: ParachainDispatchOrigin;
    'Option<ParachainDispatchOrigin>': Option<ParachainDispatchOrigin>;
    'Vec<ParachainDispatchOrigin>': Vec<ParachainDispatchOrigin>;
    ParaId: ParaId;
    'Compact<ParaId>': Compact<ParaId>;
    'Option<ParaId>': Option<ParaId>;
    'Vec<ParaId>': Vec<ParaId>;
    ParaInfo: ParaInfo;
    'Option<ParaInfo>': Option<ParaInfo>;
    'Vec<ParaInfo>': Vec<ParaInfo>;
    ParaPastCodeMeta: ParaPastCodeMeta;
    'Option<ParaPastCodeMeta>': Option<ParaPastCodeMeta>;
    'Vec<ParaPastCodeMeta>': Vec<ParaPastCodeMeta>;
    ParaScheduling: ParaScheduling;
    'Option<ParaScheduling>': Option<ParaScheduling>;
    'Vec<ParaScheduling>': Vec<ParaScheduling>;
    RelayChainBlockNumber: RelayChainBlockNumber;
    'Compact<RelayChainBlockNumber>': Compact<RelayChainBlockNumber>;
    'Option<RelayChainBlockNumber>': Option<RelayChainBlockNumber>;
    'Vec<RelayChainBlockNumber>': Vec<RelayChainBlockNumber>;
    Remark: Remark;
    'Option<Remark>': Option<Remark>;
    'Vec<Remark>': Vec<Remark>;
    Retriable: Retriable;
    'Option<Retriable>': Option<Retriable>;
    'Vec<Retriable>': Vec<Retriable>;
    Scheduling: Scheduling;
    'Option<Scheduling>': Option<Scheduling>;
    'Vec<Scheduling>': Vec<Scheduling>;
    SigningContext: SigningContext;
    'Option<SigningContext>': Option<SigningContext>;
    'Vec<SigningContext>': Vec<SigningContext>;
    SlotRange: SlotRange;
    'Option<SlotRange>': Option<SlotRange>;
    'Vec<SlotRange>': Vec<SlotRange>;
    Statement: Statement;
    'Option<Statement>': Option<Statement>;
    'Vec<Statement>': Vec<Statement>;
    SubId: SubId;
    'Compact<SubId>': Compact<SubId>;
    'Option<SubId>': Option<SubId>;
    'Vec<SubId>': Vec<SubId>;
    UpwardMessage: UpwardMessage;
    'Option<UpwardMessage>': Option<UpwardMessage>;
    'Vec<UpwardMessage>': Vec<UpwardMessage>;
    ValidationFunctionParams: ValidationFunctionParams;
    'Option<ValidationFunctionParams>': Option<ValidationFunctionParams>;
    'Vec<ValidationFunctionParams>': Vec<ValidationFunctionParams>;
    ValidationCode: ValidationCode;
    'Option<ValidationCode>': Option<ValidationCode>;
    'Vec<ValidationCode>': Vec<ValidationCode>;
    ValidatorSignature: ValidatorSignature;
    'Option<ValidatorSignature>': Option<ValidatorSignature>;
    'Vec<ValidatorSignature>': Vec<ValidatorSignature>;
    ValidityAttestation: ValidityAttestation;
    'Option<ValidityAttestation>': Option<ValidityAttestation>;
    'Vec<ValidityAttestation>': Vec<ValidityAttestation>;
    WinningData: WinningData;
    'Option<WinningData>': Option<WinningData>;
    'Vec<WinningData>': Vec<WinningData>;
    WinningDataEntry: WinningDataEntry;
    'Option<WinningDataEntry>': Option<WinningDataEntry>;
    'Vec<WinningDataEntry>': Vec<WinningDataEntry>;
    Approvals: Approvals;
    'Option<Approvals>': Option<Approvals>;
    'Vec<Approvals>': Vec<Approvals>;
    AccountStatus: AccountStatus;
    'Option<AccountStatus>': Option<AccountStatus>;
    'Vec<AccountStatus>': Vec<AccountStatus>;
    AccountValidity: AccountValidity;
    'Option<AccountValidity>': Option<AccountValidity>;
    'Vec<AccountValidity>': Vec<AccountValidity>;
    ContractCryptoHasher: ContractCryptoHasher;
    'Option<ContractCryptoHasher>': Option<ContractCryptoHasher>;
    'Vec<ContractCryptoHasher>': Vec<ContractCryptoHasher>;
    ContractDiscriminant: ContractDiscriminant;
    'Compact<ContractDiscriminant>': Compact<ContractDiscriminant>;
    'Option<ContractDiscriminant>': Option<ContractDiscriminant>;
    'Vec<ContractDiscriminant>': Vec<ContractDiscriminant>;
    ContractLayoutArray: ContractLayoutArray;
    'Option<ContractLayoutArray>': Option<ContractLayoutArray>;
    'Vec<ContractLayoutArray>': Vec<ContractLayoutArray>;
    ContractLayoutCell: ContractLayoutCell;
    'Option<ContractLayoutCell>': Option<ContractLayoutCell>;
    'Vec<ContractLayoutCell>': Vec<ContractLayoutCell>;
    ContractLayoutEnum: ContractLayoutEnum;
    'Option<ContractLayoutEnum>': Option<ContractLayoutEnum>;
    'Vec<ContractLayoutEnum>': Vec<ContractLayoutEnum>;
    ContractLayoutHash: ContractLayoutHash;
    'Option<ContractLayoutHash>': Option<ContractLayoutHash>;
    'Vec<ContractLayoutHash>': Vec<ContractLayoutHash>;
    ContractLayoutHashingStrategy: ContractLayoutHashingStrategy;
    'Option<ContractLayoutHashingStrategy>': Option<ContractLayoutHashingStrategy>;
    'Vec<ContractLayoutHashingStrategy>': Vec<ContractLayoutHashingStrategy>;
    ContractLayoutKey: ContractLayoutKey;
    'Option<ContractLayoutKey>': Option<ContractLayoutKey>;
    'Vec<ContractLayoutKey>': Vec<ContractLayoutKey>;
    ContractLayoutStruct: ContractLayoutStruct;
    'Option<ContractLayoutStruct>': Option<ContractLayoutStruct>;
    'Vec<ContractLayoutStruct>': Vec<ContractLayoutStruct>;
    ContractLayoutStructField: ContractLayoutStructField;
    'Option<ContractLayoutStructField>': Option<ContractLayoutStructField>;
    'Vec<ContractLayoutStructField>': Vec<ContractLayoutStructField>;
    ContractStorageLayout: ContractStorageLayout;
    'Option<ContractStorageLayout>': Option<ContractStorageLayout>;
    'Vec<ContractStorageLayout>': Vec<ContractStorageLayout>;
    ContractConstructorSpec: ContractConstructorSpec;
    'Option<ContractConstructorSpec>': Option<ContractConstructorSpec>;
    'Vec<ContractConstructorSpec>': Vec<ContractConstructorSpec>;
    ContractContractSpec: ContractContractSpec;
    'Option<ContractContractSpec>': Option<ContractContractSpec>;
    'Vec<ContractContractSpec>': Vec<ContractContractSpec>;
    ContractDisplayName: ContractDisplayName;
    'Option<ContractDisplayName>': Option<ContractDisplayName>;
    'Vec<ContractDisplayName>': Vec<ContractDisplayName>;
    ContractEventParamSpec: ContractEventParamSpec;
    'Option<ContractEventParamSpec>': Option<ContractEventParamSpec>;
    'Vec<ContractEventParamSpec>': Vec<ContractEventParamSpec>;
    ContractEventSpec: ContractEventSpec;
    'Option<ContractEventSpec>': Option<ContractEventSpec>;
    'Vec<ContractEventSpec>': Vec<ContractEventSpec>;
    ContractMessageParamSpec: ContractMessageParamSpec;
    'Option<ContractMessageParamSpec>': Option<ContractMessageParamSpec>;
    'Vec<ContractMessageParamSpec>': Vec<ContractMessageParamSpec>;
    ContractMessageSpec: ContractMessageSpec;
    'Option<ContractMessageSpec>': Option<ContractMessageSpec>;
    'Vec<ContractMessageSpec>': Vec<ContractMessageSpec>;
    ContractSelector: ContractSelector;
    'Option<ContractSelector>': Option<ContractSelector>;
    'Vec<ContractSelector>': Vec<ContractSelector>;
    ContractTypeSpec: ContractTypeSpec;
    'Option<ContractTypeSpec>': Option<ContractTypeSpec>;
    'Vec<ContractTypeSpec>': Vec<ContractTypeSpec>;
    ContractProject: ContractProject;
    'Option<ContractProject>': Option<ContractProject>;
    'Vec<ContractProject>': Vec<ContractProject>;
    ContractProjectContract: ContractProjectContract;
    'Option<ContractProjectContract>': Option<ContractProjectContract>;
    'Vec<ContractProjectContract>': Vec<ContractProjectContract>;
    ContractProjectSource: ContractProjectSource;
    'Option<ContractProjectSource>': Option<ContractProjectSource>;
    'Vec<ContractProjectSource>': Vec<ContractProjectSource>;
    SiField: SiField;
    'Option<SiField>': Option<SiField>;
    'Vec<SiField>': Vec<SiField>;
    SiLookupTypeId: SiLookupTypeId;
    'Compact<SiLookupTypeId>': Compact<SiLookupTypeId>;
    'Option<SiLookupTypeId>': Option<SiLookupTypeId>;
    'Vec<SiLookupTypeId>': Vec<SiLookupTypeId>;
    SiPath: SiPath;
    'Option<SiPath>': Option<SiPath>;
    'Vec<SiPath>': Vec<SiPath>;
    SiType: SiType;
    'Option<SiType>': Option<SiType>;
    'Vec<SiType>': Vec<SiType>;
    SiTypeDef: SiTypeDef;
    'Option<SiTypeDef>': Option<SiTypeDef>;
    'Vec<SiTypeDef>': Vec<SiTypeDef>;
    SiTypeDefArray: SiTypeDefArray;
    'Option<SiTypeDefArray>': Option<SiTypeDefArray>;
    'Vec<SiTypeDefArray>': Vec<SiTypeDefArray>;
    SiTypeDefComposite: SiTypeDefComposite;
    'Option<SiTypeDefComposite>': Option<SiTypeDefComposite>;
    'Vec<SiTypeDefComposite>': Vec<SiTypeDefComposite>;
    SiTypeDefVariant: SiTypeDefVariant;
    'Option<SiTypeDefVariant>': Option<SiTypeDefVariant>;
    'Vec<SiTypeDefVariant>': Vec<SiTypeDefVariant>;
    SiTypeDefPrimitive: SiTypeDefPrimitive;
    'Option<SiTypeDefPrimitive>': Option<SiTypeDefPrimitive>;
    'Vec<SiTypeDefPrimitive>': Vec<SiTypeDefPrimitive>;
    SiTypeDefSequence: SiTypeDefSequence;
    'Option<SiTypeDefSequence>': Option<SiTypeDefSequence>;
    'Vec<SiTypeDefSequence>': Vec<SiTypeDefSequence>;
    SiTypeDefTuple: SiTypeDefTuple;
    'Option<SiTypeDefTuple>': Option<SiTypeDefTuple>;
    'Vec<SiTypeDefTuple>': Vec<SiTypeDefTuple>;
    SiVariant: SiVariant;
    'Option<SiVariant>': Option<SiVariant>;
    'Vec<SiVariant>': Vec<SiVariant>;
    EthereumAccountId: EthereumAccountId;
    'Option<EthereumAccountId>': Option<EthereumAccountId>;
    'Vec<EthereumAccountId>': Vec<EthereumAccountId>;
    EthereumLookupSource: EthereumLookupSource;
    'Option<EthereumLookupSource>': Option<EthereumLookupSource>;
    'Vec<EthereumLookupSource>': Vec<EthereumLookupSource>;
    DoubleMapTypeV9: DoubleMapTypeV9;
    'Option<DoubleMapTypeV9>': Option<DoubleMapTypeV9>;
    'Vec<DoubleMapTypeV9>': Vec<DoubleMapTypeV9>;
    ErrorMetadataV9: ErrorMetadataV9;
    'Option<ErrorMetadataV9>': Option<ErrorMetadataV9>;
    'Vec<ErrorMetadataV9>': Vec<ErrorMetadataV9>;
    EventMetadataV9: EventMetadataV9;
    'Option<EventMetadataV9>': Option<EventMetadataV9>;
    'Vec<EventMetadataV9>': Vec<EventMetadataV9>;
    FunctionArgumentMetadataV9: FunctionArgumentMetadataV9;
    'Option<FunctionArgumentMetadataV9>': Option<FunctionArgumentMetadataV9>;
    'Vec<FunctionArgumentMetadataV9>': Vec<FunctionArgumentMetadataV9>;
    FunctionMetadataV9: FunctionMetadataV9;
    'Option<FunctionMetadataV9>': Option<FunctionMetadataV9>;
    'Vec<FunctionMetadataV9>': Vec<FunctionMetadataV9>;
    MapTypeV9: MapTypeV9;
    'Option<MapTypeV9>': Option<MapTypeV9>;
    'Vec<MapTypeV9>': Vec<MapTypeV9>;
    MetadataV9: MetadataV9;
    'Option<MetadataV9>': Option<MetadataV9>;
    'Vec<MetadataV9>': Vec<MetadataV9>;
    ModuleConstantMetadataV9: ModuleConstantMetadataV9;
    'Option<ModuleConstantMetadataV9>': Option<ModuleConstantMetadataV9>;
    'Vec<ModuleConstantMetadataV9>': Vec<ModuleConstantMetadataV9>;
    ModuleMetadataV9: ModuleMetadataV9;
    'Option<ModuleMetadataV9>': Option<ModuleMetadataV9>;
    'Vec<ModuleMetadataV9>': Vec<ModuleMetadataV9>;
    StorageEntryMetadataV9: StorageEntryMetadataV9;
    'Option<StorageEntryMetadataV9>': Option<StorageEntryMetadataV9>;
    'Vec<StorageEntryMetadataV9>': Vec<StorageEntryMetadataV9>;
    StorageEntryModifierV9: StorageEntryModifierV9;
    'Option<StorageEntryModifierV9>': Option<StorageEntryModifierV9>;
    'Vec<StorageEntryModifierV9>': Vec<StorageEntryModifierV9>;
    StorageEntryTypeV9: StorageEntryTypeV9;
    'Option<StorageEntryTypeV9>': Option<StorageEntryTypeV9>;
    'Vec<StorageEntryTypeV9>': Vec<StorageEntryTypeV9>;
    StorageHasherV9: StorageHasherV9;
    'Option<StorageHasherV9>': Option<StorageHasherV9>;
    'Vec<StorageHasherV9>': Vec<StorageHasherV9>;
    StorageMetadataV9: StorageMetadataV9;
    'Option<StorageMetadataV9>': Option<StorageMetadataV9>;
    'Vec<StorageMetadataV9>': Vec<StorageMetadataV9>;
    DoubleMapTypeV10: DoubleMapTypeV10;
    'Option<DoubleMapTypeV10>': Option<DoubleMapTypeV10>;
    'Vec<DoubleMapTypeV10>': Vec<DoubleMapTypeV10>;
    ErrorMetadataV10: ErrorMetadataV10;
    'Option<ErrorMetadataV10>': Option<ErrorMetadataV10>;
    'Vec<ErrorMetadataV10>': Vec<ErrorMetadataV10>;
    EventMetadataV10: EventMetadataV10;
    'Option<EventMetadataV10>': Option<EventMetadataV10>;
    'Vec<EventMetadataV10>': Vec<EventMetadataV10>;
    FunctionArgumentMetadataV10: FunctionArgumentMetadataV10;
    'Option<FunctionArgumentMetadataV10>': Option<FunctionArgumentMetadataV10>;
    'Vec<FunctionArgumentMetadataV10>': Vec<FunctionArgumentMetadataV10>;
    FunctionMetadataV10: FunctionMetadataV10;
    'Option<FunctionMetadataV10>': Option<FunctionMetadataV10>;
    'Vec<FunctionMetadataV10>': Vec<FunctionMetadataV10>;
    MapTypeV10: MapTypeV10;
    'Option<MapTypeV10>': Option<MapTypeV10>;
    'Vec<MapTypeV10>': Vec<MapTypeV10>;
    MetadataV10: MetadataV10;
    'Option<MetadataV10>': Option<MetadataV10>;
    'Vec<MetadataV10>': Vec<MetadataV10>;
    ModuleConstantMetadataV10: ModuleConstantMetadataV10;
    'Option<ModuleConstantMetadataV10>': Option<ModuleConstantMetadataV10>;
    'Vec<ModuleConstantMetadataV10>': Vec<ModuleConstantMetadataV10>;
    ModuleMetadataV10: ModuleMetadataV10;
    'Option<ModuleMetadataV10>': Option<ModuleMetadataV10>;
    'Vec<ModuleMetadataV10>': Vec<ModuleMetadataV10>;
    StorageEntryModifierV10: StorageEntryModifierV10;
    'Option<StorageEntryModifierV10>': Option<StorageEntryModifierV10>;
    'Vec<StorageEntryModifierV10>': Vec<StorageEntryModifierV10>;
    StorageEntryMetadataV10: StorageEntryMetadataV10;
    'Option<StorageEntryMetadataV10>': Option<StorageEntryMetadataV10>;
    'Vec<StorageEntryMetadataV10>': Vec<StorageEntryMetadataV10>;
    StorageEntryTypeV10: StorageEntryTypeV10;
    'Option<StorageEntryTypeV10>': Option<StorageEntryTypeV10>;
    'Vec<StorageEntryTypeV10>': Vec<StorageEntryTypeV10>;
    StorageMetadataV10: StorageMetadataV10;
    'Option<StorageMetadataV10>': Option<StorageMetadataV10>;
    'Vec<StorageMetadataV10>': Vec<StorageMetadataV10>;
    StorageHasherV10: StorageHasherV10;
    'Option<StorageHasherV10>': Option<StorageHasherV10>;
    'Vec<StorageHasherV10>': Vec<StorageHasherV10>;
    DoubleMapTypeV11: DoubleMapTypeV11;
    'Option<DoubleMapTypeV11>': Option<DoubleMapTypeV11>;
    'Vec<DoubleMapTypeV11>': Vec<DoubleMapTypeV11>;
    ErrorMetadataV11: ErrorMetadataV11;
    'Option<ErrorMetadataV11>': Option<ErrorMetadataV11>;
    'Vec<ErrorMetadataV11>': Vec<ErrorMetadataV11>;
    EventMetadataV11: EventMetadataV11;
    'Option<EventMetadataV11>': Option<EventMetadataV11>;
    'Vec<EventMetadataV11>': Vec<EventMetadataV11>;
    ExtrinsicMetadataV11: ExtrinsicMetadataV11;
    'Option<ExtrinsicMetadataV11>': Option<ExtrinsicMetadataV11>;
    'Vec<ExtrinsicMetadataV11>': Vec<ExtrinsicMetadataV11>;
    FunctionArgumentMetadataV11: FunctionArgumentMetadataV11;
    'Option<FunctionArgumentMetadataV11>': Option<FunctionArgumentMetadataV11>;
    'Vec<FunctionArgumentMetadataV11>': Vec<FunctionArgumentMetadataV11>;
    FunctionMetadataV11: FunctionMetadataV11;
    'Option<FunctionMetadataV11>': Option<FunctionMetadataV11>;
    'Vec<FunctionMetadataV11>': Vec<FunctionMetadataV11>;
    MapTypeV11: MapTypeV11;
    'Option<MapTypeV11>': Option<MapTypeV11>;
    'Vec<MapTypeV11>': Vec<MapTypeV11>;
    MetadataV11: MetadataV11;
    'Option<MetadataV11>': Option<MetadataV11>;
    'Vec<MetadataV11>': Vec<MetadataV11>;
    ModuleConstantMetadataV11: ModuleConstantMetadataV11;
    'Option<ModuleConstantMetadataV11>': Option<ModuleConstantMetadataV11>;
    'Vec<ModuleConstantMetadataV11>': Vec<ModuleConstantMetadataV11>;
    ModuleMetadataV11: ModuleMetadataV11;
    'Option<ModuleMetadataV11>': Option<ModuleMetadataV11>;
    'Vec<ModuleMetadataV11>': Vec<ModuleMetadataV11>;
    StorageEntryModifierV11: StorageEntryModifierV11;
    'Option<StorageEntryModifierV11>': Option<StorageEntryModifierV11>;
    'Vec<StorageEntryModifierV11>': Vec<StorageEntryModifierV11>;
    StorageEntryMetadataV11: StorageEntryMetadataV11;
    'Option<StorageEntryMetadataV11>': Option<StorageEntryMetadataV11>;
    'Vec<StorageEntryMetadataV11>': Vec<StorageEntryMetadataV11>;
    StorageEntryTypeV11: StorageEntryTypeV11;
    'Option<StorageEntryTypeV11>': Option<StorageEntryTypeV11>;
    'Vec<StorageEntryTypeV11>': Vec<StorageEntryTypeV11>;
    StorageMetadataV11: StorageMetadataV11;
    'Option<StorageMetadataV11>': Option<StorageMetadataV11>;
    'Vec<StorageMetadataV11>': Vec<StorageMetadataV11>;
    StorageHasherV11: StorageHasherV11;
    'Option<StorageHasherV11>': Option<StorageHasherV11>;
    'Vec<StorageHasherV11>': Vec<StorageHasherV11>;
    DoubleMapTypeV12: DoubleMapTypeV12;
    'Option<DoubleMapTypeV12>': Option<DoubleMapTypeV12>;
    'Vec<DoubleMapTypeV12>': Vec<DoubleMapTypeV12>;
    ErrorMetadataV12: ErrorMetadataV12;
    'Option<ErrorMetadataV12>': Option<ErrorMetadataV12>;
    'Vec<ErrorMetadataV12>': Vec<ErrorMetadataV12>;
    EventMetadataV12: EventMetadataV12;
    'Option<EventMetadataV12>': Option<EventMetadataV12>;
    'Vec<EventMetadataV12>': Vec<EventMetadataV12>;
    ExtrinsicMetadataV12: ExtrinsicMetadataV12;
    'Option<ExtrinsicMetadataV12>': Option<ExtrinsicMetadataV12>;
    'Vec<ExtrinsicMetadataV12>': Vec<ExtrinsicMetadataV12>;
    FunctionArgumentMetadataV12: FunctionArgumentMetadataV12;
    'Option<FunctionArgumentMetadataV12>': Option<FunctionArgumentMetadataV12>;
    'Vec<FunctionArgumentMetadataV12>': Vec<FunctionArgumentMetadataV12>;
    FunctionMetadataV12: FunctionMetadataV12;
    'Option<FunctionMetadataV12>': Option<FunctionMetadataV12>;
    'Vec<FunctionMetadataV12>': Vec<FunctionMetadataV12>;
    MapTypeV12: MapTypeV12;
    'Option<MapTypeV12>': Option<MapTypeV12>;
    'Vec<MapTypeV12>': Vec<MapTypeV12>;
    MetadataV12: MetadataV12;
    'Option<MetadataV12>': Option<MetadataV12>;
    'Vec<MetadataV12>': Vec<MetadataV12>;
    ModuleConstantMetadataV12: ModuleConstantMetadataV12;
    'Option<ModuleConstantMetadataV12>': Option<ModuleConstantMetadataV12>;
    'Vec<ModuleConstantMetadataV12>': Vec<ModuleConstantMetadataV12>;
    ModuleMetadataV12: ModuleMetadataV12;
    'Option<ModuleMetadataV12>': Option<ModuleMetadataV12>;
    'Vec<ModuleMetadataV12>': Vec<ModuleMetadataV12>;
    StorageEntryModifierV12: StorageEntryModifierV12;
    'Option<StorageEntryModifierV12>': Option<StorageEntryModifierV12>;
    'Vec<StorageEntryModifierV12>': Vec<StorageEntryModifierV12>;
    StorageEntryMetadataV12: StorageEntryMetadataV12;
    'Option<StorageEntryMetadataV12>': Option<StorageEntryMetadataV12>;
    'Vec<StorageEntryMetadataV12>': Vec<StorageEntryMetadataV12>;
    StorageEntryTypeV12: StorageEntryTypeV12;
    'Option<StorageEntryTypeV12>': Option<StorageEntryTypeV12>;
    'Vec<StorageEntryTypeV12>': Vec<StorageEntryTypeV12>;
    StorageMetadataV12: StorageMetadataV12;
    'Option<StorageMetadataV12>': Option<StorageMetadataV12>;
    'Vec<StorageMetadataV12>': Vec<StorageMetadataV12>;
    StorageHasherV12: StorageHasherV12;
    'Option<StorageHasherV12>': Option<StorageHasherV12>;
    'Vec<StorageHasherV12>': Vec<StorageHasherV12>;
    DoubleMapTypeLatest: DoubleMapTypeLatest;
    'Option<DoubleMapTypeLatest>': Option<DoubleMapTypeLatest>;
    'Vec<DoubleMapTypeLatest>': Vec<DoubleMapTypeLatest>;
    EventMetadataLatest: EventMetadataLatest;
    'Option<EventMetadataLatest>': Option<EventMetadataLatest>;
    'Vec<EventMetadataLatest>': Vec<EventMetadataLatest>;
    ExtrinsicMetadataLatest: ExtrinsicMetadataLatest;
    'Option<ExtrinsicMetadataLatest>': Option<ExtrinsicMetadataLatest>;
    'Vec<ExtrinsicMetadataLatest>': Vec<ExtrinsicMetadataLatest>;
    FunctionArgumentMetadataLatest: FunctionArgumentMetadataLatest;
    'Option<FunctionArgumentMetadataLatest>': Option<FunctionArgumentMetadataLatest>;
    'Vec<FunctionArgumentMetadataLatest>': Vec<FunctionArgumentMetadataLatest>;
    FunctionMetadataLatest: FunctionMetadataLatest;
    'Option<FunctionMetadataLatest>': Option<FunctionMetadataLatest>;
    'Vec<FunctionMetadataLatest>': Vec<FunctionMetadataLatest>;
    MapTypeLatest: MapTypeLatest;
    'Option<MapTypeLatest>': Option<MapTypeLatest>;
    'Vec<MapTypeLatest>': Vec<MapTypeLatest>;
    MetadataLatest: MetadataLatest;
    'Option<MetadataLatest>': Option<MetadataLatest>;
    'Vec<MetadataLatest>': Vec<MetadataLatest>;
    ModuleConstantMetadataLatest: ModuleConstantMetadataLatest;
    'Option<ModuleConstantMetadataLatest>': Option<ModuleConstantMetadataLatest>;
    'Vec<ModuleConstantMetadataLatest>': Vec<ModuleConstantMetadataLatest>;
    ModuleMetadataLatest: ModuleMetadataLatest;
    'Option<ModuleMetadataLatest>': Option<ModuleMetadataLatest>;
    'Vec<ModuleMetadataLatest>': Vec<ModuleMetadataLatest>;
    StorageEntryMetadataLatest: StorageEntryMetadataLatest;
    'Option<StorageEntryMetadataLatest>': Option<StorageEntryMetadataLatest>;
    'Vec<StorageEntryMetadataLatest>': Vec<StorageEntryMetadataLatest>;
    StorageEntryModifierLatest: StorageEntryModifierLatest;
    'Option<StorageEntryModifierLatest>': Option<StorageEntryModifierLatest>;
    'Vec<StorageEntryModifierLatest>': Vec<StorageEntryModifierLatest>;
    StorageEntryTypeLatest: StorageEntryTypeLatest;
    'Option<StorageEntryTypeLatest>': Option<StorageEntryTypeLatest>;
    'Vec<StorageEntryTypeLatest>': Vec<StorageEntryTypeLatest>;
    StorageMetadataLatest: StorageMetadataLatest;
    'Option<StorageMetadataLatest>': Option<StorageMetadataLatest>;
    'Vec<StorageMetadataLatest>': Vec<StorageMetadataLatest>;
    StorageHasher: StorageHasher;
    'Option<StorageHasher>': Option<StorageHasher>;
    'Vec<StorageHasher>': Vec<StorageHasher>;
    MetadataAll: MetadataAll;
    'Option<MetadataAll>': Option<MetadataAll>;
    'Vec<MetadataAll>': Vec<MetadataAll>;
    RpcMethods: RpcMethods;
    'Option<RpcMethods>': Option<RpcMethods>;
    'Vec<RpcMethods>': Vec<RpcMethods>;
    ExtrinsicOrHash: ExtrinsicOrHash;
    'Option<ExtrinsicOrHash>': Option<ExtrinsicOrHash>;
    'Vec<ExtrinsicOrHash>': Vec<ExtrinsicOrHash>;
    ExtrinsicStatus: ExtrinsicStatus;
    'Option<ExtrinsicStatus>': Option<ExtrinsicStatus>;
    'Vec<ExtrinsicStatus>': Vec<ExtrinsicStatus>;
    BlockHash: BlockHash;
    'Option<BlockHash>': Option<BlockHash>;
    'Vec<BlockHash>': Vec<BlockHash>;
    PrefixedStorageKey: PrefixedStorageKey;
    'Option<PrefixedStorageKey>': Option<PrefixedStorageKey>;
    'Vec<PrefixedStorageKey>': Vec<PrefixedStorageKey>;
    StorageKind: StorageKind;
    'Option<StorageKind>': Option<StorageKind>;
    'Vec<StorageKind>': Vec<StorageKind>;
    RuntimeDispatchInfo: RuntimeDispatchInfo;
    'Option<RuntimeDispatchInfo>': Option<RuntimeDispatchInfo>;
    'Vec<RuntimeDispatchInfo>': Vec<RuntimeDispatchInfo>;
    ApiId: ApiId;
    'Option<ApiId>': Option<ApiId>;
    'Vec<ApiId>': Vec<ApiId>;
    KeyValueOption: KeyValueOption;
    'Option<KeyValueOption>': Option<KeyValueOption>;
    'Vec<KeyValueOption>': Vec<KeyValueOption>;
    ReadProof: ReadProof;
    'Option<ReadProof>': Option<ReadProof>;
    'Vec<ReadProof>': Vec<ReadProof>;
    RuntimeVersionApi: RuntimeVersionApi;
    'Option<RuntimeVersionApi>': Option<RuntimeVersionApi>;
    'Vec<RuntimeVersionApi>': Vec<RuntimeVersionApi>;
    RuntimeVersion: RuntimeVersion;
    'Option<RuntimeVersion>': Option<RuntimeVersion>;
    'Vec<RuntimeVersion>': Vec<RuntimeVersion>;
    StorageChangeSet: StorageChangeSet;
    'Option<StorageChangeSet>': Option<StorageChangeSet>;
    'Vec<StorageChangeSet>': Vec<StorageChangeSet>;
    AttestationTopic: AttestationTopic;
    'Compact<AttestationTopic>': Compact<AttestationTopic>;
    'Option<AttestationTopic>': Option<AttestationTopic>;
    'Vec<AttestationTopic>': Vec<AttestationTopic>;
    AttestationValue: AttestationValue;
    'Compact<AttestationValue>': Compact<AttestationValue>;
    'Option<AttestationValue>': Option<AttestationValue>;
    'Vec<AttestationValue>': Vec<AttestationValue>;
    ExchangeKey: ExchangeKey;
    'Option<ExchangeKey>': Option<ExchangeKey>;
    'Vec<ExchangeKey>': Vec<ExchangeKey>;
    FeeRate: FeeRate;
    'Compact<FeeRate>': Compact<FeeRate>;
    'Option<FeeRate>': Option<FeeRate>;
    'Vec<FeeRate>': Vec<FeeRate>;
    AssetInfo: AssetInfo;
    'Option<AssetInfo>': Option<AssetInfo>;
    'Vec<AssetInfo>': Vec<AssetInfo>;
    RewardBalance: RewardBalance;
    'Option<RewardBalance>': Option<RewardBalance>;
    'Vec<RewardBalance>': Vec<RewardBalance>;
    RewardBalanceOf: RewardBalanceOf;
    'Option<RewardBalanceOf>': Option<RewardBalanceOf>;
    'Vec<RewardBalanceOf>': Vec<RewardBalanceOf>;
    // @ts-ignore - As RewardDestination is also available in polkadot's type.. Subsequent property declarations must have the same type. Property 'RewardDestination' must be of type 'RewardDestination', but here has type 'RewardDestination'.
    RewardDestination: RewardDestination;
    // @ts-ignore - As Option<RewardDestination> is also available in polkadot's type.. Subsequent property declarations must have the same type. Property 'Option<RewardDestination>' must be of type 'RewardDestination', but here has type 'Option<RewardDestination>'
    'Option<RewardDestination>': Option<RewardDestination>;
    // @ts-ignore - As Vec<RewardDestination> is also available in polkadot's type.. Subsequent property declarations must have the same type. Property 'Vec<RewardDestination>' must be of type 'RewardDestination', but here has type 'Vec<RewardDestination>'
    'Vec<RewardDestination>': Vec<RewardDestination>;
    Meta: Meta;
    'Option<Meta>': Option<Meta>;
    'Vec<Meta>': Vec<Meta>;
    MemberRoles: MemberRoles;
    'Option<MemberRoles>': Option<MemberRoles>;
    'Vec<MemberRoles>': Vec<MemberRoles>;
    Member: Member;
    'Option<Member>': Option<Member>;
    'Vec<Member>': Vec<Member>;
    Group: Group;
    'Option<Group>': Option<Group>;
    'Vec<Group>': Vec<Group>;
    Invite: Invite;
    'Option<Invite>': Option<Invite>;
    'Vec<Invite>': Vec<Invite>;
    PendingInvite: PendingInvite;
    'Option<PendingInvite>': Option<PendingInvite>;
    'Vec<PendingInvite>': Vec<PendingInvite>;
    AcceptPayload: AcceptPayload;
    'Option<AcceptPayload>': Option<AcceptPayload>;
    'Vec<AcceptPayload>': Vec<AcceptPayload>;
    DeviceId: DeviceId;
    'Compact<DeviceId>': Compact<DeviceId>;
    'Option<DeviceId>': Option<DeviceId>;
    'Vec<DeviceId>': Vec<DeviceId>;
    PreKeyBundle: PreKeyBundle;
    'Option<PreKeyBundle>': Option<PreKeyBundle>;
    'Vec<PreKeyBundle>': Vec<PreKeyBundle>;
    DeviceIdResponse: DeviceIdResponse;
    'Option<DeviceIdResponse>': Option<DeviceIdResponse>;
    'Vec<DeviceIdResponse>': Vec<DeviceIdResponse>;
    WithdrawnPreKeyBundle: WithdrawnPreKeyBundle;
    'Option<WithdrawnPreKeyBundle>': Option<WithdrawnPreKeyBundle>;
    'Vec<WithdrawnPreKeyBundle>': Vec<WithdrawnPreKeyBundle>;
    PreKeyBundlesResponse: PreKeyBundlesResponse;
    'Option<PreKeyBundlesResponse>': Option<PreKeyBundlesResponse>;
    'Vec<PreKeyBundlesResponse>': Vec<PreKeyBundlesResponse>;
    Response: Response;
    'Option<Response>': Option<Response>;
    'Vec<Response>': Vec<Response>;
    VaultKey: VaultKey;
    'Option<VaultKey>': Option<VaultKey>;
    'Vec<VaultKey>': Vec<VaultKey>;
    VaultValue: VaultValue;
    'Option<VaultValue>': Option<VaultValue>;
    'Vec<VaultValue>': Vec<VaultValue>;
    MessageId: MessageId;
    'Compact<MessageId>': Compact<MessageId>;
    'Option<MessageId>': Option<MessageId>;
    'Vec<MessageId>': Vec<MessageId>;
    Message: Message;
    'Option<Message>': Option<Message>;
    'Vec<Message>': Vec<Message>;
    doughnut: doughnut;
    'Option<doughnut>': Option<doughnut>;
    'Vec<doughnut>': Vec<doughnut>;
    FeeExchangeV1: FeeExchangeV1;
    'Option<FeeExchangeV1>': Option<FeeExchangeV1>;
    'Vec<FeeExchangeV1>': Vec<FeeExchangeV1>;
    FeeExchange: FeeExchange;
    'Option<FeeExchange>': Option<FeeExchange>;
    'Vec<FeeExchange>': Vec<FeeExchange>;
    ChargeTransactionPayment: ChargeTransactionPayment;
    'Option<ChargeTransactionPayment>': Option<ChargeTransactionPayment>;
    'Vec<ChargeTransactionPayment>': Vec<ChargeTransactionPayment>;
  }
}
