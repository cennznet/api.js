// Required imports
// const { zip } = require('rxjs');
// const { ApiRx } = require('@cennznet/api');
const { Api } = require('@cennznet/api');
async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  const api = await Api.create();

  // Retrieve the initial balance. Since the call has no callback, it is simply a promise
  // that resolves to the current on-chain value
  let previous = await api.query.genericAsset.freeBalance(CENNZ, Alice);

  console.log(`${Alice} has a balance of ${previous}`);
  console.log(`You may leave this example running and start example 06 or transfer any value to ${Alice}`);

  // Here we subscribe to any balance changes and update the on-screen value
  api.query.genericAsset.freeBalance(CENNZ, Alice, (current) => {
    // Calculate the delta
    const change = current.sub(previous).abs();

    // Only display positive value changes (Since we are pulling `previous` above already,
    // the initial balance change will also be zero)
    if (!change.isZero()) {
      previous = current;
      console.log(`New balance change of: ${change}`);
    }
  });
}

main().catch(console.error);
