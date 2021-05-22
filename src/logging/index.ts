
export {
    TerminalLog as Log,
    ConsoleLog,
    LogManager,
    CONSOLE, TERMINAL
} from './DEFAULTS';

// 'barrel' export
export { ILog } from './ILog';
export { ILogEntry, ILogEntryData } from "./ILogEntry";
export { ILogManager } from './ILogManager';
export { ILogBuilder } from './ILogBuilder';
export { IWriter } from './IWriter';
export { LogLevel } from "./LogLevel";
export { LogStatus } from "./LogStatus";

export { IStatusLog } from './StatusLog/StatusLog';
export { IStatusEntry, IStatusData } from './StatusLog/IStatusEntry';
export { IStatusLogBuilder } from './StatusLog/StatusLogBuilder';
