## Extrinsics

The following sections contain Extrinsics methods are part of the default Substrate runtime. On the api, these are exposed via `api.tx.<module>.<method>`. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[attestation](#attestation)**

- **[authorship](#authorship)**

- **[babe](#babe)**

- **[cennzx](#cennzx)**

- **[finalityTracker](#finalitytracker)**

- **[genericAsset](#genericasset)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[multisig](#multisig)**

- **[rewards](#rewards)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[syloE2Ee](#syloe2ee)**

- **[syloGroups](#sylogroups)**

- **[syloInbox](#syloinbox)**

- **[syloPayment](#sylopayment)**

- **[syloResponse](#syloresponse)**

- **[syloVault](#sylovault)**

- **[system](#system)**

- **[timestamp](#timestamp)**

- **[treasury](#treasury)**

- **[utility](#utility)**


___


## attestation
 
### removeClaim(holder: `AccountId`, topic: `AttestationTopic`)
- **interface**: `api.tx.attestation.removeClaim`
- **summary**:   Remove a claim, only the original issuer can remove a claim If the `issuer` has not yet issued a claim of `topic`, this function will return error. 
 
### setClaim(holder: `AccountId`, topic: `AttestationTopic`, value: `AttestationValue`)
- **interface**: `api.tx.attestation.setClaim`
- **summary**:   Create or update an existing claim The `issuer` of the claim comes from the extrinsic `origin` The `topic` and `value` are both U256 which can hold any 32-byte encoded data. 

___


## authorship
 
### setUncles(new_uncles: `Vec<Header>`)
- **interface**: `api.tx.authorship.setUncles`
- **summary**:   Provide a set of uncles. 

___


## babe
 
### reportEquivocation(equivocation_proof: `BabeEquivocationProof`, key_owner_proof: `KeyOwnerProof`)
- **interface**: `api.tx.babe.reportEquivocation`
- **summary**:   Report authority equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. 
 
### reportEquivocationUnsigned(equivocation_proof: `BabeEquivocationProof`, key_owner_proof: `KeyOwnerProof`)
- **interface**: `api.tx.babe.reportEquivocationUnsigned`
- **summary**:   Report authority equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. This extrinsic must be called unsigned and it is expected that only block authors will call it (validated in `ValidateUnsigned`), as such if the block author is defined it will be defined as the equivocation reporter. 

___


## cennzx
 
### addLiquidity(asset_id: `Compact<AssetId>`, min_liquidity: `Compact<BalanceOf>`, max_asset_amount: `Compact<BalanceOf>`, core_amount: `Compact<BalanceOf>`)
- **interface**: `api.tx.cennzx.addLiquidity`
- **summary**:   Deposit core asset and trade asset at current ratio to mint liquidity Returns amount of liquidity minted. 

  `origin` `asset_id` - The trade asset ID `min_liquidity` - The minimum liquidity to add `asset_amount` - Amount of trade asset to add `core_amount` - Amount of core asset to add 
 
### buyAsset(recipient: `Option<AccountId>`, asset_to_sell: `Compact<AssetId>`, asset_to_buy: `Compact<AssetId>`, buy_amount: `Compact<BalanceOf>`, maximum_sell: `Compact<BalanceOf>`)
- **interface**: `api.tx.cennzx.buyAsset`
- **summary**:   Buy `asset_to_buy` with `asset_to_sell`. Caller specifies an exact `buy_amount` and a `maximum_sell` amount to pay. 

  `recipient` - Account to receive assets, defaults to `origin` if None `asset_to_sell` - asset ID to sell `asset_to_buy` - asset ID to buy `buy_amount` - The amount of `asset_to_buy` to receive `maximum_sell` - Maximum `asset_to_sell` caller should pay 
 
### removeLiquidity(asset_id: `Compact<AssetId>`, liquidity_to_withdraw: `Compact<BalanceOf>`, min_asset_withdraw: `Compact<BalanceOf>`, min_core_withdraw: `Compact<BalanceOf>`)
- **interface**: `api.tx.cennzx.removeLiquidity`
- **summary**:   Burn exchange assets to withdraw core asset and trade asset at current ratio 

  `asset_id` - The trade asset ID `liquidity_to_withdraw` - Amount of user's liquidity to withdraw `min_asset_withdraw` - The minimum trade asset withdrawn `min_core_withdraw` -  The minimum core asset withdrawn 
 
### sellAsset(recipient: `Option<AccountId>`, asset_to_sell: `Compact<AssetId>`, asset_to_buy: `Compact<AssetId>`, sell_amount: `Compact<BalanceOf>`, minimum_buy: `Compact<BalanceOf>`)
- **interface**: `api.tx.cennzx.sellAsset`
- **summary**:   Sell `asset_to_sell` for `asset_to_buy`. Caller specifies an exact `sell_amount` and a `minimum_buy` amount to receive. 

  `recipient` - Account to receive assets, defaults to `origin` if None `asset_to_sell` - asset ID to sell `asset_to_buy` - asset ID to buy `sell_amount` - The amount of `asset_to_sell` the caller should pay `minimum_buy` - The minimum `asset_to_buy` to receive 
 
### setFeeRate(new_fee_rate: `FeeRate`)
- **interface**: `api.tx.cennzx.setFeeRate`
- **summary**:   Set the spot exchange wide fee rate (root only) 

___


## finalityTracker
 
### finalHint(hint: `Compact<BlockNumber>`)
- **interface**: `api.tx.finalityTracker.finalHint`
- **summary**:   Hint that the author of this block thinks the best finalized block is the given number. 

___


## genericAsset
 
### burn(asset_id: `Compact<AssetId>`, target: `AccountId`, amount: `Balance`)
- **interface**: `api.tx.genericAsset.burn`
- **summary**:   Burns an asset, decreases its total issuance. Deduct the money from target account The `origin` must have `burn` permissions. 

  Weights: O(1) Limited number of reads/writes. 
 
### create(owner: `AccountId`, options: `AssetOptions`, info: `AssetInfo`)
- **interface**: `api.tx.genericAsset.create`
- **summary**:   Create a new kind of asset and nominates the owner of this asset. The asset_id will be the next unoccupied asset_id Accounts who will have the permissions to mint/burn/change permission are passed in via 'options' origin of this call must be root. 

  Weights: O(1) Limited number of read and writes. Should not be called often. 
 
### createReserved(asset_id: `AssetId`, options: `AssetOptions`, info: `AssetInfo`)
- **interface**: `api.tx.genericAsset.createReserved`
- **summary**:   Create a new asset with reserved asset_id. Internally calls create_asset with an asset_id Requires Root call. 

  Weights: O(1) Limited read/writes 
 
### mint(asset_id: `Compact<AssetId>`, to: `AccountId`, amount: `Balance`)
- **interface**: `api.tx.genericAsset.mint`
- **summary**:   Mints an asset, increases its total issuance. Deposits the newly minted currency into target account The origin must have `mint` permissions. 

  Weights: O(1) limited number of read/writes 
 
### transfer(asset_id: `Compact<AssetId>`, to: `AccountId`, amount: `Compact<Balance>`)
- **interface**: `api.tx.genericAsset.transfer`
- **summary**:   Transfer some liquid free balance to another account. 

  `transfer` will set the `FreeBalance` of the sender and receiver. It will decrease the total issuance of the system by the `TransferFee`. If the sender's account is below the existential deposit as a result of the transfer, the account will be reaped. 

  The dispatch origin for this call must be `Signed` by the transactor. 

  \# \<weight>

   

  - Dependent on arguments but not critical, given proper implementations for  input config types. See related functions below. 

  - It contains a limited number of reads and writes internally and no complex computation.

  

  \# \</weight> 
 
### updateAssetInfo(asset_id: `Compact<AssetId>`, info: `AssetInfo`)
- **interface**: `api.tx.genericAsset.updateAssetInfo`
- **summary**:   Updates asset info for a given `asset_id`. 

  The `origin` must have `update` permission. 

  weights: O(1) limited number of read and writes Expected to not be called frequently 
 
### updatePermission(asset_id: `Compact<AssetId>`, new_permission: `PermissionLatest`)
- **interface**: `api.tx.genericAsset.updatePermission`
- **summary**:   Updates permissions(mint/burn/change permission) for a given `asset_id` and an account. 

  The `origin` must have `update` permission. 

  weights: O(1) limited number of read and writes Expected to not be called frequently 

___


## grandpa
 
### noteStalled(delay: `BlockNumber`, best_finalized_block_number: `BlockNumber`)
- **interface**: `api.tx.grandpa.noteStalled`
- **summary**:   Note that the current authority set of the GRANDPA finality gadget has stalled. This will trigger a forced authority set change at the beginning of the next session, to be enacted `delay` blocks after that. The delay should be high enough to safely assume that the block signalling the forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters will start the new authority set using the given finalized block as base. Only callable by root. 
 
### reportEquivocation(equivocation_proof: `GrandpaEquivocationProof`, key_owner_proof: `KeyOwnerProof`)
- **interface**: `api.tx.grandpa.reportEquivocation`
- **summary**:   Report voter equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. 
 
### reportEquivocationUnsigned(equivocation_proof: `GrandpaEquivocationProof`, key_owner_proof: `KeyOwnerProof`)
- **interface**: `api.tx.grandpa.reportEquivocationUnsigned`
- **summary**:   Report voter equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. 

  This extrinsic must be called unsigned and it is expected that only block authors will call it (validated in `ValidateUnsigned`), as such if the block author is defined it will be defined as the equivocation reporter. 

___


## identity
 
### addRegistrar(account: `AccountId`)
- **interface**: `api.tx.identity.addRegistrar`
- **summary**:   Add a registrar to the system. 

  The dispatch origin for this call must be `T::RegistrarOrigin`. 

  - `account`: the account of the registrar. 

  Emits `RegistrarAdded` if successful. 

  \# \<weight>

   

  - `O(R)` where `R` registrar-count (governance-bounded and code-bounded).

  - One storage mutation (codec `O(R)`).

  - One event.

  \# \</weight> 
 
### addSub(sub: `LookupSource`, data: `Data`)
- **interface**: `api.tx.identity.addSub`
- **summary**:   Add the given account to the sender's subs. 

  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated to the sender. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered sub identity of `sub`. 
 
### cancelRequest(reg_index: `RegistrarIndex`)
- **interface**: `api.tx.identity.cancelRequest`
- **summary**:   Cancel a previous request. 

  Payment: A previously reserved deposit is returned on success. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  - `reg_index`: The index of the registrar whose judgement is no longer requested. 

  Emits `JudgementUnrequested` if successful. 

  \# \<weight>

   

  - `O(R + X)`.

  - One balance-reserve operation.

  - One storage mutation `O(R + X)`.

  - One event

  \# \</weight> 
 
### clearIdentity()
- **interface**: `api.tx.identity.clearIdentity`
- **summary**:   Clear an account's identity info and all sub-accounts and return all deposits. 

  Payment: All reserved balances on the account are returned. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  Emits `IdentityCleared` if successful. 

  \# \<weight>

   

  - `O(R + S + X)`

    - where `R` registrar-count (governance-bounded).

    - where `S` subs-count (hard- and deposit-bounded).

    - where `X` additional-field-count (deposit-bounded and code-bounded).

  - One balance-unreserve operation.

  - `2` storage reads and `S + 2` storage deletions.

  - One event.

  \# \</weight> 
 
### killIdentity(target: `LookupSource`)
- **interface**: `api.tx.identity.killIdentity`
- **summary**:   Remove an account's identity and sub-account information and slash the deposits. 

  Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by `Slash`. Verification request deposits are not returned; they should be cancelled manually using `cancel_request`. 

  The dispatch origin for this call must match `T::ForceOrigin`. 

  - `target`: the account whose identity the judgement is upon. This must be an account   with a registered identity. 

  Emits `IdentityKilled` if successful. 

  \# \<weight>

   

  - `O(R + S + X)`.

  - One balance-reserve operation.

  - `S + 2` storage mutations.

  - One event.

  \# \</weight> 
 
### provideJudgement(reg_index: `Compact<RegistrarIndex>`, target: `LookupSource`, judgement: `IdentityJudgement`)
- **interface**: `api.tx.identity.provideJudgement`
- **summary**:   Provide a judgement for an account's identity. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `reg_index`. 

  - `reg_index`: the index of the registrar whose judgement is being made. 

  - `target`: the account whose identity the judgement is upon. This must be an account  with a registered identity. 

  - `judgement`: the judgement of the registrar of index `reg_index` about `target`.

  Emits `JudgementGiven` if successful. 

  \# \<weight>

   

  - `O(R + X)`.

  - One balance-transfer operation.

  - Up to one account-lookup operation.

  - Storage: 1 read `O(R)`, 1 mutate `O(R + X)`.

  - One event.

  \# \</weight> 
 
### quitSub()
- **interface**: `api.tx.identity.quitSub`
- **summary**:   Remove the sender as a sub-account. 

  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated to the sender (*not* the original depositor). 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered super-identity. 

  NOTE: This should not normally be used, but is provided in the case that the non- controller of an account is maliciously registered as a sub-account. 
 
### removeSub(sub: `LookupSource`)
- **interface**: `api.tx.identity.removeSub`
- **summary**:   Remove the given account from the sender's subs. 

  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated to the sender. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered sub identity of `sub`. 
 
### renameSub(sub: `LookupSource`, data: `Data`)
- **interface**: `api.tx.identity.renameSub`
- **summary**:   Alter the associated name of the given sub-account. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered sub identity of `sub`. 
 
### requestJudgement(reg_index: `Compact<RegistrarIndex>`, max_fee: `Compact<BalanceOf>`)
- **interface**: `api.tx.identity.requestJudgement`
- **summary**:   Request a judgement from a registrar. 

  Payment: At most `max_fee` will be reserved for payment to the registrar if judgement given. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  - `reg_index`: The index of the registrar whose judgement is requested. 

  - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:

  ```nocompile Self::registrars().get(reg_index).unwrap().fee ``` 

  Emits `JudgementRequested` if successful. 

  \# \<weight>

   

  - `O(R + X)`.

  - One balance-reserve operation.

  - Storage: 1 read `O(R)`, 1 mutate `O(X + R)`.

  - One event.

  \# \</weight> 
 
### setAccountId(index: `Compact<RegistrarIndex>`, new: `AccountId`)
- **interface**: `api.tx.identity.setAccountId`
- **summary**:   Change the account associated with a registrar. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `index`. 

  - `index`: the index of the registrar whose fee is to be set. 

  - `new`: the new account ID.

  \# \<weight>

   

  - `O(R)`.

  - One storage mutation `O(R)`.

  - Benchmark: 8.823 + R * 0.32 µs (min squares analysis)

  \# \</weight> 
 
### setFee(index: `Compact<RegistrarIndex>`, fee: `Compact<BalanceOf>`)
- **interface**: `api.tx.identity.setFee`
- **summary**:   Set the fee required for a judgement to be requested from a registrar. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `index`. 

  - `index`: the index of the registrar whose fee is to be set. 

  - `fee`: the new fee.

  \# \<weight>

   

  - `O(R)`.

  - One storage mutation `O(R)`.

  - Benchmark: 7.315 + R * 0.329 µs (min squares analysis)

  \# \</weight> 
 
### setFields(index: `Compact<RegistrarIndex>`, fields: `IdentityFields`)
- **interface**: `api.tx.identity.setFields`
- **summary**:   Set the field information for a registrar. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `index`. 

  - `index`: the index of the registrar whose fee is to be set. 

  - `fields`: the fields that the registrar concerns themselves with.

  \# \<weight>

   

  - `O(R)`.

  - One storage mutation `O(R)`.

  - Benchmark: 7.464 + R * 0.325 µs (min squares analysis)

  \# \</weight> 
 
### setIdentity(info: `IdentityInfo`)
- **interface**: `api.tx.identity.setIdentity`
- **summary**:   Set an account's identity information and reserve the appropriate deposit. 

  If the account already has identity information, the deposit is taken as part payment for the new deposit. 

  The dispatch origin for this call must be _Signed_. 

  - `info`: The identity information. 

  Emits `IdentitySet` if successful. 

  \# \<weight>

   

  - `O(X + X' + R)`

    - where `X` additional-field-count (deposit-bounded and code-bounded)

    - where `R` judgements-count (registrar-count-bounded)

  - One balance reserve operation.

  - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).

  - One event.

  \# \</weight> 
 
### setSubs(subs: `Vec<(AccountId,Data)>`)
- **interface**: `api.tx.identity.setSubs`
- **summary**:   Set the sub-accounts of the sender. 

  Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned and an amount `SubAccountDeposit` will be reserved for each item in `subs`. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  - `subs`: The identity's (new) sub-accounts. 

  \# \<weight>

   

  - `O(P + S)`

    - where `P` old-subs-count (hard- and deposit-bounded).

    - where `S` subs-count (hard- and deposit-bounded).

  - At most one balance operations.

  - DB:

    - `P + S` storage mutations (codec complexity `O(1)`)

    - One storage read (codec complexity `O(P)`).

    - One storage write (codec complexity `O(S)`).

    - One storage-exists (`IdentityOf::contains_key`).

  \# \</weight> 

___


## imOnline
 
### heartbeat(heartbeat: `Heartbeat`, _signature: `Signature`)
- **interface**: `api.tx.imOnline.heartbeat`
- **summary**:   \# \<weight>

   

  - Complexity: `O(K + E)` where K is length of `Keys` (heartbeat.validators_len)  and E is length of `heartbeat.network_state.external_address` 

    - `O(K)`: decoding of length `K`

    - `O(E)`: decoding/encoding of length `E`

  - DbReads: pallet_session `Validators`, pallet_session `CurrentIndex`, `Keys`,  `ReceivedHeartbeats` 

  - DbWrites: `ReceivedHeartbeats`

  \# \</weight> 

___


## multisig
 
### approveAsMulti(threshold: `u16`, other_signatories: `Vec<AccountId>`, maybe_timepoint: `Option<Timepoint>`, call_hash: `[u8;32]`, max_weight: `Weight`)
- **interface**: `api.tx.multisig.approveAsMulti`
- **summary**:   Register approval for a dispatch to be made from a deterministic composite account if approved by a total of `threshold - 1` of `other_signatories`. 

  Payment: `DepositBase` will be reserved if this is the first approval, plus `threshold` times `DepositFactor`. It is returned once this dispatch happens or is cancelled. 

  The dispatch origin for this call must be _Signed_. 

  - `threshold`: The total number of approvals for this dispatch before it is executed. 

  - `other_signatories`: The accounts (other than the sender) who can approve thisdispatch. May not be empty. 

  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it isnot the first approval, then it must be `Some`, with the timepoint (block number and transaction index) of the first approval transaction. 

  - `call_hash`: The hash of the call to be executed.

  NOTE: If this is the final approval, you will want to use `as_multi` instead. 

  \# \<weight>

   

  - `O(S)`.

  - Up to one balance-reserve or unreserve operation.

  - One passthrough operation, one insert, both `O(S)` where `S` is the number of  signatories. `S` is capped by `MaxSignatories`, with weight being proportional. 

  - One encode & hash, both of complexity `O(S)`.

  - Up to one binary search and insert (`O(logS + S)`).

  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.

  - One event.

  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a  deposit taken for its lifetime of   `DepositBase + threshold * DepositFactor`. 

  ----------------------------------

  - DB Weight:

      - Read: Multisig Storage, [Caller Account]

      - Write: Multisig Storage, [Caller Account]

  \# \</weight> 
 
### asMulti(threshold: `u16`, other_signatories: `Vec<AccountId>`, maybe_timepoint: `Option<Timepoint>`, call: `OpaqueCall`, store_call: `bool`, max_weight: `Weight`)
- **interface**: `api.tx.multisig.asMulti`
- **summary**:   Register approval for a dispatch to be made from a deterministic composite account if approved by a total of `threshold - 1` of `other_signatories`. 

  If there are enough, then dispatch the call. 

  Payment: `DepositBase` will be reserved if this is the first approval, plus `threshold` times `DepositFactor`. It is returned once this dispatch happens or is cancelled. 

  The dispatch origin for this call must be _Signed_. 

  - `threshold`: The total number of approvals for this dispatch before it is executed. 

  - `other_signatories`: The accounts (other than the sender) who can approve thisdispatch. May not be empty. 

  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it isnot the first approval, then it must be `Some`, with the timepoint (block number and transaction index) of the first approval transaction. 

  - `call`: The call to be executed.

  NOTE: Unless this is the final approval, you will generally want to use `approve_as_multi` instead, since it only requires a hash of the call. 

  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise on success, result is `Ok` and the result from the interior call, if it was executed, may be found in the deposited `MultisigExecuted` event. 

  \# \<weight>

   

  - `O(S + Z + Call)`.

  - Up to one balance-reserve or unreserve operation.

  - One passthrough operation, one insert, both `O(S)` where `S` is the number of  signatories. `S` is capped by `MaxSignatories`, with weight being proportional. 

  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.

  - One encode & hash, both of complexity `O(S)`.

  - Up to one binary search and insert (`O(logS + S)`).

  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.

  - One event.

  - The weight of the `call`.

  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a  deposit taken for its lifetime of   `DepositBase + threshold * DepositFactor`. 

  -------------------------------

  - DB Weight:

      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)

      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)

  - Plus Call Weight

  \# \</weight> 
 
### asMultiThreshold1(other_signatories: `Vec<AccountId>`, call: `Call`)
- **interface**: `api.tx.multisig.asMultiThreshold1`
- **summary**:   Immediately dispatch a multi-signature call using a single approval from the caller. 

  The dispatch origin for this call must be _Signed_. 

  - `other_signatories`: The accounts (other than the sender) who are part of the multi-signature, but do not participate in the approval process. 

  - `call`: The call to be executed.

  Result is equivalent to the dispatched result. 

  \# \<weight>

   O(Z + C) where Z is the length of the call and C its execution weight. 

  -------------------------------

  - DB Weight: None

  - Plus Call Weight

  \# \</weight> 
 
### cancelAsMulti(threshold: `u16`, other_signatories: `Vec<AccountId>`, timepoint: `Timepoint`, call_hash: `[u8;32]`)
- **interface**: `api.tx.multisig.cancelAsMulti`
- **summary**:   Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously for this operation will be unreserved on success. 

  The dispatch origin for this call must be _Signed_. 

  - `threshold`: The total number of approvals for this dispatch before it is executed. 

  - `other_signatories`: The accounts (other than the sender) who can approve thisdispatch. May not be empty. 

  - `timepoint`: The timepoint (block number and transaction index) of the first approvaltransaction for this dispatch. 

  - `call_hash`: The hash of the call to be executed.

  \# \<weight>

   

  - `O(S)`.

  - Up to one balance-reserve or unreserve operation.

  - One passthrough operation, one insert, both `O(S)` where `S` is the number of  signatories. `S` is capped by `MaxSignatories`, with weight being proportional. 

  - One encode & hash, both of complexity `O(S)`.

  - One event.

  - I/O: 1 read `O(S)`, one remove.

  - Storage: removes one item.

  ----------------------------------

  - DB Weight:

      - Read: Multisig Storage, [Caller Account], Refund Account, Calls

      - Write: Multisig Storage, [Caller Account], Refund Account, Calls

  \# \</weight> 

___


## rewards
 
### setDevelopmentFundTake(new_take_percent: `u32`)
- **interface**: `api.tx.rewards.setDevelopmentFundTake`
- **summary**:   Set the development fund take %, capped at 100%. 
 
### setInflationRate(numerator: `i64`, denominator: `i64`)
- **interface**: `api.tx.rewards.setInflationRate`
- **summary**:   Set the per payout inflation rate (`numerator` / `denominator`) (it may be negative) 

___


## scheduler
 
### cancel(when: `BlockNumber`, index: `u32`)
- **interface**: `api.tx.scheduler.cancel`
- **summary**:   Cancel an anonymously scheduled task. 

  \# \<weight>

   

  - S = Number of already scheduled calls

  - Base Weight: 22.15 + 2.869 * S µs

  - DB Weight:

      - Read: Agenda

      - Write: Agenda, Lookup

  - Will use base weight of 100 which should be good for up to 30 scheduled calls

  \# \</weight> 
 
### cancelNamed(id: `Bytes`)
- **interface**: `api.tx.scheduler.cancelNamed`
- **summary**:   Cancel a named scheduled task. 

  \# \<weight>

   

  - S = Number of already scheduled calls

  - Base Weight: 24.91 + 2.907 * S µs

  - DB Weight:

      - Read: Agenda, Lookup

      - Write: Agenda, Lookup

  - Will use base weight of 100 which should be good for up to 30 scheduled calls

  \# \</weight> 
 
### schedule(when: `BlockNumber`, maybe_periodic: `Option<Period>`, priority: `Priority`, call: `Call`)
- **interface**: `api.tx.scheduler.schedule`
- **summary**:   Anonymously schedule a task. 

  \# \<weight>

   

  - S = Number of already scheduled calls

  - Base Weight: 22.29 + .126 * S µs

  - DB Weight:

      - Read: Agenda

      - Write: Agenda

  - Will use base weight of 25 which should be good for up to 30 scheduled calls

  \# \</weight> 
 
### scheduleAfter(after: `BlockNumber`, maybe_periodic: `Option<Period>`, priority: `Priority`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleAfter`
- **summary**:   Anonymously schedule a task after a delay. 

  \# \<weight>

   Same as [`schedule`]. 

  \# \</weight> 
 
### scheduleNamed(id: `Bytes`, when: `BlockNumber`, maybe_periodic: `Option<Period>`, priority: `Priority`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleNamed`
- **summary**:   Schedule a named task. 

  \# \<weight>

   

  - S = Number of already scheduled calls

  - Base Weight: 29.6 + .159 * S µs

  - DB Weight:

      - Read: Agenda, Lookup

      - Write: Agenda, Lookup

  - Will use base weight of 35 which should be good for more than 30 scheduled calls

  \# \</weight> 
 
### scheduleNamedAfter(id: `Bytes`, after: `BlockNumber`, maybe_periodic: `Option<Period>`, priority: `Priority`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleNamedAfter`
- **summary**:   Schedule a named task after a delay. 

  \# \<weight>

   Same as [`schedule_named`]. 

  \# \</weight> 

___


## session
 
### purgeKeys()
- **interface**: `api.tx.session.purgeKeys`
- **summary**:   Removes any session key(s) of the function caller. This doesn't take effect until the next session. 

  The dispatch origin of this function must be signed. 

  \# \<weight>

   

  - Complexity: `O(1)` in number of key types.  Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed. 

  - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`

  - DbWrites: `NextKeys`, `origin account`

  - DbWrites per key id: `KeyOwnder`

  \# \</weight> 
 
### setKeys(keys: `Keys`, proof: `Bytes`)
- **interface**: `api.tx.session.setKeys`
- **summary**:   Sets the session key(s) of the function caller to `keys`. Allows an account to set its session key prior to becoming a validator. This doesn't take effect until the next session. 

  The dispatch origin of this function must be signed. 

  \# \<weight>

   

  - Complexity: `O(1)`  Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed. 

  - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`

  - DbWrites: `origin account`, `NextKeys`

  - DbReads per key id: `KeyOwner`

  - DbWrites per key id: `KeyOwner`

  \# \</weight> 

___


## staking
 
### bond(controller: `AccountId`, value: `Compact<BalanceOf>`, payee: `RewardDestination`)
- **interface**: `api.tx.staking.bond`
- **summary**:   Take the origin account as a stash and lock up `value` of its balance. `controller` will be the account that controls it. 

  `value` must be more than the `minimum_bond` specified in genesis config. 

  The dispatch origin for this call must be _Signed_ by the stash account. 

  \# \<weight>

   

  - Independent of the arguments. Moderate complexity.

  - O(1).

  - Three extra DB entries.

  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless the `origin` falls below minimum bond and is removed lazily in `withdraw_unbonded`. 

  \# \</weight> 
 
### bondExtra(max_additional: `Compact<BalanceOf>`)
- **interface**: `api.tx.staking.bondExtra`
- **summary**:   Add some extra amount that have appeared in the stash `free_balance` into the balance up for staking. 

  Use this if there are additional funds in your stash account that you wish to bond. Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount that can be added. 

  The dispatch origin for this call must be _Signed_ by the stash, not the controller. 

  \# \<weight>

   

  - Independent of the arguments. Insignificant complexity.

  - O(1).

  - One DB entry.

  \# \</weight> 
 
### cancelDeferredSlash(era: `EraIndex`, slash_indices: `Vec<u32>`)
- **interface**: `api.tx.staking.cancelDeferredSlash`
- **summary**:   Cancel enactment of a deferred slash. Can be called by root origin passing the era and indices of the slashes for that era to kill. 

  \# \<weight>

   

  - One storage write.

  \# \</weight> 
 
### chill()
- **interface**: `api.tx.staking.chill`
- **summary**:   Declare no desire to either validate or nominate. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

  \# \<weight>

   

  - Independent of the arguments. Insignificant complexity.

  - Contains one read.

  - Writes are limited to the `origin` account key.

  \# \</weight> 
 
### forceNewEra()
- **interface**: `api.tx.staking.forceNewEra`
- **summary**:   Force there to be a new era at the end of the next session. After this, it will be reset to normal (non-forced) behaviour. 

  \# \<weight>

   

  - No arguments.

  \# \</weight> 
 
### forceNewEraAlways()
- **interface**: `api.tx.staking.forceNewEraAlways`
- **summary**:   Force there to be a new era at the end of sessions indefinitely. 

  \# \<weight>

   

  - One storage write

  \# \</weight> 
 
### forceNoEras()
- **interface**: `api.tx.staking.forceNoEras`
- **summary**:   Force there to be no new eras indefinitely. 

  \# \<weight>

   

  - No arguments.

  \# \</weight> 
 
### forceUnstake(stash: `AccountId`)
- **interface**: `api.tx.staking.forceUnstake`
- **summary**:   Force a current staker to become completely unstaked, immediately. 
 
### nominate(targets: `Vec<AccountId>`)
- **interface**: `api.tx.staking.nominate`
- **summary**:   Declare the desire to nominate `targets` for the origin controller. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

  \# \<weight>

   

  - The transaction's complexity is proportional to the size of `targets`,which is capped at `MAX_NOMINATIONS`. 

  - Both the reads and writes follow a similar pattern.

  \# \</weight> 
 
### reapStash(stash: `AccountId`)
- **interface**: `api.tx.staking.reapStash`
- **summary**:   Remove all data structure concerning a staker/stash once its balance is zero. This is essentially equivalent to `withdraw_unbonded` except it can be called by anyone and the target `stash` must have no funds left. 

  This can be called from any origin. 

  - `stash`: The stash account to reap. Its balance must be zero. 

  \# \<weight>

   Complexity: O(S) where S is the number of slashing spans on the account. DB Weight: 

  - Reads: Stash Account, Bonded, Slashing Spans, Locks

  - Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators, Stash Account, Locks

  - Writes Each: SpanSlash * S

  \# \</weight> 
 
### rebond(value: `Compact<BalanceOf>`)
- **interface**: `api.tx.staking.rebond`
- **summary**:   Rebond a portion of the stash scheduled to be unlocked. 

  \# \<weight>

   

  - Time complexity: O(1). Bounded by `MAX_UNLOCKING_CHUNKS`.

  - Storage changes: Can't increase storage, only decrease it.

  \# \</weight> 
 
### setController(controller: `AccountId`)
- **interface**: `api.tx.staking.setController`
- **summary**:   (Re-)set the controller of a stash. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the stash, not the controller. 

  \# \<weight>

   

  - Independent of the arguments. Insignificant complexity.

  - Contains a limited number of reads.

  - Writes are limited to the `origin` account key.

  \# \</weight> 
 
### setInvulnerables(validators: `Vec<AccountId>`)
- **interface**: `api.tx.staking.setInvulnerables`
- **summary**:   Set the validators who cannot be slashed (if any). 
 
### setMinimumBond(value: `BalanceOf`)
- **interface**: `api.tx.staking.setMinimumBond`
- **summary**:   Set the minimum bond amount. 
 
### setPayee(payee: `RewardDestination`)
- **interface**: `api.tx.staking.setPayee`
- **summary**:   (Re-)set the payment target for a controller. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

  \# \<weight>

   

  - Independent of the arguments. Insignificant complexity.

  - Contains a limited number of reads.

  - Writes are limited to the `origin` account key.

  \# \</weight> 
 
### setValidatorCount(new: `Compact<u32>`)
- **interface**: `api.tx.staking.setValidatorCount`
- **summary**:   The ideal number of validators. 
 
### unbond(value: `Compact<BalanceOf>`)
- **interface**: `api.tx.staking.unbond`
- **summary**:   Schedule a portion of the stash to be unlocked ready for transfer out after the bond period ends. If this leaves an amount actively bonded less than T::Currency::minimum_balance(), then it is increased to the full amount. 

  Once the unlock period is done, you can call `withdraw_unbonded` to actually move the funds out of management ready for transfer. 

  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`) can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need to be called first to remove some of the chunks (if possible). 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

  See also [`Call::withdraw_unbonded`]. 

  \# \<weight>

   

  - Independent of the arguments. Limited but potentially exploitable complexity.

  - Contains a limited number of reads.

  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)  will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.   The only way to clean the aforementioned storage item is also user-controlled via `withdraw_unbonded`. 

  - One DB entry.</weight> 
 
### validate(prefs: `ValidatorPrefs`)
- **interface**: `api.tx.staking.validate`
- **summary**:   Declare the desire to validate for the origin controller. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

  \# \<weight>

   

  - Independent of the arguments. Insignificant complexity.

  - Contains a limited number of reads.

  - Writes are limited to the `origin` account key.

  \# \</weight> 
 
### withdrawUnbonded()
- **interface**: `api.tx.staking.withdrawUnbonded`
- **summary**:   Remove any unlocked chunks from the `unlocking` queue from our management. 

  This essentially frees up that balance to be used by the stash account to do whatever it wants. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

  See also [`Call::unbond`]. 

  \# \<weight>

   

  - Could be dependent on the `origin` argument and how much `unlocking` chunks exist. It implies `consolidate_unlocked` which loops over `Ledger.unlocking`, which is  indirectly user-controlled. See [`unbond`] for more detail. 

  - Contains a limited number of reads, yet the size of which could be large based on `ledger`.

  - Writes are limited to the `origin` account key.

  \# \</weight> 

___


## sudo
 
### setKey(new: `LookupSource`)
- **interface**: `api.tx.sudo.setKey`
- **summary**:   Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key. 

  The dispatch origin for this call must be _Signed_. 

  \# \<weight>

   

  - O(1).

  - Limited storage reads.

  - One DB change.

  \# \</weight> 
 
### sudo(call: `Call`)
- **interface**: `api.tx.sudo.sudo`
- **summary**:   Authenticates the sudo key and dispatches a function call with `Root` origin. 

  The dispatch origin for this call must be _Signed_. 

  \# \<weight>

   

  - O(1).

  - Limited storage reads.

  - One DB write (event).

  - Weight of derivative `call` execution + 10,000.

  \# \</weight> 
 
### sudoAs(who: `LookupSource`, call: `Call`)
- **interface**: `api.tx.sudo.sudoAs`
- **summary**:   Authenticates the sudo key and dispatches a function call with `Signed` origin from a given account. 

  The dispatch origin for this call must be _Signed_. 

  \# \<weight>

   

  - O(1).

  - Limited storage reads.

  - One DB write (event).

  - Weight of derivative `call` execution + 10,000.

  \# \</weight> 
 
### sudoUncheckedWeight(call: `Call`, _weight: `Weight`)
- **interface**: `api.tx.sudo.sudoUncheckedWeight`
- **summary**:   Authenticates the sudo key and dispatches a function call with `Root` origin. This function does not check the weight of the call, and instead allows the Sudo user to specify the weight of the call. 

  The dispatch origin for this call must be _Signed_. 

  \# \<weight>

   

  - O(1).

  - The weight of this call is defined by the caller.

  \# \</weight> 

___


## syloE2Ee
 
### registerDevice(device_id: `DeviceId`, pkbs: `Vec<PreKeyBundle>`)
- **interface**: `api.tx.syloE2Ee.registerDevice`
- **summary**:   Register a new device for a user 

  weight: O(g) where g is the number of groups the user is in Multiple reads and writes depending on the user states. 
 
### replenishPkbs(device_id: `DeviceId`, pkbs: `Vec<PreKeyBundle>`)
- **interface**: `api.tx.syloE2Ee.replenishPkbs`
- **summary**:   Add a new PreKey bundle for a given user's device. 

  weight: O(1) 1 write. 
 
### withdrawPkbs(request_id: `Hash`, wanted_pkbs: `Vec<(AccountId,DeviceId)>`)
- **interface**: `api.tx.syloE2Ee.withdrawPkbs`
- **summary**:   Retrieve and remove the Prekey bundles of a given list of user accounts and devices 

  weight: O(n * k) where n is the size of input `wanted_pkbs`, and k is the number existing PKBS in the storage Number of read and write scaled by size of input 

___


## syloGroups
 
### acceptInvite(group_id: `Hash`, payload: `AcceptPayload`, invite_key: `H256`, inbox_id: `u32`, signature: `Signature`, group_data: `(VaultKey,VaultValue)`)
- **interface**: `api.tx.syloGroups.acceptInvite`
- **summary**:   Accept the invitation and add a user to the group 

  weight: O(n + m) where n is the number of groups, and m is the number of members in the group Limited number of read and writes to multiple tables 
 
### createGroup(group_id: `Hash`, meta: `Meta`, invites: `Vec<Invite>`, group_data: `(VaultKey,VaultValue)`)
- **interface**: `api.tx.syloGroups.createGroup`
- **summary**:   Creates a group with all invitees, set the caller as admin 

  weight: O(1). Note: number of member invitee is capped at 15, so equivalent to O(1). Limited number of storage writes. 
 
### createInvites(group_id: `Hash`, invites: `Vec<Invite>`)
- **interface**: `api.tx.syloGroups.createInvites`
- **summary**:   Send invites out to all the invitee 

  weight: O(n) where n is the number of invitee Limited number of read and writes 
 
### leaveGroup(group_id: `Hash`, group_key: `Option<VaultKey>`)
- **interface**: `api.tx.syloGroups.leaveGroup`
- **summary**:   Leaves a group. If no one is left at the group, delete the group 

  weight: O(m) where m is the number of members in that group Limited number of read and maximum of 2 storage writes. 
 
### revokeInvites(group_id: `Hash`, invite_keys: `Vec<H256>`)
- **interface**: `api.tx.syloGroups.revokeInvites`
- **summary**:   Revoke an invitation 

  weight: O(n) where n the number of existing invitation Limited number of read and writes 
 
### updateMember(group_id: `Hash`, meta: `Meta`)
- **interface**: `api.tx.syloGroups.updateMember`
- **summary**:   Update the metadata for the caller in a group 

  weight: O(m) where m is the number of members in that group Limited number of read and 1 write. 
 
### upsertGroupMeta(group_id: `Hash`, meta: `Meta`)
- **interface**: `api.tx.syloGroups.upsertGroupMeta`
- **summary**:   Merge/update/remove metadata for the group 

  weight: O(n) where n is the number of metadata key in the input Number of read and writes depending on input data 

___


## syloInbox
 
### addValue(peer_id: `AccountId`, value: `Message`)
- **interface**: `api.tx.syloInbox.addValue`
- **summary**:   Add a new value into storage 

  weight: O(1) 1 write 
 
### deleteValues(value_ids: `Vec<MessageId>`)
- **interface**: `api.tx.syloInbox.deleteValues`
- **summary**:   Delete a value from storage 

  weight: O(n) where n is number of values in the storage 1 write 

___


## syloPayment
 
### revokePaymentAccountSelf()
- **interface**: `api.tx.syloPayment.revokePaymentAccountSelf`
- **summary**:   If the origin of the call is an authorised payer, revoke its authorisation. NOTE: This may halt all Sylo operations if there are no other payers. 
 
### setPaymentAccount(account_id: `AccountId`)
- **interface**: `api.tx.syloPayment.setPaymentAccount`
- **summary**:   Add `account_id` as an authorized Sylo fee payer. Only Sudo can set a payment account. 

___


## syloResponse
 
### removeResponse(request_id: `Hash`)
- **interface**: `api.tx.syloResponse.removeResponse`
- **summary**:   Removes a response from a request. 

  weight: O(1) 1 write 

___


## syloVault
 
### deleteValues(keys: `Vec<VaultKey>`)
- **interface**: `api.tx.syloVault.deleteValues`
- **summary**:   Removes a vault key 

  weight: O(1) 1 write 
 
### upsertValue(key: `VaultKey`, value: `VaultValue`)
- **interface**: `api.tx.syloVault.upsertValue`
- **summary**:   Insert or update a vault Key 

  weight: O(1) 1 write 

___


## system
 
### fillBlock(_ratio: `Perbill`)
- **interface**: `api.tx.system.fillBlock`
- **summary**:   A dispatch that will fill the block weight up to the given ratio. 
 
### killPrefix(prefix: `Key`, _subkeys: `u32`)
- **interface**: `api.tx.system.killPrefix`
- **summary**:   Kill all storage items with a key that starts with the given prefix. 

  **NOTE:** We rely on the Root origin to provide us the number of subkeys under the prefix we are removing to accurately calculate the weight of this function. 

  \# \<weight>

   

  - `O(P)` where `P` amount of keys with prefix `prefix`

  - `P` storage deletions.

  - Base Weight: 0.834 * P µs

  - Writes: Number of subkeys + 1

  \# \</weight> 
 
### killStorage(keys: `Vec<Key>`)
- **interface**: `api.tx.system.killStorage`
- **summary**:   Kill some items from storage. 

  \# \<weight>

   

  - `O(IK)` where `I` length of `keys` and `K` length of one key

  - `I` storage deletions.

  - Base Weight: .378 * i µs

  - Writes: Number of items

  \# \</weight> 
 
### remark(_remark: `Bytes`)
- **interface**: `api.tx.system.remark`
- **summary**:   Make some on-chain remark. 

  \# \<weight>

   

  - `O(1)`

  - Base Weight: 0.665 µs, independent of remark length.

  - No DB operations.

  \# \</weight> 
 
### setChangesTrieConfig(changes_trie_config: `Option<ChangesTrieConfiguration>`)
- **interface**: `api.tx.system.setChangesTrieConfig`
- **summary**:   Set the new changes trie configuration. 

  \# \<weight>

   

  - `O(1)`

  - 1 storage write or delete (codec `O(1)`).

  - 1 call to `deposit_log`: Uses `append` API, so O(1)

  - Base Weight: 7.218 µs

  - DB Weight:

      - Writes: Changes Trie, System Digest

  \# \</weight> 
 
### setCode(code: `Bytes`)
- **interface**: `api.tx.system.setCode`
- **summary**:   Set the new runtime code. 

  \# \<weight>

   

  - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`

  - 1 storage write (codec `O(C)`).

  - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is expensive).

  - 1 event.The weight of this function is dependent on the runtime, but generally this is very expensive. We will treat this as a full block. 

  \# \</weight> 
 
### setCodeWithoutChecks(code: `Bytes`)
- **interface**: `api.tx.system.setCodeWithoutChecks`
- **summary**:   Set the new runtime code without doing any checks of the given `code`. 

  \# \<weight>

   

  - `O(C)` where `C` length of `code`

  - 1 storage write (codec `O(C)`).

  - 1 event.The weight of this function is dependent on the runtime. We will treat this as a full block. 

  \# \</weight> 
 
### setHeapPages(pages: `u64`)
- **interface**: `api.tx.system.setHeapPages`
- **summary**:   Set the number of pages in the WebAssembly environment's heap. 

  \# \<weight>

   

  - `O(1)`

  - 1 storage write.

  - Base Weight: 1.405 µs

  - 1 write to HEAP_PAGES

  \# \</weight> 
 
### setStorage(items: `Vec<KeyValue>`)
- **interface**: `api.tx.system.setStorage`
- **summary**:   Set some items of storage. 

  \# \<weight>

   

  - `O(I)` where `I` length of `items`

  - `I` storage writes (`O(1)`).

  - Base Weight: 0.568 * i µs

  - Writes: Number of items

  \# \</weight> 
 
### suicide()
- **interface**: `api.tx.system.suicide`
- **summary**:   Kill the sending account, assuming there are no references outstanding and the composite data is equal to its default value. 

  \# \<weight>

   

  - `O(1)`

  - 1 storage read and deletion.

  --------------------Base Weight: 8.626 µs No DB Read or Write operations because caller is already in overlay 

  \# \</weight> 

___


## timestamp
 
### set(now: `Compact<Moment>`)
- **interface**: `api.tx.timestamp.set`
- **summary**:   Set the current time. 

  This call should be invoked exactly once per block. It will panic at the finalization phase, if this call hasn't been invoked by that time. 

  The timestamp should be greater than the previous one by the amount specified by `MinimumPeriod`. 

  The dispatch origin for this call must be `Inherent`. 

  \# \<weight>

   

  - `O(T)` where `T` complexity of `on_timestamp_set`

  - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in `on_finalize`)

  - 1 event handler `on_timestamp_set` `O(T)`.

  \# \</weight> 

___


## treasury
 
### acceptCurator(bounty_id: `Compact<ProposalIndex>`)
- **interface**: `api.tx.treasury.acceptCurator`
- **summary**:   Accept the curator role for a bounty. A deposit will be reserved from curator and refund upon successful payout. 

  May only be called from the curator. 

  \# \<weight>

   

  - O(1).

  - Limited storage reads.

  - One DB change.

  \# \</weight> 
 
### approveBounty(bounty_id: `Compact<ProposalIndex>`)
- **interface**: `api.tx.treasury.approveBounty`
- **summary**:   Approve a bounty proposal. At a later time, the bounty will be funded and become active and the original deposit will be returned. 

  May only be called from `T::ApproveOrigin`. 

  \# \<weight>

   

  - O(1).

  - Limited storage reads.

  - One DB change.

  \# \</weight> 
 
### approveProposal(proposal_id: `Compact<ProposalIndex>`)
- **interface**: `api.tx.treasury.approveProposal`
- **summary**:   Approve a proposal. At a later time, the proposal will be allocated to the beneficiary and the original deposit will be returned. 

  May only be called from `T::ApproveOrigin`. 

  \# \<weight>

   

  - Complexity: O(1).

  - DbReads: `Proposals`, `Approvals`

  - DbWrite: `Approvals`

  \# \</weight> 
 
### awardBounty(bounty_id: `Compact<ProposalIndex>`, beneficiary: `LookupSource`)
- **interface**: `api.tx.treasury.awardBounty`
- **summary**:   Award bounty to a beneficiary account. The beneficiary will be able to claim the funds after a delay. 

  The dispatch origin for this call must be the curator of this bounty. 

  - `bounty_id`: Bounty ID to award. 

  - `beneficiary`: The beneficiary account whom will receive the payout.
 
### claimBounty(bounty_id: `Compact<BountyIndex>`)
- **interface**: `api.tx.treasury.claimBounty`
- **summary**:   Claim the payout from an awarded bounty after payout delay. 

  The dispatch origin for this call must be the beneficiary of this bounty. 

  - `bounty_id`: Bounty ID to claim. 
 
### closeBounty(bounty_id: `Compact<BountyIndex>`)
- **interface**: `api.tx.treasury.closeBounty`
- **summary**:   Cancel a proposed or active bounty. All the funds will be sent to treasury and the curator deposit will be unreserved if possible. 

  Only `T::RejectOrigin` is able to cancel a bounty. 

  - `bounty_id`: Bounty ID to cancel. 
 
### closeTip(hash: `Hash`)
- **interface**: `api.tx.treasury.closeTip`
- **summary**:   Close and payout a tip. 

  The dispatch origin for this call must be _Signed_. 

  The tip identified by `hash` must have finished its countdown period. 

  - `hash`: The identity of the open tip for which a tip value is declared. This is formed   as the hash of the tuple of the original tip `reason` and the beneficiary account ID. 

  \# \<weight>

   

  - Complexity: `O(T)` where `T` is the number of tippers.  decoding `Tipper` vec of length `T`.   `T` is charged as upper bound given by `ContainsLengthBound`.   The actual cost depends on the implementation of `T::Tippers`. 

  - DbReads: `Tips`, `Tippers`, `tip finder`

  - DbWrites: `Reasons`, `Tips`, `Tippers`, `tip finder`

  \# \</weight> 
 
### extendBountyExpiry(bounty_id: `Compact<BountyIndex>`, _remark: `Bytes`)
- **interface**: `api.tx.treasury.extendBountyExpiry`
- **summary**:   Extend the expiry time of an active bounty. 

  The dispatch origin for this call must be the curator of this bounty. 

  - `bounty_id`: Bounty ID to extend. 

  - `remark`: additional information.
 
### proposeBounty(value: `Compact<BalanceOf>`, description: `Bytes`)
- **interface**: `api.tx.treasury.proposeBounty`
- **summary**:   Propose a new bounty. 

  The dispatch origin for this call must be _Signed_. 

  Payment: `TipReportDepositBase` will be reserved from the origin account, as well as `DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval, or slashed when rejected. 

  - `curator`: The curator account whom will manage this bounty. 

  - `fee`: The curator fee.

  - `value`: The total payment amount of this bounty, curator fee included.

  - `description`: The description of this bounty.
 
### proposeCurator(bounty_id: `Compact<ProposalIndex>`, curator: `LookupSource`, fee: `Compact<BalanceOf>`)
- **interface**: `api.tx.treasury.proposeCurator`
- **summary**:   Assign a curator to a funded bounty. 

  May only be called from `T::ApproveOrigin`. 

  \# \<weight>

   

  - O(1).

  - Limited storage reads.

  - One DB change.

  \# \</weight> 
 
### proposeSpend(value: `Compact<BalanceOf>`, beneficiary: `LookupSource`)
- **interface**: `api.tx.treasury.proposeSpend`
- **summary**:   Put forward a suggestion for spending. A deposit proportional to the value is reserved and slashed if the proposal is rejected. It is returned once the proposal is awarded. 

  \# \<weight>

   

  - Complexity: O(1)

  - DbReads: `ProposalCount`, `origin account`

  - DbWrites: `ProposalCount`, `Proposals`, `origin account`

  \# \</weight> 
 
### rejectProposal(proposal_id: `Compact<ProposalIndex>`)
- **interface**: `api.tx.treasury.rejectProposal`
- **summary**:   Reject a proposed spend. The original deposit will be slashed. 

  May only be called from `T::RejectOrigin`. 

  \# \<weight>

   

  - Complexity: O(1)

  - DbReads: `Proposals`, `rejected proposer account`

  - DbWrites: `Proposals`, `rejected proposer account`

  \# \</weight> 
 
### reportAwesome(reason: `Bytes`, who: `AccountId`)
- **interface**: `api.tx.treasury.reportAwesome`
- **summary**:   Report something `reason` that deserves a tip and claim any eventual the finder's fee. 

  The dispatch origin for this call must be _Signed_. 

  Payment: `TipReportDepositBase` will be reserved from the origin account, as well as `DataDepositPerByte` for each byte in `reason`. 

  - `reason`: The reason for, or the thing that deserves, the tip; generally this will be   a UTF-8-encoded URL. 

  - `who`: The account which should be credited for the tip.

  Emits `NewTip` if successful. 

  \# \<weight>

   

  - Complexity: `O(R)` where `R` length of `reason`.

    - encoding and hashing of 'reason'

  - DbReads: `Reasons`, `Tips`

  - DbWrites: `Reasons`, `Tips`

  \# \</weight> 
 
### retractTip(hash: `Hash`)
- **interface**: `api.tx.treasury.retractTip`
- **summary**:   Retract a prior tip-report from `report_awesome`, and cancel the process of tipping. 

  If successful, the original deposit will be unreserved. 

  The dispatch origin for this call must be _Signed_ and the tip identified by `hash` must have been reported by the signing account through `report_awesome` (and not through `tip_new`). 

  - `hash`: The identity of the open tip for which a tip value is declared. This is formed   as the hash of the tuple of the original tip `reason` and the beneficiary account ID. 

  Emits `TipRetracted` if successful. 

  \# \<weight>

   

  - Complexity: `O(1)`

    - Depends on the length of `T::Hash` which is fixed.

  - DbReads: `Tips`, `origin account`

  - DbWrites: `Reasons`, `Tips`, `origin account`

  \# \</weight> 
 
### tip(hash: `Hash`, tip_value: `Compact<BalanceOf>`)
- **interface**: `api.tx.treasury.tip`
- **summary**:   Declare a tip value for an already-open tip. 

  The dispatch origin for this call must be _Signed_ and the signing account must be a member of the `Tippers` set. 

  - `hash`: The identity of the open tip for which a tip value is declared. This is formed   as the hash of the tuple of the hash of the original tip `reason` and the beneficiary   account ID. 

  - `tip_value`: The amount of tip that the sender would like to give. The median tip  value of active tippers will be given to the `who`. 

  Emits `TipClosing` if the threshold of tippers has been reached and the countdown period has started. 

  \# \<weight>

   

  - Complexity: `O(T)` where `T` is the number of tippers.  decoding `Tipper` vec of length `T`, insert tip and check closing,   `T` is charged as upper bound given by `ContainsLengthBound`.   The actual cost depends on the implementation of `T::Tippers`. 

    Actually weight could be lower as it depends on how many tips are in `OpenTip` but it   is weighted as if almost full i.e of length `T-1`. 

  - DbReads: `Tippers`, `Tips`

  - DbWrites: `Tips`

  \# \</weight> 
 
### tipNew(reason: `Bytes`, who: `AccountId`, tip_value: `Compact<BalanceOf>`)
- **interface**: `api.tx.treasury.tipNew`
- **summary**:   Give a tip for something new; no finder's fee will be taken. 

  The dispatch origin for this call must be _Signed_ and the signing account must be a member of the `Tippers` set. 

  - `reason`: The reason for, or the thing that deserves, the tip; generally this will be   a UTF-8-encoded URL. 

  - `who`: The account which should be credited for the tip.

  - `tip_value`: The amount of tip that the sender would like to give. The median tip  value of active tippers will be given to the `who`. 

  Emits `NewTip` if successful. 

  \# \<weight>

   

  - Complexity: `O(R + T)` where `R` length of `reason`, `T` is the number of tippers.

    - `O(T)`: decoding `Tipper` vec of length `T`    `T` is charged as upper bound given by `ContainsLengthBound`.     The actual cost depends on the implementation of `T::Tippers`. 

    - `O(R)`: hashing and encoding of reason of length `R`

  - DbReads: `Tippers`, `Reasons`

  - DbWrites: `Reasons`, `Tips`

  \# \</weight> 
 
### unassignCurator(bounty_id: `Compact<ProposalIndex>`)
- **interface**: `api.tx.treasury.unassignCurator`
- **summary**:   Unassign curator from a bounty. 

  This function can only be called by the `RejectOrigin` a signed origin. 

  If this function is called by the `RejectOrigin`, we assume that the curator is malicious or inactive. As a result, we will slash the curator when possible. 

  If the origin is the curator, we take this as a sign they are unable to do their job and they willingly give up. We could slash them, but for now we allow them to recover their deposit and exit without issue. (We may want to change this if it is abused.) 

  Finally, the origin can be anyone if and only if the curator is "inactive". This allows anyone in the community to call out that a curator is not doing their due diligence, and we should pick a new curator. In this case the curator should also be slashed. 

  \# \<weight>

   

  - O(1).

  - Limited storage reads.

  - One DB change.

  \# \</weight> 

___


## utility
 
### asDerivative(index: `u16`, call: `Call`)
- **interface**: `api.tx.utility.asDerivative`
- **summary**:   Send a call through an indexed pseudonym of the sender. 

  Filter from origin are passed along. The call will be dispatched with an origin which use the same filter as the origin of this call. 

  NOTE: If you need to ensure that any account-based filtering is not honored (i.e. because you expect `proxy` to have been used prior in the call stack and you do not want the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1` in the Multisig pallet instead. 

  NOTE: Prior to version *12, this was called `as_limited_sub`. 

  The dispatch origin for this call must be _Signed_. 
 
### batch(calls: `Vec<Call>`)
- **interface**: `api.tx.utility.batch`
- **summary**:   Send a batch of dispatch calls. 

  May be called from any origin. 

  - `calls`: The calls to be dispatched from the same origin. 

  If origin is root then call are dispatch without checking origin filter. (This includes bypassing `frame_system::Trait::BaseCallFilter`). 

  \# \<weight>

   

  - Base weight: 14.39 + .987 * c µs

  - Plus the sum of the weights of the `calls`.

  - Plus one additional event. (repeat read/write)

  \# \</weight> 

  This will return `Ok` in all circumstances. To determine the success of the batch, an event is deposited. If a call failed and the batch was interrupted, then the `BatchInterrupted` event is deposited, along with the number of successful calls made and the error of the failed call. If all were successful, then the `BatchCompleted` event is deposited. 
