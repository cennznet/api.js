import {ApiOptions} from '@cennznet/api/types';

export type NetworkConfig = {
  options: ApiOptions,
  defaultEndpoint: string
};

export type NetworkName = 'CUSTOM' | 'RIMU' | 'KAURI';
export const Networks: { [key in NetworkName]: NetworkConfig } = {
  CUSTOM: {
    options: {},
    defaultEndpoint: 'ws://localhost:9944'
  },
  RIMU: {
    options: {},
    defaultEndpoint: 'wss://rimu.unfrastructure.io/public/ws'
  },
  KAURI: {
    options: {},
    defaultEndpoint: 'wss://rimu.unfrastructure.io/public/ws'
  }
};
