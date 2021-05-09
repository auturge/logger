import sinon = require('sinon');
import { assert } from 'chai';

import { TokenDefinition } from '@src/logging/formatters/pattern-tokens/TokenDefinition';
import { ILogEntry } from '@src/logging/ILogEntry';
import { ITokenMatch } from '@src/logging/formatters/pattern-tokens';
import { IStatusData } from '@src/logging/StatusLog/IStatusData';
import { stub, unwrap } from '@test/helpers';

class TestToken extends TokenDefinition {

    protected tokens: string[] = [ 't', 'test' ];

    getValue(match: ITokenMatch, entry: ILogEntry<IStatusData>): string {
        throw new Error('Method not implemented.');
    }
}

describe('TokenDefinition', () => {
    var token;
    var collectMatches;

    function setupTestSuite() {
        token = new TestToken();
    }
    function teardownTestSuite() { }

    describe('getMatches', () => {

        beforeEach(setupTestSuite);
        afterEach(teardownTestSuite);

        it(`getMatches - by default, returns collectMatches`, () => {
            var pattern = "%{test} %{bugs} %{t|42} robble";
            collectMatches = stub(token, 'collectMatches')
                .callsFake((pattern) => { })

            token.getMatches(pattern);

            sinon.assert.calledOnceWithExactly(collectMatches, pattern);
            unwrap(collectMatches);
        });
    });

    describe('collectMatches', () => {

        beforeEach(setupTestSuite);
        afterEach(teardownTestSuite);

        it(`collectMatches - iterates over the tokens, and executes getTokenMatches against the pattern for each token`, () => {
            var pattern = "%{test} %{bugs} %{t|42} robble";

            var result = token[ 'collectMatches' ](pattern);

            // console.log('result');
            // console.log(result);

            assert.equal(result.length, 2);
            assert.deepEqual(result, [
                {
                    arguments: [ '42' ],
                    endIndex: 22,
                    matched: '%{t|42}',
                    value: '',
                    tokenType: 'TestToken',
                    startIndex: 16
                },
                {
                    arguments: [],
                    endIndex: 6,
                    matched: '%{test}',
                    value: '',
                    tokenType: 'TestToken',
                    startIndex: 0
                }
            ]);
        });
    });

    describe('getNextToken', () => {
        beforeEach(setupTestSuite);
        afterEach(teardownTestSuite);

        it(`getNextToken - gets the next token`, () => {
            var pattern = "%{test} %{bugs} %{t|42} robble";

            const result = token[ 'getNextToken' ](pattern);

            assert.equal(result, "%{test}");
        });

        it(`getNextToken - returns empty string if there are no toknes in the given string`, () => {
            var pattern = "howdy doody robble ";

            const result = token[ 'getNextToken' ](pattern);

            assert.equal(result, "");
        });

        it(`getNextToken - doesn't throw when tokens are all good`, () => {
            var pattern = "%{test} %{bugs} %{t|42} robble";

            assert.doesNotThrow(() => {
                token[ 'getNextToken' ](pattern);
            });
        });

        it(`getNextToken - throws when it finds a unclosed token`, () => {
            // in the following pattern, %{bugs is an unclosed token
            var pattern = " %{bugs %{t|42} robble";

            assert.throws(() => {
                token[ 'getNextToken' ](pattern);
            }, `Unclosed token: [%{bugs %{t|42} robble]`);
        });
    });
});
