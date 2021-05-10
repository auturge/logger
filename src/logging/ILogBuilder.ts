import { Emitter } from "@src/core/events";
import { IChannel } from "./IChannel";
import { ILog } from "./ILog";
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { ILogEntry, ILogEntryData } from "./ILogEntry";

export interface ILogBuilder<
    TLog extends ILog<TLog, TEntry, TData, TWriterConfig>,
    TEntry extends ILogEntry<TData>,
    TData extends ILogEntryData,
    TWriterConfig> {
    readonly logCreated: Emitter<TLog>;
    readonly channels: IChannel<TEntry, TData, TWriterConfig>[];
    readonly name: string;
    andGetLogger(): TLog;
    atLevel(level: LogLevel): ILogBuilder<TLog, TEntry, TData, TWriterConfig>;
    newLog(): ILogBuilder<TLog, TEntry, TData, TWriterConfig>;
    newLog(logName: string): ILogBuilder<TLog, TEntry, TData, TWriterConfig>;
    newChannel(name: string, writer: IWriter<TEntry, TData, TWriterConfig>): ILogBuilder<TLog, TEntry, TData, TWriterConfig>;
    newChannel(name: string, writer: IWriter<TEntry, TData, TWriterConfig>, level: LogLevel): ILogBuilder<TLog, TEntry, TData, TWriterConfig>;
}
