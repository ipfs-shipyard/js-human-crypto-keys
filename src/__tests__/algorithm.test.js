import parseAlgorithm from '../algorithm';

describe('parseAlgorithm', () => {
    it('should parse correctly', () => {
        const parsed = parseAlgorithm({ id: 'rsa' });

        expect(parsed).toMatchSnapshot();
    });

    it('should support keyAlgorithm as string', () => {
        const parsed = parseAlgorithm('rsa');

        expect(parsed).toMatchSnapshot();
    });

    it('should get type if unsupported algorithm id is passed', () => {
        const parsed = parseAlgorithm('rsaes-oaep');

        expect(parsed).toMatchSnapshot();
    });

    it('should fail with an unknown algorithm', () => {
        expect.assertions(2);

        try {
            parseAlgorithm('foo');
        } catch (err) {
            expect(err.message).toBe('Unknown algorithm `foo`');
            expect(err.code).toBe('UNKNOWN_ALGORITHM');
        }
    });

    describe('buildParams', () => {
        it('should build params correctly', () => {
            const parsed = parseAlgorithm({ id: 'rsa', modulusLength: 4096 });

            expect(parsed.params).toEqual({
                modulusLength: 4096,
                publicExponent: 65537,
                method: 'PRIMEINC',
            });
        });

        it('should not allow unknown params', () => {
            expect.assertions(2);

            try {
                parseAlgorithm({ id: 'rsa', foo: 'bar' });
            } catch (err) {
                expect(err.message).toBe('Unknown algorithm param `foo`');
                expect(err.code).toBe('UNKNOWN_ALGORITHM_PARAM');
            }
        });

        it('should not allow nullish values', () => {
            expect.assertions(2);

            try {
                parseAlgorithm({ id: 'rsa', modulusLength: null });
            } catch (err) {
                expect(err.message).toBe('Algorithm param `modulusLength` can\'t be null or undefined');
                expect(err.code).toBe('NIL_ALGORITHM_PARAM');
            }
        });

        it('should not allow different types', () => {
            expect.assertions(2);

            try {
                parseAlgorithm({ id: 'rsa', modulusLength: '4096' });
            } catch (err) {
                expect(err.message).toBe('Expected algorithm param `modulusLength` to be of type `number`');
                expect(err.code).toBe('TYPE_ALGORITHM_PARAM');
            }
        });
    });
});
