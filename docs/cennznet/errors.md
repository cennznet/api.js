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
- **interface**: `api.errors.authorship.GenesisUncle.is`
- **summary**:   he uncle is genesis. 
 
### InvalidUncleParent
- **interface**: `api.errors.authorship.InvalidUncleParent.is`
- **summary**:   he uncle parent not in the chain. 
 
### OldUncle
- **interface**: `api.errors.authorship.OldUncle.is`
- **summary**:   he uncle isn't recent enough to be included. 
 
### TooHighUncle
- **interface**: `api.errors.authorship.TooHighUncle.is`
- **summary**:   he uncle is too high in chain. 
 
### TooManyUncles
- **interface**: `api.errors.authorship.TooManyUncles.is`
- **summary**:   oo many uncles. 
 
### UncleAlreadyIncluded
- **interface**: `api.errors.authorship.UncleAlreadyIncluded.is`
- **summary**:   he uncle is already included. 
 
### UnclesAlreadySet
- **interface**: `api.errors.authorship.UnclesAlreadySet.is`
- **summary**:   ncles already set in the block. 

___


## babe
 
### DuplicateOffenceReport
- **interface**: `api.errors.babe.DuplicateOffenceReport.is`
- **summary**:    given equivocation report is valid but already previously reported. 
 
### InvalidEquivocationProof
- **interface**: `api.errors.babe.InvalidEquivocationProof.is`
- **summary**:   n equivocation proof provided as part of an equivocation report is invalid. 
 
### InvalidKeyOwnershipProof
- **interface**: `api.errors.babe.InvalidKeyOwnershipProof.is`
- **summary**:    key ownership proof provided as part of an equivocation report is invalid. 

___


## cennzx
 
### AssetCannotSwapForItself
- **interface**: `api.errors.cennzx.AssetCannotSwapForItself.is`
 
### CannotAddLiquidityWithZero
- **interface**: `api.errors.cennzx.CannotAddLiquidityWithZero.is`
 
### CannotTradeZero
- **interface**: `api.errors.cennzx.CannotTradeZero.is`
 
### DivideByZero
- **interface**: `api.errors.cennzx.DivideByZero.is`
 
### EmptyExchangePool
- **interface**: `api.errors.cennzx.EmptyExchangePool.is`
 
### InsufficientBalance
- **interface**: `api.errors.cennzx.InsufficientBalance.is`
 
### InsufficientCoreAssetBalance
- **interface**: `api.errors.cennzx.InsufficientCoreAssetBalance.is`
 
### InsufficientExchangePoolReserve
- **interface**: `api.errors.cennzx.InsufficientExchangePoolReserve.is`
 
### InsufficientLiquidity
- **interface**: `api.errors.cennzx.InsufficientLiquidity.is`
 
### InsufficientTradeAssetBalance
- **interface**: `api.errors.cennzx.InsufficientTradeAssetBalance.is`
 
### InvalidAssetId
- **interface**: `api.errors.cennzx.InvalidAssetId.is`
 
### MaximumSellRequirementNotMet
- **interface**: `api.errors.cennzx.MaximumSellRequirementNotMet.is`
 
### MaximumTradeAssetRequirementNotMet
- **interface**: `api.errors.cennzx.MaximumTradeAssetRequirementNotMet.is`
 
### MinimumBuyRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumBuyRequirementNotMet.is`
 
### MinimumCoreAssetRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumCoreAssetRequirementNotMet.is`
 
### MinimumLiquidityRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumLiquidityRequirementNotMet.is`
 
### MinimumTradeAssetRequirementNotMet
- **interface**: `api.errors.cennzx.MinimumTradeAssetRequirementNotMet.is`
 
### Overflow
- **interface**: `api.errors.cennzx.Overflow.is`

___


## ethereum
 
### InvalidSignature
- **interface**: `api.errors.ethereum.InvalidSignature.is`
- **summary**:   ignature is invalid. 
 
