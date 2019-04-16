/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import {Api} from '../../src/Api';
import {Wallet, SimpleKeyring} from '@cennznet/wallet';
import {stringToU8a} from '@plugnet/util';
import WsProvider from '@plugnet/rpc-provider/ws';
import {EventRecord, Hash, Vector} from '@plugnet/types';
import {AssetOptions} from '@cennznet/types';
import BN from 'bn.js';
import process from 'process';

const sender = {
    address: '5H6dGC3TbdyKFagoCEXGaNtsovTtpYYtMTXnsbtVYcn2T1VY',
    seed: stringToU8a(('cennznet-js-test' as any).padEnd(32, ' ')),
};
const receiver = {
    address: '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3',
    seed: stringToU8a(('cennznetjstest2' as any).padEnd(32, ' ')),
};
const passphrase = 'passphrase';

describe('e2e queries', () => {
    let api: Api;
    let websocket: WsProvider;
    beforeAll(async () => {
        const endPoint = process.argv[process.argv.length - 1];
        websocket = new WsProvider(endPoint);
        api = await Api.create({provider: websocket});
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromSeed(sender.seed);
        const wallet = new Wallet();
        await wallet.createNewVault(passphrase);
        await wallet.addKeyring(simpleKeyring);
        api.setSigner(wallet);
    });

    afterAll(async () => {
        (websocket as any).websocket.onclose = null;
        (websocket as any).websocket.close();
    });

    describe('Query storage using at', () => {
        it('queries correct balance', async () => {
            const nextAssetId = await api.query.genericAsset.nextAssetId();
            const blockHash: Hash = (await api.rpc.chain.getBlockHash()) as Hash;
            const nextAssetIdAt = await api.query.genericAsset.nextAssetId.at(blockHash);
            expect(nextAssetId.toString()).toEqual(nextAssetIdAt.toString());
        });
    });

    describe('Subscribe storage', () => {
        let unsubscribeFn;
        it('emits events when storage changes', async done => {
            const totalSupply = 100;
            let count = 0;
            const reservedIdStart: number = 1000000;
            unsubscribeFn = await api.query.genericAsset.nextAssetId((result: any) => {
                if (count === 0) {
                    expect(result.toNumber()).toBeGreaterThanOrEqual(reservedIdStart);
                    count += 1;
                } else {
                    expect(result.toNumber()).toBeGreaterThanOrEqual(reservedIdStart);
                    unsubscribeFn();
                    done();
                }
            });
            await api.tx.genericAsset
                .create({
                    initialIssuance: 100,
                })
                .signAndSend(sender.address);
        }, 15000);
    });

    it('fee estimate', async done => {
        const tx = api.tx.genericAsset.create({
            initialIssuance: 100,
        });
        const fee = ((await api.derive.fees.estimateFee(tx, sender.address)) as unknown) as BN;
        await tx.signAndSend(sender.address, async ({events, status}) => {
            if (status.isFinalized && events !== undefined) {
                // const blockHash = status.status.asFinalised;
                // const events = ((await api.query.system.events.at(blockHash)) as unknown) as Vector<EventRecord>;
                // const feeChargeEvent = events.find(event => event.event.data.method === 'Charged');
                // const gas = feeChargeEvent.event.data[1];
                // expect(gas.toString()).toEqual(fee.toString());
                done();
            }
        });
    });
});
