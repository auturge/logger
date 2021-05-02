/**
 * @module
 * @description
 * Entry point from which you should import all public-facing APIs.
 */

export {
    ConsoleLog,
    TerminalLog,
    TerminalLog as Log,
    StatusLogManager,
    CONSOLE,
    TERMINAL
} from './logging/DEFAULTS';

export {
    ILog, IChannel, ILogEntry, ILogEntryWriter, IWriter, ILogEntryData, ILoggerBase,
    LogLevel, LogStatus,
    LogBuilder, LogManager,
} from './logging/index';
