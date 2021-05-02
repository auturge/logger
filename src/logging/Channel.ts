import { LogLevel } from "./LogLevel";
import { ILogEntry } from "./ILogEntry";
import { IChannel } from "./IChannel";
import { IWriter } from "./IWriter";
import { throwIfNullOrUndefined } from "@src/functions/guards";
import { Emitter } from "@src/core/events";
import { IStatusEntry } from "./StatusLog/IStatusEntry";

export class Channel implements IChannel<IStatusEntry> {

    private _enabled: boolean = true;
    private _level: LogLevel = LogLevel.INFO;
    private _pattern: string = "%{m}";

    public readonly name: string;
    public readonly writer: IWriter;
    public reconfigured: Emitter<IChannel<IStatusEntry>> = new Emitter();

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

    public get pattern(): string { return this._pattern; }
    public set pattern(value: string) {
        if (this._pattern == value)
            return;

        this._pattern = value;

        if (this.writer)
            this.writer.pattern = value;

        this.reconfigured.emit(this);
    }

    public constructor(name: string, writer: IWriter);
    public constructor(name: string, writer: IWriter, level: LogLevel | undefined);
    public constructor(name: string, writer: IWriter, level: LogLevel | undefined, pattern: string | undefined);
    public constructor(name: string, writer: IWriter, level?: LogLevel, pattern?: string) {
        throwIfNullOrUndefined(name, 'name');
        throwIfNullOrUndefined(writer, 'writer');
        this.name = name;
        this.writer = writer;
        this.level = level || LogLevel.INFO;
        this.pattern = pattern || "%{m}";
        this.enabled = true;
    }

    public isEnabledFor(level: LogLevel): boolean {
        // the highest level is "OFF", otherwise,
        // a higher level means more severe.
        return this.enabled && (level >= this.level);
    }

    public log(entry: ILogEntry): void {
        if (!this.isEnabledFor(entry.level)) {
            return;
        }
        this.writer.write(entry);
    }

    public setLevel(level: LogLevel): void {
        this.level = level;
    }
}