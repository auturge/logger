import { TokenDefinition } from "./TokenDefinition";
import { ITokenMatch, TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../ILogEntry";
import { EntryColorizer, noStyle } from "../EntryColorizer";

// TODO: Add class description comment

export class LogLevelToken extends TokenDefinition {

    // TODO: Add public API comments

    public readonly name: string = 'LogLevelToken';

    protected tokens: string[] = [ 'level', 'l' ];

    /** Returns the log level of the entry */
    public getValue(match: ITokenMatch, entry: ILogEntry): string {
        const length = this.getLength(match);
        const color = this.getColor(match, entry);

        let result = entry.level.toString().padEnd(length);
        if (result.length > length)
            result = result.slice(0, length);
        result = color(result);

        return result;
    }

    private getLength(match: ITokenMatch): number {
        const value = TokenMatch.getArgValue<number>(match, 'length', 'len', 'l');
        return value || 5;
    }

    private getColor(match: ITokenMatch, entry: ILogEntry): (str: string) => string {
        const arg = TokenMatch.getArgument(match, 'color', 'c');
        return arg ? EntryColorizer.getColor(entry) : noStyle;
    }
}
