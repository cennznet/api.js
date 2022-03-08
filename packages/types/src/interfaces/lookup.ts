// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, AccountData>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u64',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'Null'
  },
  /**
   * Lookup7: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64'
  },
  /**
   * Lookup10: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup12: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup15: frame_system::EventRecord<cennznet_runtime::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup17: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup18: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays'
  },
  /**
   * Lookup19: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup20: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup21: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: {
        index: 'u8',
        error: 'u8',
      },
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError'
    }
  },
  /**
   * Lookup22: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup23: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup24: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: {
        when: 'u32',
        index: 'u32',
      },
      Canceled: {
        when: 'u32',
        index: 'u32',
      },
      Dispatched: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup28: crml_generic_asset::RawEvent<sp_core::crypto::AccountId32, AssetId, Balance, crml_generic_asset::types::AssetOptions<Balance, sp_core::crypto::AccountId32>>
   **/
  CrmlGenericAssetRawEvent: {
    _enum: {
      Created: '(u32,AccountId32,CrmlGenericAssetAssetOptions)',
      Transferred: '(u32,AccountId32,AccountId32,u128)',
      PermissionUpdated: '(u32,CrmlGenericAssetPermissionsV1)',
      AssetInfoUpdated: '(u32,CrmlGenericAssetAssetInfo)',
      Minted: '(u32,AccountId32,u128)',
      Burned: '(u32,AccountId32,u128)',
      DustReclaimed: '(u32,AccountId32,u128)'
    }
  },
  /**
   * Lookup30: crml_generic_asset::types::AssetOptions<Balance, sp_core::crypto::AccountId32>
   **/
  CrmlGenericAssetAssetOptions: {
    initialIssuance: 'Compact<u128>',
    permissions: 'CrmlGenericAssetPermissionsV1'
  },
  /**
   * Lookup32: crml_generic_asset::types::PermissionsV1<sp_core::crypto::AccountId32>
   **/
  CrmlGenericAssetPermissionsV1: {
    update: 'CrmlGenericAssetOwner',
    mint: 'CrmlGenericAssetOwner',
    burn: 'CrmlGenericAssetOwner'
  },
  /**
   * Lookup33: crml_generic_asset::types::Owner<sp_core::crypto::AccountId32>
   **/
  CrmlGenericAssetOwner: {
    _enum: {
      None: 'Null',
      Address: 'AccountId32'
    }
  },
  /**
   * Lookup34: crml_generic_asset::types::AssetInfo
   **/
  CrmlGenericAssetAssetInfo: {
    symbol: 'Bytes',
    decimalPlaces: 'u8',
    existentialDeposit: 'u64'
  },
  /**
   * Lookup35: crml_staking::RawEvent<Balance, sp_core::crypto::AccountId32>
   **/
  CrmlStakingRawEvent: {
    _enum: {
      Slash: '(AccountId32,u128)',
      InvulnerableNotSlashed: '(AccountId32,Perbill)',
      SetMinimumBond: 'u128',
      OldSlashingReportDiscarded: 'u32',
      StakingElection: 'CrmlStakingElectionCompute',
      SolutionStored: 'CrmlStakingElectionCompute',
      SetInvulnerables: 'Vec<AccountId32>',
      Bonded: '(AccountId32,u128)',
      Unbonded: '(AccountId32,u128)',
      Withdrawn: '(AccountId32,u128)',
      Slashed: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup37: crml_staking::ElectionCompute
   **/
  CrmlStakingElectionCompute: {
    _enum: ['OnChain', 'Signed', 'Unsigned']
  },
  /**
   * Lookup39: pallet_offences::pallet::Event
   **/
  PalletOffencesEvent: {
    _enum: {
      Offence: {
        kind: '[u8;16]',
        timeslot: 'Bytes'
      }
    }
  },
  /**
   * Lookup41: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup42: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup45: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup46: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup47: pallet_im_online::pallet::Event<T>
   **/
  PalletImOnlineEvent: {
    _enum: {
      HeartbeatReceived: {
        authorityId: 'PalletImOnlineSr25519AppSr25519Public',
      },
      AllGood: 'Null',
      SomeOffline: {
        offline: 'Vec<(AccountId32,CrmlStakingExposure)>'
      }
    }
  },
  /**
   * Lookup48: pallet_im_online::sr25519::app_sr25519::Public
   **/
  PalletImOnlineSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup49: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup52: crml_staking::Exposure<sp_core::crypto::AccountId32, Balance>
   **/
  CrmlStakingExposure: {
    total: 'Compact<u128>',
    own: 'Compact<u128>',
    others: 'Vec<CrmlStakingIndividualExposure>'
  },
  /**
   * Lookup54: crml_staking::IndividualExposure<sp_core::crypto::AccountId32, Balance>
   **/
  CrmlStakingIndividualExposure: {
    who: 'AccountId32',
    value: 'Compact<u128>'
  },
  /**
   * Lookup55: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        newSudoer: 'AccountId32',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup56: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
      },
      Spending: {
        budgetRemaining: 'u128',
      },
      Awarded: {
        proposalIndex: 'u32',
        award: 'u128',
        account: 'AccountId32',
      },
      Rejected: {
        proposalIndex: 'u32',
        slashed: 'u128',
      },
      Burnt: {
        burntFunds: 'u128',
      },
      Rollover: {
        rolloverBalance: 'u128',
      },
      Deposit: {
        value: 'u128'
      }
    }
  },
  /**
   * Lookup57: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      ItemCompleted: 'Null',
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup58: pallet_identity::pallet::Event<T>
   **/
  PalletIdentityEvent: {
    _enum: {
      IdentitySet: {
        who: 'AccountId32',
      },
      IdentityCleared: {
        who: 'AccountId32',
        deposit: 'u128',
      },
      IdentityKilled: {
        who: 'AccountId32',
        deposit: 'u128',
      },
      JudgementRequested: {
        who: 'AccountId32',
        registrarIndex: 'u32',
      },
      JudgementUnrequested: {
        who: 'AccountId32',
        registrarIndex: 'u32',
      },
      JudgementGiven: {
        target: 'AccountId32',
        registrarIndex: 'u32',
      },
      RegistrarAdded: {
        registrarIndex: 'u32',
      },
      SubIdentityAdded: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128',
      },
      SubIdentityRemoved: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128',
      },
      SubIdentityRevoked: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128'
      }
    }
  },
  /**
   * Lookup59: crml_cennzx::RawEvent<sp_core::crypto::AccountId32, AssetId, Balance>
   **/
  CrmlCennzxRawEvent: {
    _enum: {
      AddLiquidity: '(AccountId32,u128,u32,u128)',
      RemoveLiquidity: '(AccountId32,u128,u32,u128)',
      AssetBought: '(u32,u32,AccountId32,u128,u128)',
      AssetSold: '(u32,u32,AccountId32,u128,u128)'
    }
  },
  /**
   * Lookup60: crml_staking::rewards::RawEvent<Balance, sp_core::crypto::AccountId32>
   **/
  CrmlStakingRewardsRawEvent: {
    _enum: {
      EraStakerPayout: '(AccountId32,u128)',
      EraPayout: '(u128,u128)',
      EraPayoutDeferred: 'u128',
      NewFiscalEra: 'u128'
    }
  },
  /**
   * Lookup61: crml_nft::RawEvent<CollectionId, sp_core::crypto::AccountId32, AssetId, Balance, crml_nft::types::AuctionClosureReason, SeriesId, SerialNumber, TokenCount, CollectionNameType, sp_arithmetic::per_things::Permill, MarketplaceId>
   **/
  CrmlNftRawEvent: {
    _enum: {
      CreateCollection: '(u32,Bytes,AccountId32)',
      CreateSeries: '(u32,u32,u32,AccountId32)',
      CreateTokens: '(u32,u32,u32,AccountId32)',
      Transfer: '(AccountId32,u32,u32,Vec<u32>,AccountId32)',
      Burn: '(u32,u32,Vec<u32>)',
      FixedPriceSaleListed: '(u32,u128,Option<u32>)',
      FixedPriceSaleComplete: '(u32,u128,AccountId32)',
      FixedPriceSaleClosed: '(u32,u128)',
      AuctionOpen: '(u32,u128,Option<u32>)',
      AuctionSold: '(u32,u128,u32,u128,AccountId32)',
      AuctionClosed: '(u32,u128,CrmlNftAuctionClosureReason)',
      Bid: '(u32,u128,u128)',
      RegisteredMarketplace: '(AccountId32,Permill,u32)'
    }
  },
  /**
   * Lookup62: crml_nft::types::AuctionClosureReason
   **/
  CrmlNftAuctionClosureReason: {
    _enum: ['ExpiredNoBids', 'SettlementFailed', 'VendorCancelled']
  },
  /**
   * Lookup66: crml_governance::Event
   **/
  CrmlGovernanceEvent: {
    _enum: {
      SubmitProposal: 'u64',
      EnactReferendum: '(u64,bool)',
      ProposalVeto: 'u64',
      ReferendumVeto: 'u64',
      ReferendumCreated: 'u64',
      ReferendumApproved: 'u64'
    }
  },
  /**
   * Lookup68: crml_eth_bridge::Event
   **/
  CrmlEthBridgeEvent: {
    _enum: {
      Verified: 'u64',
      Invalid: 'u64',
      AuthoritySetChange: '(u64,u64)'
    }
  },
  /**
   * Lookup69: crml_erc20_peg::RawEvent<sp_core::crypto::AccountId32>
   **/
  CrmlErc20PegRawEvent: {
    _enum: {
      Erc20Claim: '(u64,AccountId32)',
      Erc20Deposit: '(u64,u32,u128,AccountId32)',
      Erc20Withdraw: '(u64,u32,u128,H160)',
      Erc20DepositFail: 'u64',
      SetContractAddress: 'H160',
      CENNZDepositsActive: 'Null'
    }
  },
  /**
   * Lookup72: crml_eth_wallet::RawEvent<sp_core::crypto::AccountId32>
   **/
  CrmlEthWalletRawEvent: {
    _enum: {
      Execute: '(H160,AccountId32,Result<Null, SpRuntimeDispatchError>)'
    }
  },
  /**
   * Lookup73: pallet_ethereum::pallet::Event
   **/
  PalletEthereumEvent: {
    _enum: {
      Executed: '(H160,H160,H256,EvmCoreErrorExitReason)'
    }
  },
  /**
   * Lookup74: evm_core::error::ExitReason
   **/
  EvmCoreErrorExitReason: {
    _enum: {
      Succeed: 'EvmCoreErrorExitSucceed',
      Error: 'EvmCoreErrorExitError',
      Revert: 'EvmCoreErrorExitRevert',
      Fatal: 'EvmCoreErrorExitFatal'
    }
  },
  /**
   * Lookup75: evm_core::error::ExitSucceed
   **/
  EvmCoreErrorExitSucceed: {
    _enum: ['Stopped', 'Returned', 'Suicided']
  },
  /**
   * Lookup76: evm_core::error::ExitError
   **/
  EvmCoreErrorExitError: {
    _enum: {
      StackUnderflow: 'Null',
      StackOverflow: 'Null',
      InvalidJump: 'Null',
      InvalidRange: 'Null',
      DesignatedInvalid: 'Null',
      CallTooDeep: 'Null',
      CreateCollision: 'Null',
      CreateContractLimit: 'Null',
      InvalidCode: 'Null',
      OutOfOffset: 'Null',
      OutOfGas: 'Null',
      OutOfFund: 'Null',
      PCUnderflow: 'Null',
      CreateEmpty: 'Null',
      Other: 'Text'
    }
  },
  /**
   * Lookup79: evm_core::error::ExitRevert
   **/
  EvmCoreErrorExitRevert: {
    _enum: ['Reverted']
  },
  /**
   * Lookup80: evm_core::error::ExitFatal
   **/
  EvmCoreErrorExitFatal: {
    _enum: {
      NotSupported: 'Null',
      UnhandledInterrupt: 'Null',
      CallErrorAsFatal: 'EvmCoreErrorExitError',
      Other: 'Text'
    }
  },
  /**
   * Lookup81: pallet_evm::pallet::Event<T>
   **/
  PalletEvmEvent: {
    _enum: {
      Log: 'EthereumLog',
      Created: 'H160',
      CreatedFailed: 'H160',
      Executed: 'H160',
      ExecutedFailed: 'H160',
      BalanceDeposit: '(AccountId32,H160,U256)',
      BalanceWithdraw: '(AccountId32,H160,U256)'
    }
  },
  /**
   * Lookup82: ethereum::log::Log
   **/
  EthereumLog: {
    address: 'H160',
    topics: 'Vec<H256>',
    data: 'Bytes'
  },
  /**
   * Lookup86: pallet_base_fee::pallet::Event
   **/
  PalletBaseFeeEvent: {
    _enum: {
      NewBaseFeePerGas: 'U256',
      BaseFeeOverflow: 'Null',
      IsActive: 'bool',
      NewElasticity: 'Permill'
    }
  },
  /**
   * Lookup87: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup89: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup91: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup95: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup96: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup97: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup99: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup100: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup101: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup102: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32'
  },
  /**
   * Lookup108: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup111: pallet_scheduler::ScheduledV2<cennznet_runtime::Call, BlockNumber, cennznet_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV2: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'Call',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'CennznetRuntimeOriginCaller'
  },
  /**
   * Lookup113: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: 'Bytes',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel_named: {
        id: 'Bytes',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup115: pallet_babe::pallet::Call<T>
   **/
  PalletBabeCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      plan_config_change: {
        config: 'SpConsensusBabeDigestsNextConfigDescriptor'
      }
    }
  },
  /**
   * Lookup116: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: 'SpConsensusBabeAppPublic',
    slot: 'u64',
    firstHeader: 'SpRuntimeHeader',
    secondHeader: 'SpRuntimeHeader'
  },
  /**
   * Lookup117: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup118: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup119: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup121: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: 'u32',
    trieNodes: 'Vec<Bytes>',
    validatorCount: 'u32'
  },
  /**
   * Lookup122: sp_consensus_babe::digests::NextConfigDescriptor
   **/
  SpConsensusBabeDigestsNextConfigDescriptor: {
    _enum: {
      __Unused0: 'Null',
      V1: {
        c: '(u64,u64)',
        allowedSlots: 'SpConsensusBabeAllowedSlots'
      }
    }
  },
  /**
   * Lookup124: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: ['PrimarySlots', 'PrimaryAndSecondaryPlainSlots', 'PrimaryAndSecondaryVRFSlots']
  },
  /**
   * Lookup125: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup127: crml_generic_asset::Call<T>
   **/
  CrmlGenericAssetCall: {
    _enum: {
      create: {
        owner: 'AccountId32',
        options: 'CrmlGenericAssetAssetOptions',
        info: 'CrmlGenericAssetAssetInfo',
      },
      transfer: {
        assetId: 'Compact<u32>',
        to: 'AccountId32',
        amount: 'Compact<u128>',
      },
      transfer_all: {
        assetId: 'Compact<u32>',
        to: 'AccountId32',
      },
      update_permission: {
        assetId: 'Compact<u32>',
        newPermission: 'CrmlGenericAssetPermissionsV1',
      },
      update_asset_info: {
        assetId: 'Compact<u32>',
        info: 'CrmlGenericAssetAssetInfo',
      },
      mint: {
        assetId: 'Compact<u32>',
        to: 'AccountId32',
        amount: 'u128',
      },
      burn: {
        assetId: 'Compact<u32>',
        target: 'AccountId32',
        amount: 'u128',
      },
      create_reserved: {
        assetId: 'u32',
        options: 'CrmlGenericAssetAssetOptions',
        info: 'CrmlGenericAssetAssetInfo'
      }
    }
  },
  /**
   * Lookup128: pallet_authorship::pallet::Call<T>
   **/
  PalletAuthorshipCall: {
    _enum: {
      set_uncles: {
        newUncles: 'Vec<SpRuntimeHeader>'
      }
    }
  },
  /**
   * Lookup130: crml_staking::Call<T>
   **/
  CrmlStakingCall: {
    _enum: {
      bond: {
        controller: 'AccountId32',
        value: 'Compact<u128>',
        payee: 'CrmlStakingRewardDestination',
      },
      bond_extra: {
        maxAdditional: 'Compact<u128>',
      },
      unbond: {
        value: 'Compact<u128>',
      },
      withdraw_unbonded: 'Null',
      validate: {
        prefs: 'CrmlStakingValidatorPrefs',
      },
      nominate: {
        targets: 'Vec<AccountId32>',
      },
      chill: 'Null',
      set_payee: {
        payee: 'CrmlStakingRewardDestination',
      },
      set_controller: {
        controller: 'AccountId32',
      },
      set_validator_count: {
        _alias: {
          new_: 'new',
        },
        new_: 'Compact<u32>',
      },
      increase_validator_count: {
        additional: 'Compact<u32>',
      },
      force_no_eras: 'Null',
      force_new_era: 'Null',
      set_minimum_bond: {
        value: 'u128',
      },
      set_invulnerables: {
        validators: 'Vec<AccountId32>',
      },
      force_unstake: {
        stash: 'AccountId32',
      },
      force_new_era_always: 'Null',
      cancel_deferred_slash: {
        era: 'u32',
        slashIndices: 'Vec<u32>',
      },
      rebond: {
        value: 'Compact<u128>',
      },
      set_history_depth: {
        newHistoryDepth: 'Compact<u32>',
        eraItemsDeleted: 'Compact<u32>',
      },
      reap_stash: {
        stash: 'AccountId32',
      },
      submit_election_solution: {
        _alias: {
          size_: 'size',
        },
        winners: 'Vec<u16>',
        compact: 'CrmlStakingCompactAssignments',
        score: '[u128;3]',
        era: 'u32',
        size_: 'CrmlStakingElectionSize',
      },
      submit_election_solution_unsigned: {
        _alias: {
          size_: 'size',
        },
        winners: 'Vec<u16>',
        compact: 'CrmlStakingCompactAssignments',
        score: '[u128;3]',
        era: 'u32',
        size_: 'CrmlStakingElectionSize'
      }
    }
  },
  /**
   * Lookup131: crml_staking::RewardDestination<sp_core::crypto::AccountId32>
   **/
  CrmlStakingRewardDestination: {
    _enum: {
      Stash: 'Null',
      Controller: 'Null',
      Account: 'AccountId32'
    }
  },
  /**
   * Lookup132: crml_staking::ValidatorPrefs
   **/
  CrmlStakingValidatorPrefs: {
    commission: 'Compact<Perbill>'
  },
  /**
   * Lookup135: crml_staking::CompactAssignments
   **/
  CrmlStakingCompactAssignments: {
    votes1: 'Vec<(Compact<u32>,Compact<u16>)>',
    votes2: 'Vec<(Compact<u32>,(Compact<u16>,Compact<PerU16>),Compact<u16>)>',
    votes3: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);2],Compact<u16>)>',
    votes4: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);3],Compact<u16>)>',
    votes5: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);4],Compact<u16>)>',
    votes6: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);5],Compact<u16>)>',
    votes7: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);6],Compact<u16>)>',
    votes8: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);7],Compact<u16>)>',
    votes9: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);8],Compact<u16>)>',
    votes10: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);9],Compact<u16>)>',
    votes11: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);10],Compact<u16>)>',
    votes12: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);11],Compact<u16>)>',
    votes13: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);12],Compact<u16>)>',
    votes14: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);13],Compact<u16>)>',
    votes15: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);14],Compact<u16>)>',
    votes16: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);15],Compact<u16>)>'
  },
  /**
   * Lookup187: crml_staking::ElectionSize
   **/
  CrmlStakingElectionSize: {
    validators: 'Compact<u16>',
    nominators: 'Compact<u32>'
  },
  /**
   * Lookup188: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'CennznetRuntimeSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup189: cennznet_runtime::SessionKeys
   **/
  CennznetRuntimeSessionKeys: {
    grandpa: 'SpFinalityGrandpaAppPublic',
    babe: 'SpConsensusBabeAppPublic',
    imOnline: 'PalletImOnlineSr25519AppSr25519Public',
    authorityDiscovery: 'SpAuthorityDiscoveryAppPublic',
    ethBridge: 'CennznetPrimitivesEthCryptoAppCryptoPublic'
  },
  /**
   * Lookup190: sp_authority_discovery::app::Public
   **/
  SpAuthorityDiscoveryAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup191: cennznet_primitives::eth::crypto::app_crypto::Public
   **/
  CennznetPrimitivesEthCryptoAppCryptoPublic: 'SpCoreEcdsaPublic',
  /**
   * Lookup192: sp_core::ecdsa::Public
   **/
  SpCoreEcdsaPublic: '[u8;33]',
  /**
   * Lookup194: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup195: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup196: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup197: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup198: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup199: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup200: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup203: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup204: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup206: pallet_im_online::pallet::Call<T>
   **/
  PalletImOnlineCall: {
    _enum: {
      heartbeat: {
        heartbeat: 'PalletImOnlineHeartbeat',
        signature: 'PalletImOnlineSr25519AppSr25519Signature'
      }
    }
  },
  /**
   * Lookup207: pallet_im_online::Heartbeat<BlockNumber>
   **/
  PalletImOnlineHeartbeat: {
    blockNumber: 'u32',
    networkState: 'SpCoreOffchainOpaqueNetworkState',
    sessionIndex: 'u32',
    authorityIndex: 'u32',
    validatorsLen: 'u32'
  },
  /**
   * Lookup208: sp_core::offchain::OpaqueNetworkState
   **/
  SpCoreOffchainOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup212: pallet_im_online::sr25519::app_sr25519::Signature
   **/
  PalletImOnlineSr25519AppSr25519Signature: 'SpCoreSr25519Signature',
  /**
   * Lookup213: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup214: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'AccountId32',
      },
      sudo_as: {
        who: 'AccountId32',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup215: pallet_treasury::pallet::Call<T, I>
   **/
  PalletTreasuryCall: {
    _enum: {
      propose_spend: {
        value: 'Compact<u128>',
        beneficiary: 'AccountId32',
      },
      reject_proposal: {
        proposalId: 'Compact<u32>',
      },
      approve_proposal: {
        proposalId: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup216: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'CennznetRuntimeOriginCaller',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup218: cennznet_runtime::OriginCaller
   **/
  CennznetRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSystemRawOrigin',
      __Unused1: 'Null',
      Void: 'SpCoreVoid',
      __Unused3: 'Null',
      __Unused4: 'Null',
      __Unused5: 'Null',
      __Unused6: 'Null',
      __Unused7: 'Null',
      __Unused8: 'Null',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      __Unused23: 'Null',
      __Unused24: 'Null',
      Ethereum: 'PalletEthereumRawOrigin'
    }
  },
  /**
   * Lookup219: frame_system::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSystemRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup220: pallet_ethereum::RawOrigin
   **/
  PalletEthereumRawOrigin: {
    _enum: {
      EthereumTransaction: 'H160'
    }
  },
  /**
   * Lookup221: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup222: pallet_identity::pallet::Call<T>
   **/
  PalletIdentityCall: {
    _enum: {
      add_registrar: {
        account: 'AccountId32',
      },
      set_identity: {
        info: 'PalletIdentityIdentityInfo',
      },
      set_subs: {
        subs: 'Vec<(AccountId32,Data)>',
      },
      clear_identity: 'Null',
      request_judgement: {
        regIndex: 'Compact<u32>',
        maxFee: 'Compact<u128>',
      },
      cancel_request: {
        regIndex: 'u32',
      },
      set_fee: {
        index: 'Compact<u32>',
        fee: 'Compact<u128>',
      },
      set_account_id: {
        _alias: {
          new_: 'new',
        },
        index: 'Compact<u32>',
        new_: 'AccountId32',
      },
      set_fields: {
        index: 'Compact<u32>',
        fields: 'PalletIdentityBitFlags',
      },
      provide_judgement: {
        regIndex: 'Compact<u32>',
        target: 'AccountId32',
        judgement: 'PalletIdentityJudgement',
      },
      kill_identity: {
        target: 'AccountId32',
      },
      add_sub: {
        sub: 'AccountId32',
        data: 'Data',
      },
      rename_sub: {
        sub: 'AccountId32',
        data: 'Data',
      },
      remove_sub: {
        sub: 'AccountId32',
      },
      quit_sub: 'Null'
    }
  },
  /**
   * Lookup223: pallet_identity::types::IdentityInfo<FieldLimit>
   **/
  PalletIdentityIdentityInfo: {
    additional: 'Vec<(Data,Data)>',
    display: 'Data',
    legal: 'Data',
    web: 'Data',
    riot: 'Data',
    email: 'Data',
    pgpFingerprint: 'Option<[u8;20]>',
    image: 'Data',
    twitter: 'Data'
  },
  /**
   * Lookup259: pallet_identity::types::BitFlags<pallet_identity::types::IdentityField>
   **/
  PalletIdentityBitFlags: {
    _bitLength: 64,
    Display: 1,
    Legal: 2,
    Web: 4,
    Riot: 8,
    Email: 16,
    PgpFingerprint: 32,
    Image: 64,
    Twitter: 128
  },
  /**
   * Lookup260: pallet_identity::types::IdentityField
   **/
  PalletIdentityIdentityField: {
    _enum: ['__Unused0', 'Display', 'Legal', '__Unused3', 'Web', '__Unused5', '__Unused6', '__Unused7', 'Riot', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', 'Email', '__Unused17', '__Unused18', '__Unused19', '__Unused20', '__Unused21', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', 'PgpFingerprint', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', 'Image', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'Twitter']
  },
  /**
   * Lookup261: pallet_identity::types::Judgement<Balance>
   **/
  PalletIdentityJudgement: {
    _enum: {
      Unknown: 'Null',
      FeePaid: 'u128',
      Reasonable: 'Null',
      KnownGood: 'Null',
      OutOfDate: 'Null',
      LowQuality: 'Null',
      Erroneous: 'Null'
    }
  },
  /**
   * Lookup262: crml_cennzx::Call<T>
   **/
  CrmlCennzxCall: {
    _enum: {
      buy_asset: {
        recipient: 'Option<AccountId32>',
        assetToSell: 'Compact<u32>',
        assetToBuy: 'Compact<u32>',
        buyAmount: 'Compact<u128>',
        maximumSell: 'Compact<u128>',
      },
      sell_asset: {
        recipient: 'Option<AccountId32>',
        assetToSell: 'Compact<u32>',
        assetToBuy: 'Compact<u32>',
        sellAmount: 'Compact<u128>',
        minimumBuy: 'Compact<u128>',
      },
      add_liquidity: {
        assetId: 'Compact<u32>',
        minLiquidity: 'Compact<u128>',
        maxAssetAmount: 'Compact<u128>',
        coreAmount: 'Compact<u128>',
      },
      remove_liquidity: {
        assetId: 'Compact<u32>',
        liquidityToWithdraw: 'Compact<u128>',
        minAssetWithdraw: 'Compact<u128>',
        minCoreWithdraw: 'Compact<u128>',
      },
      set_fee_rate: {
        newFeeRate: 'u128'
      }
    }
  },
  /**
   * Lookup265: crml_cennzx::types::PerMillion
   **/
  CrmlCennzxPerMillion: 'Null',
  /**
   * Lookup266: crml_staking::rewards::Call<T>
   **/
  CrmlStakingRewardsCall: {
    _enum: {
      set_inflation_rate: {
        numerator: 'u64',
        denominator: 'u64',
      },
      set_development_fund_take: {
        newTakePercent: 'u32',
      },
      force_new_fiscal_era: 'Null'
    }
  },
  /**
   * Lookup267: crml_nft::Call<T>
   **/
  CrmlNftCall: {
    _enum: {
      set_owner: {
        collectionId: 'u32',
        newOwner: 'AccountId32',
      },
      set_series_name: {
        collectionId: 'u32',
        seriesId: 'u32',
        name: 'Bytes',
      },
      register_marketplace: {
        marketplaceAccount: 'Option<AccountId32>',
        entitlement: 'Permill',
      },
      create_collection: {
        name: 'Bytes',
        royaltiesSchedule: 'Option<CrmlNftRoyaltiesSchedule>',
      },
      mint_series: {
        collectionId: 'u32',
        quantity: 'u32',
        owner: 'Option<AccountId32>',
        metadataScheme: 'CrmlNftMetadataScheme',
        royaltiesSchedule: 'Option<CrmlNftRoyaltiesSchedule>',
      },
      mint_additional: {
        collectionId: 'u32',
        seriesId: 'u32',
        quantity: 'u32',
        owner: 'Option<AccountId32>',
      },
      transfer: {
        tokenId: '(u32,u32,u32)',
        newOwner: 'AccountId32',
      },
      transfer_batch: {
        collectionId: 'u32',
        seriesId: 'u32',
        serialNumbers: 'Vec<u32>',
        newOwner: 'AccountId32',
      },
      burn: {
        tokenId: '(u32,u32,u32)',
      },
      burn_batch: {
        collectionId: 'u32',
        seriesId: 'u32',
        serialNumbers: 'Vec<u32>',
      },
      sell: {
        tokenId: '(u32,u32,u32)',
        buyer: 'Option<AccountId32>',
        paymentAsset: 'u32',
        fixedPrice: 'u128',
        duration: 'Option<u32>',
        marketplaceId: 'Option<u32>',
      },
      sell_bundle: {
        tokens: 'Vec<(u32,u32,u32)>',
        buyer: 'Option<AccountId32>',
        paymentAsset: 'u32',
        fixedPrice: 'u128',
        duration: 'Option<u32>',
        marketplaceId: 'Option<u32>',
      },
      buy: {
        listingId: 'u128',
      },
      auction: {
        tokenId: '(u32,u32,u32)',
        paymentAsset: 'u32',
        reservePrice: 'u128',
        duration: 'Option<u32>',
        marketplaceId: 'Option<u32>',
      },
      auction_bundle: {
        tokens: 'Vec<(u32,u32,u32)>',
        paymentAsset: 'u32',
        reservePrice: 'u128',
        duration: 'Option<u32>',
        marketplaceId: 'Option<u32>',
      },
      bid: {
        listingId: 'u128',
        amount: 'u128',
      },
      cancel_sale: {
        listingId: 'u128'
      }
    }
  },
  /**
   * Lookup269: crml_nft::types::RoyaltiesSchedule<sp_core::crypto::AccountId32>
   **/
  CrmlNftRoyaltiesSchedule: {
    entitlements: 'Vec<(AccountId32,Permill)>'
  },
  /**
   * Lookup272: crml_nft::types::MetadataScheme
   **/
  CrmlNftMetadataScheme: {
    _enum: {
      Https: 'Bytes',
      Http: 'Bytes',
      IpfsDir: 'Bytes',
      IpfsShared: 'Bytes'
    }
  },
  /**
   * Lookup275: crml_governance::Call<T>
   **/
  CrmlGovernanceCall: {
    _enum: {
      submit_proposal: {
        call: 'Bytes',
        justificationUri: 'Bytes',
        enactmentDelay: 'u32',
      },
      vote_on_proposal: {
        proposalId: 'u64',
        vote: 'bool',
      },
      add_council_member: {
        newMember: 'AccountId32',
      },
      remove_council_member: {
        removeMember: 'AccountId32',
      },
      cancel_enactment: {
        proposalId: 'u64',
      },
      vote_against_referendum: {
        proposalId: 'u64',
      },
      enact_referendum: {
        proposalId: 'u64',
      },
      set_proposal_bond: {
        newProposalBond: 'u128',
      },
      set_minimum_council_stake: {
        newMinimumCouncilStake: 'u128',
      },
      set_referendum_threshold: {
        newReferendumThreshold: 'Permill',
      },
      set_minimum_voter_staked_amount: {
        newMinimumStakedAmount: 'u128'
      }
    }
  },
  /**
   * Lookup276: crml_eth_bridge::Call<T>
   **/
  CrmlEthBridgeCall: {
    _enum: {
      set_event_confirmations: {
        confirmations: 'u64',
      },
      set_event_deadline: {
        seconds: 'u64',
      },
      submit_notarization: {
        payload: 'CrmlEthBridgeNotarizationPayload',
        signature: 'CennznetPrimitivesEthCryptoAppCryptoSignature'
      }
    }
  },
  /**
   * Lookup277: crml_eth_bridge::types::NotarizationPayload
   **/
  CrmlEthBridgeNotarizationPayload: {
    eventClaimId: 'u64',
    authorityIndex: 'u16',
    result: 'CrmlEthBridgeEventClaimResult'
  },
  /**
   * Lookup278: crml_eth_bridge::types::EventClaimResult
   **/
  CrmlEthBridgeEventClaimResult: {
    _enum: ['Valid', 'DataProviderErr', 'TxStatusFailed', 'UnexpectedContractAddress', 'NoTxLogs', 'NotEnoughConfirmations', 'UnexpectedData', 'Expired']
  },
  /**
   * Lookup279: cennznet_primitives::eth::crypto::app_crypto::Signature
   **/
  CennznetPrimitivesEthCryptoAppCryptoSignature: 'SpCoreEcdsaSignature',
  /**
   * Lookup280: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup282: crml_erc20_peg::Call<T>
   **/
  CrmlErc20PegCall: {
    _enum: {
      activate_deposits: {
        activate: 'bool',
      },
      activate_withdrawals: {
        activate: 'bool',
      },
      deposit_claim: {
        txHash: 'H256',
        claim: 'CrmlErc20PegErc20DepositEvent',
      },
      withdraw: {
        assetId: 'u32',
        amount: 'u128',
        beneficiary: 'H160',
      },
      set_contract_address: {
        ethAddress: 'H160',
      },
      activate_cennz_deposits: 'Null',
      set_erc20_meta: {
        details: 'Vec<(H160,Bytes,u8)>'
      }
    }
  },
  /**
   * Lookup283: crml_erc20_peg::types::Erc20DepositEvent
   **/
  CrmlErc20PegErc20DepositEvent: {
    tokenAddress: 'H160',
    amount: 'U256',
    beneficiary: 'H256'
  },
  /**
   * Lookup286: crml_eth_wallet::Call<T>
   **/
  CrmlEthWalletCall: {
    _enum: {
      call: {
        call: 'Call',
        ethAddress: 'H160',
        signature: 'CrmlEthWalletEthereumEthereumSignature'
      }
    }
  },
  /**
   * Lookup287: crml_eth_wallet::ethereum::EthereumSignature
   **/
  CrmlEthWalletEthereumEthereumSignature: '[u8;65]',
  /**
   * Lookup288: pallet_ethereum::pallet::Call<T>
   **/
  PalletEthereumCall: {
    _enum: {
      transact: {
        transaction: 'EthereumTransactionTransactionV2'
      }
    }
  },
  /**
   * Lookup289: ethereum::transaction::TransactionV2
   **/
  EthereumTransactionTransactionV2: {
    _enum: {
      Legacy: 'EthereumTransactionLegacyTransaction',
      EIP2930: 'EthereumTransactionEip2930Transaction',
      EIP1559: 'EthereumTransactionEip1559Transaction'
    }
  },
  /**
   * Lookup290: ethereum::transaction::LegacyTransaction
   **/
  EthereumTransactionLegacyTransaction: {
    nonce: 'U256',
    gasPrice: 'U256',
    gasLimit: 'U256',
    action: 'EthereumTransactionTransactionAction',
    value: 'U256',
    input: 'Bytes',
    signature: 'EthereumTransactionTransactionSignature'
  },
  /**
   * Lookup291: ethereum::transaction::TransactionAction
   **/
  EthereumTransactionTransactionAction: {
    _enum: {
      Call: 'H160',
      Create: 'Null'
    }
  },
  /**
   * Lookup292: ethereum::transaction::TransactionSignature
   **/
  EthereumTransactionTransactionSignature: {
    v: 'u64',
    r: 'H256',
    s: 'H256'
  },
  /**
   * Lookup294: ethereum::transaction::EIP2930Transaction
   **/
  EthereumTransactionEip2930Transaction: {
    chainId: 'u64',
    nonce: 'U256',
    gasPrice: 'U256',
    gasLimit: 'U256',
    action: 'EthereumTransactionTransactionAction',
    value: 'U256',
    input: 'Bytes',
    accessList: 'Vec<EthereumTransactionAccessListItem>',
    oddYParity: 'bool',
    r: 'H256',
    s: 'H256'
  },
  /**
   * Lookup296: ethereum::transaction::AccessListItem
   **/
  EthereumTransactionAccessListItem: {
    address: 'H160',
    slots: 'Vec<H256>'
  },
  /**
   * Lookup297: ethereum::transaction::EIP1559Transaction
   **/
  EthereumTransactionEip1559Transaction: {
    chainId: 'u64',
    nonce: 'U256',
    maxPriorityFeePerGas: 'U256',
    maxFeePerGas: 'U256',
    gasLimit: 'U256',
    action: 'EthereumTransactionTransactionAction',
    value: 'U256',
    input: 'Bytes',
    accessList: 'Vec<EthereumTransactionAccessListItem>',
    oddYParity: 'bool',
    r: 'H256',
    s: 'H256'
  },
  /**
   * Lookup298: pallet_evm::pallet::Call<T>
   **/
  PalletEvmCall: {
    _enum: {
      withdraw: {
        address: 'H160',
        value: 'u128',
      },
      call: {
        source: 'H160',
        target: 'H160',
        input: 'Bytes',
        value: 'U256',
        gasLimit: 'u64',
        maxFeePerGas: 'U256',
        maxPriorityFeePerGas: 'Option<U256>',
        nonce: 'Option<U256>',
        accessList: 'Vec<(H160,Vec<H256>)>',
      },
      create: {
        source: 'H160',
        init: 'Bytes',
        value: 'U256',
        gasLimit: 'u64',
        maxFeePerGas: 'U256',
        maxPriorityFeePerGas: 'Option<U256>',
        nonce: 'Option<U256>',
        accessList: 'Vec<(H160,Vec<H256>)>',
      },
      create2: {
        source: 'H160',
        init: 'Bytes',
        salt: 'H256',
        value: 'U256',
        gasLimit: 'u64',
        maxFeePerGas: 'U256',
        maxPriorityFeePerGas: 'Option<U256>',
        nonce: 'Option<U256>',
        accessList: 'Vec<(H160,Vec<H256>)>'
      }
    }
  },
  /**
   * Lookup302: pallet_base_fee::pallet::Call<T>
   **/
  PalletBaseFeeCall: {
    _enum: {
      set_base_fee_per_gas: {
        fee: 'U256',
      },
      set_is_active: {
        isActive: 'bool',
      },
      set_elasticity: {
        elasticity: 'Permill'
      }
    }
  },
  /**
   * Lookup303: crml_token_approvals::Call<T>
   **/
  CrmlTokenApprovalsCall: {
    _enum: {
      erc721_approval: {
        caller: 'H160',
        operatorAccount: 'H160',
        tokenId: '(u32,u32,u32)',
      },
      erc20_approval: {
        caller: 'H160',
        spender: 'H160',
        assetId: 'u32',
        amount: 'u128',
      },
      erc20_remove_approval: {
        caller: 'H160',
        spender: 'H160',
        assetId: 'u32'
      }
    }
  },
  /**
   * Lookup304: pallet_scheduler::Releases
   **/
  PalletSchedulerReleases: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup305: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup312: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: '(u64,u64)',
    allowedSlots: 'SpConsensusBabeAllowedSlots'
  },
  /**
   * Lookup313: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: ['InvalidEquivocationProof', 'InvalidKeyOwnershipProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup315: crml_generic_asset::types::PermissionVersions<sp_core::crypto::AccountId32>
   **/
  CrmlGenericAssetPermissionVersions: {
    _enum: {
      V1: 'CrmlGenericAssetPermissionsV1'
    }
  },
  /**
   * Lookup317: crml_generic_asset::types::BalanceLock<Balance>
   **/
  CrmlGenericAssetBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'CrmlGenericAssetReasons'
  },
  /**
   * Lookup318: crml_generic_asset::types::Reasons
   **/
  CrmlGenericAssetReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup319: crml_generic_asset::Error<T>
   **/
  CrmlGenericAssetError: {
    _enum: ['AssetIdExhausted', 'ZeroAmount', 'NoUpdatePermission', 'NoMintPermission', 'NoBurnPermission', 'TotalMintingOverflow', 'FreeMintingOverflow', 'TotalBurningUnderflow', 'FreeBurningUnderflow', 'AssetIdExists', 'AssetIdNotExist', 'InsufficientBalance', 'TransferOverflow', 'LiquidityRestrictions', 'ZeroExistentialDeposit', 'AccountIdNotExist', 'DecimalTooLarge', 'InitialIssuanceTooLarge']
  },
  /**
   * Lookup321: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletAuthorshipUncleEntryItem: {
    _enum: {
      InclusionHeight: 'u32',
      Uncle: '(H256,Option<AccountId32>)'
    }
  },
  /**
   * Lookup322: pallet_authorship::pallet::Error<T>
   **/
  PalletAuthorshipError: {
    _enum: ['InvalidUncleParent', 'UnclesAlreadySet', 'TooManyUncles', 'GenesisUncle', 'TooHighUncle', 'UncleAlreadyIncluded', 'OldUncle']
  },
  /**
   * Lookup325: crml_staking::StakingLedger<sp_core::crypto::AccountId32, Balance>
   **/
  CrmlStakingStakingLedger: {
    stash: 'AccountId32',
    total: 'Compact<u128>',
    active: 'Compact<u128>',
    unlocking: 'Vec<CrmlStakingUnlockChunk>'
  },
  /**
   * Lookup327: crml_staking::UnlockChunk<Balance>
   **/
  CrmlStakingUnlockChunk: {
    value: 'Compact<u128>',
    era: 'Compact<u32>'
  },
  /**
   * Lookup328: crml_staking::Nominations<sp_core::crypto::AccountId32>
   **/
  CrmlStakingNominations: {
    targets: 'Vec<AccountId32>',
    submittedIn: 'u32'
  },
  /**
   * Lookup329: crml_staking::ActiveEraInfo
   **/
  CrmlStakingActiveEraInfo: {
    index: 'u32',
    start: 'Option<u64>'
  },
  /**
   * Lookup330: crml_staking::Forcing
   **/
  CrmlStakingForcing: {
    _enum: ['NotForcing', 'ForceNew', 'ForceNone', 'ForceAlways']
  },
  /**
   * Lookup332: crml_staking::UnappliedSlash<sp_core::crypto::AccountId32, Balance>
   **/
  CrmlStakingUnappliedSlash: {
    validator: 'AccountId32',
    own: 'u128',
    others: 'Vec<(AccountId32,u128)>',
    reporters: 'Vec<AccountId32>',
    payout: 'u128'
  },
  /**
   * Lookup336: crml_staking::slashing::SlashingSpans
   **/
  CrmlStakingSlashingSlashingSpans: {
    spanIndex: 'u32',
    lastStart: 'u32',
    lastNonzeroSlash: 'u32',
    prior: 'Vec<u32>'
  },
  /**
   * Lookup338: crml_staking::slashing::SpanRecord<Balance>
   **/
  CrmlStakingSlashingSpanRecord: {
    slashed: 'u128',
    paidOut: 'u128'
  },
  /**
   * Lookup339: crml_staking::ElectionResult<sp_core::crypto::AccountId32, Balance>
   **/
  CrmlStakingElectionResult: {
    electedStashes: 'Vec<AccountId32>',
    exposures: 'Vec<(AccountId32,CrmlStakingExposure)>',
    compute: 'CrmlStakingElectionCompute'
  },
  /**
   * Lookup340: crml_staking::ElectionStatus<BlockNumber>
   **/
  CrmlStakingElectionStatus: {
    _enum: {
      Closed: 'Null',
      Open: 'u32'
    }
  },
  /**
   * Lookup344: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
   **/
  SpStakingOffenceOffenceDetails: {
    offender: '(AccountId32,CrmlStakingExposure)',
    reporters: 'Vec<AccountId32>'
  },
  /**
   * Lookup346: crml_staking::Error<T>
   **/
  CrmlStakingError: {
    _enum: ['NotController', 'NotStash', 'AlreadyBonded', 'AlreadyPaired', 'EmptyTargets', 'InvalidSlashIndex', 'InsufficientBond', 'InsufficientFreeBalance', 'NoMoreChunks', 'NoUnlockChunk', 'FundedTarget', 'NotSortedAndUnique', 'DuplicateNominee', 'OffchainElectionEarlySubmission', 'OffchainElectionWeakSubmission', 'SnapshotUnavailable', 'OffchainElectionBogusWinnerCount', 'OffchainElectionBogusWinner', 'OffchainElectionBogusCompact', 'OffchainElectionBogusNominator', 'OffchainElectionBogusNomination', 'OffchainElectionSlashedNomination', 'OffchainElectionBogusSelfVote', 'OffchainElectionBogusEdge', 'OffchainElectionBogusScore', 'OffchainElectionBogusElectionSize', 'CallNotAllowed', 'IncorrectHistoryDepth', 'IncorrectSlashingSpans']
  },
  /**
   * Lookup351: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup352: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup353: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup354: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup356: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup360: pallet_im_online::BoundedOpaqueNetworkState<PeerIdEncodingLimit, MultiAddrEncodingLimit, AddressesLimit>
   **/
  PalletImOnlineBoundedOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup364: pallet_im_online::pallet::Error<T>
   **/
  PalletImOnlineError: {
    _enum: ['InvalidKey', 'DuplicatedHeartbeat']
  },
  /**
   * Lookup365: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup366: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup368: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup369: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals']
  },
  /**
   * Lookup370: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup371: pallet_identity::types::Registration<Balance, MaxJudgements, MaxAdditionalFields>
   **/
  PalletIdentityRegistration: {
    judgements: 'Vec<(u32,PalletIdentityJudgement)>',
    deposit: 'u128',
    info: 'PalletIdentityIdentityInfo'
  },
  /**
   * Lookup379: pallet_identity::types::RegistrarInfo<Balance, sp_core::crypto::AccountId32>
   **/
  PalletIdentityRegistrarInfo: {
    account: 'AccountId32',
    fee: 'u128',
    fields: 'PalletIdentityBitFlags'
  },
  /**
   * Lookup381: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['TooManySubAccounts', 'NotFound', 'NotNamed', 'EmptyIndex', 'FeeChanged', 'NoIdentity', 'StickyJudgement', 'JudgementGiven', 'InvalidJudgement', 'InvalidIndex', 'InvalidTarget', 'TooManyFields', 'TooManyRegistrars', 'AlreadyClaimed', 'NotSub', 'NotOwned']
  },
  /**
   * Lookup383: crml_transaction_payment::Releases
   **/
  CrmlTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup385: frame_support::weights::WeightToFeeCoefficient<Balance>
   **/
  FrameSupportWeightsWeightToFeeCoefficient: {
    coeffInteger: 'u128',
    coeffFrac: 'Perbill',
    negative: 'bool',
    degree: 'u8'
  },
  /**
   * Lookup387: crml_cennzx::Error<T>
   **/
  CrmlCennzxError: {
    _enum: ['EmptyExchangePool', 'InsufficientExchangePoolReserve', 'InsufficientBalance', 'InsufficientLiquidity', 'InsufficientTradeAssetBalance', 'InsufficientCoreAssetBalance', 'CannotTradeZero', 'CannotAddLiquidityWithZero', 'MinimumBuyRequirementNotMet', 'MaximumSellRequirementNotMet', 'MinimumTradeAssetRequirementNotMet', 'MinimumCoreAssetRequirementNotMet', 'MinimumLiquidityRequirementNotMet', 'MaximumTradeAssetRequirementNotMet', 'AssetCannotSwapForItself', 'InvalidAssetId', 'Overflow', 'DivideByZero']
  },
  /**
   * Lookup389: crml_staking::rewards::types::EraRewardPoints<sp_core::crypto::AccountId32>
   **/
  CrmlStakingRewardsTypesEraRewardPoints: {
    total: 'u32',
    individual: 'BTreeMap<AccountId32, u32>'
  },
  /**
   * Lookup392: crml_nft::types::TokenLockReason
   **/
  CrmlNftTokenLockReason: {
    _enum: {
      Listed: 'u128'
    }
  },
  /**
   * Lookup396: crml_nft::types::Marketplace<sp_core::crypto::AccountId32>
   **/
  CrmlNftMarketplace: {
    account: 'AccountId32',
    entitlement: 'Permill'
  },
  /**
   * Lookup398: crml_nft::types::NFTAttributeValue
   **/
  CrmlNftNftAttributeValue: {
    _enum: {
      I32: 'i32',
      U8: 'u8',
      U16: 'u16',
      U32: 'u32',
      U64: 'u64',
      U128: 'u128',
      Bytes32: '[u8;32]',
      Bytes: 'Bytes',
      String: 'Bytes',
      Hash: '[u8;32]',
      Timestamp: 'u64',
      Url: 'Bytes'
    }
  },
  /**
   * Lookup400: crml_nft::types::Listing<T>
   **/
  CrmlNftListing: {
    _enum: {
      FixedPrice: 'CrmlNftFixedPriceListing',
      Auction: 'CrmlNftAuctionListing'
    }
  },
  /**
   * Lookup401: crml_nft::types::FixedPriceListing<T>
   **/
  CrmlNftFixedPriceListing: {
    paymentAsset: 'u32',
    fixedPrice: 'u128',
    close: 'u32',
    buyer: 'Option<AccountId32>',
    seller: 'AccountId32',
    tokens: 'Vec<(u32,u32,u32)>',
    royaltiesSchedule: 'CrmlNftRoyaltiesSchedule',
    marketplaceId: 'Option<u32>'
  },
  /**
   * Lookup402: crml_nft::types::AuctionListing<T>
   **/
  CrmlNftAuctionListing: {
    paymentAsset: 'u32',
    reservePrice: 'u128',
    close: 'u32',
    seller: 'AccountId32',
    tokens: 'Vec<(u32,u32,u32)>',
    royaltiesSchedule: 'CrmlNftRoyaltiesSchedule',
    marketplaceId: 'Option<u32>'
  },
  /**
   * Lookup404: crml_nft::Error<T>
   **/
  CrmlNftError: {
    _enum: ['CollectionIdExists', 'CollectionNameInvalid', 'NoAvailableIds', 'SchemaMaxAttributes', 'MaxAttributeLength', 'NoPermission', 'NoCollection', 'NoToken', 'NotForFixedPriceSale', 'NotForAuction', 'TokenListingProtection', 'InternalPayment', 'RoyaltiesInvalid', 'BidTooLow', 'MixedBundleSale', 'RoyaltiesProtection', 'MarketplaceNotRegistered', 'NoSeries', 'NameAlreadySet', 'InvalidMetadataPath']
  },
  /**
   * Lookup405: crml_governance::types::Proposal<T>
   **/
  CrmlGovernanceProposal: {
    sponsor: 'AccountId32',
    justificationUri: 'Bytes',
    enactmentDelay: 'u32'
  },
  /**
   * Lookup406: crml_governance::types::ProposalVoteInfo
   **/
  CrmlGovernanceProposalVoteInfo: {
    voteBits: '(u128,u128)',
    activeBits: '(u128,u128)'
  },
  /**
   * Lookup408: crml_governance::types::ProposalStatusInfo
   **/
  CrmlGovernanceProposalStatusInfo: {
    _enum: {
      Deliberation: 'Null',
      ReferendumDeliberation: 'Null',
      ApprovedWaitingEnactment: 'Null',
      ApprovedEnacted: 'bool',
      ApprovedEnactmentCancelled: 'Null',
      Disapproved: 'Null',
      ReferendumVetoed: 'Null'
    }
  },
  /**
   * Lookup417: crml_eth_wallet::Error<T>
   **/
  CrmlEthWalletError: {
    _enum: ['InvalidSignature', 'CantPay']
  },
  /**
   * Lookup420: fp_rpc::TransactionStatus
   **/
  FpRpcTransactionStatus: {
    transactionHash: 'H256',
    transactionIndex: 'u32',
    from: 'H160',
    to: 'Option<H160>',
    contractAddress: 'Option<H160>',
    logs: 'Vec<EthereumLog>',
    logsBloom: 'EthbloomBloom'
  },
  /**
   * Lookup423: ethbloom::Bloom
   **/
  EthbloomBloom: '[u8;256]',
  /**
   * Lookup425: ethereum::receipt::ReceiptV3
   **/
  EthereumReceiptReceiptV3: {
    _enum: {
      Legacy: 'EthereumReceiptEip658ReceiptData',
      EIP2930: 'EthereumReceiptEip658ReceiptData',
      EIP1559: 'EthereumReceiptEip658ReceiptData'
    }
  },
  /**
   * Lookup426: ethereum::receipt::EIP658ReceiptData
   **/
  EthereumReceiptEip658ReceiptData: {
    statusCode: 'u8',
    usedGas: 'U256',
    logsBloom: 'EthbloomBloom',
    logs: 'Vec<EthereumLog>'
  },
  /**
   * Lookup427: ethereum::block::Block<ethereum::transaction::TransactionV2>
   **/
  EthereumBlock: {
    header: 'EthereumHeader',
    transactions: 'Vec<EthereumTransactionTransactionV2>',
    ommers: 'Vec<EthereumHeader>'
  },
  /**
   * Lookup428: ethereum::header::Header
   **/
  EthereumHeader: {
    parentHash: 'H256',
    ommersHash: 'H256',
    beneficiary: 'H160',
    stateRoot: 'H256',
    transactionsRoot: 'H256',
    receiptsRoot: 'H256',
    logsBloom: 'EthbloomBloom',
    difficulty: 'U256',
    number: 'U256',
    gasLimit: 'U256',
    gasUsed: 'U256',
    timestamp: 'u64',
    extraData: 'Bytes',
    mixHash: 'H256',
    nonce: 'EthereumTypesHashH64'
  },
  /**
   * Lookup429: ethereum_types::hash::H64
   **/
  EthereumTypesHashH64: '[u8;8]',
  /**
   * Lookup434: pallet_ethereum::pallet::Error<T>
   **/
  PalletEthereumError: {
    _enum: ['InvalidSignature', 'PreLogExists']
  },
  /**
   * Lookup435: pallet_evm::pallet::Error<T>
   **/
  PalletEvmError: {
    _enum: ['BalanceLow', 'FeeOverflow', 'PaymentOverflow', 'WithdrawFailed', 'GasPriceTooLow', 'InvalidNonce']
  },
  /**
   * Lookup441: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup443: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup444: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup445: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup448: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u64>',
  /**
   * Lookup449: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup450: crml_transaction_payment::ChargeTransactionPayment<T>
   **/
  CrmlTransactionPaymentChargeTransactionPayment: {
    tip: 'Compact<u128>',
    feeExchange: 'Option<CennznetPrimitivesFeeExchange>'
  },
  /**
   * Lookup452: cennznet_primitives::types::FeeExchange<AssetId, Balance>
   **/
  CennznetPrimitivesFeeExchange: {
    _enum: {
      V1: 'CennznetPrimitivesFeeExchangeV1'
    }
  },
  /**
   * Lookup453: cennznet_primitives::types::FeeExchangeV1<AssetId, Balance>
   **/
  CennznetPrimitivesFeeExchangeV1: {
    assetId: 'Compact<u32>',
    maxPayment: 'Compact<u128>'
  },
  /**
   * Lookup455: cennznet_runtime::Runtime
   **/
  CennznetRuntimeRuntime: 'Null'
};