### PreLogExists
- **interface**: `api.errors.ethereum.PreLogExists.is`
- **summary**:   re-log is present, therefore transact is not allowed. 

___


## ethWallet
 
### CantPay
- **interface**: `api.errors.ethWallet.CantPay.is`
- **summary**:   an't pay fees 
 
### InvalidSignature
- **interface**: `api.errors.ethWallet.InvalidSignature.is`
- **summary**:   ignature & account mismatched. 

___


## eVM
 
### BalanceLow
- **interface**: `api.errors.evm.BalanceLow.is`
- **summary**:   ot enough balance to perform action 
 
### FeeOverflow
- **interface**: `api.errors.evm.FeeOverflow.is`
- **summary**:   alculating total fee overflowed 
 
### GasPriceTooLow
- **interface**: `api.errors.evm.GasPriceTooLow.is`
- **summary**:   as price is too low. 
 
### InvalidNonce
- **interface**: `api.errors.evm.InvalidNonce.is`
- **summary**:   once is invalid 
 
### PaymentOverflow
- **interface**: `api.errors.evm.PaymentOverflow.is`
- **summary**:   alculating total payment overflowed 
 
### WithdrawFailed
- **interface**: `api.errors.evm.WithdrawFailed.is`
- **summary**:   ithdraw fee failed 

___


## genericAsset
 
### AccountIdNotExist
- **interface**: `api.errors.genericAsset.AccountIdNotExist.is`
- **summary**:   here is no such account id in the storage. 
 
### AssetIdExhausted
- **interface**: `api.errors.genericAsset.AssetIdExhausted.is`
- **summary**:   o new assets id available. 
 
### AssetIdExists
- **interface**: `api.errors.genericAsset.AssetIdExists.is`
- **summary**:   sset id is already taken. 
 
### AssetIdNotExist
- **interface**: `api.errors.genericAsset.AssetIdNotExist.is`
- **summary**:   ailure due to asset id not existing on chain 
 
### DecimalTooLarge
- **interface**: `api.errors.genericAsset.DecimalTooLarge.is`
- **summary**:   he integer for decimal places is too large for conversion into u128. 
 
### FreeBurningUnderflow
- **interface**: `api.errors.genericAsset.FreeBurningUnderflow.is`
- **summary**:   ree balance got underflowed after burning. 
 
### FreeMintingOverflow
- **interface**: `api.errors.genericAsset.FreeMintingOverflow.is`
- **summary**:   ree balance got overflowed after minting. 
 
### InitialIssuanceTooLarge
- **interface**: `api.errors.genericAsset.InitialIssuanceTooLarge.is`
- **summary**:   he integer for initial issuance is too large for conversion into u128. 
 
### InsufficientBalance
- **interface**: `api.errors.genericAsset.InsufficientBalance.is`
- **summary**:   he balance is too low to send amount. 
 
### LiquidityRestrictions
- **interface**: `api.errors.genericAsset.LiquidityRestrictions.is`
- **summary**:   he account liquidity restrictions prevent withdrawal. 
 
### NoBurnPermission
- **interface**: `api.errors.genericAsset.NoBurnPermission.is`
- **summary**:   he origin does not have permission to burn an asset. 
 
### NoMintPermission
- **interface**: `api.errors.genericAsset.NoMintPermission.is`
- **summary**:   he origin does not have permission to mint an asset. 
 
### NoUpdatePermission
- **interface**: `api.errors.genericAsset.NoUpdatePermission.is`
- **summary**:   he origin does not have enough permission to update permissions. 
 
### TotalBurningUnderflow
- **interface**: `api.errors.genericAsset.TotalBurningUnderflow.is`
- **summary**:   otal issuance got underflowed after burning. 
 
### TotalMintingOverflow
- **interface**: `api.errors.genericAsset.TotalMintingOverflow.is`
- **summary**:   otal issuance got overflowed after minting. 
 
### TransferOverflow
- **interface**: `api.errors.genericAsset.TransferOverflow.is`
- **summary**:   he transfer will cause the account to overflow 
 
