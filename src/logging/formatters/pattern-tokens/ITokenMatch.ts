import { throwIfNullOrLessThan, throwIfNullOrUndefined } from "@src/functions/guards";
import { ITokenArgument } from "./TokenArgument";
import { TokenDefinition } from "./TokenDefinition";

// TODO: Add class description comments

export interface ITokenMatch<TArgument extends ITokenArgument = any> {

    // TODO: Add public API comments

    arguments: TArgument[];
    endIndex: number;
    matched: string;
    startIndex: number;
    tokenType: string;
    value: string;
}

export class TokenMatch<TArgument extends ITokenArgument = any>
    implements ITokenMatch<TArgument> {
    public arguments: TArgument[] = [];
    public endIndex: number = <any>undefined;
    public matched = "";
    public startIndex: number;
    public tokenType: string;
    public value = "";

    constructor(token: TokenDefinition, startIndex: number);
    constructor(token: TokenDefinition, startIndex: number, endIndex: number);
    constructor(token: TokenDefinition, startIndex: number, endIndex?: number) {
        throwIfNullOrUndefined(token, 'token');
        throwIfNullOrLessThan(startIndex, 'startIndex', 0);
        this.tokenType = token.name;
        this.startIndex = startIndex;

        if (endIndex == null)
            return;

        throwIfNullOrLessThan(endIndex, 'endIndex', 0);
        if (endIndex < startIndex) {
            throw new Error('endIndex must not be less than startIndex.');
        }

        this.endIndex = endIndex;
    }

    public get length(): number {
        throwIfNullOrLessThan(this.endIndex, 'endIndex', 0);
        return <any>this.endIndex - this.startIndex + 1;
    }

    public static getArgument(match: ITokenMatch, ...keys: string[]): ITokenArgument | undefined {
        return match.arguments.find(it => keys.includes(it.key));
    }

    public static getArgValue<TValue extends string | number | boolean>(match: ITokenMatch, ...keys: string[]): TValue | undefined {
        const find = match.arguments.find(it => keys.includes(it.key));
        return find ? find.value : undefined;
    }
}
