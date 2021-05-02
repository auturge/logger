import { LogManager } from './LogManager';
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { TerminalWriter } from './writers/TerminalWriter';
import { ConsoleWriter } from './writers/ConsoleWriter';
import { StatusLogBuilder } from './StatusLog/StatusLogBuilder';
import { DateFormat } from '@src/functions/formatDate';

/** Console Writer */
export const CONSOLE: IWriter = new ConsoleWriter('%{l} %{m}');

/** Terminal Writer */
export const TERMINAL: IWriter = new TerminalWriter('%{date}| %{level} | %{message}');

const logBuilder = new StatusLogBuilder('main');

/** Default StatusLog Manager. */
export const StatusLogManager = new LogManager(logBuilder);

/** A StatusLog for use in a browser console. */
export const ConsoleLog = StatusLogManager.initialize
    .newLog('console')
    .newChannel('console', CONSOLE, LogLevel.INFO)
    .withPattern('%{l} %{m}')
    .andGetLogger();

/** A StatusLog for use on the Terminal. */
export const TerminalLog = StatusLogManager.initialize
    .newLog('terminal')
    .newChannel('terminal', TERMINAL, LogLevel.INFO)
    .withPattern(` %{ date | ${ DateFormat.DEFAULT } } | %{level} | %{message}`)
    .andGetLogger();
