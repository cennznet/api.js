/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import { Api } from "../../src/Api";
import {Wallet, SimpleKeyring} from 'cennznet-wallet';
import {stringToU8a} from '@polkadot/util';
import WsProvider from '@polkadot/rpc-provider/ws';
import {Balance, Hash} from '@polkadot/types';

const sender = {
    address: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT',
    seed: stringToU8a(('cennznetjstest' as any).padEnd(32, ' '))
}
const receiver = {
    address: '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3',
    seed: stringToU8a(('cennznetjstest2' as any).padEnd(32, ' '))
}
const passphrase = 'passphrase';

describe('e2e queries', () => {
    let api: Api;
    let websocket: WsProvider;
    beforeAll(async () => {
        websocket = new WsProvider('ws://cennznet-node-0.centrality.me:9944');
        api = await Api.create({provider: websocket});
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        simpleKeyring.addFromSeed(sender.seed);
        const wallet = new Wallet();
        await wallet.createNewVault(passphrase);
        await wallet.addKeyring(simpleKeyring);
        api.setSigner(wallet);
    }) 

    afterAll(async () => {
        (websocket as any).websocket.onclose = null;
        (websocket as any).websocket.close();
    })

    describe('Query storage using at', () => {
        it('queries correct balance', async () => {
            const balance = await api.query.balances.freeBalance(sender.address);
            const blockHash = await api.rpc.chain.getBlockHash();
            const balanceQueryUsingAt = await api.query.balances.freeBalance.at(blockHash, sender.address);
            expect(balance).toEqual(balanceQueryUsingAt);
        }) 
    })
    
    describe('Subscribe storage', () => {
        let subscribeNumber: number;
        afterAll(async () => {
            await api.query.balance.freeBalance.unsubscribe(subscribeNumber);
        })
        it('emits events when storage changes', async (done) => {
            const transferAmount: number = 50;
            let count = 0;
            let originalBalance: number;
            subscribeNumber = await api.query.balances.freeBalance(receiver.address, (result: Balance) => {
                if (count === 0) {
                    originalBalance = Number(result.toString(10));
                    count += 1;
                } else {
                    expect(Number(result.toString(10))).toEqual(originalBalance + transferAmount);
                    done();
                }
            }); 
            // transfer
            await api.tx.balances.transfer(receiver.address, transferAmount).send({from: sender.address});
        });
    })
})