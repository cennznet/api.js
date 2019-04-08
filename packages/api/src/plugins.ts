import {IPlugin} from '@cennznet/api/types';
import {PluginDiscovery} from 'plugin-discovery';

export default function getPlugins(): {[name: string]: IPlugin} {
    const config = {discoverGlobal: false, prefix: '@cennznet/crml-', importNamed: 'Plugin'};
    const plugins = PluginDiscovery.discoverSync(config);
    return plugins;
}
