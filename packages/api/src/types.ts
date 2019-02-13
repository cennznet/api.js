import {EventRecord, ExtrinsicStatus} from '@polkadot/types';
// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type SubmittableSendResult = {
    events?: Array<EventRecord>;
    status: ExtrinsicStatus;
    type: string;
};
