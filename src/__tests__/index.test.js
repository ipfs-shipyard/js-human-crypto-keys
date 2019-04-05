import bip39 from 'bip39';
import * as rsa from '../keys/rsa';
import { generateKeyPair, getKeyPairFromMnemonic, getKeyPairFromSeed } from '../index';
import { mockMnemonic, mockSeed, mockRsaKeyPair } from './mocks';

jest.mock('../keys/rsa', () => ({
    generateKeyPair: jest.fn(() => mockRsaKeyPair),
}));

jest.mock('bip39', () => ({
    generateMnemonic: jest.fn(() => mockMnemonic),
    mnemonicToSeedAsync: jest.fn(() => mockSeed),
}));

beforeEach(() => {
    bip39.generateMnemonic.mockClear();
    bip39.mnemonicToSeedAsync.mockClear();
    rsa.generateKeyPair.mockClear();
});

describe('generateKeyPair', () => {
    it('should generate key pair correctly', async () => {
        const keyPair = await generateKeyPair('rsa');

        expect(bip39.generateMnemonic).toHaveBeenCalledTimes(1);

        expect(bip39.mnemonicToSeedAsync).toHaveBeenCalledTimes(1);
        expect(bip39.mnemonicToSeedAsync).toHaveBeenCalledWith(mockMnemonic);

        expect(keyPair).toMatchSnapshot();
    });

    it('should generate key pair composed with a different format', async () => {
        const keyPair = await generateKeyPair('rsa', { format: 'pkcs1-der' });

        expect(keyPair).toMatchSnapshot();
    });

    it('should generate key pair composed and encrypted', async () => {
        const encryptionAlgorithm = {
            keyDerivationFunc: 'pbkdf2',
            encryptionScheme: 'aes256-cbc',
        };
        const { privateKey, ...rest } = await generateKeyPair('rsa', { encryptionAlgorithm, password: 'foo' });

        expect(rest).toMatchSnapshot();
        expect(privateKey.includes('BEGIN ENCRYPTED PRIVATE KEY')).toBeTruthy();
    });
});

describe('getKeyPairFromMnemonic', () => {
    it('should generate key pair correctly from mnemonic', async () => {
        const keyPair = await getKeyPairFromMnemonic(mockMnemonic, 'rsa');

        expect(bip39.generateMnemonic).toHaveBeenCalledTimes(0);

        expect(bip39.mnemonicToSeedAsync).toHaveBeenCalledTimes(1);
        expect(bip39.mnemonicToSeedAsync).toHaveBeenCalledWith(mockMnemonic);

        expect(keyPair).toMatchSnapshot();
    });
});

describe('getKeyPairFromSeed', () => {
    it('should generate key pair correctly from seed', async () => {
        const keyPair = await getKeyPairFromSeed(mockSeed, 'rsa');

        expect(bip39.generateMnemonic).toHaveBeenCalledTimes(0);
        expect(bip39.mnemonicToSeedAsync).toHaveBeenCalledTimes(0);

        expect(keyPair).toMatchSnapshot();
    });
});
