// Copyright 2019-2020 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { RpcCoder } from "@polkadot/rpc-provider/coder";
import { JsonRpcResponse } from "@polkadot/rpc-provider/types";

describe('decodeResponse', (): void => {
    let coder: RpcCoder;

    beforeEach((): void => {
        coder = new RpcCoder();
    });

    it('expects a non-empty input object', (): void => {
        expect(
            () => coder.decodeResponse(undefined as unknown as JsonRpcResponse)
        ).toThrow(/Empty response/);
    });

    it('expects a valid jsonrpc field', (): void => {
        expect(
            () => coder.decodeResponse({} as JsonRpcResponse)
        ).toThrow(/Invalid jsonrpc/);
    });

    it('expects a valid id field', (): void => {
        expect(
            () => coder.decodeResponse({ jsonrpc: '2.0' } as JsonRpcResponse)
        ).toThrow(/Invalid id/);
    });

    it('expects a valid result field', (): void => {
        expect(
            () => coder.decodeResponse({ id: 1, jsonrpc: '2.0' } as JsonRpcResponse)
        ).toThrow(/No result/);
    });

    it('throws any error found', (): void => {
        expect(
            () => coder.decodeResponse({ error: { code: 123, message: 'test error' }, id: 1, jsonrpc: '2.0' } as JsonRpcResponse)
        ).toThrow(/123: test error/);
    });

    it('throws any error found, with data', (): void => {
        expect(
            () => coder.decodeResponse({ error: { code: 123, data: 'Error("Some random error description")', message: 'test error' }, id: 1, jsonrpc: '2.0' } as JsonRpcResponse)
        ).toThrow(/123: test error: Some random error description/);
    });

    it('allows for number subscription ids', (): void => {
        expect(
            coder.decodeResponse({ id: 1, jsonrpc: '2.0', method: 'test', params: { result: 'test result', subscription: 1 } } as JsonRpcResponse)
        ).toEqual('test result');
    });

    it('allows for string subscription ids', (): void => {
        expect(
            coder.decodeResponse({ id: 1, jsonrpc: '2.0', method: 'test', params: { result: 'test result', subscription: 'abc' } } as JsonRpcResponse)
        ).toEqual('test result');
    });

    it('returns the result', (): void => {
        expect(
            coder.decodeResponse({ id: 1, jsonrpc: '2.0', result: 'some result' } as JsonRpcResponse)
        ).toEqual('some result');
    });
    it('encodes a valid JsonRPC object', () => {
        expect(coder.encodeObject('method', ['a', 'b'])).toEqual({
            id: 1,
            jsonrpc: '2.0',
            method: 'method',
            params: ['a', 'b']
        });
        expect(coder.getId()).toEqual(1);
    });
    it('encodes a valid JsonRPC JSON string', () => {
      const p: unknown[] = ['params'];
        expect(coder.encodeJson('method', p)).toEqual('{"id":1,"jsonrpc":"2.0","method":"method","params":["params"]}');
    });
});
