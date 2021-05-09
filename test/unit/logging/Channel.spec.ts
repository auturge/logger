import sinon = require('sinon');
import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';

import { stub, unwrap } from '@test/helpers';
import { statusEntry } from '@test/objects/test__objects';
import { NULL } from '@test/objects/NullWriter';

import { Channel } from '@src/logging/Channel';
import { LogLevel } from '@src/logging';

describe('Channel', () => {

    let channel;

    // const testWriter: IWriter = {
    //     reconfigure: () => { /* Do nothing */ },
    //     write: nullWriterFn
    // };

    describe('ctor', () => {

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: "" }
        ].forEach(({ key, value }) => {
            it(`ctor - throws when channel name is ${ key }`, () => {
                const name = <any>value;
                const writer = NULL;

                assert.throws(() => {
                    new Channel(name, writer);
                });
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
        ].forEach(({ key, value }) => {
            it(`ctor - throws when channel writer is ${ key }`, () => {
                const name = AnyRandom.string(5, 8);
                const writer = <any>value;

                assert.throws(() => {
                    new Channel(name, writer);
                });
            });
        });
    });

    describe('enabled', () => {

        beforeEach(() => {
            channel = new Channel(AnyRandom.string(5, 8), NULL);
        });

        [
            { value: true },
            { value: false }
        ].forEach(({ value }) => {
            it(`enabled [get] - returns the underlying value (${ value })`, () => {
                channel[ '_enabled' ] = value;

                const result = channel.enabled;

                assert.equal(result, value);
            });

            it(`enabled [set] - sets the underlying value (${ value })`, () => {
                channel[ '_enabled' ] = !value;

                channel.enabled = value;

                assert.equal(channel[ '_enabled' ], value);
            });
        });
    });

    describe('level', () => {

        beforeEach(() => {
            channel = new Channel(AnyRandom.string(5, 8), NULL);
        });

        [
            { value: LogLevel.OFF },
            { value: LogLevel.FATAL },
            { value: LogLevel.ERROR },
            { value: LogLevel.WARN },
            { value: LogLevel.INFO },
            { value: LogLevel.DEBUG },
            { value: LogLevel.TRACE },
        ].forEach(({ value }) => {
            it(`level [get] - returns the underlying level (${ value })`, () => {
                channel[ '_level' ] = value;

                const result = channel.level;

                assert.equal(result, value);
            });

            it(`level [set] - sets the underlying level (${ value })`, () => {
                channel[ '_level' ] = null;

                channel.level = value;

                assert.equal(channel[ '_level' ], value);
            });
        });
    });

    describe('isEnabledFor', () => {
        beforeEach(() => {
            channel = new Channel(AnyRandom.string(5, 8), NULL);
        });

        [
            { value: LogLevel.FATAL },
            { value: LogLevel.ERROR },
            { value: LogLevel.WARN },
            { value: LogLevel.INFO },
            { value: LogLevel.DEBUG },
            { value: LogLevel.TRACE },
        ].forEach(({ value }) => {
            it(`isEnabledFor [${ value }] - returns false when the channel is disabled`, () => {
                channel.enabled = false;

                const result = channel.isEnabledFor(value);

                assert.isFalse(result);
            });
        });

        [
            { level: LogLevel.OFF, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.OFF, toCheck: LogLevel.FATAL, expected: false },
            { level: LogLevel.OFF, toCheck: LogLevel.ERROR, expected: false },
            { level: LogLevel.OFF, toCheck: LogLevel.WARN, expected: false },
            { level: LogLevel.OFF, toCheck: LogLevel.INFO, expected: false },
            { level: LogLevel.OFF, toCheck: LogLevel.DEBUG, expected: false },
            { level: LogLevel.OFF, toCheck: LogLevel.TRACE, expected: false },
            { level: LogLevel.OFF, toCheck: LogLevel.ALL, expected: false },

            { level: LogLevel.FATAL, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.FATAL, toCheck: LogLevel.FATAL, expected: true },
            { level: LogLevel.FATAL, toCheck: LogLevel.ERROR, expected: false },
            { level: LogLevel.FATAL, toCheck: LogLevel.WARN, expected: false },
            { level: LogLevel.FATAL, toCheck: LogLevel.INFO, expected: false },
            { level: LogLevel.FATAL, toCheck: LogLevel.DEBUG, expected: false },
            { level: LogLevel.FATAL, toCheck: LogLevel.TRACE, expected: false },
            { level: LogLevel.FATAL, toCheck: LogLevel.ALL, expected: false },

            { level: LogLevel.ERROR, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.ERROR, toCheck: LogLevel.FATAL, expected: true },
            { level: LogLevel.ERROR, toCheck: LogLevel.ERROR, expected: true },
            { level: LogLevel.ERROR, toCheck: LogLevel.WARN, expected: false },
            { level: LogLevel.ERROR, toCheck: LogLevel.INFO, expected: false },
            { level: LogLevel.ERROR, toCheck: LogLevel.DEBUG, expected: false },
            { level: LogLevel.ERROR, toCheck: LogLevel.TRACE, expected: false },
            { level: LogLevel.ERROR, toCheck: LogLevel.ALL, expected: false },

            { level: LogLevel.WARN, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.WARN, toCheck: LogLevel.FATAL, expected: true },
            { level: LogLevel.WARN, toCheck: LogLevel.ERROR, expected: true },
            { level: LogLevel.WARN, toCheck: LogLevel.WARN, expected: true },
            { level: LogLevel.WARN, toCheck: LogLevel.INFO, expected: false },
            { level: LogLevel.WARN, toCheck: LogLevel.DEBUG, expected: false },
            { level: LogLevel.WARN, toCheck: LogLevel.TRACE, expected: false },
            { level: LogLevel.WARN, toCheck: LogLevel.ALL, expected: false },

            { level: LogLevel.INFO, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.INFO, toCheck: LogLevel.FATAL, expected: true },
            { level: LogLevel.INFO, toCheck: LogLevel.ERROR, expected: true },
            { level: LogLevel.INFO, toCheck: LogLevel.WARN, expected: true },
            { level: LogLevel.INFO, toCheck: LogLevel.INFO, expected: true },
            { level: LogLevel.INFO, toCheck: LogLevel.DEBUG, expected: false },
            { level: LogLevel.INFO, toCheck: LogLevel.TRACE, expected: false },
            { level: LogLevel.INFO, toCheck: LogLevel.ALL, expected: false },

            { level: LogLevel.DEBUG, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.DEBUG, toCheck: LogLevel.FATAL, expected: true },
            { level: LogLevel.DEBUG, toCheck: LogLevel.ERROR, expected: true },
            { level: LogLevel.DEBUG, toCheck: LogLevel.WARN, expected: true },
            { level: LogLevel.DEBUG, toCheck: LogLevel.INFO, expected: true },
            { level: LogLevel.DEBUG, toCheck: LogLevel.DEBUG, expected: true },
            { level: LogLevel.DEBUG, toCheck: LogLevel.TRACE, expected: false },
            { level: LogLevel.DEBUG, toCheck: LogLevel.ALL, expected: false },

            { level: LogLevel.TRACE, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.TRACE, toCheck: LogLevel.FATAL, expected: true },
            { level: LogLevel.TRACE, toCheck: LogLevel.ERROR, expected: true },
            { level: LogLevel.TRACE, toCheck: LogLevel.WARN, expected: true },
            { level: LogLevel.TRACE, toCheck: LogLevel.INFO, expected: true },
            { level: LogLevel.TRACE, toCheck: LogLevel.DEBUG, expected: true },
            { level: LogLevel.TRACE, toCheck: LogLevel.TRACE, expected: true },
            { level: LogLevel.TRACE, toCheck: LogLevel.ALL, expected: false },

            { level: LogLevel.ALL, toCheck: LogLevel.OFF, expected: false },
            { level: LogLevel.ALL, toCheck: LogLevel.FATAL, expected: true },
            { level: LogLevel.ALL, toCheck: LogLevel.ERROR, expected: true },
            { level: LogLevel.ALL, toCheck: LogLevel.WARN, expected: true },
            { level: LogLevel.ALL, toCheck: LogLevel.INFO, expected: true },
            { level: LogLevel.ALL, toCheck: LogLevel.DEBUG, expected: true },
            { level: LogLevel.ALL, toCheck: LogLevel.TRACE, expected: true },
            { level: LogLevel.ALL, toCheck: LogLevel.ALL, expected: true },


        ].forEach(({ level, toCheck, expected }) => {
            it(`isEnabledFor [${ toCheck }] - when the channel is enabled and set to ${ level }, returns ${ expected }`, () => {
                channel.enabled = true;
                channel[ '_level' ] = level;

                const result = channel.isEnabledFor(toCheck);

                assert.equal(result, expected);
            });
        });

    });


    describe('log', () => {
        let write;



        beforeEach(() => {
            channel = new Channel(AnyRandom.string(5, 8), NULL);
            write = stub(channel.writer, 'write').callsFake(() => { /* Do nothing */ });
        });

        afterEach(() => {
            unwrap(write);
        });

        [
            { level: LogLevel.OFF, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.OFF, entryLevel: LogLevel.FATAL, expected: false },
            { level: LogLevel.OFF, entryLevel: LogLevel.ERROR, expected: false },
            { level: LogLevel.OFF, entryLevel: LogLevel.WARN, expected: false },
            { level: LogLevel.OFF, entryLevel: LogLevel.INFO, expected: false },
            { level: LogLevel.OFF, entryLevel: LogLevel.DEBUG, expected: false },
            { level: LogLevel.OFF, entryLevel: LogLevel.TRACE, expected: false },
            { level: LogLevel.OFF, entryLevel: LogLevel.ALL, expected: false }, // wtflol

            { level: LogLevel.FATAL, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.FATAL, entryLevel: LogLevel.FATAL, expected: true },
            { level: LogLevel.FATAL, entryLevel: LogLevel.ERROR, expected: false },
            { level: LogLevel.FATAL, entryLevel: LogLevel.WARN, expected: false },
            { level: LogLevel.FATAL, entryLevel: LogLevel.INFO, expected: false },
            { level: LogLevel.FATAL, entryLevel: LogLevel.DEBUG, expected: false },
            { level: LogLevel.FATAL, entryLevel: LogLevel.TRACE, expected: false },
            { level: LogLevel.FATAL, entryLevel: LogLevel.ALL, expected: false }, // wtflol

            { level: LogLevel.ERROR, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.ERROR, entryLevel: LogLevel.FATAL, expected: true },
            { level: LogLevel.ERROR, entryLevel: LogLevel.ERROR, expected: true },
            { level: LogLevel.ERROR, entryLevel: LogLevel.WARN, expected: false },
            { level: LogLevel.ERROR, entryLevel: LogLevel.INFO, expected: false },
            { level: LogLevel.ERROR, entryLevel: LogLevel.DEBUG, expected: false },
            { level: LogLevel.ERROR, entryLevel: LogLevel.TRACE, expected: false },
            { level: LogLevel.ERROR, entryLevel: LogLevel.ALL, expected: false }, // wtflol

            { level: LogLevel.WARN, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.WARN, entryLevel: LogLevel.FATAL, expected: true },
            { level: LogLevel.WARN, entryLevel: LogLevel.ERROR, expected: true },
            { level: LogLevel.WARN, entryLevel: LogLevel.WARN, expected: true },
            { level: LogLevel.WARN, entryLevel: LogLevel.INFO, expected: false },
            { level: LogLevel.WARN, entryLevel: LogLevel.DEBUG, expected: false },
            { level: LogLevel.WARN, entryLevel: LogLevel.TRACE, expected: false },
            { level: LogLevel.WARN, entryLevel: LogLevel.ALL, expected: false }, // wtflol

            { level: LogLevel.INFO, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.INFO, entryLevel: LogLevel.FATAL, expected: true },
            { level: LogLevel.INFO, entryLevel: LogLevel.ERROR, expected: true },
            { level: LogLevel.INFO, entryLevel: LogLevel.WARN, expected: true },
            { level: LogLevel.INFO, entryLevel: LogLevel.INFO, expected: true },
            { level: LogLevel.INFO, entryLevel: LogLevel.DEBUG, expected: false },
            { level: LogLevel.INFO, entryLevel: LogLevel.TRACE, expected: false },
            { level: LogLevel.INFO, entryLevel: LogLevel.ALL, expected: false }, // wtflol

            { level: LogLevel.DEBUG, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.DEBUG, entryLevel: LogLevel.FATAL, expected: true },
            { level: LogLevel.DEBUG, entryLevel: LogLevel.ERROR, expected: true },
            { level: LogLevel.DEBUG, entryLevel: LogLevel.WARN, expected: true },
            { level: LogLevel.DEBUG, entryLevel: LogLevel.INFO, expected: true },
            { level: LogLevel.DEBUG, entryLevel: LogLevel.DEBUG, expected: true },
            { level: LogLevel.DEBUG, entryLevel: LogLevel.TRACE, expected: false },
            { level: LogLevel.DEBUG, entryLevel: LogLevel.ALL, expected: false }, // wtflol

            { level: LogLevel.TRACE, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.TRACE, entryLevel: LogLevel.FATAL, expected: true },
            { level: LogLevel.TRACE, entryLevel: LogLevel.ERROR, expected: true },
            { level: LogLevel.TRACE, entryLevel: LogLevel.WARN, expected: true },
            { level: LogLevel.TRACE, entryLevel: LogLevel.INFO, expected: true },
            { level: LogLevel.TRACE, entryLevel: LogLevel.DEBUG, expected: true },
            { level: LogLevel.TRACE, entryLevel: LogLevel.TRACE, expected: true },
            { level: LogLevel.TRACE, entryLevel: LogLevel.ALL, expected: false }, // wtflol

            { level: LogLevel.ALL, entryLevel: LogLevel.OFF, expected: false },
            { level: LogLevel.ALL, entryLevel: LogLevel.FATAL, expected: true },
            { level: LogLevel.ALL, entryLevel: LogLevel.ERROR, expected: true },
            { level: LogLevel.ALL, entryLevel: LogLevel.WARN, expected: true },
            { level: LogLevel.ALL, entryLevel: LogLevel.INFO, expected: true },
            { level: LogLevel.ALL, entryLevel: LogLevel.DEBUG, expected: true },
            { level: LogLevel.ALL, entryLevel: LogLevel.TRACE, expected: true },
            { level: LogLevel.ALL, entryLevel: LogLevel.ALL, expected: true }, // wtflol
        ].forEach(({ level, entryLevel, expected }) => {

            it('log - does not write if the channel is disabled', () => {
                const entry = statusEntry(entryLevel);
                channel.enabled = false;

                channel.log(entry);

                sinon.assert.notCalled(write);
            });

            it(`log - [logger: ${ level }, entry: ${ entryLevel }] - ${ expected ? 'writes the entry' : 'does not write' } when ${ expected ? '' : 'not ' }enabled for the level of the entry`, () => {
                channel.enabled = true;
                channel.level = level;
                const entry = statusEntry(entryLevel);

                channel.log(entry);

                if (expected) {
                    sinon.assert.calledOnceWithExactly(write, entry);
                } else {
                    sinon.assert.notCalled(write);
                }
            });
        });
    });
});
