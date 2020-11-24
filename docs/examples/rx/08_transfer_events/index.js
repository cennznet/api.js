// Import the API and some utility functions
const { ApiRx } = require('@cennznet/api');

// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const { Keyring } = require('@polkadot/keyring');

// utility function for random values
const { randomAsU8a } = require('@cennznet/util');

// some constants we are using in this sample
const AMOUNT = 10000;

// Asset Id for CENNZ in Rimu
const CENNZ = 16000;


async function main () {
  // Create our API with a connection to the node
  const api = await ApiRx.create().toPromise();

  // create an instance of our testign keyring
  // If you're using ES6 module imports instead of require, just change this line to:
  const keyring = new Keyring({ type: 'sr25519' });

  // Add alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alicePair = keyring.addFromUri('//Alice');

  // create a new random recipient
  const recipient = keyring.addFromSeed(randomAsU8a(32)).address;

  console.log('Sending', AMOUNT, 'from', alicePair.address, 'to', recipient);

  // get the nonce for the admin key
  //  Create a extrinsic, transferring 12345 units to Bob.
  api.tx.genericAsset
    // Do the transfer
    .transfer(CENNZ, recipient, AMOUNT)
    // Sign and send it
    .signAndSend(alicePair)
    // And subscribe to the actual status
    .subscribe(({ events = [], status }) => {
      // Log transfer events
      console.log('Transfer status:', status.type);

      // Log system events once the transfer is finalised
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
