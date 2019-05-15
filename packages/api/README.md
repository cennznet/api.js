# `cennznet-api`

> The Cennznet JavaScript API library for browsers and Node.js.

# Install

```
$> npm i cennznet-api @polkadot/api @polkadot/extrinsics @polkadot/rpc-core @polkadot/rpc-provider @polkadot/storage @polkadot/types
$> npm i cennznet-wallet
```

## Usage
_RxJs api is ready_

For Promise Api

```
# node --experimental-repl-await
//initialize Api and connect to dev network
const {Api} = require('@cennznet/api')
api = await Api.create({
    provider: 'wss://rimu.unfrastructure.io/ws?apikey=***'
});

// initialize wallet and import an account
const {SimpleKeyring, Wallet} = require('@cennznet/wallet')
const {stringToU8a} = require('@polkadot/util')
const assetOwner = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};

const receiver = {
    address: '5ESNjjzmZnnCdrrpUo9TBKhDV1sakTjkspw2ZGg84LAK1e1Y'
};

wallet = new Wallet();
await wallet.createNewVault('a passphrase');
const keyring = new SimpleKeyring();
keyring.addFromUri(assetOwner.uri);
await wallet.addKeyring(keyring);

// set wallet as signer of API
api.setSigner(wallet)
// do a transfer
await api.tx.balances.transfer(receiver.address, 12345).signAndSend(assetOwner.address);
```
For Rxjs Api

```
# node --experimental-repl-await
//initialize Api and connect to dev network
const {ApiRx} = require('@cennznet/api')
api = await ApiRx.create({
    provider: 'wss://rimu.unfrastructure.io/ws?apikey=***'
}).toPromise();

```

## Estimate Gas Fee (for Runtime Module Extrinsics)
```
const tx = api.tx.genericAsset.create({
    initialIssuance: 100,
});
const sender = '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3';
const fee = await api.derive.fees.estimateFee(tx, sender);
```
