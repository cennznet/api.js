# Cennznet Identity / Attestation

A sdk providing additional features for Cennznet's Identity Service.



### Install

```
$> npm i --save @cennznet/api 
```

### Basic Setup 

Alright, let's get started with the code. If you want the full demo code without the explanations, see the examples/folder

First create a file and name it `index.js` and write the following two lines in:

```javascript
const {Api} = require('@cennznet/api')
```

This loads up a version of the Attestation SDK that we will be using to call the code. This will be the foundation of your attestation requests.

### Creating your wallet and issuer account

In order to send claims, we have to create a wallet, to do so we need to import `@cennznet/wallet` so go ahead and add these lines to your file under the attestation imports

```javascript
const {SimpleKeyring, Wallet} = require('@cennznet/wallet')
const simpleKeyring = new SimpleKeyring();
const wallet = new Wallet();
```

Alright, now we will need an account from which to issue a claim from. Navigate to [CENNZnet UI](https://cennznet-ui.centrality.me/#/explorer) and create an account by navigating to Accounts -> Create Account and selecting "Raw Seed" on  the dropdown.
![Cennznet UI Create Account](https://puu.sh/CSMAK/8b693a90ca.png)

Now that you've created that, let's create an object called "issuer" in your code under the wallet instantiation

```javascript
const issuer = {
  address: '<your address here>',
  uri: '//test-account',
};
```


Substrate accepts a Uint-8 Array as the signing mechanism, and we have a string so we must convert it to a Uint-8 Array. If your seed is less than 32 characters long, use String.prototype.padEnd to pad it with blank lines so that it can become 32 characters long and is consistent with the seed.

### Funding the issuer account 
In order to issue a claim to someone, we need to have some money, so navigate to the [CENNZnet Faucet](https://cennznet.js.org/faucet-ui/) and transfer some money to your public address. 
     
![Cennznet Faucet](https://puu.sh/CSN2t/71b9886848.png)

### Setting up the holder account

Alright, now that we've got our issuer account set up, we need to set up our holder account.
Please follow the instructions on setting up an issuer account again, but do not fund it.

You should now create an object similar to this:

```
const holder = {
  address: '<your new holder address here>',
  uri: '//test-holder-account',
};
```

### Sending a claim with one issuer

Add the following lines to your file:

```javascript
async function main () {
    simpleKeyring.addFromSeed(issuer.seed);
    const api = await Api.create({provider: 'wss://rimu.unfrastructure.io/ws?apikey=***'});
    const passphrase = '<insert issuer passphrase here>';
    await wallet.createNewVault(passphrase);
    await wallet.addKeyring(simpleKeyring);
    api.setSigner(wallet);
    const {attestation} = api;
}
main()
```

This spins up a version of our attestation api inside the main function, we will now be writing all of our code inside the main function

To create a claim add the following lines inside the main function

```javascript
const topic = 'test';
const value = Uint8Array.from(...); // 256 bytes of raw data
const claim = attestation.setClaim(
    holder.address,
    topic,
    value,
);

await claim.signAndSend(issuer.address, async ({result, event}) => {
    if (result.isFinalized && events !== undefined) {
      const { data } = events[0].event;
      console.log(data)
    }
});
```
Topics should be ASCII strings that don't have any non typeable characters and be at most 32 characters and Values should be 256 bytes of data.

If you've done everything properly, then you should get a response object of something similar to this:
