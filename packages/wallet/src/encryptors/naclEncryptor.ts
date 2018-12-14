import {secretbox, randomBytes} from 'tweetnacl';
import {u8aFixLength, stringToU8a, u8aToHex, hexToU8a, u8aToString} from '@polkadot/util';

const newNonce = () => randomBytes(secretbox.nonceLength);

const encrypt = async (passphrase: string, json: object): Promise<string> => {
    const keyUint8Array = u8aFixLength(stringToU8a(passphrase), 256, true);

    const nonce = newNonce();
    const messageUint8 = stringToU8a(JSON.stringify(json));
    const box = secretbox(messageUint8, nonce, keyUint8Array);

    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    return u8aToHex(fullMessage);
};

const decrypt = async (passphrase: string, encoded: string): Promise<object> => {
    const keyUint8Array = u8aFixLength(stringToU8a(passphrase), 256, true);
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
