import { LogLevel } from "../LogLevel";
import { ILogEntry } from "../ILogEntry";
import { IChannel } from "../IChannel";
import { IWriter } from "../IWriter";
import { throwIfNullOrUndefined } from "@src/functions/guards";

export class Channel implements IChannel {

    readonly writer: IWriter;
    readonly name: string;
    level: LogLevel = LogLevel.INFO;

    private _pattern: string = "%{m}";
    get pattern(): string {
        return this._pattern;
    }
    set pattern(value: string) {
        if (this._pattern == value)
            return;

        this._pattern = value;

        if (this.writer)
            this.writer.pattern = value;
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
    }

    isEnabledFor(level: LogLevel): boolean {
        // the highest level is "OFF", otherwise,
        // a higher level means more severe.
        return level >= this.level;
    }

    log(entry: ILogEntry): void {
        if (!this.isEnabledFor(entry.level)) {
            return;
        }
        this.writer.write(entry);
    }
}
