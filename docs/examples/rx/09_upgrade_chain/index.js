// Import the API & Provider and some utility functions
const { ApiRx } = require('@cennznet/api');
// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const { Keyring } = require('@polkadot/keyring');
const fs = require('fs');
const { first } = require('rxjs/operators');

async function main () {
  // Initialise the provider to connect to the local node
  const provider = 'ws://127.0.0.1:9944';

  // Create the API and wait until ready (optional provider passed through)
  const api = await ApiRx.create({provider}).toPromise();

  const keyring = new Keyring({ type: 'sr25519' });

  // Add alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const adminPair = keyring.addFromUri('//Alice'); // Alice is admin in DEV chain
  // retrieve the upgrade key from the chain state
  const adminId = await api.query.sudo.key().pipe(first()).toPromise();

// Retrieve the runtime to upgrade
  const code = fs.readFileSync('./test.wasm').toString('hex');
  const proposal = api.tx.system && api.tx.system.setCode
      ? api.tx.system.setCode(`0x${code}`) // For newer versions of Substrate
      : api.tx.consensus.setCode(`0x${code}`); // For previous versions
  console.log(`Upgrading chain runtime from ${adminId}`);

  api.tx.sudo
    // preform the actual chain upgrade via the sudo module
    .sudo(proposal)
    // sign and send the proposal
    .signAndSend(adminPair)
    // subscribe to overall result
    .subscribe(({ events = [], status }) => {
      // Log transfer events
      console.log('Proposal status:', status.type);

      if (status.isFinalized) {
        console.error('You have just upgraded your chain');

        console.log('Completed at block hash', status.asFinalized.toHex());
        console.log('Events:');

        // Log system events once the chain update is finalised
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });

        process.exit(0);
      }
    });
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
