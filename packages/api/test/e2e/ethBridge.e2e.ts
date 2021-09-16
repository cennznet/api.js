import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiPromise from '../../../../jest/initApiPromise';
import { Api } from "@cennznet/api";

describe('Eth bridge test', () => {
  let api, alice, aliceStash, bob, testTokenId1, testTokenId2;

  beforeAll(async done => {
    await cryptoWaitReady();
    const keyring = new Keyring({type: 'sr25519'});
    alice = keyring.addFromUri('//Alice');
    aliceStash = keyring.addFromUri('//Alice//stash')
    bob = keyring.addFromUri('//Bob');
    api = await initApiPromise();
    const transaction1 = api.tx.erc20Peg.activateDeposits(true);
    const transaction2 = api.tx.erc20Peg.activateWithdrawals(true);
    const transaction3 = api.tx.erc20Peg.setContractAddress('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');
    const transaction4 = api.tx.ethBridge.setEventConfirmations(0); // Hardhat only makes blocks when txs are sent
    const batchBridgeActivationEx = api.tx.utility.batch([
      transaction1,
      transaction2,
      transaction3,
      transaction4
    ]);

    await api.tx.sudo.sudo(batchBridgeActivationEx).signAndSend(alice, async ({status, events}) => {
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
    const depositTxHash = "0x40964ab316ac8fb083c1c6d171627478b9d6946bdde686e8ec3837e20c535cdb";
    testTokenId1 = await api.query.genericAsset.nextAssetId();
    const claim = {
      tokenAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
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
    const depositTxHash = "0x53433bae44e94ff6e36dbaea06de296fe544619273095b6b8709862f0a551c38";
    const claim = {
      tokenAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
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
    const depositTxHash = "0xbd1e5655b06edf00cc86e913a8f87ec0fcccff77ae2c91f3e8a13a7c1826e56a";
    const claim = {
      tokenAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
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


  describe('Test RPC subscribe to new clain', () => {
    it.skip('Subscribe event proof after mock withdraw', async done => {
      let nonce = await api.rpc.system.accountNextIndex(alice.address);
      await api.tx.erc20Peg.mockWithdraw().signAndSend(alice, {nonce});
      await api.tx.erc20Peg.mockWithdraw().signAndSend(aliceStash);
      let count = 0;
      const unsubHeads = await api.rpc.ethy.subscribeEventProofs((result: any) => {
        console.log('data::', result.toHuman());
        expect(result.eventId.toNumber()).toBeGreaterThanOrEqual(0);
        if (++count === 1) {
          unsubHeads();
          done();
        }
      });
    });

    it('Withdraw claim for test token 2 from Alice', async done => {
      let nonce = await api.rpc.system.accountNextIndex(alice.address);
      let amount = 5644;
      const ethBeneficiary = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';
      await api.tx.erc20Peg.withdraw(testTokenId2, amount, ethBeneficiary,).signAndSend(alice, {nonce}, async ({status, events}) => {
        if (status.isInBlock) {
          for (const {event: {method, section, data}} of events) {
            console.log('\t', `: ${section}.${method}`, data.toString());
            if (section === 'erc20Peg' && method == 'Erc20Withdraw') {
              const [withdrawalId, assetId, amountt, beneficiary] = data;
              expect(withdrawalId.toNumber() as number).toBeGreaterThanOrEqual(0);
              // expect(assetId.toNumber()).toEqual(testTokenId2.toNumber());
              expect(amountt.toNumber()).toEqual(amount);
              expect(beneficiary.toString()).toEqual(ethBeneficiary);
              done();
            }
          }
        }
      });
    });

    it('Withdraw claim for test token 2 from Bob', async done => {
      let nonce = await api.rpc.system.accountNextIndex(bob.address);
      let amount = 11644;
      const ethBeneficiary = '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc';
      await api.tx.erc20Peg.withdraw(testTokenId2, amount, ethBeneficiary,).signAndSend(bob, {nonce}, async ({status, events}) => {
        if (status.isInBlock) {
          for (const {event: {method, section, data}} of events) {
            console.log('\t', `: ${section}.${method}`, data.toString());
            if (section === 'erc20Peg' && method == 'Erc20Withdraw') {
              let count = 0;
              const unsubHeads = await api.rpc.ethy.subscribeEventProofs((result: any) => {
                console.log('data::', result.toHuman());
                if (count++ == 1) {
                  unsubHeads();
                  done();
                }
              });
              const [withdrawalId, assetId, amountt, beneficiary] = data;
              expect(withdrawalId.toNumber() as number).toBeGreaterThanOrEqual(0);
              expect(assetId.toNumber()).toEqual(testTokenId2.toNumber());
              expect(amountt.toNumber()).toEqual(amount);
              expect(beneficiary.toString()).toEqual(ethBeneficiary);
            }
          }
        }
      });
    });

    it( 'Get event id from rpc call', async done => {
      api = await Api.create({network: 'rata'});
      const versionedEventProof = (await api.rpc.ethy.getEventProof('0')).toJSON();
      expect(versionedEventProof.EventProof.eventId.toString()).toEqual('0');

      const eventProof = await api.derive.erc20Peg.eventProof('1');
      console.log('Proof::',eventProof.toHuman());
      expect(eventProof.eventId.toString()).toEqual('1');
      done();
    })
  })
});
