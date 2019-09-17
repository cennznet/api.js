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
  // Create an await for the API
  const api = await Api.create();

  console.log('Tracking balances for:', [ALICE, BOB]);

  // Subscribe and listen to several balance changes
  api.query.genericAsset.freeBalance.multi([[CENNZ, ALICE], [CENNZ, BOB]], (balances) => {
    console.log('Change detected, new balances: ', balances);
  });
}

main().catch(console.error);
