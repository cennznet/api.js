import 'reflect-metadata';

type Newable = {new (...args: any[]): any};
export function isTypePromise(type: Newable): boolean {
    try {
        const test = new type(() => ({}));
        return test.then && typeof test.then === 'function';
    } catch (e) {
        return false;
    }
}

export const requireUnlocked = (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<Function>
) => {
    const origin = descriptor.value;
    const retType = Reflect.getMetadata('design:returntype', target, propertyKey);
    const isReturnPromise = isTypePromise(retType);
    descriptor.value = <any>function(...args) {
        if (this.isLocked()) {
            if (isReturnPromise) {
                return Promise.reject(new Error('wallet is locked'));
            } else {
                throw new Error('wallet is locked');
            }
        }
        return origin.apply(this, args);
    };
};

export const persistBeforeReturn = (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<Function>
) => {
    const origin = descriptor.value;
    const retType = Reflect.getMetadata('design:returntype', target, propertyKey);
    if (!isTypePromise(retType)) {
        throw new Error('decorated method must return Promise');
    }
    descriptor.value = <any>function(...args) {
        return origin.apply(this, args).then(res => this.persistAll().then(() => res));
    };
};
