import rsa from 'node-forge/lib/rsa';
import createForgePrng from '../../utils/forge-prng';
import { generateKeyPair, defaultParams } from '../rsa';
import { mockSeed, mockForgePrivateKey, mockForgePublicKey } from './mocks';

jest.mock('../../utils/forge-prng');
jest.mock('node-forge/lib/rsa', () => ({
    generateKeyPair: jest.fn((modulusLength, publicExponent, options, callback) => {
        callback(null, { privateKey: mockForgePrivateKey, publicKey: mockForgePublicKey });
    }),
}));

beforeEach(() => {
    rsa.generateKeyPair.mockClear();
    createForgePrng.mockClear();
});

describe('defaultParams', () => {
    it('should have correct default params', () => {
        expect(defaultParams).toEqual({
            modulusLength: 2048,
            publicExponent: 65537,
            method: 'PRIMEINC',
        });
    });
});

describe('generateKeyPair', () => {
    it('should generate key pair succesfully', async () => {
        const params = { modulusLength: 1, publicExponent: 2, method: 'foo' };
        const keyPair = await generateKeyPair(params, mockSeed);

        expect(createForgePrng).toHaveBeenCalledTimes(1);
        expect(createForgePrng).toHaveBeenCalledWith(mockSeed);

        expect(rsa.generateKeyPair).toHaveBeenCalledTimes(1);
        expect(rsa.generateKeyPair.mock.calls[0][0]).toEqual(1);
        expect(rsa.generateKeyPair.mock.calls[0][1]).toEqual(2);
        expect(rsa.generateKeyPair.mock.calls[0][2].algorithm).toEqual('foo');

        expect(keyPair).toMatchSnapshot();
    });

    it('should disable Worker', async () => {
        const worker = jest.fn();

        global.Worker = worker;

        const params = { modulusLength: 1, publicExponent: 2, method: 'foo' };

        await generateKeyPair(params, mockSeed);

        expect(global.Worker).toEqual(worker);
        expect(worker).toHaveBeenCalledTimes(0);
    });

    it('should disable Worker (concurrently)', async () => {
        const worker = jest.fn();

        global.Worker = worker;

        const params = { modulusLength: 1, publicExponent: 2, method: 'foo' };

        await Promise.all([
            generateKeyPair(params, mockSeed),
            generateKeyPair(params, mockSeed),
        ]);

        expect(global.Worker).toEqual(worker);
        expect(worker).toHaveBeenCalledTimes(0);
    });
});
