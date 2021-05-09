import { TokenDefinition } from "./TokenDefinition";
import { TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../ILogEntry";

export class LogLevelToken extends TokenDefinition {

    protected tokens: string[] = [ 'level', 'l' ];

    /** Returns the log level of the entry */
    public getValue(match: TokenMatch, entry: ILogEntry): string {
        // calculating the max length would 'break' additional loglevels anyway,
        // so let's just go with the maximum known length, 5.

        //...unless we allow the token to SET the max level...
        var maxLength = 5;
        return entry.level.toString().padEnd(maxLength);
    }
}
