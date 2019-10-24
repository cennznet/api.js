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

import {EventRecord, SignedBlock} from '@plugnet/types/interfaces';

import {U8a} from '@plugnet/types';

import l from '../../util/logging';

export default function filterEvents(
    extHash: U8a,
    {block: {extrinsics, header}}: SignedBlock,
    allEvents: EventRecord[]
): EventRecord[] | undefined {
    // extrinsics to hashes
    const myHash = extHash.toHex();
    const allHashes = extrinsics.map((ext): string => ext.hash.toHex());

    // find the index of our extrinsic in the block
    const index = allHashes.indexOf(myHash);

    // if we do get the block after finalized, it _should_ be there
    if (index === -1) {
        l.warn(`block ${header.hash}: Unable to find extrinsic ${myHash} inside ${allHashes}`);
        return;
    }

    return allEvents.filter(
        ({phase, event}): boolean =>
            // only ApplyExtrinsic has the extrinsic index
            (phase.isApplyExtrinsic && phase.asApplyExtrinsic.eqn(index)) ||
            (event.method === 'Charged' && event.section === 'fees' && event.data[0].eq(index))
    );
}
