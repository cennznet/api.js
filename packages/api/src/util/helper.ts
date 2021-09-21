import { u8aToHex } from '@cennznet/util';
import { EthereumSignature } from '@polkadot/types/interfaces';

// Ignore if signature is 0x000
const IGNORE_SIGNATURE =
  '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
// Splits the given Ethereum signatures into r,s,v format
export function extractEthereumSignature(signatures: EthereumSignature[]): { r: string[]; s: string[]; v: number[] } {
  const rPart = [],
    sPart = [],
    vPart = [];
  const filteredSignature = signatures.filter((sig) => sig.toString() !== IGNORE_SIGNATURE);
  filteredSignature.forEach((signature) => {
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
