import { forEach } from 'lodash';
import * as rsa from './keys/rsa';
import * as ed25519 from './keys/ed25519';

const algorithmsMap = {
    rsa,
    ed25519,
};

const buildParams = (defaultParams, customParams) => {
    const params = {
        ...defaultParams,
    };

    // Merge each custom parameter but apply validation
    // This gives us garantees that the keys params are deterministic
    forEach(customParams, (value, key) => {
        // Do not allow unknown keys (params)
        if (defaultParams[key] == null) {
            throw new Error(`Unknown algorithm param '${key}'`);
        }

        // Dot not allow nullish values
        if (value == null) {
            throw new Error(`Algorithm param '${key}' can't be null or undefined`);
        }

        // Do now allow different types
        if (typeof value !== typeof defaultParams[key]) {
            throw new Error(`Excpted algorithm param '${key}' to be a ${typeof params[key]}`);
        }

        params[key] = value;
    });

    return params;
};

const parseAlgorithm = (algorithm) => {
    if (typeof algorithm === 'string') {
        algorithm = { name: algorithm };
    }

    const { name, ...customParams } = algorithm;

    if (!algorithmsMap[name]) {
        throw new Error(`Unknown algorithm '${name}'`);
    }

    const { generateKeyPair, defaultParams } = algorithmsMap[name];
    const params = buildParams(defaultParams, customParams);

    return {
        name,
        params,
        generateKeyPair,
    };
};

export default parseAlgorithm;
