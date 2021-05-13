import { TokenDefinition } from "./TokenDefinition";
import { TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../ILogEntry";
import { EntryColorizer, noStyle } from "../EntryColorizer";

// TODO: Add class description comment

export class LogLevelToken extends TokenDefinition {

    // TODO: Add public API comments

    public readonly name: string = 'LogLevelToken';

    protected tokens: string[] = [ 'level', 'l' ];

    /** Returns the log level of the entry */
    public getValue(match: TokenMatch, entry: ILogEntry): string {
        // calculating the max length would 'break' additional loglevels anyway,
        // so let's just go with the maximum known length, 5.

        //...unless we allow the token to SET the max level...
        const length = this.getLength(match.arguments);
        let result = entry.level.toString().padEnd(length);
        if (result.length > length)
            result = result.slice(0, length);

        const color = this.getColor(entry, match.arguments);
        result = color(result);

        return result;
    }

    private getLength(args: string[]): number {
        let length = 5;
        if (!(args && args.length))
            return length;

        args.forEach(arg => {
            arg = arg.trim().toLowerCase();
            if (arg.startsWith('len:')) {
                const value = arg.slice(4);
                length = Number.parseInt(value);
            }
        })
        return length;
    }

    private hasColorArg(args: string[]): boolean {
        let result = false;
        if (!(args && args.length))
            return result;

        args.forEach(arg => {
            arg = arg.trim().toLowerCase();
            if (arg == "color")
                result = true;
        })

        return result;
    }

    private getColor(entry: ILogEntry, args: string[]): (str: string) => string {
        if (!this.hasColorArg(args))
            return noStyle;

        return EntryColorizer.getColor(entry);
    }
}
