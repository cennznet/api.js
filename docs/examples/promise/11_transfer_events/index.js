// @ts-check
// Import the API & Provider and some utility functions
const { Api } = require('@cennznet/api');

// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const testKeyring = require('@polkadot/keyring/testing');

// utility function for random values
const { randomAsU8a } = require('@cennznet/util');

// some constants we are using in this sample
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const AMOUNT = 10000;

// Asset Id for CENNZ in Rimu
const CENNZ = 16000;

async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create();

  // create an instance of our testing keyring
  // If you're using ES6 module imports instead of require, just change this line to:
  // const keyring = testKeyring();
  const keyring = testKeyring.default();

  // get the nonce for the admin key
  const nonce = await api.query.system.accountNonce(ALICE);

  // find the actual keypair in the keyring
  const alicePair = keyring.getPair(ALICE);

  // create a new random recipient
  const recipient = keyring.addFromSeed(randomAsU8a(32)).address;

  console.log('Sending', AMOUNT, 'from', alicePair.address, 'to', recipient, 'with nonce', nonce.toString());

  // Do the transfer and track the actual status
  api.tx.genericAsset
    .transfer(CENNZ, recipient, AMOUNT)
    .sign(alicePair, { nonce })
    .send(({ events = [], status }) => {
      console.log('Transaction status:', status.type);

      if (status.isFinalized) {
        console.log('Completed at block hash', status.asFinalized.toHex());
        console.log('Events:');

        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });

        process.exit(0);
      }
    });
}

main().catch(console.error);
