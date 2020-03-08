import {Keyring} from '@polkadot/api';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
const CENNZ = '16000';
const CPAY = '16001';

describe('CENNZX e2e queries/transactions', () => {
  let api;
  let alice, bob;
  beforeAll(async () => {
    await cryptoWaitReady();
    api = await initApiPromise();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');
  });

  afterAll(async () => {
    api.disconnect();
  });

  describe('Queries()', () => {

    it("Deposit liquidity in CENNZ asset's pool", async done => {
        const coreAmount = 30000000000000;
        const investmentAmount = await api.derive.cennzxSpot.liquidityPrice(CENNZ, coreAmount);
        const minLiquidity = 1;
        await api.tx.cennzxSpot
          .addLiquidity(CENNZ, minLiquidity, investmentAmount, coreAmount)
          .signAndSend(alice, async ({events, status}) => {
            if (status.isFinalized) {
              let liquidityCreated = false;
              for (const {event} of events) {
                if (event.method === 'AddLiquidity') {
                  done();
                }
              }
            }
          });
    });

    it("Calculate the buy price when buying CENTRAPAY for CENNZ", async done => {
      const amount = 100;
      const poolAssetBalance = await api.derive.cennzxSpot.poolAssetBalance(CENNZ);
      const poolCoreAssetBalance = await api.derive.cennzxSpot.poolCoreAssetBalance(CENNZ);
      console.log('Amount of asset in CENNZ pool:',poolAssetBalance.toString());
      console.log('Amount of core in CENNZ pool:', poolCoreAssetBalance.toString());
      // Cost of CPAY when I buy 100(amount) CENNZ
      const buyPrice = await api.rpc.cennzx.buyPrice(CPAY, amount, CENNZ);
      console.log('Buy price:', buyPrice.toString());
      expect(buyPrice.toNumber()).toBeGreaterThanOrEqual(0);
      done();
    });

    it("Calculate the sell price when selling CENNZ for CENTRAPAY ", async done => {
      const amount = 1000;
      // when I sell 1000(amount) CENNZ, how much of CENTRAPAY will I get in return
      const sellPrice = await api.rpc.cennzx
        .sellPrice(CENNZ, amount, CPAY);
      console.log('Sell price:', sellPrice.toString());
      expect(sellPrice.toNumber()).toBeGreaterThanOrEqual(0);
      done();
    });

  });
});
