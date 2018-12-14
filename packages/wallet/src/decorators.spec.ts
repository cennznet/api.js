import {isTypePromise, persistBeforeReturn, requireUnlocked} from './decorators';

describe('decorators', () => {
    it('test if a Type is a Promise like type', () => {
        expect(isTypePromise(Promise)).toBeTruthy();
        expect(isTypePromise(class ABC {})).toBeFalsy();
    });

    describe('@persistBeforeReturn', () => {
        it('throw error if return is not a Promise', () => {
            expect(() => {
                class Test {
                    @persistBeforeReturn
                    testFunc() {
                        return 'abc';
                    }
                }
            }).toThrow('decorated method must return Promise');
        });
        it('call persistAll if success', async () => {
            let called = false;
            class Mock {
                persistAll(): Promise<void> {
                    called = true;
                    return Promise.resolve();
                }
                @persistBeforeReturn
                testFunc(): Promise<void> {
                    return Promise.resolve();
                }
            }
            const mock = new Mock();
            await mock.testFunc();
            expect(called).toBeTruthy();
        });
        it('not call persistAll if decorated function failed', async () => {
            let called = false;
            class Mock {
                persistAll(): Promise<void> {
                    called = true;
                    return Promise.resolve();
                }
                @persistBeforeReturn
                testFunc(): Promise<void> {
                    return Promise.reject();
                }
            }
            const mock = new Mock();
            await mock.testFunc().catch(() => null);
            expect(called).toBeFalsy();
        });
    });

    describe('@requireUnlocked', () => {
        it('throw error if isLocked() is true', () => {
            class Mock {
                isLocked() {
                    return true;
                }
                @requireUnlocked
                testFunc() {}
            }
            const mock = new Mock();
            expect(() => mock.testFunc()).toThrow('wallet is locked');
        });
        it('reject Promise if isLocked() is true', async () => {
            class Mock {
                isLocked() {
                    return true;
                }
                @requireUnlocked
                testFunc(): Promise<void> {
                    return Promise.resolve();
                }
            }
            const mock = new Mock();
            await expect(mock.testFunc()).rejects.toThrow('wallet is locked');
        });
        it('run method and return normally if isLocked() is false', () => {
            class Mock {
                isLocked() {
                    return false;
                }
                @requireUnlocked
                testFunc(): string {
                    return 'ok';
                }
            }
            const mock = new Mock();
            expect(mock.testFunc()).toBe('ok');
        });
        it('run method and resolve promise if isLocked() is false', async () => {
            class Mock {
                isLocked() {
                    return false;
                }
                @requireUnlocked
                testFunc(): Promise<string> {
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
                testFunc(): Promise<string> {
                    return Promise.reject('expected');
                }
            }
            const mock = new Mock();
            await expect(mock.testFunc()).rejects.toMatch('expected');
        });
    });
});
