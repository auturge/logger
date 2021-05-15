import { ILogEntry } from "./ILogEntry";

/** An interface describing a log-entry writing implementation. */
export interface IWriter<TEntry extends ILogEntry = ILogEntry> {

    /** Writes a log entry.
     * @param {TEntry} entry The log entry to write
     */
    write(entry: TEntry): void;

    /** Reconfigures the writer. */
    reconfigure(config: unknown): IWriter<TEntry>;
}
