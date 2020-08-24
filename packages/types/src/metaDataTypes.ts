const AllHashers = {
  /* eslint-disable camelcase */
  Blake2_128: null,
  /* eslint-disable camelcase */
  Blake2_256: null,
  /* eslint-disable camelcase */
  Blake2_128Concat: null,
  Twox128: null,
  Twox256: null,
  Twox64Concat: null,
  // new in v11
  Identity: null,
};
const metadata = {
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

export default metadata;
