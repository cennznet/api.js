/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
// Import the API, Keyring and some utility functions
const { Api } = require('@cennznet/api');
const testKeyring = require('@polkadot/keyring/testing');
const { createType } = require('@polkadot/types');

const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

// Asset Id for CENNZ in Rimu
const CENNZ = 16000;

async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create(); // default provider

  // Constuct the keying after the API (crypto has an async init)
  const keyring = testKeyring.default();

  // Add alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice');

  // Get nonce for account
  const nonce = await api.query.system.accountNonce(alice.address);

  // get current block
  const signedBlock = await api.rpc.chain.getBlock();

  // get current block height and hash
  const currentHeight = signedBlock.block.header.number;
  const blockHash = signedBlock.block.header.hash;

  // NOTE By default the API will send mortal transactions, only explicitly construct
  // if you wish to override the defaults
  // construct a mortal era
  const era = createType('ExtrinsicEra', { current: currentHeight, period: 10 });

  // Create an extrinsic, transferring 12345 units to Bob
  const transfer = api.tx.genericAsset.transfer(CENNZ, BOB, 12345);

  // Sign and send the transaction using our account with a nonce and the length of blocks the transaction is valid for
  const hash = await transfer.signAndSend(alice, { blockHash, era, nonce });

  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());
