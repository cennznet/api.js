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
import Doughnut from './Doughnut';
import * as extrinsicTypes from './extrinsic';
import metadata from './metaDataTypes';
import * as runtimeTypes from './runtime';

export default {
  ...runtimeTypes,
  ...extrinsicTypes,
  ...metadata,
  Address: 'AccountId',
  'ed25519::Signature': 'H512',
  RewardBalance: 'Balance',
  Doughnut,
};
