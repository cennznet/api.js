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

import {Option} from '@polkadot/types';
import {Hash, Block, AccountId, EventRecord, BlockNumber, Balance} from '@polkadot/types/interfaces';
import {HeaderExtended} from '@polkadot/api-derive';
import {AssetId, Fee} from '@cennznet/types';

import {Api} from '../../src/Api';

describe('e2e api calls', () => {
    let api: Api;
    let blockHash: Hash;
    beforeAll(async () => {
        api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
        blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
    });

    afterAll(async () => {
        api.disconnect();
    });

    it('get correct block', async () => {
        const block: Block = await api.rpc.chain.getBlock(blockHash).then((r: any) => r.block);
        expect(block.header.hash.toString()).toEqual(blockHash.toString());
    });

    describe('Get transaction fee', () => {
        it('get correct baseFee', async () => {
            const baseFee = await api.query.fees.feeRegistry(Fee.FeesFee.BaseFee) as Balance;
            expect(baseFee.gtn(0)).toBeTruthy();
        });

        it('get correct byteFee', async () => {
            const byteFee = await api.query.fees.feeRegistry(Fee.FeesFee.BytesFee) as Balance;
            expect(byteFee.gtn(0)).toBeTruthy();
        });

        it('get correct transferFee', async () => {
            const transferFee = await api.query.fees.feeRegistry(Fee.GenericAssetFee.TransferFee) as Balance;
            expect(transferFee.gtn(0)).toBeTruthy();
        });
    });

    it('get correct validators', async () => {
        const validators: AccountId[] = (await api.query.session.validators.at(blockHash)) as any;
        expect(validators.length).toBeGreaterThan(0);
    });

    it('expect author is in validators', async () => {
        const block: Block = await api.rpc.chain.getBlock(blockHash).then((r: any) => r.block);
        const header = block.header;
        const validators: AccountId[] = (await api.query.session.validators.at(blockHash)) as any;
        const extHeader = new HeaderExtended(header, validators);
        const author: AccountId = extHeader.author;
        expect(validators).toEqual(expect.arrayContaining([expect.objectContaining(author)]));
    });

    it('expect at least one event', async () => {
        const events: EventRecord[] = (await api.query.system.events.at(blockHash)) as any;
        expect(events.length).toBeGreaterThan(0);
    });

    describe('Get session info', () => {
        it('get correct session length', async () => {
            const sessionLength: number = await api.query.session.sessionLength
                .at(blockHash)
                .then((r: any) => r.toNumber());
            expect(sessionLength).toBeGreaterThan(0);
        });

        it('get correct last length change', async () => {
            const lastLengthChange: number = await api.query.session.lastLengthChange
                .at(blockHash)
                .then((r: Option<BlockNumber>) => Number(r.unwrapOr(0)));
            expect(lastLengthChange).toBeGreaterThanOrEqual(0);
        });

        it('get correct current index', async () => {
            const currentIndex: number = await api.query.session.currentIndex
                .at(blockHash)
                .then((r: any) => r.toNumber());
            expect(currentIndex).toBeGreaterThanOrEqual(0);
        });

        it('get correct last era length change', async () => {
            const lastEraLengthChange: number = await api.query.staking.lastEraLengthChange
                .at(blockHash)
                .then((r: any) => r.toNumber());
            expect(lastEraLengthChange).toBeGreaterThanOrEqual(0);
        });

        it('get correct sessions per era', async () => {
            const sessionsPerEra: number = await api.query.staking.sessionsPerEra
                .at(blockHash)
                .then((r: any) => r.toNumber());
            expect(sessionsPerEra).toBeGreaterThan(0);
        });
    });

    describe('Get core asset id', () => {
        it('get correct spending asset id', async () => {
            const spendingAssetId = await api.query.genericAsset.spendingAssetId
                .at(blockHash) as AssetId;
            expect(spendingAssetId.gtn(0)).toBeTruthy();
        });

        it('get correct staking asset id', async () => {
            const stakingAssetId = await api.query.genericAsset.stakingAssetId
                .at(blockHash) as AssetId;
            expect(stakingAssetId.gtn(0)).toBeTruthy();
        });
    });
});
