const {zip} = require('rxjs');
const {ApiRx} = require('@cennznet/api');
const {Keyring} = require('@polkadot/keyring');
const assert = require('assert').strict;

async function main() {
    // Initialise the provider to connect to the Azalea node
    const API_KEY = process.env.API_KEY;

    // Create the API and wait until ready
    const api = await ApiRx.create().toPromise();
    // Create an instance of the keyring
    const keyring = new Keyring({type: 'sr25519'});

    // Add Alice to our keyring (with the known seed for the account)
    const alice = keyring.addFromUri('//Alice');

    const deviceId = 940896872;
    api.tx.syloE2Ee.registerDevice(deviceId, []).signAndSend(alice)
        .subscribe(({status}) => {
            if (status.isFinalized) {
                zip(
                    api.query.genericAsset.stakingAssetId(),
                    api.query.genericAsset.spendingAssetId(),
                    api.query.syloDevice.devices(alice.address)
                ).subscribe(([stakingAssetId, spendingAssetId, devices]) => {
                    assert.deepEqual(stakingAssetId.toString(), "16000");
                    assert.deepEqual(spendingAssetId.toString(), "16001");
                    assert.deepEqual(devices[0].toNumber(), deviceId);
                    process.exit()
                });
            }
        });
}

main().catch(console.error);
