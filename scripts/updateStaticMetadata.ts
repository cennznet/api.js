// Running this file with ~ node scripts/updateStaticMetadata.js will create a staticMetadata.ts on root directory which can used/copied
import * as fs from "fs";
import { Api } from '../packages/api/src/Api';
import staticMetadata from "../packages/api/src/staticMetadata";
import Metadata from "@polkadot/metadata/Metadata";
async function updateMeta() {
    const provider = 'ws://localhost:9944'; // Use Azalea
    const api = await Api.create({provider});
    const meta = staticMetadata[`${api.genesisHash.toHex()}-${api.runtimeVersion.specVersion.toNumber()}`];
    const staticMeta = new Metadata(api.registry, meta).toJSON();
    if (api.runtimeMetadata.toJSON() !== staticMeta) {
        const newMeta = {};
        newMeta[`${api.genesisHash.toHex()}-${api.runtimeVersion.specVersion.toNumber()}`] = api.runtimeMetadata.toHex();
        const data = `export default ${JSON.stringify(newMeta, null, '\n')};`;
        fs.writeFileSync('staticMetadata.ts', data, 'utf-8');
        process.exit()
    }
}
updateMeta();
