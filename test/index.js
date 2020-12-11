const {zip} = require('rxjs');
const {ApiRx} = require('@cennznet/api');
const {Keyring} = require('@polkadot/keyring');
const assert = require('assert').strict;
// check the oldest supported @polkadot/rpc-provider@2.7.1 is compatible
// we don't control the RPC details from @cennznet/api but require that they don't change to provide LTS for users
async function main() {

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
