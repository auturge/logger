import { TokenDefinition } from "./TokenDefinition";
import { ITokenMatch, TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../ILogEntry";
import { EntryColorizer, noStyle } from "../EntryColorizer";

// TODO: Add class description comment

export class SourceToken extends TokenDefinition {

    // TODO: Add public API comments

    public readonly name: string = 'SourceToken';

    protected tokens: string[] = [ 'source', 's' ];

    /** Returns the log level of the entry */
    public getValue(match: TokenMatch, entry: ILogEntry): string {
        const length = this.getLength(match);
        const color = this.getColor(match);

        let result = this.setLength(entry.source, length);
        result = color(result);

        return result;
    }

    private setLength(value: string, length: number): string {
        if (length == -1)
            return value;

        let result = value.padEnd(length);
        if (result.length > length)
            result = result.slice(0, length);
        return result;
    }

    private getLength(match: ITokenMatch): number {
        const value = TokenMatch.getArgValue<number>(match, 'length', 'len', 'l');
        return value || -1;
    }

    private getColor(match: ITokenMatch): (str: string) => string {
        const value = TokenMatch.getArgValue<string>(match, 'color', 'c');
        return value ? EntryColorizer.fromString(value) : noStyle;
    }
}
