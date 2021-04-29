import { throwIfNullOrUndefined } from "@src/functions/guards";
import { LogLevel } from "@src/logging/LogLevel";
import { ILogEntry } from "../ILogEntry";
import { IWriter } from "../IWriter";
import { PatternFormatter } from "../formatters/PatternFormatter";


type WriterFn = (...data: any[]) => void;

const NullWriter: WriterFn = (...data: any) => { };

export class ConsoleWriter implements IWriter {

    protected formatter: PatternFormatter;

    private _pattern: string = "%{m}";
    public get pattern(): string { return this._pattern; }
    public set pattern(value: string) {
        if (this._pattern == value)
            return;

        this._pattern = value;

        if (this.formatter)
            this.formatter.pattern = value;
    }

    constructor();
    constructor(pattern: string);
    constructor(pattern: string = "%{m}") {
        this.pattern = pattern;
        this.formatter = new PatternFormatter(pattern);
    }

    write(entry: ILogEntry): void {
        throwIfNullOrUndefined(entry, 'entry');

        const [ message, data ] = this.formatEntry(entry);
        const writerFn: WriterFn = this.getWriterFunction(entry.level);

        writerFn(message);
        if (data) {
            writerFn(data);
        }
    }

    protected formatEntry(entry: ILogEntry): [ string, string | undefined ] {
        const message = this.formatter.formatMessage(entry);
        const data = this.formatter.formatData(entry);
        return [ message, data ];
    }

    protected getWriterFunction(level: LogLevel): WriterFn {
        switch (level) {
            case LogLevel.OFF:
                return NullWriter;
            case LogLevel.FATAL:
            case LogLevel.ERROR:
                return console.error;
            case LogLevel.WARN:
                return console.warn;
            case LogLevel.INFO:
            case LogLevel.DEBUG:
            case LogLevel.TRACE:
            case LogLevel.ALL:
                return console.info;
            default:
                throw new Error(`Unrecognized log level [${ level.toString() }].`);
        }
    }
}
