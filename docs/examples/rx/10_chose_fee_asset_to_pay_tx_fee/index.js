// @ts-check
// Import the API & Provider and some utility functions
const {ApiRx} = require('@cennznet/api');

// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const testKeyring = require('@plugnet/keyring/testing');

// utility function for random values
const {randomAsU8a} = require('@cennznet/util');

const {combineLatest, of} = require('rxjs');
const {first, switchMap, tap} = require('rxjs/operators');

// some constants we are using in this sample
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// BOB is pool liquidity provider
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const AMOUNT = 10000;
const FEE_ASSET_ID = 16000;
const MIN_REQUIRED_POOL_BALANCE = 1000000;

// Asset Id for CENNZ in Rimu
const CENNZ = 16000;

function queryPoolBalance(api) {
    // query and supplement liquidity
    return combineLatest([
        api.derive.cennzxSpot.poolAssetBalance(FEE_ASSET_ID),
        api.derive.cennzxSpot.poolCoreAssetBalance(FEE_ASSET_ID)])
        .pipe(
            tap(([poolAssetBalance, poolCoreAssetBalance]) => {
                console.log('Pool balance: assetId: 16000, amount: ', poolAssetBalance.toString(),
                    '; assetId: 16001, amount: ', poolCoreAssetBalance.toString());
            }),
            first()
        );

}

async function main() {
    // Create the API and wait until ready
    const api = await ApiRx.create().toPromise();

    // create an instance of our testing keyring
    // If you're using ES6 module imports instead of require, just change this line to:
    // const keyring = testKeyring();
    const keyring = testKeyring.default();

    // get the nonce for the admin key
    const nonce = await api.query.system.accountNonce(ALICE).pipe(first()).toPromise();

    // find the actual keypair in the keyring
    const alicePair = keyring.getPair(ALICE);
    const bobPair = keyring.getPair(BOB);
    // create a new random recipient
    const recipient = keyring.addFromSeed(randomAsU8a(32)).address;

    queryPoolBalance(api).pipe(
        switchMap(([poolAssetBalance, poolCoreAssetBalance])=>{
            if (poolCoreAssetBalance.eqn(0)) {
                console.log('This exchange pool is empty, adding some liquidity');
                return api.tx.cennzxSpot.addLiquidity(FEE_ASSET_ID, 0, MIN_REQUIRED_POOL_BALANCE * 2, MIN_REQUIRED_POOL_BALANCE)
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
                    }).pipe(switchMap(()=>queryPoolBalance(api)));
            } else {
                return of([poolAssetBalance, poolCoreAssetBalance]);
            }
        }),
        switchMap(() => {
            const feeExchange = {assetId: FEE_ASSET_ID, maxPayment: '1000000000000'};
            return api.tx.genericAsset
                .transfer(CENNZ, recipient, AMOUNT)
                .addFeeExchangeOpt(feeExchange)
                .signAndSend(alicePair, {nonce, feeExchange});
        })
    ).subscribe(({events = [], status}) => {
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

main().catch((error) => {
    console.error(error);
    process.exit(-1);
});
