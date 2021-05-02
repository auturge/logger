import { LogManagerClass } from './LogManager';
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { TerminalWriter } from './writers/TerminalWriter';
import { ConsoleWriter } from './writers/ConsoleWriter';
import { StatusLogBuilder } from './StatusLog/StatusLogBuilder';
import { DateFormat } from '@src/functions/formatDate';

/** Console Writer */
export const CONSOLE: IWriter = new ConsoleWriter('%{l} %{m}');

/** Terminal Writer */
export const TERMINAL: IWriter = new TerminalWriter(` %{ date | ${ DateFormat.DEFAULT } } | %{level} | %{message}`);

const logBuilder = new StatusLogBuilder('main');

/** Default StatusLog Manager. */
export const LogManager = new LogManagerClass(logBuilder);

/** A StatusLog for use in a browser console. */
export const ConsoleLog = LogManager.initialize
    .newLog('console')
    .newChannel('console', CONSOLE, LogLevel.INFO)
    .andGetLogger();

/** A StatusLog for use on the Terminal. */
export const TerminalLog = LogManager.initialize
    .newLog('terminal')
    .newChannel('terminal', TERMINAL, LogLevel.INFO)
    .andGetLogger();
