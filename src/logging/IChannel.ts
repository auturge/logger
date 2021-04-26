import { LogLevel } from "./LogLevel";
import { ILogEntry, ILogEntryData } from "./ILogEntry";
import { IWriter } from "./IWriter";
import { IStatusEntry } from "./impl/IStatusEntry";

/** An interface describing a single log writing implementation. */
export interface ILogEntryWriter<TEntry extends ILogEntry = IStatusEntry> {

    /** Gets the underlying writer implementation. */
    readonly writer: IWriter<TEntry>;
}

/** Interface describing a single target for log-writing output. */
export interface IChannel<TEntry extends ILogEntry = IStatusEntry>
    extends ILogEntryWriter<TEntry> {

    /** The output pattern to be used with this logger. */
    pattern: string;

    /** Gets the name of the channel. */
    readonly name: string;

    /** The level that the channel is set to output. */
    level: LogLevel;

    /** Checks if the channel is enabled for the specified `level`.
     * @param {LogLevel} level The level to check.
     */
    isEnabledFor(level: LogLevel): boolean;

    /** The generic log-writing method.
     * @param entry The entry to log.
     */
    log(entry: TEntry): void;
}
