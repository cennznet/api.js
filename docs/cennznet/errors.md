---
title: Errors
---

This page lists the errors that can be encountered in the different modules. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[attestation](#attestation)**

- **[authorship](#authorship)**

- **[babe](#babe)**

- **[cennzx](#cennzx)**

- **[electionProviderMultiPhase](#electionprovidermultiphase)**

- **[genericAsset](#genericasset)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[multisig](#multisig)**

- **[nft](#nft)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[system](#system)**

- **[treasury](#treasury)**


___


## attestation
 
### TopicNotRegistered

___


## authorship
 
### GenesisUncle
- **summary**:   The uncle is genesis. 
 
### InvalidUncleParent
- **summary**:   The uncle parent not in the chain. 
 
### OldUncle
- **summary**:   The uncle isn't recent enough to be included. 
 
### TooHighUncle
- **summary**:   The uncle is too high in chain. 
 
### TooManyUncles
- **summary**:   Too many uncles. 
 
### UncleAlreadyIncluded
- **summary**:   The uncle is already included. 
 
### UnclesAlreadySet
- **summary**:   Uncles already set in the block. 

___


## babe
 
### DuplicateOffenceReport
- **summary**:   A given equivocation report is valid but already previously reported. 
 
### InvalidEquivocationProof
- **summary**:   An equivocation proof provided as part of an equivocation report is invalid. 
 
### InvalidKeyOwnershipProof
- **summary**:   A key ownership proof provided as part of an equivocation report is invalid. 

___


## cennzx
 
### AssetCannotSwapForItself
 
### CannotAddLiquidityWithZero
 
### CannotTradeZero
 
### DivideByZero
 
### EmptyExchangePool
 
### InsufficientBalance
 
### InsufficientCoreAssetBalance
 
### InsufficientExchangePoolReserve
 
### InsufficientLiquidity
 
### InsufficientTradeAssetBalance
 
### InvalidAssetId
 
### MaximumSellRequirementNotMet
 
### MaximumTradeAssetRequirementNotMet
 
### MinimumBuyRequirementNotMet
 
### MinimumCoreAssetRequirementNotMet
 
### MinimumLiquidityRequirementNotMet
 
### MinimumTradeAssetRequirementNotMet
 
### Overflow

___


## electionProviderMultiPhase
 
### CallNotAllowed
- **summary**:   The call is not allowed at this point. 
 
### InvalidSubmissionIndex
- **summary**:   `Self::insert_submission` returned an invalid index. 
 
### MissingSnapshotMetadata
- **summary**:   Snapshot metadata should exist but didn't. 
 
### OcwCallWrongEra
- **summary**:   OCW submitted solution for wrong round 
 
### PreDispatchEarlySubmission
- **summary**:   Submission was too early. 
 
### PreDispatchWeakSubmission
- **summary**:   Submission was too weak, score-wise. 
 
### PreDispatchWrongWinnerCount
- **summary**:   Wrong number of winners presented. 
 
### SignedCannotPayDeposit
- **summary**:   The origin failed to pay the deposit. 
 
### SignedInvalidWitness
- **summary**:   Witness data to dispatchable is invalid. 
 
### SignedQueueFull
- **summary**:   The queue was full, and the solution was not better than any of the existing ones. 
 
### SignedTooMuchWeight
- **summary**:   The signed submission consumes too much weight 

___


## genericAsset
 
### AccountIdNotExist
- **summary**:   There is no such account id in the storage. 
 
### AssetIdExhausted
- **summary**:   No new assets id available. 
 
### AssetIdExists
- **summary**:   Asset id is already taken. 
 
### AssetIdNotExist
- **summary**:   Failure due to asset id not existing on chain 
 
### DecimalTooLarge
- **summary**:   The integer for decimal places is too large for conversion into u128. 
 
### FreeBurningUnderflow
- **summary**:   Free balance got underflowed after burning. 
 
### FreeMintingOverflow
- **summary**:   Free balance got overflowed after minting. 
 
### InitialIssuanceTooLarge
- **summary**:   The integer for initial issuance is too large for conversion into u128. 
 
### InsufficientBalance
- **summary**:   The balance is too low to send amount. 
 
### LiquidityRestrictions
- **summary**:   The account liquidity restrictions prevent withdrawal. 
 
### NoBurnPermission
- **summary**:   The origin does not have permission to burn an asset. 
 
### NoMintPermission
- **summary**:   The origin does not have permission to mint an asset. 
 
### NoUpdatePermission
- **summary**:   The origin does not have enough permission to update permissions. 
 
### TotalBurningUnderflow
- **summary**:   Total issuance got underflowed after burning. 
 
### TotalMintingOverflow
- **summary**:   Total issuance got overflowed after minting. 
 
### TransferOverflow
- **summary**:   The transfer will cause the account to overflow 
 
### ZeroAmount
- **summary**:   Cannot transfer zero amount. 
 
### ZeroExistentialDeposit
- **summary**:   Existential deposit for assets should always be greater than zero. 

___


## grandpa
 
### ChangePending
- **summary**:   Attempt to signal GRANDPA change with one already pending. 
 
### DuplicateOffenceReport
- **summary**:   A given equivocation report is valid but already previously reported. 
 
### InvalidEquivocationProof
- **summary**:   An equivocation proof provided as part of an equivocation report is invalid. 
 
### InvalidKeyOwnershipProof
- **summary**:   A key ownership proof provided as part of an equivocation report is invalid. 
 
### PauseFailed
- **summary**:   Attempt to signal GRANDPA pause when the authority set isn't live (either paused or already pending pause). 
 
### ResumeFailed
- **summary**:   Attempt to signal GRANDPA resume when the authority set isn't paused (either live or already pending resume). 
 
### TooSoon
- **summary**:   Cannot signal forced change so soon after last. 

___


## identity
 
### AlreadyClaimed
- **summary**:   Account ID is already named. 
 
### EmptyIndex
- **summary**:   Empty index. 
 
### FeeChanged
- **summary**:   Fee is changed. 
 
### InvalidIndex
- **summary**:   The index is invalid. 
 
### InvalidJudgement
- **summary**:   Invalid judgement. 
 
### InvalidTarget
- **summary**:   The target is invalid. 
 
### JudgementGiven
- **summary**:   Judgement given. 
 
### NoIdentity
- **summary**:   No identity found. 
 
### NotFound
- **summary**:   Account isn't found. 
 
### NotNamed
- **summary**:   Account isn't named. 
 
### NotOwned
- **summary**:   Sub-account isn't owned by sender. 
 
### NotSub
- **summary**:   Sender is not a sub-account. 
 
### StickyJudgement
- **summary**:   Sticky judgement. 
 
### TooManyFields
- **summary**:   Too many additional fields. 
 
### TooManyRegistrars
- **summary**:   Maximum amount of registrars reached. Cannot add any more. 
 
### TooManySubAccounts
- **summary**:   Too many subs-accounts. 

___


## imOnline
 
### DuplicatedHeartbeat
- **summary**:   Duplicated heartbeat. 
 
### InvalidKey
- **summary**:   Non existent public key. 

___


## multisig
 
### AlreadyApproved
- **summary**:   Call is already approved by this signatory. 
 
### AlreadyStored
- **summary**:   The data to be stored is already stored. 
 
### MaxWeightTooLow
- **summary**:   The maximum weight information provided was too low. 
 
### MinimumThreshold
- **summary**:   Threshold must be 2 or greater. 
 
### NoApprovalsNeeded
- **summary**:   Call doesn't need any (more) approvals. 
 
### NotFound
- **summary**:   Multisig operation not found when attempting to cancel. 
 
### NoTimepoint
- **summary**:   No timepoint was given, yet the multisig operation is already underway. 
 
### NotOwner
- **summary**:   Only the account that originally created the multisig is able to cancel it. 
 
### SenderInSignatories
- **summary**:   The sender was contained in the other signatories; it shouldn't be. 
 
### SignatoriesOutOfOrder
- **summary**:   The signatories were provided out of order; they should be ordered. 
 
### TooFewSignatories
- **summary**:   There are too few signatories in the list. 
 
### TooManySignatories
- **summary**:   There are too many signatories in the list. 
 
### UnexpectedTimepoint
- **summary**:   A timepoint was given, yet no multisig operation is underway. 
 
### WrongTimepoint
- **summary**:   A different timepoint was given to the multisig operation that is underway. 

___


## nft
 
### AddToUniqueIssue
- **summary**:   Cannot mint additional tokens in a unique issue series 
 
### BidTooLow
- **summary**:   Auction bid was lower than reserve or current highest bid 
 
### CollectionIdExists
- **summary**:   A collection with the same ID already exists 
 
### CollectionNameInvalid
- **summary**:   Given collection name is invalid (invalid utf-8, too long, empty) 
 
### InternalPayment
- **summary**:   Internal error during payment 
 
### MaxAttributeLength
- **summary**:   Given attirbute value is larger than the configured max. 
 
### MixedBundleSale
- **summary**:   Selling tokens from different collections is not allowed 
 
### NoAvailableIds
- **summary**:   No more Ids are available, they've been exhausted 
 
### NoCollection
- **summary**:   The NFT collection does not exist 
 
### NoPermission
- **summary**:   origin does not have permission for the operation (the token may not exist) 
 
### NotForAuction
- **summary**:   The token is not listed for auction sale 
 
### NotForFixedPriceSale
- **summary**:   The token is not listed for fixed price sale 
 
### NoToken
- **summary**:   The token does not exist 
 
### RoyaltiesOvercommitment
- **summary**:   Total royalties would exceed 100% of sale 
 
### RoyaltiesProtection
- **summary**:   Tokens with different individual royalties cannot be sold together 
 
### SchemaMaxAttributes
- **summary**:   Too many attributes in the provided schema or data 
 
### TokenListingProtection
- **summary**:   Cannot operate on a listed NFT 

___


## scheduler
 
### FailedToSchedule
- **summary**:   Failed to schedule a call 
 
### NotFound
- **summary**:   Cannot find the scheduled call. 
 
### RescheduleNoChange
- **summary**:   Reschedule failed because it does not change scheduled time. 
 
### TargetBlockNumberInPast
- **summary**:   Given target block number is in the past. 

___


## session
 
### DuplicatedKey
- **summary**:   Registered duplicate key. 
 
### InvalidProof
- **summary**:   Invalid ownership proof. 
 
### NoAccount
- **summary**:   Key setting account is not live, so it's impossible to associate keys. 
 
### NoAssociatedValidatorId
- **summary**:   No associated validator ID for account. 
 
### NoKeys
- **summary**:   No keys are associated with this account. 

___


## staking
 
### AlreadyBonded
- **summary**:   Stash is already bonded. 
 
### AlreadyPaired
- **summary**:   Controller is already paired. 
 
### BadTarget
- **summary**:   A nomination target was supplied that was blocked or otherwise not a validator. 
 
### CallNotAllowed
- **summary**:   The call is not allowed at the given time due to restrictions of election period. 
 
### DuplicateNominee
- **summary**:   Cannot nominate the same account multiple times 
 
### EmptyTargets
- **summary**:   Targets cannot be empty. 
 
### FundedTarget
- **summary**:   Attempting to target a stash that still has funds. 
 
### IncorrectHistoryDepth
- **summary**:   Incorrect previous history depth input provided. 
 
### InsufficientBond
- **summary**:   Can not bond with value less than minimum balance. 
 
### InsufficientFreeBalance
- **summary**:   User does not have enough free balance to bond this amount 
 
### InvalidSlashIndex
- **summary**:   Slash record index out of bounds. 
 
### NoMoreChunks
- **summary**:   Can not schedule more unlock chunks. 
 
### NotController
- **summary**:   Not a controller account. 
 
### NotSortedAndUnique
- **summary**:   Items are not sorted and unique. 
 
### NotStash
- **summary**:   Not a stash account. 
 
### NoUnlockChunk
- **summary**:   Can not rebond without unlocking chunks. 
 
### OffchainElectionBogusCompact
- **summary**:   Error while building the assignment type from the compact. This can happen if an index is invalid, or if the weights _overflow_. 
 
### OffchainElectionBogusEdge
- **summary**:   The submitted result has unknown edges that are not among the presented winners. 
 
### OffchainElectionBogusElectionSize
- **summary**:   The election size is invalid. 
 
### OffchainElectionBogusNomination
- **summary**:   One of the submitted nominators has an edge to which they have not voted on chain. 
 
### OffchainElectionBogusNominator
- **summary**:   One of the submitted nominators is not an active nominator on chain. 
 
### OffchainElectionBogusScore
- **summary**:   The claimed score does not match with the one computed from the data. 
 
### OffchainElectionBogusSelfVote
- **summary**:   A self vote must only be originated from a validator to ONLY themselves. 
 
### OffchainElectionBogusWinner
- **summary**:   One of the submitted winners is not an active candidate on chain (index is out of range in snapshot). 
 
### OffchainElectionBogusWinnerCount
- **summary**:   Incorrect number of winners were presented. 
 
### OffchainElectionEarlySubmission
- **summary**:   The submitted result is received out of the open window. 
 
### OffchainElectionSlashedNomination
- **summary**:   One of the submitted nominators has an edge which is submitted before the last non-zero slash of the target. 
 
### OffchainElectionWeakSubmission
- **summary**:   The submitted result is not as good as the one stored on chain. 
 
### SnapshotUnavailable
- **summary**:   The snapshot data of the current window is missing. 
 
### TooManyTargets
- **summary**:   Too many nomination targets supplied. 

___


## sudo
 
### RequireSudo
- **summary**:   Sender must be the Sudo account 

___


## system
 
### FailedToExtractRuntimeVersion
- **summary**:   Failed to extract the runtime version from the new runtime. 

  Either calling `Core_version` or decoding `RuntimeVersion` failed. 
 
### InvalidSpecName
- **summary**:   The name of specification does not match between the current runtime and the new runtime. 
 
### NonDefaultComposite
- **summary**:   Suicide called when the account has non-default composite data. 
 
### NonZeroRefCount
- **summary**:   There is a non-zero reference count preventing the account from being purged. 
 
### SpecVersionNeedsToIncrease
- **summary**:   The specification version is not allowed to decrease between the current runtime and the new runtime. 

___


## treasury
 
### InsufficientProposersBalance
- **summary**:   Proposer's balance is too low. 
 
### InvalidIndex
- **summary**:   No proposal or bounty at that index. 
 
### TooManyApprovals
- **summary**:   Too many approvals in the queue. 
