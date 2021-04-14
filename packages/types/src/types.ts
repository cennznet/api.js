import { AccountId, Address } from '@polkadot/types/interfaces';
import { AnyNumber } from '@polkadot/types/types';
import BN from 'bn.js';
export {
  Hash,
  Block,
  AccountId,
  EventRecord,
  AssetId,
  Keys,
  Balance,
  Nominations,
  Permill,
  RuntimeDispatchInfo,
  EraIndex,
  Exposure,
  StakingLedger,
  ValidatorPrefs,
  Forcing,
} from '@polkadot/types/interfaces';
export * from '@polkadot/types/types';
export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;
export type AnyAssetId = AnyNumber;
