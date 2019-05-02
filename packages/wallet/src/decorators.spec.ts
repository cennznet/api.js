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

import {persistBeforeReturn, requireUnlocked, synchronized} from './decorators';

describe('decorators', () => {
    // it('test if a Type is a Promise like type', () => {
    //     expect(isTypePromise(Promise)).toBeTruthy();
    //     expect(isTypePromise(class ABC {})).toBeFalsy();
    // });

    describe('@persistBeforeReturn', () => {
        // it('throw error if return is not a Promise', () => {
        //     expect(() => {
        //         class Test {
        //             @persistBeforeReturn
        //             testFunc() {
        //                 return 'abc';
        //             }
        //         }
        //     }).toThrow('method decorated by @persistBeforeReturn must return Promise');
        // });
        it('call syncAccountKeyringMap and persistAll if success', async () => {
            let called = 0;
            class Mock {
                persistAll(): Promise<void> {
                    called += 1;
                    return Promise.resolve();
                }
                syncAccountKeyringMap(): Promise<void> {
                    called += 1;
                    return Promise.resolve();
                }
                @persistBeforeReturn
                testFunc(): Promise<void> {
                    return Promise.resolve();
                }
            }
            const mock = new Mock();
            await mock.testFunc();
            expect(called).toBe(2);
        });
        it('not call persistAll if decorated function failed', async () => {
            let called = 0;
            class Mock {
                persistAll(): Promise<void> {
                    called += 1;
                    return Promise.resolve();
                }
                syncAccountKeyringMap(): Promise<void> {
                    called += 1;
                    return Promise.resolve();
                }
                @persistBeforeReturn
                testFunc(): Promise<void> {
                    return Promise.reject();
                }
            }
            const mock = new Mock();
            await mock.testFunc().catch(() => null);
            expect(called).toBe(0);
        });
    });

    describe('@requireUnlocked', () => {
        // it('throw error if isLocked() is true', () => {
        //     class Mock {
        //         isLocked() {
        //             return true;
        //         }
        //         @requireUnlocked
        //         async testFunc() {}
        //     }
        //     const mock = new Mock();
        //     expect(() => mock.testFunc()).toThrow('wallet is locked');
        // });
        it('reject Promise if isLocked() is true', async () => {
            class Mock {
                isLocked() {
                    return true;
                }
                @requireUnlocked
                async testFunc(): Promise<void> {
                    return Promise.resolve();
                }
            }
            const mock = new Mock();
            await expect(mock.testFunc()).rejects.toThrow('wallet is locked');
        });
        // it('run method and return normally if isLocked() is false', () => {
        //     class Mock {
        //         isLocked() {
        //             return false;
        //         }
        //         @requireUnlocked
        //         testFunc(): string {
        //             return 'ok';
        //         }
        //     }
        //     const mock = new Mock();
        //     expect(mock.testFunc()).toBe('ok');
        // });
        it('run method and resolve promise if isLocked() is false', async () => {
            class Mock {
                isLocked() {
                    return false;
                }
                @requireUnlocked
                async testFunc(): Promise<string> {
                    return Promise.resolve('ok');
                }
            }
            const mock = new Mock();
            await expect(mock.testFunc()).resolves.toBe('ok');
        });
        it('run method and reject promise if isLocked() is false', async () => {
            class Mock {
                isLocked() {
                    return false;
                }
                @requireUnlocked
                async testFunc(): Promise<string> {
                    return Promise.reject('expected');
                }
            }
            const mock = new Mock();
            await expect(mock.testFunc()).rejects.toMatch('expected');
        });
    });

    describe('@synchronized', () => {
        it('call methods inside class synchronously', async () => {
            class Mock {
                @synchronized
                method1(): Promise<string> {
                    return new Promise(resolve => {
                        setTimeout(() => resolve('method1'), 2000);
                    });
                }
                @synchronized
                method2(): Promise<string> {
                    return new Promise(resolve => {
                        setTimeout(() => resolve('method2'), 1000);
                    });
                }
                @synchronized
                method3(): Promise<string> {
                    return new Promise(resolve => {
                        setTimeout(() => resolve('method3'), 500);
                    });
                }
            }
            const mock = new Mock();
            const retOrder = [];
            await Promise.all([
                mock.method1().then(res => retOrder.push(res)),
                mock.method2().then(res => retOrder.push(res)),
                mock.method3().then(res => retOrder.push(res)),
            ]);
            expect(retOrder).toEqual(['method1', 'method2', 'method3']);
        });

        it('works in the instance scope', async () => {
            class Mock1 {
                @synchronized
                method(): Promise<string> {
                    return new Promise(resolve => {
                        setTimeout(() => resolve('Mock1'), 2000);
                    });
                }
            }
            class Mock2 {
                @synchronized
                method(): Promise<string> {
                    return new Promise(resolve => {
                        setTimeout(() => resolve('Mock2'), 500);
                    });
                }
            }
            const mock1 = new Mock1();
            const mock2 = new Mock2();
            const retOrder = [];
            await Promise.all([
                mock1.method().then(res => retOrder.push(res)),
                mock2.method().then(res => retOrder.push(res)),
            ]);
            expect(retOrder).toEqual(['Mock2', 'Mock1']);
        });

        it('success even if previous failed', async () => {
            class Mock {
                count = 0;
                @synchronized
                method(): Promise<string> {
                    return new Promise((resolve, reject) => {
                        if (this.count === 0) {
                            this.count += 1;
                            setTimeout(() => reject(new Error()), 1000);
                        } else {
                            setTimeout(() => resolve('mock'), 0);
                        }
                    });
                }
            }
            const mock = new Mock();
            [] = [await expect(mock.method()).rejects.toThrow(), await expect(mock.method()).resolves.toBe('mock')];
        });

        // it('throw error if return is not a Promise', () => {
        //     expect(() => {
        //         class Mock {
        //             @synchronized
        //             testFunc() {
        //                 return 'abc';
        //             }
        //         }
        //     }).toThrow('method decorated by @synchronized must return Promise');
        // });
    });
});
