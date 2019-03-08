import {hexToU8a, stringToU8a, u8aFixLength, u8aToHex, u8aToString} from '@cennznet/util';
import {randomBytes, secretbox} from 'tweetnacl';

const newNonce = () => randomBytes(secretbox.nonceLength);

const PASS_STRENGTH = 256;

const encrypt = async (passphrase: string, json: object): Promise<string> => {
    const keyUint8Array = u8aFixLength(stringToU8a(passphrase), PASS_STRENGTH, true);

    const nonce = newNonce();
    const messageUint8 = stringToU8a(JSON.stringify(json));
    const box = secretbox(messageUint8, nonce, keyUint8Array);

    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    return u8aToHex(fullMessage);
};

const decrypt = async (passphrase: string, encoded: string): Promise<object> => {
    const keyUint8Array = u8aFixLength(stringToU8a(passphrase), PASS_STRENGTH, true);
    const messageWithNonceAsUint8Array = hexToU8a(encoded);
    const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(secretbox.nonceLength, encoded.length);

    const decrypted = secretbox.open(message, nonce, keyUint8Array);

    if (!decrypted) {
        throw new Error('wrong passphrase');
    }

    const base64DecryptedMessage = u8aToString(decrypted);
    return JSON.parse(base64DecryptedMessage);
};

export default {
    encrypt,
    decrypt,
};
