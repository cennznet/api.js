## JSON-RPC

_The following sections contain RPC methods that are Remote Calls available by default and allow you to interact with the actual node, query, and submit. The RPCs are provided by Substrate itself._
- **[author](#author)**

- **[chain](#chain)**

- **[state](#state)**

- **[system](#system)**

 
___
 <a name=author></a>
 

### author

_Authoring of network items_

▸ **pendingExtrinsics**(): `PendingExtrinsics`
- Returns all pending extrinsics, potentially grouped by sender

▸ **submitAndWatchExtrinsic**(extrinsic: `Extrinsic`): `ExtrinsicStatus`
- Subscribe and watch an extrinsic until unsubscribed

▸ **submitExtrinsic**(extrinsic: `Extrinsic`): `Hash`
- Submit a fully formatted extrinsic for block inclusion
 
___
 <a name=chain></a>
 

### chain

_Retrieval of chain data_

▸ **getBlock**(hash?: `Hash`): `SignedBlock`
- Get header and body of a relay chain block

▸ **getBlockHash**(blockNumber?: `BlockNumber`): `Hash`
- Get the block hash for a specific block

▸ **getFinalizedHead**(): `Hash`
- Get hash of the last finalised block in the canon chain

▸ **getHeader**(hash?: `Hash`): `Header`
- Retrieves the header for a specific block

▸ **getRuntimeVersion**(hash?: `Hash`): `RuntimeVersion`
- Get the runtime version (alias of state_getRuntimeVersion)

▸ **subscribeFinalizedHeads**(): `Header`
- Retrieves the best finalized header via subscription

▸ **subscribeNewHead**(): `Header`
- Retrieves the best header via subscription

▸ **subscribeRuntimeVersion**(): `RuntimeVersion`
- Retrieves the runtime version via subscription
 
___
 <a name=state></a>
 

### state

_Query of state_

▸ **call**(method: `Text`, data: `Bytes`, block?: `Hash`): `Bytes`
- Perform a call to a builtin on the chain

▸ **getMetadata**(block?: `Hash`): `Metadata`
- Returns the runtime metadata

▸ **getRuntimeVersion**(hash?: `Hash`): `RuntimeVersion`
- Get the runtime version

▸ **getStorage**(key: `StorageKey`, block?: `Hash`): `StorageData`
- Retrieves the storage for a key

▸ **getStorageHash**(key: `StorageKey`, block?: `Hash`): `Hash`
- Retrieves the storage hash

▸ **getStorageSize**(key: `StorageKey`, block?: `Hash`): `u64`
- Retrieves the storage size

▸ **queryStorage**(keys: `Vec<StorageKey>`, startBlock: `Hash`, block?: `Hash`): `Vec<StorageChangeSet>`
- Query historical storage entries (by key) starting from a start block

▸ **subscribeStorage**(keys: `Vec<StorageKey>`): `StorageChangeSet`
- Subscribes to storage changes for the provided keys
 
___
 <a name=system></a>
 

### system

_Methods to retrieve system info_

▸ **chain**(): `Text`
- Retrieves the chain

▸ **health**(): `Health`
- Return health status of the node

▸ **name**(): `Text`
- Retrieves the node name

▸ **networkState**(): `NetworkState`
- Returns current state of the network

▸ **peers**(): `Vec<PeerInfo>`
- Returns the currently connected peers

▸ **properties**(): `ChainProperties`
- Get a custom set of properties as a JSON object, defined in the chain spec

▸ **version**(): `Text`
- Retrieves the version of the node
