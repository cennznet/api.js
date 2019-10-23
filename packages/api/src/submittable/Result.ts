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

// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {EventRecord, ExtrinsicStatus} from '@plugnet/types/interfaces';
import {SubmittableResultImpl, SubmittableResultValue} from './types';

export default class SubmittableResult implements SubmittableResultImpl {
    readonly events: EventRecord[];

    readonly status: ExtrinsicStatus;

    constructor({events, status}: SubmittableResultValue) {
        this.events = events || [];
        this.status = status;
    }

    get isCompleted(): boolean {
        return this.isError || this.isFinalized;
    }

    get isError(): boolean {
        return this.status.isDropped || this.status.isInvalid || this.status.isUsurped;
    }

    get isFinalized(): boolean {
        return this.status.isFinalized;
    }

    /**
     * @description Finds an EventRecord for the specified method & section
     */
    findRecord(section: string, method: string): EventRecord | undefined {
        return this.events.find(({event}): boolean => event.section === section && event.method === method);
    }
}
