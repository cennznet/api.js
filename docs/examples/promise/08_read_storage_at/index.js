/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
// Import the API
const { Api } = require('@cennznet/api');

// Our address for Alice on the dev chain
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

const STAKING_ASSET = 16000;

async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create();

  // retrieve the last block header, extracting the hash and parentHash
  const { hash, parentHash } = await api.rpc.chain.getHeader();

  console.log(`last header hash ${hash.toHex()}`);

  // retrieve the balance at the preceding block for Alice. For at queries
  // the format is always `.at(<blockhash>, ...params)`
  const balance = await api.query.genericAsset.freeBalance.at(parentHash, STAKING_ASSET, ALICE);

  console.log(`Alice's balance at ${parentHash.toHex()} was ${balance}`);

  // now perform a multi query, returning multiple balances at once
  const balances = await api.query.genericAsset.freeBalance.multi([[STAKING_ASSET,ALICE], [STAKING_ASSET,BOB]]);

  console.log(`Current balances for Alice and Bob are ${balances[0]} and ${balances[1]}`);
}

main().catch(console.error).finally(() => process.exit());
