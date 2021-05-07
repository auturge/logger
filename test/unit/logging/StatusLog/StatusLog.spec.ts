import sinon = require('sinon');
import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';
import { stub, unwrap } from '@test/helpers';
import { bool, object, string, TEST_CHANNEL_1, TEST_CHANNEL_2 } from '@test/objects';

import { IStatusLog, StatusLog } from '@src/logging/StatusLog/StatusLog';
import { LogLevel, LOG_LEVELS } from '@src/logging/LogLevel';
import { LogStatus } from '@src/logging';
import { LOG_STATUSES } from '@src/logging/LogStatus';
import { IStatusEntry } from '@src/logging/StatusLog/IStatusEntry';


describe('StatusLog', () => {

    var log;
    var buildAndWrite, reconfigured;
    var level, status, message, obj, prettyPrint, logName, timestamp;

    function clearLevels(log: IStatusLog) {
        log.channels.forEach((channel) => {
            channel[ '_level' ] = undefined;
        });
    }

    function setupTestSuite() {
        obj = object();
        prettyPrint = AnyRandom.boolean();
        level = AnyRandom.oneOf(LOG_LEVELS);
        status = AnyRandom.oneOf(LOG_STATUSES);
        message = AnyRandom.string();
        logName = AnyRandom.string(5, 8);
        timestamp = new Date();

        log = new StatusLog(logName, [ TEST_CHANNEL_1, TEST_CHANNEL_2 ]);

        log[ '_dateStamper' ] = () => timestamp;
        reconfigured = stub(log.reconfigured, 'emit').callsFake((arg) => { });
    }

    function setupBuildAndWrite() {
        setupTestSuite();

        buildAndWrite = stub(log, 'buildAndWrite')
            .callsFake((level, status, msg, obj, pretty) => { });
    }

    function tearDownSuite() {
        unwrap(reconfigured);
    }

    function tearDownBuildAndWrite() {
        unwrap(buildAndWrite);
    }

    describe('ctor', () => {

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`ctor - throws when 'name' parameter is ${ key }`, () => {
                const name = <any>value;
                const channels = [ TEST_CHANNEL_1 ];

                assert.throws(() => {
                    new StatusLog(name, channels);
                });
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty array', value: [] },
        ].forEach(({ key, value }) => {
            it(`ctor - throws when 'channels' parameter is ${ key }`, () => {
                const name = AnyRandom.string(5, 8);
                const channels = <any>value;

                assert.throws(() => {
                    new StatusLog(name, channels);
                });
            });
        });

        it(`ctor - sets values appropriately`, () => {
            const name = AnyRandom.string(5, 8);
            const channels = [ TEST_CHANNEL_2 ];

            log = new StatusLog(name, channels);

            assert.equal(log.name, name);
            assert.deepEqual(log.channels, channels);
        });
    });

    describe('setLevel', () => {

        beforeEach(setupTestSuite);
        afterEach(tearDownSuite);

        [
            { level: LogLevel.OFF },
            { level: LogLevel.FATAL },
            { level: LogLevel.ERROR },
            { level: LogLevel.WARN },
            { level: LogLevel.INFO },
            { level: LogLevel.DEBUG },
            { level: LogLevel.TRACE },
            { level: LogLevel.ALL },
        ].forEach(({ level }) => {

            it(`setLevel - [${ level }] - sets the level on every channel`, () => {
                clearLevels(log);

                log.setLevel(level);

                log.channels.forEach(channel => {
                    assert.deepEqual(channel.level, level);
                });
            });
        });
    });

    describe('enabled', () => {
        beforeEach(setupTestSuite);
        afterEach(tearDownSuite);

        [
            { value: true },
            { value: false }
        ].forEach(({ value }) => {

            it(`enabled - [${ value }] - enables or disables the logger`, () => {
                log[ '_enabled' ] = undefined;

                log.enabled = value;

                assert.equal(log[ '_enabled' ], value);
                assert.equal(log.enabled, value);
                sinon.assert.calledOnceWithExactly(reconfigured, log);
            });
        });

        it(`enabled - does nothing if the value is not different`, () => {
            var value = bool();
            log[ '_enabled' ] = value;

            log.enabled = value;

            assert.equal(log[ '_enabled' ], value);
            assert.equal(log.enabled, value);
            sinon.assert.notCalled(reconfigured);
        });
    });

    describe('fatal', () => {

        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`fatal - 3 args - calls buildAndWrite with the expected values`, () => {

            log.fatal(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.FATAL, LogStatus.INFO, message, obj, prettyPrint);
        });

        it(`fatal - 2 args - calls buildAndWrite with the expected values`, () => {

            log.fatal(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.FATAL, LogStatus.INFO, message, obj, undefined);
        });

        it(`fatal - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.fatal(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.FATAL, LogStatus.INFO, message, undefined, undefined);
        });
    });

    describe('error', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`error - 3 args - calls buildAndWrite with the expected values`, () => {

            log.error(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.ERROR, LogStatus.INFO, message, obj, prettyPrint);
        });

        it(`error - 2 args - calls buildAndWrite with the expected values`, () => {

            log.error(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.ERROR, LogStatus.INFO, message, obj, undefined);
        });

        it(`error - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.error(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.ERROR, LogStatus.INFO, message, undefined, undefined);
        });
    });

    describe('warn', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`warn - 3 args - calls buildAndWrite with the expected values`, () => {

            log.warn(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.WARN, LogStatus.INFO, message, obj, prettyPrint);
        });

        it(`warn - 2 args - calls buildAndWrite with the expected values`, () => {

            log.warn(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.WARN, LogStatus.INFO, message, obj, undefined);
        });

        it(`warn - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.warn(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.WARN, LogStatus.INFO, message, undefined, undefined);
        });
    });

    describe('info', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`info - 3 args - calls buildAndWrite with the expected values`, () => {

            log.info(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.INFO, message, obj, prettyPrint);
        });

        it(`info - 2 args - calls buildAndWrite with the expected values`, () => {

            log.info(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.INFO, message, obj, undefined);
        });

        it(`info - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.info(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.INFO, message, undefined, undefined);
        });
    });

    describe('debug', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`debug - 3 args - calls buildAndWrite with the expected values`, () => {

            log.debug(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.DEBUG, LogStatus.INFO, message, obj, prettyPrint);
        });

        it(`debug - 2 args - calls buildAndWrite with the expected values`, () => {

            log.debug(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.DEBUG, LogStatus.INFO, message, obj, undefined);
        });

        it(`debug - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.debug(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.DEBUG, LogStatus.INFO, message, undefined, undefined);
        });
    });

    describe('trace', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`trace - 3 args - calls buildAndWrite with the expected values`, () => {

            log.trace(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.TRACE, LogStatus.INFO, message, obj, prettyPrint);
        });

        it(`trace - 2 args - calls buildAndWrite with the expected values`, () => {

            log.trace(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.TRACE, LogStatus.INFO, message, obj, undefined);
        });

        it(`trace - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.trace(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.TRACE, LogStatus.INFO, message, undefined, undefined);
        });
    });

    describe('mark', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`mark - 3 args - calls buildAndWrite with the expected values`, () => {

            log.mark(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.MARK, message, obj, prettyPrint);
        });

        it(`mark - 2 args - calls buildAndWrite with the expected values`, () => {

            log.mark(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.MARK, message, obj, undefined);
        });

        it(`mark - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.mark(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.MARK, message, undefined, undefined);
        });
    });

    describe('success', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`success - 3 args - calls buildAndWrite with the expected values`, () => {

            log.success(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.SUCCESS, message, obj, prettyPrint);
        });

        it(`success - 2 args - calls buildAndWrite with the expected values`, () => {

            log.success(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.SUCCESS, message, obj, undefined);
        });

        it(`success - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.success(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.SUCCESS, message, undefined, undefined);
        });
    });

    describe('failure', () => {
        beforeEach(setupBuildAndWrite);
        afterEach(tearDownBuildAndWrite);

        it(`failure - 3 args - calls buildAndWrite with the expected values`, () => {

            log.failure(message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.FAILURE, message, obj, prettyPrint);
        });

        it(`failure - 2 args - calls buildAndWrite with the expected values`, () => {

            log.failure(message, obj);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.FAILURE, message, obj, undefined);
        });

        it(`failure - 1 arg - calls buildAndWrite with the expected values`, () => {

            log.failure(message);

            sinon.assert.calledOnceWithExactly(buildAndWrite, LogLevel.INFO, LogStatus.FAILURE, message, undefined, undefined);
        });
    });

    describe(`buildAndWrite`, () => {

        var buildEntry, output;
        beforeEach(() => {
            setupTestSuite();
            buildEntry = stub(log, 'buildEntry').callsFake((level, status, msg, obj, pretty) => { });
            output = stub(log, 'output').callsFake((entry) => { });
        });
        afterEach(() => {
            tearDownSuite();
            unwrap(output);
            unwrap(buildEntry);
        });

        it(`buildAndWrite - does nothing if the logger is not enabled`, () => {
            log.enabled = false;

            log.buildAndWrite(AnyRandom.oneOf(LOG_LEVELS), AnyRandom.oneOf(LOG_STATUSES), message, obj, prettyPrint);

            sinon.assert.notCalled(buildEntry);
            sinon.assert.notCalled(output);
        });

        it(`buildAndWrite - builds and outputs the entry`, () => {
            log.enabled = true;
            const level = AnyRandom.oneOf(LOG_LEVELS);
            const status = AnyRandom.oneOf(LOG_STATUSES);
            const message = AnyRandom.string();
            const source = AnyRandom.string();
            const timestamp = new Date();
            const prettyPrint = AnyRandom.boolean();
            const obj = object();
            const entry: IStatusEntry = {
                data: {
                    status: status, obj: obj, prettyPrint: prettyPrint
                },
                level: level,
                message: message,
                source: source,
                timestamp: timestamp
            }
            buildEntry.returns(entry);

            log.buildAndWrite(level, status, message, obj, prettyPrint);

            sinon.assert.calledOnceWithExactly(buildEntry, level, status, message, obj, prettyPrint);
            sinon.assert.calledOnceWithExactly(output, entry);
        });
    });

    describe(`buildEntry`, () => {

        beforeEach(setupTestSuite);
        afterEach(tearDownSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined }
        ].forEach(({ key, value }) => {
            it(`buildEntry - throws when 'level' parameter is ${ key }`, () => {
                const level = <any>value;

                assert.throws(() => {
                    log[ 'buildEntry' ](level, status, message, obj, prettyPrint);
                });
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined }
        ].forEach(({ key, value }) => {
            it(`buildEntry - throws when 'status' parameter is ${ key }`, () => {
                const status = <any>value;

                assert.throws(() => {
                    log[ 'buildEntry' ](level, status, message, obj, prettyPrint);
                });
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined }
        ].forEach(({ key, value }) => {
            it(`buildEntry - throws when 'message' parameter is ${ key }`, () => {
                const message = <any>value;

                assert.throws(() => {
                    log[ 'buildEntry' ](level, status, message, obj, prettyPrint);
                });
            });
        });


        it(`buildEntry - 5 args - returns the proper entry`, () => {
            const expected: IStatusEntry = {
                level: level,
                source: logName,
                message: message,
                data: {
                    status: status, obj: obj, prettyPrint: prettyPrint
                },
                timestamp: timestamp
            }

            const result = log[ 'buildEntry' ](level, status, message, obj, prettyPrint);

            assert.deepEqual(result, expected);
        });

        it(`buildEntry - 4 args - returns the proper entry`, () => {
            const expected: IStatusEntry = {
                level: level,
                source: logName,
                message: message,
                data: {
                    status: status, obj: obj, prettyPrint: false
                },
                timestamp: timestamp
            }

            const result = log[ 'buildEntry' ](level, status, message, obj);

            assert.deepEqual(result, expected);
        });

        it(`buildEntry - 3 args - returns the proper entry`, () => {
            const expected: IStatusEntry = {
                level: level,
                source: logName,
                message: message,
                data: {
                    status: status, obj: undefined, prettyPrint: false
                },
                timestamp: timestamp
            }

            const result = log[ 'buildEntry' ](level, status, message);

            assert.deepEqual(result, expected);
        });
    });

    describe(`output`, () => {

        var channel1, channel2;
        const entry: IStatusEntry = {
            level: level,
            source: logName,
            message: message,
            data: {
                status: status, obj: obj, prettyPrint: prettyPrint
            },
            timestamp: timestamp
        }

        beforeEach(() => {
            setupTestSuite();
            channel1 = stub(log.channels[ 0 ], 'log').callsFake((entry) => { });
            channel2 = stub(log.channels[ 1 ], 'log').callsFake((entry) => { });

        });
        afterEach(() => {
            tearDownSuite();
            unwrap(channel1);
            unwrap(channel2);
        });

        it(`output - does nothing if the logger is disabled`, () => {
            log.enabled = false;

            log[ 'output' ](entry);

            sinon.assert.notCalled(channel1);
            sinon.assert.notCalled(channel2);
        });

        it(`output - sends the entry to every channel`, () => {
            log.enabled = true;

            log[ 'output' ](entry);

            sinon.assert.calledOnceWithExactly(channel1, entry);
            sinon.assert.calledOnceWithExactly(channel2, entry);
        });
    });
});
