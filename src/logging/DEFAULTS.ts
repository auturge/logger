import { LogManager as LogManagerClass } from './LogManager';
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { TerminalWriter } from './writers/TerminalWriter';
import { ConsoleWriter } from './writers/ConsoleWriter';
import { StatusLogBuilder } from './StatusLog/StatusLogBuilder';
import { DateFormat } from '@src/functions/formatDate';

const logBuilder = new StatusLogBuilder();

/** Console Writer */
export const CONSOLE: IWriter = new ConsoleWriter();

/** Terminal Writer */
export const TERMINAL: IWriter = new TerminalWriter('%{date}| %{level} | %{message}');

/** Default StatusLog Manager */
export const LogManager = new LogManagerClass(logBuilder);

/** Default StatusLog */
export const Log = LogManager.initialize
    .newLogger('main')
    .newChannel('main', TERMINAL, LogLevel.INFO)
    .withPattern(` %{ date | ${ DateFormat.DEFAULT } } | %{level} | %{message}`)
    .andGetLogger();
