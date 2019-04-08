import {IPlugin} from './types';
import logger from './util/logging';

const DEFAULT_CRMLS = ['generic-asset', 'spotx', 'attestation'];

export default function getPlugins(): {[name: string]: IPlugin} {
    const ret = {};
    for (const lib of DEFAULT_CRMLS) {
        try {
            const {Plugin} = require(`@cennznet/crml-${lib}/index`);
            ret[lib] = Plugin;
        } catch (e) {
            logger.log('skip loading ', lib);
        }
    }
    return ret;
}
