import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiPromise from '../../../../jest/initApiPromise';

describe('Eth bridge test', () => {
  let api, alice, aliceStash, bob, testTokenId1, testTokenId2;

  beforeAll(async done => {
    await cryptoWaitReady();
    const keyring = new Keyring({type: 'sr25519'});
    alice = keyring.addFromUri('//Alice');
    aliceStash = keyring.addFromUri('//Alice//stash')
    bob = keyring.addFromUri('//Bob');
    api = await initApiPromise();
    await api.tx.sudo.sudo(api.tx.erc20Peg.activateDeposits(true)).signAndSend(alice, async ({status, events}) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });
        done();
      }
    });
  });

  afterAll(async () => {
    await api.disconnect();
  });

  describe('Eth bridge claims', () => {
  it('Submit claim for test token 1 from BridgeTest account', async done => {
    const depositTxHash = "0xcf38ab5a958c962d286eff3b487ca44da01e42ddb9d9848327dec1e14d39329d";
    testTokenId1 = await api.query.genericAsset.nextAssetId();
    const claim = {
      tokenAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      amount: "1423",
      beneficiary: "0xacd6118e217e552ba801f7aa8a934ea6a300a5b394e7c3f42cd9d6dd9a457c10"
    };
    console.log('Claim::',claim.toString());

    console.log('testTokenId1::',testTokenId1.toString());
    let nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.erc20Peg.depositClaim(depositTxHash, claim).signAndSend(alice, {nonce}, async ({status, events}) => {
      if (status.isInBlock) {
        for (const {event: {method, section, data}} of events) {
          console.log('\t', `: ${section}.${method}`, data.toString());
          if (section === 'erc20Peg' && method == 'Erc20Claim') {
            const [claimId, claimer] = data;
            expect(claimId.toNumber() as number).toBeGreaterThanOrEqual(0);
            expect(claimer.toString()).toEqual(alice.address);
            done();
          }
        }
      }
    });
  });

  it('Submit claim for test token 2 from Alice', async done => {
    const depositTxHash = "0x040467352a3521aff88e7c9d3f5b02409cd23d21201da79dced1e93380a1f9fe";
    const claim = {
      tokenAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      amount: "5644",
      beneficiary: "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d"
    };
    let nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.erc20Peg.depositClaim(depositTxHash, claim).signAndSend(alice, {nonce}, async ({status, events}) => {
      if (status.isInBlock) {
        for (const {event: {method, section, data}} of events) {
          console.log('\t', `: ${section}.${method}`, data.toString());
          if (section === 'erc20Peg' && method == 'Erc20Claim') {
            const [claimId, claimer] = data;
            expect(claimId.toNumber() as number).toBeGreaterThanOrEqual(0);
            expect(claimer.toString()).toEqual(alice.address);
            done();
          }
        }
      }
    });
  });

  it('Submit claim for test token 2 from Bob', async done => {
    const depositTxHash = "0x465219300b281bd1c94fa89c9e1d64b6a74b1ea27547f2e37e0f4507d9d5685b";
    const claim = {
      tokenAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      amount: "11644",
      beneficiary: "0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48"
    };
    let nonce = await api.rpc.system.accountNextIndex(alice.address);
    testTokenId2 = await api.query.genericAsset.nextAssetId();
    console.log('testTokenId2::',testTokenId2.toString());
    await api.tx.erc20Peg.depositClaim(depositTxHash, claim).signAndSend(alice, {nonce}, async ({status, events}) => {
      if (status.isInBlock) {
        for (const {event: {method, section, data}} of events) {
          console.log('\t', `: ${section}.${method}`, data.toString());
          if (section === 'erc20Peg' && method == 'Erc20Claim') {
            const [claimId, claimer] = data;
            expect(claimId.toNumber() as number).toBeGreaterThanOrEqual(0);
            expect(claimer.toString()).toEqual(alice.address);
            done();
          }
        }
      }
    });
  });

});

  describe('Query storage check claimed tokens', () => {

    beforeAll(async done => {

    // wait for 4 blocks before checking the storage
      let count = 0;

      const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
        console.log(`chain: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

        api.query.system.events((events) => {
          console.log(`\nReceived ${events.length} events:`);

          // loop through the Vec<EventRecord>
          events.forEach((record) => {
            // extract the phase, event and the event types
            const { event, phase } = record;
            const types = event.typeDef;

            // show what we are busy with
            console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
            console.log(`\t\t${event.meta.documentation.toString()}`);

            // loop through each of the parameters, displaying the type and data
            event.data.forEach((data, index) => {
              console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
            });
          });
        });
        if (++count === 4) {
          unsubHeads();
          done();
        }
      });
    });

    it('Queries registered assets', async done => {

      const registeredAsset = await api.rpc.genericAsset.registeredAssets();
      console.log(registeredAsset.toJSON());
      const hasTestToken1Asset = ([assetId, meta]) => assetId.toString() === testTokenId1.toString() && meta.decimalPlaces.toString() === '18';
      const hasTestToken2Asset = ([assetId, meta]) => assetId.toString() === testTokenId2.toString() && meta.decimalPlaces.toString() === '18';
      expect(registeredAsset.some(hasTestToken1Asset)).toBe(true);
      expect(registeredAsset.some(hasTestToken2Asset)).toBe(true);
      done();
    });

    it('Queries generic asset balance for test token 1 for BridgeTests account', async done => {
      const bridgeTestAccount = '5FyKggXKhqAwJ2o9oBu8j3WHbCfPCz3uCuhTc4fTDgVniWNU';
      const assetBalance = await api.query.genericAsset.freeBalance(testTokenId1.toNumber(), bridgeTestAccount);
      expect(assetBalance.toString()).toBe("1423");
      done();
    });

    it('Queries generic asset balance for test token 2 for Alices account', async done => {
      const assetBalance = await api.query.genericAsset.freeBalance(testTokenId2.toNumber(), alice.address);
      expect(assetBalance.toString()).toBe("5644");
      done();
    });

    it('Queries generic asset balance for test token 2 for Bobs account', async done => {
      const assetBalance = await api.query.genericAsset.freeBalance(testTokenId2.toNumber(), bob.address);
      expect(assetBalance.toString()).toBe("11644");
      done();
    });

    it('Queries totalIssuance for test token 2', async done => {
      const totalIssuance = await api.query.genericAsset.totalIssuance(testTokenId2.toNumber());
      expect(totalIssuance.toString()).toBe((11644 + 5644).toString());
      done();
    });

  });
});
