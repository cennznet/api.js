import { getProvider } from '@cennznet/api/util/getProvider';
import { TypeRegistry } from '@polkadot/types/create';
import { RpcCore } from '@polkadot/rpc-core';
import { MetadataVersioned } from '@polkadot/metadata/MetadataVersioned';
import { Metadata } from '@polkadot/metadata';
import { ProviderInterface } from '@polkadot/rpc-provider/types';
import { WsProvider } from '@polkadot/rpc-provider';

// All the CENNZnet specific runtime modules supported in version 1.4.1 + essential module from substrate (system, timestamp)
export const essential = ['system', 'timestamp', 'transactionpayment', 'genericasset', 'cennzx', 'nft'];

// Check if provider is WsProvider
function isWsProvider(providerInterface: ProviderInterface): providerInterface is WsProvider {
  return (providerInterface as WsProvider).isReady !== undefined;
}

// This function is used to create a slim version of the metadata based on the modules passed and the essential modules required
export async function getMetadata(
  provider: string | ProviderInterface,
  keepModules: string[] = essential
): Promise<Record<string, string>> {
  const useModules = keepModules.map((module) => module.trim().toLowerCase());
  const mergedModules = Array.from(new Set([...useModules, ...essential]));
  let providerInterface: ProviderInterface;
  if (typeof provider === 'string') {
    providerInterface = getProvider(provider);
  } else {
    providerInterface = provider || new WsProvider();
  }
  if (isWsProvider(providerInterface)) {
    await providerInterface.isReady;
  }
  const registry = new TypeRegistry();
  // '1' is the instance id here
  const rpcCore = new RpcCore('1', registry, providerInterface);
  const meta: Metadata = await rpcCore.state.getMetadata().toPromise();
  const magicNumber = meta.magicNumber;
  const modules = meta.asLatest.modules.toArray();

  const extrinsic = meta.asLatest.extrinsic;
  const filteredModule = modules.filter((mod) => mergedModules.find((a) => a === mod.name.toString().toLowerCase()));
  const filteredModuleMetadataLatest = registry.createType('Vec<ModuleMetadataLatest>', filteredModule);
  const metadataSlim = registry.createType('MetadataLatest', {
    extrinsic,
    modules: filteredModuleMetadataLatest,
  });
  const mVersionedSlim = new MetadataVersioned(registry, {
    magicNumber: magicNumber,
    metadata: registry.createType('MetadataAll', metadataSlim, meta.version),
  });

  const genesisHash = await rpcCore.chain.getBlockHash(0).toPromise();
  const runtimeVersion = await rpcCore.state.getRuntimeVersion().toPromise();
  const metadataKey = `${genesisHash.toHex() || '0x'}-${runtimeVersion.specVersion.toString()}`;
  const useMetadata: Record<string, string> = { [metadataKey]: mVersionedSlim.toHex() };
  return useMetadata;
}
