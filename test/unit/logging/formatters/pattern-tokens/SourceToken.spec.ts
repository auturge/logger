import sinon = require('sinon');
import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';
import { stub } from '@test/helpers';

import { ITokenMatch } from '@src/logging/formatters/pattern-tokens/ITokenMatch';
import { ILogEntry } from '@src/logging/ILogEntry';
import { EntryColorizer, noStyle } from '@src/logging/formatters/EntryColorizer';
import { doesNotMatter } from '@test/objects/test__objects';
import { SourceToken } from '@src/logging/formatters/pattern-tokens/SourceToken';

describe('SourceToken', () => {

    let token;

    function setupTestSuite() {
        token = new SourceToken();
    }

    describe('getMatches', () => {


        beforeEach(setupTestSuite);

        it(`getMatches - [no args] - gets matches for %{s} and %{source}`, () => {
            const pattern = "%{s} - %{source}"
            const matches: ITokenMatch[] = [
                {
                    arguments: [],
                    endIndex: 15,
                    matched: '%{source}',
                    value: '',
                    tokenType: token.name,
                    startIndex: 7
                },
                {
                    arguments: [],
                    endIndex: 3,
                    matched: '%{s}',
                    value: '',
                    tokenType: token.name,
                    startIndex: 0
                }
            ];

            const result = token.getMatches(pattern);

            assert.deepEqual(result, matches);
        });

        it(`getMatches - [with args] - gets matches for %{l} and %{len} and %{length}`, () => {
            const pattern = `%{s|l:3} - %{ source | len:5 }:: %{ source | length: 7 }`
            const matches: ITokenMatch[] = [
                {
                    arguments: [ { key: 'len', value: 5 } ],
                    endIndex: 29,
                    matched: `%{ source | len:5 }`,
                    value: '',
                    tokenType: token.name,
                    startIndex: 11
                },
                {
                    arguments: [ { key: 'length', value: 7 } ],
                    endIndex: 55,
                    matched: `%{ source | length: 7 }`,
                    value: '',
                    tokenType: token.name,
                    startIndex: 33
                },
                {
                    arguments: [ { key: 'l', value: 3 } ],
                    endIndex: 7,
                    matched: `%{s|l:3}`,
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

        it(`getValue - [no args] - returns the proper value`, () => {

            const entry: ILogEntry = {
                level: doesNotMatter(),
                message: doesNotMatter(),
                source: AnyRandom.string(5, 8),
                timestamp: doesNotMatter()
            };
            const match: ITokenMatch = {
                startIndex: doesNotMatter(),
                endIndex: doesNotMatter(),
                tokenType: doesNotMatter(),
                matched: doesNotMatter(),
                value: doesNotMatter(),
                arguments: []
            };
            const expected = entry.source;

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });

        it(`getValue - [color] - returns the proper value, using the given color`, () => {
            const colorStr = AnyRandom.string(5, 8);
            const color = noStyle;
            const getColor = stub(EntryColorizer, 'fromString').returns(color);
            const entry: ILogEntry = {
                level: doesNotMatter(),
                message: doesNotMatter(),
                source: AnyRandom.string(),
                timestamp: doesNotMatter()
            };
            const match: ITokenMatch = {
                startIndex: doesNotMatter(),
                endIndex: doesNotMatter(),
                tokenType: doesNotMatter(),
                matched: doesNotMatter(),
                value: doesNotMatter(),
                arguments: [ { key: `color`, value: colorStr } ]
            };
            const expected = color(entry.source.toString());

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
            sinon.assert.calledOnceWithExactly(getColor, colorStr);
        });

        it(`getValue - [len, too short, needs padding] - returns the proper value, using the given format string`, () => {
            const length = 15;
            const entry: ILogEntry = {
                level: doesNotMatter(),
                message: doesNotMatter(),
                source: AnyRandom.string(3, 5),
                timestamp: doesNotMatter()
            };
            const match: ITokenMatch = {
                startIndex: doesNotMatter(),
                endIndex: doesNotMatter(),
                tokenType: doesNotMatter(),
                matched: doesNotMatter(),
                value: doesNotMatter(),
                arguments: [ { key: 'len', value: length } ]
            };
            const expected = entry.source.padEnd(length).slice(0, length);

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });


        it(`getValue - [len, too long, needs trimming] - returns the proper value, using the given format string`, () => {
            const length = 3;
            const entry: ILogEntry = {
                level: doesNotMatter(),
                message: doesNotMatter(),
                source: AnyRandom.string(length + 5, length + 10),
                timestamp: doesNotMatter()
            };
            const match: ITokenMatch = {
                startIndex: doesNotMatter(),
                endIndex: doesNotMatter(),
                tokenType: doesNotMatter(),
                matched: doesNotMatter(),
                value: doesNotMatter(),
                arguments: [ { key: 'len', value: length } ]
            };
            const expected = entry.source.padEnd(length).slice(0, length);

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });

        it(`getValue - [len, juuuuust right] - returns the proper value, using the given format string`, () => {
            const length = 7;
            const entry: ILogEntry = {
                level: doesNotMatter(),
                message: doesNotMatter(),
                source: AnyRandom.string(length, length),
                timestamp: doesNotMatter()
            };
            const match: ITokenMatch = {
                startIndex: doesNotMatter(),
                endIndex: doesNotMatter(),
                tokenType: doesNotMatter(),
                matched: doesNotMatter(),
                value: doesNotMatter(),
                arguments: [ { key: 'len', value: length } ]
            };
            const expected = entry.source;

            const result = token.getValue(match, entry);

            assert.equal(result, expected);
        });
    });
})
