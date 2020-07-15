# Get started
There are some very good example projects in docs/examples. 
The examples are divided into two folders based on the main technique that they have used to interact with the node. 
Those in the folder docs/examples/promise, call api functions asynchronously and use the promise technique to wait for their results.
Whereas those in docs/examples/rx, use the functional approach of rxjs (Reactive Extensions Library) and treat api results as observable streams.

Here are the preparatory steps before you create your first project to interact with a CENNZnet node and consequently the CENNZnet blockchain network:
1. Install or update NPM and NodeJs on your development platform. You should be good to go if you just use the latest versions. At the time of writing this guide we were using Node 14.5.0 and NPM 6.14.5.   
2. Install yarn. yarn is our favorite package manager. However this is not a must if you know how to use any other package manager including NPM to produce the same instructions.
3. Create a new NodeJs project or or use one of the examples to start with.

NodeJs projects have a file called package.json in which the dependent libraries and their right versions are specified. The simplest project that you create would depend on "@cennznet/api". 
You are here browsing the source code of this library. 
The library as a package is published at: https://www.npmjs.com/package/@cennznet/api which you would need to check to figure out which version of the library is the right one for you given the version of the cennznet node that you want to connect to. 
cennznet/api is internally dependant on polkadot. 
At the moment a breaking change in the recent versions of polkadot has prevented us from updating with the recent versions. 
That's why in package.json there should be a resolution set so we can make sure the right version of polkadot packages are fetched. 
Therefore you need to have the following lines in your package.json:
```json
"dependencies": {
  "@cennznet/api": "^1.0.3"
},
"resolutions": {
  "@polkadot/types": "1.2.1",
  "@polkadot/metadata": "1.2.1",
  "@polkadot/api": "1.2.1",
  "@polkadot/api-derive": "1.2.1",
  "@polkadot/rpc-core": "1.2.1"
}
``` 
The next step for your project is that you import @cennznet/api in your js code. The best way to do that is through a line such as:
```js
const { Api } = require('@cennznet/api');
```
When you have the api, you can easily connect to any cennznet node by calling "connect". 
The underlying mechanism to connect to a node is through websockets. 
So what you need to have for this call is the websocket address of your node. 
The cennznet's main network is residing at `wss://cennznet.unfrastructure.io/public/ws`. 
If you use this address to connect to our main network which is called Azalea, you automatically get connected to one of the cennznet's validator/full nodes. 
However you may want to run your own local node and connect to that for testing. To do so you can checkout the docker-compose script that we have provided in this project and also mentioned it later in this document. 
Alternatively you can have a look at a https://github.com/cennznet/cennznet/wiki/Running-a-Full-Node. 
In the case that you are connecting to Azalea, your connect snippet would look like:
```js
const provider = 'wss://cennznet.unfrastructure.io/public/ws';
const api = await Api.create({provider});
```  
But if you are connecting to your own local node, it can be as simple as:
```js
const api = await Api.create();
```
Once the connection is created, you can use of one of the several api queries (located under api.query), RPCs (located under api.rpc) or Transactions (located under api.tx) to interact with the node. Here are examples of for each of these categories:

Category | Example | Description
--- | :---: | ---
RPC | `api.rpc.system.chain()` | Get the change name
Query | `api.query.genericAsset.freeBalance(CENNZ, Alice)` | How many CENNZs, Alice has in her free balance
Tx | `api.tx.genericAsset.transfer(CENNZ, BOB, 12345)` | Create an extrinsic for transferring 12345 CENNZs to Bob  
Note: In the above table, CENNZ is a const carrying an asset id value. 
We have named it CENNZ as its value is 16000 which is the designated asset id for CENNZ in our test/dev network. 
Alice and BOB are also consts carrying the public keys of Alice and BOB. 
  
## Keyring
Some of the interactions with the node should be signed. 
For example if you say Alice transfers 1 CENNZ to Bob, you should have the secret key of Alice and sign the created extrinsic before submitting it.
More importantly if you use a secret key, you don't want to expose it to anyone by using it directly in the code. 
You may also have several keys for your different accounts. 
Where to keep those keys and how to use them? 
Keyring is the answer to this need. 
In order to use @polkadot/keyring in your project you should add the following dependency to your package.json:
```json 
"@polkadot/keyring": "^2.18.1"
```
Then in your js code you may do:
```js
const { Keyring } = require('@polkadot/keyring');
```    
Polkadot currently supports two different signing protocols: 'sr25519' or Schnorrkel and 'ed25519'.
When you construct your Keyring you should specify the signing type:
```js
const keyring = new Keyring({ type: 'sr25519' });
```
Now you can add your keys to the keyring securely by passing in their URI address. 
If you want to use one of our predefined keys only for development and testing purposes you can use a short URI as follows:
```js
const alice = keyring.addFromUri('//Alice'); // Alice is predefined
``` 
Now that you have added the key for Alice you can use it to sign an extrinsic:
```js
const extrinsic = api.tx.genericAsset.transfer(CENNZ, BOB, 12345);
const hash = await extrinsic.signAndSend(alice);
```
## FAQ
> What is the difference between @cennznet/types and @polkadot/types?

We have custom types needed to interact with our specific modules such as Doughnut, CENNZxSpot, Generic Asset, Attestation and etc which you can only find in @cennznet/types. 
@cennznet/types also exposes some of the basic polkadot types. If you are connecting to a cennznet node, for most of the use cases you would only need to import @cennznet/types. 
However if a polkadot type is not in our package and you need to import polkadot/types as well, make sure to set the right dependency resolution as shown in this document.

> What is the difference between @cennznet/api and @polkadot/api?

If you connect to a cennznet node through a @polkadot/api, you wouldn't have access to our special RPCs and queries that we have added either for interacting with our own specific modules or for enriching polkadot.
Basically as @cennznet/api is wrapping @polkadot/api, offering all its capabilities, you shouldn't need to use the latter at all.  
## Test in local 

```bash
# Start automation tests with private testnet in local (which is also triggered in circleci build pipeline)
# You can run this command, whenever you made changes in source code (only api.js container is rebuilt, where testnet remains without rebuilding)
./scripts/circleci/run_automation_test.sh -t integration

# Show logs
docker-compose logs -f

# Tear down and clean up testnet dockers (needed to restart automation testnet)
./clearup_testnet.sh

# Clear up docker cache (docker container occupied spaces may increase a lot, this is needed regularly)
docker system prune
```

## Debug inside docker container

```bash
# list all docker containers, and ensure container with name of api_test is running
docker ps -a

# enter inside api_test container
docker exec -it api_test bash
```
