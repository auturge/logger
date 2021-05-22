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
    ILog, ILogEntry, IWriter, ILogEntryData,
    IStatusLog, IStatusEntry, IStatusData,
    ILogManager, ILogBuilder,
    LogLevel, LogStatus
} from './logging/index';

export { DateFormat } from './functions/formatDate';