### ZeroAmount
- **interface**: `api.errors.genericAsset.ZeroAmount.is`
- **summary**:   annot transfer zero amount. 
 
### ZeroExistentialDeposit
- **interface**: `api.errors.genericAsset.ZeroExistentialDeposit.is`
- **summary**:   xistential deposit for assets should always be greater than zero. 

___


## grandpa
 
### ChangePending
- **interface**: `api.errors.grandpa.ChangePending.is`
- **summary**:   ttempt to signal GRANDPA change with one already pending. 
 
### DuplicateOffenceReport
- **interface**: `api.errors.grandpa.DuplicateOffenceReport.is`
- **summary**:    given equivocation report is valid but already previously reported. 
 
### InvalidEquivocationProof
- **interface**: `api.errors.grandpa.InvalidEquivocationProof.is`
- **summary**:   n equivocation proof provided as part of an equivocation report is invalid. 
 
### InvalidKeyOwnershipProof
- **interface**: `api.errors.grandpa.InvalidKeyOwnershipProof.is`
- **summary**:    key ownership proof provided as part of an equivocation report is invalid. 
 
### PauseFailed
- **interface**: `api.errors.grandpa.PauseFailed.is`
- **summary**:   ttempt to signal GRANDPA pause when the authority set isn't live either paused or already pending pause). 
 
### ResumeFailed
- **interface**: `api.errors.grandpa.ResumeFailed.is`
- **summary**:   ttempt to signal GRANDPA resume when the authority set isn't paused either live or already pending resume). 
 
### TooSoon
- **interface**: `api.errors.grandpa.TooSoon.is`
- **summary**:   annot signal forced change so soon after last. 

___


## identity
 
### AlreadyClaimed
- **interface**: `api.errors.identity.AlreadyClaimed.is`
- **summary**:   ccount ID is already named. 
 
### EmptyIndex
- **interface**: `api.errors.identity.EmptyIndex.is`
- **summary**:   mpty index. 
 
### FeeChanged
- **interface**: `api.errors.identity.FeeChanged.is`
- **summary**:   ee is changed. 
 
### InvalidIndex
- **interface**: `api.errors.identity.InvalidIndex.is`
- **summary**:   he index is invalid. 
 
### InvalidJudgement
- **interface**: `api.errors.identity.InvalidJudgement.is`
- **summary**:   nvalid judgement. 
 
### InvalidTarget
- **interface**: `api.errors.identity.InvalidTarget.is`
- **summary**:   he target is invalid. 
 
### JudgementGiven
- **interface**: `api.errors.identity.JudgementGiven.is`
- **summary**:   udgement given. 
 
### NoIdentity
- **interface**: `api.errors.identity.NoIdentity.is`
- **summary**:   o identity found. 
 
### NotFound
- **interface**: `api.errors.identity.NotFound.is`
- **summary**:   ccount isn't found. 
 
### NotNamed
- **interface**: `api.errors.identity.NotNamed.is`
- **summary**:   ccount isn't named. 
 
### NotOwned
- **interface**: `api.errors.identity.NotOwned.is`
- **summary**:   ub-account isn't owned by sender. 
 
### NotSub
- **interface**: `api.errors.identity.NotSub.is`
- **summary**:   ender is not a sub-account. 
 
### StickyJudgement
- **interface**: `api.errors.identity.StickyJudgement.is`
- **summary**:   ticky judgement. 
 
### TooManyFields
- **interface**: `api.errors.identity.TooManyFields.is`
- **summary**:   oo many additional fields. 
 
### TooManyRegistrars
- **interface**: `api.errors.identity.TooManyRegistrars.is`
- **summary**:   aximum amount of registrars reached. Cannot add any more. 
 
### TooManySubAccounts
- **interface**: `api.errors.identity.TooManySubAccounts.is`
- **summary**:   oo many subs-accounts. 

___


## imOnline
 
