const { zip } = require('rxjs');
const { ApiRx } = require('@cennznet/api');
const assert = require('assert').strict;

async function main () {
    // Initialise the provider to connect to the Azalea node
    const provider = 'wss://cennznet.unfrastructure.io/public/ws';
    // Create the API and wait until ready
    const api = await ApiRx.create({ provider }).toPromise();

    // We're using RxJs 'zip()' combination operator to get the emitted values
    // of multiple observables as an array
    // Pinned rpc-provider at 2.7.1 "@polkadot/rpc-provider": "2.7.1"
    zip(
        api.query.genericAsset.stakingAssetId(),
        api.query.genericAsset.spendingAssetId()
    ).subscribe(([stakingAssetId, spendingAssetId]) => {
        assert.deepEqual(stakingAssetId.toString(),"1");
        assert.deepEqual(spendingAssetId.toString(),"2");
        process.exit()
    });
}

main().catch(console.error);
