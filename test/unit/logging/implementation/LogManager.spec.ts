import { assert } from 'chai';
import { AnyRandom } from '@auturge/testing';
import { TEST_CHANNEL_1, TEST_CHANNEL_2 } from '@test/objects';

import { StatusLog } from '@src/logging/StatusLog/StatusLog';
import { IChannel } from '@src/logging/IChannel';
import { IStatusEntry } from '@src/logging/StatusLog/IStatusEntry';
import { StatusLogBuilder } from '@src/logging/StatusLog/StatusLogBuilder';
import { LogManager } from '@src/logging/implementation/LogManager';

describe('LogManager', () => {

    let builder, manager, logName;

    function getTestLogger(name: string, channels: IChannel<IStatusEntry>[] = []) {
        if (!channels.length) {
            channels.push(TEST_CHANNEL_1);
        }

        return new StatusLog(name, channels);
    }

    function setupTestSuite() {
        logName = AnyRandom.string(5, 8);
        builder = new StatusLogBuilder(logName);

        manager = new LogManager(builder);
    }

    describe('ctor', () => {

        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
        ].forEach(({ key, value }) => {
            it(`ctor - throws when 'builder' parameter is ${ key }`, () => {
                const builder = <any>value;

                assert.throws(() => {
                    new LogManager(builder);
                });
            });
        });

        it(`ctor - sets values appropriately`, () => {

            manager = new LogManager(builder);

            assert.deepEqual(manager.initialize, builder);
            assert.equal(manager.initialize.logCreated.handlers[ 0 ], manager.onLogCreated);
        });
    });

    describe('disable', () => {
        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: '' },
        ].forEach(({ key, value }) => {
            it(`disable - throws when 'logName' parameter is ${ key }`, () => {
                const logName = value;

                assert.throws(() => {
                    manager.disable(logName);
                });
            });
        });

        it('disable - throws when no such log exists', () => {
            const name = AnyRandom.string(5, 8);
            manager[ '_logNames' ] = [];
            manager[ '_logs' ] = [];

            assert.throws(() => {
                manager.disable(name);
            });
        });

        it('disable - takes a log name and disables the corresponding log', () => {
            const name = AnyRandom.string(5, 8);
            const logger = getTestLogger(name);
            logger.enabled = true;
            manager[ '_logNames' ] = [ name ];
            manager[ '_logs' ] = [ logger ];

            manager.disable(name);

            assert.equal(logger.enabled, false);
        });


    });

    describe('enable', () => {
        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: '' },
        ].forEach(({ key, value }) => {
            it(`enable - throws when 'logName' parameter is ${ key }`, () => {
                const logName = value;

                assert.throws(() => {
                    manager.enable(logName);
                });
            });
        });

        it('enable - throws when no such log exists', () => {
            const name = AnyRandom.string(5, 8);
            manager[ '_logNames' ] = [];
            manager[ '_logs' ] = [];

            assert.throws(() => {
                manager.enable(name);
            });
        });

        it('enable - takes a log name and enables the corresponding log', () => {
            const name = AnyRandom.string(5, 8);
            const logger = getTestLogger(name);
            logger.enabled = false;
            manager[ '_logNames' ] = [ name ];
            manager[ '_logs' ] = [ logger ];

            manager.enable(name);

            assert.equal(logger.enabled, true);
        });


    });

    describe('getLog', () => {
        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'empty string', value: '' },
        ].forEach(({ key, value }) => {
            it(`getLog - throws when 'logName' parameter is ${ key }`, () => {
                const logName = value;

                assert.throws(() => {
                    manager.getLog(logName);
                });
            });
        });

        it('getLog - returns null when no such log exists', () => {
            const name = AnyRandom.string(5, 8);
            manager[ '_logNames' ] = [];
            manager[ '_logs' ] = [];

            const result = manager.getLog(name);

            assert.isNull(result);
        });

        it('getLog - takes a log name and returns the corresponding log', () => {
            const name = AnyRandom.string(5, 8);
            const logger = getTestLogger(name);
            manager[ '_logNames' ] = [ name ];
            manager[ '_logs' ] = [ logger ];

            const result = manager.getLog(name);

            assert.deepEqual(result, logger);
        });
    });

    describe('onLogCreated', () => {
        beforeEach(setupTestSuite);

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
        ].forEach(({ key, value }) => {
            it(`onLogCreated - throws when 'log' parameter is ${ key }`, () => {
                const log = value;

                assert.throws(() => {
                    manager.onLogCreated(log);
                });
            });
        });

        it('onLogCreated - adds the log name to one array, adds the log to the second array', () => {
            const alice = getTestLogger('alice');
            const bob = getTestLogger('bob');
            const carol = getTestLogger('carol');
            manager[ '_logNames' ] = [ alice.name, bob.name ];
            manager[ '_logs' ] = [ alice, bob ];

            manager[ 'onLogCreated' ](carol);

            assert.deepEqual(manager[ '_logNames' ],
                [ alice.name, bob.name, carol.name ]);
            assert.deepEqual(manager[ '_logs' ],
                [ alice, bob, carol ]);
        });

        it('onLogCreated - replaces an existing log with the same name', () => {
            const alice = getTestLogger('alice');
            const bob1 = getTestLogger('bob', [ TEST_CHANNEL_1 ]);
            const bob2 = getTestLogger('bob', [ TEST_CHANNEL_2 ]);
            const carol = getTestLogger('carol');
            manager[ '_logNames' ] = [ alice.name, bob1.name, carol.name ];
            manager[ '_logs' ] = [ alice, bob1, carol ];

            manager[ 'onLogCreated' ](bob2);

            assert.deepEqual(manager[ '_logNames' ],
                [ alice.name, carol.name, bob2.name ]);
            assert.deepEqual(manager[ '_logs' ],
                [ alice, carol, bob2 ]);
        });
    });
});
