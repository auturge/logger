import { throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";

const ARGUMENT_SPLITTER = ':';

export interface IKeyedItem {
    key: string;
}
export interface ITokenArgument<TValue extends string | number | boolean | undefined = undefined> extends IKeyedItem {
    value?: TValue;
}

export class TokenArgument<TValue extends string | number | boolean | undefined = undefined> implements ITokenArgument<TValue> {

    public key: string;

    constructor(key: string) {
        throwIfNullOrEmpty(key, 'key');
        this.key = key.toLowerCase().trim();
    }

    public static fromString<TVal extends string | number | boolean>(arg: string): TokenArgument<TVal> {
        throwIfNullOrEmpty(arg, 'arg');
        const splitterIndex = arg.indexOf(ARGUMENT_SPLITTER);
        if (splitterIndex == -1)
            return new TokenArgument<undefined>(arg);

        const key = arg.slice(0, splitterIndex);
        const value = arg.slice(splitterIndex + 1);

        const num = Number(value);
        const result = isNaN(num)
            ? new StringValueTokenArgument(key, value)
            : new NumericValueTokenArgument(key, num);

        return result;
    }
}

export class StringValueTokenArgument extends TokenArgument<string> {

    public readonly value: string;

    constructor(key: string, value: string) {
        super(key);
        throwIfNullOrEmpty(value, 'value');
        this.value = value;
    }
}

export class NumericValueTokenArgument extends TokenArgument<number> {

    public readonly value: number;

    constructor(key: string, value: number) {
        super(key);
        throwIfNullOrUndefined(value, 'value');
        this.value = value;
    }
}
