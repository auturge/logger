import { TokenDefinition } from "./TokenDefinition";
import { TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../../ILogEntry";

export class MessageToken extends TokenDefinition {

    /** Returns the entry message */
    public getValue(match: TokenMatch, entry: ILogEntry): string {
        if (match.arguments.length != 0) {
            throw new Error(`Token [${ match.tokenType }] does not support arguments.`);
        }
        return entry.message;
    }

    public getMatches(pattern: string): TokenMatch[] {
        var matches = this.collectMatches(pattern, 'message', 'm');
        return matches;
    }
}
