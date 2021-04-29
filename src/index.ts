/**
 * @module
 * @description
 * Entry point from which you should import all public-facing APIs.
 */

export { Log, LogManager, CONSOLE, TERMINAL } from './logging/DEFAULTS';
export {
    ILog, IChannel, ILogEntry, ILogEntryWriter, IWriter, ILogEntryData, ILoggerBase,
    LogLevel, LogStatus,
    LogBuilder, LogManagerClass,
} from './logging/index';
