import bip39 from 'bip39';

// generateKey(algorithm) -> { mnemonic, seed, key  }
// getKeyFromSeed() -> key
// getKeyFromMnemonic() -> key
// generateQrCode(seed) -> string (data base64)

const generateKey = (algorithm, options) => {
    // TODO: locale
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeed(mnemonic);

    console.log('mnemonic', mnemonic);
    console.log('seed', seed, '!!', seed.length);

    const key = '';

    return {
        mnemonic,
        seed,
    };
};

const getKeyFromSeed = (seed) => {

};

const getKeyFromMnemonic = (mnemonic) => {

};

const generateQrCode = (seed) => {

};

export { generateKey, getKeyFromSeed, getKeyFromMnemonic, generateQrCode };
