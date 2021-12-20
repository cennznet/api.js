// @ts-check
// Import the API & Provider and some utility functions
const {cryptoWaitReady}  = require( "@polkadot/util-crypto");
const axios = require("axios");
const { Api } = require('@cennznet/api');
// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const { Keyring } = require('@polkadot/keyring');

// user ('Alice') authorises multiple transfers from her account using a single batch transaction
async function main () {
  await cryptoWaitReady();
  const api = await Api.create('ws://localhost:9944');

  // create an instance of our testing keyring
  const keyring = new Keyring({ type: 'sr25519' });

  // Add alice to our keyring
  const collectionOwner = keyring.addFromUri('//Alice');


  // Find the collection id in which you would like to mint nfts or create a new collection
  const collectionName = "Litho (default)";
  let collectionId = 0;
  await new Promise((resolve) => {
    api.tx.nft
      .createCollection(collectionName, null, null)
      .signAndSend(collectionOwner, async ({ status, events }) => {
        console.log('Transaction status:', status.type);
        if (status.isInBlock) {
          events.forEach(({ event: { data, method } }) => {
            if (method == 'CreateCollection') {
              collectionId = data[0].toNumber();
              resolve();
            }
          });
        }
      });
  });

  // Upload all your images on ipfs and get the CID... add the name and description as per your choice
  const imagesCID =  [
    {name: "test1", cid: "QmVxiLjS4FNwBUs3NT7pAgfpSxpwvdTngFCDzxpxy4hrJY", desc:""},
    {name: "test2", cid: "QmQCJtAmbghS72A4JhcvPQoWskW1x79TD2Ys6StiHPa6pc", desc:""},
    {name: "test3", cid: "QmTws6MMEs3FLTNhJrkoq9PRvgopNKisTfbsfBzPvhYzeK", desc:""},
    {name: "test4", cid: "QmYCo8QeCzCuEWNBGdZb4gjzvqeTv8ATTuGK86dq7Wg7wG", desc:""},
    {name: "test5", cid: "QmRHkiHgNydombeSSFsY8Sg4MEULxLABMsx3wxmPWcBrQT", desc:""},
    {name: "test6", cid: "QmUxJEGJJ9311xAN4Dg8uFp9jTMsu5s1rm6vvLomVpnCkX", desc:""},
    {name: "test7", cid: "QmaCTRrz5Fo98PThWTK23uWBkR1hXKDhHRd749FgyuvmgP", desc:""},
    {name: "test8", cid: "QmPGwMjbvjzs3VdsjJwbrxtqLG6DhZhBeH4Du39oF43GoQ", desc:""},
    {name: "test9", cid: "QmQxmPuJApxAicQ7c8gwionohCS1G94FSm72cWxjsudwur", desc:""},
    {name: "test10", cid: "QmP2L3V1rqovRFQJEHrrZY8YyUXZ44duds9GNgH7iucdEo", desc:""},
  ];
  // create a metadata file on ipfs with your image cid
  const data = await Promise.all(
      imagesCID.map(async (imgDetail) => {
      const ipfsHash = imgDetail.cid;
      const metadata = {
        name: imgDetail.name,
        description: imgDetail.desc,
        image: `ipfs://${ipfsHash}`,
        properties: {
          quantity: 1,
          creator: collectionOwner.address,
          extension: 'png',
        },
      };
      console.log('metadata::',metadata);
      const ipfsUrl = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      const metadataPinPromise = await axios
        .post(ipfsUrl, metadata, {
          headers: {
            pinata_api_key: process.env.API_KEY, // use your pinata key
            pinata_secret_api_key: process.env.API_SECRET // use your pinata secret
          }
        })
      const data = metadataPinPromise.data;
      const metadataPath = `ipfs://${data.IpfsHash}`;

      return {...imgDetail, metadataPath}
    }));

  const txs = data.map(d => {
    const attributes = [{URL: `"Metadata ipfs://${d.cid}`}];
    const royaltiesSchedule = null;
    return api.tx.nft.mintUnique(collectionId, collectionOwner.address, attributes, d.metadataPath, royaltiesSchedule);
  });

  // get the nonce for the owner
  const nonce = await api.rpc.system.accountNextIndex(collectionOwner.address);

  const ex = api.tx.utility.batch(txs);
  ex.signAndSend(collectionOwner, {nonce}, async ({events, status}) => {
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
