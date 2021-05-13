import { Emitter } from "@src/core/events";
import { IChannel } from "./IChannel";
import { ILog } from "./ILog";
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";

/** An interface describing a fluent interface for building loggers. */
export interface ILogBuilder<TLog extends ILog = ILog> {

    /** Returns the underlying logging channels. */
    readonly channels: IChannel[];

    /** An emitter that fires when a new logger is created. */
    readonly logCreated: Emitter<TLog>;

    /** The name of the logger to be created. */
    readonly name: string;

    /** Finalizes the configuration, and then creates and returns the corresponding `TLog`. */
    andGetLogger(): TLog;

    /** Sets the level of all channels. */
    atLevel(level: LogLevel): ILogBuilder<TLog>;

    /** Configures a new `TLog` with name `main`. */
    newLog(): ILogBuilder<TLog>;

    /** Configures a new `TLog` with the given name. */
    newLog(logName: string): ILogBuilder<TLog>;

    /** Configures a new `IChannel` with the given `name` and `writer`. */
    newChannel(name: string, writer: IWriter): ILogBuilder<TLog>;

    /** Configures a new `IChannel` with the given `name`, `writer`, and `LogLevel`. */
    newChannel(name: string, writer: IWriter, level: LogLevel): ILogBuilder<TLog>;
}
