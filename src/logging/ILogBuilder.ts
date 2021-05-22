import { Emitter } from "@src/core/events";
import { ILog } from "./ILog";
import { IStatusLog } from "./StatusLog/StatusLog";

/** An interface describing the minimum pieces of a fluent interface for building loggers. */
export interface ILogBuilder<TLog extends ILog = IStatusLog> {

    /** Finalizes the configuration, and then creates and returns the corresponding `TLog`. */
    andGetLogger(): TLog;

    /** An emitter that fires when a new logger is created. */
    readonly logCreated: Emitter<TLog>;
}
