// @ts-check
// Import the API
const { Api } = require('@cennznet/api');

async function main () {

  // Create a new instance of the api
  const api = await Api.create();

  // Subscribe to chain updates and log the current block  number on update.
  const unsubscribe = await api.rpc.chain.subscribeNewHead((header) => {
    console.log(`Chain is at block: #${header.blockNumber}`);
  });

  // In this example we're calling the unsubscribe() function that is being
  // returned by the api call function after 20s.
  setTimeout(() => {
    unsubscribe();
    console.log('Unsubscribed')
  }, 20000);
}

main().catch(console.error);
