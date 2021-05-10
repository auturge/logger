import { ILog } from "./ILog";
import { ILogBuilder } from "./ILogBuilder";
import { ILogEntry, ILogEntryData } from "./ILogEntry";


export interface ILogManager<
    TLog extends ILog<TLog, TEntry, TData, TWriterConfig>,
    TEntry extends ILogEntry<TData>,
    TData extends ILogEntryData,
    TWriterConfig
    > {

    /** A builder for generating new ILog channels. */
    initialize: ILogBuilder<TLog, TEntry, TData, TWriterConfig>;

    /** Disables the log. */
    disable(logName: string): ILog<TLog, TEntry, TData, TWriterConfig>;

    /** Enables the log. */
    enable(logName: string): ILog<TLog, TEntry, TData, TWriterConfig>;

    /** Gets the log with the given name. Returns `null` if not found. */
    getLog(logName: string): ILog<TLog, TEntry, TData, TWriterConfig> | null;
}
