import { Emitter } from "@src/core/events";
import { areNumbersAlmostEqual, throwIfNullOrUndefined } from "@src/functions/guards";

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

    public logCreated: Emitter<TLog> = new Emitter();

    public static DEFAULT_NAME: string = 'main';

    protected _name: string = "";
    protected _channels: IChannel[] = [];

    newLogger(): LogBuilder<TEntry, TLog>;
    newLogger(name: string): LogBuilder<TEntry, TLog>;
    newLogger(name: string = LogBuilder.DEFAULT_NAME): LogBuilder<TEntry, TLog> {
        this._name = name;
        return this;
    }


    /** Generates a builder for a new logger channel. */
    newChannel(name: string, writer: IWriter<TEntry>): LogBuilder<TEntry, TLog>;

    newChannel(name: string, writer: IWriter<TEntry>, level: LogLevel): LogBuilder<TEntry, TLog>;

    newChannel(name: string, writer: IWriter<TEntry>, level: LogLevel, pattern: string): LogBuilder<TEntry, TLog>;

    newChannel(name: string, writer: IWriter<TEntry>, level?: LogLevel, pattern?: string): LogBuilder<TEntry, TLog> {
        throwIfNullOrUndefined(name, 'name');
        throwIfNullOrUndefined(writer, 'writer');
        this._channels = this._channels.filter(it => it.name != name);
        const newChannel = new Channel(name, writer, level, pattern);
        this._channels.push(newChannel);
        return this;
    }

    /** Generates or augments a builder for a logger channel that outputs at any level at least as high the specified level. */
    atLevel(level: LogLevel): LogBuilder<TEntry, TLog> {
        this._channels.forEach(channel => {
            channel.level = level;
        });
        return this;
    }

    /** Sets each channel to use the specified output pattern. */
    withPattern(pattern: string): LogBuilder<TEntry, TLog> {
        this._channels.forEach(channel => {
            channel.pattern = pattern;
        });
        return this;
    }

    /** Validates the configuration defined in the builder, and generates a new logger. */
    abstract andGetLogger(): TLog;
}
