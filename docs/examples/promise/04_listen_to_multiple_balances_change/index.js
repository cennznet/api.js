/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
// Import the API
const { Api } = require('@cennznet/api');

// Known account we want to use (available on dev chain, with funds)
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

// Asset Id for CENNZ in Rimu
const CENNZ = 16000;

async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create();

  console.log('Tracking balances for:', [ALICE, BOB]);
  console.log('Open cennznet.io in a browser and change its setting to connect your local node. Then kick off a generic asset balance transfer between BOB and ALICE.');

  // Subscribe and listen to several balance changes
  api.query.genericAsset.freeBalance.multi([[CENNZ, ALICE], [CENNZ, BOB]], (balances) => {
    console.log('Change detected, new balances: ', balances.toString());
  });
}

main().catch(console.error);
