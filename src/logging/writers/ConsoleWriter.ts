import { throwIfNullOrUndefined } from "@src/functions/guards";
import { LogLevel } from "@src/logging/LogLevel";
import { ILogEntry, ILogEntryData } from "../ILogEntry";
import { IPatternWriterConfig, IWriter } from "../IWriter";
import { PatternFormatter } from "../formatters/PatternFormatter";
import { nullWriterFn, WriterFn } from "./WriterFn";

export class ConsoleWriter<
    TEntry extends ILogEntry<TData>,
    TData extends ILogEntryData>
    implements IWriter<TEntry, TData, IPatternWriterConfig> {

    protected formatter: PatternFormatter;

    constructor();
    constructor(pattern: string);
    constructor(pattern = "%{l} %{m}") {
        this.formatter = new PatternFormatter(pattern);
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
