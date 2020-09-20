// @ts-check
// Import the API & Provider and some utility functions
const {Api} = require('@cennznet/api');

// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const testKeyring = require('@polkadot/keyring/testing');

// utility function for random values
const {randomAsU8a} = require('@cennznet/util');

// some constants we are using in this sample
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// BOB is pool liquidity provider
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const AMOUNT = 10000;
const FEE_ASSET_ID = 16000;
const MIN_REQUIRED_POOL_BALANCE = 1000000;

// Asset Id for CENNZ in Rimu
const CENNZ = 16000;

async function queryPoolBalance(api) {
    // query and supplement liquidity
    const [poolAssetBalance, poolCoreAssetBalance] = [
        await api.derive.cennzxSpot.poolAssetBalance(FEE_ASSET_ID),
        await api.derive.cennzxSpot.poolCoreAssetBalance(FEE_ASSET_ID),
    ];

    console.log('Pool balance: assetId: 16000, amount: ', poolAssetBalance.toString(),
        '; assetId: 16001, amount: ', poolCoreAssetBalance.toString());

    return [poolAssetBalance, poolCoreAssetBalance];
}

async function main() {
    // Here we don't pass the (optional) provider, connecting directly to the default
    // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
    // the API has connected to the node and completed the initialisation process
    const api = await Api.create();

    // create an instance of our testing keyring
    // If you're using ES6 module imports instead of require, just change this line to:
    // const keyring = testKeyring();
    const keyring = testKeyring.default();

    // get the nonce for the admin key
    const nonce = await api.query.system.accountNonce(ALICE);

    // find the actual keypair in the keyring
    const alicePair = keyring.getPair(ALICE);
    const bobPair = keyring.getPair(BOB);
    // create a new random recipient
    const recipient = keyring.addFromSeed(randomAsU8a(32)).address;

    const [poolAssetBalance, poolCoreAssetBalance] = await queryPoolBalance(api);

    if (poolCoreAssetBalance.ltn(MIN_REQUIRED_POOL_BALANCE)) {
        console.log('Pool core asset balance is lower than min requirement, adding some');
        await new Promise((resolve => {
            api.tx.cennzxSpot.addLiquidity(FEE_ASSET_ID, 0, MIN_REQUIRED_POOL_BALANCE * 2, MIN_REQUIRED_POOL_BALANCE)
                .signAndSend(bobPair, ({events = [], status}) => {
                    console.log('Transaction status:', status.type);

                    if (status.isFinalized) {
                        console.log('Completed at block hash', status.asFinalized.toHex());
                        console.log('Events:');

                        events.forEach(({phase, event: {data, method, section}}) => {
                            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                        });

                        resolve();
                    }
                });
        }));
        await queryPoolBalance(api);
    }

    const feeExchangeOpt = {assetId: FEE_ASSET_ID, maxPayment: '1000000000000'};
    // Do the transfer and track the actual status
    api.tx.genericAsset
        .transfer(CENNZ, recipient, AMOUNT)
        .addFeeExchangeOpt(feeExchangeOpt)
        .sign(alicePair, {nonce, feeExchange: feeExchangeOpt})
        .send(({events = [], status}) => {
            console.log('Transaction status:', status.type);

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
