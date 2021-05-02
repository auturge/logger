import { throwIfNullOrUndefined } from "./guards";
import { format, utcToZonedTime } from 'date-fns-tz';
import { parseISO } from "date-fns";
import { isNullUndefinedOrEmpty } from "./types";

const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

interface IDateFormatOptions {
    format: string,
    timezone: string
}

export enum DateFormat {
    DEFAULT = "yyyy-MM-dd HH:mm:ss.SSS xxx",
    ISO = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    UTC = "EEE',' dd MMM yyyy HH:mm:ss z",
    LONG = "yyyy-MM-dd HH:mm:ss ZZZZ",
}

class DateFormatOptions implements IDateFormatOptions {
    format: string;
    timezone: string;

    public constructor(format: string, timezone: string) {
        this.format = format;
        this.timezone = timezone;
    }

    public static DEFAULT = Object.freeze(new DateFormatOptions(DateFormat.DEFAULT, localTimeZone));
}

// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table

export function formatDate(timestamp: Date): string;
export function formatDate(timestamp: Date, formatString: string): string;
export function formatDate(timestamp: Date, formatString: string, timezone: string): string;
export function formatDate(timestamp: Date, formatString?: string, timezone?: string): string {
    throwIfNullOrUndefined(timestamp, 'timestamp');
    const options: IDateFormatOptions = getOptions(formatString, timezone);

    options.format = options.format.trim();
    options.timezone = options.timezone.trim();

    // The built-in Date data type carries no timezone info, and
    // internally represents only a moment in time, relative to the LOCAL TIME ZONE.

    // Since the desired timezone might not be local, we need to
    // shift that moment to the proper time zone, and then we can format it.
    // reference: https://stackoverflow.com/a/63227335

    const formatInTimeZone = (date: Date, options: IDateFormatOptions) =>
        format(utcToZonedTime(date, options.timezone), options.format, { timeZone: options.timezone });

    const parsedTime = parseISO(timestamp.toISOString());
    const result = formatInTimeZone(parsedTime, options);
    return result;
}


function getOptions(formatString?: string, timezone?: string): IDateFormatOptions {

    var options: IDateFormatOptions = Object.assign({}, DateFormatOptions.DEFAULT);

    if (!isNullUndefinedOrEmpty(formatString)) {
        options.format = formatString.trim();
    }

    if (!isNullUndefinedOrEmpty(timezone)) {
        options.timezone = timezone.trim();
    }

    return options;
}
