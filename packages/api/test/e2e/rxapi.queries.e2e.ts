/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import {Hash} from '@plugnet/types';
import {ApiRx} from '../../src/ApiRx';
import {Wallet, SimpleKeyring} from '@cennznet/wallet';
import WsProvider from '@plugnet/rpc-provider/ws';
import {combineLatest} from 'rxjs';
import {switchMap} from 'rxjs/operators';

const sender = {
    address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
    uri: '//cennznet-js-test',
};
const receiver = {
    address: '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3',
};
const passphrase = 'passphrase';

describe('e2e queries', () => {
    let api: ApiRx;
    let websocket: WsProvider;
    beforeAll(async () => {
        websocket = new WsProvider('wss://cennznet-node-0.centrality.me:9944');
        api = await ApiRx.create({provider: websocket}).toPromise();
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromUri(sender.uri);
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
        it('queries correct balance', async done => {
            const nextAssetId$ = api.rpc.chain
                .getBlockHash()
                .pipe(switchMap(blockHash => api.query.genericAsset.nextAssetId.at(blockHash as Hash)));
            combineLatest(api.query.genericAsset.nextAssetId(), nextAssetId$).subscribe(
                ([nextAssetId, nextAssetIdAt]) => {
                    expect(nextAssetId.toString()).toEqual(nextAssetIdAt.toString());
                    done();
                }
            );
        });
    });
});
