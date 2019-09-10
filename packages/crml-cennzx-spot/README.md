# `cennznet-js/crml-cennzx-spot`

A sdk providing additional features for cennzx spot runtime module


# Install

It is installed along with `@cennznet/api`

```
$> npm i --save @cennznet/api
```



# USAGE

`@cennznet/api` will create a instance of cennzxSpot after it finishes initialization.
```
// node --experimental-repl-await
// initialize Api and connect to dev network
const {Api} = require('@cennznet/api')
const api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});

const cennzxSpot = api.cennzxSpot;

// for Rxjs
const {ApiRx} = require('@cennznet/api')
const apiRx = await ApiRx.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});

const cennzxSpotRx = apiRx.cennzxSpot;
```

# Derives
All derives related to crml-cennzx-spot are defined in this library, which can be access from both CennzxSpot instance and `api.derives.cennzxSpot.*`

* exchangeAddress
* inputPrice / inputPriceAt
* outputPrice / outputPriceAt
* liquidityBalance / liquidityBalanceAt
* totalLiquidity / totalLiquidityAt

check [API Docs](https://cennznetdocs.com/api/latest/api/classes/_cennznet_crml_cennzx_spot.cennzxspot.md) for more information


# Cookbook
## Add liquidity
```
const coreAssetId = 16001;
const tradeAssetA = 16000;
const tradeAssetB = 16002;

const investAmount: number = 1000;
const maxAssetAmount = '1000';
await cennzxSpot
    .addLiquidity(tradeAssetA, 0, maxAssetAmount, investAmount)
    .signAndSend(investor.address, ({events, status}: SubmittableResult) => {
        if (status.isFinalized && events !== undefined) {
            let isCreated = false;
            for (let i = 0; i < status.events.length; i += 1) {
                const event = events[i];
                if (event.event.method === 'AddLiquidity') {
                    // Liquidity added      
                }
            }
        }
    });
```
## Remove liquidity
```           
#liquidity -> amount to remove
await cennzxSpot.removeLiquidity(tradeAssetA, liquidity, 1, 1)
    .signAndSend(investor.address, ({events, status}: SubmittableResult) => {
        if (status.isFinalized && events !== undefined) {
        let isRemoved = false;
        for (let i = 0; i < status.events.length; i += 1) {
            const event = events[i];
            if (event.event.method === 'RemoveLiquidity') {
            }
        }
    }
});
```   
## Buy Asset with Another Asset
Given a certain `amountBought`, `assetBought` and `assetSold`

Paying no more than `maxPayingAmount` of `assetSold` in order to trade for `amountBought` of `assetBought`
```
//1) query current exchange rate
const expectCost = await cennzxSpot.getOutputPrice(assetSold, assetBought, amountBought);

//2) add a buffer in case price goes up, let's say 2%
const maxPayingAmount = expectCost.muln(1.02);

//3) commit the exchange tx
await cennzxSpot
    .assetSwapOutput(assetSold, assetBought, amountBought, maxPayingAmount)
    .signAndSend(trader.address, ({events, status}: SubmittableResult) => {
        if (status.isFinalized && events !== undefined) {
            let trade = false;
            for (let i = 0; i < status.events.length; i += 1) {
                const event = events[i];
                if (event.event.method === 'TradeAssetPurchase') { // check if ExtrinsicFailed or successful
                }
            }
        }
    });
```

## Buy Asset and transfer to a 3rd party account

```
await cennzxSpot
    .assetTransferOutput(recipient, assetSold, assetBought, amountBought, maxPayingAmount)
    .signAndSend(trader.address, ({events, status}: SubmittableResult) => {
        if (status.isFinalized && events !== undefined) {
            let trade = false;
            for (let i = 0; i < status.events.length; i += 1) {
                const event = events[i];
                if (event.event.method === 'TradeAssetPurchase') { // check if ExtrinsicFailed or successful
                }
            }
        }
    });
```

## Sell Asset with Another Asset
Given a certain `amountSell`, `assetSold` and `assetBought`

Sell `amountSell` of `assetSold` to gain no less than `minReceive` amount of `AssetBought`
```
//1) query current exchange rate
const expectReceive = await cennzxSpot.getInputPrice(assetSold, assetBought, amountSell);

//2) add a buffer in case price goes down, let's say 2%
const minReceive = expectReceive.muln(0.98);

//3) commit the exchange tx
await cennzxSpot
    .assetSwapInput(assetSold, assetBought, amountSell, minReceive)
    .signAndSend(trader.address, ({events, status}: SubmittableResult) => {
        if (status.isFinalized && events !== undefined) {
            let trade = false;
            for (let i = 0; i < status.events.length; i += 1) {
                const event = events[i];
                if (event.event.method === 'TradeAssetPurchase') { // check if ExtrinsicFailed or successful
                }
            }
        }
    });
```

## Sell Asset and transfer the gained Asset to a 3rd party account
```
await cennzxSpot
    .assetTransferInput(recipient, assetSold, assetBought, amountSell, minReceive)
    .signAndSend(trader.address, ({events, status}: SubmittableResult) => {
            if (status.isFinalized && events !== undefined) {
            let trade = false;
            for (let i = 0; i < status.events.length; i += 1) {
                const event = events[i];
                if (event.event.method === 'TradeAssetPurchase') { // check if ExtrinsicFailed or successful
                }
            }
        }
    });
```
