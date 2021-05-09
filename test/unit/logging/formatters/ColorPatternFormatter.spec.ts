import { assert } from 'chai';
import { AnyRandom, CharacterSet } from '@auturge/testing';

import { cyan, green, magenta, red, yellow } from 'colorette';
import { ILogEntry } from '@src/logging/ILogEntry';
import { LogStatus } from '@src/logging/LogStatus';
import { LogLevel } from '@src/logging/LogLevel';
import { ColorPatternFormatter } from '@src/logging/formatters/ColorPatternFormatter';
import { data, formatted, pretty } from '@test/objects/test__objects';
import { IStatusEntry } from '@src/logging/StatusLog/IStatusEntry';

describe('ColorPatternFormatter', () => {

    var formatter;
    const message = AnyRandom.string(5, 8, CharacterSet.ALPHA);

    describe('formatMessage', () => {

        beforeEach(() => {
            formatter = new ColorPatternFormatter();
        });

        [
            { level: LogLevel.FATAL, status: LogStatus.FAILURE, expected: red(message) },
            { level: LogLevel.FATAL, status: LogStatus.SUCCESS, expected: green(message) },//wtf?
            { level: LogLevel.FATAL, status: LogStatus.MARK, expected: magenta(message) },
            { level: LogLevel.FATAL, status: LogStatus.INFO, expected: red(message) },

            { level: LogLevel.ERROR, status: LogStatus.FAILURE, expected: red(message) },
            { level: LogLevel.ERROR, status: LogStatus.SUCCESS, expected: green(message) },//wtf?
            { level: LogLevel.ERROR, status: LogStatus.MARK, expected: magenta(message) },
            { level: LogLevel.ERROR, status: LogStatus.INFO, expected: red(message) },

            { level: LogLevel.WARN, status: LogStatus.FAILURE, expected: red(message) },
            { level: LogLevel.WARN, status: LogStatus.SUCCESS, expected: green(message) },
            { level: LogLevel.WARN, status: LogStatus.MARK, expected: magenta(message) },
            { level: LogLevel.WARN, status: LogStatus.INFO, expected: yellow(message) },

            { level: LogLevel.INFO, status: LogStatus.FAILURE, expected: red(message) },
            { level: LogLevel.INFO, status: LogStatus.SUCCESS, expected: green(message) },
            { level: LogLevel.INFO, status: LogStatus.MARK, expected: magenta(message) },
            { level: LogLevel.INFO, status: LogStatus.INFO, expected: message },

            { level: LogLevel.DEBUG, status: LogStatus.FAILURE, expected: red(message) },
            { level: LogLevel.DEBUG, status: LogStatus.SUCCESS, expected: green(message) },
            { level: LogLevel.DEBUG, status: LogStatus.MARK, expected: magenta(message) },
            { level: LogLevel.DEBUG, status: LogStatus.INFO, expected: cyan(message) },

            { level: LogLevel.TRACE, status: LogStatus.FAILURE, expected: red(message) },
            { level: LogLevel.TRACE, status: LogStatus.SUCCESS, expected: green(message) },
            { level: LogLevel.TRACE, status: LogStatus.MARK, expected: magenta(message) },
            { level: LogLevel.TRACE, status: LogStatus.INFO, expected: message },

        ].forEach(({ level, status, expected }) => {
            it(`formatMessage - [STATUS: ${ status.toString() }, LEVEL: ${ level.toString() }] - returns properly colored message`, () => {
                const entry: ILogEntry = {
                    message: message,
                    level: level,
                    source: 'test',
                    data: data(status),
                    timestamp: new Date()
                };

                const result = formatter.formatMessage(entry);

                assert.equal(result, expected);
            });
        });

    });

    describe('formatData', () => {

        describe('pretty-print', () => {

            beforeEach(() => {
                formatter = new ColorPatternFormatter();
            });

            [
                { level: LogLevel.FATAL, status: LogStatus.FAILURE, expected: red(pretty(data(LogStatus.FAILURE))) },
                { level: LogLevel.FATAL, status: LogStatus.SUCCESS, expected: green(pretty(data(LogStatus.SUCCESS))) },//wtflol?
                { level: LogLevel.FATAL, status: LogStatus.MARK, expected: magenta(pretty(data(LogStatus.MARK))) },
                { level: LogLevel.FATAL, status: LogStatus.INFO, expected: red(pretty(data(LogStatus.INFO))) },

                { level: LogLevel.ERROR, status: LogStatus.FAILURE, expected: red(pretty(data(LogStatus.FAILURE))) },
                { level: LogLevel.ERROR, status: LogStatus.SUCCESS, expected: green(pretty(data(LogStatus.SUCCESS))) },//wtflol?
                { level: LogLevel.ERROR, status: LogStatus.MARK, expected: magenta(pretty(data(LogStatus.MARK))) },
                { level: LogLevel.ERROR, status: LogStatus.INFO, expected: red(pretty(data(LogStatus.INFO))) },

                { level: LogLevel.WARN, status: LogStatus.FAILURE, expected: red(pretty(data(LogStatus.FAILURE))) },
                { level: LogLevel.WARN, status: LogStatus.SUCCESS, expected: green(pretty(data(LogStatus.SUCCESS))) },
                { level: LogLevel.WARN, status: LogStatus.MARK, expected: magenta(pretty(data(LogStatus.MARK))) },
                { level: LogLevel.WARN, status: LogStatus.INFO, expected: yellow(pretty(data(LogStatus.INFO))) },

                { level: LogLevel.INFO, status: LogStatus.FAILURE, expected: red(pretty(data(LogStatus.FAILURE))) },
                { level: LogLevel.INFO, status: LogStatus.SUCCESS, expected: green(pretty(data(LogStatus.SUCCESS))) },
                { level: LogLevel.INFO, status: LogStatus.MARK, expected: magenta(pretty(data(LogStatus.MARK))) },
                { level: LogLevel.INFO, status: LogStatus.INFO, expected: pretty(data(LogStatus.INFO)) },

                { level: LogLevel.DEBUG, status: LogStatus.FAILURE, expected: red(pretty(data(LogStatus.FAILURE))) },
                { level: LogLevel.DEBUG, status: LogStatus.SUCCESS, expected: green(pretty(data(LogStatus.SUCCESS))) },
                { level: LogLevel.DEBUG, status: LogStatus.MARK, expected: magenta(pretty(data(LogStatus.MARK))) },
                { level: LogLevel.DEBUG, status: LogStatus.INFO, expected: cyan(pretty(data(LogStatus.INFO))) },

                { level: LogLevel.TRACE, status: LogStatus.FAILURE, expected: red(pretty(data(LogStatus.FAILURE))) },
                { level: LogLevel.TRACE, status: LogStatus.SUCCESS, expected: green(pretty(data(LogStatus.SUCCESS))) },
                { level: LogLevel.TRACE, status: LogStatus.MARK, expected: magenta(pretty(data(LogStatus.MARK))) },
                { level: LogLevel.TRACE, status: LogStatus.INFO, expected: pretty(data(LogStatus.INFO)) },

            ].forEach(({ level, status, expected }) => {
                it(`formatData - [STATUS: ${ status.toString() }, LEVEL: ${ level.toString() }, PRETTY PRINT] - returns properly colored message`, () => {
                    const entry: ILogEntry = {
                        message: message,
                        level: level,
                        data: data(status, true),
                        source: 'test',
                        timestamp: new Date()
                    };

                    const result = formatter.formatData(entry, true);

                    assert.equal(result, expected);
                });

                it(`formatData - [STATUS: ${ status.toString() }, LEVEL: ${ level.toString() }, NO DATA] - returns undefined`, () => {
                    const entry: ILogEntry = {
                        message: message,
                        level: level,
                        source: 'test',
                        timestamp: new Date()
                    };

                    const result = formatter.formatData(entry, true);

                    assert.equal(result, undefined);
                });
            });
        });

        describe('NO pretty-print', () => {

            beforeEach(() => {
                formatter = new ColorPatternFormatter();
            });

            [
                { level: LogLevel.FATAL, status: LogStatus.FAILURE, expected: red(formatted(data(LogStatus.FAILURE))) },
                { level: LogLevel.FATAL, status: LogStatus.SUCCESS, expected: green(formatted(data(LogStatus.SUCCESS))) },//wtflol?
                { level: LogLevel.FATAL, status: LogStatus.MARK, expected: magenta(formatted(data(LogStatus.MARK))) },
                { level: LogLevel.FATAL, status: LogStatus.INFO, expected: red(formatted(data(LogStatus.INFO))) },

                { level: LogLevel.ERROR, status: LogStatus.FAILURE, expected: red(formatted(data(LogStatus.FAILURE))) },
                { level: LogLevel.ERROR, status: LogStatus.SUCCESS, expected: green(formatted(data(LogStatus.SUCCESS))) },//wtflol?
                { level: LogLevel.ERROR, status: LogStatus.MARK, expected: magenta(formatted(data(LogStatus.MARK))) },
                { level: LogLevel.ERROR, status: LogStatus.INFO, expected: red(formatted(data(LogStatus.INFO))) },

                { level: LogLevel.WARN, status: LogStatus.FAILURE, expected: red(formatted(data(LogStatus.FAILURE))) },
                { level: LogLevel.WARN, status: LogStatus.SUCCESS, expected: green(formatted(data(LogStatus.SUCCESS))) },
                { level: LogLevel.WARN, status: LogStatus.MARK, expected: magenta(formatted(data(LogStatus.MARK))) },
                { level: LogLevel.WARN, status: LogStatus.INFO, expected: yellow(formatted(data(LogStatus.INFO))) },

                { level: LogLevel.INFO, status: LogStatus.FAILURE, expected: red(formatted(data(LogStatus.FAILURE))) },
                { level: LogLevel.INFO, status: LogStatus.SUCCESS, expected: green(formatted(data(LogStatus.SUCCESS))) },
                { level: LogLevel.INFO, status: LogStatus.MARK, expected: magenta(formatted(data(LogStatus.MARK))) },
                { level: LogLevel.INFO, status: LogStatus.INFO, expected: formatted(data(LogStatus.INFO)) },

                { level: LogLevel.DEBUG, status: LogStatus.FAILURE, expected: red(formatted(data(LogStatus.FAILURE))) },
                { level: LogLevel.DEBUG, status: LogStatus.SUCCESS, expected: green(formatted(data(LogStatus.SUCCESS))) },
                { level: LogLevel.DEBUG, status: LogStatus.MARK, expected: magenta(formatted(data(LogStatus.MARK))) },
                { level: LogLevel.DEBUG, status: LogStatus.INFO, expected: cyan(formatted(data(LogStatus.INFO))) },

                { level: LogLevel.TRACE, status: LogStatus.FAILURE, expected: red(formatted(data(LogStatus.FAILURE))) },
                { level: LogLevel.TRACE, status: LogStatus.SUCCESS, expected: green(formatted(data(LogStatus.SUCCESS))) },
                { level: LogLevel.TRACE, status: LogStatus.MARK, expected: magenta(formatted(data(LogStatus.MARK))) },
                { level: LogLevel.TRACE, status: LogStatus.INFO, expected: formatted(data(LogStatus.INFO)) },

            ].forEach(({ level, status, expected }) => {
                it(`formatData - [STATUS: ${ status.toString() }, LEVEL: ${ level.toString() }, NO pretty-print] - returns properly colored message`, () => {
                    const entry: ILogEntry = {
                        message: message,
                        level: level,
                        data: data(status),
                        source: 'test',
                        timestamp: new Date()
                    };

                    const result = formatter.formatData(entry, false);

                    assert.equal(result, expected);
                });

                it(`formatData - [STATUS: ${ status.toString() }, LEVEL: ${ level.toString() }, NO DATA] - returns undefined`, () => {
                    const entry: ILogEntry = {
                        message: message,
                        level: level,
                        source: 'test',
                        timestamp: new Date()
                    };

                    const result = formatter.formatData(entry, false);

                    assert.equal(result, undefined);
                });
            });
        });
    });

    describe('colorData', () => {
        const message = AnyRandom.string(15, 30);
        beforeEach(() => {
            formatter = new ColorPatternFormatter();
        });

        [
            { key: LogStatus.MARK, color: 'magenta', expected: magenta(message) },
            { key: LogStatus.SUCCESS, color: 'green', expected: green(message) },
            { key: LogStatus.FAILURE, color: 'red', expected: red(message) }
        ].forEach(({ key, color, expected }) => {
            it(`colorData - returns ${ color } when status is ${ key }`, () => {
                var entry: IStatusEntry = {
                    data: {
                        status: key
                    },
                    message: 'ignored',
                    timestamp: new Date(),
                    source: 'ignored',
                    level: LogLevel.TRACE
                }

                var result = formatter[ 'colorMessage' ](message, entry);

                assert.equal(result, expected);
            });
        });

        [
            { level: LogLevel.FATAL, color: 'red', expected: red(message) },
            { level: LogLevel.ERROR, color: 'red', expected: red(message) },
            { level: LogLevel.WARN, color: 'yellow', expected: yellow(message) },
            { level: LogLevel.DEBUG, color: 'cyan', expected: cyan(message) },
            { level: LogLevel.INFO, color: 'uncolored', expected: message },
            { level: LogLevel.TRACE, color: 'uncolored', expected: message },
        ].forEach(({ level, color, expected }) => {
            it(`colorData - returns ${ color } when level is ${ level } and status is INFO`, () => {
                var entry: IStatusEntry = {
                    data: {
                        status: LogStatus.INFO
                    },
                    message: 'ignored',
                    timestamp: new Date(),
                    source: 'ignored',
                    level: level
                }

                var result = formatter[ 'colorMessage' ](message, entry);

                assert.equal(result, expected);
            });

            it(`colorData - returns ${ color } when level is ${ level } and includes no data`, () => {
                var entry: IStatusEntry = {
                    message: 'ignored',
                    timestamp: new Date(),
                    source: 'ignored',
                    level: level
                }

                var result = formatter[ 'colorMessage' ](message, entry);

                assert.equal(result, expected);
            });
        });
    });
})
