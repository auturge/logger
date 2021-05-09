import Sinon = require("sinon");
import { assert } from "chai";
import { AnyRandom } from "@auturge/testing";

import { throwIfNullOrEmpty } from "@src/functions/guards";

import { IChannel } from "@src/logging/IChannel";
import { ILogEntry } from "@src/logging/ILogEntry";

export function stub(owner, method): Sinon.SinonStub {
    return Sinon.stub(<any>owner, method);
}

/** Unwraps a Sinon spy/stub, releasing the spy/stub to be spied/stubbed again. */
/* eslint-disable */
export function unwrap(sinonStub: any): void {
    (<any>sinonStub).restore();
}
/* eslint-enable */

export function other<T>(array: T[], badValue: T): T {
    throwIfNullOrEmpty(array, 'array');
    if (array.length < 2)
        throw ("Array must have more than one option.");

    do {
        /* eslint-disable no-var */
        var item = AnyRandom.oneOf(array);
        /* eslint-enable no-var */
    } while (item == badValue);

    return item;
}

export function channelMatches<TEntry extends ILogEntry>(expected: IChannel<TEntry>, actual: IChannel<TEntry>) {
    // assert.equal(actual.enabled, expected.enabled, "'enabled' does not match");
    assert.equal(actual.name, expected.name, "'name' does not match");
    // assert.deepEqual(actual.formatter, expected.formatter, "'formatter' does not match");
    assert.deepEqual(actual.level, expected.level, "'logLevel' does not match");
    // assert.deepEqual(actual.target, expected.target, "'target' does not match");
}


/** Gets a random number between `MIN_VALUE` and `MAX_VALUE`
 * @param MIN_VALUE
 * @param MAX_VALUE
 */
export function getNumberBetween(MIN_VALUE: number, MAX_VALUE: number): number {
    // min + [ random * (max - min) ]
    // but (max - min) might be too big for the poor computer :)
    // so do it like this
    // min + [ (random * max) - (random * min) ]
    const randoMax = Math.random() * MAX_VALUE;
    const randoMin = Math.random() * MIN_VALUE;
    const result = MIN_VALUE + randoMax - randoMin;
    return result;
}

/** Gets a random number between `MIN_VALUE` and `MAX_VALUE`
 * @param MIN_VALUE
 * @param MAX_VALUE
 */
export function getIntegerBetween(MIN_VALUE: number, MAX_VALUE: number): number {
    // min + [ random * (max - min) ]
    // but (max - min) might be too big for the poor computer :)
    // so do it like this
    // min + (random * max) - (random * min)
    const randoMax = Math.ceil(Math.random() * MAX_VALUE);
    const randoMin = Math.floor(Math.random() * MIN_VALUE);
    const result = MIN_VALUE + randoMax - randoMin;
    return result;
}

/** Gets two random numbers, between `MIN_VALUE` and `MAX_VALUE`, and returns them in a sorted array.
 * @param MIN_VALUE
 * @param MAX_VALUE
 */
export function randoMinMax(MIN_VALUE: number, MAX_VALUE: number): number[];

/** Gets two random numbers, between `MIN_VALUE` and `MAX_VALUE`, and returns them in a sorted array.
 * @param MIN_VALUE
 * @param MAX_VALUE
 * @param Swap
 */
export function randoMinMax(MIN_VALUE: number, MAX_VALUE: number, swap = false): number[] {
    const values = [ getNumberBetween(MIN_VALUE, MAX_VALUE), getNumberBetween(MIN_VALUE, MAX_VALUE) ];
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    return swap ? [ maxValue, minValue ] : [ minValue, maxValue ];
}

/** Gets two random integers, between `MIN_VALUE` and `MAX_VALUE`, and returns them in a sorted array.
 * @param MIN_VALUE
 * @param MAX_VALUE
 * @param Swap
 */
export function randoIntMinMax(MIN_VALUE: number, MAX_VALUE: number, swap = false): number[] {
    const values = [
        getIntegerBetween(MIN_VALUE, MAX_VALUE),
        getIntegerBetween(MIN_VALUE, MAX_VALUE),
    ];
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    return swap ? [ minValue, maxValue ] : [ maxValue, minValue ];
}
