// Running this file with ~ node scripts/updateStaticMetadata.js will create a staticMetadata.ts on root directory which can used/copied
import {Api} from '../packages/api/src/Api';
import MetadataVersioned from '@polkadot/metadata/Metadata/MetadataVersioned';
import {toCallsOnly} from '@polkadot/metadata/Metadata/util';

import {createType} from '@cennznet/types';

async function generateSlimMeta() {
    // const provider = 'wss://cennznet.unfrastructure.io/public/ws'; // Use Azalea
    const provider = 'ws://127.0.0.1:9944';
    const api = await Api.create({provider});
    const metadata = api.runtimeMetadata.toJSON();
    const keep = [
        "System",
        "Timestamp",
        "TransactionPayment",
        "GenericAsset",
        "SyloGroups",
        "SyloE2EE",
        "SyloDevice",
        "SyloInbox",
        "SyloResponse",
        "SyloVault",
        "CennzxSpot",
    ];
    let magicNumber = metadata.magicNumber;
    let modules = api.runtimeMetadata.asV11.modules;
    let newModules = [];
    for (const m of modules) {
        if (keep.indexOf(m.name.toJSON()) >= 0) {
            const module = m.toJSON();
            removeKeys(module, "documentation");
            // Creating ModuleMetadataV11
            let modifiedModule = createType(api.registry, 'ModuleMetadataV11', module);
            newModules.push(modifiedModule);
        } else {
            // Push an empty module
            newModules.push({"name": m.name, "calls": m.calls, "events": m.events});
        }
    }
    let extrinsic = metadata.metadata['V11'].extrinsic;
    let filteredModule = createType(api.registry, 'Vec<ModuleMetadataV11>', newModules);
    let filteredMetaLatest = createType(api.registry, 'MetadataLatest', {modules: filteredModule, extrinsic});
    const filteredMetadataAll = createType(api.registry,'MetadataAll', filteredMetaLatest, 11);
    const mVersionedNew = new MetadataVersioned(api.registry, {
        magicNumber: magicNumber,
        metadata: filteredMetadataAll
    });
    console.log('metadata hex:', mVersionedNew.toHex());

    process.exit();
}

function removeKeys(obj, keys){
    var index;
    for (var prop in obj) {
        // important check that this is objects own property
        // not from prototype prop inherited
        if(obj.hasOwnProperty(prop)){
            switch(typeof(obj[prop])){
                case 'string':
                    index = keys.indexOf(prop);
                    if(index > -1){
                        delete obj[prop];
                    }
                    break;
                case 'object':
                    index = keys.indexOf(prop);
                    if(index > -1){
                        delete obj[prop];
                    }else{
                        removeKeys(obj[prop], keys);
                    }
                    break;
            }
        }
    }
}


generateSlimMeta();
