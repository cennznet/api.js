const { zip } = require('rxjs');
const { ApiRx } = require('@cennznet/api');
const assert = require('assert').strict;

async function main () {
    // Initialise the provider to connect to the Azalea node
    const API_KEY = process.env.API_KEY;

    const provider = `wss://node-6711773975684325376.jm.onfinality.io/ws?apikey=${API_KEY}`;
    // Create the API and wait until ready
    const api = await ApiRx.create({ provider }).toPromise();
    const deviceOwner = '5CUHuuq7jFMqHtVMXiEMucX7vU69jbnrCqMWZ6F8Jq4XyZaK';
    const blockHash = '0x0718ea36b1daabb88eb7a646ea6fac865f24e5f214d42fe1c21a8a1cb12401cb';
    // We're using RxJs 'zip()' combination operator to get the emitted values
    // of multiple observables as an array
    // Pinned rpc-provider at 2.7.1 "@polkadot/rpc-provider": "2.7.1"
    zip(
        api.query.genericAsset.stakingAssetId(),
        api.query.genericAsset.spendingAssetId(),
        api.query.syloDevice.devices.at(blockHash, deviceOwner)
    ).subscribe(([stakingAssetId, spendingAssetId, devices]) => {
        assert.deepEqual(stakingAssetId.toString(),"1");
        assert.deepEqual(spendingAssetId.toString(),"2");
        assert.deepEqual(devices[0].toNumber(), 940896872);
        process.exit()
    });
}

main().catch(console.error);
