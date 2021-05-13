import sinon = require('sinon');
import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';
import { localDate } from '@test/helpers/dateHelpers';
import { stub } from '@test/helpers';

import { ITokenMatch } from '@src/logging/formatters/pattern-tokens/ITokenMatch';
import { ILogEntry } from '@src/logging/ILogEntry';
import { LogLevel, LOG_LEVELS } from '@src/logging/LogLevel';
import { LogLevelToken } from '@src/logging/formatters/pattern-tokens/LogLevelToken';
import { EntryColorizer, noStyle } from '@src/logging/formatters/EntryColorizer';

describe('LogLevelToken', () => {

    let token;

    function setupTestSuite() {
        token = new LogLevelToken();
    }

    describe('getMatches', () => {


        beforeEach(setupTestSuite);

        it(`getMatches - [no args] - gets matches for %{l} and %{level}`, () => {
            const pattern = "%{l} - %{level}"
            const matches: ITokenMatch[] = [
                {
                    arguments: [],
                    endIndex: 14,
                    matched: '%{level}',
                    value: '',
                    tokenType: token.name,
                    startIndex: 7
                },
                {
                    arguments: [],
                    endIndex: 3,
                    matched: '%{l}',
                    value: '',
                    tokenType: token.name,
                    startIndex: 0
                }
            ];

            const result = token.getMatches(pattern);

            assert.deepEqual(result, matches);
        });

        it(`getMatches - [with args] - gets matches for %{l} and %{level}`, () => {
            const pattern = `%{l|color} - %{ level | color }`
            const matches: ITokenMatch[] = [
                {
                    arguments: [ 'color' ],
                    endIndex: 30,
                    matched: `%{ level | color }`,
                    value: '',
                    tokenType: token.name,
                    startIndex: 13
                },
                {
                    arguments: [ 'color' ],
                    endIndex: 9,
                    matched: `%{l|color}`,
                    value: '',
                    tokenType: token.name,
                    startIndex: 0
                }
            ];

            const result = token.getMatches(pattern);

            assert.deepEqual(result, matches);
        });
    });

    describe('getValue', () => {

        beforeEach(setupTestSuite);

        it(`getValue - [no args] - returns the proper value (UNCOLORED)`, () => {

            const entry: ILogEntry = {
                level: AnyRandom.oneOf(LOG_LEVELS),
                message: AnyRandom.string(),
                source: AnyRandom.string(),
                timestamp: localDate
            };
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: token.name,
                matched: '%{l}',
                value: "",
                arguments: []
            };
            const expected = entry.level.toString().padEnd(5).slice(0, 5);

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });

        it(`getValue - [color] - returns the proper value, using the given format string`, () => {
            const length = 5;
            const color = noStyle;
            const getColor = stub(EntryColorizer, 'getColor').returns(color);
            const entry: ILogEntry = {
                level: AnyRandom.oneOf(LOG_LEVELS),
                message: AnyRandom.string(),
                source: AnyRandom.string(),
                timestamp: localDate
            };
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: token.name,
                matched: `%{ level | color }`,
                value: "",
                arguments: [ `color` ]
            };
            const expected = color(entry.level.toString().padEnd(length).slice(0, length));

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
            sinon.assert.calledOnceWithExactly(getColor, entry);
        });

        it(`getValue - [len, too short] - returns the proper value, using the given format string`, () => {
            const length = 3;
            const entry: ILogEntry = {
                level: AnyRandom.oneOf(LOG_LEVELS),
                message: AnyRandom.string(),
                source: AnyRandom.string(),
                timestamp: localDate
            };
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: token.name,
                matched: `%{ level | len:${ length } }`,
                value: "",
                arguments: [ `len:${ length }` ]
            };
            const expected = entry.level.toString().padEnd(length).slice(0, length);

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });


        it(`getValue - [len, too long] - returns the proper value, using the given format string`, () => {
            const TREMENDOUS = new LogLevel(42, "TREMENDOUS");
            const length = 3;
            const entry: ILogEntry = {
                level: TREMENDOUS,
                message: AnyRandom.string(),
                source: AnyRandom.string(),
                timestamp: localDate
            };
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: token.name,
                matched: `%{ level | len:${ length } }`,
                value: "",
                arguments: [ `len:${ length }` ]
            };
            const expected = entry.level.toString().padEnd(length).slice(0, length);

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });
    });
})
