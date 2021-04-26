import { throwIfNullOrLessThan, throwIfNullOrUndefined } from "@src/functions/guards";
import { TokenDefinition } from "./TokenDefinition";

export interface ITokenMatch {
    arguments: string[];
    endIndex: number;
    matched: string;
    startIndex: number;
    tokenType: string;
    value: string;
}

export class TokenMatch implements ITokenMatch {
    public arguments: string[] = [];
    public endIndex: number = <any>undefined;
    public matched: string = "";
    public startIndex: number;
    public tokenType: string;
    public value: string = "";


    constructor(token: TokenDefinition, startIndex: number);
    constructor(token: TokenDefinition, startIndex: number, endIndex: number);
    constructor(token: TokenDefinition, startIndex: number, endIndex?: number) {
        throwIfNullOrUndefined(token, 'token');
        throwIfNullOrLessThan(startIndex, 'startIndex', 0);
        this.tokenType = token.constructor.name;
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
}
