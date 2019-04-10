import { getKeyTypeFromAlgorithm } from 'crypto-key-composer';
import * as rsa from './keys/rsa';
import * as ed25519 from './keys/ed25519';
import { UnknownAlgorithmError, UnknownAlgorithmParamError, NilAlgorithmParamError, TypeMismatchAlgorithmParamError } from './utils/errors';

const supportedAlgorithms = {
    rsa,
    ed25519,
};

const buildParams = (defaultParams, customParams) => Object.keys(customParams).reduce((params, key) => {
    // Do not allow unknown keys (params)
    if (defaultParams[key] == null) {
        throw new UnknownAlgorithmParamError(key);
    }

    // Do not allow nullish values
    if (customParams[key] == null) {
        throw new NilAlgorithmParamError(key);
    }

    // Do not allow different types
    if (typeof customParams[key] !== typeof defaultParams[key]) {
        throw new TypeMismatchAlgorithmParamError(key, typeof defaultParams[key]);
    }

    params[key] = customParams[key];

    return params;
}, { ...defaultParams });

const parseAlgorithm = (keyAlgorithm) => {
    const algorithm = typeof keyAlgorithm === 'string' ? { id: keyAlgorithm } : keyAlgorithm;
    const type = supportedAlgorithms[algorithm.id] ? algorithm.id : getKeyTypeFromAlgorithm(algorithm.id);

    if (!type) {
        throw new UnknownAlgorithmError(algorithm.id);
    }

    const { generateKeyPair, defaultParams } = supportedAlgorithms[type];
    const { id, ...customParams } = algorithm;
    const params = buildParams(defaultParams, customParams);

    return {
        id,
        type,
        params,
        generate: generateKeyPair,
    };
};

export default parseAlgorithm;
