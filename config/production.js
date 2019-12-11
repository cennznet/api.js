import R from 'ramda';

import defaultConfig from './default';

const config = {};

export default R.mergeDeepRight(defaultConfig, config);
