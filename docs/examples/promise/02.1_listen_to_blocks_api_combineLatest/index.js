// @ts-check
// Import the API
const { Api } = require('@cennznet/api');

async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create();

  // we only display a couple, then unsubscribe
  let count = 0;
  const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

  // Subscribe to the new headers on-chain. The callback is fired when new headers
  // are found, the call itself returns a promise with a subscription that can be
  // used to unsubscribe from the newHead subscription
  const unsubscribe = api.combineLatest([
    api.rpc.chain.subscribeNewHeads,
    (cb) => api.query.genericAsset.freeBalance(16000, Alice, cb),
    (cb) => api.query.system.account(Alice, cb)
  ], ([head, bal, {nonce}]) => {
    console.log(`#${head.number}: You have ${bal} units, with ${nonce} transactions sent`);
      if (++count === 256) {
        unsubscribe();
        process.exit(0);
      }
  });
}

main().catch(console.error);
