import { WsProvider } from "@polkadot/rpc-provider";

describe('send', (): void => {
    let ws: WsProvider;

    beforeEach((): void => {
        const providerUrl = 'wss://cennznet.unfrastructure.io/public/ws';
        ws = new WsProvider(providerUrl);
    });

    it('Send request using ws provider', async ()  => {
        const hash = await ws.send('chain_getBlockHash', []);
        expect(hash).toBeDefined();
        const chain = await ws.send('system_chain', []);
        expect(chain).toBe('CENNZnet Azalea');
    });
});