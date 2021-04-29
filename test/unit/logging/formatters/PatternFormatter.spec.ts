import { assert } from 'chai';
import { AnyRandom, CharacterSet } from '@auturge/testing';

import { PatternFormatter } from "@src/logging/formatters/PatternFormatter";
import { ILogEntry, LogLevel } from '@src/logging';
import { LogStatus } from '@src/logging/LogStatus';
import { DateFormat, formatDate } from '@src/functions/formatDate';

describe('PatternFormatter', () => {

    var formatter;

    describe('formatMessage', () => {

        beforeEach(() => {
            formatter = new PatternFormatter();
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined }
        ].forEach(({ key, value }) => {
            it(`formatMessage - throws if entry is ${ key }`, () => {
                const pattern = "[%{d} %{l}] %{m}\\n";
                formatter.pattern = pattern;

                const entry = value;

                assert.throws(() => {
                    formatter.formatMessage(entry);
                });
            });
        });
        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'an empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`formatMessage - returns an empty string when pattern is ${ key }`, () => {
                var pattern = value;
                formatter.pattern = pattern;
                var entry: ILogEntry = {
                    message: 'bob was here!',
                    level: LogLevel.TRACE,
                    data: { status: LogStatus.INFO },
                    source: AnyRandom.string(5, 8, CharacterSet.ALPHA),
                    timestamp: new Date()
                }

                var result = formatter.formatMessage(entry);

                assert.equal(result, "");
            });
        });

        it(`formatMessage - returns the formatted string when pattern is non-trivial`, () => {
            const pattern = "[%{d} %{l}] %{m}\\n";
            formatter.pattern = pattern;
            const entry: ILogEntry = {
                message: 'bob was here!',
                level: LogLevel.TRACE,
                data: { status: LogStatus.INFO },
                source: AnyRandom.string(5, 8, CharacterSet.ALPHA),
                timestamp: new Date()
            }
            const expectedDate = formatDate(entry.timestamp, DateFormat.DEFAULT);
            const expected = `[${ expectedDate } ${ entry.level.toString() }] ${ entry.message }\\n`;

            var result = formatter.formatMessage(entry);

            assert.equal(result, expected);
        });
    });
});
