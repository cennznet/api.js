---
 Eth Bridge
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
 
### bridgePaused(): `bool`
- **interface**: `api.query.ethBridge.bridgePaused`
- **summary**:   Whether the bridge is paused 
 
### eventClaims(`EventClaimId`): `(EthHash,EventTypeId)`
- **interface**: `api.query.ethBridge.eventClaims`
- **summary**:   Queued event claims, awaiting notarization 
 
### eventConfirmations(): `u64`
- **interface**: `api.query.ethBridge.eventConfirmations`
- **summary**:   The minimum number of block confirmations needed to notarize an Ethereum event 
 
### eventData(`EventClaimId`): `Option<Bytes>`
- **interface**: `api.query.ethBridge.eventData`
- **summary**:   Event data for a given claim 
 
### eventDeadlineSeconds(): `u64`
- **interface**: `api.query.ethBridge.eventDeadlineSeconds`
- **summary**:   Events cannot be claimed after this time (seconds) 
 
### eventNotarizations(`EventClaimId, EthyId`): `Option<EventClaimResult>`
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
 
### nextNotaryKeys(): `Vec<EthyId>`
- **interface**: `api.query.ethBridge.nextNotaryKeys`
- **summary**:   Scheduled notary (validator) public keys for the next session 
 
### nextProofId(): `EventProofId`
- **interface**: `api.query.ethBridge.nextProofId`
- **summary**:   Id of the next event proof 
 
### notaryKeys(): `Vec<EthyId>`
- **interface**: `api.query.ethBridge.notaryKeys`
- **summary**:   Active notary (validator) public keys 
 
### notarySetId(): `u64`
- **interface**: `api.query.ethBridge.notarySetId`
- **summary**:   The current validator set id 
 
### processedTxBuckets(`u64, EthHash`): `()`
- **interface**: `api.query.ethBridge.processedTxBuckets`
- **summary**:   Processed tx hashes bucketed by unix timestamp (`BUCKET_FACTOR_S`) 
 
### processedTxHashes(`EthHash`): `()`
- **interface**: `api.query.ethBridge.processedTxHashes`
- **summary**:   Map from processed tx hash to status Periodically cleared after `EventDeadlineSeconds` expires 
 
### typeIdToEventType(`EventTypeId`): `(EthAddress,EthHash)`
- **interface**: `api.query.ethBridge.typeIdToEventType`
- **summary**:   Maps event type ids to ((contract address, event signature)) 
 
# Extrinsic
 
### setEventConfirmations(confirmations: `u64`)
- **interface**: `api.tx.ethBridge.setEventConfirmations`
 
### setEventDeadline(seconds: `u64`)
- **interface**: `api.tx.ethBridge.setEventDeadline`
 
### submitNotarization(payload: `NotarizationPayload`, _signature: `Signature`)
- **interface**: `api.tx.ethBridge.submitNotarization`
 
# Error
 
# Events
 
### AuthoritySetChange(`EventProofId`)
- **summary**:   A notary (validator) set change is in motion A proof for the change will be generated with the given `event_id` 
 
### Invalid(`EventClaimId`)
- **summary**:   Verifying an event failed 
 
### Verified(`EventClaimId`)
- **summary**:   Verifying an event succeeded 
 
