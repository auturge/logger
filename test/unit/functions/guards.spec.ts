import { assert } from 'chai';
import { string, num, bigInt, bool, date, infiniteFn, obj, symbol, regExp } from '@test/objects';

import { throwIfEmpty, throwIfEqualTo, throwIfNull, throwIfNullOrEmpty, throwIfNullOrGreaterThan, throwIfNullOrGTE, throwIfNullOrLessThan, throwIfNullOrLTE, throwIfNullOrUndefined, throwIfUndefined } from '@src/functions/guards';
import { AnyRandom, CharacterSet } from '@auturge/testing';



describe('guards', () => {

    describe('throwIfNull', () => {

        it(`throwIfNull - [undeclared] - does not throw`, () => {
            var value;
            assert.doesNotThrow(() => {
                throwIfNull(value, 'undeclared');
            });
        });

        [
            { key: 'array', value: [ string(), num() ] },
            { key: 'bigint', value: bigInt() },
            { key: 'boolean', value: bool() },
            { key: 'Date', value: date() },
            { key: 'empty array', value: [] },
            { key: 'empty iterable', value: new Map() },
            { key: 'empty object', value: {} },
            { key: 'empty string', value: "" },
            { key: 'false', value: false },
            { key: 'never', value: infiniteFn },
            // { key: 'null', value: null },
            { key: 'number', value: num() },
            { key: 'object', value: obj() },
            { key: 'string', value: string() },
            { key: 'symbol', value: symbol() },
            { key: 'RegExp', value: regExp() },
            { key: 'true', value: true },
            { key: '"true"', value: "true" },
            { key: 'undefined', value: undefined },
            { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfNull - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfNull(value, key);
                });
            });
        });

        it(`throwIfNull - [null] - throws`, () => {
            var value = null;
            assert.throws(() => {
                throwIfNull(value, 'null');
            });
        });
    });

    describe('throwIfUndefined', () => {

        it(`throwIfUndefined - [undeclared] - throws`, () => {
            var value;
            assert.throws(() => {
                throwIfUndefined(value, 'undeclared');
            });
        });

        it(`throwIfUndefined - [undefined] - throws`, () => {
            var value = undefined;
            assert.throws(() => {
                throwIfUndefined(value, 'undefined');
            });
        });

        [
            { key: 'array', value: [ string(), num() ] },
            { key: 'bigint', value: bigInt() },
            { key: 'boolean', value: bool() },
            { key: 'Date', value: date() },
            { key: 'empty array', value: [] },
            { key: 'empty iterable', value: new Map() },
            { key: 'empty object', value: {} },
            { key: 'empty string', value: "" },
            { key: 'false', value: false },
            { key: 'never', value: infiniteFn },
            { key: 'null', value: null },
            { key: 'number', value: num() },
            { key: 'object', value: obj() },
            { key: 'string', value: string() },
            { key: 'symbol', value: symbol() },
            { key: 'RegExp', value: regExp() },
            { key: 'true', value: true },
            { key: '"true"', value: "true" },
            //{ key: 'undefined', value: undefined },
            { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfUndefined - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfUndefined(value, key);
                });
            });
        });
    });

    describe('throwIfEmpty', () => {

        it(`throwIfEmpty - [undeclared] - does not throw`, () => {
            var value;
            assert.doesNotThrow(() => {
                throwIfEmpty(value, 'undeclared');
            });
        });

        [
            // { key: 'array', value: [ string(), num() ] },
            // { key: 'bigint', value: bigInt() },
            // { key: 'boolean', value: bool() },
            // { key: 'Date', value: date() },
            { key: 'empty array', value: [] },
            { key: 'empty iterable', value: new Map() },
            { key: 'empty object', value: {} },
            { key: 'empty string', value: "" },
            // { key: 'false', value: false },
            // { key: 'never', value: infiniteFn },
            // { key: 'null', value: null },
            // { key: 'number', value: num() },
            // { key: 'object', value: obj() },
            // { key: 'string', value: string() },
            // { key: 'symbol', value: symbol() },
            // { key: 'RegExp', value: regExp() },
            // { key: 'true', value: true },
            // { key: '"true"', value: "true" },
            // { key: 'undefined', value: undefined },
            // { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfEmpty - [${ key }] - throws`, () => {
                assert.throws(() => {
                    throwIfEmpty(value, key);
                });
            });
        });

        [
            { key: 'array', value: [ string(), num() ] },
            { key: 'bigint', value: bigInt() },
            { key: 'boolean', value: bool() },
            { key: 'Date', value: date() },
            // { key: 'empty array', value: [] },
            // { key: 'empty iterable', value: new Map() },
            // { key: 'empty object', value: {} },
            // { key: 'empty string', value: "" },
            { key: 'false', value: false },
            { key: 'never', value: infiniteFn },
            { key: 'null', value: null },
            { key: 'number', value: num() },
            { key: 'object', value: obj() },
            { key: 'string', value: string() },
            { key: 'symbol', value: symbol() },
            { key: 'RegExp', value: regExp() },
            { key: 'true', value: true },
            { key: '"true"', value: "true" },
            { key: 'undefined', value: undefined },
            { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfEmpty - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfEmpty(value, key);
                });
            });
        });
    });

    describe('throwIfNullOrUndefined', () => {

        it(`throwIfNullOrUndefined - [undeclared] - throws`, () => {
            var value;
            assert.throws(() => {
                throwIfNullOrUndefined(value, 'undeclared');
            });
        });

        [
            // { key: 'array', value: [ string(), num() ] },
            // { key: 'bigint', value: bigInt() },
            // { key: 'boolean', value: bool() },
            // { key: 'Date', value: date() },
            // { key: 'empty array', value: [] },
            // { key: 'empty iterable', value: new Map() },
            // { key: 'empty object', value: {} },
            // { key: 'empty string', value: "" },
            // { key: 'false', value: false },
            // { key: 'never', value: infiniteFn },
            { key: 'null', value: null },
            // { key: 'number', value: num() },
            // { key: 'object', value: obj() },
            // { key: 'string', value: string() },
            // { key: 'symbol', value: symbol() },
            // { key: 'RegExp', value: regExp() },
            // { key: 'true', value: true },
            // { key: '"true"', value: "true" },
            { key: 'undefined', value: undefined },
            // { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrUndefined - [${ key }] - throws`, () => {
                assert.throws(() => {
                    throwIfNullOrUndefined(value, key);
                });
            });
        });

        [
            { key: 'array', value: [ string(), num() ] },
            { key: 'bigint', value: bigInt() },
            { key: 'boolean', value: bool() },
            { key: 'Date', value: date() },
            { key: 'empty array', value: [] },
            { key: 'empty iterable', value: new Map() },
            { key: 'empty object', value: {} },
            { key: 'empty string', value: "" },
            { key: 'false', value: false },
            { key: 'never', value: infiniteFn },
            // { key: 'null', value: null },
            { key: 'number', value: num() },
            { key: 'object', value: obj() },
            { key: 'string', value: string() },
            { key: 'symbol', value: symbol() },
            { key: 'RegExp', value: regExp() },
            { key: 'true', value: true },
            { key: '"true"', value: "true" },
            // { key: 'undefined', value: undefined },
            { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrUndefined - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfNullOrUndefined(value, key);
                });
            });
        });


    });

    describe('throwIfNullOrEmpty', () => {

        it(`throwIfNullOrEmpty - [undeclared] - throws`, () => {
            var value;
            assert.throws(() => {
                throwIfNullOrEmpty(value, 'undeclared');
            });
        });

        [
            // { key: 'array', value: [ string(), num() ] },
            // { key: 'bigint', value: bigInt() },
            // { key: 'boolean', value: bool() },
            // { key: 'Date', value: date() },
            { key: 'empty array', value: [] },
            { key: 'empty iterable', value: new Map() },
            { key: 'empty object', value: {} },
            { key: 'empty string', value: "" },
            // { key: 'false', value: false },
            // { key: 'never', value: infiniteFn },
            { key: 'null', value: null },
            // { key: 'number', value: num() },
            // { key: 'object', value: obj() },
            // { key: 'string', value: string() },
            // { key: 'symbol', value: symbol() },
            // { key: 'RegExp', value: regExp() },
            // { key: 'true', value: true },
            // { key: '"true"', value: "true" },
            { key: 'undefined', value: undefined },
            // { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrEmpty - [${ key }] - throws`, () => {
                assert.throws(() => {
                    throwIfNullOrEmpty(value, key);
                });
            });
        });

        [
            { key: 'array', value: [ string(), num() ] },
            { key: 'bigint', value: bigInt() },
            { key: 'boolean', value: bool() },
            { key: 'Date', value: date() },
            // { key: 'empty array', value: [] },
            // { key: 'empty iterable', value: new Map() },
            // { key: 'empty object', value: {} },
            // { key: 'empty string', value: "" },
            { key: 'false', value: false },
            { key: 'never', value: infiniteFn },
            // { key: 'null', value: null },
            { key: 'number', value: num() },
            { key: 'object', value: obj() },
            { key: 'string', value: string() },
            { key: 'symbol', value: symbol() },
            { key: 'RegExp', value: regExp() },
            { key: 'true', value: true },
            { key: '"true"', value: "true" },
            // { key: 'undefined', value: undefined },
            { key: 'void', value: () => { } },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrEmpty - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfNullOrEmpty(value, key);
                });
            });
        });


    });


    describe('throwIfNullOrLessThan', () => {

        const amt = 42;
        it(`throwIfNullOrLessThan - [undeclared] - throws`, () => {
            var value;
            assert.throws(() => {
                throwIfNullOrLessThan(value, 'undeclared', amt);
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'less than', value: amt - 1 },
            // { key: 'equal', value: amt },
            // { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrLessThan - [${ key }] - throws`, () => {
                assert.throws(() => {
                    throwIfNullOrLessThan(value, key, amt);
                });
            });
        });

        [
            // { key: 'null', value: null },
            // { key: 'undefined', value: undefined },
            // { key: 'less than', value: amt - 1 },
            { key: 'equal', value: amt },
            { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrLessThan - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfNullOrLessThan(value, key, amt);
                });
            });
        });


    });

    describe('throwIfNullOrLTE', () => {

        const amt = 42;
        it(`throwIfNullOrLTE - [undeclared] - throws`, () => {
            var value;
            assert.throws(() => {
                throwIfNullOrLTE(value, 'undeclared', amt);
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            { key: 'less than', value: amt - 1 },
            { key: 'equal', value: amt },
            // { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrLTE - [${ key }] - throws`, () => {
                assert.throws(() => {
                    throwIfNullOrLTE(value, key, amt);
                });
            });
        });

        [
            // { key: 'null', value: null },
            // { key: 'undefined', value: undefined },
            // { key: 'less than', value: amt - 1 },
            // { key: 'equal', value: amt },
            { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrLTE - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfNullOrLTE(value, key, amt);
                });
            });
        });
    });

    describe('throwIfEqualTo', () => {

        const amt = 42;
        it(`throwIfEqualTo - [undeclared] - does not throw`, () => {
            var value;
            assert.doesNotThrow(() => {
                throwIfEqualTo(value, 'undeclared', amt);
            });
        });

        [
            { type: 'boolean', value: true },
            { type: 'boolean', value: false },
            { type: 'string', value: "" },
            { type: 'string', value: AnyRandom.string(5, 8, CharacterSet.ATOM) },
            { type: 'number', value: amt },
            { type: 'symbol', value: Symbol("bob") },
            { type: 'null', value: null },
            { type: 'undefined', value: undefined },
        ].forEach(({ type, value }) => {
            it(`throwIfEqualTo - [equal, ${ type }] - throws`, () => {
                assert.throws(() => {
                    throwIfEqualTo(value, type, value);
                });
            });
        });

        [
            { type: 'boolean', value: true, badValue: false },
            { type: 'boolean', value: false, badValue: true },
            { type: 'string', value: string(), badValue: string() },
            { type: 'number', value: amt - 1, badValue: amt },
            { type: 'symbol', value: Symbol("bob"), badValue: symbol() },
            { type: 'null', value: null, badValue: string() },
            { type: 'undefined', value: undefined, badValue: string() },

        ].forEach(({ type, value, badValue }) => {
            it(`throwIfEqualTo - [not equal, ${ type }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfEqualTo(value, type, badValue);
                });
            });
        });
    });

    describe('throwIfNullOrGTE', () => {

        const amt = 42;
        it(`throwIfNullOrGTE - [undeclared] - throws`, () => {
            var value;
            assert.throws(() => {
                throwIfNullOrGTE(value, 'undeclared', amt);
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            // { key: 'less than', value: amt - 1 },
            { key: 'equal', value: amt },
            { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrGTE - [${ key }] - throws`, () => {
                assert.throws(() => {
                    throwIfNullOrGTE(value, key, amt);
                });
            });
        });

        [
            // { key: 'null', value: null },
            // { key: 'undefined', value: undefined },
            { key: 'less than', value: amt - 1 },
            // { key: 'equal', value: amt },
            // { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrGTE - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfNullOrGTE(value, key, amt);
                });
            });
        });
    });

    describe('throwIfNullOrGreaterThan', () => {

        const amt = 42;
        it(`throwIfNullOrGreaterThan - [undeclared] - throws`, () => {
            var value;
            assert.throws(() => {
                throwIfNullOrGreaterThan(value, 'undeclared', amt);
            });
        });

        [
            { key: 'null', value: null },
            { key: 'undefined', value: undefined },
            // { key: 'less than', value: amt - 1 },
            // { key: 'equal', value: amt },
            { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrGreaterThan - [${ key }] - throws`, () => {
                assert.throws(() => {
                    throwIfNullOrGreaterThan(value, key, amt);
                });
            });
        });

        [
            // { key: 'null', value: null },
            // { key: 'undefined', value: undefined },
            { key: 'less than', value: amt - 1 },
            { key: 'equal', value: amt },
            // { key: 'greater than', value: amt + 1 },
        ].forEach(({ key, value }) => {
            it(`throwIfNullOrGreaterThan - [${ key }] - does not throw`, () => {

                assert.doesNotThrow(() => {
                    throwIfNullOrGreaterThan(value, key, amt);
                });
            });
        });
    });
});
