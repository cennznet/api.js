# CENNZnet Api

The CENNZnet JavaScript API for browsers, RN, and Node.js.

## Install

```
$> npm i --save @cennznet/api
```

## Usage

Connect to a node websocket (local):
```js
const api = await Api.create(); // defaults to 'ws://localhost:9944'
```

Connect to a custom endpoint e.g Nikau 🌴 testnet
```js
// initialize Api and connect to dev network
const {Api} = require('@cennznet/api')
api = await Api.create({
    provider: 'wss://nikau.centrality.me/public/ws'
});
// For Rxjs
const {ApiRx} = require('@cennznet/api')
api = await ApiRx.create({
    provider: 'wss://nikau.centrality.me/public/ws'
}).toPromise();
```

## CennznetExtrinsic

All `api.tx.<section>.<method>(...)` return CennznetExtrinsic type.

To set fee exchange options on a transaction, it should be included as an additional argument when signing e.g

```
const tx = api.tx.genericAsset.transfer(16000, 'some address', 1000000);

tx.signAndSend('sender address', {feeExchangeOpt}, callbackFn);
```

## Dynamic

After connecting to a CENNZnet node, api will dynamically create queries and transaction methods.

- `api.rpc.<section>.<method>` provides access to actual RPC calls, be it for queries, submission or retrieving chain information
- `api.query.<section>.<method>` provides access to chain state queries. These are dynamically populated based on what the runtime provides
- `api.derive.<section>.<method>` provides access to built-in complex state queries which are combination of several basic state queries.
- `api.tx.<section>.<method>` provides the ability to create a transaction, like chain state, this list is populated from a runtime query

---

See the [wiki](https:///wiki.cennz.net) for more or try the [api examples](../../docs/examples)