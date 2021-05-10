# CENNZnet API ![ci status badge](https://github.com/cennznet/api.js/workflows/PR%20builder/badge.svg)
The CENNZnet JavaScript API library for browsers and Node.js.

## Quick Start

See the [getting started guide](docs/GET_STARTED.md), [example snippets](docs/examples), or the [wiki](https://wiki.cennz.net) to get started.

## Components

| Name                                | Description                                                |
| ----------------------------------- | ---------------------------------------------------------- |
| [@cennznet/api](packages/api)       | The core API package                                       |
| [@cennznet/types](packages/types)   | CENNZnet specific type definitions                         |

---

# Development

## Testing

Running integration tests
```bash
# Start test nodes
docker-compose up
yarn test:e2e
```

## Update Metadata
Fetch latest metadata from local node and regenerate dynamic type definitions + docs
```
yarn meta:update
```

## Making a Release (requires maintainer permission)
PR target develop branch for 2.0 or master for 1.0 release
1) Create a branch `prerelease/<semver>`
e.g. `prerelease/1.5.0` for an ordinary release or `prerelease/1.5.0-alpha.0` for a release candidate.  
Bump package versions, ensure static metadata updated and docs regenerated
2) Open a PR for develop, passing CI and review
3) label it 'automerge' and the release will be published to npm
