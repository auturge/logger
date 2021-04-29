import { assert } from 'chai';
import { AnyRandom, CharacterSet } from '@auturge/testing';

import { PatternTextToken } from '@src/logging/formatters/pattern-tokens/PatternTextToken';
import { ITokenMatch } from '@src/logging/formatters/pattern-tokens/ITokenMatch';


describe('PatternTextToken', () => {

    var token;

    describe('getMatches', () => {

        describe('static', () => {
            beforeEach(() => {
                token = new PatternTextToken();
            });

            it(`getMatches - one token - returns proper tokens`, () => {

                const pattern = "x %{d}z";
                const tokens: ITokenMatch[] = [
                    { startIndex: 2, endIndex: 5, tokenType: 'DateToken', matched: '${d}', value: '', arguments: [] },
                ];
                const expected: ITokenMatch[] = [
                    { startIndex: 0, endIndex: 1, tokenType: 'PatternTextToken', matched: 'x ', value: 'x ', arguments: [] },
                    { startIndex: 6, endIndex: 6, tokenType: 'PatternTextToken', matched: 'z', value: 'z', arguments: [] }
                ]

                const result = PatternTextToken.getMatches(pattern, tokens);

                assert.deepEqual(result, expected);
            });

            it(`getMatches - returns proper tokens`, () => {
                const pattern = "%{d} %{l} %{m}";

                const tokens: ITokenMatch[] = [
                    { startIndex: 0, endIndex: 3, tokenType: 'DateToken', matched: '%{d}', value: '', arguments: [] },
                    { startIndex: 5, endIndex: 8, tokenType: 'LogLevelToken', matched: '${l}', value: '', arguments: [] },
                    { startIndex: 10, endIndex: 13, tokenType: 'MessageToken', matched: '${m} ', value: '', arguments: [] },
                ];
                const expected: ITokenMatch[] = [
                    { startIndex: 4, endIndex: 4, tokenType: 'PatternTextToken', matched: ' ', value: ' ', arguments: [] },
                    { startIndex: 9, endIndex: 9, tokenType: 'PatternTextToken', matched: ' ', value: ' ', arguments: [] }
                ]

                const result = PatternTextToken.getMatches(pattern, tokens);

                assert.deepEqual(result, expected);
            });

            it(`getMatches - text before and after - returns proper tokens`, () => {
                const pattern_text_before_and_after = "maximum - %{d}%{l} %{m} - sugar";

                const tokens: ITokenMatch[] = [
                    { startIndex: 10, endIndex: 13, tokenType: 'DateToken', matched: '%{d}', value: '', arguments: [] },
                    { startIndex: 14, endIndex: 17, tokenType: 'LogLevelToken', matched: '%{d}', value: '', arguments: [] },
                    { startIndex: 19, endIndex: 22, tokenType: 'MessageToken', matched: '%{d}', value: '', arguments: [] },
                ];
                const expected: ITokenMatch[] = [
                    { startIndex: 0, endIndex: 9, tokenType: 'PatternTextToken', matched: 'maximum - ', value: 'maximum - ', arguments: [] },
                    { startIndex: 18, endIndex: 18, tokenType: 'PatternTextToken', matched: ' ', value: ' ', arguments: [] },
                    { startIndex: 23, endIndex: 30, tokenType: 'PatternTextToken', matched: ' - sugar', value: ' - sugar', arguments: [] },
                ]

                const result = PatternTextToken.getMatches(pattern_text_before_and_after, tokens);

                assert.deepEqual(result, expected);
            });

            it(`getMatches - text before - returns proper tokens`, () => {
                const pattern_text_before = "maximum - %{d} %{l} %{m}";
                const tokens: ITokenMatch[] = [
                    { startIndex: 10, endIndex: 13, tokenType: 'DateToken', matched: '%{d}', value: '', arguments: [] },
                    { startIndex: 15, endIndex: 18, tokenType: 'LogLevelToken', matched: '%{l}', value: '', arguments: [] },
                    { startIndex: 20, endIndex: 23, tokenType: 'MessageToken', matched: '%{m}', value: '', arguments: [] },
                ];
                const expected: ITokenMatch[] = [
                    { startIndex: 0, endIndex: 9, tokenType: 'PatternTextToken', matched: 'maximum - ', value: 'maximum - ', arguments: [] },
                    { startIndex: 14, endIndex: 14, tokenType: 'PatternTextToken', matched: ' ', value: ' ', arguments: [] },
                    { startIndex: 19, endIndex: 19, tokenType: 'PatternTextToken', matched: ' ', value: ' ', arguments: [] },
                ]

                const result = PatternTextToken.getMatches(pattern_text_before, tokens);

                assert.deepEqual(result, expected);
            });

            it(`getMatches - text after - returns proper tokens`, () => {
                const pattern_text_after = "%{d} %{l} %{m} - sugar";
                const tokens: ITokenMatch[] = [
                    { startIndex: 0, endIndex: 3, tokenType: 'DateToken', matched: '%{d}', value: '', arguments: [] },
                    { startIndex: 5, endIndex: 8, tokenType: 'LogLevelToken', matched: '%{l}', value: '', arguments: [] },
                    { startIndex: 10, endIndex: 13, tokenType: 'MessageToken', matched: '%{m}', value: '', arguments: [] },
                ];
                const expected: ITokenMatch[] = [
                    { startIndex: 4, endIndex: 4, tokenType: 'PatternTextToken', matched: ' ', value: ' ', arguments: [] },
                    { startIndex: 9, endIndex: 9, tokenType: 'PatternTextToken', matched: ' ', value: ' ', arguments: [] },
                    { startIndex: 14, endIndex: 21, tokenType: 'PatternTextToken', matched: ' - sugar', value: ' - sugar', arguments: [] },
                ]

                const result = PatternTextToken.getMatches(pattern_text_after, tokens);

                assert.deepEqual(result, expected);
            });

            it(`getMatches - returns empty list when pattern is empty`, () => {

                const tokens: ITokenMatch[] = [];

                const result = PatternTextToken.getMatches("", tokens);

                assert.deepEqual(result, []);
            });

            it(`getMatches - returns one text token if the whole pattern is text`, () => {

                const pattern = "AN ERROR OCCURRED! LOVE, THE DEV TEAM";
                const tokens: ITokenMatch[] = [];
                const expected: ITokenMatch[] = [ {
                    startIndex: 0,
                    endIndex: pattern.length - 1,
                    matched: pattern,
                    value: pattern,
                    tokenType: 'PatternTextToken',
                    arguments: []
                } ];

                const result = PatternTextToken.getMatches(pattern, tokens);

                assert.deepEqual(result, expected);
            });
        })

        describe('instance', () => {
            beforeEach(() => {
                token = new PatternTextToken();
            });
            it(`getMatches - [INSTANCE] - throws`, () => {
                const pattern = AnyRandom.string(5, 8, CharacterSet.ALPHA);
                assert.throws(() => {
                    token.getMatches(pattern);
                }, "Use the static getMatches method instead.");

            });
        })
    });

    describe('getValue', () => {

        beforeEach(() => {
            token = new PatternTextToken();
        });

        it(`getValue - returns the proper value`, () => {

            const entry = {};
            const match: ITokenMatch = { startIndex: 18, endIndex: 25, tokenType: 'PatternTextToken', matched: ' - sugar', value: ' - sugar', arguments: [] };

            const result = token.getValue(match, entry);

            assert.deepEqual(result, match.value);
        });
    });
})
