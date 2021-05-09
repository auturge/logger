import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';

import { IPatternWriterConfig } from '@src/logging/IWriter';
import { stub, unwrap } from '@test/helpers';
import { IStatusEntry } from '@src/logging/StatusLog/IStatusEntry';
import { LogLevel, LOG_LEVELS } from '@src/logging/LogLevel';
import { LOG_STATUSES } from '@src/logging/LogStatus';
import { object } from '@test/objects';
import Sinon = require('sinon');
import sinon = require('sinon');
import { nullWriterFn } from '@src/logging/writers/WriterFn';
import { TerminalWriter } from '@src/logging/writers/TerminalWriter';

describe('TerminalWriter', () => {

    let writer, formatter;
    let formatEntry, getWriterFn, formatMessage, formatData;
    let pattern;

    const entry: IStatusEntry = {
        level: AnyRandom.oneOf(LOG_LEVELS),
        message: AnyRandom.string(20, 30),
        timestamp: new Date(),
        source: AnyRandom.string(5, 8),
        data: {
            status: AnyRandom.oneOf(LOG_STATUSES),
            prettyPrint: AnyRandom.bool(),
            obj: object()
        }
    };

    function setupTestSuite() {
        pattern = "%{l} %{m}"
        writer = new TerminalWriter(pattern);
        formatter = writer.formatter;
    }
    function setupWrite() {
        setupTestSuite();
        formatEntry = stub(writer, 'formatEntry').callsFake(() => { /* Do nothing */ });
        getWriterFn = stub(writer, 'getWriterFunction').callsFake(() => { /* Do nothing */ });
    }
    function setupFormat() {
        setupTestSuite();
        formatMessage = stub(formatter, 'formatMessage').callsFake(() => { /* Do nothing */ });
        formatData = stub(formatter, 'formatData').callsFake(() => { /* Do nothing */ });
    }

    function tearDownWrite() {
        unwrap(formatEntry);
        unwrap(getWriterFn);
    }
    function tearDownFormat() {
        unwrap(formatMessage);
        unwrap(formatData);
    }

    describe('ctor', () => {

        beforeEach(setupTestSuite);

        it(`ctor - with pattern - sets values appropriately`, () => {

            writer = new TerminalWriter(pattern);

            assert.equal(writer.formatter.pattern, pattern);
        });

        it(`ctor - without pattern - sets values appropriately`, () => {
            const expected = "%{l} %{m}";

            writer = new TerminalWriter();

            assert.equal(writer.formatter.pattern, expected);
        });
    });

    describe('reconfigure', () => {

        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
        ].forEach(({ key, value }) => {
            it(`reconfigure - throws when 'config' parameter is ${ key }`, () => {
                const config = <any>value;

                assert.throws(() => {
                    writer.reconfigure(config);
                });
            });
        });

        it(`reconfigure - sets values appropriately`, () => {
            const newPattern = AnyRandom.string(5, 8);
            const config: IPatternWriterConfig = {
                pattern: newPattern
            }

            writer.reconfigure(config);

            assert.equal(writer.formatter.pattern, newPattern);
        });
    });

    describe('write', () => {
        const entry: IStatusEntry = {
            level: AnyRandom.oneOf(LOG_LEVELS),
            message: AnyRandom.string(20, 30),
            timestamp: new Date(),
            source: AnyRandom.string(5, 8),
            data: {
                status: AnyRandom.oneOf(LOG_STATUSES),
                prettyPrint: AnyRandom.bool(),
                obj: object()
            }
        };

        beforeEach(setupWrite);
        afterEach(tearDownWrite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
        ].forEach(({ key, value }) => {
            it(`write - throws when 'entry' parameter is ${ key }`, () => {
                const entry = <any>value;

                assert.throws(() => {
                    writer.write(entry);
                });
            });
        });

        it(`write - with data - formats the entry and passes it to the writer function`, () => {
            const partial = Object.assign({}, entry);
            delete partial.data;
            const message = AnyRandom.string(5, 8);
            const writerFn = sinon.spy();
            getWriterFn.returns(writerFn);
            formatEntry.returns([ message, undefined ]);

            writer.write(entry);

            Sinon.assert.calledOnceWithExactly(formatEntry, entry);
            Sinon.assert.calledOnceWithExactly(getWriterFn, entry.level);
            Sinon.assert.calledOnceWithExactly(writerFn, message);
        });

        it(`write - with data - formats the entry and passes it to the writer function`, () => {
            const message = AnyRandom.string(5, 8);
            const data = AnyRandom.string(5, 8);
            const writerFn = sinon.spy();
            getWriterFn.returns(writerFn);
            formatEntry.returns([ message, data ]);

            writer.write(entry);

            Sinon.assert.calledOnceWithExactly(formatEntry, entry);
            Sinon.assert.calledOnceWithExactly(getWriterFn, entry.level);
            Sinon.assert.callOrder(
                writerFn.withArgs(message),
                writerFn.withArgs(data)
            )
        });
    });

    describe('formatEntry', () => {
        beforeEach(setupFormat);
        afterEach(tearDownFormat);

        it(`formatEntry - gets the message and data from the formatter`, () => {
            const message = AnyRandom.string(5, 8);
            const data = AnyRandom.string(5, 8);
            formatMessage.returns(message);
            formatData.returns(data);

            const [ mresult, dresult ] = writer.formatEntry(entry);

            Sinon.assert.calledOnceWithExactly(formatMessage, entry);
            Sinon.assert.calledOnceWithExactly(formatData, entry);
            assert.equal(mresult, message);
            assert.equal(dresult, data);
        });
    });

    describe('getWriterFunction', () => {
        beforeEach(setupTestSuite);

        [
            { level: LogLevel.FATAL, name: 'error', expected: console.error },
            { level: LogLevel.ERROR, name: 'error', expected: console.error },
            { level: LogLevel.WARN, name: 'warn', expected: console.warn },
            { level: LogLevel.INFO, name: 'info', expected: console.info },
            { level: LogLevel.DEBUG, name: 'info', expected: console.info },
            { level: LogLevel.TRACE, name: 'info', expected: console.info },
            { level: LogLevel.ALL, name: 'info', expected: console.info },
        ]
            .forEach(({ level, name, expected }) => {

                it(`getWriterFunction - given the loglevel ${ level }, returns the method console.${ name }`, () => {

                    const result = writer.getWriterFunction(level);

                    assert.equal(result, expected);
                });

            });

        it(`getWriterFunction - given the loglevel OFF, returns the nullWriter`, () => {

            const result = writer.getWriterFunction(LogLevel.OFF);

            assert.equal(result, nullWriterFn);
        });

        it(`getWriterFunction - given some rando loglevel, throws`, () => {
            const level = new LogLevel(1, 'bugger');

            assert.throws(() => {
                writer.getWriterFunction(level);
            }, `Unrecognized log level [${ level.toString() }].`);
        });
    });
});
