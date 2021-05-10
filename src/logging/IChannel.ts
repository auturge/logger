import { LogLevel } from "./LogLevel";
import { ILogEntry, ILogEntryData } from "./ILogEntry";
import { IWriter } from "./IWriter";
import { Emitter } from "@src/core/events";

/** An interface describing a single log writing implementation. */
export interface ILogEntryWriter<TEntry extends ILogEntry<TData>, TData extends ILogEntryData, TWriterConfig> {

    /** Gets the underlying writer implementation. */
    readonly writer: IWriter<TEntry, TData, TWriterConfig>;
}

/** Interface describing a single target for log-writing output. */
export interface IChannel<TEntry extends ILogEntry<TData>, TData extends ILogEntryData, TWriterConfig>
    extends ILogEntryWriter<TEntry, TData, TWriterConfig> {

    /** Gets or sets whether this channel is enabled. */
    enabled: boolean;

    /** Gets or sets the maximum level/verbosity at which this channel will log. */
    level: LogLevel;

    /** Gets the name of the channel. */
    readonly name: string;

    /** The output pattern to be used with this channel. */
    // pattern: string;

    /** The event which fires when the channel is reconfigured. */
    reconfigured: Emitter<IChannel<TEntry, TData, TWriterConfig>>;

    /** Checks if the channel is enabled for the specified `level`.
    * @param {LogLevel} level The level to check.
    */
    isEnabledFor(level: LogLevel): boolean;

    /** The generic log-writing method.
     * @param entry The entry to log.
     */
    log(entry: TEntry): void;
}
