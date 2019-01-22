# `cennznet-api`

> The Cennznet JavaScript API library for browsers and Node.js.

# Install

```
$> npm config set registry https://npm-proxy.fury.io/centrality/
$> npm login
$> npm i cennznet-api @polkadot/extrinsics @polkadot/rpc-core @polkadot/rpc-provider @polkadot/storage @polkadot/types
```

## Usage

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

// set wallet as signer of api
api.setSigner(wallet)
// do a transfer
await api.tx.balances.transfer(bob.address, 12345).send({from: andrea.address})
```
