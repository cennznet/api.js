// Copyright 2017-2019 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import extrinsics from '@polkadot/extrinsics/static';
import {Extrinsic, Method, ExtrinsicStatus, SignedBlock, EventRecord, Hash, u32} from '@polkadot/types';
import {instance, mock, when} from 'ts-mockito';
import {Api} from './Api';
import SubmittableExtrinsic from './SubmittableExtrinsic';
import {SubmittableSendResult} from './types';
import {hexToU8a} from '@polkadot/util';

describe('SubmittableExtrinsic', () => {
    beforeAll(() => {
        Method.injectMethods(extrinsics);
    });

    describe('sign()', () => {
        let genesisHash: any;
        let nonce: any;
        let signerPair: any;
        let apiMock: Api;
        let submittableExtrinsic: SubmittableExtrinsic;
        beforeAll(() => {
            genesisHash = 'genesisHash';
            nonce = 'nonce';
            signerPair = 'signerPair';
        });
        beforeEach(() => {
            apiMock = mock(Api);
            // create a new extrinisic instance
            const tx = new Extrinsic('0x010200ea51b75b00000000');
            submittableExtrinsic = new SubmittableExtrinsic(instance(apiMock), tx);
        });
        it('signs Extrinsic', () => {
            // mock sign method
            let originalExtrinsicSign: any = Extrinsic.prototype.sign;
            const signMock = jest.fn();
            Extrinsic.prototype.sign = signMock;
            // call sign
            const args = submittableExtrinsic.sign(signerPair, {nonce: nonce, blockHash: genesisHash});
            expect(signMock.mock.calls.length).toEqual(1);
            expect(signMock.mock.calls[0][0]).toEqual(signerPair);
            expect(signMock.mock.calls[0][1]).toEqual({nonce: nonce, blockHash: genesisHash});
            // set sign method back to the original
            Extrinsic.prototype.sign = originalExtrinsicSign;
        });
        // it('signs Extrinsic without blockHash', () => {
        //     // stub getter before execution
        //     when(apiMock.genesisHash).thenReturn(genesisHash);
        //     // mock sign method
        //     let originalExtrinsicSign: any = Extrinsic.prototype.sign;
        //     const signMock = jest.fn();
        //     Extrinsic.prototype.sign = signMock;
        //     // call sign
        //     const args = submittableExtrinsic.sign(signerPair, {nonce: nonce});
        //     expect(signMock.mock.calls.length).toEqual(1);
        //     expect(signMock.mock.calls[0][0]).toEqual(signerPair);
        //     expect(signMock.mock.calls[0][1]).toEqual({nonce: nonce});

        //     // set sign method back to the original
        //     Extrinsic.prototype.sign = originalExtrinsicSign;
        // });
    });

    describe('send()', () => {
        it('calls signs and calls submitExtrinsic without statusCb and isSigned', async () => {
            const txOpt = {
                from: 'from',
                blockHash: 'blockHash',
            };
            const nonce = 1234;
            const result = 'result';
            // mock
            const accountNonce = jest.fn(arg => nonce);
            const submitExtrinsic = jest.fn((...args) => result);
            const submitAndWatchExtrinsic = jest.fn((...args) => result);
            const sign = jest.fn();
            const MockApi = jest.fn<Api>(() => {
                return {
                    query: {
                        system: {
                            accountNonce,
                        },
                    },
                    rpc: {
                        author: {
                            submitExtrinsic,
                            submitAndWatchExtrinsic,
                        },
                    },
                    signer: {
                        sign,
                    },
                };
            });
            let apiMock: Api = new MockApi();
            let submittableExtrinsic: SubmittableExtrinsic = getSubmittableExtrinsicByApi(apiMock);
            // send
            const returned = await submittableExtrinsic.send(txOpt);
            expect(returned).toEqual(result);
            // verify functions called
            expect(accountNonce.mock.calls.length).toEqual(1);
            expect(accountNonce.mock.calls[0][0]).toEqual(txOpt.from);
            expect(sign.mock.calls.length).toEqual(1);
            expect(sign.mock.calls[0][1]).toEqual({...txOpt, nonce: `${nonce}`});
            expect(submitExtrinsic.mock.calls.length).toEqual(1);
            expect(submitAndWatchExtrinsic.mock.calls.length).toEqual(0);
        });

        it('calls submitAndWatchExtrinsic with statusCb', async () => {
            const txOpt = {
                from: 'from',
                blockHash: 'blockHash',
            };
            const nonce = 1234;
            const result = 'result';
            // mock
            const accountNonce = jest.fn(arg => nonce);
            const submitExtrinsic = jest.fn((...args) => result);
            const submitAndWatchExtrinsic = jest.fn((...args) => result);
            const sign = jest.fn();
            const MockApi = jest.fn<Api>(() => {
                return {
                    query: {
                        system: {
                            accountNonce,
                        },
                    },
                    rpc: {
                        author: {
                            submitExtrinsic,
                            submitAndWatchExtrinsic,
                        },
                    },
                    signer: {
                        sign,
                    },
                    hasSubscriptions: true,
                };
            });
            let apiMock: Api = new MockApi();
            let submittableExtrinsic: SubmittableExtrinsic = getSubmittableExtrinsicByApi(apiMock);
            const statusCb = jest.fn();
            // send
            const returned = await submittableExtrinsic.send(txOpt, statusCb);
            expect(returned).toEqual(result);
            // verify functions called
            expect(accountNonce.mock.calls.length).toEqual(1);
            expect(accountNonce.mock.calls[0][0]).toEqual(txOpt.from);
            expect(sign.mock.calls.length).toEqual(1);
            expect(sign.mock.calls[0][1]).toEqual({...txOpt, nonce: `${nonce}`});
            expect(submitExtrinsic.mock.calls.length).toEqual(0);
        });

        it('returns error without txOpt when extrinsic is not signed', async () => {
            // mock
            const MockApi = jest.fn<Api>();
            let apiMock: Api = new MockApi();
            let submittableExtrinsic: SubmittableExtrinsic = getSubmittableExtrinsicByApi(apiMock);

            await expect(submittableExtrinsic.send()).rejects.toThrow('txOpt is required for signing extrinsic');
        });

        it('returns error when fail to fetch nonce for account', async () => {
            const txOpt = {
                from: 'from',
                blockHash: 'blockHash',
            };
            // mock
            const accountNonce = jest.fn(arg => {
                throw new Error();
            });
            const MockApi = jest.fn<Api>(() => {
                return {
                    query: {
                        system: {
                            accountNonce,
                        },
                    },
                };
            });
            let apiMock: Api = new MockApi();
            let submittableExtrinsic: SubmittableExtrinsic = getSubmittableExtrinsicByApi(apiMock);

            await expect(submittableExtrinsic.send(txOpt)).rejects.toThrow('Failed to fetch nonce for account: from');
        });
    });

    describe('trackStatus()', () => {
        it("returns related events when the submittableSendResult's type is Finalised", async () => {
            // mock
            const getBlock = jest.fn(arg => {
                return signedBlock;
            });
            const at = jest.fn(arg => {
                return allEvents;
            });
            const MockApi = jest.fn<Api>(() => {
                return {
                    rpc: {
                        chain: {
                            getBlock,
                        },
                    },
                    query: {
                        system: {
                            events: {
                                at,
                            },
                        },
                    },
                };
            });
            let apiMock: Api = new MockApi();
            let submittableExtrinsic: SubmittableExtrinsic = getSubmittableExtrinsicByApi(apiMock);
            const blockhash = new Hash('blockhash');
            const status: ExtrinsicStatus = new ExtrinsicStatus({
                finalised: blockhash,
            });
            const signedBlock: SignedBlock = new SignedBlock({
                block: {
                    extrinsics: [hexToU8a(submittableExtrinsic.toJSON())],
                },
            });
            const MockEvent = jest.fn<EventRecord>(value => {
                return {
                    phase: {
                        type: 'ApplyExtrinsic',
                        value,
                    },
                };
            });
            const event0 = new MockEvent(new u32(0));
            const event1 = new MockEvent(new u32(1));
            const allEvents: Array<EventRecord> = [event0 as any, event1 as any];
            const statusCb = jest.fn((result: SubmittableSendResult) => {});
            // mock
            // call trackStatus
            const returnedFunction = (submittableExtrinsic as any).trackStatus(statusCb);
            await returnedFunction(status);
            // verify functions called
            expect(getBlock.mock.calls.length).toEqual(1);
            expect(getBlock.mock.calls[0][0].toString()).toEqual(blockhash.toString());
            expect(at.mock.calls.length).toEqual(1);
            expect(at.mock.calls[0][0].toString()).toEqual(blockhash.toString());
            expect(statusCb.mock.calls.length).toEqual(1);
            expect(statusCb.mock.calls[0][0].events).toEqual([{phase: {type: 'ApplyExtrinsic', value: new u32(0)}}]);
            expect(statusCb.mock.calls[0][0].status).toEqual(status);
            expect(statusCb.mock.calls[0][0].type).toEqual('Finalised');
        });
    });
});

function getSubmittableExtrinsicByApi(api: Api): SubmittableExtrinsic {
    // create a new extrinisic instance
    const tx = new Extrinsic('0x010200ea51b75b00000000');
    let submittableExtrinsic: SubmittableExtrinsic = new SubmittableExtrinsic(api, tx);

    return submittableExtrinsic;
}
