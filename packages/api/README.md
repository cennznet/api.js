# CENNZNet Api

The CENNZNet JavaScript SDK for browsers, RN and Node.js.

## Quick Start

You must use **yarn** with @cennznet/api and set the following **resolutions** in your package.json, otherwise your install may break due to breaking changes in downstream package versions.

## Install

```
$> npm i --save @cennznet/api
```

At the moment a breaking change in the recent versions of polkadot has prevented us from updating with the recent versions. 
That's why in package.json there should be a resolution set so we can make sure the right version of polkadot packages are fetched. Therefore you need to have the following lines in your package.json:
```json
"dependencies": {
  "@cennznet/api": "^1.2.1"
},
"resolutions": {
  "@polkadot/types": "1.2.1",
  "@polkadot/metadata": "1.2.1",
  "@polkadot/api": "1.2.1",
  "@polkadot/api-derive": "1.2.1",
  "@polkadot/rpc-core": "1.2.1",
  "@polkadot/rpc-provider": "1.2.1",
  "@polkadot/jsonrpc": "1.2.1",
}
``` 
Please use yarn as package manager to install the above dependecies.
## Usage

The cennznet's main network is residing at `wss://cennznet.unfrastructure.io/public/ws`. 
If you use this address to connect to our main network which is called Azalea, you automatically get connected to one of the cennznet's validator/full nodes. 
However you may want to run your own local node and connect to that for testing. To do so you can checkout the docker-compose script that we have provided in this project and also mentioned it later in this document. 
Alternatively you can have a look at [Running a full cennznet node](https://github.com/cennznet/cennznet/wiki/Running-a-Full-Node). 
In the case that you are connecting to Azalea, your connect snippet would look like:
```js
const provider = 'wss://cennznet.unfrastructure.io/public/ws';
const api = await Api.create({provider});
```  
But if you are connecting to your own local node, it can be as simple as:
```js
const api = await Api.create();
```

```
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

We suggest passing provider as a string url, sdk will chose Provider Class based on url protocol. Or you can initialize the provider Instance yourself.

## CennznetExtrinsic

All `api.tx.<section>.<method>(...)` return CennznetExtrinsic, which have

To use doughnut or feeExchange, it is required to pass them as part of SignerOption

```
const tx = api.tx.genericAsset.transfer(16000, 'some address', 1000000);

tx.signAndSend('sender address', {doughnut, feeExchangeOpt}, callbackFn);
```

[see more](https://github.com/cennznet/cennznet/wiki/Javascript-API-Reference#sending-extrinsics-with-doughnut)

## Dynamic

After connecting to CENNZNet, api will dynamically create queries and transaction methods.

- `api.rpc.<section>.<method>` provides access to actual RPC calls, be it for queries, submission or retrieving chain information
- `api.query.<section>.<method>` provides access to chain state queries. These are dynamically populated based on what the runtime provides
- `api.derive.<section>.<method>` provides access to build-in complex state queries which are combination of several basic state queries.
- `api.tx.<section>.<method>` provides the ability to create a transaction, like chain state, this list is populated from a runtime query

---

[More Api Examples](../../docs/examples)