import { ILogEntry } from "./ILogEntry";
import { IStatusEntry } from "./StatusLog/IStatusEntry";

export interface IPatternWriterConfig {
    pattern: string;
}

/** An interface describing a log-entry writing implementation. */
export interface IWriter<TEntry extends ILogEntry = IStatusEntry, TConfig = IPatternWriterConfig> {

    /** Writes a log entry.
     * @param {TEntry} entry The log entry to write
     */
    write(entry: TEntry): void;

    /** Reconfigures the writer. */
    reconfigure(config: TConfig): void;
}
