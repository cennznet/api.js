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
