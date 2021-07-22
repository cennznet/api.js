import { InterfaceTypes } from '@polkadot/types/types';

export type ExtTypes = Record<string, keyof InterfaceTypes>;

export type ExtInfo = {
  extrinsic: ExtTypes;
  payload: ExtTypes;
};

export type ExtDef = Record<string, ExtInfo>;
