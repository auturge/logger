import { ILog } from "./ILog";
import { ILogBuilder } from "./ILogBuilder";
import { IStatusLog } from "./StatusLog/StatusLog";
import { IStatusLogBuilder } from "./StatusLog/StatusLogBuilder";

// TODO: Add interface description comment

export interface ILogManager<
    TLog extends ILog = IStatusLog,
    TLogBuilder extends ILogBuilder = IStatusLogBuilder
    > {

    /** A builder for generating new ILog channels. */
    initialize: TLogBuilder;

    /** Disables the log. */
    disable(logName: string): TLog;

    /** Enables the log. */
    enable(logName: string): TLog;

    /** Gets the log with the given name. Returns `null` if not found. */
    getLog(logName: string): TLog | null;
}
