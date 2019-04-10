import ed25519 from 'node-forge/lib/ed25519';
import { typedArrayToUint8Array } from '../utils/binary';

const defaultParams = {};

const generateKeyPair = (params, seed) => {
    seed = seed.slice(0, 32);

    const { publicKey } = ed25519.generateKeyPair({ seed });

    return {
        privateKey: { seed },
        publicKey: { bytes: typedArrayToUint8Array(publicKey) },
    };
};

export { generateKeyPair, defaultParams };
