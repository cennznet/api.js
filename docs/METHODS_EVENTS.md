## Events

Events are emitted for certain operations on the runtime. The following sections describe the events that are part of the default Substrate runtime.
- **[attestation](#attestation)**

- **[cennzxSpot](#cennzxSpot)**

- **[contract](#contract)**

- **[council](#council)**

- **[councilMotions](#councilMotions)**

- **[councilVoting](#councilVoting)**

- **[democracy](#democracy)**

- **[fees](#fees)**

- **[genericAsset](#genericAsset)**

- **[grandpa](#grandpa)**

- **[indices](#indices)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[syloDevice](#syloDevice)**

- **[syloE2Ee](#syloE2Ee)**

- **[system](#system)**

- **[treasury](#treasury)**

 
___
 <a name=attestation></a>
 

### attestation

▸ **ClaimRemoved**(`AccountId`, `AccountId`, `AttestationTopic`)

▸ **ClaimSet**(`AccountId`, `AccountId`, `AttestationTopic`, `AttestationValue`)
 
___
 <a name=cennzxSpot></a>
 

### cennzxSpot

▸ **AddLiquidity**(`AccountId`, `Balance`, `AssetId`, `Balance`)

▸ **AssetPurchase**(`AssetId`, `AssetId`, `AccountId`, `Balance`, `Balance`)

▸ **RemoveLiquidity**(`AccountId`, `Balance`, `AssetId`, `Balance`)
 
___
 <a name=contract></a>
 

### contract

▸ **CodeStored**(`Hash`)
-   Code with the specified hash has been stored.

▸ **Contract**(`AccountId`, `Bytes`)
-   An event from contract of account.

▸ **Dispatched**(`AccountId`, `bool`)
-   A call was dispatched from the given account. The bool signals whether it was  successful execution or not.

▸ **Instantiated**(`AccountId`, `AccountId`)
-   Contract deployed by address at the specified address.

▸ **ScheduleUpdated**(`u32`)
-   Triggered when the current schedule is updated.

▸ **Transfer**(`AccountId`, `AccountId`, `Balance`)
-   Transfer happened `from` to `to` with given `value` as part of a `call` or `create`.
 
___
 <a name=council></a>
 

### council

▸ **BadReaperSlashed**(`AccountId`)
-   slashed reaper

▸ **TallyFinalized**(`Vec<AccountId>`, `Vec<AccountId>`)
-   A tally (for approval votes of council seat(s)) has ended (with one or more new members).

▸ **TallyStarted**(`u32`)
-   A tally (for approval votes of council seat(s)) has started.

▸ **VoterReaped**(`AccountId`, `AccountId`)
-   reaped voter, reaper
 
___
 <a name=councilMotions></a>
 

### councilMotions

▸ **Approved**(`Hash`)
-   A motion was approved by the required threshold.

▸ **Disapproved**(`Hash`)
-   A motion was not approved by the required threshold.

▸ **Executed**(`Hash`, `bool`)
-   A motion was executed; `bool` is true if returned without error.

▸ **Proposed**(`AccountId`, `ProposalIndex`, `Hash`, `u32`)
-   A motion (given hash) has been proposed (by given account) with a threshold (given u32).

▸ **Voted**(`AccountId`, `Hash`, `bool`, `u32`, `u32`)
-   A motion (given hash) has been voted on by given account, leaving  a tally (yes votes and no votes given as u32s respectively).
 
___
 <a name=councilVoting></a>
 

### councilVoting

▸ **TallyCancelation**(`Hash`, `u32`, `u32`, `u32`)
-   A voting tally has happened for a referendum cancellation vote.  Last three are yes, no, abstain counts.

▸ **TallyReferendum**(`Hash`, `u32`, `u32`, `u32`)
-   A voting tally has happened for a referendum vote.  Last three are yes, no, abstain counts.
 
___
 <a name=democracy></a>
 

### democracy

▸ **Cancelled**(`ReferendumIndex`)

▸ **Delegated**(`AccountId`, `AccountId`)

▸ **Executed**(`ReferendumIndex`, `bool`)

▸ **NotPassed**(`ReferendumIndex`)

▸ **Passed**(`ReferendumIndex`)

▸ **Proposed**(`PropIndex`, `Balance`)

▸ **Started**(`ReferendumIndex`, `VoteThreshold`)

▸ **Tabled**(`PropIndex`, `Balance`, `Vec<AccountId>`)

▸ **Undelegated**(`AccountId`)
 
___
 <a name=fees></a>
 

### fees

▸ **Charged**(`u32`, `Amount`)
-   Fee charged (extrinsic_index, fee_amount)
 
___
 <a name=genericAsset></a>
 

### genericAsset

▸ **Burned**(`AssetId`, `AccountId`, `Balance`)

▸ **Created**(`AssetId`, `AccountId`, `AssetOptions`)
-   Asset created (asset_id, creator, asset_options).

▸ **Minted**(`AssetId`, `AccountId`, `Balance`)

▸ **PermissionUpdated**(`AssetId`, `PermissionLatest`)

▸ **Transferred**(`AssetId`, `AccountId`, `AccountId`, `Balance`)
-   Asset transfer succeeded (asset_id, from, to, amount).
 
___
 <a name=grandpa></a>
 

### grandpa

▸ **NewAuthorities**(`Vec<(SessionKey,u64)>`)
-   New authority set has been applied.
 
___
 <a name=indices></a>
 

### indices

▸ **NewAccountIndex**(`AccountId`, `AccountIndex`)
-   A new account index was assigned.   This event is not triggered when an existing index is reassigned  to another `AccountId`.
 
___
 <a name=session></a>
 

### session

▸ **NewSession**(`BlockNumber`)
-   New session has happened. Note that the argument is the session index, not the block  number as the type might suggest.
 
___
 <a name=staking></a>
 

### staking

▸ **OfflineSlash**(`AccountId`, `Balance`)
-   One validator (and its nominators) has been slashed by the given amount.

▸ **OfflineWarning**(`AccountId`, `u32`)
-   One validator (and its nominators) has been given an offline-warning (it is still  within its grace). The accrued number of slashes is recorded, too.

▸ **Reward**(`Balance`)
-   All validators have been rewarded by the given balance.
 
___
 <a name=sudo></a>
 

### sudo

▸ **KeyChanged**(`AccountId`)
-   The sudoer just switched identity; the old key is supplied.

▸ **Sudid**(`bool`)
-   A sudo just took place.
 
___
 <a name=syloDevice></a>
 

### syloDevice

▸ **DeviceAdded**(`AccountId`, `Hash`, `u32`)
 
___
 <a name=syloE2Ee></a>
 

### syloE2Ee

▸ **DeviceAdded**(`AccountId`, `u32`)
 
___
 <a name=system></a>
 

### system

▸ **ExtrinsicFailed**()
-   An extrinsic failed.

▸ **ExtrinsicSuccess**()
-   An extrinsic completed successfully.
 
___
 <a name=treasury></a>
 

### treasury

▸ **Awarded**(`ProposalIndex`, `Balance`, `AccountId`)
-   Some funds have been allocated.

▸ **Burnt**(`Balance`)
-   Some of our funds have been burnt.

▸ **Proposed**(`ProposalIndex`)
-   New proposal.

▸ **Rollover**(`Balance`)
-   Spending has finished; this is the amount that rolls over until next spend.

▸ **Spending**(`Balance`)
-   We have ended a spend period and will now allocate funds.
