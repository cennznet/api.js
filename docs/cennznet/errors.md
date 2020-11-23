## Errors

This page lists the errors that can be encountered in the different modules. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[authorship](#authorship)**

- **[cennzx](#cennzx)**

- **[finalityTracker](#finalitytracker)**

- **[genericAsset](#genericasset)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[multisig](#multisig)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[syloDevice](#sylodevice)**

- **[syloInbox](#syloinbox)**

- **[syloVault](#sylovault)**

- **[system](#system)**

- **[treasury](#treasury)**


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


## finalityTracker
 
### AlreadyUpdated
- **summary**:   Final hint must be updated only once in the block 
 
### BadHint
- **summary**:   Finalized height above block number 

___


## genericAsset
 
### AssetIdExhausted
- **summary**:   No new assets id available. 
 
### AssetIdExists
- **summary**:   Asset id is already taken. 
 
### AssetIdNotExist
- **summary**:   Failure due to asset id not existing on chain 
 
### FreeBurningUnderflow
- **summary**:   Free balance got underflowed after burning. 
 
### FreeMintingOverflow
- **summary**:   Free balance got overflowed after minting. 
 
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
 
### WeightTooLow
- **summary**:   The maximum weight information provided was too low. 
 
### WrongTimepoint
- **summary**:   A different timepoint was given to the multisig operation that is underway. 

___


## scheduler
 
### FailedToCancel
- **summary**:   Failed to cancel a scheduled call 
 
### FailedToSchedule
- **summary**:   Failed to schedule a call 
 
### TargetBlockNumberInPast
- **summary**:   Given target block number is in the past. 

___


## session
 
### DuplicatedKey
- **summary**:   Registered duplicate key. 
 
### InvalidProof
- **summary**:   Invalid ownership proof. 
 
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
 
### BondingNotEnabled
 
### DuplicateNominee
- **summary**:   Cannot nominate the same account multiple times 
 
### EmptyTargets
- **summary**:   Targets cannot be empty. 
 
### FundedTarget
- **summary**:   Attempting to target a stash that still has funds. 
 
### InsufficientBond
- **summary**:   Can not bond with value less than minimum balance. 
 
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

___


## sudo
 
### RequireSudo
- **summary**:   Sender must be the Sudo account 

___


## syloDevice
 
### DeviceIdExists
- **summary**:   Device is already registered to user (device_id is already in use) 
 
### MaxDeviceLimitReached
- **summary**:   A user can't have more than MAX_DEVICES registered devices 
 
### UserIdNotRegistered
- **summary**:   There are no devices registered for user (missing user_id in Devices) 

___


## syloInbox
 
### MaxDeleteMessage
- **summary**:   Cannot delete more than MAX_DELETE_MESSAGES at a time 
 
### MaxMessageLength
- **summary**:   A message cannot be greater than MAX_MESSAGE_LENGTH 
 
### MessageIdOverflow
- **summary**:   Cannot assign any more ids to message due to overflow 

___


## syloVault
 
### MaxDeleteKeys
- **summary**:   Cannot delete more than MAX_DELETE_KEYS at a time 
 
### MaxKeys
- **summary**:   Cannot store more than MAX_KEYS 
 
### MaxValueLength
- **summary**:   Cannot store value larger than MAX_VALUE_LENGTH 

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
 
### AlreadyKnown
- **summary**:   The tip was already found/started. 
 
### InsufficientProposersBalance
- **summary**:   Proposer's balance is too low. 
 
### InvalidFee
- **summary**:   Invalid bounty fee. 
 
### InvalidIndex
- **summary**:   No proposal or bounty at that index. 
 
### InvalidValue
- **summary**:   Invalid bounty value. 
 
### NotFinder
- **summary**:   The account attempting to retract the tip is not the finder of the tip. 
 
### PendingPayout
- **summary**:   A bounty payout is pending. To cancel the bounty, you must unassign and slash the curator. 
 
### Premature
- **summary**:   The tip cannot be claimed/closed because it's still in the countdown period. 
 
### ReasonTooBig
- **summary**:   The reason given is just too big. 
 
### RequireCurator
- **summary**:   Require bounty curator. 
 
### StillOpen
- **summary**:   The tip cannot be claimed/closed because there are not enough tippers yet. 
 
### UnexpectedStatus
- **summary**:   The bounty status is unexpected. 
 
### UnknownTip
- **summary**:   The tip hash is unknown. 
