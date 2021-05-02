import { IPatternWriterConfig, IWriter } from "../IWriter";
import { ColorPatternFormatter } from "../formatters/ColorPatternFormatter";
import { ILogEntry } from "../ILogEntry";
import { throwIfNullOrUndefined } from "@src/functions/guards";
import { LogLevel } from "../LogLevel";
import { WriterFn, nullWriterFn } from "./WriterFn";

export class TerminalWriter implements IWriter {

    protected formatter: ColorPatternFormatter;

    constructor();
    constructor(pattern: string);
    constructor(pattern: string = "%{l} %{m}") {
        this.formatter = new ColorPatternFormatter(pattern);
    }

    public reconfigure(config: IPatternWriterConfig): void {
        throwIfNullOrUndefined(config, 'config');
        this.formatter.pattern = config.pattern;
    }

    public write(entry: ILogEntry): void {
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
                return nullWriterFn;
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
