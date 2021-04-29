import { ILogEntry } from "./ILogEntry";
import { IStatusEntry } from "./StatusLog/IStatusEntry";

/** An interface describing a log-entry writing implementation. */
export interface IWriter<TEntry extends ILogEntry = IStatusEntry> {

    pattern: string;

    /**
     * Writes a log entry.
     * @param {TEntry} entry The log entry to write
     */
    write(entry: TEntry): void;
}
