import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';
import { TokenMatch } from '@src/logging/impl/formatters/pattern-tokens/ITokenMatch';
import { KNOWN_TOKENS } from '@src/logging/impl/formatters/pattern-tokens/TOKENS';

describe('TokenMatch', () => {

    describe('constructor', () => {

        it(`constructor - [3 args] - creates the match properly`, () => {
            const token = AnyRandom.oneOf(KNOWN_TOKENS);

            const startIndex = AnyRandom.int(0, 8);
            const endIndex = AnyRandom.int(startIndex, 10);

            const result = new TokenMatch(token, startIndex, endIndex);

            assert.equal(result.endIndex, endIndex);
            assert.equal(result.startIndex, startIndex);
            assert.equal(result.tokenType, token.constructor.name);
        });

        it(`constructor - [2 args] - creates the match properly`, () => {
            const token = AnyRandom.oneOf(KNOWN_TOKENS);

            const startIndex = AnyRandom.int(0, 8);

            const result = new TokenMatch(token, startIndex);

            assert.isUndefined(result.endIndex);
            assert.equal(result.startIndex, startIndex);
            assert.equal(result.tokenType, token.constructor.name);
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined }
        ].forEach(({ key, value }) => {

            it(`constructor - throws when token is ${ key }`, () => {
                const token = <any>value;
                const startIndex = AnyRandom.int(0, 8);

                assert.throws(() => {
                    new TokenMatch(token, startIndex);
                })
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'less than zero', value: -2 }
        ].forEach(({ key, value }) => {

            it(`constructor - throws when startIndex is ${ key }`, () => {
                const token = AnyRandom.oneOf(KNOWN_TOKENS);
                const startIndex = <any>value;

                assert.throws(() => {
                    new TokenMatch(token, startIndex);
                })
            });
        });

        it(`constructor - throws when endIndex is less than startIndex`, () => {
            const token = AnyRandom.oneOf(KNOWN_TOKENS);
            const startIndex = AnyRandom.int(5, 10);
            const endIndex = startIndex - 1;

            assert.throws(() => {
                new TokenMatch(token, startIndex, endIndex);
            }, 'endIndex must not be less than startIndex.');
        });
    });

    describe('length', () => {

        it(`length - returns endIndex - startIndex + 1`, () => {
            const token = AnyRandom.oneOf(KNOWN_TOKENS);
            const startIndex = AnyRandom.int(0, 8);
            const endIndex = AnyRandom.int(startIndex, 10);
            const match = new TokenMatch(token, startIndex, endIndex);

            const result = match.length;

            assert.equal(result, endIndex - startIndex + 1);
        });

        it(`constructor - throws if endIndex is undefined`, () => {
            const token = AnyRandom.oneOf(KNOWN_TOKENS);
            const startIndex = AnyRandom.int(0, 8);
            const match = new TokenMatch(token, startIndex);

            assert.throws(() => {
                match.length;
            });
        });
    });
})
