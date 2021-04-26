import { assert } from 'chai';

import { ITokenMatch, TokenMatch } from '@src/logging/impl/formatters/pattern-tokens/ITokenMatch';
import { PatternTokenizer } from '@src/logging/impl/formatters/pattern-tokens/PatternTokenizer';

describe('PatternTokenizer', () => {

    var tokenizer;

    function tokenMatches(expected: TokenMatch, actual: ITokenMatch) {
        const sameType = actual.tokenType == expected.tokenType;
        const sameStart = actual.startIndex == expected.startIndex;
        const sameEnd = actual.endIndex == expected.endIndex;
        const sameValue = actual.value == expected.value;

        return sameType && sameStart && sameEnd && sameValue;
    }

    describe('tokenize', () => {

        beforeEach(() => {
            tokenizer = new PatternTokenizer();
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`tokenize - returns an empty array when input is ${ key }`, () => {
                var pattern = value;

                var tokens = tokenizer.tokenize(pattern);

                assert.deepEqual(tokens, []);
            });
        });

        [
            { pattern: '%{d}', type: 'DateToken' },
            { pattern: '%{date}', type: 'DateToken' },
            { pattern: '%{l}', type: 'LogLevelToken' },
            { pattern: '%{level}', type: 'LogLevelToken' },
            { pattern: '%{m}', type: 'MessageToken' },
            { pattern: '%{message}', type: 'MessageToken' }
        ].forEach(({ pattern, type }) => {
            it(`tokenize - [${ type }:${ pattern }] - gets tokens for trivial pattern`, () => {

                var tokens = tokenizer.tokenize(pattern);

                assert.equal(tokens.length, 1);
                assert.equal(tokens[ 0 ].tokenType, type);
            });
        })

        it(`tokenize - ["[%{d} %{l}] %{m}\\n"] - gets tokens for non trivial pattern`, () => {
            const pattern = "[%{d} %{l}] %{m}\\n";

            var tokens = tokenizer.tokenize(pattern);

            assert.equal(tokens.length, 7);
            assert.isTrue(tokenMatches(tokens[ 0 ], {
                tokenType: 'PatternTextToken',
                startIndex: 0,
                endIndex: 0,
                value: '[',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 1 ], {
                tokenType: 'DateToken',
                startIndex: 1,
                endIndex: 2,
                value: '%{d}', arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 2 ], {
                tokenType: 'PatternTextToken',
                startIndex: 3,
                endIndex: 3,
                value: ' ', arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 3 ], {
                tokenType: 'LogLevelToken',
                startIndex: 4,
                endIndex: 5,
                value: '%{l}', arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 4 ], {
                tokenType: 'PatternTextToken',
                startIndex: 6,
                endIndex: 7,
                value: '] ', arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 5 ], {
                tokenType: 'MessageToken',
                startIndex: 8,
                endIndex: 9,
                value: '%{m}', arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 6 ], {
                tokenType: 'PatternTextToken',
                startIndex: 10,
                endIndex: 11,
                value: '\\n', arguments: []
            }));
        });
    });

    describe('getKnownTokens', () => {

        beforeEach(() => {
            tokenizer = new PatternTokenizer();
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`getKnownTokens - returns an empty array when input is ${ key }`, () => {
                var pattern = value;

                var tokens = tokenizer[ 'getKnownTokens' ](pattern);

                assert.deepEqual(tokens, []);
            });
        });

        [
            { pattern: '%{d}', type: 'DateToken' },
            { pattern: '%{date}', type: 'DateToken' },
            { pattern: '%{l}', type: 'LogLevelToken' },
            { pattern: '%{level}', type: 'LogLevelToken' },
            { pattern: '%{m}', type: 'MessageToken' },
            { pattern: '%{message}', type: 'MessageToken' }
        ].forEach(({ pattern, type }) => {
            it(`getKnownTokens - [${ type }:${ pattern }] - gets tokens for trivial pattern`, () => {

                var tokens = tokenizer[ 'getKnownTokens' ](pattern);

                assert.equal(tokens.length, 1);
                assert.equal(tokens[ 0 ].tokenType, type);
            });
        })

        it(`getKnownTokens - ["[%{d} %{l}] %{m}\\n"] - gets known tokens for non trivial pattern`, () => {
            const pattern = "[%{d} %{l}] %{m}\\n";

            var tokens = tokenizer[ 'getKnownTokens' ](pattern);

            assert.equal(tokens.length, 3);
            assert.isTrue(tokenMatches(tokens[ 0 ], {
                tokenType: 'DateToken',
                startIndex: 1,
                endIndex: 2,
                value: '%{d}',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 1 ], {
                tokenType: 'LogLevelToken',
                startIndex: 4,
                endIndex: 5,
                value: '%{l}',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 2 ], {
                tokenType: 'MessageToken',
                startIndex: 8,
                endIndex: 9,
                value: '%{m}',
                arguments: []
            }));
        });
    });

    describe('getTextTokens', () => {

        beforeEach(() => {
            tokenizer = new PatternTokenizer();
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`getTextTokens - returns an empty array when input is ${ key }`, () => {
                var pattern = value;

                var tokens = tokenizer[ 'getTextTokens' ](pattern);

                assert.deepEqual(tokens, []);
            });
        });

        it(`getTextTokens - ["[%{d} %{l}] %{m}\\n"] - gets text tokens for non trivial pattern`, () => {
            const pattern = "[%{d} %{l}] %{m}\\n";
            const knownTokens = [
                {
                    tokenType: 'DateToken',
                    startIndex: 1,
                    endIndex: 2,
                    value: '%{d}',
                    arguments: []
                }, {
                    tokenType: 'LogLevelToken',
                    startIndex: 4,
                    endIndex: 5,
                    value: '%{l}',
                    arguments: []
                }, {
                    tokenType: 'MessageToken',
                    startIndex: 8,
                    endIndex: 9,
                    value: '%{m}',
                    arguments: []
                }
            ];

            var tokens = tokenizer[ 'getTextTokens' ](pattern, knownTokens);

            assert.equal(tokens.length, 4);
            assert.isTrue(tokenMatches(tokens[ 0 ], {
                tokenType: 'PatternTextToken',
                startIndex: 0,
                endIndex: 0,
                value: '[',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 1 ], {
                tokenType: 'PatternTextToken',
                startIndex: 3,
                endIndex: 3,
                value: ' ',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 2 ], {
                tokenType: 'PatternTextToken',
                startIndex: 6,
                endIndex: 7,
                value: '] ',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 3 ], {
                tokenType: 'PatternTextToken',
                startIndex: 10,
                endIndex: 11,
                value: '\\n',
                arguments: []
            }));
        });
    });
});
