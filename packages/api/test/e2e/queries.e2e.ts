/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import {Api} from '../../src/Api';
import {Wallet, SimpleKeyring} from '@cennznet/wallet';
import {stringToU8a} from '@polkadot/util';
import WsProvider from '@polkadot/rpc-provider/ws';
import {Hash} from '@polkadot/types';
import {AssetOptions} from '@cennznet/types';

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
        websocket = new WsProvider('wss://cennznet-node-0.centrality.me:9944');
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
            const assetOptions = new AssetOptions({
                initialIssuance: totalSupply,
                permissions: {
                    update: null,
                    mint: null,
                    burn: null,
                },
            });
            await api.tx.genericAsset.create(assetOptions).signAndSend(sender.address);
        }, 15000);
    });
});
