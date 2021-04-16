# CENNZnet API ![ci status badge](https://github.com/cennznet/api.js/workflows/PR%20builder/badge.svg)
The CENNZnet JavaScript API library for browsers and Node.js.

## Quick Start

See the [getting started guide](docs/GET_STARTED.md), [example snippets](docs/examples), or the [wiki](https://github.com/cennznet/cennznet/wiki/Javascript-API-Reference) to get started.

## Components

| Name                                | Description                                                |
| ----------------------------------- | ---------------------------------------------------------- |
| [@cennznet/api](packages/api)       | The core API package                                       |
| [@cennznet/types](packages/types)   | CENNZnet specific type definitions                         |
| [@cennznet/util](packages/util)     | CENNZnet specific utility functions                        |

## Making a Release

1) Create a branch `prerelease/<semver>`
e.g. `prerelease/1.5.0` for an ordinary release or `prerelease/1.5.0-alpha.0` for a release candidate.  
Bump package versions, ensure static metadata updated and docs regenerated
2) Open a PR, passing CI and review
3) label it 'automerge' and the release will be published to npm
