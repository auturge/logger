import { assert } from 'chai';
import { AnyRandom, CharacterSet } from '@auturge/testing';
import { data } from '@test/objects/test__objects';

import { black, blue, cyan, gray, green, magenta, red, white, yellow } from 'colorette';
import { ILogEntry } from '@src/logging/ILogEntry';
import { LogStatus } from '@src/logging/LogStatus';
import { LogLevel } from '@src/logging/LogLevel';
import { EntryColorizer, noStyle } from '@src/logging/formatters/EntryColorizer';

describe('EntryColorizer', () => {

    describe('getColor', () => {

        [
            { level: LogLevel.FATAL, status: LogStatus.FAILURE, expected: red },
            { level: LogLevel.FATAL, status: LogStatus.SUCCESS, expected: green },//wtf?
            { level: LogLevel.FATAL, status: LogStatus.MARK, expected: magenta },
            { level: LogLevel.FATAL, status: LogStatus.INFO, expected: red },

            { level: LogLevel.ERROR, status: LogStatus.FAILURE, expected: red },
            { level: LogLevel.ERROR, status: LogStatus.SUCCESS, expected: green },//wtf?
            { level: LogLevel.ERROR, status: LogStatus.MARK, expected: magenta },
            { level: LogLevel.ERROR, status: LogStatus.INFO, expected: red },

            { level: LogLevel.WARN, status: LogStatus.FAILURE, expected: red },
            { level: LogLevel.WARN, status: LogStatus.SUCCESS, expected: green },
            { level: LogLevel.WARN, status: LogStatus.MARK, expected: magenta },
            { level: LogLevel.WARN, status: LogStatus.INFO, expected: yellow },

            { level: LogLevel.INFO, status: LogStatus.FAILURE, expected: red },
            { level: LogLevel.INFO, status: LogStatus.SUCCESS, expected: green },
            { level: LogLevel.INFO, status: LogStatus.MARK, expected: magenta },
            { level: LogLevel.INFO, status: LogStatus.INFO, expected: noStyle },

            { level: LogLevel.DEBUG, status: LogStatus.FAILURE, expected: red },
            { level: LogLevel.DEBUG, status: LogStatus.SUCCESS, expected: green },
            { level: LogLevel.DEBUG, status: LogStatus.MARK, expected: magenta },
            { level: LogLevel.DEBUG, status: LogStatus.INFO, expected: cyan },

            { level: LogLevel.TRACE, status: LogStatus.FAILURE, expected: red },
            { level: LogLevel.TRACE, status: LogStatus.SUCCESS, expected: green },
            { level: LogLevel.TRACE, status: LogStatus.MARK, expected: magenta },
            { level: LogLevel.TRACE, status: LogStatus.INFO, expected: noStyle },

        ].forEach(({ level, status, expected }) => {
            it(`formatMessage - [STATUS: ${ status.toString() }, LEVEL: ${ level.toString() }] - returns proper color`, () => {
                const entry: ILogEntry = {
                    message: AnyRandom.string(5, 8, CharacterSet.ALPHA),
                    level: level,
                    source: 'test',
                    data: data(status),
                    timestamp: new Date()
                };

                const result = EntryColorizer.getColor(entry);

                assert.equal(result, expected);
            });
        });

        [
            { level: LogLevel.FATAL, expected: red },
            { level: LogLevel.ERROR, expected: red },
            { level: LogLevel.WARN, expected: yellow },
            { level: LogLevel.INFO, expected: noStyle },
            { level: LogLevel.DEBUG, expected: cyan },
            { level: LogLevel.TRACE, expected: noStyle },

        ].forEach(({ level, expected }) => {
            it(`formatMessage - [LEVEL: ${ level.toString() }, no data] - returns proper color`, () => {
                const entry: ILogEntry = {
                    message: AnyRandom.string(5, 8, CharacterSet.ALPHA),
                    level: level,
                    source: 'test',
                    timestamp: new Date()
                };

                const result = EntryColorizer.getColor(entry);

                assert.equal(result, expected);
            });
        });
    });

    describe('fromString', () => {

        [
            { key: 'black', func: black },
            { key: 'blue', func: blue },
            { key: 'cyan', func: cyan },
            { key: 'gray', func: gray },
            { key: 'green', func: green },
            { key: 'magenta', func: magenta },
            { key: 'red', func: red },
            { key: 'white', func: white },
            { key: 'yellow', func: yellow },
        ].forEach(({ key, func }) => {
            it(`fromString - [${ key }] - returns the expected styling function`, () => {
                const result = EntryColorizer.fromString(key);

                assert.equal(result, func);
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: "" },

        ].forEach(({ key, value }) => {
            it(`fromString - returns the 'noStyle' when the 'value' arg is ${ key }`, () => {
                const arg = <any>value;

                const result = EntryColorizer.fromString(arg);

                assert.equal(result, noStyle);
            });
        })

        it(`fromString - returns the 'noStyle' when the 'value' arg is none of the above`, () => {
            const arg = AnyRandom.string(5, 8, CharacterSet.ALPHA);

            const result = EntryColorizer.fromString(arg);

            assert.equal(result, noStyle);
        });
    });
});

describe('noStyle', () => {
    it('noStyle - given a string, returns the string unchanged', () => {
        const expected = AnyRandom.string(10, 32, CharacterSet.ALPHA);

        const result = noStyle(expected);

        assert.equal(result, expected);
    });
});
