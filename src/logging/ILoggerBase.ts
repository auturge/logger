import { Emitter } from "@src/core/events";
import { IChannel } from "./IChannel";
import { ILogEntry, ILogEntryData } from "./ILogEntry";
import { LogLevel } from "./LogLevel";
import { ILog } from "./ILog";

/** An interface describing a multi-channel logging mechanism. */

export interface ILoggerBase<
    TLog extends ILog<TLog, TEntry, TData, TWriterConfig>,
    TEntry extends ILogEntry<TData>,
    TData extends ILogEntryData,
    TWriterConfig> {

    /** Gets the underlying logging channels. */
    readonly channels: IChannel<TEntry, TData, TWriterConfig>[];

    /** The name of this logger. */
    readonly name: string;

    /** The event which fires when the logger is reconfigured. */
    reconfigured: Emitter<TLog>;

    /** Gets or sets whether this logger is enabled. */
    enabled: boolean;

    /** Sets the `LogLevel` for all channels. */
    setLevel(level: LogLevel): void;
}
