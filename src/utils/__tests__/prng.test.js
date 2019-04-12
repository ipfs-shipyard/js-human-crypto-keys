import hash from 'hash.js';
import HmacDrgb from 'hmac-drbg';
import { createPrng } from '../prng';
import { mockSeed, mockRandomGeneration } from './mocks';

jest.mock('hmac-drbg');

beforeEach(() => {
    HmacDrgb.mockClear();
});

describe('createPrng', () => {
    it('should create prng correctly', async () => {
        createPrng(mockSeed);

        expect(HmacDrgb).toHaveBeenCalledWith({
            hash: hash.sha256,
            entropy: '87a871552d0ac44ad9f2dd32787beb201033f5d649ead4dedac15d78772ce5f6a42434e0a05b4fc6ad11e80d0f96f0a8bb23120d39feb69f96b824059cb6fa8f',
            nonce: null,
            pers: null,
        });
    });

    it('should generate bytes correctly', () => {
        const prng = createPrng(mockSeed);

        HmacDrgb.mock.instances[0].generate = jest.fn(() => mockRandomGeneration);

        const bytes = prng.getBytesSync(32);

        expect(HmacDrgb.mock.instances[0].generate).toHaveBeenCalledTimes(1);
        expect(HmacDrgb.mock.instances[0].generate).toHaveBeenCalledWith(32);
        expect(bytes).toMatchSnapshot();
    });
});
