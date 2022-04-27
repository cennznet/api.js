import {hexToU8a, stringToU8a, u8aConcat} from "@polkadot/util";
import {encodeAddress} from "@polkadot/util-crypto";

export function cvmToAddress(cvmAddress) {
    let message = stringToU8a('cvm:');
    message = u8aConcat(message, new Array(7).fill(0), hexToU8a(cvmAddress));
    const checkSum = message.reduce((a, b) => a ^ b, 0);
    message = u8aConcat(message, new Array(1).fill(checkSum));

    return encodeAddress(message, 42);
}
