import { LogLevel } from "./LogLevel";
import { IStatusData } from "./StatusLog/IStatusEntry";

export interface ILogEntryData {
    prettyPrint?: boolean;
    obj?: any;
}

export interface ILogEntry<TData extends ILogEntryData = IStatusData> {

    /** Any accompanying data that should be included and logged. */
    data?: TData;

    /** The level at which to log the message. */
    level: LogLevel;

    /** The message to log. */
    message: string;

    /** The source/logger name of this entry. */
    source: string;

    /** The date and time (UTC) of the entry. */
    timestamp: Date;
}
