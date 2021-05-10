import { Emitter } from "@src/core/events";
import { throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";

import { IChannel } from "../IChannel";
import { ILog } from "../ILog";
import { IWriter } from "../IWriter";
import { LogLevel } from "../LogLevel";
import { ILogEntry, ILogEntryData } from "../ILogEntry";
import { ILogBuilder } from "../ILogBuilder";
import { Channel } from "./Channel";

export abstract class LogBuilder<
    TLog extends ILog<TLog, TEntry, TData, TWriterConfig>,
    TEntry extends ILogEntry<TData>,
    TData extends ILogEntryData,
    TWriterConfig>

    implements ILogBuilder<TLog, TEntry, TData, TWriterConfig> {

    public static DEFAULT_NAME = 'main';

    public logCreated: Emitter<TLog> = new Emitter();

    protected _channels: IChannel<TEntry, TData, TWriterConfig>[] = [];
    public get channels(): IChannel<TEntry, TData, TWriterConfig>[] { return this._channels; }

    protected _logName = '';
    public get name(): string { return this._logName; }

    /** Instantiates a new `LogBuilder` to store the configuration for a logger. */
    protected abstract createBuilder(logName: string): LogBuilder<TLog, TEntry, TData, TWriterConfig>;

    /** Instantiates a new logger based on the configuration stored in this builder. */
    protected abstract createLogger(): TLog;

    protected constructor(logName: string) {
        throwIfNullOrEmpty(logName, 'log name');
        this._logName = logName;
    }

    /** Validates the configuration defined in the builder,
     * and then creates and returns a new logger. */
    public andGetLogger(): TLog {
        this.validate();
        return this.createLogger();
    }

    /** Generates or augments a builder for a logger channel that outputs at any level at least as high the specified level. */
    public atLevel(level: LogLevel): LogBuilder<TLog, TEntry, TData, TWriterConfig> {
        this._channels.forEach(channel => {
            channel.level = level;
        });
        return this;
    }

    /** Configures the builder to generate a new logger. */
    public newLog(): LogBuilder<TLog, TEntry, TData, TWriterConfig>;
    public newLog(logName: string): LogBuilder<TLog, TEntry, TData, TWriterConfig>;
    public newLog(logName: string = LogBuilder.DEFAULT_NAME): LogBuilder<TLog, TEntry, TData, TWriterConfig> {
        throwIfNullOrUndefined(logName, 'logName');
        return this.createBuilder(logName);
    }

    /** Configures the builder to generate a new logger channel. */
    public newChannel(name: string, writer: IWriter<TEntry, TData, TWriterConfig>): LogBuilder<TLog, TEntry, TData, TWriterConfig>;
    public newChannel(name: string, writer: IWriter<TEntry, TData, TWriterConfig>, level: LogLevel): LogBuilder<TLog, TEntry, TData, TWriterConfig>;
    public newChannel(name: string, writer: IWriter<TEntry, TData, TWriterConfig>, level?: LogLevel): LogBuilder<TLog, TEntry, TData, TWriterConfig> {
        throwIfNullOrEmpty(name, 'name');
        throwIfNullOrUndefined(writer, 'writer');
        this._channels = this._channels.filter(it => it.name != name);
        const newChannel = new Channel(name, writer, level);
        this._channels.push(newChannel);
        return this;
    }

    /** Validates the configuration defined in the builder. */
    protected validate(): void {
        throwIfNullOrEmpty(this._logName, "_logName");
        throwIfNullOrEmpty(this._channels, "_channels");
    }
}
