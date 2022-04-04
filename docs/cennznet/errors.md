---
title: Errors
---

This page lists the errors that can be encountered in the different modules. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[authorship](#authorship)**

- **[babe](#babe)**

- **[cennzx](#cennzx)**

- **[ethereum](#ethereum)**

- **[ethWallet](#ethwallet)**

- **[eVM](#evm)**

- **[genericAsset](#genericasset)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[nft](#nft)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[system](#system)**

- **[treasury](#treasury)**

- **[utility](#utility)**


___


## authorship
 
### GenesisUncle
- **interface**: `api.errors.authorship.GenesisUncle`
- **summary**:   The uncle is genesis. 
 
### InvalidUncleParent
- **interface**: `api.errors.authorship.InvalidUncleParent`
- **summary**:   The uncle parent not in the chain. 
 
### OldUncle
- **interface**: `api.errors.authorship.OldUncle`
- **summary**:   The uncle isn't recent enough to be included. 
 
### TooHighUncle
- **interface**: `api.errors.authorship.TooHighUncle`
- **summary**:   The uncle is too high in chain. 
 
### TooManyUncles
- **interface**: `api.errors.authorship.TooManyUncles`
- **summary**:   Too many uncles. 
 
### UncleAlreadyIncluded
- **interface**: `api.errors.authorship.UncleAlreadyIncluded`
- **summary**:   The uncle is already included. 
 
### UnclesAlreadySet
- **interface**: `api.errors.authorship.UnclesAlreadySet`
- **summary**:   Uncles already set in the block. 

___


## babe
 
### DuplicateOffenceReport
- **interface**: `api.errors.babe.DuplicateOffenceReport`
- **summary**:   A given equivocation report is valid but already previously reported. 
 
### InvalidEquivocationProof
- **interface**: `api.errors.babe.InvalidEquivocationProof`
- **summary**:   An equivocation proof provided as part of an equivocation report is invalid. 
 
### InvalidKeyOwnershipProof
- **interface**: `api.errors.babe.InvalidKeyOwnershipProof`
- **summary**:   A key ownership proof provided as part of an equivocation report is invalid. 

___


## cennzx
 
### AssetCannotSwapForItself
- **interface**: `api.errors.cennzx.AssetCannotSwapForItself`
 
### CannotAddLiquidityWithZero
- **interface**: `api.errors.cennzx.CannotAddLiquidityWithZero`
 
### CannotTradeZero
- **interface**: `api.errors.cennzx.CannotTradeZero`
 
### DivideByZero
- **interface**: `api.errors.cennzx.DivideByZero`
 
### EmptyExchangePool
- **interface**: `api.errors.cennzx.EmptyExchangePool`
 
### InsufficientBalance
- **interface**: `api.errors.cennzx.InsufficientBalance`
 
### InsufficientCoreAssetBalance
- **interface**: `api.errors.cennzx.InsufficientCoreAssetBalance`
 
### InsufficientExchangePoolReserve
- **interface**: `api.errors.cennzx.InsufficientExchangePoolReserve`
 
### InsufficientLiquidity
- **interface**: `api.errors.cennzx.InsufficientLiquidity`
 
### InsufficientTradeAssetBalance
- **interface**: `api.errors.cennzx.InsufficientTradeAssetBalance`
 
### InvalidAssetId
- **interface**: `api.errors.cennzx.InvalidAssetId`
 
### MaximumSellRequirementNotMet
- **interface**: `api.errors.cennzx.MaximumSellRequirementNotMet`
 
### MaximumTradeAssetRequirementNotMet
- **interface**: `api.errors.cennzx.MaximumTradeAssetRequirementNotMet`
 
### MinimumBuyRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumBuyRequirementNotMet`
 
### MinimumCoreAssetRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumCoreAssetRequirementNotMet`
 
### MinimumLiquidityRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumLiquidityRequirementNotMet`
 
### MinimumTradeAssetRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumTradeAssetRequirementNotMet`
 
### Overflow
- **interface**: `api.errors.cennzx.Overflow`

___


## ethereum
 
### InvalidSignature
- **interface**: `api.errors.ethereum.InvalidSignature`
- **summary**:   Signature is invalid. 
 
### PreLogExists
- **interface**: `api.errors.ethereum.PreLogExists`
- **summary**:   Pre-log is present, therefore transact is not allowed. 

___


## ethWallet
 
### CantPay
- **interface**: `api.errors.ethWallet.CantPay`
- **summary**:   Can't pay fees 
 
### InvalidSignature
- **interface**: `api.errors.ethWallet.InvalidSignature`
- **summary**:   Signature & account mismatched. 

___


## eVM
 
### BalanceLow
- **interface**: `api.errors.evm.BalanceLow`
- **summary**:   Not enough balance to perform action 
 
### FeeOverflow
- **interface**: `api.errors.evm.FeeOverflow`
- **summary**:   Calculating total fee overflowed 
 
### GasPriceTooLow
- **interface**: `api.errors.evm.GasPriceTooLow`
- **summary**:   Gas price is too low. 
 
### InvalidNonce
- **interface**: `api.errors.evm.InvalidNonce`
- **summary**:   Nonce is invalid 
 
### PaymentOverflow
- **interface**: `api.errors.evm.PaymentOverflow`
- **summary**:   Calculating total payment overflowed 
 
### WithdrawFailed
- **interface**: `api.errors.evm.WithdrawFailed`
- **summary**:   Withdraw fee failed 

___


## genericAsset
 
### AccountIdNotExist
- **interface**: `api.errors.genericAsset.AccountIdNotExist`
- **summary**:   There is no such account id in the storage. 
 
### AssetIdExhausted
- **interface**: `api.errors.genericAsset.AssetIdExhausted`
- **summary**:   No new assets id available. 
 
### AssetIdExists
- **interface**: `api.errors.genericAsset.AssetIdExists`
- **summary**:   Asset id is already taken. 
 
### AssetIdNotExist
- **interface**: `api.errors.genericAsset.AssetIdNotExist`
- **summary**:   Failure due to asset id not existing on chain 
 
### DecimalTooLarge
- **interface**: `api.errors.genericAsset.DecimalTooLarge`
- **summary**:   The integer for decimal places is too large for conversion into u128. 
 
### FreeBurningUnderflow
- **interface**: `api.errors.genericAsset.FreeBurningUnderflow`
- **summary**:   Free balance got underflowed after burning. 
 
### FreeMintingOverflow
- **interface**: `api.errors.genericAsset.FreeMintingOverflow`
- **summary**:   Free balance got overflowed after minting. 
 
### InitialIssuanceTooLarge
- **interface**: `api.errors.genericAsset.InitialIssuanceTooLarge`
- **summary**:   The integer for initial issuance is too large for conversion into u128. 
 
### InsufficientBalance
- **interface**: `api.errors.genericAsset.InsufficientBalance`
- **summary**:   The balance is too low to send amount. 
 
### LiquidityRestrictions
- **interface**: `api.errors.genericAsset.LiquidityRestrictions`
- **summary**:   The account liquidity restrictions prevent withdrawal. 
 
### NoBurnPermission
- **interface**: `api.errors.genericAsset.NoBurnPermission`
- **summary**:   The origin does not have permission to burn an asset. 
 
### NoMintPermission
- **interface**: `api.errors.genericAsset.NoMintPermission`
- **summary**:   The origin does not have permission to mint an asset. 
 
### NoUpdatePermission
- **interface**: `api.errors.genericAsset.NoUpdatePermission`
- **summary**:   The origin does not have enough permission to update permissions. 
 
### TotalBurningUnderflow
- **interface**: `api.errors.genericAsset.TotalBurningUnderflow`
- **summary**:   Total issuance got underflowed after burning. 
 
### TotalMintingOverflow
- **interface**: `api.errors.genericAsset.TotalMintingOverflow`
- **summary**:   Total issuance got overflowed after minting. 
 
### TransferOverflow
- **interface**: `api.errors.genericAsset.TransferOverflow`
- **summary**:   The transfer will cause the account to overflow 
 
### ZeroAmount
- **interface**: `api.errors.genericAsset.ZeroAmount`
- **summary**:   Cannot transfer zero amount. 
 
### ZeroExistentialDeposit
- **interface**: `api.errors.genericAsset.ZeroExistentialDeposit`
- **summary**:   Existential deposit for assets should always be greater than zero. 

___


## grandpa
 
### ChangePending
- **interface**: `api.errors.grandpa.ChangePending`
- **summary**:   Attempt to signal GRANDPA change with one already pending. 
 
### DuplicateOffenceReport
- **interface**: `api.errors.grandpa.DuplicateOffenceReport`
- **summary**:   A given equivocation report is valid but already previously reported. 
 
### InvalidEquivocationProof
- **interface**: `api.errors.grandpa.InvalidEquivocationProof`
- **summary**:   An equivocation proof provided as part of an equivocation report is invalid. 
 
### InvalidKeyOwnershipProof
- **interface**: `api.errors.grandpa.InvalidKeyOwnershipProof`
- **summary**:   A key ownership proof provided as part of an equivocation report is invalid. 
 
### PauseFailed
- **interface**: `api.errors.grandpa.PauseFailed`
- **summary**:   Attempt to signal GRANDPA pause when the authority set isn't live (either paused or already pending pause). 
 
### ResumeFailed
- **interface**: `api.errors.grandpa.ResumeFailed`
- **summary**:   Attempt to signal GRANDPA resume when the authority set isn't paused (either live or already pending resume). 
 
### TooSoon
- **interface**: `api.errors.grandpa.TooSoon`
- **summary**:   Cannot signal forced change so soon after last. 

___


## identity
 
### AlreadyClaimed
- **interface**: `api.errors.identity.AlreadyClaimed`
- **summary**:   Account ID is already named. 
 
### EmptyIndex
- **interface**: `api.errors.identity.EmptyIndex`
- **summary**:   Empty index. 
 
### FeeChanged
- **interface**: `api.errors.identity.FeeChanged`
- **summary**:   Fee is changed. 
 
### InvalidIndex
- **interface**: `api.errors.identity.InvalidIndex`
- **summary**:   The index is invalid. 
 
### InvalidJudgement
- **interface**: `api.errors.identity.InvalidJudgement`
- **summary**:   Invalid judgement. 
 
### InvalidTarget
- **interface**: `api.errors.identity.InvalidTarget`
- **summary**:   The target is invalid. 
 
### JudgementGiven
- **interface**: `api.errors.identity.JudgementGiven`
- **summary**:   Judgement given. 
 
### NoIdentity
- **interface**: `api.errors.identity.NoIdentity`
- **summary**:   No identity found. 
 
### NotFound
- **interface**: `api.errors.identity.NotFound`
- **summary**:   Account isn't found. 
 
### NotNamed
- **interface**: `api.errors.identity.NotNamed`
- **summary**:   Account isn't named. 
 
### NotOwned
- **interface**: `api.errors.identity.NotOwned`
- **summary**:   Sub-account isn't owned by sender. 
 
### NotSub
- **interface**: `api.errors.identity.NotSub`
- **summary**:   Sender is not a sub-account. 
 
### StickyJudgement
- **interface**: `api.errors.identity.StickyJudgement`
- **summary**:   Sticky judgement. 
 
### SubNotEnabled
- **interface**: `api.errors.identity.SubNotEnabled`
- **summary**:   Sub-accounts not enabled 
 
### TooManyFields
- **interface**: `api.errors.identity.TooManyFields`
- **summary**:   Too many additional fields. 
 
### TooManyRegistrars
- **interface**: `api.errors.identity.TooManyRegistrars`
- **summary**:   Maximum amount of registrars reached. Cannot add any more. 
 
### TooManySubAccounts
- **interface**: `api.errors.identity.TooManySubAccounts`
- **summary**:   Too many subs-accounts. 

___


## imOnline
 
### DuplicatedHeartbeat
- **interface**: `api.errors.imOnline.DuplicatedHeartbeat`
- **summary**:   Duplicated heartbeat. 
 
### InvalidKey
- **interface**: `api.errors.imOnline.InvalidKey`
- **summary**:   Non existent public key. 

___


## nft
 
### BidTooLow
- **interface**: `api.errors.nft.BidTooLow`
- **summary**:   Auction bid was lower than reserve or current highest bid 
 
### CollectionIdExists
- **interface**: `api.errors.nft.CollectionIdExists`
- **summary**:   A collection with the same ID already exists 
 
### CollectionNameInvalid
- **interface**: `api.errors.nft.CollectionNameInvalid`
- **summary**:   Given collection name is invalid (invalid utf-8, too long, empty) 
 
### InternalPayment
- **interface**: `api.errors.nft.InternalPayment`
- **summary**:   Internal error during payment 
 
### InvalidMetadataPath
- **interface**: `api.errors.nft.InvalidMetadataPath`
- **summary**:   The metadata path is invalid (non-utf8 or empty) 
 
### MarketplaceNotRegistered
- **interface**: `api.errors.nft.MarketplaceNotRegistered`
- **summary**:   The account_id hasn't been registered as a marketplace 
 
### MaxAttributeLength
- **interface**: `api.errors.nft.MaxAttributeLength`
- **summary**:   Given attribute value is larger than the configured max. 
 
### MixedBundleSale
- **interface**: `api.errors.nft.MixedBundleSale`
- **summary**:   Selling tokens from different collections is not allowed 
 
### NameAlreadySet
- **interface**: `api.errors.nft.NameAlreadySet`
- **summary**:   The Series name has been set 
 
### NoAvailableIds
- **interface**: `api.errors.nft.NoAvailableIds`
- **summary**:   No more Ids are available, they've been exhausted 
 
### NoCollection
- **interface**: `api.errors.nft.NoCollection`
- **summary**:   The NFT collection does not exist 
 
### NoPermission
- **interface**: `api.errors.nft.NoPermission`
- **summary**:   origin does not have permission for the operation (the token may not exist) 
 
### NoSeries
- **interface**: `api.errors.nft.NoSeries`
- **summary**:   The series does not exist 
 
### NotForAuction
- **interface**: `api.errors.nft.NotForAuction`
- **summary**:   The token is not listed for auction sale 
 
### NotForFixedPriceSale
- **interface**: `api.errors.nft.NotForFixedPriceSale`
- **summary**:   The token is not listed for fixed price sale 
 
### NoToken
- **interface**: `api.errors.nft.NoToken`
- **summary**:   The token does not exist 
 
### RoyaltiesInvalid
- **interface**: `api.errors.nft.RoyaltiesInvalid`
- **summary**:   Total royalties would exceed 100% of sale or an empty vec is supplied 
 
### RoyaltiesProtection
- **interface**: `api.errors.nft.RoyaltiesProtection`
- **summary**:   Tokens with different individual royalties cannot be sold together 
 
### SchemaMaxAttributes
- **interface**: `api.errors.nft.SchemaMaxAttributes`
- **summary**:   Too many attributes in the provided schema or data 
 
### TokenListingProtection
- **interface**: `api.errors.nft.TokenListingProtection`
- **summary**:   Cannot operate on a listed NFT 

___


## scheduler
 
### FailedToSchedule
- **interface**: `api.errors.scheduler.FailedToSchedule`
- **summary**:   Failed to schedule a call 
 
### NotFound
- **interface**: `api.errors.scheduler.NotFound`
- **summary**:   Cannot find the scheduled call. 
 
### RescheduleNoChange
- **interface**: `api.errors.scheduler.RescheduleNoChange`
- **summary**:   Reschedule failed because it does not change scheduled time. 
 
### TargetBlockNumberInPast
- **interface**: `api.errors.scheduler.TargetBlockNumberInPast`
- **summary**:   Given target block number is in the past. 

___


## session
 
### DuplicatedKey
- **interface**: `api.errors.session.DuplicatedKey`
- **summary**:   Registered duplicate key. 
 
### InvalidProof
- **interface**: `api.errors.session.InvalidProof`
- **summary**:   Invalid ownership proof. 
 
### NoAccount
- **interface**: `api.errors.session.NoAccount`
- **summary**:   Key setting account is not live, so it's impossible to associate keys. 
 
### NoAssociatedValidatorId
- **interface**: `api.errors.session.NoAssociatedValidatorId`
- **summary**:   No associated validator ID for account. 
 
### NoKeys
- **interface**: `api.errors.session.NoKeys`
- **summary**:   No keys are associated with this account. 

___


## staking
 
### AlreadyBonded
- **interface**: `api.errors.staking.AlreadyBonded`
- **summary**:   Stash is already bonded. 
 
### AlreadyPaired
- **interface**: `api.errors.staking.AlreadyPaired`
- **summary**:   Controller is already paired. 
 
### CallNotAllowed
- **interface**: `api.errors.staking.CallNotAllowed`
- **summary**:   The call is not allowed at the given time due to restrictions of election period. 
 
### DuplicateNominee
- **interface**: `api.errors.staking.DuplicateNominee`
- **summary**:   Cannot nominate the same account multiple times 
 
### EmptyTargets
- **interface**: `api.errors.staking.EmptyTargets`
- **summary**:   Targets cannot be empty. 
 
### FundedTarget
- **interface**: `api.errors.staking.FundedTarget`
- **summary**:   Attempting to target a stash that still has funds. 
 
### IncorrectHistoryDepth
- **interface**: `api.errors.staking.IncorrectHistoryDepth`
- **summary**:   Incorrect previous history depth input provided. 
 
### IncorrectSlashingSpans
- **interface**: `api.errors.staking.IncorrectSlashingSpans`
- **summary**:   Incorrect number of slashing spans provided. 
 
### InsufficientBond
- **interface**: `api.errors.staking.InsufficientBond`
- **summary**:   Can not bond with value less than minimum balance. 
 
### InsufficientFreeBalance
- **interface**: `api.errors.staking.InsufficientFreeBalance`
- **summary**:   User does not have enough free balance to bond this amount 
 
### InvalidSlashIndex
- **interface**: `api.errors.staking.InvalidSlashIndex`
- **summary**:   Slash record index out of bounds. 
 
### NoMoreChunks
- **interface**: `api.errors.staking.NoMoreChunks`
- **summary**:   Can not schedule more unlock chunks. 
 
### NotController
- **interface**: `api.errors.staking.NotController`
- **summary**:   Not a controller account. 
 
### NotSortedAndUnique
- **interface**: `api.errors.staking.NotSortedAndUnique`
- **summary**:   Items are not sorted and unique. 
 
### NotStash
- **interface**: `api.errors.staking.NotStash`
- **summary**:   Not a stash account. 
 
### NoUnlockChunk
- **interface**: `api.errors.staking.NoUnlockChunk`
- **summary**:   Can not rebond without unlocking chunks. 
 
### OffchainElectionBogusCompact
- **interface**: `api.errors.staking.OffchainElectionBogusCompact`
- **summary**:   Error while building the assignment type from the compact. This can happen if an index is invalid, or if the weights _overflow_. 
 
### OffchainElectionBogusEdge
- **interface**: `api.errors.staking.OffchainElectionBogusEdge`
- **summary**:   The submitted result has unknown edges that are not among the presented winners. 
 
### OffchainElectionBogusElectionSize
- **interface**: `api.errors.staking.OffchainElectionBogusElectionSize`
- **summary**:   The election size is invalid. 
 
### OffchainElectionBogusNomination
- **interface**: `api.errors.staking.OffchainElectionBogusNomination`
- **summary**:   One of the submitted nominators has an edge to which they have not voted on chain. 
 
### OffchainElectionBogusNominator
- **interface**: `api.errors.staking.OffchainElectionBogusNominator`
- **summary**:   One of the submitted nominators is not an active nominator on chain. 
 
### OffchainElectionBogusScore
- **interface**: `api.errors.staking.OffchainElectionBogusScore`
- **summary**:   The claimed score does not match with the one computed from the data. 
 
### OffchainElectionBogusSelfVote
- **interface**: `api.errors.staking.OffchainElectionBogusSelfVote`
- **summary**:   A self vote must only be originated from a validator to ONLY themselves. 
 
### OffchainElectionBogusWinner
- **interface**: `api.errors.staking.OffchainElectionBogusWinner`
- **summary**:   One of the submitted winners is not an active candidate on chain (index is out of range in snapshot). 
 
### OffchainElectionBogusWinnerCount
- **interface**: `api.errors.staking.OffchainElectionBogusWinnerCount`
- **summary**:   Incorrect number of winners were presented. 
 
### OffchainElectionEarlySubmission
- **interface**: `api.errors.staking.OffchainElectionEarlySubmission`
- **summary**:   The submitted result is received out of the open window. 
 
### OffchainElectionSlashedNomination
- **interface**: `api.errors.staking.OffchainElectionSlashedNomination`
- **summary**:   One of the submitted nominators has an edge which is submitted before the last non-zero slash of the target. 
 
### OffchainElectionWeakSubmission
- **interface**: `api.errors.staking.OffchainElectionWeakSubmission`
- **summary**:   The submitted result is not as good as the one stored on chain. 
 
### SnapshotUnavailable
- **interface**: `api.errors.staking.SnapshotUnavailable`
- **summary**:   The snapshot data of the current window is missing. 

___


## sudo
 
### RequireSudo
- **interface**: `api.errors.sudo.RequireSudo`
- **summary**:   Sender must be the Sudo account 

___


## system
 
### CallFiltered
- **interface**: `api.errors.system.CallFiltered`
- **summary**:   The origin filter prevent the call to be dispatched. 
 
### FailedToExtractRuntimeVersion
- **interface**: `api.errors.system.FailedToExtractRuntimeVersion`
- **summary**:   Failed to extract the runtime version from the new runtime. 

  Either calling `Core_version` or decoding `RuntimeVersion` failed. 
 
### InvalidSpecName
- **interface**: `api.errors.system.InvalidSpecName`
- **summary**:   The name of specification does not match between the current runtime and the new runtime. 
 
### NonDefaultComposite
- **interface**: `api.errors.system.NonDefaultComposite`
- **summary**:   Suicide called when the account has non-default composite data. 
 
### NonZeroRefCount
- **interface**: `api.errors.system.NonZeroRefCount`
- **summary**:   There is a non-zero reference count preventing the account from being purged. 
 
### SpecVersionNeedsToIncrease
- **interface**: `api.errors.system.SpecVersionNeedsToIncrease`
- **summary**:   The specification version is not allowed to decrease between the current runtime and the new runtime. 

___


## treasury
 
### InsufficientProposersBalance
- **interface**: `api.errors.treasury.InsufficientProposersBalance`
- **summary**:   Proposer's balance is too low. 
 
### InvalidIndex
- **interface**: `api.errors.treasury.InvalidIndex`
- **summary**:   No proposal or bounty at that index. 
 
### TooManyApprovals
- **interface**: `api.errors.treasury.TooManyApprovals`
- **summary**:   Too many approvals in the queue. 

___


## utility
 
### TooManyCalls
- **interface**: `api.errors.utility.TooManyCalls`
- **summary**:   Too many calls batched. 
