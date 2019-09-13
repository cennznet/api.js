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

import {Api} from '@cennznet/api';
import {SubmittableExtrinsic} from '@cennznet/api/types';
import {assert} from '@cennznet/util';
import {QueryableGetClaim, QueryableGetClaimList, QueryableGetClaims} from './types';

export class Attestation {
    private readonly _api: Api;

    constructor(api: Api) {
        assert(
            (api as any)._options.derives.attestation || ((api as any)._derive || {}).attestation,
            "init attestation's derives first"
        );
        this._api = api;
    }

    get api(): Api {
        return this._api;
    }

    setClaim(holder: string, topic: string, value: string | Uint8Array): SubmittableExtrinsic<'promise'> {
        return this.api.tx.attestation.setClaim(holder, topic, value);
    }

    setSelfClaim(topic: string, value: string | Uint8Array): SubmittableExtrinsic<'promise'> {
        return this.api.tx.attestation.setSelfClaim(topic, value);
    }

    removeClaim(holder: string, topic: string): SubmittableExtrinsic<'promise'> {
        return this.api.tx.attestation.removeClaim(holder, topic);
    }

    get getClaim(): QueryableGetClaim {
        return this.api.derive.attestation.getClaim;
    }

    /**
     * @deprecated use getClaimList() instead
     */
    get getClaims(): QueryableGetClaims {
        return this.api.derive.attestation.getClaims;
    }

    get getClaimList(): QueryableGetClaimList {
        return this.api.derive.attestation.claims;
    }
}
