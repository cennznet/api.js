---
title: Storage
---

The following sections contain Storage methods are part of the default Substrate runtime. On the api, these are exposed via `api.query.<module>.<method>`. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[authorship](#authorship)**

- **[babe](#babe)**

- **[baseFee](#basefee)**

- **[cennzx](#cennzx)**

- **[erc20Peg](#erc20peg)**

- **[ethBridge](#ethbridge)**

- **[ethereum](#ethereum)**

- **[eVM](#evm)**

- **[genericAsset](#genericasset)**

- **[governance](#governance)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[nft](#nft)**

- **[offences](#offences)**

- **[rewards](#rewards)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[system](#system)**

- **[timestamp](#timestamp)**

- **[tokenApprovals](#tokenapprovals)**

- **[transactionPayment](#transactionpayment)**

- **[treasury](#treasury)**


___


## authorship
 
### author(): `Option<AccountId32>`
- **interface**: `api.query.authorship.author`
- **summary**:    Author of current block. 
 
### didSetUncles(): `bool`
- **interface**: `api.query.authorship.didSetUncles`
- **summary**:    Whether uncles were already set in this block. 
 
### uncles(): `Vec<PalletAuthorshipUncleEntryItem>`
- **interface**: `api.query.authorship.uncles`
- **summary**:    Uncles 

___


## babe
 
### authorities(): `Vec<(SpConsensusBabeAppPublic,u64)>`
- **interface**: `api.query.babe.authorities`
- **summary**:    Current epoch authorities. 
 
### authorVrfRandomness(): `Option<[u8;32]>`
- **interface**: `api.query.babe.authorVrfRandomness`
- **summary**:    This field should always be populated during block processing unless  secondary plain slots are enabled (which don't contain a VRF output). 

   It is set in `on_initialize`, before it will contain the value from the last block. 
 
### currentSlot(): `u64`
- **interface**: `api.query.babe.currentSlot`
- **summary**:    Current slot number. 
 
### epochConfig(): `Option<SpConsensusBabeBabeEpochConfiguration>`
- **interface**: `api.query.babe.epochConfig`
- **summary**:    The configuration for the current epoch. Should never be `None` as it is initialized in  genesis. 
 
### epochIndex(): `u64`
- **interface**: `api.query.babe.epochIndex`
- **summary**:    Current epoch index. 
 
### epochStart(): `(u32,u32)`
- **interface**: `api.query.babe.epochStart`
- **summary**:    The block numbers when the last and current epoch have started, respectively `N-1` and  `N`.  NOTE: We track this is in order to annotate the block number when a given pool of  entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in  slots, which may be skipped, the block numbers may not line up with the slot numbers. 
 
### genesisSlot(): `u64`
- **interface**: `api.query.babe.genesisSlot`
- **summary**:    The slot at which the first epoch actually started. This is 0  until the first block of the chain. 
 
### initialized(): `Option<Option<[u8;32]>>`
- **interface**: `api.query.babe.initialized`
- **summary**:    Temporary value (cleared at block finalization) which is `Some`  if per-block initialization has already been called for current block. 
 
### lateness(): `u32`
- **interface**: `api.query.babe.lateness`
- **summary**:    How late the current block is compared to its parent. 

   This entry is populated as part of block execution and is cleaned up  on block finalization. Querying this storage entry outside of block  execution context should always yield zero. 
 
### nextAuthorities(): `Vec<(SpConsensusBabeAppPublic,u64)>`
- **interface**: `api.query.babe.nextAuthorities`
- **summary**:    Next epoch authorities. 
 
### nextEpochConfig(): `Option<SpConsensusBabeBabeEpochConfiguration>`
- **interface**: `api.query.babe.nextEpochConfig`
- **summary**:    The configuration for the next epoch, `None` if the config will not change  (you can fallback to `EpochConfig` instead in that case). 
 
### nextRandomness(): `[u8;32]`
- **interface**: `api.query.babe.nextRandomness`
- **summary**:    Next epoch randomness. 
 
### pendingEpochConfigChange(): `Option<SpConsensusBabeDigestsNextConfigDescriptor>`
- **interface**: `api.query.babe.pendingEpochConfigChange`
- **summary**:    Pending epoch configuration change that will be applied when the next epoch is enacted. 
 
### randomness(): `[u8;32]`
- **interface**: `api.query.babe.randomness`
- **summary**:    The epoch randomness for the *current* epoch. 

   # Security 

   This MUST NOT be used for gambling, as it can be influenced by a  malicious validator in the short term. It MAY be used in many  cryptographic protocols, however, so long as one remembers that this  (like everything else on-chain) it is public. For example, it can be  used where a number is needed that cannot have been chosen by an  adversary, for purposes such as public-coin zero-knowledge proofs. 
 
### segmentIndex(): `u32`
- **interface**: `api.query.babe.segmentIndex`
- **summary**:    Randomness under construction. 

   We make a trade-off between storage accesses and list length.  We store the under-construction randomness in segments of up to  `UNDER_CONSTRUCTION_SEGMENT_LENGTH`. 

   Once a segment reaches this length, we begin the next one.  We reset all segments and return to `0` at the beginning of every  epoch. 
 
### underConstruction(`u32`): `Vec<[u8;32]>`
- **interface**: `api.query.babe.underConstruction`
- **summary**:    TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay. 

___


## baseFee
 
### baseFeePerGas(): `U256`
- **interface**: `api.query.baseFee.baseFeePerGas`
 
### elasticity(): `Permill`
- **interface**: `api.query.baseFee.elasticity`
 
### isActive(): `bool`
- **interface**: `api.query.baseFee.isActive`

___


## cennzx
 
### coreAssetId(): `u32`
- **interface**: `api.query.cennzx.coreAssetId`
- **summary**:    Asset Id of the core liquidity asset 
 
### defaultFeeRate(): `u128`
- **interface**: `api.query.cennzx.defaultFeeRate`
- **summary**:    Default trading fee rate 
 
### liquidityBalance(`(u32,u32), AccountId32`): `u128`
- **interface**: `api.query.cennzx.liquidityBalance`
- **summary**:    Liquidity holdings of a user in an exchange pool.  Key: `(core_asset_id, trade_asset_id), account_id` 
 
### totalLiquidity(`(u32,u32)`): `u128`
- **interface**: `api.query.cennzx.totalLiquidity`
- **summary**:    Total liquidity holdings of all investors in an exchange.  ie/ total_liquidity(exchange) == sum(liquidity_balance(exchange, user)) at all times 

___


## erc20Peg
 
### assetIdToErc20(`u32`): `Option<H160>`
- **interface**: `api.query.erc20Peg.assetIdToErc20`
- **summary**:    Map GA asset Id to ERC20 address 
 
### cENNZDepositsActive(): `bool`
- **interface**: `api.query.erc20Peg.cENNZDepositsActive`
- **summary**:    Whether CENNZ deposits are active 
 
### contractAddress(): `H160`
- **interface**: `api.query.erc20Peg.contractAddress`
- **summary**:    The peg contract address on Ethereum 
 
### depositsActive(): `bool`
- **interface**: `api.query.erc20Peg.depositsActive`
- **summary**:    Whether deposit are active 
 
### erc20Meta(`H160`): `Option<(Bytes,u8)>`
- **interface**: `api.query.erc20Peg.erc20Meta`
- **summary**:    Metadata for well-known erc20 tokens (symbol, decimals) 
 
### erc20ToAssetId(`H160`): `Option<u32>`
- **interface**: `api.query.erc20Peg.erc20ToAssetId`
- **summary**:    Map ERC20 address to GA asset Id 
 
### withdrawalDigests(`u64`): `H256`
- **interface**: `api.query.erc20Peg.withdrawalDigests`
- **summary**:    Hash of withdrawal information 
 
### withdrawalsActive(): `bool`
- **interface**: `api.query.erc20Peg.withdrawalsActive`
- **summary**:    Whether withdrawals are active 

___


## ethBridge
 
### activationThreshold(): `Percent`
- **interface**: `api.query.ethBridge.activationThreshold`
- **summary**:    Required % of validator support to signal readiness (default: 66%) 
 
### bridgePaused(): `bool`
- **interface**: `api.query.ethBridge.bridgePaused`
- **summary**:    Whether the bridge is paused (for validator transitions) 
 
### eventClaims(`u64`): `(H256,u32)`
- **interface**: `api.query.ethBridge.eventClaims`
- **summary**:    Queued event claims, awaiting notarization 
 
### eventConfirmations(): `u64`
- **interface**: `api.query.ethBridge.eventConfirmations`
- **summary**:    The minimum number of block confirmations needed to notarize an Ethereum event 
 
### eventData(`u64`): `Option<Bytes>`
- **interface**: `api.query.ethBridge.eventData`
- **summary**:    Event data for a given claim 
 
### eventDeadlineSeconds(): `u64`
- **interface**: `api.query.ethBridge.eventDeadlineSeconds`
- **summary**:    Events cannot be claimed after this time (seconds) 
 
### eventNotarizations(`u64, CennznetPrimitivesEthCryptoAppCryptoPublic`): `Option<CrmlEthBridgeEventClaimResult>`
- **interface**: `api.query.ethBridge.eventNotarizations`
- **summary**:    Notarizations for queued messages  Either: None = no notarization exists OR Some(yay/nay) 
 
### eventTypeToTypeId(`(H160,H256)`): `u32`
- **interface**: `api.query.ethBridge.eventTypeToTypeId`
- **summary**:    Maps event types seen by the bridge ((contract address, event signature)) to unique type Ids 
 
### nextEventClaimId(): `u64`
- **interface**: `api.query.ethBridge.nextEventClaimId`
- **summary**:    Id of the next Eth bridge event claim 
 
### nextEventTypeId(): `u32`
- **interface**: `api.query.ethBridge.nextEventTypeId`
- **summary**:    Id of the next event type (internal) 
 
### nextNotaryKeys(): `Vec<CennznetPrimitivesEthCryptoAppCryptoPublic>`
- **interface**: `api.query.ethBridge.nextNotaryKeys`
- **summary**:    Scheduled notary (validator) public keys for the next session 
 
### nextProofId(): `u64`
- **interface**: `api.query.ethBridge.nextProofId`
- **summary**:    Id of the next event proof 
 
### notaryKeys(): `Vec<CennznetPrimitivesEthCryptoAppCryptoPublic>`
- **interface**: `api.query.ethBridge.notaryKeys`
- **summary**:    Active notary (validator) public keys 
 
### notarySetId(): `u64`
- **interface**: `api.query.ethBridge.notarySetId`
- **summary**:    The current validator set id 
 
### notarySetProofId(): `u64`
- **interface**: `api.query.ethBridge.notarySetProofId`
- **summary**:    The event proof Id generated by the previous validator set to notarize the current set.  Useful for syncing the latest proof to Ethereum 
 
### pendingTxHashes(`H256`): `u64`
- **interface**: `api.query.ethBridge.pendingTxHashes`
- **summary**:    Map of pending tx hashes to claim Id 
 
### processedTxBuckets(`u64, H256`): `Null`
- **interface**: `api.query.ethBridge.processedTxBuckets`
- **summary**:    Processed tx hashes bucketed by unix timestamp (`BUCKET_FACTOR_S`) 
 
### processedTxHashes(`H256`): `Null`
- **interface**: `api.query.ethBridge.processedTxHashes`
- **summary**:    Set of processed tx hashes  Periodically cleared after `EventDeadlineSeconds` expires 
 
### typeIdToEventType(`u32`): `(H160,H256)`
- **interface**: `api.query.ethBridge.typeIdToEventType`
- **summary**:    Maps event type ids to ((contract address, event signature)) 

___


## ethereum
 
### blockHash(`U256`): `H256`
- **interface**: `api.query.ethereum.blockHash`
 
### currentBlock(): `Option<EthereumBlock>`
- **interface**: `api.query.ethereum.currentBlock`
- **summary**:    The current Ethereum block. 
 
### currentReceipts(): `Option<Vec<EthereumReceiptReceiptV3>>`
- **interface**: `api.query.ethereum.currentReceipts`
- **summary**:    The current Ethereum receipts. 
 
### currentTransactionStatuses(): `Option<Vec<FpRpcTransactionStatus>>`
- **interface**: `api.query.ethereum.currentTransactionStatuses`
- **summary**:    The current transaction statuses. 
 
### pending(): `Vec<(EthereumTransactionTransactionV2,FpRpcTransactionStatus,EthereumReceiptReceiptV3)>`
- **interface**: `api.query.ethereum.pending`
- **summary**:    Current building block's transactions and receipts. 

___


## eVM
 
### accountCodes(`H160`): `Bytes`
- **interface**: `api.query.eVM.accountCodes`
 
### accountStorages(`H160, H256`): `H256`
- **interface**: `api.query.eVM.accountStorages`

___


## genericAsset
 
### assetMeta(`u32`): `CrmlGenericAssetAssetInfo`
- **interface**: `api.query.genericAsset.assetMeta`
- **summary**:    The info for assets 
 
### freeBalance(`u32, AccountId32`): `u128`
- **interface**: `api.query.genericAsset.freeBalance`
- **summary**:    The free balance of a given asset under an account. 

   TWOX-NOTE: `AssetId` is trusted. 
 
### locks(`u32, AccountId32`): `Vec<CrmlGenericAssetBalanceLock>`
- **interface**: `api.query.genericAsset.locks`
- **summary**:    Any liquidity locks on some account balances. 
 
### nextAssetId(): `u32`
- **interface**: `api.query.genericAsset.nextAssetId`
- **summary**:    Next available ID for user-created asset. 
 
### permissions(`u32`): `CrmlGenericAssetPermissionVersions`
- **interface**: `api.query.genericAsset.permissions`
- **summary**:    Permission options for a given asset. 

   TWOX-NOTE: `AssetId` is trusted. 
 
### reservedBalance(`u32, AccountId32`): `u128`
- **interface**: `api.query.genericAsset.reservedBalance`
- **summary**:    The reserved balance of a given asset under an account. 

   TWOX-NOTE: `AssetId` is trusted. 
 
### spendingAssetId(): `u32`
- **interface**: `api.query.genericAsset.spendingAssetId`
- **summary**:    The identity of the asset which is the one that is designated for paying the chain's transaction fee. 
 
### stakingAssetId(): `u32`
- **interface**: `api.query.genericAsset.stakingAssetId`
- **summary**:    The identity of the asset which is the one that is designated for the chain's staking system. 
 
### storageVersion(): `u32`
- **interface**: `api.query.genericAsset.storageVersion`
- **summary**:    Storage version of the pallet. 

   This is set to v1 for new networks. 
 
### totalIssuance(`u32`): `u128`
- **interface**: `api.query.genericAsset.totalIssuance`
- **summary**:    Total issuance of a given asset. 

   TWOX-NOTE: `AssetId` is trusted. 

___


## governance
 
### council(): `Vec<AccountId32>`
- **interface**: `api.query.governance.council`
- **summary**:    Ordered set of active council members 
 
### minimumCouncilStake(): `u128`
- **interface**: `api.query.governance.minimumCouncilStake`
- **summary**:    Minimum stake required to create a new council member 
 
### minVoterStakedAmount(): `u128`
- **interface**: `api.query.governance.minVoterStakedAmount`
- **summary**:    Minimum amount of staked CENNZ required to vote 
 
### nextProposalId(): `u64`
- **interface**: `api.query.governance.nextProposalId`
- **summary**:    Next available ID for proposal 
 
### proposalBond(): `u128`
- **interface**: `api.query.governance.proposalBond`
- **summary**:    Proposal bond amount in 'wei' 
 
### proposalCalls(`u64`): `Option<Bytes>`
- **interface**: `api.query.governance.proposalCalls`
- **summary**:    Map from proposal Id to call if any 
 
### proposals(`u64`): `Option<CrmlGovernanceProposal>`
- **interface**: `api.query.governance.proposals`
- **summary**:    Map from proposal Id to proposal info 
 
### proposalStatus(`u64`): `Option<CrmlGovernanceProposalStatusInfo>`
- **interface**: `api.query.governance.proposalStatus`
- **summary**:    Map from proposal Id to status 
 
### proposalVotes(`u64`): `CrmlGovernanceProposalVoteInfo`
- **interface**: `api.query.governance.proposalVotes`
- **summary**:    Map from proposal Id to votes 
 
### referendumStartTime(`u64`): `Option<u32>`
- **interface**: `api.query.governance.referendumStartTime`
- **summary**:    Map from proposal id to referendum start time 
 
### referendumThreshold(): `Permill`
- **interface**: `api.query.governance.referendumThreshold`
- **summary**:    Permill of vetos needed for a referendum to fail 
 
### referendumVetoSum(`u64`): `u128`
- **interface**: `api.query.governance.referendumVetoSum`
- **summary**:    Running tally of referendum votes 
 
### referendumVotes(`u64, AccountId32`): `u128`
- **interface**: `api.query.governance.referendumVotes`
- **summary**:    Map from proposal Id to VotingPower 

___


## grandpa
 
### currentSetId(): `u64`
- **interface**: `api.query.grandpa.currentSetId`
- **summary**:    The number of changes (both in terms of keys and underlying economic responsibilities)  in the "set" of Grandpa validators from genesis. 
 
### nextForced(): `Option<u32>`
- **interface**: `api.query.grandpa.nextForced`
- **summary**:    next block number where we can force a change. 
 
### pendingChange(): `Option<PalletGrandpaStoredPendingChange>`
- **interface**: `api.query.grandpa.pendingChange`
- **summary**:    Pending change: (signaled at, scheduled change). 
 
### setIdSession(`u64`): `Option<u32>`
- **interface**: `api.query.grandpa.setIdSession`
- **summary**:    A mapping from grandpa set ID to the index of the *most recent* session for which its  members were responsible. 

   TWOX-NOTE: `SetId` is not under user control. 
 
### stalled(): `Option<(u32,u32)>`
- **interface**: `api.query.grandpa.stalled`
- **summary**:    `true` if we are currently stalled. 
 
### state(): `PalletGrandpaStoredState`
- **interface**: `api.query.grandpa.state`
- **summary**:    State of the current authority set. 

___


## identity
 
### identityOf(`AccountId32`): `Option<PalletIdentityRegistration>`
- **interface**: `api.query.identity.identityOf`
- **summary**:    Information that is pertinent to identify the entity behind an account. 

   TWOX-NOTE: OK ― `AccountId` is a secure hash. 
 
### registrars(): `Vec<Option<PalletIdentityRegistrarInfo>>`
- **interface**: `api.query.identity.registrars`
- **summary**:    The set of registrars. Not expected to get very big as can only be added through a  special origin (likely a council motion). 

   The index into this can be cast to `RegistrarIndex` to get a valid value. 
 
### subsOf(`AccountId32`): `(u128,Vec<AccountId32>)`
- **interface**: `api.query.identity.subsOf`
- **summary**:    Alternative "sub" identities of this account. 

   The first item is the deposit, the second is a vector of the accounts. 

   TWOX-NOTE: OK ― `AccountId` is a secure hash. 
 
### superOf(`AccountId32`): `Option<(AccountId32,Data)>`
- **interface**: `api.query.identity.superOf`
- **summary**:    The super-identity of an alternative "sub" identity together with its name, within that  context. If the account is not some other account's sub-identity, then just `None`. 

___


## imOnline
 
### authoredBlocks(`u32, AccountId32`): `u32`
- **interface**: `api.query.imOnline.authoredBlocks`
- **summary**:    For each session index, we keep a mapping of `ValidatorId<T>` to the  number of blocks authored by the given authority. 
 
### heartbeatAfter(): `u32`
- **interface**: `api.query.imOnline.heartbeatAfter`
- **summary**:    The block number after which it's ok to send heartbeats in the current  session. 

   At the beginning of each session we set this to a value that should fall  roughly in the middle of the session duration. The idea is to first wait for  the validators to produce a block in the current session, so that the  heartbeat later on will not be necessary. 

   This value will only be used as a fallback if we fail to get a proper session  progress estimate from `NextSessionRotation`, as those estimates should be  more accurate then the value we calculate for `HeartbeatAfter`. 
 
### keys(): `Vec<PalletImOnlineSr25519AppSr25519Public>`
- **interface**: `api.query.imOnline.keys`
- **summary**:    The current set of keys that may issue a heartbeat. 
 
### receivedHeartbeats(`u32, u32`): `Option<WrapperOpaque<PalletImOnlineBoundedOpaqueNetworkState>>`
- **interface**: `api.query.imOnline.receivedHeartbeats`
- **summary**:    For each session index, we keep a mapping of `SessionIndex` and `AuthIndex` to  `WrapperOpaque<BoundedOpaqueNetworkState>`. 

___


## nft
 
### collectionName(`u32`): `Bytes`
- **interface**: `api.query.nft.collectionName`
- **summary**:    Map from collection to its human friendly name 
 
### collectionOwner(`u32`): `Option<AccountId32>`
- **interface**: `api.query.nft.collectionOwner`
- **summary**:    Map from collection to owner address 
 
### collectionRoyalties(`u32`): `Option<CrmlNftRoyaltiesSchedule>`
- **interface**: `api.query.nft.collectionRoyalties`
- **summary**:    Map from collection to its defacto royalty scheme 
 
### listingEndSchedule(`u32, u128`): `bool`
- **interface**: `api.query.nft.listingEndSchedule`
- **summary**:    Block numbers where listings will close. Value is `true` if at block number `listing_id` is scheduled to close. 
 
### listings(`u128`): `Option<CrmlNftListing>`
- **interface**: `api.query.nft.listings`
- **summary**:    NFT sale/auction listings keyed by collection id and token id 
 
### listingWinningBid(`u128`): `Option<(AccountId32,u128)>`
- **interface**: `api.query.nft.listingWinningBid`
- **summary**:    Winning bids on open listings. keyed by collection id and token id 
 
### nextCollectionId(): `u32`
- **interface**: `api.query.nft.nextCollectionId`
- **summary**:    The next available collection Id 
 
### nextListingId(): `u128`
- **interface**: `api.query.nft.nextListingId`
- **summary**:    The next available listing Id 
 
### nextMarketplaceId(): `u32`
- **interface**: `api.query.nft.nextMarketplaceId`
- **summary**:    The next available marketplace id 
 
### nextSerialNumber(`u32, u32`): `u32`
- **interface**: `api.query.nft.nextSerialNumber`
- **summary**:    The next available serial number in a given (collection, series) 
 
### nextSeriesId(`u32`): `u32`
- **interface**: `api.query.nft.nextSeriesId`
- **summary**:    The next group Id within an NFT collection  It is used as material to generate the global `TokenId` 
 
### openCollectionListings(`u32, u128`): `bool`
- **interface**: `api.query.nft.openCollectionListings`
- **summary**:    Map from collection to any open listings 
 
### registeredMarketplaces(`u32`): `CrmlNftMarketplace`
- **interface**: `api.query.nft.registeredMarketplaces`
- **summary**:    Map from marketplace account_id to royalties schedule 
 
### seriesAttributes(`u32, u32`): `Vec<CrmlNftNftAttributeValue>`
- **interface**: `api.query.nft.seriesAttributes`
- **summary**:    Map from (collection, series) to its attributes (deprecated) 
 
### seriesIssuance(`u32, u32`): `u32`
- **interface**: `api.query.nft.seriesIssuance`
- **summary**:    Map from a (collection, series) to its total issuance 
 
### seriesMetadataScheme(`u32, u32`): `Option<CrmlNftMetadataScheme>`
- **interface**: `api.query.nft.seriesMetadataScheme`
- **summary**:    Map from a token series to its metadata reference scheme 
 
### seriesMetadataURI(`u32, u32`): `Option<Bytes>`
- **interface**: `api.query.nft.seriesMetadataURI`
- **summary**:    DEPRECATED: Migrate to seriesMetadataScheme. Read-only for NFTs created in v46 
 
### seriesName(`(u32,u32)`): `Bytes`
- **interface**: `api.query.nft.seriesName`
- **summary**:    Map from series to its human friendly name 
 
### seriesRoyalties(`u32, u32`): `Option<CrmlNftRoyaltiesSchedule>`
- **interface**: `api.query.nft.seriesRoyalties`
- **summary**:    Map from (collection, series) to configured royalties schedule 
 
### storageVersion(): `u32`
- **interface**: `api.query.nft.storageVersion`
- **summary**:    Version of this module's storage schema 
 
### tokenBalance(`AccountId32`): `BTreeMap<(u32,u32), u32>`
- **interface**: `api.query.nft.tokenBalance`
- **summary**:    Count of tokens owned by an address, supports ERC721 `balanceOf` 
 
### tokenLocks(`(u32,u32,u32)`): `Option<CrmlNftTokenLockReason>`
- **interface**: `api.query.nft.tokenLocks`
- **summary**:    Map from a token to lock status if any 
 
### tokenOwner(`(u32,u32), u32`): `AccountId32`
- **interface**: `api.query.nft.tokenOwner`
- **summary**:    Map from a token to its owner  The token Id is split in this map to allow better indexing (collection, series) + (serial number) 

___


## offences
 
### concurrentReportsIndex(`[u8;16], Bytes`): `Vec<H256>`
- **interface**: `api.query.offences.concurrentReportsIndex`
- **summary**:    A vector of reports of the same kind that happened at the same time slot. 
 
### reports(`H256`): `Option<SpStakingOffenceOffenceDetails>`
- **interface**: `api.query.offences.reports`
- **summary**:    The primary structure that holds all offence records keyed by report identifiers. 
 
### reportsByKindIndex(`[u8;16]`): `Bytes`
- **interface**: `api.query.offences.reportsByKindIndex`
- **summary**:    Enumerates all reports of a kind along with the time they happened. 

   All reports are sorted by the time of offence. 

   Note that the actual type of this mapping is `Vec<u8>`, this is because values of  different types are not supported at the moment so we are doing the manual serialization. 

___


## rewards
 
### baseInflationRate(): `u128`
- **interface**: `api.query.rewards.baseInflationRate`
- **summary**:    Inflation rate % to apply on reward payouts 
 
### currentEraRewardPoints(): `CrmlStakingRewardsTypesEraRewardPoints`
- **interface**: `api.query.rewards.currentEraRewardPoints`
- **summary**:    Authorship rewards for the current active era. 
 
### developmentFundTake(): `Perbill`
- **interface**: `api.query.rewards.developmentFundTake`
- **summary**:    Development fund % take for reward payouts, parts-per-billion 
 
### fiscalEraEpoch(): `u32`
- **interface**: `api.query.rewards.fiscalEraEpoch`
- **summary**:    The staking era index that specifies the start of a fiscal era based on which  we can calculate the start of other fiscal eras. This is either 0 or forced by SUDO to  another value. Have a look at force_new_fiscal_era for more info. 
 
### forceFiscalEra(): `bool`
- **interface**: `api.query.rewards.forceFiscalEra`
- **summary**:    When true the next staking era will become the start of a new fiscal era. 
 
### payee(`AccountId32`): `AccountId32`
- **interface**: `api.query.rewards.payee`
- **summary**:    Where the reward payment should be made. Keyed by stash. 
 
### scheduledPayoutEra(): `u32`
- **interface**: `api.query.rewards.scheduledPayoutEra`
- **summary**:    The era index for current payouts 
 
### scheduledPayouts(`u32`): `Option<(AccountId32,u128)>`
- **interface**: `api.query.rewards.scheduledPayouts`
- **summary**:    Upcoming reward payouts scheduled for block number to a validator and it's stakers of amount earned in era 
 
### targetInflationPerStakingEra(): `u128`
- **interface**: `api.query.rewards.targetInflationPerStakingEra`
- **summary**:    The amount of new reward tokens that will be minted on every staking era in order to  approximate the inflation rate. We calculate the target inflation based on  T::CurrencyToReward::TotalIssuance() at the beginning of a fiscal era. 
 
### transactionFeePot(): `u128`
- **interface**: `api.query.rewards.transactionFeePot`
- **summary**:    Accumulated transaction fees for reward payout 
 
### transactionFeePotHistory(): `Vec<u128>`
- **interface**: `api.query.rewards.transactionFeePotHistory`
- **summary**:    Historic accumulated transaction fees on reward payout 

___


## scheduler
 
### agenda(`u32`): `Vec<Option<PalletSchedulerScheduledV2>>`
- **interface**: `api.query.scheduler.agenda`
- **summary**:    Items to be executed, indexed by the block number that they should be executed on. 
 
### lookup(`Bytes`): `Option<(u32,u32)>`
- **interface**: `api.query.scheduler.lookup`
- **summary**:    Lookup from identity to the block number and index of the task. 
 
### storageVersion(): `PalletSchedulerReleases`
- **interface**: `api.query.scheduler.storageVersion`
- **summary**:    Storage version of the pallet. 

   New networks start with last version. 

___


## session
 
### currentIndex(): `u32`
- **interface**: `api.query.session.currentIndex`
- **summary**:    Current index of the session. 
 
### disabledValidators(): `Vec<u32>`
- **interface**: `api.query.session.disabledValidators`
- **summary**:    Indices of disabled validators. 

   The vec is always kept sorted so that we can find whether a given validator is  disabled using binary search. It gets cleared when `on_session_ending` returns  a new set of identities. 
 
### keyOwner(`(SpCoreCryptoKeyTypeId,Bytes)`): `Option<AccountId32>`
- **interface**: `api.query.session.keyOwner`
- **summary**:    The owner of a key. The key is the `KeyTypeId` + the encoded key. 
 
### nextKeys(`AccountId32`): `Option<CennznetRuntimeSessionKeys>`
- **interface**: `api.query.session.nextKeys`
- **summary**:    The next session keys for a validator. 
 
### queuedChanged(): `bool`
- **interface**: `api.query.session.queuedChanged`
- **summary**:    True if the underlying economic identities or weighting behind the validators  has changed in the queued validator set. 
 
### queuedKeys(): `Vec<(AccountId32,CennznetRuntimeSessionKeys)>`
- **interface**: `api.query.session.queuedKeys`
- **summary**:    The queued keys for the next session. When the next session begins, these keys  will be used to determine the validator's session keys. 
 
### validators(): `Vec<AccountId32>`
- **interface**: `api.query.session.validators`
- **summary**:    The current set of validators. 

___


## staking
 
### activeEra(): `Option<CrmlStakingActiveEraInfo>`
- **interface**: `api.query.staking.activeEra`
- **summary**:    The active era information, it holds index and start. 

   The active era is the era currently rewarded.  Validator set of this era must be equal to `SessionInterface::validators`. 
 
### bonded(`AccountId32`): `Option<AccountId32>`
- **interface**: `api.query.staking.bonded`
- **summary**:    Map from all locked "stash" accounts to the controller account. 
 
### bondedEras(): `Vec<(u32,u32)>`
- **interface**: `api.query.staking.bondedEras`
- **summary**:    A mapping from still-bonded eras to the first session index of that era. 

   Must contains information for eras for the range:  `[active_era - bounding_duration; active_era]` 
 
### currentEra(): `Option<u32>`
- **interface**: `api.query.staking.currentEra`
- **summary**:    The current era index. 
 
### deferredOffences(): `Vec<(Vec<SpStakingOffenceOffenceDetails>,Vec<Perbill>,u32)>`
- **interface**: `api.query.staking.deferredOffences`
- **summary**:    Deferred reports that have been rejected by the offence handler and need to be submitted  at a later time. 
 
### earliestUnappliedSlash(): `Option<u32>`
- **interface**: `api.query.staking.earliestUnappliedSlash`
- **summary**:    The earliest era for which we have a pending, unapplied slash. 
 
### eraElectionStatus(): `CrmlStakingElectionStatus`
- **interface**: `api.query.staking.eraElectionStatus`
- **summary**:    Flag to control the execution of the offchain election. When `Open(_)`, we accept  solutions to be submitted. 
 
### erasStakers(`u32, AccountId32`): `CrmlStakingExposure`
- **interface**: `api.query.staking.erasStakers`
- **summary**:    Exposure of validator at era. 

   This is keyed first by the era index to allow bulk deletion and then the stash account. 

   Is it removed after `HISTORY_DEPTH` eras.  If stakers hasn't been set or has been removed then empty exposure is returned. 
 
### erasStakersClipped(`u32, AccountId32`): `CrmlStakingExposure`
- **interface**: `api.query.staking.erasStakersClipped`
- **summary**:    Clipped Exposure of validator at era. 

   This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the  `T::MaxNominatorRewardedPerValidator` biggest stakers.  (Note: the field `total` and `own` of the exposure remains unchanged).  This is used to limit the i/o cost for the nominator payout. 

   This is keyed fist by the era index to allow bulk deletion and then the stash account. 

   Is it removed after `HISTORY_DEPTH` eras.  If stakers hasn't been set or has been removed then empty exposure is returned. 
 
### erasStartSessionIndex(`u32`): `Option<u32>`
- **interface**: `api.query.staking.erasStartSessionIndex`
- **summary**:    The session index at which the era start for the last `HISTORY_DEPTH` eras. 
 
### erasTotalStake(`u32`): `u128`
- **interface**: `api.query.staking.erasTotalStake`
- **summary**:    The total amount staked for the last `HISTORY_DEPTH` eras.  If total hasn't been set or has been removed then 0 stake is returned. 
 
### erasValidatorPrefs(`u32, AccountId32`): `CrmlStakingValidatorPrefs`
- **interface**: `api.query.staking.erasValidatorPrefs`
- **summary**:    Similar to `ErasStakers`, this holds the preferences of validators. 

   This is keyed first by the era index to allow bulk deletion and then the stash account. 

   Is it removed after `HISTORY_DEPTH` eras. 
 
### forceEra(): `CrmlStakingForcing`
- **interface**: `api.query.staking.forceEra`
- **summary**:    True if the next session change will be a new era regardless of index. 
 
### historyDepth(): `u32`
- **interface**: `api.query.staking.historyDepth`
- **summary**:    Number of eras to keep in history. 

   Information is kept for eras in `[current_era - history_depth; current_era]`. 

   Must be more than the number of eras delayed by session otherwise. I.e. active era must  always be in history. I.e. `active_era > current_era - history_depth` must be  guaranteed. 
 
### invulnerables(): `Vec<AccountId32>`
- **interface**: `api.query.staking.invulnerables`
- **summary**:    Any validators that may never be slashed or forcibly kicked. It's a Vec since they're  easy to initialize and the performance hit is minimal (we expect no more than four  invulnerables) and restricted to testnets. 
 
### isActiveSessionFinal(): `bool`
- **interface**: `api.query.staking.isActiveSessionFinal`
- **summary**:    NOTE:!! this is poorly named.  True if the _active_ session (session_index) is final (last in the era). Note that this does not take era  forcing into accoun 
 
### isCurrentSessionFinal(): `bool`
- **interface**: `api.query.staking.isCurrentSessionFinal`
- **summary**:    NOTE:!! this is poorly named.  True if the **planned** session (session_index + 1) is final (last in the era). Note that this does not take era  forcing into account 
 
### ledger(`AccountId32`): `Option<CrmlStakingStakingLedger>`
- **interface**: `api.query.staking.ledger`
- **summary**:    Map from all (unlocked) "controller" accounts to the info regarding the staking. 
 
### minimumBond(): `u128`
- **interface**: `api.query.staking.minimumBond`
- **summary**:    Minimum amount to bond. 
 
### minimumValidatorCount(): `u32`
- **interface**: `api.query.staking.minimumValidatorCount`
- **summary**:    Minimum number of staking participants before emergency conditions are imposed. 
 
### nominators(`AccountId32`): `Option<CrmlStakingNominations>`
- **interface**: `api.query.staking.nominators`
- **summary**:    The map from nominator stash key to the set of stash keys of all validators to nominate. 
 
### nominatorSlashInEra(`u32, AccountId32`): `Option<u128>`
- **interface**: `api.query.staking.nominatorSlashInEra`
- **summary**:    All slashing events on nominators, mapped by era to the highest slash value of the era. 
 
### offendingValidators(): `Vec<(u32,bool)>`
- **interface**: `api.query.staking.offendingValidators`
- **summary**:    Indices of validators that have offended in the active era and whether they are currently  disabled. 

   This value should be a superset of disabled validators since not all offences lead to the  validator being disabled (if there was no slash). This is needed to track the percentage of  validators that have offended in the current era, ensuring a new era is forced if  `OffendingValidatorsThreshold` is reached. The vec is always kept sorted so that we can find  whether a given validator has previously offended using binary search. It gets cleared when  the era ends. 
 
### queuedElected(): `Option<CrmlStakingElectionResult>`
- **interface**: `api.query.staking.queuedElected`
- **summary**:    The next validator set. At the end of an era, if this is available (potentially from the  result of an offchain worker), it is immediately used. Otherwise, the on-chain election  is executed. 
 
### queuedScore(): `Option<[u128;3]>`
- **interface**: `api.query.staking.queuedScore`
- **summary**:    The score of the current [`QueuedElected`]. 
 
### slashingSpans(`AccountId32`): `Option<CrmlStakingSlashingSlashingSpans>`
- **interface**: `api.query.staking.slashingSpans`
- **summary**:    Slashing spans for stash accounts. 
 
### slashRewardFraction(): `Perbill`
- **interface**: `api.query.staking.slashRewardFraction`
- **summary**:    The percentage of the slash that is distributed to reporters. 

   The rest of the slashed value is handled by the `Slash`. 
 
### snapshotNominators(): `Option<Vec<AccountId32>>`
- **interface**: `api.query.staking.snapshotNominators`
- **summary**:    Snapshot of nominators at the beginning of the current election window. This should only  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`. 
 
### snapshotValidators(): `Option<Vec<AccountId32>>`
- **interface**: `api.query.staking.snapshotValidators`
- **summary**:    Snapshot of validators at the beginning of the current election window. This should only  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`. 
 
### spanSlash(`(AccountId32,u32)`): `CrmlStakingSlashingSpanRecord`
- **interface**: `api.query.staking.spanSlash`
- **summary**:    Records information about the maximum slash of a stash within a slashing span,  as well as how much reward has been paid out. 
 
### storageVersion(): `u32`
- **interface**: `api.query.staking.storageVersion`
- **summary**:    True if network has been upgraded to this version.  Storage version of the pallet. 

   This is set to v2 for new networks. 
 
### unappliedSlashes(`u32`): `Vec<CrmlStakingUnappliedSlash>`
- **interface**: `api.query.staking.unappliedSlashes`
- **summary**:    All unapplied slashes that are queued for later. 
 
### validatorCount(): `u32`
- **interface**: `api.query.staking.validatorCount`
- **summary**:    The ideal number of staking participants. 
 
### validators(`AccountId32`): `CrmlStakingValidatorPrefs`
- **interface**: `api.query.staking.validators`
- **summary**:    The map from (wannabe) validator stash key to the preferences of that validator. 
 
### validatorSlashInEra(`u32, AccountId32`): `Option<(Perbill,u128)>`
- **interface**: `api.query.staking.validatorSlashInEra`
- **summary**:    All slashing events on validators, mapped by era to the highest slash proportion  and slash value of the era. 
 
### wasEndEraForced(): `bool`
- **interface**: `api.query.staking.wasEndEraForced`
- **summary**:    Same as `will_era_be_forced()` but persists to `end_era` 

___


## sudo
 
### key(): `AccountId32`
- **interface**: `api.query.sudo.key`
- **summary**:    The `AccountId` of the sudo key. 

___


## system
 
### account(`AccountId32`): `FrameSystemAccountInfo`
- **interface**: `api.query.system.account`
- **summary**:    The full account information for a particular account ID. 
 
### allExtrinsicsLen(): `Option<u32>`
- **interface**: `api.query.system.allExtrinsicsLen`
- **summary**:    Total length (in bytes) for all extrinsics put together, for the current block. 
 
### blockHash(`u32`): `H256`
- **interface**: `api.query.system.blockHash`
- **summary**:    Map of block numbers to block hashes. 
 
### blockWeight(): `FrameSupportWeightsPerDispatchClassU64`
- **interface**: `api.query.system.blockWeight`
- **summary**:    The current weight for the block. 
 
### digest(): `SpRuntimeDigest`
- **interface**: `api.query.system.digest`
- **summary**:    Digest of the current block, also part of the block header. 
 
### eventCount(): `u32`
- **interface**: `api.query.system.eventCount`
- **summary**:    The number of events in the `Events<T>` list. 
 
### events(): `Vec<FrameSystemEventRecord>`
- **interface**: `api.query.system.events`
- **summary**:    Events deposited for the current block. 

   NOTE: This storage item is explicitly unbounded since it is never intended to be read  from within the runtime. 
 
### eventTopics(`H256`): `Vec<(u32,u32)>`
- **interface**: `api.query.system.eventTopics`
- **summary**:    Mapping between a topic (represented by T::Hash) and a vector of indexes  of events in the `<Events<T>>` list. 

   All topic vectors have deterministic storage locations depending on the topic. This  allows light-clients to leverage the changes trie storage tracking mechanism and  in case of changes fetch the list of events of interest. 

   The value has the type `(T::BlockNumber, EventIndex)` because if we used only just  the `EventIndex` then in case if the topic has the same contents on the next block  no notification will be triggered thus the event might be lost. 
 
### executionPhase(): `Option<FrameSystemPhase>`
- **interface**: `api.query.system.executionPhase`
- **summary**:    The execution phase of the block. 
 
### extrinsicCount(): `Option<u32>`
- **interface**: `api.query.system.extrinsicCount`
- **summary**:    Total extrinsics count for the current block. 
 
### extrinsicData(`u32`): `Bytes`
- **interface**: `api.query.system.extrinsicData`
- **summary**:    Extrinsics data for the current block (maps an extrinsic's index to its data). 
 
### lastRuntimeUpgrade(): `Option<FrameSystemLastRuntimeUpgradeInfo>`
- **interface**: `api.query.system.lastRuntimeUpgrade`
- **summary**:    Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened. 
 
### number(): `u32`
- **interface**: `api.query.system.number`
- **summary**:    The current block number being processed. Set by `execute_block`. 
 
### parentHash(): `H256`
- **interface**: `api.query.system.parentHash`
- **summary**:    Hash of the previous block. 
 
### upgradedToTripleRefCount(): `bool`
- **interface**: `api.query.system.upgradedToTripleRefCount`
- **summary**:    True if we have upgraded so that AccountInfo contains three types of `RefCount`. False  (default) if not. 
 
### upgradedToU32RefCount(): `bool`
- **interface**: `api.query.system.upgradedToU32RefCount`
- **summary**:    True if we have upgraded so that `type RefCount` is `u32`. False (default) if not. 

___


## timestamp
 
### didUpdate(): `bool`
- **interface**: `api.query.timestamp.didUpdate`
- **summary**:    Did the timestamp get updated in this block? 
 
### now(): `u64`
- **interface**: `api.query.timestamp.now`
- **summary**:    Current time for the current block. 

___


## tokenApprovals
 
### eRC20Approvals(`(H160,u32), H160`): `u128`
- **interface**: `api.query.tokenApprovals.eRC20Approvals`
 
### eRC721Approvals(`(u32,u32,u32)`): `H160`
- **interface**: `api.query.tokenApprovals.eRC721Approvals`
 
### eRC721ApprovalsForAll(`H160, (u32,u32)`): `Vec<H160>`
- **interface**: `api.query.tokenApprovals.eRC721ApprovalsForAll`

___


## transactionPayment
 
### nextFeeMultiplier(): `u128`
- **interface**: `api.query.transactionPayment.nextFeeMultiplier`
 
### storageVersion(): `CrmlTransactionPaymentReleases`
- **interface**: `api.query.transactionPayment.storageVersion`

___


## treasury
 
### approvals(): `Vec<u32>`
- **interface**: `api.query.treasury.approvals`
- **summary**:    Proposal indices that have been approved but not yet awarded. 
 
### proposalCount(): `u32`
- **interface**: `api.query.treasury.proposalCount`
- **summary**:    Number of proposals that have been made. 
 
### proposals(`u32`): `Option<PalletTreasuryProposal>`
- **interface**: `api.query.treasury.proposals`
- **summary**:    Proposals that have been made. 

___


## undefined