### DuplicatedHeartbeat
- **interface**: `api.errors.imOnline.DuplicatedHeartbeat.is`
- **summary**:   uplicated heartbeat. 
 
### InvalidKey
- **interface**: `api.errors.imOnline.InvalidKey.is`
- **summary**:   on existent public key. 

___


## nft
 
### BidTooLow
- **interface**: `api.errors.nft.BidTooLow.is`
- **summary**:   uction bid was lower than reserve or current highest bid 
 
### CollectionIdExists
- **interface**: `api.errors.nft.CollectionIdExists.is`
- **summary**:    collection with the same ID already exists 
 
### CollectionNameInvalid
- **interface**: `api.errors.nft.CollectionNameInvalid.is`
- **summary**:   iven collection name is invalid (invalid utf-8, too long, empty) 
 
### InternalPayment
- **interface**: `api.errors.nft.InternalPayment.is`
- **summary**:   nternal error during payment 
 
### InvalidMetadataPath
- **interface**: `api.errors.nft.InvalidMetadataPath.is`
- **summary**:   he metadata path is invalid (non-utf8 or empty) 
 
### MarketplaceNotRegistered
- **interface**: `api.errors.nft.MarketplaceNotRegistered.is`
- **summary**:   he account_id hasn't been registered as a marketplace 
 
### MaxAttributeLength
- **interface**: `api.errors.nft.MaxAttributeLength.is`
- **summary**:   iven attribute value is larger than the configured max. 
 
### MixedBundleSale
- **interface**: `api.errors.nft.MixedBundleSale.is`
- **summary**:   elling tokens from different collections is not allowed 
 
### NameAlreadySet
- **interface**: `api.errors.nft.NameAlreadySet.is`
- **summary**:   he Series name has been set 
 
### NoAvailableIds
- **interface**: `api.errors.nft.NoAvailableIds.is`
- **summary**:   o more Ids are available, they've been exhausted 
 
### NoCollection
- **interface**: `api.errors.nft.NoCollection.is`
- **summary**:   he NFT collection does not exist 
 
### NoPermission
- **interface**: `api.errors.nft.NoPermission.is`
- **summary**:   rigin does not have permission for the operation (the token may not exist) 
 
### NoSeries
- **interface**: `api.errors.nft.NoSeries.is`
- **summary**:   he series does not exist 
 
### NotForAuction
- **interface**: `api.errors.nft.NotForAuction.is`
- **summary**:   he token is not listed for auction sale 
 
### NotForFixedPriceSale
- **interface**: `api.errors.nft.NotForFixedPriceSale.is`
- **summary**:   he token is not listed for fixed price sale 
 
### NoToken
- **interface**: `api.errors.nft.NoToken.is`
- **summary**:   he token does not exist 
 
### RoyaltiesInvalid
- **interface**: `api.errors.nft.RoyaltiesInvalid.is`
- **summary**:   otal royalties would exceed 100% of sale or an empty vec is supplied 
 
### RoyaltiesProtection
- **interface**: `api.errors.nft.RoyaltiesProtection.is`
- **summary**:   okens with different individual royalties cannot be sold together 
 
### SchemaMaxAttributes
- **interface**: `api.errors.nft.SchemaMaxAttributes.is`
- **summary**:   oo many attributes in the provided schema or data 
 
### TokenListingProtection
- **interface**: `api.errors.nft.TokenListingProtection.is`
- **summary**:   annot operate on a listed NFT 

___


## scheduler
 
### FailedToSchedule
- **interface**: `api.errors.scheduler.FailedToSchedule.is`
- **summary**:   ailed to schedule a call 
 
### NotFound
- **interface**: `api.errors.scheduler.NotFound.is`
- **summary**:   annot find the scheduled call. 
 
### RescheduleNoChange
- **interface**: `api.errors.scheduler.RescheduleNoChange.is`
- **summary**:   eschedule failed because it does not change scheduled time. 
 
