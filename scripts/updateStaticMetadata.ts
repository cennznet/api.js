/*
* Update metadata files from local node at 9944
*
* Usage:
* > updateStaticMetadata <path/for/static> <path/for/json>
*/
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { Api } from '../packages/api/src/Api';
import staticMetadata from '../packages/api/src/staticMetadata';

async function updateMeta(staticOutputDir, jsonOutputDir) {
    const provider = 'ws://localhost:9944';
    const api = await Api.create({provider});
    const metaMap = staticMetadata;
    const targetVersion = api.runtimeVersion.specVersion.toNumber();
    const newMeta = (await api.rpc.state.getMetadata()).toHex();
    console.log('Known metadata keys', Object.keys(metaMap));
    // if the runtimeVersion is in our known map we don't want to add a new entry
    let replaceKey = Object.keys(metaMap).filter(v => v.includes(`-${targetVersion}`))[0];
    if (replaceKey) {
        console.log(`Replacing metadata for version: ${targetVersion}`)
        delete metaMap[replaceKey];
    } else {
        console.log(`Adding metadata for version: ${targetVersion}`)
    }
    // azalea genesis hash: 0x0d0971c150a9741b8719b3c6c9c2e96ec5b2e3fb83641af868e6650f3e263ef0
    metaMap[`${api.genesisHash.toHex()}-${targetVersion}`] = newMeta;
    const data = `export default ${JSON.stringify(metaMap, null, '\n')};`;

    const staticOutputPath = path.join(staticOutputDir, 'staticMetadata.ts');
    console.log(`Writing static metadata to: ${staticOutputPath}`);
    fs.writeFileSync(staticOutputPath, data, 'utf-8');

    const jsonOutputPath = path.join(jsonOutputDir, 'cennznet.json');
    console.log(`Writing JSON metadata to: ${jsonOutputPath}`);
    let resultTemplate = {
        "jsonrpc": "2.0",
        "result": newMeta,
        "id": "1"
    };
    fs.writeFileSync(jsonOutputPath, JSON.stringify(resultTemplate), 'utf-8');

    process.exit()
}

const staticOutputDir = process.argv.slice(2)[0];
const jsonOutputDir = process.argv.slice(2)[1];
updateMeta(staticOutputDir, jsonOutputDir);
