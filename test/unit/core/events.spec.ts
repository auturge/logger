import * as  sinon from 'sinon';
import { assert } from 'chai';

import { Emitter, EventHandler } from '@src/core/events';

interface TestEventArgs {
    foo: string;
}

describe('events', () => {

    describe('Emitter', () => {

        describe('emit', () => {

            it('emit - [void] - iterates over the list of event handlers, and executes each one', () => {
                var handler1 = sinon.spy();
                var handler2 = sinon.spy();
                var handler3 = sinon.spy();
                var handlers = [ handler1, handler2, handler3 ];
                var emitter = new Emitter();
                emitter[ '_handlers' ] = handlers;

                emitter.emit();

                sinon.assert.calledOnceWithExactly(handler1, undefined);
                sinon.assert.calledOnceWithExactly(handler2, undefined);
                sinon.assert.calledOnceWithExactly(handler3, undefined);
            });

            it('emit - [typed] - iterates over the list of event handlers, and executes each one', () => {
                var handler1 = sinon.spy();
                var handler2 = sinon.spy();
                var handler3 = sinon.spy();
                var handlers = [ handler1, handler2, handler3 ];
                var emitter = new Emitter<TestEventArgs>();
                emitter[ '_handlers' ] = handlers;
                const args: TestEventArgs = { foo: 'bar' };

                emitter.emit(args);

                sinon.assert.calledOnceWithExactly(handler1, args);
                sinon.assert.calledOnceWithExactly(handler2, args);
                sinon.assert.calledOnceWithExactly(handler3, args);
            });
        });

        describe('subscribers', () => {

            it('subscribers - returns the list of event handlers', () => {
                var handler: EventHandler = (e) => { };
                var handlers = [ handler ];
                var emitter = new Emitter();
                emitter[ '_handlers' ] = handlers;

                var result = emitter.subscribers;

                assert.equal(result, handlers);
            });
        });


        describe('subscribe', () => {

            it('subscribe - adds an event handler', () => {
                var handler1: EventHandler = (e) => { };
                var handler2: EventHandler = (e) => { };
                var handler3: EventHandler = (e) => { };
                var handlers = [ handler1, handler2 ];
                var expected = [ handler1, handler2, handler3 ];
                var emitter = new Emitter();
                emitter[ '_handlers' ] = handlers;

                emitter.subscribe(handler3);

                assert.deepEqual(emitter[ '_handlers' ], expected);
            });
        });

        describe('unsubscribe', () => {

            it('unsubscribe - removes an event handler', () => {
                var handler1: EventHandler = (e) => { };
                var handler2: EventHandler = (e) => { };
                var handler3: EventHandler = (e) => { };
                var expected = [ handler1, handler3 ];
                var handlers = [ handler1, handler2, handler3 ];
                var emitter = new Emitter();
                emitter[ '_handlers' ] = handlers;

                emitter.unsubscribe(handler2);

                assert.deepEqual(emitter[ '_handlers' ], expected);
            });
        });

        describe('clear', () => {

            it('clear - removes all event handlers', () => {
                var handler1: EventHandler = (e) => { };
                var handler2: EventHandler = (e) => { };
                var handler3: EventHandler = (e) => { };
                var handlers = [ handler1, handler2, handler3 ];
                var expected = [];
                var emitter = new Emitter();
                emitter[ '_handlers' ] = handlers;

                emitter.clear();

                assert.deepEqual(emitter[ '_handlers' ], expected);
            });
        });

    });
});
