import * as bip39 from 'bip39';
import parseAlgorithm from './algorithm';
import { composePrivateKey, composePublicKey } from 'crypto-key-composer';

const composeKeys = ({ privateKey, publicKey }, keyAlgorithm, options) => {
    options = { privateKeyFormat: 'pkcs8-pem', publicKeyFormat: 'spki-pem', ...options };

    const { privateKeyFormat, publicKeyFormat, encryptionAlgorithm, password } = options;

    return {
        privateKey: composePrivateKey({
            format: privateKeyFormat,
            keyAlgorithm,
            keyData: privateKey,
            encryptionAlgorithm,
        }, { password }),
        publicKey: composePublicKey({
            format: publicKeyFormat,
            keyAlgorithm,
            keyData: publicKey,
        }),
    };
};

const generateKeys = async (seed, algorithm, options) => {
    const { id, params, generate } = parseAlgorithm(algorithm);

    const keyPair = await generate(params, seed);

    const keyAlgorithm = { id, ...params };
    const composedKeyPair = composeKeys(keyPair, keyAlgorithm, options);

    return { keyAlgorithm, composedKeyPair };
};

const generateKeyPair = async (algorithm, options) => {
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);

    const { keyAlgorithm, composedKeyPair } = await generateKeys(seed, algorithm, options);

    return {
        algorithm: keyAlgorithm,
        mnemonic,
        seed,
        ...composedKeyPair,
    };
};

const getKeyPairFromMnemonic = async (mnemonic, algorithm, options) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);

    return getKeyPairFromSeed(seed, algorithm, options);
};

const getKeyPairFromSeed = async (seed, algorithm, options) => {
    const { composedKeyPair } = await generateKeys(seed, algorithm, options);

    return composedKeyPair;
};

export { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed };
