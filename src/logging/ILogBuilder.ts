import { Emitter } from "@src/core/events";
import { IChannel } from "./IChannel";
import { ILog } from "./ILog";
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";

export interface ILogBuilder<TLog extends ILog = ILog> {
    readonly logCreated: Emitter<TLog>;
    readonly channels: IChannel[];
    readonly name: string;
    andGetLogger(): TLog;
    atLevel(level: LogLevel): ILogBuilder<TLog>;
    newLog(): ILogBuilder<TLog>;
    newLog(logName: string): ILogBuilder<TLog>;
    newChannel(name: string, writer: IWriter): ILogBuilder<TLog>;
    newChannel(name: string, writer: IWriter, level: LogLevel): ILogBuilder<TLog>;
}
