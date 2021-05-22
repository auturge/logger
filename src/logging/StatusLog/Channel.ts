import { throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";
import { Emitter } from "@src/core/events";

import { LogLevel } from "../LogLevel";
import { IWriter } from "../IWriter";
import { IStatusEntry } from "./IStatusEntry";
import { ILogEntry } from "../ILogEntry";

/** An interface describing a single log writing implementation. */
interface ILogEntryWriter<TEntry extends ILogEntry = IStatusEntry> {

    /** Gets the underlying writer implementation. */
    readonly writer: IWriter<TEntry>;
}

/** Interface describing a single target for log-writing output. */
export interface IChannel extends ILogEntryWriter<IStatusEntry> {

    /** Gets or sets whether this channel is enabled. */
    enabled: boolean;

    /** Gets or sets the maximum level/verbosity at which this channel will log. */
    level: LogLevel;

    /** Gets the name of the channel. */
    readonly name: string;

    /** The output pattern to be used with this channel. */
    // pattern: string;

    /** The event which fires when the channel is reconfigured. */
    reconfigured: Emitter<IChannel>;

    /** Checks if the channel is enabled for the specified `level`.
    * @param {LogLevel} level The level to check.
    */
    isEnabledFor(level: LogLevel): boolean;

    /** The generic log-writing method.
     * @param entry The entry to log.
     */
    log(entry: IStatusEntry): void;
}

/** A single target for log-writing output. */
export class Channel implements IChannel {

    private _enabled = true;
    private _level: LogLevel = LogLevel.INFO;

    public readonly name: string;
    public readonly writer: IWriter<IStatusEntry>;
    public reconfigured: Emitter<IChannel> = new Emitter();

    public constructor(name: string, writer: IWriter<IStatusEntry>);
    public constructor(name: string, writer: IWriter<IStatusEntry>, level: LogLevel | undefined);
    public constructor(name: string, writer: IWriter<IStatusEntry>, level?: LogLevel) {
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

    public log(entry: IStatusEntry): void {
        if (!this.isEnabledFor(entry.level)) {
            return;
        }
        this.writer.write(entry);
    }
}
