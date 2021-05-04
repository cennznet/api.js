# @cennznet/types

CENNZnet runtime type definitions

## Update metadata + types
1) Add new modules to interfaces/update existing definitions to include additional type stubs and RPC methods.
2) Start a node with the target runtime
3) Run the following
```bash
# Get metadata from local CENNZnet node running target version
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933 > cennznet.json

yarn build
```