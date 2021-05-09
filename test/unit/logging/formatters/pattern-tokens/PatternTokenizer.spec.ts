import { assert } from 'chai';

import { ITokenMatch, TokenMatch } from '@src/logging/formatters/pattern-tokens/ITokenMatch';
import { PatternTokenizer } from '@src/logging/formatters/pattern-tokens/PatternTokenizer';

describe('PatternTokenizer', () => {

    let tokenizer;

    function tokenMatches(expected: TokenMatch, actual: ITokenMatch) {
        assert.equal(actual.tokenType, expected.tokenType, 'wrong token type');
        assert.equal(actual.startIndex, expected.startIndex, 'wrong start index');
        assert.equal(actual.endIndex, expected.endIndex, 'wrong end index');
        assert.equal(actual.value, expected.value, 'wrong value');
        assert.equal(actual.matched, expected.matched, 'wrong matched value');
        return true;
    }

    function setupTestSuite() {
        tokenizer = new PatternTokenizer();
    }

    describe('tokenize', () => {

        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`tokenize - returns an empty array when input is ${ key }`, () => {
                const pattern = value;

                const tokens = tokenizer.tokenize(pattern);

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

                const tokens = tokenizer.tokenize(pattern);

                assert.equal(tokens.length, 1);
                assert.equal(tokens[ 0 ].tokenType, type);
            });
        })

        it(`tokenize - ["[%{d} %{l}] %{m}\\n"] - gets tokens for non trivial pattern`, () => {
            const pattern = "[%{d} %{l}] %{m}\\n";

            const tokens = tokenizer.tokenize(pattern);

            assert.equal(tokens.length, 7);
            tokenMatches(tokens[ 0 ], {
                tokenType: 'PatternTextToken',
                startIndex: 0,
                endIndex: 0,
                value: '[',
                matched: '[',
                arguments: []
            });
            tokenMatches(tokens[ 1 ], {
                tokenType: 'DateToken',
                startIndex: 1,
                endIndex: 4,
                matched: '%{d}',
                value: "",
                arguments: []
            });
            tokenMatches(tokens[ 2 ], {
                tokenType: 'PatternTextToken',
                startIndex: 5,
                endIndex: 5,
                matched: ' ',
                value: ' ',
                arguments: []
            });
            tokenMatches(tokens[ 3 ], {
                tokenType: 'LogLevelToken',
                startIndex: 6,
                endIndex: 9,
                matched: '%{l}',
                value: "",
                arguments: []
            });
            tokenMatches(tokens[ 4 ], {
                tokenType: 'PatternTextToken',
                startIndex: 10,
                endIndex: 11,
                matched: '] ',
                value: '] ',
                arguments: []
            });
            tokenMatches(tokens[ 5 ], {
                tokenType: 'MessageToken',
                startIndex: 12,
                endIndex: 15,
                matched: '%{m}',
                value: "",
                arguments: []
            });
            tokenMatches(tokens[ 6 ], {
                tokenType: 'PatternTextToken',
                startIndex: 16,
                endIndex: 17,
                matched: '\\n',
                value: '\\n',
                arguments: []
            });
        });
    });

    describe('getKnownTokens', () => {

        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`getKnownTokens - returns an empty array when input is ${ key }`, () => {
                const pattern = value;

                const tokens = tokenizer[ 'getKnownTokens' ](pattern);

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

                const tokens = tokenizer[ 'getKnownTokens' ](pattern);

                assert.equal(tokens.length, 1);
                assert.equal(tokens[ 0 ].tokenType, type);
            });
        })

        it(`getKnownTokens - ["[%{d} %{l}] %{m}\\n"] - gets known tokens for non trivial pattern`, () => {
            const pattern = "[%{d} %{l}] %{m}\\n";

            const tokens = tokenizer[ 'getKnownTokens' ](pattern);

            assert.equal(tokens.length, 3);
            assert.isTrue(tokenMatches(tokens[ 0 ], {
                tokenType: 'DateToken',
                startIndex: 1,
                endIndex: 4,
                matched: '%{d}',
                value: '',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 1 ], {
                tokenType: 'LogLevelToken',
                startIndex: 6,
                endIndex: 9,
                matched: '%{l}',
                value: '',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 2 ], {
                tokenType: 'MessageToken',
                startIndex: 12,
                endIndex: 15,
                matched: '%{m}',
                value: '',
                arguments: []
            }));
        });
    });

    describe('getTextTokens', () => {

        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`getTextTokens - returns an empty array when input is ${ key }`, () => {
                const pattern = value;

                const tokens = tokenizer[ 'getTextTokens' ](pattern);

                assert.deepEqual(tokens, []);
            });
        });

        it(`getTextTokens - ["[%{d} %{l}] %{m}\\n"] - gets text tokens for non trivial pattern`, () => {
            const pattern = "[%{d} %{l}] %{m}\\n";
            const knownTokens = [
                {
                    tokenType: 'DateToken',
                    startIndex: 1,
                    endIndex: 4,
                    value: '%{d}',
                    arguments: []
                }, {
                    tokenType: 'LogLevelToken',
                    startIndex: 6,
                    endIndex: 9,
                    value: '%{l}',
                    arguments: []
                }, {
                    tokenType: 'MessageToken',
                    startIndex: 12,
                    endIndex: 15,
                    value: '%{m}',
                    arguments: []
                }
            ];

            const tokens = tokenizer[ 'getTextTokens' ](pattern, knownTokens);

            assert.equal(tokens.length, 4);
            assert.isTrue(tokenMatches(tokens[ 0 ], {
                tokenType: 'PatternTextToken',
                startIndex: 0,
                endIndex: 0,
                value: '[',
                matched: '[',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 1 ], {
                tokenType: 'PatternTextToken',
                startIndex: 5,
                endIndex: 5,
                value: ' ',
                matched: ' ',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 2 ], {
                tokenType: 'PatternTextToken',
                startIndex: 10,
                endIndex: 11,
                matched: '] ',
                value: '] ',
                arguments: []
            }));
            assert.isTrue(tokenMatches(tokens[ 3 ], {
                tokenType: 'PatternTextToken',
                startIndex: 16,
                endIndex: 17,
                matched: '\\n',
                value: '\\n',
                arguments: []
            }));
        });
    });

    describe('throwForUnparsedTokens', () => {

        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`throwForUnparsedTokens - returns when the pattern is ${ key }`, () => {
                // in this example, we're going to pretend that the %{m} token has not been parsed
                const pattern = value;
                const knownTokens = [];

                assert.doesNotThrow(() => {
                    tokenizer[ 'throwForUnparsedTokens' ](pattern, knownTokens);
                });
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined }
        ].forEach(({ key, value }) => {
            it(`throwForUnparsedTokens - handles when 'knownTokens' argument is ${ key }`, () => {
                // in this example, we're going to pretend that the %{m} token has not been parsed
                const pattern = "chicken!";
                const knownTokens = value;

                assert.doesNotThrow(() => {
                    tokenizer[ 'throwForUnparsedTokens' ](pattern, knownTokens);
                });
            });
        });

        it(`throwForUnparsedTokens - ["[%{d} %{l}] %{m}\\n"] - throws when an unparsed token appears in the pattern`, () => {
            // in this example, we're going to pretend that the %{m} token has not been parsed
            const pattern = "[%{d} %{l}] %{m}\\n";
            const knownTokens = [
                {
                    tokenType: 'DateToken',
                    startIndex: 1,
                    endIndex: 4,
                    matched: '%{d}',
                    arguments: []
                }, {
                    tokenType: 'LogLevelToken',
                    startIndex: 6,
                    endIndex: 9,
                    matched: '%{l}',
                    arguments: []
                }
                // , {
                //     tokenType: 'MessageToken',
                //     startIndex: 12,
                //     endIndex: 15,
                //     value: '%{m}',
                //     arguments: []
                // }
            ];

            assert.throws(() => {
                tokenizer[ 'throwForUnparsedTokens' ](pattern, knownTokens);
            }, `Unexpected token in pattern: [${ pattern }].`);
        });

        it(`throwForUnparsedTokens - ["[%{d} %{l}] %{m}\\n"] - does not throw when all tokens in the pattern are included`, () => {
            // in this example, all tokens have been parsed
            const pattern = "[%{d} %{l}] %{m}\\n";
            const knownTokens = [
                {
                    tokenType: 'DateToken',
                    startIndex: 1,
                    endIndex: 4,
                    matched: '%{d}',
                    arguments: []
                }, {
                    tokenType: 'LogLevelToken',
                    startIndex: 6,
                    endIndex: 9,
                    matched: '%{l}',
                    arguments: []
                }, {
                    tokenType: 'MessageToken',
                    startIndex: 12,
                    endIndex: 15,
                    matched: '%{m}',
                    arguments: []
                }
            ];

            assert.doesNotThrow(() => {
                tokenizer[ 'throwForUnparsedTokens' ](pattern, knownTokens);
            })
        });
    });
});
