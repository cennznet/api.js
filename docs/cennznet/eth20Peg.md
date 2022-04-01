---
 Erc20 Peg
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

 
# Storage
 
### assetIdToErc20(`u32`): `Option<H160>`
- **interface**: `api.query.erc20Peg.assetIdToErc20`
- **summary**:   Map GA asset Id to ERC20 address 
 
### cENNZDepositsActive(): `bool`
- **interface**: `api.query.erc20Peg.cENNZDepositsActive`
- **summary**:   Whether CENNZ deposits are active 
 
### contractAddress(): `H160`
- **interface**: `api.query.erc20Peg.contractAddress`
- **summary**:   The peg contract address on Ethereum 
 
### depositsActive(): `bool`
- **interface**: `api.query.erc20Peg.depositsActive`
- **summary**:   Whether deposit are active 
 
### erc20Meta(`H160`): `Option<(Bytes,u8)>`
- **interface**: `api.query.erc20Peg.erc20Meta`
- **summary**:   Metadata for well-known erc20 tokens (symbol, decimals) 
 
### erc20ToAssetId(`H160`): `Option<u32>`
- **interface**: `api.query.erc20Peg.erc20ToAssetId`
- **summary**:   Map ERC20 address to GA asset Id 
 
### withdrawalDigests(`u64`): `H256`
- **interface**: `api.query.erc20Peg.withdrawalDigests`
- **summary**:   Hash of withdrawal information 
 
### withdrawalsActive(): `bool`
- **interface**: `api.query.erc20Peg.withdrawalsActive`
- **summary**:   Whether withdrawals are active 
 
# Extrinsic
 
### activateCennzDeposits()
- **interface**: `api.tx.erc20Peg.activateCennzDeposits`
 
### activateDeposits(activate: `bool`)
- **interface**: `api.tx.erc20Peg.activateDeposits`
- **summary**:   ctivate/deactivate deposits (root only) 
 
### activateWithdrawals(activate: `bool`)
- **interface**: `api.tx.erc20Peg.activateWithdrawals`
- **summary**:   ctivate/deactivate withdrawals (root only) 
 
### depositClaim(tx_hash: `H256`, claim: `CrmlErc20PegErc20DepositEvent`)
- **interface**: `api.tx.erc20Peg.depositClaim`
 
### setContractAddress(eth_address: `H160`)
- **interface**: `api.tx.erc20Peg.setContractAddress`
 
### setErc20Meta(details: `Vec<(H160,Bytes,u8)>`)
- **interface**: `api.tx.erc20Peg.setErc20Meta`
 
### withdraw(asset_id: `u32`, amount: `u128`, beneficiary: `H160`)
- **interface**: `api.tx.erc20Peg.withdraw`
 
# Error
 
# Events
 
### CENNZDepositsActive()
- **interface**: `api.events.erc20Peg.CENNZDepositsActive.is`
- **summary**:   RC20 CENNZ deposits activated 
 
### Erc20Claim(`u64`, `AccountId32`)
- **interface**: `api.events.erc20Peg.Erc20Claim.is`
- **summary**:   n erc20 deposit claim has started. (deposit Id, sender) 
 
### Erc20Deposit(`u64`, `u32`, `u128`, `AccountId32`)
- **interface**: `api.events.erc20Peg.Erc20Deposit.is`
- **summary**:    bridged erc20 deposit succeeded.(deposit Id, asset, amount, beneficiary) 
 
### Erc20DepositFail(`u64`)
- **interface**: `api.events.erc20Peg.Erc20DepositFail.is`
- **summary**:    bridged erc20 deposit failed.(deposit Id) 
 
### Erc20Withdraw(`u64`, `u32`, `u128`, `H160`)
- **interface**: `api.events.erc20Peg.Erc20Withdraw.is`
- **summary**:   okens were burnt for withdrawal on Ethereum as ERC20s (withdrawal Id, asset, amount, beneficiary) 
 
### SetContractAddress(`H160`)
- **interface**: `api.events.erc20Peg.SetContractAddress.is`
- **summary**:   he peg contract address has been set 
 
# RPC
