# CENNZNet Api

The CENNZNet JavaScript SDK for browsers, RN and Node.js.

# Install
`@cennznet/crml-*` are peer dependencies to `@cennznet/api`, they need to be installed together.
```
$> npm i --save @cennznet/api @cennznet/crml-generic-asset @cennznet/crml-cennzx-spot @cennznet/crml-attestation
```

**Do not put @plugnet/\* or @polkadot/\* in your package.json**

# Usage
## Register an endpoint for your project
[https://unfrastructure.io/](https://unfrastructure.io/)

## Connect to Rimu TestNet
`<Static>` [create(options?: ApiOptions | ProviderInterface)](https://cennznetdocs.com/api/latest/api/classes/_cennznet_api.api.md#create)

```
//initialize Api and connect to dev network
const {Api} = require('@cennznet/api')
api = await Api.create({
    provider: 'wss://rimu.unfrastructure.io/ws?apikey=***'
});
// For Rxjs
const {ApiRx} = require('@cennznet/api')
api = await ApiRx.create({
    provider: 'wss://rimu.unfrastructure.io/ws?apikey=***'
}).toPromise();
```

if provider is a string url, sdk will chose Provider Class based on url protocol. Or you can initialize the provider Instance yourself.
```
const {WsProvicer, HttpProvider} = require('@cennznet/api');
```

## Use SingleSource Extension as Signer
```
api.setSigner(window.SingleSource.signer);
```
## Use `@cennznet/wallet` as Signer

`npm i --save @cennznet/wallet`

```
const {SimpleKeyring, Wallet} = require('@cennznet/wallet')

wallet = new Wallet();
await wallet.createNewVault('a passphrase');

api.setSigner(wallet);
```
[Wallet Docs](https://cennznetdocs.com/api/latest/wallet/Overview.md)

# CennznetExtrinsic
All `api.tx.<section>.<method>(...)` return CennznetExtrinsic, which have
* `addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): CennznetExtrinsic` so transaction fee will be paid in specified Asset instead of `CentraPay`
* `addDoughnut(doughnut: DoughnutValue): CennznetExtrinsic` to embed a doughnut permission proof
* `fee(sender: AnyAddress): Promise<AssetOf> (or Observable<AssetOf> for ApiRx)`: estimate the transaction fee this extrinsic will cost  

[see more](https://cennznetdocs.com/api/latest/api/interfaces/_cennznet_api.icennznetextrinsic.md)

# Dynamic vs CRML SDK
> CRML stand for CENNZNet Runtime Module

After connecting to CENNZNet, api will dynamically create queries and transaction methods.

* `api.rpc.<section>.<method>` provides access to actual RPC calls, be it for queries, submission or retrieving chain information
* `api.query.<section>.<method>` provides access to chain state queries. These are dynamically populated based on what the runtime provides 
* `api.derive.<section>.<method>` provides access to build-in complex state queries which are combination of several basic state queries.
* `api.tx.<section>.<method>` provides the ability to create a transaction, like chain state, this list is populated from a runtime query 

With CRML sdks installed, they will inject themselves in api. `api.genericAsset`, `api.cennzxSpot` and `api.attestation`.
Queries, derive queries and tx methods are provided in under these namespaces.

|  | Dynamic | CRML |
|----| ----| ----|
| Up-To-Date | Always| require upgrade manually |
| IDE Hints | None, need to check docs/metadata | accurate typescript type definition |
| Addition Validations | None, e.g: transfer might fail if no enough balance. pay tx fee anyway. | Yes. will stop sending tx, e.g: no enough balance |      



---------
[More Api Examples](../../docs/examples)

