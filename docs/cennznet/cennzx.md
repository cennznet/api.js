---
 CENNZX
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

- **[RPC](#RPC)**

 
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
