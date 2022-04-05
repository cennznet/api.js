// Running this file with ~ yarn generate-slim-metadata 'wss://cennznet.unfrastructure.io/public/ws' will create slim metadata
import { Api } from '../packages/api/src/Api';
import { MetadataVersioned } from "@polkadot/metadata/MetadataVersioned";

// Metadata is slimmed as follows:
// This function will remove all the documentation for each module in the chain.
// Moreover it will only keep the complete information (structure) of most essential modules/sections required to meet the
// basic functionality like connect to the chain, use generic asset features, CENNZX features and all SYLO module's functionality
// MOST ESSENTIAL Modules can be seen in the KEEP list below.
// For everything else it will trim down the module structure to just use name, calls and events.
// While generating metadata we should try to connect to an endpoint which is running the desired version of CENNZnet.
// END POINT can be passed as command line argument - yarn generate-slim-metadata 'ws://localhost:9944', by default Azalea would be used

async function generateSlimMeta() {
  const provider: any = process.argv[2] ? process.argv[2] : 'wss://cennznet.unfrastructure.io/public/ws';
  const api = await Api.create({ provider });
  const metadata = api.runtimeMetadata;
  const KEEP = [
    'System',
    'Timestamp',
    'TransactionPayment',
    'GenericAsset',
    'Cennzx',
  ];
  let magicNumber = metadata.magicNumber;
  let modules = metadata.asLatest.pallets;
  let newModules = [];
  for (const m of modules) {
    if (KEEP.indexOf(m.name.toJSON()) >= 0) {
      const module = m.toJSON();
      removeKeys(module, 'documentation');
      // Creating ModuleMetadataLatest
      let modifiedModule = api.registry.createType('PalletMetadataLatest', module);
      newModules.push(modifiedModule);
    } else {
      // Push an empty module
      newModules.push({ name: m.name, calls: m.calls, events: m.events, index: m.index });
    }
  }
  let extrinsic = metadata.asLatest.extrinsic;
  let filteredModule = api.registry.createType('Vec<PalletMetadataLatest>', newModules);
  // metadataSlim is created using the same mechanism as asCallsOnly from MetadataVersioned.js (with additional storage)
  // reducing the total length of metadata to 16236 from earlier around 100000
  const metadataSlim = api.registry.createType('MetadataLatest', {
    extrinsic,
    pallets: filteredModule,
    lookup: metadata.asLatest.lookup,
  }).toJSON();
  const mVersionedSlim = new MetadataVersioned(api.registry, {
    magicNumber: magicNumber,
    metadata: api.registry.createType('MetadataAll', metadataSlim, 12)
  });

  console.log('metadata hex:', mVersionedSlim.toHex());

  process.exit();
}

function mapCalls(registry, _calls) {
  const calls = _calls.unwrapOr(null);

  return registry.createType('Option<Vec<FunctionMetadataLatest>>', calls ?
    calls.map(({
                 args,
                 name
    }) => registry.createType('FunctionMetadataLatest', {
    args,
    documentation: '',
    name
  })) : null);
}

function removeKeys(obj, keys) {
  let index;
  for (const prop in obj) {
    // important check that this is objects own property
    // not from prototype prop inherited
    if (obj.hasOwnProperty(prop)) {
      switch (typeof obj[prop]) {
        case 'string':
          index = keys.indexOf(prop);
          if (index > -1) {
            delete obj[prop];
          }
          break;
        case 'object':
          index = keys.indexOf(prop);
          if (index > -1) {
            delete obj[prop];
          } else {
            removeKeys(obj[prop], keys);
          }
          break;
      }
    }
  }
}

generateSlimMeta();
