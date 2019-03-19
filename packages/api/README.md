# `cennznet-api`

> The Cennznet JavaScript API library for browsers and Node.js.

# Install

```
$> npm config set registry https://npm-proxy.fury.io/centrality/
$> npm login
$> npm i cennznet-api @polkadot/api @polkadot/extrinsics @polkadot/rpc-core @polkadot/rpc-provider @polkadot/storage @polkadot/types
$> npm i cennznet-wallet
```

## Usage
_RxJs api is ready_

For Promise Api

```
# node --experimental-repl-await
//initialize Api and connect to dev network
const {Api} = require('cennznet-api')
api = await Api.create({
    provider: 'ws://cennznet-node-0.centrality.me:9944'
});

// initialize wallet and import an account
const {SimpleKeyring, Wallet} = require('cennznet-wallet')
const {stringToU8a} = require('@polkadot/util')
const andrea = {
	address: '5EKGZwAuwvVpVaGWZJ3hYDqTSxQCDDUgeMv36M4qLq7wtWLH',
	seed: stringToU8a('Andrea'.padEnd(32, ' '))
}

const bob = {
	address: '5Gw3s7q4QLkSWwknsiPtjujPv3XM4Trxi5d4PgKMMk3gfGTE',
	seed: stringToU8a('Bob'.padEnd(32, ' '))
}

wallet = new Wallet();
await wallet.createNewVault('a passphrase');
const keyring = new SimpleKeyring();
await keyring.addFromSeed(andrea.seed);
await wallet.addKeyring(keyring);

// set wallet as signer of API
api.setSigner(wallet)
// do a transfer
await api.tx.balances.transfer(bob.address, 12345).signAndSend(andrea.address);
```
For Rxjs Api

```
# node --experimental-repl-await
//initialize Api and connect to dev network
const {ApiRx} = require('cennznet-api')
api = await ApiRx.create({
    provider: 'ws://cennznet-node-0.centrality.me:9944'
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
