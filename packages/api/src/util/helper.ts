import { u8aToHex } from '@cennznet/util';
import { EthereumSignature } from '@polkadot/types/interfaces';

export function extractEthereumSignature(signatures: EthereumSignature[]) {
  const rPart = [],
    sPart = [],
    vPart = [];
  signatures.forEach((signature) => {
    const sigU8a = signature.toU8a();
    const rSlice = sigU8a.slice(0, 32);
    const r = u8aToHex(rSlice);
    rPart.push(r);
    const sSlice = sigU8a.slice(32, 64);
    const s = u8aToHex(sSlice);
    sPart.push(s);
    let v = sigU8a[64];
    if (v < 27) {
      if (v === 0 || v === 1) {
        v += 27;
      } else {
        console.error('signature invalid v byte', 'signature', signature);
      }
    }
    vPart.push(v);
  });

  return { r: rPart, s: sPart, v: vPart };
}
