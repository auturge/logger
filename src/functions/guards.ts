/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { isBoolean, isEmpty, isNull, isNullOrUndefined, isNumber, isString, isSymbol, isUndefined } from "./types";

// TODO: Add public API comments

export function getArgumentNullErrorMessage(name: string): string {
    return `Argument [${ name }] must not be null.`;
}

export function getArgumentUndefinedErrorMessage(name: string): string {
    return `Argument [${ name }] must not be undefined.`;
}

export function getArgumentEmptyErrorMessage(name: string): string {
    return `Argument [${ name }] must not be empty.`;
}

export function getNullOrUndefinedErrorMessage(name: string): string {
    return `Argument [${ name }] must not be null or undefined.`;
}

export function getNullOrLessThanErrorMessage(name: string, obj: number, minimum: number): string {
    return `Number ['${ name }'] has a value of ${ obj }, but is expected to be at least ${ minimum }.`;
}

export function getNullOrLTEErrorMessage(name: string, obj: number, minimum: number): string {
    return `Number ['${ name }'] has a value of ${ obj }, but is expected to be greater than ${ minimum }.`;
}

export function getValueMustNotEqualErrorMessage<T>(name: string, badValue: T, type = ""): string {
    const msg = `['${ name }'] must not equal ${ badValue }.`;
    return (type.length) ? `${ type } ${ msg }` : msg;
}

export function getNullOrGreaterThanErrorMessage(name: string, obj: number, maximum: number): string {
    return `Number ['${ name }'] has a value of ${ obj }, but is expected to be at most ${ maximum }.`;
}

export function getNullOrGTEErrorMessage(name: string, obj: number, maximum: number): string {
    return `Number ['${ name }'] has a value of ${ obj }, but is expected to be less than ${ maximum }.`;
}

export function throwIfNull(object: any, name: string): void | never {
    if (isNull(object)) {
        const message = getArgumentNullErrorMessage(name);
        throw new TypeError(message);
    }
}

export function throwIfUndefined(object: any, name: string): void {
    if (isUndefined(object)) {
        const message = getArgumentUndefinedErrorMessage(name);
        throw new TypeError(message);
    }
}

export function throwIfEmpty(object: any, name: string): void {
    if (isEmpty(object)) {
        const message = getArgumentEmptyErrorMessage(name);
        throw new TypeError(message);
    }
}

export function throwIfNullOrUndefined(object: any, name: string): void {
    throwIfNull(object, name);
    throwIfUndefined(object, name);
}

export function throwIfNullOrEmpty(object: any, name: string): void {
    throwIfNull(object, name);
    throwIfUndefined(object, name);
    throwIfEmpty(object, name);
}

export function throwIfNullOrLessThan(obj: number | null | undefined, name: string, minimum: number): void {
    if (isNullOrUndefined(obj)) {
        throwIfNullOrUndefined(obj, name);
    } else {
        if (obj < minimum) {
            const message = getNullOrLessThanErrorMessage(name, obj, minimum);
            throw new Error(message);
        }
    }
}

export function throwIfNullOrLTE(obj: number | null | undefined, name: string, minimum: number): void {
    if (isNullOrUndefined(obj)) {
        throwIfNullOrUndefined(obj, name);
    } else {
        throwIfEqualTo(obj, name, minimum);
        if (obj < minimum) {
            const message = getNullOrLTEErrorMessage(name, obj, minimum);
            throw new Error(message);
        }
    }
}

export function areNumbersAlmostEqual(num1: number, num2: number): boolean {
    return Math.abs(num1 - num2) < Number.EPSILON;
}

type Primitive = string | number | boolean | symbol | undefined | null;
export function throwIfEqualTo<T extends Primitive>(obj: any, name: string, badValue: T): void {
    let message = "";
    if (isBoolean(badValue) && obj == badValue)
        message = getValueMustNotEqualErrorMessage(name, badValue, "Boolean");

    if (isString(badValue) && obj == badValue)
        message = getValueMustNotEqualErrorMessage(name, badValue, "String");

    if (isNumber(badValue) && isNumber(obj) && areNumbersAlmostEqual(obj, <number>badValue))
        message = getValueMustNotEqualErrorMessage(name, badValue, "Number");

    if (isSymbol(badValue) && obj == badValue)
        message = getValueMustNotEqualErrorMessage(name, badValue, "Symbol");

    if (isNull(badValue) && obj === null)
        message = getValueMustNotEqualErrorMessage(name, "null");

    if (typeof badValue === "undefined" && typeof obj === "undefined")
        message = getValueMustNotEqualErrorMessage(name, "undefined");

    if (message === "")
        return;

    throw new Error(message);
}

export function throwIfNullOrGTE(obj: number | null | undefined, name: string, maximum: number): void {
    if (isNullOrUndefined(obj)) {
        throwIfNullOrUndefined(obj, name);
    } else {
        throwIfEqualTo(obj, name, maximum);
        if (obj > maximum) {
            const message = getNullOrGTEErrorMessage(name, obj, maximum);
            throw new Error(message);
        }
    }
}

export function throwIfNullOrGreaterThan(obj: number | null | undefined, name: string, maximum: number): void {
    if (isNullOrUndefined(obj)) {
        throwIfNullOrUndefined(obj, name);
    } else {
        if (obj > maximum) {
            const message = getNullOrGreaterThanErrorMessage(name, obj, maximum);
            throw new Error(message);
        }
    }
}
