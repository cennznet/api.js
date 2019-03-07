/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import {Hash} from '@polkadot/types';
import {ApiRx} from '../../src/ApiRx';
import {Wallet, SimpleKeyring} from '@cennznet/wallet';
import {stringToU8a} from '@polkadot/util';
import WsProvider from '@polkadot/rpc-provider/ws';
import {combineLatest} from 'rxjs';
import {switchMap} from 'rxjs/operators';

const sender = {
    address: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT',
    seed: stringToU8a(('cennznetjstest' as any).padEnd(32, ' ')),
};
const receiver = {
    address: '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3',
    seed: stringToU8a(('cennznetjstest2' as any).padEnd(32, ' ')),
};
const passphrase = 'passphrase';

describe('e2e queries', () => {
    let api: ApiRx;
    let websocket: WsProvider;
    beforeAll(async () => {
        websocket = new WsProvider('wss://cennznet-node-0.centrality.me:9944');
        api = await ApiRx.create({provider: websocket}).toPromise();
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
