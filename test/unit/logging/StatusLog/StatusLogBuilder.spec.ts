import { assert } from 'chai';
import { AnyRandom, CharacterSet } from '@auturge/testing';

import { StatusLogBuilder } from '@src/logging/StatusLog/StatusLogBuilder';

let builder;
const name = AnyRandom.string(5, 8, CharacterSet.ALPHA);

function setupTestSuite() {
    builder = new StatusLogBuilder(name);
}

describe('StatusLogBuilder', () => {
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

    describe('createBuilder', () => {
        beforeEach(setupTestSuite);

        it('createBuilder - returns a new StatusLogBuilder with the given name', () => {
            const name = AnyRandom.string(5, 8);

            const result = builder.createBuilder(name);

            assert.equal(result[ '_logName' ], name);
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
