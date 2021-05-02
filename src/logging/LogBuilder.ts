import { Emitter } from "@src/core/events";
import { throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";

import { IChannel } from "./IChannel";
import { ILog } from "./ILog";
import { Channel } from "./Channel";
import { IWriter } from "./IWriter";
import { LogLevel } from "./LogLevel";
import { IStatusEntry } from "./StatusLog/IStatusEntry";
import { ILogEntry } from "./ILogEntry";
import { IStatusLog } from "./StatusLog/StatusLog";

export abstract class LogBuilder<
    TEntry extends ILogEntry = IStatusEntry,
    TLog extends ILog<TLog, TEntry> = IStatusLog
    > {

    public static DEFAULT_NAME: string = 'main';

    public logCreated: Emitter<TLog> = new Emitter();

    protected _logName: string = '';
    protected _channels: IChannel[] = [];

    /** Instantiates a new `LogBuilder` to store the configuration for a logger. */
    protected abstract createBuilder(logName: string): LogBuilder<TEntry, TLog>;

    /** Instantiates a new logger based on the configuration stored in this builder. */
    protected abstract createLogger(): TLog;

    public constructor(logName: string) {
        throwIfNullOrEmpty(logName, 'log name');
        this._logName = logName;
    }

    /** Configures the builder to generate a new logger. */
    public newLog(): LogBuilder<TEntry, TLog>;
    public newLog(logName: string): LogBuilder<TEntry, TLog>;
    public newLog(logName: string = LogBuilder.DEFAULT_NAME): LogBuilder<TEntry, TLog> {
        throwIfNullOrUndefined(logName, 'logName');
        return this.createBuilder(logName);
    }

    /** Configures the builder to generate a new logger channel. */
    public newChannel(name: string, writer: IWriter<TEntry>): LogBuilder<TEntry, TLog>;
    public newChannel(name: string, writer: IWriter<TEntry>, level: LogLevel): LogBuilder<TEntry, TLog>;
    public newChannel(name: string, writer: IWriter<TEntry>, level: LogLevel): LogBuilder<TEntry, TLog>;
    public newChannel(name: string, writer: IWriter<TEntry>, level?: LogLevel): LogBuilder<TEntry, TLog> {
        throwIfNullOrUndefined(name, 'name');
        throwIfNullOrUndefined(writer, 'writer');
        this._channels = this._channels.filter(it => it.name != name);
        const newChannel = new Channel(name, writer, level);
        this._channels.push(newChannel);
        return this;
    }

    /** Generates or augments a builder for a logger channel that outputs at any level at least as high the specified level. */
    public atLevel(level: LogLevel): LogBuilder<TEntry, TLog> {
        this._channels.forEach(channel => {
            channel.level = level;
        });
        return this;
    }

    /** Validates the configuration defined in the builder,
     * and then creates and returns a new logger. */
    public andGetLogger(): TLog {
        this.validate();
        var log = this.createLogger();
        return log;
    }

    /** Validates the configuration defined in the builder. */
    protected validate(): void {
        throwIfNullOrEmpty(this._logName, "_logName");
        throwIfNullOrEmpty(this._channels, "_channels");
    }
}
