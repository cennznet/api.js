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
import {StorageHasherV11} from '@cennznet/types/extrinsic/types';
import Doughnut from './Doughnut';
import * as extrinsicTypes from './extrinsic';
import * as runtimeTypes from './runtime';

const AllHashers = {
  Blake2_128: null, // eslint-disable-line @typescript-eslint/camelcase
  Blake2_256: null, // eslint-disable-line @typescript-eslint/camelcase
  Blake2_128Concat: null, // eslint-disable-line @typescript-eslint/camelcase
  Twox128: null,
  Twox256: null,
  Twox64Concat: null,
  // new in v11
  Identity: null,
};

export default {
  ...runtimeTypes,
  ...extrinsicTypes,
  AssetOf: 'u128',
  Address: 'AccountId',
  'ed25519::Signature': 'H512',
  RewardBalance: 'Balance',
  Doughnut: Doughnut,
  StorageHasherV11: {
    _enum: AllHashers,
  },
  DoubleMapTypeV11: {
    hasher: 'StorageHasherV11',
    key1: 'Type',
    key2: 'Type',
    value: 'Type',
    key2Hasher: 'StorageHasherV11',
  },
  ExtrinsicMetadataV11: {
    version: 'u8',
    signedExtensions: 'Vec<Text>',
  },
  // FunctionArgumentMetadataV11: 'FunctionArgumentMetadataV10';
  // FunctionMetadataV11: 'FunctionMetadataV10';
  MapTypeV11: {
    hasher: 'StorageHasherV11',
    key: 'Type',
    value: 'Type',
    linked: 'bool',
  },
  MetadataV11: {
    modules: 'Vec<ModuleMetadataV11>',
    extrinsic: 'ExtrinsicMetadataV11',
  },
  ModuleMetadataV11: {
    name: 'Text',
    storage: 'Option<StorageMetadataV11>',
    calls: 'Option<Vec<FunctionMetadataV11>>',
    events: 'Option<Vec<EventMetadataV11>>',
    constants: 'Vec<ModuleConstantMetadataV11>',
    errors: 'Vec<ErrorMetadataV11>',
  },
  StorageEntryMetadataV11: {
    name: 'Text',
    modifier: 'StorageEntryModifierV11',
    type: 'StorageEntryTypeV11',
    fallback: 'Bytes',
    documentation: 'Vec<Text>',
  },
  StorageEntryTypeV11: {
    _enum: {
      Plain: 'PlainTypeV11',
      Map: 'MapTypeV11',
      DoubleMap: 'DoubleMapTypeV11',
    },
  },
  StorageMetadataV11: {
    prefix: 'Text',
    items: 'Vec<StorageEntryMetadataV11>',
  },
  StorageHasher: 'StorageHasherV11',
};
