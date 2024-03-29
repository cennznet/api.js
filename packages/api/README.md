# CENNZnet Api

The CENNZnet JavaScript API for browsers, RN, and Node.js.

## Install

```
yarn add @cennznet/api
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

## TypeScript Config

Add the following configuration to make TS aware of our custom types

```json
{
  "compilerOptions": {
    "paths": {
      "@polkadot/types": [
        "./node_modules/@cennznet/types/interfaces/augment-api.d.ts"
      ],
      "@polkadot/types/augment": [
        "./node_modules/@cennznet/types/interfaces/augment-types.d.ts"
      ]
    }
  }
}
```

---

See the [wiki](https:///wiki.cennz.net) for more or try the [api examples](../../docs/examples).
Please check [upgrade guide](https://hackmd.io/VbsHZhKkTiWwaTBYp1Unbw) for 2.1.x versions, connects to node  cennznet/cennznet:2.1.0
