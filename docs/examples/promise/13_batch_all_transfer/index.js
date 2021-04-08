// @ts-check
// Import the API & Provider and some utility functions
const { Api } = require('@cennznet/api');
// utility function for random values
const { randomAsU8a } = require('@polkadot/util-crypto');
// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const { Keyring } = require('@polkadot/keyring');

// user ('Alice') authorises multiple transfers from her account using a single batch transaction
async function main () {

  const api = await Api.create('ws://localhost:9944');

  // create an instance of our testing keyring
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

  const transaction1 = api.tx.genericAsset.transfer(dataList[0].assetId, dataList[0].recipient, dataList[0].amount);
  const transaction2 = api.tx.genericAsset.transfer(dataList[1].assetId, dataList[1].recipient, dataList[1].amount);
  const transaction3 = api.tx.genericAsset.transfer(dataList[2].assetId, dataList[2].recipient, dataList[2].amount);
  const transaction4 = api.tx.genericAsset.transfer(dataList[3].assetId, dataList[3].recipient, dataList[3].amount);

  const ex = api.tx.utility.batch([
    transaction1,
    transaction2,
    transaction3,
    transaction4
  ]);
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
