---
 CENNZX
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

- **[RPC](#RPC)**

- **[Derive queries](#derive-queries)**

 
# Storage
 
### coreAssetId(): `AssetId`
- **interface**: `api.query.cennzx.coreAssetId`
- **summary**:   Asset Id of the core liquidity asset 
 
### defaultFeeRate(): `FeeRate`
- **interface**: `api.query.cennzx.defaultFeeRate`
- **summary**:   Default trading fee rate 
 
### liquidityBalance(`ExchangeKey, AccountId`): `BalanceOf`
- **interface**: `api.query.cennzx.liquidityBalance`
- **summary**:   Liquidity holdings of a user in an exchange pool. Key: `(core_asset_id, trade_asset_id), account_id` 
 
### totalLiquidity(`ExchangeKey`): `BalanceOf`
- **interface**: `api.query.cennzx.totalLiquidity`
- **summary**:   Total liquidity holdings of all investors in an exchange. ie/ total_liquidity(exchange) == sum(liquidity_balance(exchange, user)) at all times 
 
# Extrinsic
 
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
 
# Error
 
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
 
# Events
 
### AddLiquidity(`AccountId`, `Balance`, `AssetId`, `Balance`)
- **summary**:   Provider, core asset amount, trade asset id, trade asset amount 
 
### AssetBought(`AssetId`, `AssetId`, `AccountId`, `Balance`, `Balance`)
- **summary**:   AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### AssetSold(`AssetId`, `AssetId`, `AccountId`, `Balance`, `Balance`)
- **summary**:   AssetSold, AssetBought, Buyer, SoldAmount, BoughtAmount 
 
### RemoveLiquidity(`AccountId`, `Balance`, `AssetId`, `Balance`)
- **summary**:   Provider, core asset amount, trade asset id, trade asset amount 
 
# RPC
 
### buyPrice(AssetToBuy: `AssetId`, Amount: `Balance`, AssetToPay: `AssetId`): `PriceResponse`
- **interface**: `api.rpc.cennzx.buyPrice`
- **jsonrpc**: `cennzx_buyPrice`
- **summary**: Retrieves the spot exchange buy price
 
### liquidityPrice(AssetId: `AssetId`, liquidityToBuy: `Balance`): `LiquidityPriceResponse`
- **interface**: `api.rpc.cennzx.liquidityPrice`
- **jsonrpc**: `cennzx_liquidityPrice`
- **summary**: Get the price of liquidity for the given asset ID
 
### liquidityValue(AccountId: `Address`, AssetId: `AssetId`): `LiquidityValueResponse`
- **interface**: `api.rpc.cennzx.liquidityValue`
- **jsonrpc**: `cennzx_liquidityValue`
- **summary**: Get the value of an account's liquidity for the given asset
 
### sellPrice(AssetToSell: `AssetId`, Amount: `Balance`, AssetToPayout: `AssetId`): `PriceResponse`
- **interface**: `api.rpc.cennzx.sellPrice`
- **jsonrpc**: `cennzx_sellPrice`
- **summary**: Retrieves the spot exchange sell price
 
# Derive queries

- **interface**: api.derive.cennzx.function_name
# Module: cennzx/assetWithdrawn

## Table of contents

## Functions

### assetToWithdraw

▸ **assetToWithdraw**(`instanceId`, `api`): (`assetId`: `AnyNumber`, `liquidity`: `AnyNumber`) => `Observable`<`Object`\>

Given an asset Id and liquidity amount, the function returns the core and asset that can be withdrawn from exchange

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`assetId`, `liquidity`): `Observable`<`Object`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `AnyNumber` |
| `liquidity` | `AnyNumber` |

##### Returns

`Observable`<`Object`\>

#### Defined in

[packages/api/src/derives/cennzx/assetWithdrawn.ts:29](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/assetWithdrawn.ts#L29)

___

### assetToWithdrawAt

▸ **assetToWithdrawAt**(`instanceId`, `api`): (`hash`: `Hash`, `assetId`: `AnyNumber`, `liquidity`: `AnyNumber`) => `Observable`<`Object`\>

Given an asset Id and liquidity amount, the function returns the core and asset that can be withdrawn from exchange at a blockHash

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`hash`, `assetId`, `liquidity`): `Observable`<`Object`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Hash` | blockHash |
| `assetId` | `AnyNumber` |  |
| `liquidity` | `AnyNumber` | - |

##### Returns

`Observable`<`Object`\>

#### Defined in

[packages/api/src/derives/cennzx/assetWithdrawn.ts:54](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/assetWithdrawn.ts#L54)

# Module: cennzx/exchangeAddress

## Table of contents

## Functions

### exchangeAddress

▸ **exchangeAddress**(`instanceId`, `api`): (`assetId`: `AnyNumber`) => `Observable`<`string`\>

Returns the exchange address for a given assetId

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`assetId`): `Observable`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `AnyNumber` |

##### Returns

`Observable`<`string`\>

#### Defined in

[packages/api/src/derives/cennzx/exchangeAddress.ts:27](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/exchangeAddress.ts#L27)

# Module: cennzx/liquidityBalance

## Table of contents

## Functions

### liquidityBalance

▸ **liquidityBalance**(`instanceId`, `api`): (`assetId`: `AnyNumber`, `address`: `AnyAddress`) => `Observable`<`BN`\>

Gets the liquidity balance for an asset Id

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`assetId`, `address`): `Observable`<`BN`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `AnyNumber` |
| `address` | `AnyAddress` |

##### Returns

`Observable`<`BN`\>

#### Defined in

[packages/api/src/derives/cennzx/liquidityBalance.ts:29](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/liquidityBalance.ts#L29)

___

### liquidityBalanceAt

▸ **liquidityBalanceAt**(`instanceId`, `api`): (`hash`: `Hash`, `assetId`: `AnyNumber`, `address`: `AnyAddress`) => `Observable`<`BN`\>

Gets the liquidity balance for an asset Id at a given blockhash

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`hash`, `assetId`, `address`): `Observable`<`BN`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Hash` | blockHash |
| `assetId` | `AnyNumber` |  |
| `address` | `AnyAddress` |  |

##### Returns

`Observable`<`BN`\>

#### Defined in

[packages/api/src/derives/cennzx/liquidityBalance.ts:49](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/liquidityBalance.ts#L49)

# Module: cennzx/poolBalance

## Table of contents

## Functions

### poolAssetBalance

▸ **poolAssetBalance**(`instanceId`, `api`): (`assetId`: `AnyNumber`) => `Observable`<`Balance`\>

Returns the amount of asset in the exchange

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`assetId`): `Observable`<`Balance`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `AnyNumber` |

##### Returns

`Observable`<`Balance`\>

#### Defined in

[packages/api/src/derives/cennzx/poolBalance.ts:26](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/poolBalance.ts#L26)

___

### poolAssetBalanceAt

▸ **poolAssetBalanceAt**(`instanceId`, `api`): (`hash`: `Hash`, `assetId`: `AnyNumber`) => `Observable`<`Balance`\>

Returns the amount of asset in the exchange at a blockHash

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`hash`, `assetId`): `Observable`<`Balance`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Hash` | blockHash |
| `assetId` | `AnyNumber` |  |

##### Returns

`Observable`<`Balance`\>

#### Defined in

[packages/api/src/derives/cennzx/poolBalance.ts:56](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/poolBalance.ts#L56)

___

### poolCoreAssetBalance

▸ **poolCoreAssetBalance**(`instanceId`, `api`): (`assetId`: `AnyNumber`) => `Observable`<`Balance`\>

Returns the amount of core asset in the exchange for the asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`assetId`): `Observable`<`Balance`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `AnyNumber` |

##### Returns

`Observable`<`Balance`\>

#### Defined in

[packages/api/src/derives/cennzx/poolBalance.ts:42](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/poolBalance.ts#L42)

___

### poolCoreAssetBalanceAt

▸ **poolCoreAssetBalanceAt**(`instanceId`, `api`): (`hash`: `Hash`, `assetId`: `AnyNumber`) => `Observable`<`Balance`\>

Returns the amount of core asset in the exchange for the asset at a blockHash

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`hash`, `assetId`): `Observable`<`Balance`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Hash` | blockHash |
| `assetId` | `AnyNumber` |  |

##### Returns

`Observable`<`Balance`\>

#### Defined in

[packages/api/src/derives/cennzx/poolBalance.ts:73](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/poolBalance.ts#L73)

# Module: cennzx/shared

## Table of contents

## Functions

### coreAssetId

▸ **coreAssetId**(`instanceId`, `api`): () => `Observable`<`u32`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (): `Observable`<`u32`\>

##### Returns

`Observable`<`u32`\>

#### Defined in

[packages/api/src/derives/cennzx/shared.ts:20](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/shared.ts#L20)

___

### coreAssetIdAt

▸ **coreAssetIdAt**(`instanceId`, `api`): (`hash`: `Hash`) => `Observable`<`u32`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`hash`): `Observable`<`u32`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `Hash` |

##### Returns

`Observable`<`u32`\>

#### Defined in

[packages/api/src/derives/cennzx/shared.ts:24](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/shared.ts#L24)

___

### defaultFeeRate

▸ **defaultFeeRate**(`instanceId`, `api`): () => `Observable`<`Permill`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (): `Observable`<`Permill`\>

##### Returns

`Observable`<`Permill`\>

#### Defined in

[packages/api/src/derives/cennzx/shared.ts:28](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/shared.ts#L28)

___

### defaultFeeRateAt

▸ **defaultFeeRateAt**(`instanceId`, `api`): (`hash`: `Hash`) => `Observable`<`Permill`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`hash`): `Observable`<`Permill`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `Hash` |

##### Returns

`Observable`<`Permill`\>

#### Defined in

[packages/api/src/derives/cennzx/shared.ts:32](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/shared.ts#L32)

# Module: cennzx/totalLiquidity

## Table of contents

## Functions

### totalLiquidity

▸ **totalLiquidity**(`instanceId`, `api`): (`assetId`: `AnyNumber`) => `Observable`<`BN`\>

Returns the total liqudity in the exchange for the asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`assetId`): `Observable`<`BN`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `AnyNumber` |

##### Returns

`Observable`<`BN`\>

#### Defined in

[packages/api/src/derives/cennzx/totalLiquidity.ts:27](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/totalLiquidity.ts#L27)

___

### totalLiquidityAt

▸ **totalLiquidityAt**(`instanceId`, `api`): (`hash`: `Hash`, `assetId`: `AnyNumber`) => `Observable`<`BN`\>

Returns the total liqudity in the exchange for the asset at a blockHash

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceId` | `string` |
| `api` | `ApiInterfaceRx` |

#### Returns

`fn`

▸ (`hash`, `assetId`): `Observable`<`BN`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Hash` | blockHash |
| `assetId` | `AnyNumber` |  |

##### Returns

`Observable`<`BN`\>

#### Defined in

[packages/api/src/derives/cennzx/totalLiquidity.ts:43](https://github.com/cennznet/api.js/blob/1844291/packages/api/src/derives/cennzx/totalLiquidity.ts#L43)
