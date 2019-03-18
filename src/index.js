import bip39 from 'bip39';
import parseAlgorithm from './algorithm';

const generateKeyPair = async (algorithm) => {
    const { name, params, generateKeyPair } = parseAlgorithm(algorithm);

    const mnemonic = bip39.generateMnemonic();
    const seedBuffer = bip39.mnemonicToSeed(mnemonic);
    const seed = new Uint8Array(seedBuffer.buffer);

    const { privateKey, publicKey } = await generateKeyPair(params, seed);

    return {
        algorithm: { name, ...params },
        mnemonic,
        seed,
        publicKey,
        privateKey,
    };
};

const getKeyPairFromMnemonic = async (algorithm, mnemonic) => {
    const { params, generateKeyPair } = parseAlgorithm(algorithm);

    const seedBuffer = bip39.mnemonicToSeed(mnemonic);
    const seed = new Uint8Array(seedBuffer.buffer);

    return generateKeyPair(params, seed);
};

const getKeyPairFromSeed = async (algorithm, seed) => {
    const { params, generateKeyPair } = parseAlgorithm(algorithm);

    return generateKeyPair(params, seed);
};

export { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed };
