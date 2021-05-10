import { ILog } from "./ILog";
import { ILogBuilder } from "./ILogBuilder";
import { ILogEntry } from "./ILogEntry";


export interface ILogManager<
    TEntry extends ILogEntry,
    TLog extends ILog<TLog, TEntry>> {

    /** A builder for generating new ILog channels. */
    initialize: ILogBuilder<TEntry, TLog>;

    /** Disables the log. */
    disable(logName: string): ILog<TLog, TEntry>;

    /** Enables the log. */
    enable(logName: string): ILog<TLog, TEntry>;

    /** Gets the log with the given name. Returns `null` if not found. */
    getLog(logName: string): ILog<TLog, TEntry> | null;
}
