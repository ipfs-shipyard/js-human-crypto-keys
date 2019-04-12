import { generateKeyPair } from '../ed25519';
import { mockSeed } from './mocks';

describe('generateKeyPair', () => {
    it('should generate key pair succesfully', async () => {
        const keyPair = await generateKeyPair({}, mockSeed);

        expect(keyPair).toMatchSnapshot();
    });
});
