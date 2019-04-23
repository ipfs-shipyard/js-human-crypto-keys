import rsa from 'node-forge/lib/rsa';
import pify from 'pify';
import { createPrng } from '../utils/prng';

const forgeGenerateKeyPair = pify(rsa.generateKeyPair);

const defaultParams = {
    modulusLength: 2048,
    publicExponent: 65537,
    method: 'PRIMEINC',
};

const parseForgePrivateKey = (privateKey) => {
    const { n, e, d, p, q, dP, dQ, qInv } = privateKey;

    return {
        modulus: new Uint8Array(n.toByteArray()),
        publicExponent: e.intValue(),
        privateExponent: new Uint8Array(d.toByteArray()),
        prime1: new Uint8Array(p.toByteArray()),
        prime2: new Uint8Array(q.toByteArray()),
        exponent1: new Uint8Array(dP.toByteArray()),
        exponent2: new Uint8Array(dQ.toByteArray()),
        coefficient: new Uint8Array(qInv.toByteArray()),
    };
};

const parseForgePublicKey = (publicKey) => {
    const { n, e } = publicKey;

    return {
        modulus: new Uint8Array(n.toByteArray()),
        publicExponent: e.intValue(),
    };
};

const disableWorker = () => {
    if (typeof Worker === 'undefined') {
        return () => undefined;
    }

    const globalWorker = Worker;

    /* eslint-disable no-global-assign */
    Worker = undefined;

    return () => { Worker = globalWorker; };
    /* eslint-enabled no-global-assign */
};

const generateKeyPair = async (params, seed) => {
    const { modulusLength, publicExponent, method } = params;

    const restoreWorker = disableWorker();

    const { privateKey, publicKey } = await forgeGenerateKeyPair(modulusLength, publicExponent, {
        prng: createPrng(seed),
        algorithm: method,
    });

    restoreWorker();

    return {
        privateKey: parseForgePrivateKey(privateKey),
        publicKey: parseForgePublicKey(publicKey),
    };
};

export { generateKeyPair, defaultParams };
