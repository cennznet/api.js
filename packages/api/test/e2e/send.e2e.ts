import WebSocket from '@polkadot/x-ws';
import { RpcCoder } from "@polkadot/rpc-provider/coder";

describe('send', (): void => {

    it('Send request using websocket', async (done)  => {
        const providerUrl = 'wss://cennznet.unfrastructure.io/public/ws';
        const ws = new WebSocket(providerUrl);
        const coder = new RpcCoder();
        ws.onopen = function() {
            const requestObject = coder.encodeJson('system_chain', []);
            ws.send(requestObject);
            ws.onmessage = function (event) {
                expect(event.data).toEqual('{"jsonrpc":"2.0","result":"CENNZnet Azalea","id":1}');
                const data = JSON.parse(event.data);
                expect(data.result).toEqual('CENNZnet Azalea');
                expect(data.id).toBeGreaterThan(0);
                expect(data.jsonrpc).toEqual("2.0");
                done();
            }
        };
    });
});