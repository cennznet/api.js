// @ts-check
// Import the API
const { Api } = require('@cennznet/api');

async function main () {

  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create();

  // Subscribe to chain updates and log the current block  number on update.
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    console.log(`Chain is at block: #${header.number}`);
  });

  // In this example we're calling the unsubscribe() function that is being
  // returned by the api call function after 20s.
  setTimeout(() => {
    unsubscribe();
    console.log('Unsubscribed')
  }, 20000);
}

main().catch(console.error);
