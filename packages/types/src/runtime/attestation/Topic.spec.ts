import AttestationTopic from './Topic';

describe('AttestationTopic', () => {
    it('encode a string to u256 and decode back', () => {
        const topicInput = 'any ascii string';
        const topic = new AttestationTopic(topicInput);
        expect(topic.toString()).toEqual(topicInput);
        const topicDecoded = new AttestationTopic(topic.toU8a());
        expect(topicDecoded.toString()).toEqual(topicInput);
        expect(topicDecoded.toU8a()).toEqual(topic.toU8a());
    });

    it('throw when the input exceed length limit', () => {
        const maxAllowedInput = new Array(32).fill('a').join('');
        const topic = new AttestationTopic(maxAllowedInput);
        expect(topic.toString()).toEqual(maxAllowedInput);

        const invalidInput = new Array(33).fill('a').join('');
        expect(() => new AttestationTopic(invalidInput)).toThrow('exceed 32 characters');
    });

    const invalidCharacters = [
        '汉字',
        '\u00A9', // symbol
        '\u007f', // non-printable character
        '\uD83D\uDC36', // emoji
    ];
    for (const input of invalidCharacters) {
        it(`throw when the input contains non-ascii characters: ${input}`, () => {
            expect(() => new AttestationTopic(input)).toThrow('must be an ASCII string');
        });
    }
});
