# human-crypto-keys

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/human-crypto-keys
[downloads-image]:http://img.shields.io/npm/dm/human-crypto-keys.svg
[npm-image]:http://img.shields.io/npm/v/human-crypto-keys.svg
[travis-url]:https://travis-ci.org/ipfs-shipyard/js-human-crypto-keys
[travis-image]:http://img.shields.io/travis/ipfs-shipyard/js-human-crypto-keys/master.svg
[codecov-url]:https://codecov.io/gh/ipfs-shipyard/js-human-crypto-keys
[codecov-image]:https://img.shields.io/codecov/c/github/ipfs-shipyard/js-human-crypto-keys/master.svg
[david-dm-url]:https://david-dm.org/ipfs-shipyard/js-human-crypto-keys
[david-dm-image]:https://img.shields.io/david/ipfs-shipyard/js-human-crypto-keys.svg
[david-dm-dev-url]:https://david-dm.org/ipfs-shipyard/js-human-crypto-keys?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/ipfs-shipyard/js-human-crypto-keys.svg

Generate and import human-friendly cryptographic keys using mnemonics or seeds.


## Installation

```sh
$ npm install human-crypto-keys
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.


## Usage

```js
import { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed } from 'human-crypto-keys';

// Generate a new key pair
const { mnemonic, seed, publicKey, privateKey } = generateKeyPair('rsa');

// ...later, you may reconstruct it by its seed or by its mnemonic
const { publicKey, privateKey } = getKeyPairFromMnemonic(mnemonic);
const { publicKey, privateKey } = getKeyPairFromSeed(seed);
```


## API

### generateKeyPair(algorithm)

Generates a new key pair for the given `algorithm`.

The `algorithm` parameter can be a string or an object.
You may read more about the supported algorithms in the [Algorithm](#algoritms) section.

```js
import { generateKeyPair } from 'human-crypto-keys';

(async () => {
    const result = await generateKeyPair('rsa');

    console.log(result);
});

(async () => {
    const result = await generateKeyPair({ name: 'rsa', bits: 4096, e: 17489 });

    console.log(result);
})();
```

The `result` object has the following shape:

```js
{
    algorithm: { name: 'rsa', ...params }, // The algorithm name and associated params,
    mnemonic,  // The words that compose the mnemonic that can be used to generate the seed
    seed, // The seed used to produce the private key
    publicKey,  // PKCS8 public key, encoded in PEM base64 format
    privateKey, // PKCS8 private key, encoded in PEM base64 format
}
```

### getKeyPairFromMnemonic(algorithm, mnemonic)


### getKeyPairFromSeed(algorithm, seed)


### Algorithms

#### RSA


#### Ed25519


## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
