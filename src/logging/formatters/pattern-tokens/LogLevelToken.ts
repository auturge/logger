import { TokenDefinition } from "./TokenDefinition";
import { TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../ILogEntry";

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
        const maxLength = 5;
        return entry.level.toString().padEnd(maxLength);
    }
}
