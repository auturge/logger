import { IChannel } from "./IChannel";
import { ILogEntry } from "./ILogEntry";
import { LogLevel } from "./LogLevel";

/** An interface describing a multi-channel logging mechanism. */
export interface ILoggerBase<TEntry extends ILogEntry = ILogEntry> {

    /** Gets the underlying logging channels. */
    readonly channels: IChannel<TEntry>[];

    /** The name of this logger. */
    readonly name: string;

    /** Gets or sets whether this logger is enabled. */
    enabled: boolean;

    /** Sets the `LogLevel` for all channels. */
    setLevel(level: LogLevel): void;
}
