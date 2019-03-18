import pki from 'node-forge/lib/pki';
import rsa from 'node-forge/lib/rsa';
import util from 'node-forge/lib/util';
import HmacDrgb from 'hmac-drbg';
import hash from 'hash.js';
import pify from 'pify';

const forgeGenerateKeyPair = pify(rsa.generateKeyPair);

const defaultParams = {
    bits: 2048,
    publicExponent: 65537,
    method: 'PRIMEINC',
};

const createPrng = (seed) => {
    const hmacDrgb = new HmacDrgb({
        hash: hash.sha256,
        entropy: util.binary.hex.encode(seed),
        nonce: null,
        pers: null,
    });

    return {
        getBytesSync: (size) => {
            const bytesArray = hmacDrgb.generate(size);
            const bytes = new Uint8Array(bytesArray);

            return util.binary.raw.encode(bytes);
        },
    };
};

const generateKeyPair = async (params, seed) => {
    // Generate the RSA key-pair using node-forge by passing all the correct params and a custom
    // prng based on the seed
    const { privateKey, publicKey } = await forgeGenerateKeyPair(params.bits, params.publicExponent, {
        prng: createPrng(seed),
        algorithm: params.method,
    });

    // Convert key-pair to pem base64 encoded format
    const privateKeyPem = pki.privateKeyToPem(privateKey);
    const publicKeyPem = pki.publicKeyToPem(publicKey);

    return {
        privateKey: privateKeyPem,
        publicKey: publicKeyPem,
    };
};

export { generateKeyPair, defaultParams };
