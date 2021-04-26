import { LogManager as LogManagerClass } from './LogManager';
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { TerminalWriter } from './impl/writers/TerminalWriter';
import { ConsoleWriter } from './impl/writers/ConsoleWriter';
import { StatusLogBuilder } from './impl/StatusLogBuilder';
import { StatusLogConfigurator } from "./impl/StatusLogConfigurator";
import { DateFormat } from '@src/functions/formatDate';

export const CONSOLE: IWriter = new ConsoleWriter();
export const TERMINAL: IWriter = new TerminalWriter('%{date}| %{level} | %{message}');

const logBuilder = new StatusLogBuilder();
const rebuilder = new StatusLogConfigurator();
export const LogManager = new LogManagerClass(logBuilder, rebuilder);

export const Log = LogManager.initialize
    .newLogger('main')
    .newChannel('main', TERMINAL, LogLevel.INFO)
    .withPattern(` %{ date | ${ DateFormat.DEFAULT } } | %{level} | %{message}`)
    .andGetLogger();
