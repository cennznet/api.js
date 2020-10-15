import { InterfaceTypes } from '@polkadot/types/types';

export type ExtTypes = Record<string, keyof InterfaceTypes>;

export type ExtInfo = {
  extra: ExtTypes;
  types: ExtTypes;
};

export type ExtDef = Record<string, ExtInfo>;
