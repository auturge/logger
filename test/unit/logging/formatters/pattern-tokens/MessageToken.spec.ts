import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';

import { ITokenMatch } from '@src/logging/formatters/pattern-tokens/ITokenMatch';
import { MessageToken } from '@src/logging/formatters/pattern-tokens/MessageToken';
import { ILogEntry } from '@src/logging/ILogEntry';
import { LOG_LEVELS } from '@src/logging/LogLevel';


describe('MessageToken', () => {

    let token;

    function setupTestSuite() {
        token = new MessageToken();
    }

    describe('getMatches', () => {


        beforeEach(setupTestSuite);

        it(`getMatches - gets matches for %{m} and %{message}`, () => {
            const pattern = "%{m} - %{message}"
            const matches: ITokenMatch[] = [
                {
                    arguments: [],
                    endIndex: 16,
                    matched: '%{message}',
                    value: '',
                    tokenType: 'MessageToken',
                    startIndex: 7
                },
                {
                    arguments: [],
                    endIndex: 3,
                    matched: '%{m}',
                    value: '',
                    tokenType: 'MessageToken',
                    startIndex: 0
                }
            ];

            const result = token.getMatches(pattern);

            assert.deepEqual(result, matches);
        });
    });

    describe('getValue', () => {

        beforeEach(setupTestSuite);

        it(`getValue - returns the proper value`, () => {

            const entry: ILogEntry = {
                level: AnyRandom.oneOf(LOG_LEVELS),
                message: AnyRandom.string(),
                source: AnyRandom.string(),
                timestamp: AnyRandom.date()
            };
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: 'MessageToken',
                matched: '%{m}',
                value: "",
                arguments: []
            };

            const result = token.getValue(match, entry);

            assert.equal(result, entry.message);
        });

        it(`getValue - throws when there are arguments`, () => {

            const entry = {};
            const match: ITokenMatch = {
                startIndex: 18,
                endIndex: 25,
                tokenType: 'MessageToken',
                matched: 'jonesey',
                value: '${m}',
                arguments: [ 'foo' ]
            };

            assert.throws(() => {
                token.getValue(match, entry);
            }, `Token [${ match.tokenType }] does not support arguments.`);
        });
    });
})
