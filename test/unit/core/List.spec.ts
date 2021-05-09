import { assert } from 'chai';

import { List } from '@src/core/List';

describe('List', () => {

    let list;

    function setupTestSuite() {
        list = new List();
    }

    describe('add', () => {

        beforeEach(setupTestSuite);

        it('add - adds an item to the list', () => {
            list.add(14);
            list.add(42);

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], 14);
            assert.equal(list[ 1 ], 42);
        });
    });

    describe('replace', () => {
        beforeEach(setupTestSuite);

        it('replace - when the predicate returns true, replaces that item in place, returns the item', () => {
            const item1 = { foo: 14 };
            const item2 = { bar: 42 };
            const item3 = { baz: "dog" };
            list.push(item1);
            list.push(item2);

            const result = list.replace(item3, it => it == item1);

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], item3);
            assert.equal(list[ 1 ], item2);
            assert.equal(result, item3);
        });

        it('replace - when the predicate returns false, does nothing, returns undefined', () => {
            const item1 = { foo: 14 };
            const item2 = { bar: 42 };
            const item3 = { baz: "dog" };
            list.push(item1);
            list.push(item2);

            const result = list.replace(item3, it => it == "mexico");

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], item1);
            assert.equal(list[ 1 ], item2);
            assert.isUndefined(result);
        });
    });

    describe('remove', () => {
        beforeEach(setupTestSuite);

        it('remove - when the predicate returns true, removes that item, returns true', () => {
            const item1 = { foo: 14 };
            const item2 = { bar: 42 };
            list.push(item1);
            list.push(item2);

            const result = list.remove(it => it == item1);

            assert.equal(list.length, 1);
            assert.equal(list[ 0 ], item2);
            assert.isTrue(result);
        });

        it('replace - when the predicate returns false, does nothing, returns false', () => {
            const item1 = { foo: 14 };
            const item2 = { bar: 42 };
            list.push(item1);
            list.push(item2);

            const result = list.remove(it => it == "mexico");

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], item1);
            assert.equal(list[ 1 ], item2);
            assert.isFalse(result);
        });
    });
});
