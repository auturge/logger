import sinon = require('sinon');
import { assert } from 'chai';

import { TokenDefinition } from '@src/logging/formatters/pattern-tokens/TokenDefinition';
import { stub, unwrap } from '@test/helpers';
import { ITokenMatch, KNOWN_TOKENS, TokenMatch } from '@src/logging/formatters/pattern-tokens';
import { AnyRandom } from '@auturge/testing';

class TestToken extends TokenDefinition {
    public readonly name = 'TestToken';

    protected tokens: string[] = [ 't', 'test' ];

    getValue(): string {
        throw new Error('Method not implemented.');
    }
}

describe('TokenDefinition', () => {
    let token;
    let collectMatches;

    function setupTestSuite() {
        token = new TestToken();
    }

    describe('getMatches', () => {

        beforeEach(setupTestSuite);

        it(`getMatches - by default, returns collectMatches`, () => {
            const pattern = "%{test} %{bugs} %{t|42} robble";
            collectMatches = stub(token, 'collectMatches')
                .callsFake(() => { /* Do nothing */ })

            token.getMatches(pattern);

            sinon.assert.calledOnceWithExactly(collectMatches, pattern);
            unwrap(collectMatches);
        });
    });

    describe('collectMatches', () => {

        beforeEach(setupTestSuite);

        it(`collectMatches - iterates over the tokens, and executes getTokenMatches against the pattern for each token`, () => {
            const pattern = "%{test} %{bugs} %{t|42} robble";

            const result = token[ 'collectMatches' ](pattern);

            // console.log('result');
            // console.log(result);

            assert.equal(result.length, 2);
            assert.deepEqual(result, [
                {
                    arguments: [ { key: '42' } ],
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

        it(`getNextToken - gets the next token`, () => {
            const pattern = "%{test} %{bugs} %{t|42} robble";

            const result = token[ 'getNextToken' ](pattern);

            assert.equal(result, "%{test}");
        });

        it(`getNextToken - returns empty string if there are no toknes in the given string`, () => {
            const pattern = "howdy doody robble ";

            const result = token[ 'getNextToken' ](pattern);

            assert.equal(result, "");
        });

        it(`getNextToken - doesn't throw when tokens are all good`, () => {
            const pattern = "%{test} %{bugs} %{t|42} robble";

            assert.doesNotThrow(() => {
                token[ 'getNextToken' ](pattern);
            });
        });

        it(`getNextToken - throws when it finds a unclosed token`, () => {
            // in the following pattern, %{bugs is an unclosed token
            const pattern = " %{bugs %{t|42} robble";

            assert.throws(() => {
                token[ 'getNextToken' ](pattern);
            }, `Unclosed token: [%{bugs %{t|42} robble]`);
        });
    });

    describe('getArguments', () => {

        beforeEach(setupTestSuite);

        function randomMatch(matched: string): ITokenMatch {
            const start = AnyRandom.int(0, 10);
            const end = AnyRandom.int(start, 15);
            return {
                arguments: [],
                endIndex: end,
                matched: matched,
                value: '',
                tokenType: AnyRandom.oneOf(KNOWN_TOKENS).name,
                startIndex: start
            }
        }

        [
            { pattern: '%{test}', args: [] },
            { pattern: '%{t|42}', args: [ { key: '42' } ] },
            { pattern: '%{t|color:Red}', args: [ { key: 'color', value: 'Red' } ] },
            { pattern: '%{t|42|color:Red}', args: [ { key: '42' }, { key: 'color', value: 'Red' } ] },
            { pattern: '%{t|len:42|color:Red}', args: [ { key: 'len', value: 42 }, { key: 'color', value: 'Red' } ] }
        ].forEach(({ pattern, args }) => {

            it(`getArguments - given a match of '${ pattern }', returns the proper TokenArguments`, () => {
                const match = randomMatch(pattern);

                // const pattern = "%{test} %{bugs} %{t|42} robble";

                const result = token[ 'getArguments' ](match);

                assert.deepEqual(result, args);
            });
        });
    });
})
