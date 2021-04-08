// @ts-check
// Import the API & Provider and some utility functions
const { Api } = require('@cennznet/api');
// utility function for random values
const { randomAsU8a } = require('@polkadot/util-crypto');
// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const { Keyring } = require('@polkadot/keyring');

async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create();

  // create an instance of our testing keyring
  // If you're using ES6 module imports instead of require, just change this line to:
  // const keyring = testKeyring();
  const keyring = new Keyring({ type: 'sr25519' });

  // Add alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alicePair = keyring.addFromUri('//Alice');

  // get the nonce for the Alice
  const nonce = await api.rpc.system.accountNextIndex(alicePair.address);

  const dataList = [
    {assetId: 16000, amount: 1000, recipient: keyring.addFromSeed(randomAsU8a(32)).address},
    {assetId: 16001, amount: 1200, recipient: keyring.addFromSeed(randomAsU8a(32)).address},
    {assetId: 16000, amount: 1010, recipient: keyring.addFromSeed(randomAsU8a(32)).address},
    {assetId: 16001, amount: 1002, recipient: keyring.addFromSeed(randomAsU8a(32)).address},
  ]

  let txs = [];
  dataList.forEach(data => {
    const tx = api.tx.genericAsset.transfer(data.assetId, data.recipient, data.amount);
    txs.push(tx);
  });

  const ex = api.tx.utility.batch(txs);
  ex.signAndSend(alicePair, {nonce}, async ({events, status}) => {
    if (status.isFinalized) {
      console.log('Completed at block hash', status.asFinalized.toHex());
      console.log('Events:');

      events.forEach(({phase, event: {data, method, section}}) => {
        console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
      });
      process.exit(0);
    }
  });
}

main().catch(console.error);
