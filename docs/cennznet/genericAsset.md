---
 Generic Asset
---

The following sections contain the module details. 

 
#Storage
 
### assetMeta(`AssetId`): `AssetInfo`
- **interface**: `api.query.genericAsset.assetMeta`
- **summary**:   The info for assets 
 
### freeBalance(`AssetId, AccountId`): `Balance`
- **interface**: `api.query.genericAsset.freeBalance`
- **summary**:   The free balance of a given asset under an account. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### locks(`AccountId`): `Vec<BalanceLock>`
- **interface**: `api.query.genericAsset.locks`
- **summary**:   Any liquidity locks on some account balances. 
 
### nextAssetId(): `AssetId`
- **interface**: `api.query.genericAsset.nextAssetId`
- **summary**:   Next available ID for user-created asset. 
 
### permissions(`AssetId`): `PermissionVersions`
- **interface**: `api.query.genericAsset.permissions`
- **summary**:   Permission options for a given asset. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### reservedBalance(`AssetId, AccountId`): `Balance`
- **interface**: `api.query.genericAsset.reservedBalance`
- **summary**:   The reserved balance of a given asset under an account. 

  TWOX-NOTE: `AssetId` is trusted. 
 
### spendingAssetId(): `AssetId`
- **interface**: `api.query.genericAsset.spendingAssetId`
- **summary**:   The identity of the asset which is the one that is designated for paying the chain's transaction fee. 
 
### stakingAssetId(): `AssetId`
- **interface**: `api.query.genericAsset.stakingAssetId`
- **summary**:   The identity of the asset which is the one that is designated for the chain's staking system. 
 
### totalIssuance(`AssetId`): `Balance`
- **interface**: `api.query.genericAsset.totalIssuance`
- **summary**:   Total issuance of a given asset. 

  TWOX-NOTE: `AssetId` is trusted. 
 
#Extrinsic
 
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
 
#Errors
 
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
 
#Events
 
### AssetInfoUpdated(`AssetId`, `AssetInfo`)
- **summary**:   Asset info updated (asset_id, asset_info). 
 
### Burned(`AssetId`, `AccountId`, `Balance`)
- **summary**:   Asset burned (asset_id, account, amount). 
 
### Created(`AssetId`, `AccountId`, `AssetOptions`)
- **summary**:   Asset created (asset_id, creator, asset_options). 
 
### Minted(`AssetId`, `AccountId`, `Balance`)
- **summary**:   New asset minted (asset_id, account, amount). 
 
### PermissionUpdated(`AssetId`, `PermissionLatest`)
- **summary**:   Asset permission updated (asset_id, new_permissions). 
 
### Transferred(`AssetId`, `AccountId`, `AccountId`, `Balance`)
- **summary**:   Asset transfer succeeded (asset_id, from, to, amount). 
 
#RPC
 
### registeredAssets(): `Vec<(AssetId, AssetInfo)>`
- **interface**: `api.rpc.genericAsset.registeredAssets`
- **jsonrpc**: `genericAsset_registeredAssets`
- **summary**: Get all registered generic assets (symbol, decimal places)
