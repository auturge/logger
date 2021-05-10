import { Emitter } from "@src/core/events";
import { IChannel } from "./IChannel";
import { ILog } from "./ILog";
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { ILogEntry } from "./ILogEntry";
import { LogBuilder } from "./LogBuilder";


export interface ILogBuilder<TEntry extends ILogEntry, TLog extends ILog<TLog, TEntry>> {
    readonly logCreated: Emitter<TLog>;
    readonly channels: IChannel[];
    readonly name: string;
    andGetLogger(): TLog;
    atLevel(level: LogLevel): LogBuilder<TEntry, TLog>;
    newLog(): LogBuilder<TEntry, TLog>;
    newLog(logName: string): LogBuilder<TEntry, TLog>;
    newChannel(name: string, writer: IWriter<TEntry>): LogBuilder<TEntry, TLog>;
    newChannel(name: string, writer: IWriter<TEntry>, level: LogLevel): LogBuilder<TEntry, TLog>;
}
