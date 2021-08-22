---
 Eth_Bridge
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

 
# Storage
 
### activationThreshold(): `Percent`
- **interface**: `api.query.ethBridge.activationThreshold`
- **summary**:   Required % of validator support to signal readiness (default: 66%) 
 
### eventClaims(`EventClaimId`): `(EthHash,EventTypeId)`
- **interface**: `api.query.ethBridge.eventClaims`
- **summary**:   Queued event claims, awaiting notarization 
 
### eventData(`EventClaimId`): `Option<Bytes>`
- **interface**: `api.query.ethBridge.eventData`
- **summary**:   Event data for a given claim 
 
### eventNotarizations(`EventClaimId, AuthorityId`): `Option<EventClaimResult>`
- **interface**: `api.query.ethBridge.eventNotarizations`
- **summary**:   Notarizations for queued messages Either: None = no notarization exists OR Some(yay/nay) 
 
### eventTypeToTypeId(`(EthAddress,EthHash)`): `EventTypeId`
- **interface**: `api.query.ethBridge.eventTypeToTypeId`
- **summary**:   Maps event types seen by the bridge ((contract address, event signature)) to unique type Ids 
 
### nextEventClaimId(): `EventClaimId`
- **interface**: `api.query.ethBridge.nextEventClaimId`
- **summary**:   Id of the next Eth bridge event claim 
 
### nextEventTypeId(): `EventTypeId`
- **interface**: `api.query.ethBridge.nextEventTypeId`
- **summary**:   Id of the next event type (internal) 
 
### notaryKeys(): `Vec<AuthorityId>`
- **interface**: `api.query.ethBridge.notaryKeys`
- **summary**:   Active notary (validator) public keys 
 
### processedTxBuckets(`u64, EthHash`): `()`
- **interface**: `api.query.ethBridge.processedTxBuckets`
- **summary**:   Processed tx hashes bucketed by unix timestamp (`BUCKET_FACTOR_S`) 
 
### processedTxHashes(`EthHash`): `()`
- **interface**: `api.query.ethBridge.processedTxHashes`
- **summary**:   Map from processed tx hash to status Periodically cleared after `EventDeadline` expires 
 
### typeIdToEventType(`EventTypeId`): `(EthAddress,EthHash)`
- **interface**: `api.query.ethBridge.typeIdToEventType`
- **summary**:   Maps event type ids to ((contract address, event signature)) 
 
# Extrinsic
 
### submitNotarization(payload: `NotarizationPayload`, _signature: `Signature`)
- **interface**: `api.tx.ethBridge.submitNotarization`
 
# Error
 
# Events
 
### Invalid(`EventClaimId`)
- **summary**:   Verifying an event failed 
 
### Verified(`EventClaimId`)
- **summary**:   Verifying an event succeeded 
 
