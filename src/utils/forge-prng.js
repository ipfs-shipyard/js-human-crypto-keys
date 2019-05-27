import util from 'node-forge/lib/util';
import HmacDrgb from 'hmac-drbg';
import hash from 'hash.js';

const createForgePrng = (seed) => {
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

export default createForgePrng;
