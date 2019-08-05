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

import {createType} from '@plugnet/types';
import Call from '@plugnet/types/primitive/Generic/Call';
import {IExtrinsic, SignerPayloadJSON} from '@plugnet/types/types';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import extrinsics from '@plugnet/api-metadata/extrinsics/static';
import TestingPairs from '@plugnet/keyring/testingPairs';
import {Wallet} from './';
import {SimpleKeyring} from '@plugnet/wallet';

const TESTING_PAIRS = TestingPairs();

const TEST_ACCOUNT = {
    seed: '0x3cf2ec6ffd26587529ab06c82ba9b33110198085f5c6b8d882653d056bf9e0d3',
    address: '5DHzypfuQH7FPhCsrqMxpxkBaPHe8QNhc5s1PwEMDc5p5Nb7',
    publicKey: '0x366010e706af618a6037731b07663d4b6f10eac201c7fdd5fb0bd4727742524d',
    mnemonic: 'insane push cradle toilet token gate chair trim spare blush rebuild top',
};

const GENESIS_HASH = '0x14ba3ad1bf42740e82a408d57955b0c026bfc268ee559ce9081ba7fb530de815';

const TEST_SIG_OPTS_V1 = {
    nonce: 0,
    blockHash: GENESIS_HASH,
    genesisHash: GENESIS_HASH,
    runtimeVersion: {} as any, //runtimeVersion is not used in v1
};

describe('a wallet', () => {
    let wallet: Wallet;
    let testExtrinsic: IExtrinsic;
    const alice = TESTING_PAIRS.alice;
    const bob = TESTING_PAIRS.bob;
    const walletPassphase = 'a test wallet passphase';

    beforeAll(async () => {
        Call.injectMethods(extrinsics);
        await cryptoWaitReady();
    });

    beforeEach(async () => {
        wallet = new Wallet();
        await wallet.createNewVault(walletPassphase);
        testExtrinsic = createType('Extrinsic', '0x010200ea51b75b00000000');
    });

    describe('sign message', () => {
        describe('ExtrinsicPayloadV1', () => {
            it('sign a raw payload', async () => {
                const keyring = new SimpleKeyring();
                await keyring.addPair(alice);
                await wallet.addKeyring(keyring);
                const sig = await wallet.signRaw({type: 'payload', data: '0x112233', address: alice.address});
                expect(sig).toBeDefined();
                expect(sig.signature).toBeDefined();
                // await expect(wallet.verifySignature(payload, sig, alice.address)).resolves.toBeTruthy();
            });
            it('sign a payload', async () => {
                const keyring = new SimpleKeyring();
                await keyring.addPair(alice);
                await wallet.addKeyring(keyring);
                const payload: SignerPayloadJSON = {
                    address: alice.address,
                    method: '0x1a91ff00',
                    blockHash: GENESIS_HASH,
                    genesisHash: GENESIS_HASH,
                    nonce: '0',
                    tip: '0',
                    blockNumber: '0',
                    era: '0x0703',
                    version: 1,
                    specVersion: 'unknown', // specVersion is not used in SignerPayloadV1
                };
                const sig = await wallet.signPayload(payload);
                expect(sig).toBeDefined();
                expect(sig.signature).toBeDefined();
                // await expect(wallet.verifySignature(payload, sig, alice.address)).resolves.toBeTruthy();
            });
            it('the signer is not in the wallet', async () => {
                const payload: SignerPayloadJSON = {
                    address: alice.address,
                    method: '0x1a91ff00',
                    blockHash: GENESIS_HASH,
                    genesisHash: GENESIS_HASH,
                    nonce: '0',
                    tip: '0',
                    blockNumber: '0',
                    era: '0x0703',
                    version: 1,
                    specVersion: 'unknown', // specVersion is not used in SignerPayloadV1
                };
                await expect(wallet.signPayload(payload)).rejects.toThrow();
            });
        });
    });
});
