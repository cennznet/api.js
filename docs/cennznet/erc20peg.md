---
 ERC20 Peg
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

 
# Storage
 
### assetIdToErc20(`AssetId`): `Option<EthAddress>`
- **interface**: `api.query.erc20Peg.assetIdToErc20`
- **summary**:   Map GA asset Id to ERC20 address 
 
### cENNZDepositsActive(): `bool`
- **interface**: `api.query.erc20Peg.cENNZDepositsActive`
- **summary**:   Whether CENNZ deposits are active 
 
### contractAddress(): `EthAddress`
- **interface**: `api.query.erc20Peg.contractAddress`
- **summary**:   The peg contract address on Ethereum 
 
### depositsActive(): `bool`
- **interface**: `api.query.erc20Peg.depositsActive`
- **summary**:   Whether deposit are active 
 
### erc20Meta(`EthAddress`): `Option<(Bytes,u8)>`
- **interface**: `api.query.erc20Peg.erc20Meta`
- **summary**:   Metadata for well-known erc20 tokens 
 
### erc20ToAssetId(`EthAddress`): `Option<AssetId>`
- **interface**: `api.query.erc20Peg.erc20ToAssetId`
- **summary**:   Map ERC20 address to GA asset Id 
 
### withdrawalsActive(): `bool`
- **interface**: `api.query.erc20Peg.withdrawalsActive`
- **summary**:   Whether withdrawals are active 
 
# Extrinsic
 
### activateCennzDeposits()
- **interface**: `api.tx.erc20Peg.activateCennzDeposits`
 
### activateDeposits(activate: `bool`)
- **interface**: `api.tx.erc20Peg.activateDeposits`
- **summary**:   Activate/deactivate deposits (root only) 
 
### activateWithdrawals(activate: `bool`)
- **interface**: `api.tx.erc20Peg.activateWithdrawals`
- **summary**:   Activate/deactivate withdrawals (root only) 
 
### depositClaim(tx_hash: `H256`, claim: `Erc20DepositEvent`)
- **interface**: `api.tx.erc20Peg.depositClaim`
 
### setContractAddress(eth_address: `EthAddress`)
- **interface**: `api.tx.erc20Peg.setContractAddress`
 
### withdraw(asset_id: `AssetId`, amount: `Balance`, beneficiary: `EthAddress`)
- **interface**: `api.tx.erc20Peg.withdraw`
 
# Error
 
# Events
 
### CENNZDepositsActive()
- **summary**:   ERC20 CENNZ deposits activated 
 
### Erc20Claim(`u64`, `AccountId`)
- **summary**:   An erc20 deposit claim has started. (deposit Id, sender) 
 
### Erc20Deposit(`u64`, `AssetId`, `Balance`, `AccountId`)
- **summary**:   A bridged erc20 deposit succeeded.(deposit Id, asset, amount, beneficiary) 
 
### Erc20DepositFail(`u64`)
- **summary**:   A bridged erc20 deposit failed.(deposit Id) 
 
### Erc20MockWithdraw(`u64`)
- **summary**:   Mock withdraw 
 
### Erc20Withdraw(`u64`, `AssetId`, `Balance`, `EthAddress`)
- **summary**:   Tokens were burnt for withdrawal on Ethereum as ERC20s (withdrawal Id, asset, amount, beneficiary) 
 
### SetContractAddress(`EthAddress`)
- **summary**:   The peg contract address has been set 
 
