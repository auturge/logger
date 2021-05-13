import { IChannel } from "./IChannel";
import { ILogEntry } from "./ILogEntry";
import { LogLevel } from "./LogLevel";

/** An interface describing a multi-channel logging mechanism. */
interface ILoggerBase<TEntry extends ILogEntry = ILogEntry> {

    /** Gets the underlying logging channels. */
    readonly channels: IChannel<TEntry>[];

    /** The name of this logger. */
    readonly name: string;

    /** Gets or sets whether this logger is enabled. */
    enabled: boolean;

    /** Sets the `LogLevel` for all channels. */
    setLevel(level: LogLevel): void;
}

/** An interface describing the properties and methods used to log messages. */
export interface ILog<TEntry extends ILogEntry = ILogEntry> extends ILoggerBase<TEntry> {

    /** Formats and writes a fatal log message.
     *
     * This is best applied when one or more key business functionalities are not working
     * and the whole system doesn’t fulfill the business functionalities.
    */
    fatal(message: string): void;
    fatal(message: string, obj: any): void;
    fatal(message: string, obj: any, prettyPrint: boolean): void;

    /** Formats and writes an error log message.
     *
     * This is best applied when one or more functionalities are not working, preventing some functionalities from working correctly.
    */
    error(message: string): void;
    error(message: string, obj: any): void;
    error(message: string, obj: any, prettyPrint: boolean): void;

    /** Formats and writes a warning log message.
     *
     * This is best applied when unexpected behavior happened inside the application, but it is continuing its work and the key business features are operating as expected.
    */
    warn(message: string): void;
    warn(message: string, obj: any): void;
    warn(message: string, obj: any, prettyPrint: boolean): void;

    /** Formats and writes an informational log message.
     *
     * This is best applied when an event happened, the event is purely informative and can be ignored during normal operations.
    */
    info(message: string): void;
    info(message: string, obj: any): void;
    info(message: string, obj: any, prettyPrint: boolean): void;

    /** Formats and writes a debug log message.
     *
     * This is best used for events considered to be useful during software debugging when more granular information is needed.
    */
    debug(message: string): void;
    debug(message: string, obj: any): void;
    debug(message: string, obj: any, prettyPrint: boolean): void;

    /** Formats and writes a trace log message.
     *
     * This is best used to describe events showing step by step execution of your code that can be ignored during the standard operation, but may be useful during extended debugging sessions.
    */
    trace(message: string): void;
    trace(message: string, obj: any): void;
    trace(message: string, obj: any, prettyPrint: boolean): void;
}
