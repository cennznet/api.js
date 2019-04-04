import testingPairs from '@polkadot/keyring/testingPairs';

import {Api} from '../../src/Api';
import {ICennznetExtrinsic} from '../../src/types';

const keyring = testingPairs({type: 'ed25519'}, false);

import {getTypeRegistry} from '@cennznet/types/polkadot';
import BN from 'bn.js';

const typeRegistry = getTypeRegistry();

typeRegistry.register({
    AssetId: 'u32',
    AssetOptions: {total_supply: 'Balance'},
    Group: 'u256',
    Meta: 'u256',
    PKB: 'u256',
    Response: 'u256',
    Topic: 'u256',
    Value: 'u256',
    Amount: 'u256',
    AcceptPayload: 'u256',
    DeviceId: 'u256',
    ExchangeKey: 'u256',
    Invite: 'u256',
    PermissionOptions: 'u256',
    PreKeyBundle: 'u256',
    BalanceLock: 'u256',
    Exposure: 'u256',
    RewardDestination: 'u256',
    StakingLedger: 'u256',
});

describe('sending test doughnut', () => {
    let api;

    beforeEach(async done => {
        if (!api) {
            api = await Api.create();
        }

        jest.setTimeout(30000);
        done();
    });

    afterEach(() => {
        jest.setTimeout(5000);
    });

    it('makes a transfer (sign, then send)', async done => {
        const nonce = await api.query.system.accountNonce(keyring.dave.address());

        const tx = api.tx.genericAsset.transfer(16000, keyring.bob.address(), 10000) as ICennznetExtrinsic<
            Promise<BN>,
            {}
        >;
        tx.addFeeExchangeOpt({
            assetId: 16000,
            maxPayment: 50000,
        });
        tx.sign(keyring.dave, {nonce});
        return tx.send(({events, status, type}) => {
            console.log('Transaction status:', type);
            if (type === 'Finalised') {
                console.log('Completed at block hash', status.value.toHex());
                console.log('Events:');

                events.forEach(({phase, event: {data, method, section}}) => {
                    console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                });

                done();
            }
        });
        done();
    });
});