### TargetBlockNumberInPast
- **interface**: `api.errors.scheduler.TargetBlockNumberInPast.is`
- **summary**:   iven target block number is in the past. 

___


## session
 
### DuplicatedKey
- **interface**: `api.errors.session.DuplicatedKey.is`
- **summary**:   egistered duplicate key. 
 
### InvalidProof
- **interface**: `api.errors.session.InvalidProof.is`
- **summary**:   nvalid ownership proof. 
 
### NoAccount
- **interface**: `api.errors.session.NoAccount.is`
- **summary**:   ey setting account is not live, so it's impossible to associate keys. 
 
### NoAssociatedValidatorId
- **interface**: `api.errors.session.NoAssociatedValidatorId.is`
- **summary**:   o associated validator ID for account. 
 
### NoKeys
- **interface**: `api.errors.session.NoKeys.is`
- **summary**:   o keys are associated with this account. 

___


## staking
 
### AlreadyBonded
- **interface**: `api.errors.staking.AlreadyBonded.is`
- **summary**:   tash is already bonded. 
 
### AlreadyPaired
- **interface**: `api.errors.staking.AlreadyPaired.is`
- **summary**:   ontroller is already paired. 
 
### CallNotAllowed
- **interface**: `api.errors.staking.CallNotAllowed.is`
- **summary**:   he call is not allowed at the given time due to restrictions of election period. 
 
### DuplicateNominee
- **interface**: `api.errors.staking.DuplicateNominee.is`
- **summary**:   annot nominate the same account multiple times 
 
### EmptyTargets
- **interface**: `api.errors.staking.EmptyTargets.is`
- **summary**:   argets cannot be empty. 
 
### FundedTarget
- **interface**: `api.errors.staking.FundedTarget.is`
- **summary**:   ttempting to target a stash that still has funds. 
 
### IncorrectHistoryDepth
- **interface**: `api.errors.staking.IncorrectHistoryDepth.is`
- **summary**:   ncorrect previous history depth input provided. 
 
### IncorrectSlashingSpans
- **interface**: `api.errors.staking.IncorrectSlashingSpans.is`
- **summary**:   ncorrect number of slashing spans provided. 
 
### InsufficientBond
- **interface**: `api.errors.staking.InsufficientBond.is`
- **summary**:   an not bond with value less than minimum balance. 
 
### InsufficientFreeBalance
- **interface**: `api.errors.staking.InsufficientFreeBalance.is`
- **summary**:   ser does not have enough free balance to bond this amount 
 
### InvalidSlashIndex
- **interface**: `api.errors.staking.InvalidSlashIndex.is`
- **summary**:   lash record index out of bounds. 
 
### NoMoreChunks
- **interface**: `api.errors.staking.NoMoreChunks.is`
- **summary**:   an not schedule more unlock chunks. 
 
### NotController
- **interface**: `api.errors.staking.NotController.is`
- **summary**:   ot a controller account. 
 
### NotSortedAndUnique
- **interface**: `api.errors.staking.NotSortedAndUnique.is`
- **summary**:   tems are not sorted and unique. 
 
### NotStash
- **interface**: `api.errors.staking.NotStash.is`
- **summary**:   ot a stash account. 
 
### NoUnlockChunk
- **interface**: `api.errors.staking.NoUnlockChunk.is`
- **summary**:   an not rebond without unlocking chunks. 
 
### OffchainElectionBogusCompact
- **interface**: `api.errors.staking.OffchainElectionBogusCompact.is`
- **summary**:   rror while building the assignment type from the compact. This can happen if an index s invalid, or if the weights _overflow_. 
 
### OffchainElectionBogusEdge
- **interface**: `api.errors.staking.OffchainElectionBogusEdge.is`
- **summary**:   he submitted result has unknown edges that are not among the presented winners. 
 
### OffchainElectionBogusElectionSize
- **interface**: `api.errors.staking.OffchainElectionBogusElectionSize.is`
- **summary**:   he election size is invalid. 
 
