---
 Generic Asset
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

- **[RPC](#RPC)**

 
# Storage
 
### assetMeta(`u32`): `CrmlGenericAssetAssetInfo`
- **interface**: `api.query.genericAsset.assetMeta`
- **summary**:   The info for assets 
 
### freeBalance(`u32, AccountId32`): `u128`
- **interface**: `api.query.genericAsset.freeBalance`
- **summary**:   The free balance of a given asset under an account. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### locks(`u32, AccountId32`): `Vec<CrmlGenericAssetBalanceLock>`
- **interface**: `api.query.genericAsset.locks`
- **summary**:   Any liquidity locks on some account balances. 
 
### nextAssetId(): `u32`
- **interface**: `api.query.genericAsset.nextAssetId`
- **summary**:   Next available ID for user-created asset. 
 
### permissions(`u32`): `CrmlGenericAssetPermissionVersions`
- **interface**: `api.query.genericAsset.permissions`
- **summary**:   Permission options for a given asset. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### reservedBalance(`u32, AccountId32`): `u128`
- **interface**: `api.query.genericAsset.reservedBalance`
- **summary**:   The reserved balance of a given asset under an account. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### spendingAssetId(): `u32`
- **interface**: `api.query.genericAsset.spendingAssetId`
- **summary**:   The identity of the asset which is the one that is designated for paying the chain's transaction fee. 
 
### stakingAssetId(): `u32`
- **interface**: `api.query.genericAsset.stakingAssetId`
- **summary**:   The identity of the asset which is the one that is designated for the chain's staking system. 
 
### storageVersion(): `u32`
- **interface**: `api.query.genericAsset.storageVersion`
- **summary**:   Storage version of the pallet. 

  This is set to v1 for new networks. 
 
### totalIssuance(`u32`): `u128`
- **interface**: `api.query.genericAsset.totalIssuance`
- **summary**:   Total issuance of a given asset. 

  TWOX-NOTE: `AssetId` is trusted. 
 
# Extrinsic
 
### burn(asset_id: `Compact<u32>`, target: `AccountId32`, amount: `u128`)
- **interface**: `api.tx.genericAsset.burn`
- **summary**:   urns an asset, decreases its total issuance. Deduct the money from target account he `origin` must have `burn` permissions. 

  eights: (1) Limited number of reads/writes. 
 
### create(owner: `AccountId32`, options: `CrmlGenericAssetAssetOptions`, info: `CrmlGenericAssetAssetInfo`)
- **interface**: `api.tx.genericAsset.create`
- **summary**:   reate a new kind of asset and nominates the owner of this asset. he asset_id will be the next unoccupied asset_id ccounts who will have the permissions to mint/burn/change permission are passed in via 'options' rigin of this call must be root. 

  eights: (1) Limited number of read and writes. hould not be called often. 
 
### createReserved(asset_id: `u32`, options: `CrmlGenericAssetAssetOptions`, info: `CrmlGenericAssetAssetInfo`)
- **interface**: `api.tx.genericAsset.createReserved`
- **summary**:   reate a new asset with reserved asset_id. nternally calls create_asset with an asset_id equires Root call. 

  eights: (1) Limited read/writes 
 
### mint(asset_id: `Compact<u32>`, to: `AccountId32`, amount: `u128`)
- **interface**: `api.tx.genericAsset.mint`
- **summary**:   ints an asset, increases its total issuance. Deposits the newly minted currency into target account he origin must have `mint` permissions. 

  eights: (1) limited number of read/writes 
 
### transfer(asset_id: `Compact<u32>`, to: `AccountId32`, amount: `Compact<u128>`)
- **interface**: `api.tx.genericAsset.transfer`
- **summary**:   ransfer some liquid free balance to another account. 

  transfer` will set the `FreeBalance` of the sender and receiver. t will decrease the total issuance of the system by the `TransferFee`. f the sender's account is below the existential deposit as a result f the transfer, the account will be reaped. 

  he dispatch origin for this call must be `Signed` by the transactor. 

    
 
### transferAll(asset_id: `Compact<u32>`, to: `AccountId32`)
- **interface**: `api.tx.genericAsset.transferAll`
- **summary**:   ransfer all of the free balance of `asset_id` to another account. 
 
### updateAssetInfo(asset_id: `Compact<u32>`, info: `CrmlGenericAssetAssetInfo`)
- **interface**: `api.tx.genericAsset.updateAssetInfo`
- **summary**:   pdates asset info for a given `asset_id`. 

  he `origin` must have `update` permission. 

  eights: (1) limited number of read and writes xpected to not be called frequently 
 
### updatePermission(asset_id: `Compact<u32>`, new_permission: `CrmlGenericAssetPermissionsV1`)
- **interface**: `api.tx.genericAsset.updatePermission`
- **summary**:   pdates permissions(mint/burn/change permission) for a given `asset_id` and an account. 

  he `origin` must have `update` permission. 

  eights: (1) limited number of read and writes xpected to not be called frequently 
 
# Error
 
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
 
# Events
 
### AssetInfoUpdated(`u32`, `CrmlGenericAssetAssetInfo`)
- **interface**: `api.events.genericAsset.AssetInfoUpdated.is`
- **summary**:   sset info updated (asset_id, asset_info). 
 
### Burned(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Burned.is`
- **summary**:   sset burned (asset_id, account, amount). 
 
### Created(`u32`, `AccountId32`, `CrmlGenericAssetAssetOptions`)
- **interface**: `api.events.genericAsset.Created.is`
- **summary**:   sset created (asset_id, creator, asset_options). 
 
### DustReclaimed(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.DustReclaimed.is`
- **summary**:   sset balance storage has been reclaimed due to falling below the existential deposit 
 
### Minted(`u32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Minted.is`
- **summary**:   ew asset minted (asset_id, account, amount). 
 
### PermissionUpdated(`u32`, `CrmlGenericAssetPermissionsV1`)
- **interface**: `api.events.genericAsset.PermissionUpdated.is`
- **summary**:   sset permission updated (asset_id, new_permissions). 
 
### Transferred(`u32`, `AccountId32`, `AccountId32`, `u128`)
- **interface**: `api.events.genericAsset.Transferred.is`
- **summary**:   sset transfer succeeded (asset_id, from, to, amount). 
 
# RPC
 
### getBalance(AccountId: `AccountId`, AssetId: `AssetId`): `BalanceInformation`
- **interface**: `api.rpc.genericAsset.getBalance`
- **jsonrpc**: `genericAsset_getBalance`
- **summary**: Get balance for users generic assets
 
### registeredAssets(): `Vec<(AssetId, AssetInfo)>`
- **interface**: `api.rpc.genericAsset.registeredAssets`
- **jsonrpc**: `genericAsset_registeredAssets`
- **summary**: Get all registered generic assets (symbol, decimal places)
