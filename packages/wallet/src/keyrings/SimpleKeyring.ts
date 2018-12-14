import Keyring from '@polkadot/keyring';
import {KeyringPair} from '@polkadot/keyring/types';
import {IKeyring} from 'cennznet-types';

interface SerializedSimpleKeyring {
    [address: string]: string;
}

export class SimpleKeyring extends Keyring implements IKeyring<SerializedSimpleKeyring> {
    public async serialize(): Promise<SerializedSimpleKeyring> {
        return this.getPairs().reduce((acc, pair) => {
            acc[pair.address()] = pair.toJson().encoded;
            return acc;
        }, {});
    }

    public async deserialize(data: SerializedSimpleKeyring): Promise<KeyringPair[]> {
        await Promise.all(
            Object.keys(data).map(address =>
                this.addFromJson({address, encoded: data[address], encoding: null, meta: null})
            )
        ).then(keyPairs => keyPairs.forEach(keyPair => keyPair.decodePkcs8()));
        return this.getPairs();
    }
}
