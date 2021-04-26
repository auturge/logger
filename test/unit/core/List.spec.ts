import { assert } from 'chai';

import { List } from '@src/core/List';

describe('List', () => {

    var list;
    beforeEach(() => {
        list = new List();
    })

    describe('add', () => {

        it('add - adds an item to the list', () => {
            var list = new List();

            list.add(14);
            list.add(42);

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], 14);
            assert.equal(list[ 1 ], 42);
        });
    });

    describe('replace', () => {

        it('replace - when the predicate returns true, replaces that item in place, returns the item', () => {
            var item1 = { foo: 14 };
            var item2 = { bar: 42 };
            var item3 = { baz: "dog" };
            var list = new List();
            list.push(item1);
            list.push(item2);

            var result = list.replace(item3, it => it == item1);

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], item3);
            assert.equal(list[ 1 ], item2);
            assert.equal(result, item3);
        });

        it('replace - when the predicate returns false, does nothing, returns undefined', () => {
            var item1 = { foo: 14 };
            var item2 = { bar: 42 };
            var item3 = { baz: "dog" };
            var list = new List();
            list.push(item1);
            list.push(item2);

            var result = list.replace(item3, it => it == "mexico");

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], item1);
            assert.equal(list[ 1 ], item2);
            assert.isUndefined(result);
        });
    });

    describe('remove', () => {

        it('remove - when the predicate returns true, removes that item, returns true', () => {
            var item1 = { foo: 14 };
            var item2 = { bar: 42 };
            var list = new List();
            list.push(item1);
            list.push(item2);

            var result = list.remove(it => it == item1);

            assert.equal(list.length, 1);
            assert.equal(list[ 0 ], item2);
            assert.isTrue(result);
        });

        it('replace - when the predicate returns false, does nothing, returns false', () => {
            var item1 = { foo: 14 };
            var item2 = { bar: 42 };
            var list = new List();
            list.push(item1);
            list.push(item2);

            var result = list.remove(it => it == "mexico");

            assert.equal(list.length, 2);
            assert.equal(list[ 0 ], item1);
            assert.equal(list[ 1 ], item2);
            assert.isFalse(result);
        });
    });
});
