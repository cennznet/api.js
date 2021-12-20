import {EthEventProof} from "@cennznet/api/derives/ethBridge/types";
import { awaitDepositClaim, ClaimDeposited, extractEthereumSignature } from "@cennznet/api/util/helper";
import {AssetId, Balance, EventClaimId} from "@cennznet/types";
import { encodeAddress } from "@polkadot/util-crypto";
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiPromise from '../../../../jest/initApiPromise';
import { Api } from "@cennznet/api";

describe('Eth bridge test', () => {
  let api: Api, alice, aliceStash, bob, testTokenId1, testTokenId2;

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
      const depositTxHash = "0x8de45761831d90b179fbf97ef47ac80d540ce619d7c9bb2b54a0fed13b6f714c";
      testTokenId1 = await api.query.genericAsset.nextAssetId();
      const depositAmount = "1423";
      const beneficiaryAcc = "0xacd6118e217e552ba801f7aa8a934ea6a300a5b394e7c3f42cd9d6dd9a457c10";
      const claim = {
        tokenAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        amount: depositAmount,
        beneficiary: beneficiaryAcc
      };
      console.log('New token generated will be::',testTokenId1.toString());
      const depositClaimEvent: ClaimDeposited = await awaitDepositClaim(api, depositTxHash, claim, alice) as ClaimDeposited;

      const beneficiaryAddress = encodeAddress(beneficiaryAcc, 42); // convert public key to address

      const {claimId, assetId, amount, beneficiary} = depositClaimEvent;
      expect(claimId).toBeGreaterThanOrEqual(0);
      expect(assetId).toEqual(testTokenId1.toString());
      expect(amount).toEqual(depositAmount);
      expect(beneficiary).toEqual(beneficiaryAddress);
      const assetBalance = await api.query.genericAsset.freeBalance(testTokenId1.toNumber(), beneficiaryAddress);
      expect(assetBalance.toString()).toBe(depositAmount);
      done();
  });

  it('Submit a wrong claim ', async done => {
      const depositTxHash = "0x028a721fcfd6ffa48e1095294bc26570f61a1866a57b7e6162ddaebe22871608";
      testTokenId1 = await api.query.genericAsset.nextAssetId();
      const depositAmount = "1423";
      const beneficiaryAcc = "0xacd6118e217e552ba801f7aa8a934ea6a300a5b394e7c3f42cd9d6dd9a457c10";
      const claim = {
        tokenAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        amount: depositAmount,
        beneficiary: beneficiaryAcc
      };
      await expect(awaitDepositClaim(api, depositTxHash, claim, alice)).rejects.toEqual(
        'Claim deposition failed');
      done();
    });

    it('Submitting same claim again show fail', async done => {
      const depositTxHash = "0x8de45761831d90b179fbf97ef47ac80d540ce619d7c9bb2b54a0fed13b6f714c";
      testTokenId1 = await api.query.genericAsset.nextAssetId();
      const depositAmount = "1423";
      const beneficiaryAcc = "0xacd6118e217e552ba801f7aa8a934ea6a300a5b394e7c3f42cd9d6dd9a457c10";
      const claim = {
        tokenAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        amount: depositAmount,
        beneficiary: beneficiaryAcc
      };
      await expect(awaitDepositClaim(api, depositTxHash, claim, alice)).rejects.toEqual(
        'Claim already notarized');
      done();
    });

  it('Submit claim for test token 2 from Alice', async done => {
    const depositTxHash = "0x736f081653a370dd76a8320a83d80a2939dd7d49e0ecdc99b99850d5b4256553";
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
            expect((claimId as EventClaimId).toNumber()).toBeGreaterThanOrEqual(0);
            expect(claimer.toString()).toEqual(alice.address);
            done();
          }
        }
      }
    });
  });

  it('Submit claim for test token 2 from Bob', async done => {
    const depositTxHash = "0xd054dc0a46e07b8688aa9e1eee76ec7d88a129ba777845e3d8d55b4cd9beed3b";
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
            expect((claimId as EventClaimId).toNumber()).toBeGreaterThanOrEqual(0);
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
              expect((withdrawalId as EventClaimId).toNumber()).toBeGreaterThanOrEqual(0);
              // expect(assetId.toNumber()).toEqual(testTokenId2.toNumber());
              expect((amountt as Balance).toNumber()).toEqual(amount);
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
              expect((withdrawalId as EventClaimId).toNumber()).toBeGreaterThanOrEqual(0);
              expect((assetId as AssetId).toNumber()).toEqual(testTokenId2.toNumber());
              expect((amountt as Balance).toNumber()).toEqual(amount);
              expect(beneficiary.toString()).toEqual(ethBeneficiary);
            }
          }
        }
      });
    });

    it( 'Get event id from rpc call', async done => {
      // TODO - uncomment the following when rata is healthy again..
      // api = await Api.create({network: 'rata'});
      // const versionedEventProof = (await api.rpc.ethy.getEventProof('0')).toJSON();
      // expect(versionedEventProof.EventProof.eventId.toString()).toEqual('0');
      const eventId = api.registry.createType('EthyEventId',1);
      const eventProof = await api.derive.ethBridge.eventProof(eventId);
      console.log('Proof::',eventProof);
      expect((eventProof as unknown as EthEventProof).eventId).toEqual('1');
      done();
    })

    it( 'Get r,s,v from signature', async done => {
      const sign = api.registry.createType('EthereumSignature', '0x5e0a108f836af7c7aeb832382f0a237709da037abdac72cc16a8a54b77d2bb946bb8e78fd63af7594650b8d1a033046e3d08ad15a0b648a0473263e51fe70e1b01');
      const signatures = [sign];
      const { r, s, v } = extractEthereumSignature(signatures);

      expect(r[0]).toEqual('0x5e0a108f836af7c7aeb832382f0a237709da037abdac72cc16a8a54b77d2bb94');
      expect(s[0]).toEqual('0x6bb8e78fd63af7594650b8d1a033046e3d08ad15a0b648a0473263e51fe70e1b');
      expect(v[0]).toEqual(28);

      done();
    })

    it(   'Get r,s,v from invalid signature', async done => {
      const sign = api.registry.createType('EthereumSignature', '');
      const signatures = [sign];
      const { r, s, v } = extractEthereumSignature(signatures);
      expect(r).toEqual(['0x0000000000000000000000000000000000000000000000000000000000000000']);
      expect(s).toEqual(['0x0000000000000000000000000000000000000000000000000000000000000000']);
      expect(v[0]).toEqual(27);

      done();
    })


    it(   'For rata chain get series metadata URI at collection id 29', async done => {
      const provider = 'wss://kong2.centrality.me/public/rata/ws';

      const apiRata: Api = await Api.create({provider});

      const metadataPath = (await api.query.nft.seriesMetadataURI(
        29,
        0
      )).toHuman();
      expect(metadataPath).toEqual("ipfs://QmWGYnnapNUT9voEx8gyZBXKsSgmWWQXdkCqRrucQ8qdmx");
      await apiRata.disconnect();
      done();
    })

  })
});
