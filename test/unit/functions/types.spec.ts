import { assert } from 'chai';
import { string, num, bigInt, bool, date, infiniteFn, object, symbol, regExp } from '@test/objects';

import {
    isArray, isArrayOfType, isBigInt, isBoolean, isDefined, isEmpty,
    isFunction, isIterable, isNull, isNullOrUndefined, isNullUndefinedOrEmpty, isNumber, isObject, isString, isSymbol, isType, isUndefined
} from '@src/functions/types';

describe('types', () => {

    describe('isArray', () => {

        it(`isArray - [undeclared] - returns false`, () => {
            let value;
            const result = isArray(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: 'boolean', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'Map', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            { key: 'string[]', value: [ string(), string() ], expected: true },
            { key: 'boolean[]', value: [ bool(), bool() ], expected: true },
            { key: 'number[]', value: [ num(), num() ], expected: true },
            { key: 'object[]', value: [ object(), object() ], expected: true },

        ].forEach(({ key, value, expected }) => {
            it(`isArray - [${ key }] - returns ${ expected }`, () => {
                const result = isArray(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isArrayOfType', () => {

        it(`isArrayOfType - [undeclared, undefined] - returns false`, () => {
            let value;
            const result = isArrayOfType(value, 'undefined');
            assert.equal(result, false);
        });

        [
            { key: 'null', type: 'string', value: null, expected: false },
            { key: 'undefined', type: 'string', value: undefined, expected: false },
            { key: 'null', type: 'object', value: [ null ], expected: true },
            { key: 'undefined', type: 'undefined', value: [ undefined ], expected: true },
            { key: 'string', type: 'string', value: [ string() ], expected: true },
            { key: 'empty string', type: 'string', value: [ "" ], expected: true },
            { key: '"true"', type: 'boolean', value: [ "true" ], expected: false },
            { key: 'boolean', type: 'boolean', value: [ bool() ], expected: true },
            { key: 'number', type: 'number', value: [ num() ], expected: true },
            { key: 'object', type: 'object', value: [ object() ], expected: true },
            { key: 'empty object', type: 'object', value: [ {} ], expected: true },
            { key: 'void', type: 'function', value: [ () => { /* Do nothing */ } ], expected: true },
            { key: 'never', type: 'function', value: [ infiniteFn ], expected: true },
            { key: 'RegExp', type: 'object', value: [ regExp() ], expected: true },
            { key: 'Date', type: 'object', value: [ date() ], expected: true },
            { key: 'bigint', type: 'bigint', value: [ bigInt() ], expected: true },
            { key: 'array', type: 'object', value: [ [ string() ], [ string() ] ], expected: true },
            { key: 'empty array', type: 'object', value: [ [], [] ], expected: true },

        ].forEach(({ key, type, value, expected }) => {
            it(`isArrayOfType - [${ key }, ${ type }] - returns ${ expected }`, () => {
                const result = isArrayOfType(value, type);

                assert.equal(result, expected, `expected: ${ type },  type: ${ typeof value }`);
            });
        });
    });

    describe('isBigInt', () => {

        it(`isBigInt - [undeclared] - returns false`, () => {
            let value;
            const result = isBigInt(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: true },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isBigInt - [${ key }] - returns ${ expected }`, () => {
                const result = isBigInt(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isBoolean', () => {

        it(`isBoolean - [undeclared] - returns false`, () => {
            let value;
            const result = isBoolean(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: true },
            { key: 'false', value: bool(), expected: true },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'Map', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            { key: 'string[]', value: [ string(), string() ], expected: false },
            { key: 'boolean[]', value: [ bool(), bool() ], expected: false },
            { key: 'number[]', value: [ num(), num() ], expected: false },
            { key: 'object[]', value: [ object(), object() ], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isArray - [${ key }] - returns ${ expected }`, () => {
                const result = isBoolean(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isDefined', () => {

        it(`isDefined - [undeclared] - returns false`, () => {
            let value;
            const result = isDefined(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: true },
            { key: 'string', value: string(), expected: true },
            { key: 'empty string', value: "", expected: true },
            { key: '"true"', value: "true", expected: true },
            { key: '"false"', value: "false", expected: true },
            { key: 'true', value: bool(), expected: true },
            { key: 'false', value: bool(), expected: true },
            { key: 'number', value: num(), expected: true },
            { key: 'object', value: object(), expected: true },
            { key: 'void', value: () => { /* Do nothing */ }, expected: true },
            { key: 'never', value: infiniteFn, expected: true },
            { key: 'bigint', value: bigInt(), expected: true },
            {
                key: 'Map', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: true
            },
            { key: 'string[]', value: [ string(), string() ], expected: true },
            { key: 'boolean[]', value: [ bool(), bool() ], expected: true },
            { key: 'number[]', value: [ num(), num() ], expected: true },
            { key: 'object[]', value: [ object(), object() ], expected: true },

        ].forEach(({ key, value, expected }) => {
            it(`isDefined - [${ key }] - returns ${ expected }`, () => {
                const result = isDefined(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isEmpty', () => {

        it(`isEmpty - [undeclared] - returns false`, () => {
            let value;
            const result = isEmpty(value);
            assert.equal(result, false);
        });

        [
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: true },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: true },
            {
                key: 'Map', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty map', value: new Map(), expected: true
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: true },
        ].forEach(({ key, value, expected }) => {
            it(`isEmpty - [${ key }] - returns ${ expected }`, () => {
                const result = isEmpty(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isFunction', () => {

        it(`isFunction - [undeclared] - returns false`, () => {
            let value;
            const result = isFunction(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: true },
            { key: 'never', value: infiniteFn, expected: true },
            { key: 'typeguard', value: isArray, expected: true },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isFunction - [${ key }] - returns ${ expected }`, () => {
                const result = isFunction(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isIterable', () => {

        it(`isIterable - [undeclared] - returns false`, () => {
            let value;
            const result = isIterable(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: true },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: true },
            { key: '"false"', value: "false", expected: true },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: true
            },
            {
                key: 'empty iterable', value: new Map(), expected: true
            },
            { key: 'array', value: [ string(), string() ], expected: true },
            { key: 'empty array', value: [], expected: true },

        ].forEach(({ key, value, expected }) => {
            it(`isIterable - [${ key }] - returns ${ expected }`, () => {
                const result = isIterable(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isNull', () => {

        it(`isNull - [undeclared] - returns false`, () => {
            let value;
            const result = isNull(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: true },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isNull - [${ key }] - returns ${ expected }`, () => {
                const result = isNull(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isNullOrUndefined', () => {

        it(`isIterable - [undeclared] - returns true`, () => {
            let value;
            const result = isNullOrUndefined(value);
            assert.equal(result, true);
        });

        [
            { key: 'null', value: null, expected: true },
            { key: 'undefined', value: undefined, expected: true },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isIterable - [${ key }] - returns ${ expected }`, () => {
                const result = isNullOrUndefined(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isNullUndefinedOrEmpty', () => {

        it(`isNullUndefinedOrEmpty - [undeclared] - returns true`, () => {
            let value;
            const result = isNullUndefinedOrEmpty(value);
            assert.equal(result, true);
        });

        [
            { key: 'null', value: null, expected: true },
            { key: 'undefined', value: undefined, expected: true },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: true },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: true },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: true
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: true },

        ].forEach(({ key, value, expected }) => {
            it(`isNullUndefinedOrEmpty - [${ key }] - returns ${ expected }`, () => {
                const result = isNullUndefinedOrEmpty(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isNumber', () => {

        it(`isNumber - [undeclared] - returns false`, () => {
            let value;
            const result = isNumber(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: true },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isNumber - [${ key }] - returns ${ expected }`, () => {
                const result = isNumber(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isObject', () => {

        it(`isObject - [undeclared] - returns false`, () => {
            let value;
            const result = isObject(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: true },
            { key: 'empty object', value: {}, expected: true },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'RegExp', value: regExp(), expected: false },
            { key: 'Date', value: date(), expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: true
            },
            {
                key: 'empty iterable', value: new Map(), expected: true
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isObject - [${ key }] - returns ${ expected }`, () => {
                const result = isObject(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isString', () => {

        it(`isString - [undeclared] - returns false`, () => {
            let value;
            const result = isString(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: false },
            { key: 'string', value: string(), expected: true },
            { key: 'empty string', value: "", expected: true },
            { key: '"true"', value: "true", expected: true },
            { key: '"false"', value: "false", expected: true },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'RegExp', value: regExp(), expected: false },
            { key: 'Date', value: date(), expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isString - [${ key }] - returns ${ expected }`, () => {
                const result = isString(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isSymbol', () => {

        it(`isSymbol - [undeclared] - returns false`, () => {
            let value;
            const result = isSymbol(value);
            assert.equal(result, false);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: false },
            { key: 'symbol', value: symbol(), expected: true },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'RegExp', value: regExp(), expected: false },
            { key: 'Date', value: date(), expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isSymbol - [${ key }] - returns ${ expected }`, () => {
                const result = isSymbol(value);

                assert.equal(result, expected);
            });
        });
    });

    describe('isType', () => {

        it(`isType - [undeclared, undefined] - returns true`, () => {
            let value;
            const result = isType(value, 'undefined');
            assert.equal(result, true);
        });

        [
            { key: 'array', type: 'bigint', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'bigint', value: bigInt(), expected: true },
            { key: 'Date', type: 'bigint', value: date(), expected: false },
            { key: 'empty array', type: 'bigint', value: [], expected: false },
            { key: 'empty object', type: 'bigint', value: {}, expected: false },
            { key: 'empty string', type: 'bigint', value: "", expected: false },
            { key: 'false', type: 'bigint', value: false, expected: false },
            { key: 'never', type: 'bigint', value: infiniteFn, expected: false },
            { key: 'null', type: 'bigint', value: null, expected: false },
            { key: 'number', type: 'bigint', value: num(), expected: false },
            { key: 'string', type: 'bigint', value: string(), expected: false },
            { key: 'symbol', type: 'bigint', value: symbol(), expected: false },
            { key: 'RegExp', type: 'bigint', value: regExp(), expected: false },
            { key: 'true', type: 'bigint', value: true, expected: false },
            { key: '"true"', type: 'bigint', value: "true", expected: false },
            { key: 'undefined', type: 'bigint', value: undefined, expected: false },
            { key: 'void', type: 'bigint', value: () => { /* Do nothing */ }, expected: false },

            { key: 'array', type: 'boolean', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'boolean', value: bigInt(), expected: false },
            { key: 'Date', type: 'boolean', value: date(), expected: false },
            { key: 'empty array', type: 'boolean', value: [], expected: false },
            { key: 'empty object', type: 'boolean', value: {}, expected: false },
            { key: 'empty string', type: 'boolean', value: "", expected: false },
            { key: 'false', type: 'boolean', value: false, expected: true },
            { key: 'never', type: 'boolean', value: infiniteFn, expected: false },
            { key: 'null', type: 'boolean', value: null, expected: false },
            { key: 'number', type: 'boolean', value: num(), expected: false },
            { key: 'string', type: 'boolean', value: string(), expected: false },
            { key: 'symbol', type: 'boolean', value: symbol(), expected: false },
            { key: 'RegExp', type: 'boolean', value: regExp(), expected: false },
            { key: 'true', type: 'boolean', value: true, expected: true },
            { key: '"true"', type: 'boolean', value: "true", expected: false },
            { key: 'undefined', type: 'boolean', value: undefined, expected: false },
            { key: 'void', type: 'boolean', value: () => { /* Do nothing */ }, expected: false },

            { key: 'array', type: 'function', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'function', value: bigInt(), expected: false },
            { key: 'Date', type: 'function', value: date(), expected: false },
            { key: 'empty array', type: 'function', value: [], expected: false },
            { key: 'empty object', type: 'function', value: {}, expected: false },
            { key: 'empty string', type: 'function', value: "", expected: false },
            { key: 'false', type: 'function', value: false, expected: false },
            { key: 'never', type: 'function', value: infiniteFn, expected: true },
            { key: 'null', type: 'function', value: null, expected: false },
            { key: 'number', type: 'function', value: num(), expected: false },
            { key: 'string', type: 'function', value: string(), expected: false },
            { key: 'symbol', type: 'function', value: symbol(), expected: false },
            { key: 'RegExp', type: 'function', value: regExp(), expected: false },
            { key: 'true', type: 'function', value: true, expected: false },
            { key: '"true"', type: 'function', value: "true", expected: false },
            { key: 'undefined', type: 'function', value: undefined, expected: false },
            { key: 'void', type: 'function', value: () => { /* Do nothing */ }, expected: true },

            { key: 'array', type: 'number', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'number', value: bigInt(), expected: false },
            { key: 'Date', type: 'number', value: date(), expected: false },
            { key: 'empty array', type: 'number', value: [], expected: false },
            { key: 'empty object', type: 'number', value: {}, expected: false },
            { key: 'empty string', type: 'number', value: "", expected: false },
            { key: 'false', type: 'number', value: false, expected: false },
            { key: 'never', type: 'number', value: infiniteFn, expected: false },
            { key: 'null', type: 'number', value: null, expected: false },
            { key: 'number', type: 'number', value: num(), expected: true },
            { key: 'string', type: 'number', value: string(), expected: false },
            { key: 'symbol', type: 'number', value: symbol(), expected: false },
            { key: 'RegExp', type: 'number', value: regExp(), expected: false },
            { key: 'true', type: 'number', value: true, expected: false },
            { key: '"true"', type: 'number', value: "true", expected: false },
            { key: 'undefined', type: 'number', value: undefined, expected: false },
            { key: 'void', type: 'number', value: () => { /* Do nothing */ }, expected: false },

            { key: 'array', type: 'object', value: [ string(), num() ], expected: true },
            { key: 'bigint', type: 'object', value: bigInt(), expected: false },
            { key: 'Date', type: 'object', value: date(), expected: true },
            { key: 'empty array', type: 'object', value: [], expected: true },
            { key: 'empty object', type: 'object', value: {}, expected: true },
            { key: 'empty string', type: 'object', value: "", expected: false },
            { key: 'false', type: 'object', value: false, expected: false },
            { key: 'never', type: 'object', value: infiniteFn, expected: false },
            { key: 'null', type: 'object', value: null, expected: true },
            { key: 'number', type: 'object', value: num(), expected: false },
            { key: 'string', type: 'object', value: string(), expected: false },
            { key: 'symbol', type: 'object', value: symbol(), expected: false },
            { key: 'RegExp', type: 'object', value: regExp(), expected: true },
            { key: 'true', type: 'object', value: true, expected: false },
            { key: '"true"', type: 'object', value: "true", expected: false },
            { key: 'undefined', type: 'object', value: undefined, expected: false },
            { key: 'void', type: 'object', value: () => { /* Do nothing */ }, expected: false },

            { key: 'array', type: 'string', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'string', value: bigInt(), expected: false },
            { key: 'Date', type: 'string', value: date(), expected: false },
            { key: 'empty array', type: 'string', value: [], expected: false },
            { key: 'empty object', type: 'string', value: {}, expected: false },
            { key: 'empty string', type: 'string', value: "", expected: true },
            { key: 'false', type: 'string', value: false, expected: false },
            { key: 'never', type: 'string', value: infiniteFn, expected: false },
            { key: 'null', type: 'string', value: null, expected: false },
            { key: 'number', type: 'string', value: num(), expected: false },
            { key: 'string', type: 'string', value: string(), expected: true },
            { key: 'symbol', type: 'string', value: symbol(), expected: false },
            { key: 'RegExp', type: 'string', value: regExp(), expected: false },
            { key: 'true', type: 'string', value: true, expected: false },
            { key: '"true"', type: 'string', value: "true", expected: true },
            { key: 'undefined', type: 'string', value: undefined, expected: false },
            { key: 'void', type: 'string', value: () => { /* Do nothing */ }, expected: false },

            { key: 'array', type: 'symbol', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'symbol', value: bigInt(), expected: false },
            { key: 'Date', type: 'symbol', value: date(), expected: false },
            { key: 'empty array', type: 'symbol', value: [], expected: false },
            { key: 'empty object', type: 'symbol', value: {}, expected: false },
            { key: 'empty string', type: 'symbol', value: "", expected: false },
            { key: 'false', type: 'symbol', value: false, expected: false },
            { key: 'never', type: 'symbol', value: infiniteFn, expected: false },
            { key: 'null', type: 'symbol', value: null, expected: false },
            { key: 'number', type: 'symbol', value: num(), expected: false },
            { key: 'string', type: 'symbol', value: string(), expected: false },
            { key: 'symbol', type: 'symbol', value: symbol(), expected: true },
            { key: 'RegExp', type: 'symbol', value: regExp(), expected: false },
            { key: 'true', type: 'symbol', value: true, expected: false },
            { key: '"true"', type: 'symbol', value: "true", expected: false },
            { key: 'undefined', type: 'symbol', value: undefined, expected: false },
            { key: 'void', type: 'symbol', value: () => { /* Do nothing */ }, expected: false },

            { key: 'array', type: 'undefined', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'undefined', value: bigInt(), expected: false },
            { key: 'Date', type: 'undefined', value: date(), expected: false },
            { key: 'empty array', type: 'undefined', value: [], expected: false },
            { key: 'empty object', type: 'undefined', value: {}, expected: false },
            { key: 'empty string', type: 'undefined', value: "", expected: false },
            { key: 'false', type: 'undefined', value: false, expected: false },
            { key: 'never', type: 'undefined', value: infiniteFn, expected: false },
            { key: 'null', type: 'undefined', value: null, expected: false },
            { key: 'number', type: 'undefined', value: num(), expected: false },
            { key: 'string', type: 'undefined', value: string(), expected: false },
            { key: 'symbol', type: 'undefined', value: symbol(), expected: false },
            { key: 'RegExp', type: 'undefined', value: regExp(), expected: false },
            { key: 'true', type: 'undefined', value: true, expected: false },
            { key: '"true"', type: 'undefined', value: "true", expected: false },
            { key: 'undefined', type: 'undefined', value: undefined, expected: true },
            { key: 'void', type: 'undefined', value: () => { /* Do nothing */ }, expected: false },

            { key: 'array', type: 'none of the above', value: [ string(), num() ], expected: false },
            { key: 'bigint', type: 'none of the above', value: bigInt(), expected: false },
            { key: 'Date', type: 'none of the above', value: date(), expected: false },
            { key: 'empty array', type: 'none of the above', value: [], expected: false },
            { key: 'empty object', type: 'none of the above', value: {}, expected: false },
            { key: 'empty string', type: 'none of the above', value: "", expected: false },
            { key: 'false', type: 'none of the above', value: false, expected: false },
            { key: 'never', type: 'none of the above', value: infiniteFn, expected: false },
            { key: 'null', type: 'none of the above', value: null, expected: false },
            { key: 'number', type: 'none of the above', value: num(), expected: false },
            { key: 'string', type: 'none of the above', value: string(), expected: false },
            { key: 'symbol', type: 'none of the above', value: symbol(), expected: false },
            { key: 'RegExp', type: 'none of the above', value: regExp(), expected: false },
            { key: 'true', type: 'none of the above', value: true, expected: false },
            { key: '"true"', type: 'none of the above', value: "true", expected: false },
            { key: 'undefined', type: 'none of the above', value: undefined, expected: false },
            { key: 'void', type: 'none of the above', value: () => { /* Do nothing */ }, expected: false },

        ].forEach(({ key, type, value, expected }) => {
            it(`isType - [${ key }, ${ type }] - returns ${ expected }`, () => {
                const result = isType(value, type);

                assert.equal(result, expected, `expected: ${ type },  type: ${ typeof value }`);
            });
        });
    });

    describe('isUndefined', () => {

        it(`isUndefined - [undeclared] - returns true`, () => {
            let value;
            const result = isUndefined(value);
            assert.equal(result, true);
        });

        [
            { key: 'null', value: null, expected: false },
            { key: 'undefined', value: undefined, expected: true },
            { key: 'string', value: string(), expected: false },
            { key: 'empty string', value: "", expected: false },
            { key: '"true"', value: "true", expected: false },
            { key: '"false"', value: "false", expected: false },
            { key: 'true', value: bool(), expected: false },
            { key: 'false', value: bool(), expected: false },
            { key: 'number', value: num(), expected: false },
            { key: 'object', value: object(), expected: false },
            { key: 'empty object', value: {}, expected: false },
            { key: 'void', value: () => { /* Do nothing */ }, expected: false },
            { key: 'never', value: infiniteFn, expected: false },
            { key: 'RegExp', value: regExp(), expected: false },
            { key: 'Date', value: date(), expected: false },
            { key: 'typeguard', value: isArray, expected: false },
            { key: 'bigint', value: bigInt(), expected: false },
            {
                key: 'iterable', value: new Map([ [ string(), [ string(), string() ] ], [ string(), [ num(), string() ] ] ]), expected: false
            },
            {
                key: 'empty iterable', value: new Map(), expected: false
            },
            { key: 'array', value: [ string(), string() ], expected: false },
            { key: 'empty array', value: [], expected: false },

        ].forEach(({ key, value, expected }) => {
            it(`isUndefined - [${ key }] - returns ${ expected }`, () => {
                const result = isUndefined(value);

                assert.equal(result, expected);
            });
        });
    });
});
