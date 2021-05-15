import { TokenDefinition } from "./TokenDefinition";
import { ITokenMatch, TokenMatch } from "./ITokenMatch";
import { ILogEntry } from "../../ILogEntry";
import { DateFormat, formatDate } from "@src/functions/formatDate";

// TODO: Add description comment

export class DateToken extends TokenDefinition {

    // TODO: Add public API comments

    public readonly name: string = 'DateToken';

    protected tokens: string[] = [ 'date', 'd' ];

    /** Gets and formats the timestamp using
     * - the format specified in the 'format' (or 'f') argument, and
     * - the IANA timezone string specified in the 'timezone' (or 'tz') argument.
     *
     * If no arguments are supplied, then returns the DEFAULT date/time stamp (yyyy-MM-dd HH:mm:ss.SSS -0700) in the local timezone.
     *
     * Will throw an error if more than two arguments are supplied.
     */
    getValue(match: ITokenMatch, entry: ILogEntry): string {
        const format = this.getFormat(match);
        const tz = this.getTimezone(match);

        return !!(tz)
            ? formatDate(entry.timestamp, format, tz)
            : formatDate(entry.timestamp, format);
    }

    private getFormat(match: ITokenMatch): string {
        const value = TokenMatch.getArgValue<string>(match, 'format', 'f');
        return value || DateFormat.DEFAULT;
    }

    private getTimezone(match: ITokenMatch): string | undefined {
        const value = TokenMatch.getArgValue<string>(match, 'timezone', 'tz');
        return value ? value.trim() : undefined;
    }
}
