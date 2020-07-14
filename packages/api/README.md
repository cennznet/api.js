# CENNZNet Api

The CENNZNet JavaScript SDK for browsers, RN and Node.js.

## Release notes
[10/07/2020]  1.0.3 version:
    - `@cennznet/api@1.0.3` (current stage) is working with [cennznet/cennznet:latest][cennznet/cennznet:latest];

Changes made in this version:

- CENNZX + GA RPC call support

## Release notes
[27/03/2020]  1.0.0 version:

 - `@cennznet/api@1.0.0` (current stage) is working with [cennznet/cennznet:latest][cennznet/cennznet:latest];

Changes made in this version:
 
- Derived query for estimating fee is updated.
- New format to use fee exchange.
```
    const feeExchange = {
                        assetId: feeAssetId,
                        maxPayment: '50000000000000000',
                    };
                    const transactionPayment = {
                        tip: 2,
                        feeExchange: {
                            FeeExchangeV1: feeExchange,
                        },
                    };
```
- CENNZX rpc call to get price queries.
- Removed plugnet dependencies.
- Support MultiSignature, registry, discontinue support to v1.

[21/02/2020]  Upgraded to polkadot's 1.1.1 version:

- `@cennznet/api@0.20.7-dev.2` is the last version working with `cennznet/cennznet:1.0.0-rc2`;
- Current stage is working with [cennznet/cennznet:1.0.0-rc1][cennznet/cennznet:1.0.0-rc1];

[17/01/2020] Proper document to be added when 1.0.0 final is releasing, here is a quick note:

- `@cennznet/api@0.20.7` is the last version working with `cennznet/cennznet:0.*.*`;
- `@cennznet/api@1.0.0-alpha.**`(current stage) is working with [cennznet/cennznet:1.0.0-rc1][cennznet/cennznet:1.0.0-rc1];
- `@cennznet/api@1.0.0-beta.**`(next stage) is planned to work with `cennznet/cennznet:1.0.0-rc2`(to be released);

Changes made in alpha version:

- Changed dependencies from `@plugnet/api` to `@polkadot/api@0.96.1` (breaking changes were introduced in `@polkadot/api@0.97.1`, which could be upgraded in beta releases);

---

## Install

```
$> npm i --save @cennznet/api
```

**Do not put @plugnet/\* or @polkadot/\* in your package.json**

## Usage

### Register an endpoint for your project

[https://unfrastructure.io/](https://unfrastructure.io/)

### Connect to Rimu TestNet

`<Static>` [create(options?: ApiOptions)](https://cennznetdocs.com/api/latest/api/classes/_cennznet_api.api.md#create)

```
// initialize Api and connect to dev network
// register your own endpoint at https://www.unfrastructure.io
const {Api} = require('@cennznet/api')
api = await Api.create({
    provider: 'wss://rimu.unfrastructure.io/public/ws'
});
// For Rxjs
const {ApiRx} = require('@cennznet/api')
api = await ApiRx.create({
    provider: 'wss://rimu.unfrastructure.io/public/ws'
}).toPromise();
```

We suggest passing provider as a string url, sdk will chose Provider Class based on url protocol. Or you can initialize the provider Instance yourself.

### Use SingleSource Extension as Signer

[check here](https://github.com/cennznet/singlesource-extension)

### Use `@cennznet/wallet` as Signer

`npm i --save @cennznet/wallet`

```
const {SimpleKeyring, Wallet} = require('@cennznet/wallet')

wallet = new Wallet();
await wallet.createNewVault('a passphrase');

api.setSigner(wallet);
```

[Wallet Docs](https://cennznetdocs.com/api/latest/wallet/Overview.md)

## CennznetExtrinsic

All `api.tx.<section>.<method>(...)` return CennznetExtrinsic, which have

- `addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): CennznetExtrinsic` so transaction fee will be paid in specified Asset instead of `CentraPay`
- `addDoughnut(doughnut: DoughnutValue): CennznetExtrinsic` to embed a doughnut permission proof
- `fee(sender: AnyAddress): Promise<AssetOf> (or Observable<AssetOf> for ApiRx)`: estimate the transaction fee this extrinsic will cost

To use doughnut or feeExchange, apart from attaching them to extrinsic, now it is also required to pass them as part of SignerOption

```
const tx = api.tx.genericAsset.transfer(16000, 'some address', 1000000);
tx.addDoughnut(doughnut);
tx.addFeeExchangeOpt(feeExchangeOpt);

tx.signAndSend('sender address', {doughnut, feeExchangeOpt}, callbackFn);
```

[see more](https://cennznetdocs.com/api/latest/api/interfaces/_cennznet_api.icennznetextrinsic.md)

## Dynamic vs CRML SDK

> CRML stand for CENNZNet Runtime Module

After connecting to CENNZNet, api will dynamically create queries and transaction methods.

- `api.rpc.<section>.<method>` provides access to actual RPC calls, be it for queries, submission or retrieving chain information
- `api.query.<section>.<method>` provides access to chain state queries. These are dynamically populated based on what the runtime provides
- `api.derive.<section>.<method>` provides access to build-in complex state queries which are combination of several basic state queries.
- `api.tx.<section>.<method>` provides the ability to create a transaction, like chain state, this list is populated from a runtime query

We also provide another approach for convenience, `api.genericAsset`, `api.cennzxSpot` and `api.attestation`.
Queries, derive queries and tx methods are provided in under these namespaces.

|                      | Dynamic                                                                 | CRML                                              |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------- |
| Up-To-Date           | Always                                                                  | require upgrade manually                          |
| IDE Hints            | None, need to check docs/metadata                                       | accurate typescript type definition               |
| Addition Validations | None, e.g: transfer might fail if no enough balance. pay tx fee anyway. | Yes. will stop sending tx, e.g: no enough balance |

---

[More Api Examples](../../docs/examples)

[cennznet/cennznet:1.0.0-rc1]: https://hub.docker.com/r/cennznet/cennznet/tags
