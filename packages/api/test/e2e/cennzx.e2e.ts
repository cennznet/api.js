import {Keyring} from '@polkadot/api';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
const CENNZ = '16000';
const CENTRAPAY = '16001';
const PLUG = '16003';

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
              for (const {event} of events) {
                if (event.method === 'AddLiquidity') {
                  done();
                }
              }
            }
          });
    });

    describe('Positive flow with liquidity in pool', () => {
      it("Calculate the buy price when buying CENTRAPAY for CENNZ", async done => {
        const amount = 100;
        const poolAssetBalance = await api.derive.cennzxSpot.poolAssetBalance(CENNZ);
        const poolCoreAssetBalance = await api.derive.cennzxSpot.poolCoreAssetBalance(CENNZ);
        console.log('Amount of asset in CENNZ pool:', poolAssetBalance.toString());
        console.log('Amount of core in CENNZ pool:', poolCoreAssetBalance.toString());
        // How much CENTRAPAY will it cost to buy 100 (amount) CENNZ
        const buyPrice = await api.rpc.cennzx.buyPrice(CENTRAPAY, amount, CENNZ);
        console.log('Buy price:', buyPrice.toString());
        expect(buyPrice.toNumber()).toBeGreaterThan(0);
        done();
      });

      it("Calculate the sell price when selling CENNZ for CENTRAPAY ", async done => {
        const amount = 1000;
        // when I sell 1000(amount) CENNZ, how much of CENTRAPAY will I get in return
        const sellPrice = await api.rpc.cennzx
          .sellPrice(CENNZ, amount, CENTRAPAY);
        console.log('Sell price:', sellPrice.toString());
        expect(sellPrice.toNumber()).toBeGreaterThan(0);
        done();
      });
    });

    describe('Negative flow with no liquidity in pool', () => {
      it("Calculate the buy price when buying CENTRAPAY for PLUG", async done => {
        const amount = 100;
        const poolAssetBalance = await api.derive.cennzxSpot.poolAssetBalance(PLUG);
        const poolCoreAssetBalance = await api.derive.cennzxSpot.poolCoreAssetBalance(PLUG);
        console.log('Amount of asset in PLUG pool:', poolAssetBalance.toString());
        console.log('Amount of core in PLUG pool:', poolCoreAssetBalance.toString());
        // How much CENTRAPAY will it cost to buy 100 (amount) PLUG
        await expect(api.rpc.cennzx.buyPrice(CENTRAPAY, amount, PLUG)).rejects.toThrow(
          'buyPrice(AssetToBuy: AssetId, Amount: Balance, AssetToPay: AssetId): Balance:: 2: Cannot exchange for requested amount.:'
        );
        done();
      });

      it("Calculate the sell price when selling PLUG for CENTRAPAY when no liquidity exist ", async done => {
        const amount = 1000;
        // when I sell 1000(amount) PLUG, how much of CENTRAPAY will I get in return
        await expect(api.rpc.cennzx
          .sellPrice(PLUG, amount, CENTRAPAY)).rejects.toThrow(
          'sellPrice(AssetToSell: AssetId, Amount: Balance, AssetToPayout: AssetId): Balance:: 2: Cannot exchange by requested amount.'
        );
        done();
      });
    });

  });
});
