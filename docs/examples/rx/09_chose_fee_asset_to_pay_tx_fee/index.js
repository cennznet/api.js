// @ts-check
// Import the API & Provider and some utility functions
const {ApiRx} = require('@cennznet/api');

// import the test keyring (already has dev keys for Alice, Bob, Charlie, Eve & Ferdie)
const { Keyring } = require('@polkadot/keyring');

const {combineLatest, of} = require('rxjs');
const {first, switchMap, tap} = require('rxjs/operators');

const AMOUNT = 10000;
const FEE_ASSET_ID = 16000;
const MIN_REQUIRED_POOL_BALANCE = 1000000;

// Asset Id for CENNZ in Nikau
const CENNZ = 16000;

function queryPoolBalance(api) {
    // query and supplement liquidity
    return combineLatest([
        api.derive.cennzx.poolAssetBalance(FEE_ASSET_ID),
        api.derive.cennzx.poolCoreAssetBalance(FEE_ASSET_ID)])
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

    // create an instance of keyring
    // If you're using ES6 module imports instead of require, just change this line to:
    const keyring = new Keyring({ type: 'sr25519' });

    // Add alice to our keyring with a hard-derived path (empty phrase, so uses dev)
    const alicePair = keyring.addFromUri('//Alice');
    const bobPair = keyring.addFromUri('//Bob');

    // get the nonce for the admin key
    const nonce = await api.rpc.system.accountNextIndex(alicePair.address).pipe(first()).toPromise();;

    // create a new random recipient
    const recipient = keyring.addFromUri('//ChoseAssetToPayFee').address;

    queryPoolBalance(api).pipe(
        switchMap(([poolAssetBalance, poolCoreAssetBalance])=>{
            if (poolCoreAssetBalance.eqn(0)) {
                console.log('This exchange pool is empty, adding some liquidity');
                return api.tx.cennzx.addLiquidity(FEE_ASSET_ID, 0, MIN_REQUIRED_POOL_BALANCE * 2, MIN_REQUIRED_POOL_BALANCE)
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
            const maxPayment = 50_000; // maximum in fee asset Alice is willing to pay
            const feeExchange = api.registry.createType('FeeExchange', {assetId:FEE_ASSET_ID, maxPayment}, 0);
            const transactionPayment = api.registry.createType('ChargeTransactionPayment', {tip: 0, feeExchange}); // transaction payment object to be sent as payload
            return api.tx.genericAsset
                .transfer(CENNZ, recipient, AMOUNT)
                .signAndSend(alicePair, {nonce, transactionPayment});
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
