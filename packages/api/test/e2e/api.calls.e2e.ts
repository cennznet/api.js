// Copyright 2019 Centrality Investments Limited
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


import {Api} from '../../src/Api';
import WsProvider from '@plugnet/rpc-provider/ws';
import { Hash, Block, HeaderExtended, AccountId, EventRecord, Option, BlockNumber } from '@plugnet/types';
import process from 'process';

describe('e2e api calls', () => {
    let api: Api;
    let websocket: WsProvider;
    let blockHash: Hash;
    beforeAll(async () => {
        const endPoint = process.argv[process.argv.length - 1];
        websocket = new WsProvider(endPoint);
        api = await Api.create({provider: websocket});
        blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
    });

    afterAll(async () => {
        (websocket as any).websocket.onclose = null;
        (websocket as any).websocket.close();
    });

    it('get correct block', async () => {
        const block: Block = await api.rpc.chain.getBlock(blockHash).then((r: any) => r.block);
        expect(block.header.hash).toEqual(blockHash);
    });

    describe('Get transaction fee', () => {
        it('get correct baseFee', async () => {
            const baseFee = await api.query.fees.transactionBaseFee.at(blockHash).then(r => Number(r.toString()));
            expect(baseFee).toBeGreaterThanOrEqual(0);
        });

        it('get correct byteFee', async () => {
            const byteFee = await api.query.fees.transactionByteFee.at(blockHash).then(r => Number(r.toString()));
            expect(byteFee).toBeGreaterThanOrEqual(0);
        });

        it('get correct transferFee', async () => {
            const transferFee = await api.query.genericAsset.transferFee.at(blockHash).then(r => Number(r.toString()));
            expect(transferFee).toBeGreaterThanOrEqual(0);
        });
    })

    it('get correct validators', async () => {
        const validators: AccountId[] = await api.query.session.validators.at(blockHash) as any;
        expect(validators.length).toBeGreaterThan(0);
    });

    it('expect author is in validators', async () => {
        const block: Block = await api.rpc.chain.getBlock(blockHash).then((r: any) => r.block);
        const header = block.header;
        const validators: AccountId[] = await api.query.session.validators.at(blockHash) as any;
        const extHeader = new HeaderExtended(header, validators);
        const author: AccountId = extHeader.author;
        expect(validators).toEqual(         
            expect.arrayContaining([     
              expect.objectContaining(author)
            ])
          )
    });

    it('expect at least one event', async () => {
        const events: EventRecord[] = await api.query.system.events.at(blockHash) as any;
        expect(events.length).toBeGreaterThan(0);
    });
    
    describe('Get session info', () => {
        it('get correct session length', async () => {
            const sessionLength: number = await api.query.session.sessionLength.at(blockHash).then((r: any) => r.toNumber());
            expect(sessionLength).toBeGreaterThan(0);
        });

        it('get correct last length change', async () => {
            const lastLengthChange: number = await api.query.session.lastLengthChange.at(blockHash).then((r: Option<BlockNumber>) => Number(r.unwrapOr(0)));
            expect(lastLengthChange).toBeGreaterThanOrEqual(0);
        });

        it('get correct current index', async () => {
            const currentIndex: number = await api.query.session.currentIndex.at(blockHash).then((r: any) => r.toNumber());
            expect(currentIndex).toBeGreaterThanOrEqual(0);
        });

        it('get correct last era length change', async () => {
            const lastEraLengthChange: number = await api.query.staking.lastEraLengthChange.at(blockHash).then((r: any) => r.toNumber());
            expect(lastEraLengthChange).toBeGreaterThanOrEqual(0);
        });

        it('get correct sessions per era', async () => {
            const sessionsPerEra: number = await api.query.staking.sessionsPerEra.at(blockHash).then((r: any) => r.toNumber());
            expect(sessionsPerEra).toBeGreaterThan(0);
        });
    })

    describe('Get core asset id', () => {
        it('get correct spending asset id', async () => {
            const spendingAssetId: number = await api.query.genericAsset.spendingAssetId.at(blockHash).then(r => Number(r.toString()));
            expect(spendingAssetId).toBeGreaterThanOrEqual(0);
        });

        it('get correct staking asset id', async () => {
            const stakingAssetId: number = await api.query.genericAsset.stakingAssetId.at(blockHash).then(r => Number(r.toString()));
            expect(stakingAssetId).toBeGreaterThanOrEqual(0);
        });
    })

});
