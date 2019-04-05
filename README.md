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

Generate and import human-friendly cryptographic keys using mnemonics, QR codes and other methods.


## Installation

```sh
$ npm install human-crypto-keys
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.


## Usage

```js
import { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed } from 'human-crypto-keys';

const keyPair = await generateKeyPair('rsa');
// => Generates a key pair with rsa encryption and provides information for recovery.

const keyPairFromMnemonic = await getKeyPairFromMnemonic(keyPair.mnemonic, keyPair.algorithm);
// => Generates the same key pair based on the mnemonic.

const keyPairFromSeed = await getKeyPairFromSeed(keyPair.seed, keyPair.algorithm);
// => Generates the same key pair based on the seed.

```

> ⚠️ human-crypto-keys depends on cryptographical modules that can increase the size of a project. Please keep in mind that, depending on your needs, dynamic imports might be suitable.

## API

### generateKeyPair(algorithm, options)

Generates a key pair based on the specified algorithm.

Returns an object with the following:
```js
{
    algorithm,  // An object with the algorithm identifier and respective parameters that were used during generation.
    mnemonic,   // The mnemonic used to create a seed for generation.
    seed,       // The seed used for generation.
    privateKey, // The generated private key composed in a specific format.
    publicKey,  // The generated public key composed in a specific format. 
}
```

#### Parameters

[algorithm](#algorithm)

[options](#options)

### getKeyPairFromMnemonic(mnemonic, algorithm, options)

Generates a key pair based on the specified mnemonic and algorithm.

Returns an object with the following:
```js
{
    privateKey, // The generated private key composed in a specific format.
    publicKey,  // The generated public key composed in a specific format. 
}
```

#### Parameters

<details><summary><strong>mnemonic</strong></summary>

Type: `String`

The mnemonic provided as one of the recovery methods for a key pair.
</details>

[algorithm](#algorithm)

[options](#options)

### getKeyPairFromSeed(seed, algorithm, options)

Generates a key pair based on the specified seed and algorithm.

Returns an object with the following:
```js
{
    privateKey, // The generated private key composed in a specific format.
    publicKey,  // The generated public key composed in a specific format. 
}
```

#### Parameters

<details><summary><strong>seed</strong></summary>

Type: `String`

The seed provided as one of the recovery methods for a key pair.
</details>

[algorithm](#algorithm)

[options](#options)

### Common Parameters
<details name="algorithm"><summary><strong>algorithm</strong></summary>
 
Type: `Object` or `String`

The algorithm identifier and the respective parameters to generate a key pair.

It can be specified as an `Object` or a `String`. Using an `Object` will provide freedom to override default algorithm parameters in relation to its type. On the other hand, a `String` presents a useful and quick approach if the default parameters are suitable.

The default parameters are different for each algorithm type. Currently only 2 types are supported:

<details><summary><strong>RSA</strong></summary>

Default Parameters:
```js
modulusLength: 2048		    // Number
publicExponent: 65537		// Number
method: 'PRIMEINC'		    // String
```

You can override only the parameters that you need, all the other ones remain with default values. 

> ⚠️ Please make sure that values follow the same type as default ones. Also, parameters that are not available as default are not supported.

Example `Object`:
```js
const algorithm = {
    id: 'rsa',
    modulusLength: 4096,
}
```

Example `String`:
```js
const algorithm = 'rsa';
```

In the examples above we are using an alias for RSA encryption. Although this is possible, the full list of supported RSA key algorithms can be found in the [RSA Keys Section](https://github.com/ipfs-shipyard/js-crypto-key-composer/tree/initial-impl#key-algorithms) of [crypto-key-composer](https://github.com/ipfs-shipyard/js-crypto-key-composer) package.
</details>

<details><summary><strong>ED25519</strong></summary>

This algorithm doesn't have any default parameters since it only needs a 32 bytes seed.

Example `Object`:
```js
const algorithm = { id: 'ed25519' };
```

Example `String`:
```js
const algorithm = 'ed25519';
```
</details>

----------
</details>

<details name="options"><summary><strong>options</strong></summary>

Type: `Object`

Currently, options are available for composability purposes. Your key pair will be composed and, if needed, encrypted based on these. 

Available options:

<details><summary><strong>format</strong></summary>

Type: `String`

Default: `pkcs8-pem`

Keys can be composed in different formats. All formats available are described in the [Formats Section](https://github.com/ipfs-shipyard/js-crypto-key-composer/tree/initial-impl#formats) of [crypto-key-composer](https://github.com/ipfs-shipyard/js-crypto-key-composer) package.

The **format** option defines in which format the private key will be composed.

The public key format is inferred from the private key one:
- If it is a `pem` the public key will be composed in `spki-pem`.
- If it is a `der` it will be composed in `spki-der`.
- If it is none of `pem` or `der` it will be the same as the private key format.
</details>

<details><summary><strong>encryptionAlgorithm</strong></summary>

Type: `Object`

The encryption algorithm that will be used to encrypt the private key.

For more information please read the [Encryption Algorithms Section](https://github.com/ipfs-shipyard/js-crypto-key-composer/tree/initial-impl#encryption-algorithms) of [crypto-key-composer](https://github.com/ipfs-shipyard/js-crypto-key-composer) package.
</details>

<details><summary><strong>password</strong></summary>

Type: `String`

The password to be used on the encryption of the private key.
</details>

----------
</details>

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
