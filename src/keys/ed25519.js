import pki from 'node-forge/lib/pki';
import ed25519 from 'node-forge/lib/ed25519';

const defaultParams = {};

const generateKeyPair = async (params, seed) => {
    // Generate the Ed25519 key-pair using node-forge by passing the seed
    const { privateKey, publicKey } = await ed25519.generateKeyPair({ seed });

    // Convert key-pair to pem base64 encoded format
    const privateKeyPem = pki.privateKeyToPem(privateKey);
    const publicKeyPem = pki.publicKeyToPem(publicKey);

    return {
        privateKey: privateKeyPem,
        publicKey: publicKeyPem,
    };
};

export { generateKeyPair, defaultParams };
