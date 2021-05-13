import * as  sinon from 'sinon';
import { assert } from 'chai';

import { Emitter, EventHandler } from '@src/core/events';

interface TestEventArgs {
    foo: string;
}

describe('events', () => {

    describe('Emitter', () => {

        describe('emit', () => {

            it('emit - [void] - iterates over the list of event subscribers, and executes each one', () => {
                const handler1 = sinon.spy();
                const handler2 = sinon.spy();
                const handler3 = sinon.spy();
                const subscribers = [ handler1, handler2, handler3 ];
                const emitter = new Emitter();
                emitter[ '_subscribers' ] = subscribers;

                emitter.emit();

                sinon.assert.calledOnceWithExactly(handler1, undefined);
                sinon.assert.calledOnceWithExactly(handler2, undefined);
                sinon.assert.calledOnceWithExactly(handler3, undefined);
            });

            it('emit - [typed] - iterates over the list of event subscribers, and executes each one', () => {
                const handler1 = sinon.spy();
                const handler2 = sinon.spy();
                const handler3 = sinon.spy();
                const subscribers = [ handler1, handler2, handler3 ];
                const emitter = new Emitter<TestEventArgs>();
                emitter[ '_subscribers' ] = subscribers;
                const args: TestEventArgs = { foo: 'bar' };

                emitter.emit(args);

                sinon.assert.calledOnceWithExactly(handler1, args);
                sinon.assert.calledOnceWithExactly(handler2, args);
                sinon.assert.calledOnceWithExactly(handler3, args);
            });
        });

        describe('subscribers', () => {

            it('subscribers - returns the list of event subscribers', () => {
                const handler: EventHandler = () => { /* Do nothing */ };
                const subscribers = [ handler ];
                const emitter = new Emitter();
                emitter[ '_subscribers' ] = subscribers;

                const result = emitter.subscribers;

                assert.equal(result, subscribers);
            });
        });


        describe('subscribe', () => {

            it('subscribe - adds an event handler', () => {
                const handler1: EventHandler = () => { /* Do nothing */ };
                const handler2: EventHandler = () => { /* Do nothing */ };
                const handler3: EventHandler = () => { /* Do nothing */ };
                const subscribers = [ handler1, handler2 ];
                const expected = [ handler1, handler2, handler3 ];
                const emitter = new Emitter();
                emitter[ '_subscribers' ] = subscribers;

                emitter.subscribe(handler3);

                assert.deepEqual(emitter[ '_subscribers' ], expected);
            });
        });

        describe('unsubscribe', () => {

            it('unsubscribe - removes an event handler', () => {
                const handler1: EventHandler = () => { /* Do nothing */ };
                const handler2: EventHandler = () => { /* Do nothing */ };
                const handler3: EventHandler = () => { /* Do nothing */ };
                const expected = [ handler1, handler3 ];
                const subscribers = [ handler1, handler2, handler3 ];
                const emitter = new Emitter();
                emitter[ '_subscribers' ] = subscribers;

                emitter.unsubscribe(handler2);

                assert.deepEqual(emitter[ '_subscribers' ], expected);
            });
        });

        describe('clear', () => {

            it('clear - removes all event subscribers', () => {
                const handler1: EventHandler = () => { /* Do nothing */ };
                const handler2: EventHandler = () => { /* Do nothing */ };
                const handler3: EventHandler = () => { /* Do nothing */ };
                const subscribers = [ handler1, handler2, handler3 ];
                const expected = [];
                const emitter = new Emitter();
                emitter[ '_subscribers' ] = subscribers;

                emitter.clear();

                assert.deepEqual(emitter[ '_subscribers' ], expected);
            });
        });

    });
});
