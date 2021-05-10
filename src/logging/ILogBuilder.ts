import { Emitter } from "@src/core/events";
import { IChannel } from "./IChannel";
import { ILog } from "./ILog";
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { ILogEntry } from "./ILogEntry";

export interface ILogBuilder<TEntry extends ILogEntry, TLog extends ILog<TLog, TEntry>> {
    readonly logCreated: Emitter<TLog>;
    readonly channels: IChannel[];
    readonly name: string;
    andGetLogger(): TLog;
    atLevel(level: LogLevel): ILogBuilder<TEntry, TLog>;
    newLog(): ILogBuilder<TEntry, TLog>;
    newLog(logName: string): ILogBuilder<TEntry, TLog>;
    newChannel(name: string, writer: IWriter<TEntry>): ILogBuilder<TEntry, TLog>;
    newChannel(name: string, writer: IWriter<TEntry>, level: LogLevel): ILogBuilder<TEntry, TLog>;
}
