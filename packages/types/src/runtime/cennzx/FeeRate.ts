import {ClassOf} from '@plugnet/types';

export default class FeeRate extends ClassOf('u128') {
    static readonly SCALE_FACTOR = 1000000;
}
