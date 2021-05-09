import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';
import { localDate } from '@test/helpers/dateHelpers';

import { ITokenMatch } from '@src/logging/formatters/pattern-tokens/ITokenMatch';
import { ILogEntry } from '@src/logging/ILogEntry';
import { LOG_LEVELS } from '@src/logging/LogLevel';
import { DateToken } from '@src/logging/formatters/pattern-tokens/DateToken';
import { DateFormat, formatDate } from '@src/functions/formatDate';



describe('DateToken', () => {

    var token;

    function setupTestSuite() {
        token = new DateToken();
    }

    describe('getMatches', () => {


        beforeEach(setupTestSuite);

        it(`getMatches - [no args] - gets matches for %{d} and %{date}`, () => {
            const pattern = "%{d} - %{date}"
            const matches: ITokenMatch[] = [
                {
                    arguments: [],
                    endIndex: 13,
                    matched: '%{date}',
                    value: '',
                    tokenType: 'DateToken',
                    startIndex: 7
                },
                {
                    arguments: [],
                    endIndex: 3,
                    matched: '%{d}',
                    value: '',
                    tokenType: 'DateToken',
                    startIndex: 0
                }
            ];

            const result = token.getMatches(pattern);

            assert.deepEqual(result, matches);
        });

        it(`getMatches - [with args] - gets matches for %{d} and %{date}`, () => {
            const pattern = `%{ d  | ${ DateFormat.DEFAULT } } - %{date | ${ DateFormat.ISO } | UTC }`
            const matches: ITokenMatch[] = [
                {
                    arguments: [ ` ${ DateFormat.ISO } `, 'UTC' ],
                    endIndex: 84,
                    matched: `%{date | ${ DateFormat.ISO } | UTC }`,
                    value: '',
                    tokenType: 'DateToken',
                    startIndex: 40
                },
                {
                    arguments: [ DateFormat.DEFAULT ],
                    endIndex: 36,
                    matched: `%{ d  | ${ DateFormat.DEFAULT } }`,
                    value: '',
                    tokenType: 'DateToken',
                    startIndex: 0
                }
            ];

            const result = token.getMatches(pattern);

            assert.deepEqual(result, matches);
        });
    });

    describe('getValue', () => {

        beforeEach(setupTestSuite);

        it(`getValue - [no args] - returns the proper value`, () => {

            const entry: ILogEntry = {
                level: AnyRandom.oneOf(LOG_LEVELS),
                message: AnyRandom.string(),
                source: AnyRandom.string(),
                timestamp: localDate
            };
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: 'DateToken',
                matched: '%{d}',
                value: "",
                arguments: []
            };
            var expected = formatDate(localDate, DateFormat.DEFAULT);

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });

        [
            { format: DateFormat.DEFAULT, key: 'DEFAULT' },
            { format: DateFormat.ISO, key: 'ISO' },
            { format: DateFormat.LONG, key: 'LONG' },
            { format: DateFormat.UTC, key: 'UTC' },
        ].forEach(({ format, key }) => {

            it(`getValue - [1 args, ${ key }] - returns the proper value, using the given format string`, () => {

                const entry: ILogEntry = {
                    level: AnyRandom.oneOf(LOG_LEVELS),
                    message: AnyRandom.string(),
                    source: AnyRandom.string(),
                    timestamp: localDate
                };
                const match: ITokenMatch = {
                    startIndex: 18,
                    endIndex: 25,
                    tokenType: 'DateToken',
                    matched: '%{d}',
                    value: "",
                    arguments: [ format ]
                };
                var expected = formatDate(localDate, format);

                const result = token.getValue(match, entry);

                assert.equal(result, expected);
            });
        });

        [
            { format: DateFormat.DEFAULT, tz: 'PST', key: 'DEFAULT' },
            { format: DateFormat.ISO, tz: 'UTC', key: 'ISO' },
            { format: DateFormat.LONG, tz: 'America/New_York', key: 'LONG' },
            { format: DateFormat.UTC, tz: 'GMT', key: 'UTC' },
        ].forEach(({ format, tz, key }) => {

            it(`getValue - [2 args, ${ key }, ${ tz }] - returns the proper value, using the given format string`, () => {

                const entry: ILogEntry = {
                    level: AnyRandom.oneOf(LOG_LEVELS),
                    message: AnyRandom.string(),
                    source: AnyRandom.string(),
                    timestamp: localDate
                };
                const match: ITokenMatch = {
                    startIndex: 18,
                    endIndex: 25,
                    tokenType: 'DateToken',
                    matched: '%{d}',
                    value: "",
                    arguments: [ format, tz ]
                };
                var expected = formatDate(localDate, format, tz);

                const result = token.getValue(match, entry);

                assert.equal(result, expected);
            });
        });

        it(`getValue - throws when there are more than 2 arguments`, () => {

            const entry = {};
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: 'DateToken',
                matched: '%{d}',
                value: '',
                arguments: [ 'foo', 'bar', 'baz' ]
            };

            assert.throws(() => {
                token.getValue(match, entry);
            }, `Token [${ match.tokenType }] takes up to two arguments, but you provided ${ match.arguments.length }.`);
        });
    });
})
