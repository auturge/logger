import { throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";
import { Emitter } from "@src/core/events";

import { LogLevel } from "../LogLevel";
import { ILogEntry } from "../ILogEntry";
import { IChannel } from "../IChannel";
import { IWriter } from "../IWriter";

export class Channel<TEntry extends ILogEntry<TData>, TData, TWriterConfig> implements IChannel<TEntry, TData, TWriterConfig> {

    private _enabled = true;
    private _level: LogLevel = LogLevel.INFO;

    public readonly name: string;
    public readonly writer: IWriter<TEntry, TData, TWriterConfig>;
    public reconfigured: Emitter<IChannel<TEntry, TData, TWriterConfig>> = new Emitter();

    public constructor(name: string, writer: IWriter<TEntry, TData, TWriterConfig>);
    public constructor(name: string, writer: IWriter<TEntry, TData, TWriterConfig>, level: LogLevel | undefined);
    public constructor(name: string, writer: IWriter<TEntry, TData, TWriterConfig>, level?: LogLevel) {
        throwIfNullOrEmpty(name, 'name');
        throwIfNullOrUndefined(writer, 'writer');
        this.name = name;
        this.writer = writer;
        this.level = level || LogLevel.INFO;
        this.enabled = true;
    }

    public get enabled(): boolean { return this._enabled; }
    public set enabled(value: boolean) {
        if (this._enabled == value)
            return;
        this._enabled = value;
        this.reconfigured.emit(this);
    }

    public get level(): LogLevel { return this._level; }
    public set level(value: LogLevel) {
        if (this._level == value)
            return;
        this._level = value;
        this.reconfigured.emit(this);
    }

    public isEnabledFor(level: LogLevel): boolean {
        // the "highest" level is "OFF", otherwise,
        // a higher level means more severe.

        return this.enabled
            && (level != LogLevel.OFF)
            && (this.level != LogLevel.OFF)
            && (level >= this.level);
    }

    public log(entry: TEntry): void {
        if (!this.isEnabledFor(entry.level)) {
            return;
        }
        this.writer.write(entry);
    }
}
