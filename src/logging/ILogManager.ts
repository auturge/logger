import { ILog } from "./ILog";
import { ILogBuilder } from "./ILogBuilder";

// TODO: Add interface description comment

export interface ILogManager<TLog extends ILog = ILog> {

    /** A builder for generating new ILog channels. */
    initialize: ILogBuilder<TLog>;

    /** Disables the log. */
    disable(logName: string): TLog;

    /** Enables the log. */
    enable(logName: string): TLog;

    /** Gets the log with the given name. Returns `null` if not found. */
    getLog(logName: string): TLog | null;
}