### OffchainElectionBogusNomination
- **interface**: `api.errors.staking.OffchainElectionBogusNomination.is`
- **summary**:   ne of the submitted nominators has an edge to which they have not voted on chain. 
 
### OffchainElectionBogusNominator
- **interface**: `api.errors.staking.OffchainElectionBogusNominator.is`
- **summary**:   ne of the submitted nominators is not an active nominator on chain. 
 
### OffchainElectionBogusScore
- **interface**: `api.errors.staking.OffchainElectionBogusScore.is`
- **summary**:   he claimed score does not match with the one computed from the data. 
 
### OffchainElectionBogusSelfVote
- **interface**: `api.errors.staking.OffchainElectionBogusSelfVote.is`
- **summary**:    self vote must only be originated from a validator to ONLY themselves. 
 
### OffchainElectionBogusWinner
- **interface**: `api.errors.staking.OffchainElectionBogusWinner.is`
- **summary**:   ne of the submitted winners is not an active candidate on chain (index is out of range n snapshot). 
 
### OffchainElectionBogusWinnerCount
- **interface**: `api.errors.staking.OffchainElectionBogusWinnerCount.is`
- **summary**:   ncorrect number of winners were presented. 
 
### OffchainElectionEarlySubmission
- **interface**: `api.errors.staking.OffchainElectionEarlySubmission.is`
- **summary**:   he submitted result is received out of the open window. 
 
### OffchainElectionSlashedNomination
- **interface**: `api.errors.staking.OffchainElectionSlashedNomination.is`
- **summary**:   ne of the submitted nominators has an edge which is submitted before the last non-zero lash of the target. 
 
### OffchainElectionWeakSubmission
- **interface**: `api.errors.staking.OffchainElectionWeakSubmission.is`
- **summary**:   he submitted result is not as good as the one stored on chain. 
 
### SnapshotUnavailable
- **interface**: `api.errors.staking.SnapshotUnavailable.is`
- **summary**:   he snapshot data of the current window is missing. 

___


## sudo
 
### RequireSudo
- **interface**: `api.errors.sudo.RequireSudo.is`
- **summary**:   ender must be the Sudo account 

___


## system
 
### CallFiltered
- **interface**: `api.errors.system.CallFiltered.is`
- **summary**:   he origin filter prevent the call to be dispatched. 
 
### FailedToExtractRuntimeVersion
- **interface**: `api.errors.system.FailedToExtractRuntimeVersion.is`
- **summary**:   ailed to extract the runtime version from the new runtime. 

  ither calling `Core_version` or decoding `RuntimeVersion` failed. 
 
### InvalidSpecName
- **interface**: `api.errors.system.InvalidSpecName.is`
- **summary**:   he name of specification does not match between the current runtime nd the new runtime. 
 
### NonDefaultComposite
- **interface**: `api.errors.system.NonDefaultComposite.is`
- **summary**:   uicide called when the account has non-default composite data. 
 
### NonZeroRefCount
- **interface**: `api.errors.system.NonZeroRefCount.is`
- **summary**:   here is a non-zero reference count preventing the account from being purged. 
 
### SpecVersionNeedsToIncrease
- **interface**: `api.errors.system.SpecVersionNeedsToIncrease.is`
- **summary**:   he specification version is not allowed to decrease between the current runtime nd the new runtime. 

___


## treasury
 
### InsufficientProposersBalance
- **interface**: `api.errors.treasury.InsufficientProposersBalance.is`
- **summary**:   roposer's balance is too low. 
 
### InvalidIndex
- **interface**: `api.errors.treasury.InvalidIndex.is`
- **summary**:   o proposal or bounty at that index. 
 
### TooManyApprovals
- **interface**: `api.errors.treasury.TooManyApprovals.is`
- **summary**:   oo many approvals in the queue. 

___


## utility
 
### TooManyCalls
- **interface**: `api.errors.utility.TooManyCalls.is`
- **summary**:   oo many calls batched. 
