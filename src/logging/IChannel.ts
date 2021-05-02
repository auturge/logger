import { LogLevel } from "./LogLevel";
import { ILogEntry } from "./ILogEntry";
import { IWriter } from "./IWriter";
import { IStatusEntry } from "./StatusLog/IStatusEntry";
import { Emitter } from "@src/core/events";

/** An interface describing a single log writing implementation. */
export interface ILogEntryWriter<TEntry extends ILogEntry = IStatusEntry> {

    /** Gets the underlying writer implementation. */
    readonly writer: IWriter<TEntry>;
}

/** Interface describing a single target for log-writing output. */
export interface IChannel<TEntry extends ILogEntry = IStatusEntry>
    extends ILogEntryWriter<TEntry> {

    /** Gets or sets whether this channel is enabled. */
    enabled: boolean;

    /** Gets or sets the maximum level/verbosity at which this channel will log. */
    level: LogLevel;

    /** Gets the name of the channel. */
    readonly name: string;

    /** The output pattern to be used with this channel. */
    // pattern: string;

    /** The event which fires when the channel is reconfigured. */
    reconfigured: Emitter<IChannel<TEntry>>;

    /** Checks if the channel is enabled for the specified `level`.
    * @param {LogLevel} level The level to check.
    */
    isEnabledFor(level: LogLevel): boolean;

    /** The generic log-writing method.
     * @param entry The entry to log.
     */
    log(entry: TEntry): void;
}
