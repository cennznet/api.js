---
title: Extrinsics
---

The following sections contain Extrinsics methods are part of the default Substrate runtime. On the api, these are exposed via `api.tx.<module>.<method>`. 

(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)

- **[authorship](#authorship)**

- **[babe](#babe)**

- **[baseFee](#basefee)**

- **[cennzx](#cennzx)**

- **[erc20Peg](#erc20peg)**

- **[ethBridge](#ethbridge)**

- **[ethereum](#ethereum)**

- **[ethWallet](#ethwallet)**

- **[evm](#evm)**

- **[genericAsset](#genericasset)**

- **[governance](#governance)**

- **[grandpa](#grandpa)**

- **[identity](#identity)**

- **[imOnline](#imonline)**

- **[nft](#nft)**

- **[rewards](#rewards)**

- **[scheduler](#scheduler)**

- **[session](#session)**

- **[staking](#staking)**

- **[sudo](#sudo)**

- **[system](#system)**

- **[timestamp](#timestamp)**

- **[tokenApprovals](#tokenapprovals)**

- **[treasury](#treasury)**

- **[utility](#utility)**


___


## authorship
 
### setUncles(new_uncles: `Vec<SpRuntimeHeader>`)
- **interface**: `api.tx.authorship.setUncles`
- **summary**:   Provide a set of uncles. 

___


## babe
 
### planConfigChange(config: `SpConsensusBabeDigestsNextConfigDescriptor`)
- **interface**: `api.tx.babe.planConfigChange`
- **summary**:   Plan an epoch config change. The epoch config change is recorded and will be enacted on the next call to `enact_epoch_change`. The config will be activated one epoch after. Multiple calls to this method will replace any existing planned config change that had not been enacted yet. 
 
### reportEquivocation(equivocation_proof: `SpConsensusSlotsEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.babe.reportEquivocation`
- **summary**:   Report authority equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. 
 
### reportEquivocationUnsigned(equivocation_proof: `SpConsensusSlotsEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.babe.reportEquivocationUnsigned`
- **summary**:   Report authority equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. This extrinsic must be called unsigned and it is expected that only block authors will call it (validated in `ValidateUnsigned`), as such if the block author is defined it will be defined as the equivocation reporter. 

___


## baseFee
 
### setBaseFeePerGas(fee: `U256`)
- **interface**: `api.tx.baseFee.setBaseFeePerGas`
 
### setElasticity(elasticity: `Permill`)
- **interface**: `api.tx.baseFee.setElasticity`
 
### setIsActive(is_active: `bool`)
- **interface**: `api.tx.baseFee.setIsActive`

___


## cennzx
 
### addLiquidity(asset_id: `Compact<u32>`, min_liquidity: `Compact<u128>`, max_asset_amount: `Compact<u128>`, core_amount: `Compact<u128>`)
- **interface**: `api.tx.cennzx.addLiquidity`
- **summary**:   Deposit core asset and trade asset at current ratio to mint liquidity Returns amount of liquidity minted. 

  `origin` `asset_id` - The trade asset ID `min_liquidity` - The minimum liquidity to add `asset_amount` - Amount of trade asset to add `core_amount` - Amount of core asset to add 
 
### buyAsset(recipient: `Option<AccountId32>`, asset_to_sell: `Compact<u32>`, asset_to_buy: `Compact<u32>`, buy_amount: `Compact<u128>`, maximum_sell: `Compact<u128>`)
- **interface**: `api.tx.cennzx.buyAsset`
- **summary**:   Buy `asset_to_buy` with `asset_to_sell`. Caller specifies an exact `buy_amount` and a `maximum_sell` amount to pay. 

  `recipient` - Account to receive assets, defaults to `origin` if None `asset_to_sell` - asset ID to sell `asset_to_buy` - asset ID to buy `buy_amount` - The amount of `asset_to_buy` to receive `maximum_sell` - Maximum `asset_to_sell` caller should pay 
 
### removeLiquidity(asset_id: `Compact<u32>`, liquidity_to_withdraw: `Compact<u128>`, min_asset_withdraw: `Compact<u128>`, min_core_withdraw: `Compact<u128>`)
- **interface**: `api.tx.cennzx.removeLiquidity`
- **summary**:   Burn exchange assets to withdraw core asset and trade asset at current ratio 

  `asset_id` - The trade asset ID `liquidity_to_withdraw` - Amount of user's liquidity to withdraw `min_asset_withdraw` - The minimum trade asset withdrawn `min_core_withdraw` -  The minimum core asset withdrawn 
 
### sellAsset(recipient: `Option<AccountId32>`, asset_to_sell: `Compact<u32>`, asset_to_buy: `Compact<u32>`, sell_amount: `Compact<u128>`, minimum_buy: `Compact<u128>`)
- **interface**: `api.tx.cennzx.sellAsset`
- **summary**:   Sell `asset_to_sell` for `asset_to_buy`. Caller specifies an exact `sell_amount` and a `minimum_buy` amount to receive. 

  `recipient` - Account to receive assets, defaults to `origin` if None `asset_to_sell` - asset ID to sell `asset_to_buy` - asset ID to buy `sell_amount` - The amount of `asset_to_sell` the caller should pay `minimum_buy` - The minimum `asset_to_buy` to receive 
 
### setFeeRate(new_fee_rate: `u128`)
- **interface**: `api.tx.cennzx.setFeeRate`
- **summary**:   Set the spot exchange wide fee rate (root only) 

___


## erc20Peg
 
### activateCennzDeposits()
- **interface**: `api.tx.erc20Peg.activateCennzDeposits`
 
### activateDeposits(activate: `bool`)
- **interface**: `api.tx.erc20Peg.activateDeposits`
- **summary**:   Activate/deactivate deposits (root only) 
 
### activateWithdrawals(activate: `bool`)
- **interface**: `api.tx.erc20Peg.activateWithdrawals`
- **summary**:   Activate/deactivate withdrawals (root only) 
 
### depositClaim(tx_hash: `H256`, claim: `CrmlErc20PegErc20DepositEvent`)
- **interface**: `api.tx.erc20Peg.depositClaim`
 
### setContractAddress(eth_address: `H160`)
- **interface**: `api.tx.erc20Peg.setContractAddress`
 
### setErc20Meta(details: `Vec<(H160,Bytes,u8)>`)
- **interface**: `api.tx.erc20Peg.setErc20Meta`
 
### withdraw(asset_id: `u32`, amount: `u128`, beneficiary: `H160`)
- **interface**: `api.tx.erc20Peg.withdraw`

___


## ethBridge
 
### setEventConfirmations(confirmations: `u64`)
- **interface**: `api.tx.ethBridge.setEventConfirmations`
 
### setEventDeadline(seconds: `u64`)
- **interface**: `api.tx.ethBridge.setEventDeadline`
 
### submitNotarization(payload: `CrmlEthBridgeNotarizationPayload`, _signature: `CennznetPrimitivesEthCryptoAppCryptoSignature`)
- **interface**: `api.tx.ethBridge.submitNotarization`

___


## ethereum
 
### transact(transaction: `EthereumTransactionTransactionV2`)
- **interface**: `api.tx.ethereum.transact`
- **summary**:   Transact an Ethereum transaction. 

___


## ethWallet
 
### call(call: `Call`, eth_address: `H160`, signature: `CrmlEthWalletEthereumEthereumSignature`)
- **interface**: `api.tx.ethWallet.call`

___


## evm
 
### call(source: `H160`, target: `H160`, input: `Bytes`, value: `U256`, gas_limit: `u64`, max_fee_per_gas: `U256`, max_priority_fee_per_gas: `Option<U256>`, nonce: `Option<U256>`, access_list: `Vec<(H160,Vec<H256>)>`)
- **interface**: `api.tx.evm.call`
- **summary**:   Issue an EVM call operation. This is similar to a message call transaction in Ethereum. 
 
### create(source: `H160`, init: `Bytes`, value: `U256`, gas_limit: `u64`, max_fee_per_gas: `U256`, max_priority_fee_per_gas: `Option<U256>`, nonce: `Option<U256>`, access_list: `Vec<(H160,Vec<H256>)>`)
- **interface**: `api.tx.evm.create`
- **summary**:   Issue an EVM create operation. This is similar to a contract creation transaction in Ethereum. 
 
### create2(source: `H160`, init: `Bytes`, salt: `H256`, value: `U256`, gas_limit: `u64`, max_fee_per_gas: `U256`, max_priority_fee_per_gas: `Option<U256>`, nonce: `Option<U256>`, access_list: `Vec<(H160,Vec<H256>)>`)
- **interface**: `api.tx.evm.create2`
- **summary**:   Issue an EVM create2 operation. 
 
### withdraw(address: `H160`, value: `u128`)
- **interface**: `api.tx.evm.withdraw`
- **summary**:   Withdraw balance from EVM into currency/balances pallet. 

___


## genericAsset
 
### burn(asset_id: `Compact<u32>`, target: `AccountId32`, amount: `u128`)
- **interface**: `api.tx.genericAsset.burn`
- **summary**:   Burns an asset, decreases its total issuance. Deduct the money from target account The `origin` must have `burn` permissions. 

  Weights: O(1) Limited number of reads/writes. 
 
### create(owner: `AccountId32`, options: `CrmlGenericAssetAssetOptions`, info: `CrmlGenericAssetAssetInfo`)
- **interface**: `api.tx.genericAsset.create`
- **summary**:   Create a new kind of asset and nominates the owner of this asset. The asset_id will be the next unoccupied asset_id Accounts who will have the permissions to mint/burn/change permission are passed in via 'options' origin of this call must be root. 

  Weights: O(1) Limited number of read and writes. Should not be called often. 
 
### createReserved(asset_id: `u32`, options: `CrmlGenericAssetAssetOptions`, info: `CrmlGenericAssetAssetInfo`)
- **interface**: `api.tx.genericAsset.createReserved`
- **summary**:   Create a new asset with reserved asset_id. Internally calls create_asset with an asset_id Requires Root call. 

  Weights: O(1) Limited read/writes 
 
### mint(asset_id: `Compact<u32>`, to: `AccountId32`, amount: `u128`)
- **interface**: `api.tx.genericAsset.mint`
- **summary**:   Mints an asset, increases its total issuance. Deposits the newly minted currency into target account The origin must have `mint` permissions. 

  Weights: O(1) limited number of read/writes 
 
### transfer(asset_id: `Compact<u32>`, to: `AccountId32`, amount: `Compact<u128>`)
- **interface**: `api.tx.genericAsset.transfer`
- **summary**:   Transfer some liquid free balance to another account. 

  `transfer` will set the `FreeBalance` of the sender and receiver. It will decrease the total issuance of the system by the `TransferFee`. If the sender's account is below the existential deposit as a result of the transfer, the account will be reaped. 

  The dispatch origin for this call must be `Signed` by the transactor. 

   
 
### transferAll(asset_id: `Compact<u32>`, to: `AccountId32`)
- **interface**: `api.tx.genericAsset.transferAll`
- **summary**:   Transfer all of the free balance of `asset_id` to another account. 
 
### updateAssetInfo(asset_id: `Compact<u32>`, info: `CrmlGenericAssetAssetInfo`)
- **interface**: `api.tx.genericAsset.updateAssetInfo`
- **summary**:   Updates asset info for a given `asset_id`. 

  The `origin` must have `update` permission. 

  weights: O(1) limited number of read and writes Expected to not be called frequently 
 
### updatePermission(asset_id: `Compact<u32>`, new_permission: `CrmlGenericAssetPermissionsV1`)
- **interface**: `api.tx.genericAsset.updatePermission`
- **summary**:   Updates permissions(mint/burn/change permission) for a given `asset_id` and an account. 

  The `origin` must have `update` permission. 

  weights: O(1) limited number of read and writes Expected to not be called frequently 

___


## governance
 
### addCouncilMember(new_member: `AccountId32`)
- **interface**: `api.tx.governance.addCouncilMember`
- **summary**:   Add a member to the council This must be submitted like any other proposal 
 
### cancelEnactment(proposal_id: `u64`)
- **interface**: `api.tx.governance.cancelEnactment`
- **summary**:   Cancel a proposal queued for enactment. 
 
### enactReferendum(proposal_id: `u64`)
- **interface**: `api.tx.governance.enactReferendum`
- **summary**:   Execute a proposal transaction 
 
### removeCouncilMember(remove_member: `AccountId32`)
- **interface**: `api.tx.governance.removeCouncilMember`
- **summary**:   Remove a member from the council This must be submitted like any other proposal 
 
### setMinimumCouncilStake(new_minimum_council_stake: `u128`)
- **interface**: `api.tx.governance.setMinimumCouncilStake`
- **summary**:   Adjust the minimum stake required for new council members 
 
### setMinimumVoterStakedAmount(new_minimum_staked_amount: `u128`)
- **interface**: `api.tx.governance.setMinimumVoterStakedAmount`
- **summary**:   Adjust the minimum staked amount This must be submitted like any other proposal 
 
### setProposalBond(new_proposal_bond: `u128`)
- **interface**: `api.tx.governance.setProposalBond`
- **summary**:   Adjust the proposal bond This must be submitted like any other proposal 
 
### setReferendumThreshold(new_referendum_threshold: `Permill`)
- **interface**: `api.tx.governance.setReferendumThreshold`
- **summary**:   Adjust the referendum veto threshold This must be submitted like any other proposal 
 
### submitProposal(call: `Bytes`, justification_uri: `Bytes`, enactment_delay: `u32`)
- **interface**: `api.tx.governance.submitProposal`
 
### voteAgainstReferendum(proposal_id: `u64`)
- **interface**: `api.tx.governance.voteAgainstReferendum`
- **summary**:   Submit a veto for a referendum 
 
### voteOnProposal(proposal_id: `u64`, vote: `bool`)
- **interface**: `api.tx.governance.voteOnProposal`

___


## grandpa
 
### noteStalled(delay: `u32`, best_finalized_block_number: `u32`)
- **interface**: `api.tx.grandpa.noteStalled`
- **summary**:   Note that the current authority set of the GRANDPA finality gadget has stalled. This will trigger a forced authority set change at the beginning of the next session, to be enacted `delay` blocks after that. The delay should be high enough to safely assume that the block signalling the forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters will start the new authority set using the given finalized block as base. Only callable by root. 
 
### reportEquivocation(equivocation_proof: `SpFinalityGrandpaEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.grandpa.reportEquivocation`
- **summary**:   Report voter equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. 
 
### reportEquivocationUnsigned(equivocation_proof: `SpFinalityGrandpaEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.grandpa.reportEquivocationUnsigned`
- **summary**:   Report voter equivocation/misbehavior. This method will verify the equivocation proof and validate the given key ownership proof against the extracted offender. If both are valid, the offence will be reported. 

  This extrinsic must be called unsigned and it is expected that only block authors will call it (validated in `ValidateUnsigned`), as such if the block author is defined it will be defined as the equivocation reporter. 

___


## identity
 
### addRegistrar(account: `AccountId32`)
- **interface**: `api.tx.identity.addRegistrar`
- **summary**:   Add a registrar to the system. 

  The dispatch origin for this call must be `T::RegistrarOrigin`. 

  - `account`: the account of the registrar. 

  Emits `RegistrarAdded` if successful. 

   
 
### addSub(sub: `AccountId32`, data: `Data`)
- **interface**: `api.tx.identity.addSub`
- **summary**:   Add the given account to the sender's subs. 

  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated to the sender. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered sub identity of `sub`. 
 
### cancelRequest(reg_index: `u32`)
- **interface**: `api.tx.identity.cancelRequest`
- **summary**:   Cancel a previous request. 

  Payment: A previously reserved deposit is returned on success. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  - `reg_index`: The index of the registrar whose judgement is no longer requested. 

  Emits `JudgementUnrequested` if successful. 

   
 
### clearIdentity()
- **interface**: `api.tx.identity.clearIdentity`
- **summary**:   Clear an account's identity info and all sub-accounts and return all deposits. 

  Payment: All reserved balances on the account are returned. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  Emits `IdentityCleared` if successful. 

   
 
### killIdentity(target: `AccountId32`)
- **interface**: `api.tx.identity.killIdentity`
- **summary**:   Remove an account's identity and sub-account information and slash the deposits. 

  Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by `Slash`. Verification request deposits are not returned; they should be cancelled manually using `cancel_request`. 

  The dispatch origin for this call must match `T::ForceOrigin`. 

  - `target`: the account whose identity the judgement is upon. This must be an account   with a registered identity. 

  Emits `IdentityKilled` if successful. 

   
 
### provideJudgement(reg_index: `Compact<u32>`, target: `AccountId32`, judgement: `PalletIdentityJudgement`)
- **interface**: `api.tx.identity.provideJudgement`
- **summary**:   Provide a judgement for an account's identity. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `reg_index`. 

  - `reg_index`: the index of the registrar whose judgement is being made. 

  - `target`: the account whose identity the judgement is upon. This must be an account  with a registered identity. 

  - `judgement`: the judgement of the registrar of index `reg_index` about `target`.

  Emits `JudgementGiven` if successful. 

   
 
### quitSub()
- **interface**: `api.tx.identity.quitSub`
- **summary**:   Remove the sender as a sub-account. 

  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated to the sender (*not* the original depositor). 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered super-identity. 

  NOTE: This should not normally be used, but is provided in the case that the non- controller of an account is maliciously registered as a sub-account. 
 
### removeSub(sub: `AccountId32`)
- **interface**: `api.tx.identity.removeSub`
- **summary**:   Remove the given account from the sender's subs. 

  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated to the sender. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered sub identity of `sub`. 
 
### renameSub(sub: `AccountId32`, data: `Data`)
- **interface**: `api.tx.identity.renameSub`
- **summary**:   Alter the associated name of the given sub-account. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered sub identity of `sub`. 
 
### requestJudgement(reg_index: `Compact<u32>`, max_fee: `Compact<u128>`)
- **interface**: `api.tx.identity.requestJudgement`
- **summary**:   Request a judgement from a registrar. 

  Payment: At most `max_fee` will be reserved for payment to the registrar if judgement given. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  - `reg_index`: The index of the registrar whose judgement is requested. 

  - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:

  ```nocompile Self::registrars().get(reg_index).unwrap().fee ``` 

  Emits `JudgementRequested` if successful. 

   
 
### setAccountId(index: `Compact<u32>`, new: `AccountId32`)
- **interface**: `api.tx.identity.setAccountId`
- **summary**:   Change the account associated with a registrar. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `index`. 

  - `index`: the index of the registrar whose fee is to be set. 

  - `new`: the new account ID.

   
 
### setFee(index: `Compact<u32>`, fee: `Compact<u128>`)
- **interface**: `api.tx.identity.setFee`
- **summary**:   Set the fee required for a judgement to be requested from a registrar. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `index`. 

  - `index`: the index of the registrar whose fee is to be set. 

  - `fee`: the new fee.

   
 
### setFields(index: `Compact<u32>`, fields: `PalletIdentityBitFlags`)
- **interface**: `api.tx.identity.setFields`
- **summary**:   Set the field information for a registrar. 

  The dispatch origin for this call must be _Signed_ and the sender must be the account of the registrar whose index is `index`. 

  - `index`: the index of the registrar whose fee is to be set. 

  - `fields`: the fields that the registrar concerns themselves with.

   
 
### setIdentity(info: `PalletIdentityIdentityInfo`)
- **interface**: `api.tx.identity.setIdentity`
- **summary**:   Set an account's identity information and reserve the appropriate deposit. 

  If the account already has identity information, the deposit is taken as part payment for the new deposit. 

  The dispatch origin for this call must be _Signed_. 

  - `info`: The identity information. 

  Emits `IdentitySet` if successful. 

   
 
### setSubs(subs: `Vec<(AccountId32,Data)>`)
- **interface**: `api.tx.identity.setSubs`
- **summary**:   Set the sub-accounts of the sender. 

  Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned and an amount `SubAccountDeposit` will be reserved for each item in `subs`. 

  The dispatch origin for this call must be _Signed_ and the sender must have a registered identity. 

  - `subs`: The identity's (new) sub-accounts. 

   

___


## imOnline
 
### heartbeat(heartbeat: `PalletImOnlineHeartbeat`, signature: `PalletImOnlineSr25519AppSr25519Signature`)
- **interface**: `api.tx.imOnline.heartbeat`
- **summary**:    

___


## nft
 
### auction(token_id: `(u32,u32,u32)`, payment_asset: `u32`, reserve_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.auction`
- **summary**:   Auction a token on the open market to the highest bidder 

  Caller must be the token owner 

  - `payment_asset` fungible asset Id to receive payment with

  - `reserve_price` winning bid must be over this threshold

  - `duration` length of the auction (in blocks), uses default duration if unspecified
 
### auctionBundle(tokens: `Vec<(u32,u32,u32)>`, payment_asset: `u32`, reserve_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.auctionBundle`
- **summary**:   Auction a bundle of tokens on the open market to the highest bidder 

  - Tokens must be from the same series

  - Tokens with individual royalties schedules cannot be sold in bundles

  Caller must be the token owner 

  - `payment_asset` fungible asset Id to receive payment with

  - `reserve_price` winning bid must be over this threshold

  - `duration` length of the auction (in blocks), uses default duration if unspecified
 
### bid(listing_id: `u128`, amount: `u128`)
- **interface**: `api.tx.nft.bid`
- **summary**:   Place a bid on an open auction 

  - `amount` to bid (in the seller's requested payment asset)
 
### burn(token_id: `(u32,u32,u32)`)
- **interface**: `api.tx.nft.burn`
- **summary**:   Burn a token 🔥 

  Caller must be the token owner 
 
### burnBatch(collection_id: `u32`, series_id: `u32`, serial_numbers: `Vec<u32>`)
- **interface**: `api.tx.nft.burnBatch`
- **summary**:   Burn some tokens 🔥 Tokens must be from the same series 

  Caller must be the token owner Fails on duplicate serials 
 
### buy(listing_id: `u128`)
- **interface**: `api.tx.nft.buy`
- **summary**:   Buy a token listing for its specified price 
 
### cancelSale(listing_id: `u128`)
- **interface**: `api.tx.nft.cancelSale`
- **summary**:   Close a sale or auction returning tokens Requires no successful bids have been made for an auction. Caller must be the listed seller 
 
### createCollection(name: `Bytes`, royalties_schedule: `Option<CrmlNftRoyaltiesSchedule>`)
- **interface**: `api.tx.nft.createCollection`
- **summary**:   Create a new token collection 

  The caller will become the collection owner `collection_id`- 32 byte utf-8 string `metadata_base_uri` - Base URI for off-chain metadata for tokens in this collection `royalties_schedule` - defacto royalties plan for secondary sales, this will apply to all tokens in the collection by default. 
 
### migrateToMetadataScheme(collection_id: `u32`, series_id: `u32`, scheme: `CrmlNftMetadataScheme`)
- **interface**: `api.tx.nft.migrateToMetadataScheme`
- **summary**:   Set the owner of a collection Caller must be the current collection owner 
 
### mintAdditional(collection_id: `u32`, series_id: `u32`, quantity: `u32`, owner: `Option<AccountId32>`)
- **interface**: `api.tx.nft.mintAdditional`
- **summary**:   Mint tokens for an existing series 

  `quantity` - how many tokens to mint `owner` - the token owner, defaults to the caller if unspecified Caller must be the collection owner 

  -----------Weight is O(N) where N is `quantity` 
 
### mintSeries(collection_id: `u32`, quantity: `u32`, owner: `Option<AccountId32>`, metadata_scheme: `CrmlNftMetadataScheme`, royalties_schedule: `Option<CrmlNftRoyaltiesSchedule>`)
- **interface**: `api.tx.nft.mintSeries`
- **summary**:   Create a new series Additional tokens can be minted via `mint_additional` 

  `quantity` - number of tokens to mint now `owner` - the token owner, defaults to the caller `metadata_scheme` - The off-chain metadata referencing scheme for tokens in this series Caller must be the collection owner 
 
### registerMarketplace(marketplace_account: `Option<AccountId32>`, entitlement: `Permill`)
- **interface**: `api.tx.nft.registerMarketplace`
- **summary**:   Flag an account as a marketplace 

  `marketplace_account` - if specified, this account will be registered `entitlement` - Permill, percentage of sales to go to the marketplace If no marketplace is specified the caller will be registered 
 
### sell(token_id: `(u32,u32,u32)`, buyer: `Option<AccountId32>`, payment_asset: `u32`, fixed_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.sell`
- **summary**:   Sell a single token at a fixed price 

  `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase `asset_id` fungible asset Id to receive as payment for the NFT `fixed_price` ask price `duration` listing duration time in blocks from now `marketplace` optionally, the marketplace that the NFT is being sold on Caller must be the token owner 
 
### sellBundle(tokens: `Vec<(u32,u32,u32)>`, buyer: `Option<AccountId32>`, payment_asset: `u32`, fixed_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.sellBundle`
- **summary**:   Sell a bundle of tokens at a fixed price 

  - Tokens must be from the same series

  - Tokens with individual royalties schedules cannot be sold with this method

  `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase `asset_id` fungible asset Id to receive as payment for the NFT `fixed_price` ask price `duration` listing duration time in blocks from now Caller must be the token owner 
 
### setOwner(collection_id: `u32`, new_owner: `AccountId32`)
- **interface**: `api.tx.nft.setOwner`
- **summary**:   Set the owner of a collection Caller must be the current collection owner 
 
### setSeriesName(collection_id: `u32`, series_id: `u32`, name: `Bytes`)
- **interface**: `api.tx.nft.setSeriesName`
- **summary**:   Set the name of a series Caller must be the current collection owner 
 
### transfer(token_id: `(u32,u32,u32)`, new_owner: `AccountId32`)
- **interface**: `api.tx.nft.transfer`
- **summary**:   Transfer ownership of an NFT Caller must be the token owner 
 
### transferBatch(collection_id: `u32`, series_id: `u32`, serial_numbers: `Vec<u32>`, new_owner: `AccountId32`)
- **interface**: `api.tx.nft.transferBatch`
- **summary**:   Transfer ownership of a batch of NFTs (atomic) Tokens must be from the same series Caller must be the token owner 
 
### updateFixedPrice(listing_id: `u128`, new_price: `u128`)
- **interface**: `api.tx.nft.updateFixedPrice`
- **summary**:   Update fixed price for a single token sale 

  `listing_id` id of the fixed price listing `new_price` new fixed price Caller must be the token owner 

___


## rewards
 
### forceNewFiscalEra()
- **interface**: `api.tx.rewards.forceNewFiscalEra`
- **summary**:   Force a new fiscal era to start as soon as the next staking era. 
 
### setDevelopmentFundTake(new_take_percent: `u32`)
- **interface**: `api.tx.rewards.setDevelopmentFundTake`
- **summary**:   Set the development fund take %, capped at 100%. 
 
### setInflationRate(numerator: `u64`, denominator: `u64`)
- **interface**: `api.tx.rewards.setInflationRate`
- **summary**:   Set the per payout inflation rate (`numerator` / `denominator`) (it may be negative) Please be advised that a newly set inflation rate would only affect the next fiscal year. 

___


## scheduler
 
### cancel(when: `u32`, index: `u32`)
- **interface**: `api.tx.scheduler.cancel`
- **summary**:   Cancel an anonymously scheduled task. 
 
### cancelNamed(id: `Bytes`)
- **interface**: `api.tx.scheduler.cancelNamed`
- **summary**:   Cancel a named scheduled task. 
 
### schedule(when: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.schedule`
- **summary**:   Anonymously schedule a task. 
 
### scheduleAfter(after: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleAfter`
- **summary**:   Anonymously schedule a task after a delay. 

   
 
### scheduleNamed(id: `Bytes`, when: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleNamed`
- **summary**:   Schedule a named task. 
 
### scheduleNamedAfter(id: `Bytes`, after: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleNamedAfter`
- **summary**:   Schedule a named task after a delay. 

   

___


## session
 
### purgeKeys()
- **interface**: `api.tx.session.purgeKeys`
- **summary**:   Removes any session key(s) of the function caller. 

  This doesn't take effect until the next session. 

  The dispatch origin of this function must be Signed and the account must be either be convertible to a validator ID using the chain's typical addressing system (this usually means being a controller account) or directly convertible into a validator ID (which usually means being a stash account). 

   
 
### setKeys(keys: `CennznetRuntimeSessionKeys`, proof: `Bytes`)
- **interface**: `api.tx.session.setKeys`
- **summary**:   Sets the session key(s) of the function caller to `keys`. Allows an account to set its session key prior to becoming a validator. This doesn't take effect until the next session. 

  The dispatch origin of this function must be signed. 

   

___


## staking
 
### bond(controller: `AccountId32`, value: `Compact<u128>`, payee: `CrmlStakingRewardDestination`)
- **interface**: `api.tx.staking.bond`
- **summary**:   Take the origin account as a stash and lock up `value` of its balance. `controller` will be the account that controls it. 

  `value` must be more than the `minimum_bond` specified in genesis config. 

  The dispatch origin for this call must be _Signed_ by the stash account. 

  Emits `Bonded`. 

   
 
### bondExtra(max_additional: `Compact<u128>`)
- **interface**: `api.tx.staking.bondExtra`
- **summary**:   Add some extra amount that have appeared in the stash `free_balance` into the balance up for staking. 

  Use this if there are additional funds in your stash account that you wish to bond. Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount that can be added. 

  The dispatch origin for this call must be _Signed_ by the stash, not the controller and it can be only called when [`EraElectionStatus`] is `Closed`. 

  Emits `Bonded`. 

   
 
### cancelDeferredSlash(era: `u32`, slash_indices: `Vec<u32>`)
- **interface**: `api.tx.staking.cancelDeferredSlash`
- **summary**:   Cancel enactment of a deferred slash. 

  Parameters: era and indices of the slashes for that era to kill. 

   
 
### chill()
- **interface**: `api.tx.staking.chill`
- **summary**:   Declare no desire to either validate or nominate. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### forceNewEra()
- **interface**: `api.tx.staking.forceNewEra`
- **summary**:   Force there to be a new era at the end of the next session. After this, it will be reset to normal (non-forced) behaviour. 

   
 
### forceNewEraAlways()
- **interface**: `api.tx.staking.forceNewEraAlways`
- **summary**:   Force there to be a new era at the end of sessions indefinitely. 

  The dispatch origin must be Root. 

   
 
### forceNoEras()
- **interface**: `api.tx.staking.forceNoEras`
- **summary**:   Force there to be no new eras indefinitely. 

   
 
### forceUnstake(stash: `AccountId32`)
- **interface**: `api.tx.staking.forceUnstake`
- **summary**:   Force a current staker to become completely unstaked, immediately. 

  The dispatch origin must be Root. 

   
 
### increaseValidatorCount(additional: `Compact<u32>`)
- **interface**: `api.tx.staking.increaseValidatorCount`
- **summary**:   Increments the ideal number of validators. 

  The dispatch origin must be Root. 

   
 
### nominate(targets: `Vec<AccountId32>`)
- **interface**: `api.tx.staking.nominate`
- **summary**:   Declare the desire to nominate `targets` for the origin controller. 

  Effects will be felt at the beginning of the next era. This can only be called when [`EraElectionStatus`] is `Closed`. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### reapStash(stash: `AccountId32`)
- **interface**: `api.tx.staking.reapStash`
- **summary**:   Remove all data structure concerning a staker/stash once its balance is zero. This is essentially equivalent to `withdraw_unbonded` except it can be called by anyone and the target `stash` must have no funds left. 

  This can be called from any origin. 

  - `stash`: The stash account to reap. Its balance must be zero. 

   
 
### rebond(value: `Compact<u128>`)
- **interface**: `api.tx.staking.rebond`
- **summary**:   Rebond a portion of the stash scheduled to be unlocked. 

  The dispatch origin must be signed by the controller, and it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### setController(controller: `AccountId32`)
- **interface**: `api.tx.staking.setController`
- **summary**:   (Re-)set the controller of a stash. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the stash, not the controller. 

   
 
### setHistoryDepth(new_history_depth: `Compact<u32>`, _era_items_deleted: `Compact<u32>`)
- **interface**: `api.tx.staking.setHistoryDepth`
- **summary**:   Set `HistoryDepth` value. This function will delete any history information when `HistoryDepth` is reduced. 

  Parameters: 

  - `new_history_depth`: The new history depth you would like to set.

  - `era_items_deleted`: The number of items that will be deleted by this dispatch.   This should report all the storage items that will be deleted by clearing old    era history. Needed to report an accurate weight for the dispatch. Trusted by    `Root` to report an accurate number. 

  Origin must be root. 

   
 
### setInvulnerables(validators: `Vec<AccountId32>`)
- **interface**: `api.tx.staking.setInvulnerables`
- **summary**:   Set the validators who cannot be slashed (if any). 
 
### setMinimumBond(value: `u128`)
- **interface**: `api.tx.staking.setMinimumBond`
- **summary**:   Set the minimum bond amount. 
 
### setPayee(payee: `CrmlStakingRewardDestination`)
- **interface**: `api.tx.staking.setPayee`
- **summary**:   (Re-)set the payment target for a controller. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

   
 
### setValidatorCount(new: `Compact<u32>`)
- **interface**: `api.tx.staking.setValidatorCount`
- **summary**:   Sets the ideal number of validators. 

  The dispatch origin must be Root. 

   
 
### submitElectionSolution(winners: `Vec<u16>`, compact: `CrmlStakingCompactAssignments`, score: `[u128;3]`, era: `u32`, size: `CrmlStakingElectionSize`)
- **interface**: `api.tx.staking.submitElectionSolution`
- **summary**:   Submit an election result to the chain. If the solution: 

  1. is valid. 2. has a better score than a potentially existing solution on chain. 

  then, it will be _put_ on chain. 

  A solution consists of two pieces of data: 

  1. `winners`: a flat vector of all the winners of the round. 2. `assignments`: the compact version of an assignment vector that encodes the edge    weights. 

  Both of which may be computed using _phragmen_, or any other algorithm. 

  Additionally, the submitter must provide: 

  - The `score` that they claim their solution has. 

  Both validators and nominators will be represented by indices in the solution. The indices should respect the corresponding types ([`ValidatorIndex`] and [`NominatorIndex`]). Moreover, they should be valid when used to index into [`SnapshotValidators`] and [`SnapshotNominators`]. Any invalid index will cause the solution to be rejected. These two storage items are set during the election window and may be used to determine the indices. 

  A solution is valid if: 

  0. It is submitted when [`EraElectionStatus`] is `Open`. 1. Its claimed score is equal to the score computed on-chain. 2. Presents the correct number of winners. 3. All indexes must be value according to the snapshot vectors. All edge values must    also be correct and should not overflow the granularity of the ratio type (i.e. 256    or billion). 4. For each edge, all targets are actually nominated by the voter. 5. Has correct self-votes. 

  A solutions score is consisted of 3 parameters: 

  1. `min { support.total }` for each support of a winner. This value should be maximized. 2. `sum { support.total }` for each support of a winner. This value should be minimized. 3. `sum { support.total^2 }` for each support of a winner. This value should be    minimized (to ensure less variance) 

   
 
### submitElectionSolutionUnsigned(winners: `Vec<u16>`, compact: `CrmlStakingCompactAssignments`, score: `[u128;3]`, era: `u32`, size: `CrmlStakingElectionSize`)
- **interface**: `api.tx.staking.submitElectionSolutionUnsigned`
- **summary**:   Unsigned version of `submit_election_solution`. 

  Note that this must pass the [`ValidateUnsigned`] check which only allows transactions from the local node to be included. In other words, only the block author can include a transaction in the block. 

   
 
### unbond(value: `Compact<u128>`)
- **interface**: `api.tx.staking.unbond`
- **summary**:   Schedule a portion of the stash to be unlocked ready for transfer out after the bond period ends. If this leaves an amount actively bonded less than T::Currency::minimum_balance(), then it is increased to the full amount. 

  Once the unlock period is done, you can call `withdraw_unbonded` to actually move the funds out of management ready for transfer. 

  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`) can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need to be called first to remove some of the chunks (if possible). 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

  Emits `Unbonded`. 

  See also [`Call::withdraw_unbonded`]. 

   
 
### validate(prefs: `CrmlStakingValidatorPrefs`)
- **interface**: `api.tx.staking.validate`
- **summary**:   Declare the desire to validate for the origin controller. 

  Effects will be felt at the beginning of the next era. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

   
 
### withdrawUnbonded()
- **interface**: `api.tx.staking.withdrawUnbonded`
- **summary**:   Remove any unlocked chunks from the `unlocking` queue from our management. 

  This essentially frees up that balance to be used by the stash account to do whatever it wants. 

  The dispatch origin for this call must be _Signed_ by the controller, not the stash. And, it can be only called when [`EraElectionStatus`] is `Closed`. 

  Emits `Withdrawn`. 

  See also [`Call::unbond`]. 

   

___


## sudo
 
### setKey(new: `AccountId32`)
- **interface**: `api.tx.sudo.setKey`
- **summary**:   Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key. 

  The dispatch origin for this call must be _Signed_. 

   
 
### sudo(call: `Call`)
- **interface**: `api.tx.sudo.sudo`
- **summary**:   Authenticates the sudo key and dispatches a function call with `Root` origin. 

  The dispatch origin for this call must be _Signed_. 

   
 
### sudoAs(who: `AccountId32`, call: `Call`)
- **interface**: `api.tx.sudo.sudoAs`
- **summary**:   Authenticates the sudo key and dispatches a function call with `Signed` origin from a given account. 

  The dispatch origin for this call must be _Signed_. 

   
 
### sudoUncheckedWeight(call: `Call`, weight: `u64`)
- **interface**: `api.tx.sudo.sudoUncheckedWeight`
- **summary**:   Authenticates the sudo key and dispatches a function call with `Root` origin. This function does not check the weight of the call, and instead allows the Sudo user to specify the weight of the call. 

  The dispatch origin for this call must be _Signed_. 

   

___


## system
 
### fillBlock(ratio: `Perbill`)
- **interface**: `api.tx.system.fillBlock`
- **summary**:   A dispatch that will fill the block weight up to the given ratio. 
 
### killPrefix(prefix: `Bytes`, subkeys: `u32`)
- **interface**: `api.tx.system.killPrefix`
- **summary**:   Kill all storage items with a key that starts with the given prefix. 

  **NOTE:** We rely on the Root origin to provide us the number of subkeys under the prefix we are removing to accurately calculate the weight of this function. 
 
### killStorage(keys: `Vec<Bytes>`)
- **interface**: `api.tx.system.killStorage`
- **summary**:   Kill some items from storage. 
 
### remark(remark: `Bytes`)
- **interface**: `api.tx.system.remark`
- **summary**:   Make some on-chain remark. 

   
 
### remarkWithEvent(remark: `Bytes`)
- **interface**: `api.tx.system.remarkWithEvent`
- **summary**:   Make some on-chain remark and emit event. 

   
 
### setCode(code: `Bytes`)
- **interface**: `api.tx.system.setCode`
- **summary**:   Set the new runtime code. 

   
 
### setCodeWithoutChecks(code: `Bytes`)
- **interface**: `api.tx.system.setCodeWithoutChecks`
- **summary**:   Set the new runtime code without doing any checks of the given `code`. 

   
 
### setHeapPages(pages: `u64`)
- **interface**: `api.tx.system.setHeapPages`
- **summary**:   Set the number of pages in the WebAssembly environment's heap. 
 
### setStorage(items: `Vec<(Bytes,Bytes)>`)
- **interface**: `api.tx.system.setStorage`
- **summary**:   Set some items of storage. 

___


## timestamp
 
### set(now: `Compact<u64>`)
- **interface**: `api.tx.timestamp.set`
- **summary**:   Set the current time. 

  This call should be invoked exactly once per block. It will panic at the finalization phase, if this call hasn't been invoked by that time. 

  The timestamp should be greater than the previous one by the amount specified by `MinimumPeriod`. 

  The dispatch origin for this call must be `Inherent`. 

   

___


## tokenApprovals
 
### erc20Approval(caller: `H160`, spender: `H160`, asset_id: `u32`, amount: `u128`)
- **interface**: `api.tx.tokenApprovals.erc20Approval`
- **summary**:   Set approval for an account to transfer an amount of tokens on behalf of the caller Mapping from caller to spender and amount mapping(address => mapping(address => uint256)) private _allowances; 
 
### erc20RemoveApproval(caller: `H160`, spender: `H160`, asset_id: `u32`)
- **interface**: `api.tx.tokenApprovals.erc20RemoveApproval`
- **summary**:   Removes an approval over an account and asset_id 
 
### erc721Approval(caller: `H160`, operator_account: `H160`, token_id: `(u32,u32,u32)`)
- **interface**: `api.tx.tokenApprovals.erc721Approval`
- **summary**:   Set approval for a single NFT Mapping from token_id to operator clears approval on transfer 

___


## treasury
 
### approveProposal(proposal_id: `Compact<u32>`)
- **interface**: `api.tx.treasury.approveProposal`
- **summary**:   Approve a proposal. At a later time, the proposal will be allocated to the beneficiary and the original deposit will be returned. 

  May only be called from `T::ApproveOrigin`. 

   
 
### proposeSpend(value: `Compact<u128>`, beneficiary: `AccountId32`)
- **interface**: `api.tx.treasury.proposeSpend`
- **summary**:   Put forward a suggestion for spending. A deposit proportional to the value is reserved and slashed if the proposal is rejected. It is returned once the proposal is awarded. 

   
 
### rejectProposal(proposal_id: `Compact<u32>`)
- **interface**: `api.tx.treasury.rejectProposal`
- **summary**:   Reject a proposed spend. The original deposit will be slashed. 

  May only be called from `T::RejectOrigin`. 

   

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

  - `calls`: The calls to be dispatched from the same origin. The number of call must not   exceed the constant: `batched_calls_limit` (available in constant metadata). 

  If origin is root then call are dispatch without checking origin filter. (This includes bypassing `frame_system::Config::BaseCallFilter`). 

   

  This will return `Ok` in all circumstances. To determine the success of the batch, an event is deposited. If a call failed and the batch was interrupted, then the `BatchInterrupted` event is deposited, along with the number of successful calls made and the error of the failed call. If all were successful, then the `BatchCompleted` event is deposited. 
 
### batchAll(calls: `Vec<Call>`)
- **interface**: `api.tx.utility.batchAll`
- **summary**:   Send a batch of dispatch calls and atomically execute them. The whole transaction will rollback and fail if any of the calls failed. 

  May be called from any origin. 

  - `calls`: The calls to be dispatched from the same origin. The number of call must not   exceed the constant: `batched_calls_limit` (available in constant metadata). 

  If origin is root then call are dispatch without checking origin filter. (This includes bypassing `frame_system::Config::BaseCallFilter`). 

   
 
### dispatchAs(as_origin: `CennznetRuntimeOriginCaller`, call: `Call`)
- **interface**: `api.tx.utility.dispatchAs`
- **summary**:   Dispatches a function call with a provided origin. 

  The dispatch origin for this call must be _Root_. 

   
