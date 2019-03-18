const { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed } = require('./lib');

(async () => {
    const algorithm = { name: 'ed25519' };

    console.log('------------------------generateKeyPair');
    const result1 = await generateKeyPair(algorithm);

    console.log('------------------------getKeyPairFromMnemonic');
    const result2 = await getKeyPairFromMnemonic(result1.algorithm, result1.mnemonic);

    console.log('------------------------getKeyPairFromSeed');
    const result3 = await getKeyPairFromSeed(result1.algorithm, result1.seed);

    console.log(result1);
    console.log(result2);
    console.log(result3);

    console.log(result1.publicKey === result2.publicKey);
    console.log(result1.publicKey === result3.publicKey);
})();
