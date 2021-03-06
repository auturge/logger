import Sinon = require('sinon');
import { assert } from 'chai';
import { AnyRandom, CharacterSet } from '@auturge/testing';

import { stub, unwrap } from '@test/helpers';
import { channel } from '@test/objects/test__objects';
import { NULL } from '@test/objects/NullWriter';

import { StatusLogBuilder } from '@src/logging/StatusLog/StatusLogBuilder';
import { LogLevel, LOG_LEVELS } from '@src/logging/LogLevel';
import { IChannel } from '@src/logging/StatusLog/Channel';
import { IStatusLog, StatusLog } from '@src/logging/StatusLog/StatusLog';
import { EventHandler } from '@src/core/events';

let builder;

const name = AnyRandom.string(5, 8, CharacterSet.ALPHA);
const channels: IChannel[] = [
    channel(LogLevel.INFO),
    channel(LogLevel.FATAL),
    channel(LogLevel.ERROR),
    channel(LogLevel.ERROR),
]

describe('StatusLogBuilder', () => {

    function setupTestSuite() {
        builder = new StatusLogBuilder(name);
    }

    describe('ctor', () => {

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: "" },
        ].forEach(({ key, value }) => {
            it(`ctor - throws when 'logName' is ${ key }`, () => {
                const logName = <any>value;

                assert.throws(() => {
                    new StatusLogBuilder(logName);
                })
            });
        });

        it(`ctor - stores the log name properly`, () => {
            const result = new StatusLogBuilder(name);

            assert.equal(result[ '_logName' ], name);
        });
    });

    describe('name', () => {
        beforeEach(setupTestSuite);

        it(`name - returns the name assigned to the underlying log (builder)`, () => {
            const name = AnyRandom.string(12, 32);
            builder[ '_logName' ] = name;

            const result = builder.name;

            assert.equal(result, name);
        });

    });

    describe('channels', () => {
        beforeEach(setupTestSuite);

        it(`channels - returns the channels assigned to the underlying log (builder)`, () => {
            builder[ '_channels' ] = channels;

            const result = builder.channels;

            assert.deepEqual(result, channels);
        });

    });

    describe('createBuilder', () => {
        beforeEach(setupTestSuite);

        it('createBuilder - returns a new StatusLogBuilder with the given name', () => {
            const name = AnyRandom.string(5, 8);

            const result = builder.createBuilder(name);

            assert.equal(result[ '_logName' ], name);
        });
    });

    describe('atLevel', () => {
        beforeEach(setupTestSuite);

        [
            { level: LogLevel.OFF },
            { level: LogLevel.FATAL },
            { level: LogLevel.ERROR },
            { level: LogLevel.WARN },
            { level: LogLevel.INFO },
            { level: LogLevel.DEBUG },
            { level: LogLevel.TRACE },
            { level: LogLevel.ALL }
        ].forEach(({ level }) => {
            it(`atLevel - [${ level }] - sets all channels to the specified level`, () => {
                const channels: IChannel[] = [
                    channel(LogLevel.INFO),
                    channel(LogLevel.FATAL),
                    channel(LogLevel.ERROR),
                    channel(LogLevel.ERROR),
                ]
                builder[ '_channels' ] = channels;

                const result = builder.atLevel(level);

                result[ '_channels' ].forEach(channel => {
                    assert.equal(channel.level, level);
                });
            });
        });

    });

    describe('newLog', () => {
        beforeEach(setupTestSuite);

        it('newLog - no args - creates a new log with the default name', () => {
            const newBuilder = builder.newLog();

            assert.equal(newBuilder[ '_logName' ], StatusLogBuilder.DEFAULT_NAME);
        });


        it('newLog - with name - creates a new log with the given name', () => {
            const name = AnyRandom.string(12, 18);

            const newBuilder = builder.newLog(name);

            assert.equal(newBuilder[ '_logName' ], name);
        });

        [
            { key: 'null', value: null },
            { key: 'empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`newLog - throws when the logName argument is ${ key }`, () => {
                const name = <any>value;

                assert.throws(() => {
                    builder.newLog(name);
                })
            });
        });
    });

    describe('newChannel', () => {
        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`newChannel - throws when the 'name' argument is ${ key }`, () => {
                const name = <any>value;
                const writer = NULL;
                const level = AnyRandom.oneOf(LOG_LEVELS);

                assert.throws(() => {
                    builder.newChannel(name, writer, level);
                })
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined }
        ].forEach(({ key, value }) => {
            it(`newChannel - throws when the 'writer' argument is ${ key }`, () => {
                const name = AnyRandom.string(1, 32);
                const writer = <any>value;
                const level = AnyRandom.oneOf(LOG_LEVELS);

                assert.throws(() => {
                    builder.newChannel(name, writer, level);
                })
            });
        });

        it(`newChannel - adds a new channel with the given name, writer, and level`, () => {
            const name = AnyRandom.string(1, 32);
            const writer = NULL;
            const level = AnyRandom.oneOf(LOG_LEVELS);

            const result = builder.newChannel(name, writer, level);

            const exists = result.channels.find(it => it.name == name);
            assert.isNotNull(exists);
            assert.equal(exists.name, name);
            assert.deepEqual(exists.writer, writer);
            assert.deepEqual(exists.level, level);
        });


        it(`newChannel - replaces a channel with the same name with one that has the given name, writer, and level`, () => {
            const name = channels[ 2 ].name;
            const writer = NULL;
            const level = AnyRandom.oneOf(LOG_LEVELS);

            const result = builder.newChannel(name, writer, level);

            const last = result.channels[ result.channels.length - 1 ];
            assert.equal(last.name, name);
            assert.deepEqual(last.writer, writer);
            assert.deepEqual(last.level, level);
        });
    });

    describe('logCreated', () => {
        beforeEach(setupTestSuite);

        it(`logCreated - emits on command`, () => {
            let triggered = false;
            const thing: EventHandler<IStatusLog> = () => { triggered = true; }
            builder.logCreated.subscribe(thing);

            builder.logCreated.emit(builder);

            assert.isTrue(triggered);
        });
    });

    describe('validate', () => {
        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`validate - throws when the builder 'name' is ${ key }`, () => {
                builder[ '_logName' ] = <any>value;
                builder[ '_channels' ] = channels;

                assert.throws(() => {
                    builder.validate();
                })
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty', value: [] },
        ].forEach(({ key, value }) => {
            it(`validate - throws when the builder 'channels' array is ${ key }`, () => {
                builder[ '_logName' ] = name;
                builder[ '_channels' ] = <any>value;

                assert.throws(() => {
                    builder.validate();
                })
            });
        });

        it(`validate - does not throw when everything is valid`, () => {
            builder[ '_logName' ] = name;
            builder[ '_channels' ] = channels;

            assert.doesNotThrow(() => {
                builder.validate();
            })
        });
    });

    describe('andGetLogger', () => {
        beforeEach(setupTestSuite);


        it(`andGetLogger - validates the config, and returns a new logger`, () => {
            const expected = new StatusLog(name, channels);
            const validate = stub(builder, 'validate').callsFake(() => { /* Do nothing */ });
            const createLogger = stub(builder, 'createLogger').callsFake(() => { return expected; });

            const result = builder.andGetLogger();

            Sinon.assert.calledOnceWithExactly(validate);
            Sinon.assert.calledOnceWithExactly(createLogger);
            assert.equal(result, expected);

            unwrap(validate);
            unwrap(createLogger);
        });
    });

    describe('createLogger', () => {
        beforeEach(setupTestSuite);

        it('createLogger - returns a new StatusLog with the given name and channels', () => {
            const name = AnyRandom.string(5, 8);
            const channels = [ { foo: 'bar' } ];
            builder[ '_logName' ] = name;
            builder[ '_channels' ] = channels;

            const result = builder.createLogger();

            assert.equal(result.name, name);
            assert.equal(result.channels, channels);
        });
    });
})
