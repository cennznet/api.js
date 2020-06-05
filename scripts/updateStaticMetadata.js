// Running this file with ~ node scripts/updateStaticMetadata.js will create a staticMetadata.ts on root directory which can used/copied
const Api = require('@cennznet/api').Api;
const fs = require('fs');
const staticMetadata = require('@cennznet/api/staticMetadata');
const Metadata  = require('@polkadot/types').Metadata;
async function updateMeta() {
    const provider = 'wss://cennznet.unfrastructure.io/public/ws'; // Use Azalea
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