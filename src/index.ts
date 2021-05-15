/**
 * @module
 * @description
 * Entry point from which you should import all public-facing APIs.
 */

export {
    ConsoleLog,
    TerminalLog,
    TerminalLog as Log,
    LogManager,
    CONSOLE,
    TERMINAL
} from './logging/DEFAULTS';

export { TerminalWriter } from './logging/writers/TerminalWriter';
export { ConsoleWriter } from './logging/writers/ConsoleWriter';

export {
    ILog, IChannel, ILogEntry, ILogEntryWriter, IWriter, ILogEntryData,
    ILogManager, ILogBuilder,
    LogLevel, LogStatus
} from './logging/index';
