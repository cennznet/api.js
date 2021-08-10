---
title: JSON-RPC
---

The following sections contain RPC methods that are Remote Calls available by default and allow you to interact with the actual node, query, and submit.

- **[author](#author)**

- **[babe](#babe)**

- **[beefy](#beefy)**

- **[cennzx](#cennzx)**

- **[chain](#chain)**

- **[childstate](#childstate)**

- **[contracts](#contracts)**

- **[engine](#engine)**

- **[eth](#eth)**

- **[genericAsset](#genericasset)**

- **[governance](#governance)**

- **[grandpa](#grandpa)**

- **[mmr](#mmr)**

- **[nft](#nft)**

- **[offchain](#offchain)**

- **[payment](#payment)**

- **[rpc](#rpc)**

- **[staking](#staking)**

- **[state](#state)**

- **[syncstate](#syncstate)**


___


## author
 
### hasKey(publicKey: `Bytes`, keyType: `Text`): `bool`
- **interface**: `api.rpc.author.hasKey`
- **jsonrpc**: `author_hasKey`
- **summary**: Returns true if the keystore has private keys for the given public key and key type.
 
### hasSessionKeys(sessionKeys: `Bytes`): `bool`
- **interface**: `api.rpc.author.hasSessionKeys`
- **jsonrpc**: `author_hasSessionKeys`
- **summary**: Returns true if the keystore has private keys for the given session public keys.
 
### insertKey(keyType: `Text`, suri: `Text`, publicKey: `Bytes`): `Bytes`
- **interface**: `api.rpc.author.insertKey`
- **jsonrpc**: `author_insertKey`
- **summary**: Insert a key into the keystore.
 
### pendingExtrinsics(): `Vec<Extrinsic>`
- **interface**: `api.rpc.author.pendingExtrinsics`
- **jsonrpc**: `author_pendingExtrinsics`
- **summary**: Returns all pending extrinsics, potentially grouped by sender
 
### removeExtrinsic(bytesOrHash: `Vec<ExtrinsicOrHash>`): `Vec<Hash>`
- **interface**: `api.rpc.author.removeExtrinsic`
- **jsonrpc**: `author_removeExtrinsic`
- **summary**: Remove given extrinsic from the pool and temporarily ban it to prevent reimporting
 
### rotateKeys(): `Bytes`
- **interface**: `api.rpc.author.rotateKeys`
- **jsonrpc**: `author_rotateKeys`
- **summary**: Generate new session keys and returns the corresponding public keys
 
### submitAndWatchExtrinsic(extrinsic: `Extrinsic`): `ExtrinsicStatus`
- **interface**: `api.rpc.author.submitAndWatchExtrinsic`
- **jsonrpc**: `author_submitAndWatchExtrinsic`
- **summary**: Submit and subscribe to watch an extrinsic until unsubscribed
 
### submitExtrinsic(extrinsic: `Extrinsic`): `Hash`
- **interface**: `api.rpc.author.submitExtrinsic`
- **jsonrpc**: `author_submitExtrinsic`
- **summary**: Submit a fully formatted extrinsic for block inclusion

___


## babe
 
### epochAuthorship(): `HashMap<AuthorityId, EpochAuthorship>`
- **interface**: `api.rpc.babe.epochAuthorship`
- **jsonrpc**: `babe_epochAuthorship`
- **summary**: Returns data about which slots (primary or secondary) can be claimed in the current epoch with the keys in the keystore

___


## beefy
 
### subscribeJustifications(): `BeefySignedCommitment`
- **interface**: `api.rpc.beefy.subscribeJustifications`
- **jsonrpc**: `beefy_subscribeJustifications`
- **summary**: Returns the block most recently finalized by BEEFY, alongside side its justification.

___


## cennzx
 
### buyPrice(AssetToBuy: `AssetId`, Amount: `Balance`, AssetToPay: `AssetId`): `PriceResponse`
- **interface**: `api.rpc.cennzx.buyPrice`
- **jsonrpc**: `cennzx_buyPrice`
- **summary**: Retrieves the spot exchange buy price
 
### liquidityPrice(AssetId: `AssetId`, liquidityToBuy: `Balance`): `LiquidityPriceResponse`
- **interface**: `api.rpc.cennzx.liquidityPrice`
- **jsonrpc**: `cennzx_liquidityPrice`
- **summary**: Get the price of liquidity for the given asset ID
 
### liquidityValue(AccountId: `Address`, AssetId: `AssetId`): `LiquidityValueResponse`
- **interface**: `api.rpc.cennzx.liquidityValue`
- **jsonrpc**: `cennzx_liquidityValue`
- **summary**: Get the value of an account's liquidity for the given asset
 
### sellPrice(AssetToSell: `AssetId`, Amount: `Balance`, AssetToPayout: `AssetId`): `PriceResponse`
- **interface**: `api.rpc.cennzx.sellPrice`
- **jsonrpc**: `cennzx_sellPrice`
- **summary**: Retrieves the spot exchange sell price

___


## chain
 
### getBlock(hash?: `BlockHash`): `SignedBlock`
- **interface**: `api.rpc.chain.getBlock`
- **jsonrpc**: `chain_getBlock`
- **summary**: Get header and body of a relay chain block
 
### getBlockHash(blockNumber?: `BlockNumber`): `BlockHash`
- **interface**: `api.rpc.chain.getBlockHash`
- **jsonrpc**: `chain_getBlockHash`
- **summary**: Get the block hash for a specific block
 
### getFinalizedHead(): `BlockHash`
- **interface**: `api.rpc.chain.getFinalizedHead`
- **jsonrpc**: `chain_getFinalizedHead`
- **summary**: Get hash of the last finalized block in the canon chain
 
### getHeader(hash?: `BlockHash`): `Header`
- **interface**: `api.rpc.chain.getHeader`
- **jsonrpc**: `chain_getHeader`
- **summary**: Retrieves the header for a specific block
 
### subscribeAllHeads(): `Header`
- **interface**: `api.rpc.chain.subscribeAllHeads`
- **jsonrpc**: `chain_subscribeAllHeads`
- **summary**: Retrieves the newest header via subscription
 
### subscribeFinalizedHeads(): `Header`
- **interface**: `api.rpc.chain.subscribeFinalizedHeads`
- **jsonrpc**: `chain_subscribeFinalizedHeads`
- **summary**: Retrieves the best finalized header via subscription
 
### subscribeNewHeads(): `Header`
- **interface**: `api.rpc.chain.subscribeNewHeads`
- **jsonrpc**: `chain_subscribeNewHeads`
- **summary**: Retrieves the best header via subscription

___


## childstate
 
### getKeys(childKey: `PrefixedStorageKey`, prefix: `StorageKey`, at?: `Hash`): `Vec<StorageKey>`
- **interface**: `api.rpc.childstate.getKeys`
- **jsonrpc**: `childstate_getKeys`
- **summary**: Returns the keys with prefix from a child storage, leave empty to get all the keys
 
### getStorage(childKey: `PrefixedStorageKey`, key: `StorageKey`, at?: `Hash`): `Option<StorageData>`
- **interface**: `api.rpc.childstate.getStorage`
- **jsonrpc**: `childstate_getStorage`
- **summary**: Returns a child storage entry at a specific block state
 
### getStorageHash(childKey: `PrefixedStorageKey`, key: `StorageKey`, at?: `Hash`): `Option<Hash>`
- **interface**: `api.rpc.childstate.getStorageHash`
- **jsonrpc**: `childstate_getStorageHash`
- **summary**: Returns the hash of a child storage entry at a block state
 
### getStorageSize(childKey: `PrefixedStorageKey`, key: `StorageKey`, at?: `Hash`): `Option<u64>`
- **interface**: `api.rpc.childstate.getStorageSize`
- **jsonrpc**: `childstate_getStorageSize`
- **summary**: Returns the size of a child storage entry at a block state

___


## contracts
 
### call(callRequest: `ContractCallRequest`, at?: `BlockHash`): `ContractExecResult`
- **interface**: `api.rpc.contracts.call`
- **jsonrpc**: `contracts_call`
- **summary**: Executes a call to a contract
 
### getStorage(address: `AccountId`, key: `H256`, at?: `BlockHash`): `Option<Bytes>`
- **interface**: `api.rpc.contracts.getStorage`
- **jsonrpc**: `contracts_getStorage`
- **summary**: Returns the value under a specified storage key in a contract
 
### instantiate(request: `InstantiateRequest`, at?: `BlockHash`): `ContractInstantiateResult`
- **interface**: `api.rpc.contracts.instantiate`
- **jsonrpc**: `contracts_instantiate`
- **summary**: Instantiate a new contract
 
### rentProjection(address: `AccountId`, at?: `BlockHash`): `Option<BlockNumber>`
- **interface**: `api.rpc.contracts.rentProjection`
- **jsonrpc**: `contracts_rentProjection`
- **summary**: Returns the projected time a given contract will be able to sustain paying its rent

___


## engine
 
### createBlock(createEmpty: `bool`, finalize: `bool`, parentHash?: `BlockHash`): `CreatedBlock`
- **interface**: `api.rpc.engine.createBlock`
- **jsonrpc**: `engine_createBlock`
- **summary**: Instructs the manual-seal authorship task to create a new block
 
### finalizeBlock(hash: `BlockHash`, justification?: `Justification`): `bool`
- **interface**: `api.rpc.engine.finalizeBlock`
- **jsonrpc**: `engine_finalizeBlock`
- **summary**: Instructs the manual-seal authorship task to finalize a block

___


## eth
 
### accounts(): `Vec<H160>`
- **interface**: `api.rpc.eth.accounts`
- **jsonrpc**: `eth_accounts`
- **summary**: Returns accounts list.
 
### blockNumber(): `U256`
- **interface**: `api.rpc.eth.blockNumber`
- **jsonrpc**: `eth_blockNumber`
- **summary**: Returns balance of the given account.
 
### call(request: `EthCallRequest`, number?: `BlockNumber`): `Bytes`
- **interface**: `api.rpc.eth.call`
- **jsonrpc**: `eth_call`
- **summary**: Call contract, returning the output data.
 
### chainId(): `U64`
- **interface**: `api.rpc.eth.chainId`
- **jsonrpc**: `eth_chainId`
- **summary**: Returns the chain ID used for transaction signing at the current best block. None is returned if not available.
 
### clientVersion(): `String`
- **interface**: `api.rpc.eth.clientVersion`
- **jsonrpc**: `eth_clientVersion`
- **summary**: Returns current client version.
 
### coinbase(): `H160`
- **interface**: `api.rpc.eth.coinbase`
- **jsonrpc**: `eth_coinbase`
- **summary**: Returns block author.
 
### estimateGas(request: `EthCallRequest`, number?: `BlockNumber`): `U256`
- **interface**: `api.rpc.eth.estimateGas`
- **jsonrpc**: `eth_estimateGas`
- **summary**: Estimate gas needed for execution of given contract.
 
### gasPrice(): `U256`
- **interface**: `api.rpc.eth.gasPrice`
- **jsonrpc**: `eth_gasPrice`
- **summary**: Returns current gas price.
 
### getBalance(address: `H160`, number?: `BlockNumber`): `U256`
- **interface**: `api.rpc.eth.getBalance`
- **jsonrpc**: `eth_getBalance`
- **summary**: Returns balance of the given account.
 
### getBlockByHash(hash: `H256`, full: `bool`): `Option<EthRichBlock>`
- **interface**: `api.rpc.eth.getBlockByHash`
- **jsonrpc**: `eth_getBlockByHash`
- **summary**: Returns block with given hash.
 
### getBlockByNumber(block: `BlockNumber`, full: `bool`): `Option<EthRichBlock>`
- **interface**: `api.rpc.eth.getBlockByNumber`
- **jsonrpc**: `eth_getBlockByNumber`
- **summary**: Returns block with given number.
 
### getBlockTransactionCountByHash(hash: `H256`): `U256`
- **interface**: `api.rpc.eth.getBlockTransactionCountByHash`
- **jsonrpc**: `eth_getBlockTransactionCountByHash`
- **summary**: Returns the number of transactions in a block with given hash.
 
### getBlockTransactionCountByNumber(block: `BlockNumber`): `U256`
- **interface**: `api.rpc.eth.getBlockTransactionCountByNumber`
- **jsonrpc**: `eth_getBlockTransactionCountByNumber`
- **summary**: Returns the number of transactions in a block with given block number.
 
### getCode(address: `H160`, number?: `BlockNumber`): `Bytes`
- **interface**: `api.rpc.eth.getCode`
- **jsonrpc**: `eth_getCode`
- **summary**: Returns the code at given address at given time (block number).
 
### getFilterChanges(index: `U256`): `EthFilterChanges`
- **interface**: `api.rpc.eth.getFilterChanges`
- **jsonrpc**: `eth_getFilterChanges`
- **summary**: Returns filter changes since last poll.
 
### getFilterLogs(index: `U256`): `Vec<EthLog>`
- **interface**: `api.rpc.eth.getFilterLogs`
- **jsonrpc**: `eth_getFilterLogs`
- **summary**: Returns all logs matching given filter (in a range 'from' - 'to').
 
### getLogs(filter: `EthFilter`): `Vec<EthLog>`
- **interface**: `api.rpc.eth.getLogs`
- **jsonrpc**: `eth_getLogs`
- **summary**: Returns logs matching given filter object.
 
### getProof(address: `H160`, storageKeys: `Vec<H256>`, number: `BlockNumber`): `EthAccount`
- **interface**: `api.rpc.eth.getProof`
- **jsonrpc**: `eth_getProof`
- **summary**: Returns proof for account and storage.
 
### getStorageAt(address: `H160`, index: `U256`, number?: `BlockNumber`): `H256`
- **interface**: `api.rpc.eth.getStorageAt`
- **jsonrpc**: `eth_getStorageAt`
- **summary**: Returns content of the storage at given address.
 
### getTransactionByBlockHashAndIndex(hash: `H256`, index: `U256`): `EthTransaction`
- **interface**: `api.rpc.eth.getTransactionByBlockHashAndIndex`
- **jsonrpc**: `eth_getTransactionByBlockHashAndIndex`
- **summary**: Returns transaction at given block hash and index.
 
### getTransactionByBlockNumberAndIndex(number: `BlockNumber`, index: `U256`): `EthTransaction`
- **interface**: `api.rpc.eth.getTransactionByBlockNumberAndIndex`
- **jsonrpc**: `eth_getTransactionByBlockNumberAndIndex`
- **summary**: Returns transaction by given block number and index.
 
### getTransactionByHash(hash: `H256`): `EthTransaction`
- **interface**: `api.rpc.eth.getTransactionByHash`
- **jsonrpc**: `eth_getTransactionByHash`
- **summary**: Get transaction by its hash.
 
### getTransactionCount(hash: `H256`, number?: `BlockNumber`): `U256`
- **interface**: `api.rpc.eth.getTransactionCount`
- **jsonrpc**: `eth_getTransactionCount`
- **summary**: Returns the number of transactions sent from given address at given time (block number).
 
### getTransactionReceipt(hash: `H256`): `EthReceipt`
- **interface**: `api.rpc.eth.getTransactionReceipt`
- **jsonrpc**: `eth_getTransactionReceipt`
- **summary**: Returns transaction receipt by transaction hash.
 
### getUncleByBlockHashAndIndex(hash: `H256`, index: `U256`): `EthRichBlock`
- **interface**: `api.rpc.eth.getUncleByBlockHashAndIndex`
- **jsonrpc**: `eth_getUncleByBlockHashAndIndex`
- **summary**: Returns an uncles at given block and index.
 
### getUncleByBlockNumberAndIndex(number: `BlockNumber`, index: `U256`): `EthRichBlock`
- **interface**: `api.rpc.eth.getUncleByBlockNumberAndIndex`
- **jsonrpc**: `eth_getUncleByBlockNumberAndIndex`
- **summary**: Returns an uncles at given block and index.
 
### getUncleCountByBlockHash(hash: `H256`): `U256`
- **interface**: `api.rpc.eth.getUncleCountByBlockHash`
- **jsonrpc**: `eth_getUncleCountByBlockHash`
- **summary**: Returns the number of uncles in a block with given hash.
 
### getUncleCountByBlockNumber(number: `BlockNumber`): `U256`
- **interface**: `api.rpc.eth.getUncleCountByBlockNumber`
- **jsonrpc**: `eth_getUncleCountByBlockNumber`
- **summary**: Returns the number of uncles in a block with given block number.
 
### getWork(): `EthWork`
- **interface**: `api.rpc.eth.getWork`
- **jsonrpc**: `eth_getWork`
- **summary**: Returns the hash of the current block, the seedHash, and the boundary condition to be met.
 
### hashrate(): `U256`
- **interface**: `api.rpc.eth.hashrate`
- **jsonrpc**: `eth_hashrate`
- **summary**: Returns the number of hashes per second that the node is mining with.
 
### listening(): `bool`
- **interface**: `api.rpc.eth.listening`
- **jsonrpc**: `eth_listening`
- **summary**: Returns true if client is actively listening for network connections. Otherwise false.
 
### mining(): `bool`
- **interface**: `api.rpc.eth.mining`
- **jsonrpc**: `eth_mining`
- **summary**: Returns true if client is actively mining new blocks.
 
### newBlockFilter(): `U256`
- **interface**: `api.rpc.eth.newBlockFilter`
- **jsonrpc**: `eth_newBlockFilter`
- **summary**: Returns id of new block filter.
 
### newFilter(filter: `EthFilter`): `U256`
- **interface**: `api.rpc.eth.newFilter`
- **jsonrpc**: `eth_newFilter`
- **summary**: Returns id of new filter.
 
### newPendingTransactionFilter(): `U256`
- **interface**: `api.rpc.eth.newPendingTransactionFilter`
- **jsonrpc**: `eth_newPendingTransactionFilter`
- **summary**: Returns id of new block filter.
 
### peerCount(): `String`
- **interface**: `api.rpc.eth.peerCount`
- **jsonrpc**: `eth_peerCount`
- **summary**: Returns number of peers connected to node.
 
### protocolVersion(): `u64`
- **interface**: `api.rpc.eth.protocolVersion`
- **jsonrpc**: `eth_protocolVersion`
- **summary**: Returns protocol version encoded as a string (quotes are necessary).
 
### sendRawTransaction(bytes: `Bytes`): `H256`
- **interface**: `api.rpc.eth.sendRawTransaction`
- **jsonrpc**: `eth_sendRawTransaction`
- **summary**: Sends signed transaction, returning its hash.
 
### sendTransaction(tx: `EthTransactionRequest`): `H256`
- **interface**: `api.rpc.eth.sendTransaction`
- **jsonrpc**: `eth_sendTransaction`
- **summary**: Sends transaction; will block waiting for signer to return the transaction hash
 
### sha3(data: `Bytes`): `H256`
- **interface**: `api.rpc.eth.sha3`
- **jsonrpc**: `eth_sha3`
- **summary**: Returns sha3 of the given data
 
### submitHashrate(index: `U256`, hash: `H256`): `bool`
- **interface**: `api.rpc.eth.submitHashrate`
- **jsonrpc**: `eth_submitHashrate`
- **summary**: Used for submitting mining hashrate.
 
### submitWork(nonce: `H64`, headerHash: `H256`, mixDigest: `H256`): `bool`
- **interface**: `api.rpc.eth.submitWork`
- **jsonrpc**: `eth_submitWork`
- **summary**: Used for submitting a proof-of-work solution.
 
### subscribe(kind: `EthSubKind`, params?: `EthSubParams`): `Null`
- **interface**: `api.rpc.eth.subscribe`
- **jsonrpc**: `eth_subscribe`
- **summary**: Subscribe to Eth subscription.
 
### syncing(): `EthSyncStatus`
- **interface**: `api.rpc.eth.syncing`
- **jsonrpc**: `eth_syncing`
- **summary**: Returns an object with data about the sync status or false.
 
### uninstallFilter(index: `U256`): `bool`
- **interface**: `api.rpc.eth.uninstallFilter`
- **jsonrpc**: `eth_uninstallFilter`
- **summary**: Uninstalls filter.
 
### version(): `String`
- **interface**: `api.rpc.eth.version`
- **jsonrpc**: `eth_version`
- **summary**: Returns protocol version.

___


## genericAsset
 
### registeredAssets(): `Vec<(AssetId, AssetInfo)>`
- **interface**: `api.rpc.genericAsset.registeredAssets`
- **jsonrpc**: `genericAsset_registeredAssets`
- **summary**: Get all registered generic assets (symbol, decimal places)

___


## governance
 
### getProposalVotes(): `Vec<ProposalVotes<AccountId>>`
- **interface**: `api.rpc.governance.getProposalVotes`
- **jsonrpc**: `governance_getProposalVotes`
- **summary**: Get all proposals and the vote information

___


## grandpa
 
### restartVoter(): `any`
- **interface**: `api.rpc.grandpa.restartVoter`
- **jsonrpc**: `grandpa_restartVoter`
- **summary**: Restarts the grandpa voter future

___


## mmr
 
### generateProof(leafIndex: `u64`, at?: `BlockHash`): `MmrLeafProof`
- **interface**: `api.rpc.mmr.generateProof`
- **jsonrpc**: `mmr_generateProof`
- **summary**: Generate MMR proof for given leaf index.

___


## nft
 
### collectedTokens(collection: `CollectionId`, address: `Address`): `Vec<EnhancedTokenId>`
- **interface**: `api.rpc.nft.collectedTokens`
- **jsonrpc**: `nft_collectedTokens`
- **summary**: Get the tokens owned by an address in a certain collection

___


## offchain
 
### localStorageGet(kind: `StorageKind`, key: `Bytes`): `Option<Bytes>`
- **interface**: `api.rpc.offchain.localStorageGet`
- **jsonrpc**: `offchain_localStorageGet`
- **summary**: Get offchain local storage under given key and prefix
 
### localStorageSet(kind: `StorageKind`, key: `Bytes`, value: `Bytes`): `Null`
- **interface**: `api.rpc.offchain.localStorageSet`
- **jsonrpc**: `offchain_localStorageSet`
- **summary**: Set offchain local storage under given key and prefix

___


## payment
 
### queryFeeDetails(extrinsic: `Bytes`, at?: `BlockHash`): `FeeDetails`
- **interface**: `api.rpc.payment.queryFeeDetails`
- **jsonrpc**: `payment_queryFeeDetails`
- **summary**: Query the detailed fee of a given encoded extrinsic
 
### queryInfo(extrinsic: `Bytes`, at?: `BlockHash`): `RuntimeDispatchInfo`
- **interface**: `api.rpc.payment.queryInfo`
- **jsonrpc**: `payment_queryInfo`
- **summary**: Retrieves the fee information for an encoded extrinsic

___


## rpc
 
### methods(): `RpcMethods`
- **interface**: `api.rpc.rpc.methods`
- **jsonrpc**: `rpc_methods`
- **summary**: Retrieves the list of RPC methods that are exposed by the node

___


## staking
 
### accruedPayout(undefined: `AccountId`): `u64`
- **interface**: `api.rpc.staking.accruedPayout`
- **jsonrpc**: `staking_accruedPayout`
- **summary**: Retrieves the currently accrued reward for the specified stash

___


## state
 
### call(method: `Text`, data: `Bytes`, at?: `BlockHash`): `Bytes`
- **interface**: `api.rpc.state.call`
- **jsonrpc**: `state_call`
- **summary**: Perform a call to a builtin on the chain
 
### getChildKeys(childStorageKey: `StorageKey`, childDefinition: `StorageKey`, childType: `u32`, key: `StorageKey`, at?: `BlockHash`): `Vec<StorageKey>`
- **interface**: `api.rpc.state.getChildKeys`
- **jsonrpc**: `state_getChildKeys`
- **summary**: Retrieves the keys with prefix of a specific child storage
 
### getChildReadProof(childStorageKey: `PrefixedStorageKey`, keys: `Vec<StorageKey>`, at?: `BlockHash`): `ReadProof`
- **interface**: `api.rpc.state.getChildReadProof`
- **jsonrpc**: `state_getChildReadProof`
- **summary**: Returns proof of storage for child key entries at a specific block state.
 
### getChildStorage(childStorageKey: `StorageKey`, childDefinition: `StorageKey`, childType: `u32`, key: `StorageKey`, at?: `BlockHash`): `StorageData`
- **interface**: `api.rpc.state.getChildStorage`
- **jsonrpc**: `state_getChildStorage`
- **summary**: Retrieves the child storage for a key
 
### getChildStorageHash(childStorageKey: `StorageKey`, childDefinition: `StorageKey`, childType: `u32`, key: `StorageKey`, at?: `BlockHash`): `Hash`
- **interface**: `api.rpc.state.getChildStorageHash`
- **jsonrpc**: `state_getChildStorageHash`
- **summary**: Retrieves the child storage hash
 
### getChildStorageSize(childStorageKey: `StorageKey`, childDefinition: `StorageKey`, childType: `u32`, key: `StorageKey`, at?: `BlockHash`): `u64`
- **interface**: `api.rpc.state.getChildStorageSize`
- **jsonrpc**: `state_getChildStorageSize`
- **summary**: Retrieves the child storage size
 
### getKeys(key: `StorageKey`, at?: `BlockHash`): `Vec<StorageKey>`
- **interface**: `api.rpc.state.getKeys`
- **jsonrpc**: `state_getKeys`
- **summary**: Retrieves the keys with a certain prefix
 
### getKeysPaged(key: `StorageKey`, count: `u32`, startKey?: `StorageKey`, at?: `BlockHash`): `Vec<StorageKey>`
- **interface**: `api.rpc.state.getKeysPaged`
- **jsonrpc**: `state_getKeysPaged`
- **summary**: Returns the keys with prefix with pagination support.
 
### getMetadata(at?: `BlockHash`): `Metadata`
- **interface**: `api.rpc.state.getMetadata`
- **jsonrpc**: `state_getMetadata`
- **summary**: Returns the runtime metadata
 
### getPairs(prefix: `StorageKey`, at?: `BlockHash`): `Vec<KeyValue>`
- **interface**: `api.rpc.state.getPairs`
- **jsonrpc**: `state_getPairs`
- **summary**: Returns the keys with prefix, leave empty to get all the keys (deprecated: Use getKeysPaged)
 
### getReadProof(keys: `Vec<StorageKey>`, at?: `BlockHash`): `ReadProof`
- **interface**: `api.rpc.state.getReadProof`
- **jsonrpc**: `state_getReadProof`
- **summary**: Returns proof of storage entries at a specific block state
 
### getRuntimeVersion(at?: `BlockHash`): `RuntimeVersion`
- **interface**: `api.rpc.state.getRuntimeVersion`
- **jsonrpc**: `state_getRuntimeVersion`
- **summary**: Get the runtime version
 
### getStorage(key: `StorageKey`, at?: `BlockHash`): `StorageData`
- **interface**: `api.rpc.state.getStorage`
- **jsonrpc**: `state_getStorage`
- **summary**: Retrieves the storage for a key
 
### getStorageHash(key: `StorageKey`, at?: `BlockHash`): `Hash`
- **interface**: `api.rpc.state.getStorageHash`
- **jsonrpc**: `state_getStorageHash`
- **summary**: Retrieves the storage hash
 
### getStorageSize(key: `StorageKey`, at?: `BlockHash`): `u64`
- **interface**: `api.rpc.state.getStorageSize`
- **jsonrpc**: `state_getStorageSize`
- **summary**: Retrieves the storage size
 
### queryStorage(keys: `Vec<StorageKey>`, fromBlock: `Hash`, toBlock?: `BlockHash`): `Vec<StorageChangeSet>`
- **interface**: `api.rpc.state.queryStorage`
- **jsonrpc**: `state_queryStorage`
- **summary**: Query historical storage entries (by key) starting from a start block
 
### queryStorageAt(keys: `Vec<StorageKey>`, at?: `BlockHash`): `Vec<StorageChangeSet>`
- **interface**: `api.rpc.state.queryStorageAt`
- **jsonrpc**: `state_queryStorageAt`
- **summary**: Query storage entries (by key) starting at block hash given as the second parameter
 
### subscribeRuntimeVersion(): `RuntimeVersion`
- **interface**: `api.rpc.state.subscribeRuntimeVersion`
- **jsonrpc**: `state_subscribeRuntimeVersion`
- **summary**: Retrieves the runtime version via subscription
 
### subscribeStorage(keys?: `Vec<StorageKey>`): `StorageChangeSet`
- **interface**: `api.rpc.state.subscribeStorage`
- **jsonrpc**: `state_subscribeStorage`
- **summary**: Subscribes to storage changes for the provided keys
 
### traceBlock(block: `Hash`, targets: `Option<Text>`, storageKeys: `Option<Text>`): `TraceBlockResponse`
- **interface**: `api.rpc.state.traceBlock`
- **jsonrpc**: `state_traceBlock`
- **summary**: Provides a way to trace the re-execution of a single block

___


## syncstate
 
### genSyncSpec(raw: `bool`): `Json`
- **interface**: `api.rpc.syncstate.genSyncSpec`
- **jsonrpc**: `sync_state_genSyncSpec`
- **summary**: Returns the json-serialized chainspec running the node, with a sync state.
