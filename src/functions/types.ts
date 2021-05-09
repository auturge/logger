/* eslint-disable
    @typescript-eslint/ban-types,
    @typescript-eslint/explicit-module-boundary-types,
    @typescript-eslint/no-namespace
*/

export const hasOwnProperty = Object.prototype.hasOwnProperty;

type Bottom<T> = T extends string ? Empty.String
    : T extends any[] ? Empty.Array
    : T extends object ? Empty.Object
    // : T extends Record<string, unknown> ? Empty.Object
    : never;

export namespace Empty {
    export type String = '';
    export type Object = Record<string, never>;
    export type Array = never[];
}

export type Empty = | Empty.Array | Empty.Object | Empty.String;


export function isArray(array: any): array is any[] {
    return Array.isArray(array);
}

export function isBigInt(value: unknown): value is bigint {
    return (typeof value === 'bigint');
}

export function isBoolean(value: unknown): value is boolean {
    return (value === true || value === false);
}

export function isDefined<T>(value: T | null | undefined): value is T {
    return !isNullOrUndefined(value);
}

export function isEmpty<T extends string | any[] | object>(value: T | Empty): value is Bottom<T> {
    if (isString(value) || isArray(value))
        return value.length === 0;

    if (isIterable(value)) {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        for (const _ of value) {
            return false;
        }
        /* eslint-enable @typescript-eslint/no-unused-vars */
        return true;
    }

    if (isObject(value))
        return Object.keys(value).length === 0;

    return false;
}

export function isFunction(value: unknown): value is Function {
    return (typeof value === 'function');
}

export function isIterable(value: unknown): value is Iterable<unknown> {
    return !!value && typeof (value as any)[ Symbol.iterator ] === 'function';
}

export function isNull(value): value is null {
    return value === null;
}

export function isNullOrUndefined(value: unknown): value is undefined | null {
    // NOTE: Always check for undefined/undeclared FIRST
    return (isUndefined(value) || isNull(value));
}

export function isNullUndefinedOrEmpty(value): value is undefined | null | "" | any[] {
    return isNullOrUndefined(value) || isEmpty(value);
}

export function isNumber(value: unknown): value is number {
    return (typeof value === 'number' && !isNaN(value));
}

export function isObject(value: unknown): value is Object {
    // The method can't do a type cast since there are type (like strings) which
    // are subclasses of any but not positively matched by the function.
    // Hence type narrowing results in wrong results.
    return typeof value === 'object'
        && value !== null
        && !Array.isArray(value)
        && !(value instanceof RegExp)
        && !(value instanceof Date);
}

export function isString(value: unknown): value is string {
    return (typeof value === 'string');
}

export function isSymbol(value: unknown): value is symbol {
    return (typeof value === 'symbol');
}

export function isUndefined(value): value is undefined {
    return (typeof value === 'undefined');
}

export function isType<T>(value: unknown, type: string): value is T {
    if (type === "bigint")
        return isBigInt(value);
    if (type === "boolean")
        return isBoolean(value);
    if (type === "function")
        return isFunction(value);
    if (type === "number")
        return isNumber(value);
    if (type === "object")
        return typeof value === "object";
    if (type === "string")
        return isString(value);
    if (type === "symbol")
        return isSymbol(value);
    if (type === "undefined")
        return isUndefined(value);

    //... what kind of thing IS this?
    return false;
}

export function isArrayOfType<T>(value: unknown, type: string): value is T[] {

    if (!Array.isArray(value)) {
        return false;
    }

    return (<unknown[]>value).every(elem => isType(elem, type));
}

// export function isStringArray(value: unknown): value is string[] {
//     return Array.isArray(value) && (<unknown[]>value).every(elem => isString(elem));
// }
