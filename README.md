# CENNZNet API

The CENNZnet JavaScript API library for browsers and Node.js.

## Quick Start

You must use **yarn** with @cennznet/api and set the following **resolutions** in your package.json, otherwise your install may break due to breaking changes in downstream package versions.
``` 
"resolutions": {
  "@polkadot/types": "1.2.1",
  "@polkadot/metadata": "1.2.1",
  "@polkadot/api": "1.2.1",
  "@polkadot/api-derive": "1.2.1",
  "@polkadot/rpc-core": "1.2.1",
  "@polkadot/rpc-provider": "1.2.1",
  "@polkadot/jsonrpc": "1.2.1",
}
``` 
See the [getting started guide](docs/GET_STARTED.md), [example snippets](docs/examples), or the [wiki](https://github.com/cennznet/cennznet/wiki/Javascript-API-Reference) to get started.

# Components

| Name                                | Description                                                |
| ----------------------------------- | ---------------------------------------------------------- |
| [@cennznet/api](packages/api)       | The core API package                                       |
| [@cennznet/types](packages/types)   | CENNZnet specific type definitions                         |
| [@cennznet/util](packages/util)     | CENNZnet specific utility functions                        |

