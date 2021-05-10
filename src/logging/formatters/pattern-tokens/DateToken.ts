import { TokenDefinition } from "./TokenDefinition";
import { TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../ILogEntry";
import { DateFormat, formatDate } from "@src/functions/formatDate";

// TODO: Add description comment

export class DateToken extends TokenDefinition {

    // TODO: Add public API comments

    public readonly name: string = 'DateToken';

    protected tokens: string[] = [ 'date', 'd' ];

    /** Gets and formats the timestamp using
     * - the format specified in the first argument, and
     * - the IANA timezone string specified in the second argument.
     *
     * If no arguments are supplied, then returns the ISO-8601 date/time stamp (YYYY-MM-DDTHH:mm:ss.sssZ).
     *
     * Will throw an error if more than one argument is supplied.
     */
    getValue(match: TokenMatch, entry: ILogEntry): string {
        if (match.arguments.length > 2) {
            throw new Error(`Token [${ match.tokenType }] takes up to two arguments, but you provided ${ match.arguments.length }.`);
        } else if (match.arguments.length > 1) {
            return formatDate(entry.timestamp, match.arguments[ 0 ], match.arguments[ 1 ]);
        } else if (match.arguments.length > 0) {
            return formatDate(entry.timestamp, match.arguments[ 0 ]);
        }
        return formatDate(entry.timestamp, DateFormat.DEFAULT);
    }
}
