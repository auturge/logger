import { ILogEntry, ILogEntryData } from "./ILogEntry";

export interface IPatternWriterConfig {
    pattern: string;
}

/** An interface describing a log-entry writing implementation. */
export interface IWriter<TEntry extends ILogEntry<TData>, TData extends ILogEntryData, TConfig> {

    /** Writes a log entry.
     * @param {TEntry} entry The log entry to write
     */
    write(entry: TEntry): void;

    /** Reconfigures the writer. */
    reconfigure(config: TConfig): void;
}
