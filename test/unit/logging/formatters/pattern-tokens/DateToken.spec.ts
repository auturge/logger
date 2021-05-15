import { assert } from 'chai';
import { localDate } from '@test/helpers/dateHelpers';

import { ITokenMatch } from '@src/logging/formatters/pattern-tokens/ITokenMatch';
import { ILogEntry } from '@src/logging/ILogEntry';
import { DateToken } from '@src/logging/formatters/pattern-tokens/DateToken';
import { DateFormat, formatDate } from '@src/functions/formatDate';
import { doesNotMatter } from '@test/objects/test__objects';

describe('DateToken', () => {

    let token;

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
            const pattern = `%{ d  | f:${ DateFormat.DEFAULT } } - %{date | format: ${ DateFormat.ISO } | tz:UTC }`
            const matches = [
                {
                    arguments: [
                        { key: 'format', value: ` ${ DateFormat.ISO } ` },
                        { key: 'tz', value: 'UTC ' } ],
                    endIndex: 97,
                    matched: `%{date | format: ${ DateFormat.ISO } | tz:UTC }`,
                    value: '',
                    tokenType: 'DateToken',
                    startIndex: 42
                },
                {
                    arguments: [ { key: 'f', value: `${ DateFormat.DEFAULT } ` } ],
                    endIndex: 38,
                    matched: `%{ d  | f:${ DateFormat.DEFAULT } }`,
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
                level: doesNotMatter(),
                message: doesNotMatter(),
                source: doesNotMatter(),
                timestamp: localDate
            };
            const match: ITokenMatch = {
                startIndex: doesNotMatter(),
                endIndex: doesNotMatter(),
                tokenType: doesNotMatter(),
                matched: doesNotMatter(),
                value: doesNotMatter(),
                arguments: []
            };
            const expected = formatDate(localDate, DateFormat.DEFAULT);

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
                    level: doesNotMatter(),
                    message: doesNotMatter(),
                    source: doesNotMatter(),
                    timestamp: localDate
                };
                const match: ITokenMatch = {
                    startIndex: doesNotMatter(),
                    endIndex: doesNotMatter(),
                    tokenType: doesNotMatter(),
                    matched: doesNotMatter(),
                    value: doesNotMatter(),
                    arguments: [ { key: 'format', value: format } ]
                };
                const expected = formatDate(localDate, format);

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
                    level: doesNotMatter(),
                    message: doesNotMatter(),
                    source: doesNotMatter(),
                    timestamp: localDate
                };
                const match: ITokenMatch = {
                    startIndex: doesNotMatter(),
                    endIndex: doesNotMatter(),
                    tokenType: doesNotMatter(),
                    matched: doesNotMatter(),
                    value: doesNotMatter(),
                    arguments: [
                        { key: 'format', value: format },
                        { key: 'timezone', value: tz }
                    ]
                };
                const expected = formatDate(localDate, format, tz);

                const result = token.getValue(match, entry);

                assert.equal(result, expected);
            });
        });
    });
})
