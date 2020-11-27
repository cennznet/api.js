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
import { Hash, Block, AccountId, EventRecord, AssetId } from '@cennznet/types'
import { HeaderExtended } from '@polkadot/api-derive';
import initApiPromise from '../../../../jest/initApiPromise';
import {Api} from "@cennznet/api";
import {SignedBlock} from "@polkadot/types/interfaces/runtime";
import {Extrinsic} from "@polkadot/types/interfaces";
import {Vec} from "@polkadot/types";

describe('e2e api calls', () => {
  let api;
  let blockHash: Hash;
  beforeAll(async () => {
    api = await initApiPromise();
    blockHash = await api.rpc.chain.getBlockHash();
  });

  afterAll(async done => {
    if (api) {
      return await api.disconnect();
    }
    api = null;
    done();
  });

  it('Get correct block', async () => {
    const block: Block = await api.rpc.chain.getBlock(blockHash).then((r: any) => r.block);
    expect(block.header.hash.toString()).toEqual(blockHash.toString());
  });

  it('Query historical block from runtime version 36', async () => {
    const blockNumber = 3759962; // old Azalea block at runtime version 36
    const API_KEY = process.env.API_KEY;

    const provider = `wss://node-6711773975684325376.jm.onfinality.io/ws?apikey=${API_KEY}`;
    const apiV36 = await Api.create({provider});
    const bHash = await apiV36.rpc.chain.getBlockHash(blockNumber);
    const block: SignedBlock = await apiV36.rpc.chain.getBlock(bHash);
    const extrinsicList: Vec<Extrinsic> = block.block.extrinsics;
    expect(extrinsicList[0].method.section).toEqual('timestamp');
    expect(extrinsicList[0].method.method).toEqual('set');
    expect(extrinsicList[1].method.section).toEqual('finalityTracker');
    expect(extrinsicList[1].method.method).toEqual('finalHint');
    expect(extrinsicList[2].method.section).toEqual('syloE2Ee');
    expect(extrinsicList[2].method.method).toEqual('replenishPkbs');
    expect(extrinsicList[3].method.section).toEqual('syloE2Ee');
    expect(extrinsicList[3].method.method).toEqual('withdrawPkbs');
    await apiV36.disconnect();
  });

  it('Subscribe system events for runtime version 36', async done => {
    const provider = 'wss://cennznet.unfrastructure.io/public/ws';
    const apiV36 = await Api.create({provider});
    let eventCount = 0;
    // subscribe to system events via storage and show the next 14 events on Azalea
    apiV36.query.system.events((events) => {
      if (eventCount === 14 ) {
        done();
      }
      const totalEvents = events.length;
      console.log(`\nReceived ${totalEvents} events:`);
      // loop through the Vec<EventRecord>
      events.forEach((record : EventRecord) => {
        eventCount++;

        // extract the phase, event and the event types
        const { event, phase } = record;
        const types = event.typeDef;
        const phaseIndex = phase.asApplyExtrinsic.toNumber();

        expect(phaseIndex).toBeLessThan(totalEvents);

        // Display event method and phase
        console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
        if (event.meta) {
          console.log(`\t\t${event.meta.documentation.toString()}`);
        }

        // loop through each of the parameters, displaying the type and data
        event.section &&  event.data.forEach((data, index) => {
          console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
        });
      });
    });
  });

  it('Get correct validators', async () => {
    const validators: AccountId[] = (await api.query.session.validators.at(blockHash)) as any;
    expect(validators.length).toBeGreaterThan(0);
  });

  it('Expect author is in validators', async () => {
    const block: Block = await api.rpc.chain.getBlock(blockHash).then((r: any) => r.block);
    const header = block.header;
    const validators: AccountId[] = (await api.query.session.validators.at(blockHash)) as any;
    const extHeader = new HeaderExtended(api.registry, header, validators);
    const author: AccountId = extHeader.author;
    expect(validators).toEqual(expect.arrayContaining([expect.objectContaining(author)]));
  });

  it('Expect at least one event', async () => {
    const events: EventRecord[] = (await api.query.system.events.at(blockHash)) as any;
    expect(events.length).toBeGreaterThan(0);
  });

  describe('Get session info', () => {
    it('Get correct session information (length, last length, era, current index, session per era', async () => {
      const currentSession = await api.derive.session.info();
      expect(currentSession.currentEra.toNumber()).toBeGreaterThanOrEqual(0);
      expect(currentSession.currentIndex.toNumber()).toBeGreaterThanOrEqual(0);
      expect(currentSession.eraLength.toNumber()).toBeGreaterThanOrEqual(0);
      expect(currentSession.isEpoch).toBe(true);
      expect(currentSession.sessionLength.toNumber()).toBeGreaterThanOrEqual(0);
      expect(currentSession.sessionsPerEra.toNumber()).toBeGreaterThanOrEqual(0);
      expect(currentSession.validatorCount.toNumber()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Get core asset id', () => {
    it('Get correct spending asset id', async () => {
      const spendingAssetId = (await api.query.genericAsset.spendingAssetId.at(blockHash)) as AssetId;
      expect(spendingAssetId.gtn(0)).toBeTruthy();
    });

    it('Get correct staking asset id', async () => {
      const stakingAssetId = (await api.query.genericAsset.stakingAssetId.at(blockHash)) as AssetId;
      expect(stakingAssetId.gtn(0)).toBeTruthy();
    });
  });
});
