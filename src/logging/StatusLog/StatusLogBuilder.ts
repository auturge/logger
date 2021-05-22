import { Emitter } from "@src/core/events";
import { throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";
import { ILogBuilder } from "@src/logging/ILogBuilder";
import { ILogEntry } from "../ILogEntry";
import { Channel } from "./Channel";
import { IWriter } from "../IWriter";
import { LogLevel } from "../LogLevel";
import { IStatusLog, StatusLog } from "./StatusLog";

// TODO: Add class description comment

export interface IStatusLogBuilder extends ILogBuilder<IStatusLog> {

    /** Returns the underlying logging channels. */
    readonly channels: Channel[];

    /** The name of the logger to be created. */
    readonly name: string;

    /** Sets the level of all channels. */
    atLevel(level: LogLevel): ILogBuilder<IStatusLog>;

    /** Configures a new `TLog` with name `main`. */
    newLog(): ILogBuilder<IStatusLog>;

    /** Configures a new `TLog` with the given name. */
    newLog(logName: string): ILogBuilder<IStatusLog>;

    /** Configures a new `Channel` with the given `name` and `writer`. */
    newChannel(name: string, writer: IWriter): IStatusLogBuilder;

    /** Configures a new `Channel` with the given `name`, `writer`, and `LogLevel`. */
    newChannel(name: string, writer: IWriter, level: LogLevel): IStatusLogBuilder;
}

export class StatusLogBuilder implements IStatusLogBuilder {

    public static readonly DEFAULT_NAME = 'main';

    public logCreated: Emitter<IStatusLog> = new Emitter();

    protected _channels: Channel[] = [];
    public get channels(): Channel[] { return this._channels; }

    protected _logName = '';
    public get name(): string { return this._logName; }

    public constructor(logName: string) {
        throwIfNullOrEmpty(logName, 'log name');
        this._logName = logName;
    }

    /** Generates or augments a builder for a logger channel that outputs at any level at least as high the specified level. */
    public atLevel(level: LogLevel): IStatusLogBuilder {
        throwIfNullOrUndefined(level, 'level');
        this._channels.forEach(channel => {
            channel.level = level;
        });
        return this;
    }

    /** Configures the builder to generate a new logger. */
    public newLog(): IStatusLogBuilder;
    public newLog(logName: string): IStatusLogBuilder;
    public newLog(logName: any = StatusLogBuilder.DEFAULT_NAME) {
        throwIfNullOrEmpty(logName, 'logName');
        return this.createBuilder(logName);
    }

    /** Configures the builder to generate a new logger channel. */
    public newChannel(name: string, writer: IWriter<ILogEntry<any>>): IStatusLogBuilder;
    public newChannel(name: string, writer: IWriter<ILogEntry<any>>, level: LogLevel): IStatusLogBuilder;
    public newChannel(name: any, writer: any, level?: any) {
        throwIfNullOrEmpty(name, 'name');
        throwIfNullOrUndefined(writer, 'writer');
        this._channels = this._channels.filter(it => it.name != name);
        const newChannel = new Channel(name, writer, level);
        this._channels.push(newChannel);
        return this;
    }

    /** Validates the configuration defined in the builder,
     * and then creates and returns a new logger. */
    public andGetLogger(): IStatusLog {
        this.validate();
        return this.createLogger();
    }

    /** Instantiates a new `StatusLogBuilder` to store the configuration for a logger. */
    protected createBuilder(logName: string): StatusLogBuilder {
        return new StatusLogBuilder(logName);
    }

    /** Instantiates a new `StatusLog` with the configuration stored in this builder. */
    protected createLogger(): StatusLog {
        return new StatusLog(this._logName, this._channels);
    }

    /** Validates the configuration defined in the builder. */
    protected validate(): void {
        throwIfNullOrEmpty(this._logName, "_logName");
        throwIfNullOrEmpty(this._channels, "_channels");
    }
}
