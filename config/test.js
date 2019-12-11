import R from 'ramda';

import defaultConfig from './default';

const config = {
  wsProvider: {}
};

export default R.mergeDeepRight(defaultConfig, config);
