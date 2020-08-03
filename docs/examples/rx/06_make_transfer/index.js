// Import the API, Keyring and some utility functions
const { ApiRx } = require('@cennznet/api');
const testKeyring = require('@plugnet/keyring/testing');

const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

// Asset Id for CENNZ in Rimu
const CENNZ = 16000;

async function main () {
  // Instantiate the API
  const api = await ApiRx.create().toPromise();

  // Create an instance of the keyring
  const keyring = testKeyring.default();

  // Add Alice to our keyring (with the known seed for the account)
  const alice = keyring.addFromUri('//Alice');

  //  Create a extrinsic, transferring 12345 units to Bob.
  api.tx.genericAsset
    // create transfer
    .transfer(CENNZ, BOB, 12345)
    // Sign and send the transcation
    .signAndSend(alice)
    // Subscribe to the status updates of the transfer
    .subscribe(({ status }) => {
      if (status.isFinalized) {
        console.log(`Successful transfer of 12345 from Alice to Bob with hash ${status.asFinalized.toHex()}`);
        process.exit()
      } else {
        console.log(`Staus of transfer: ${status.type}`);
      }
    });
}

main().catch(console.error);
