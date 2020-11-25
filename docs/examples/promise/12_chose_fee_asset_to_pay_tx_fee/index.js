// @ts-check
// Import the API & Provider and some utility functions
const {Api} = require('@cennznet/api');

// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const { Keyring } = require('@polkadot/keyring');

// utility function for random values
const {randomAsU8a} = require('@cennznet/util');

const AMOUNT = 10000;
const FEE_ASSET_ID = 16000;
const MIN_REQUIRED_POOL_BALANCE = 1000000;

// Asset Id for CENNZ in Rimu
const CPAY = 16001;

async function queryPoolBalance(api) {
    // query and supplement liquidity
    const [poolAssetBalance, poolCoreAssetBalance] = [
        await api.derive.cennzx.poolAssetBalance(FEE_ASSET_ID),
        await api.derive.cennzx.poolCoreAssetBalance(FEE_ASSET_ID),
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
    const keyring = new Keyring({ type: 'sr25519' });
    const alicePair = keyring.addFromUri('//Alice');
    const bobPair = keyring.addFromUri('//Bob');

    // get the nonce for the admin key
    const nonce = await api.rpc.system.accountNextIndex(alicePair.address);

    // create a new random recipient
    const recipient = keyring.addFromSeed(randomAsU8a(32)).address;

    const [poolAssetBalance, poolCoreAssetBalance] = await queryPoolBalance(api);

    if (poolCoreAssetBalance.ltn(MIN_REQUIRED_POOL_BALANCE)) {
        console.log('Pool core asset balance is lower than min requirement, adding some');
        await new Promise((resolve => {
            api.tx.cennzx.addLiquidity(FEE_ASSET_ID, 0, MIN_REQUIRED_POOL_BALANCE * 2, MIN_REQUIRED_POOL_BALANCE)
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

    const maxPayment = 50_000; // maximum in fee asset Alice is willing to pay
    const feeExchange = api.registry.createType('FeeExchange', {assetId:FEE_ASSET_ID, maxPayment}, 0);
    const transactionPayment = api.registry.createType('ChargeTransactionPayment', {tip: 0, feeExchange}); // transaction payment object to be sent as payload
    // Do the transfer and track the actual status
    const tx = api.tx.genericAsset.transfer(CPAY, recipient, AMOUNT);
    await tx.signAndSend(
        alicePair,
        {nonce, transactionPayment},
        ({events, status}) => {
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
