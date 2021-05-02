import { getNullOrUndefinedErrorMessage, throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";
import { ILog } from "./ILog";
import { ILogEntry } from "./ILogEntry";
import { LogBuilder } from "./LogBuilder";

export class LogManager<TEntry extends ILogEntry, TLog extends ILog<TLog, TEntry>> {

    private _logNames: string[] = [];
    private _logs: TLog[] = [];

    constructor(builder: LogBuilder<TEntry, TLog>) {
        if (builder == null)
            throw new Error(getNullOrUndefinedErrorMessage('builder'));

        this.initialize = builder;
        this.initialize.logCreated.subscribe((log) => this.onLogCreated(log));
    }

    /** A builder for generating new ILog channels. */
    public readonly initialize: LogBuilder<TEntry, TLog>;

    /** Disables all channels on the log. */
    public disable(log: TLog): ILog<TLog, TEntry>;
    public disable(logName: string): ILog<TLog, TEntry>;
    public disable(logOrName: ILog<TLog, TEntry> | string): ILog<TLog, TEntry> {
        throwIfNullOrUndefined(logOrName, 'logOrName');
        var log = typeof logOrName === "string" ? this.getLog(logOrName) : logOrName;

        if (log == null)
            throw new Error(`No log exists with the name ${ logOrName }.`)

        log.enabled = false;
        return log;
    };

    /** Enables all channels on the log. */
    public enable(log: TLog): ILog<TLog, TEntry>;
    public enable(logName: string): ILog<TLog, TEntry>;
    public enable(logOrName: ILog<TLog, TEntry> | string): ILog<TLog, TEntry> {
        throwIfNullOrUndefined(logOrName, 'logOrName');
        var log = typeof logOrName === "string" ? this.getLog(logOrName) : logOrName;

        if (log == null)
            throw new Error(`No log exists with the name ${ logOrName }.`)

        log.enabled = true;
        return log;
    };

    public getLog(logName: string): ILog<TLog, TEntry> | null {
        throwIfNullOrEmpty(logName, 'logOrName');

        const index = this._logNames.indexOf(logName);
        if (index == -1)
            return null;

        const log = this._logs[ index ];
        return log;
    };

    private onLogCreated(log: TLog): void {
        throwIfNullOrUndefined(log, 'log');

        // use a special array of JUST the names,
        // in the same exact order as the array of logs.
        // search for the index in the NAMES array,
        // which will be faster than searching the 'primary' array of logs.
        const index = this._logNames.indexOf(log.name);
        if (index != -1) {
            this._logNames.slice[ index ];
            this._logs.slice[ index ];
        }
        this._logNames.push(log.name);
        this._logs.push(log);
    };

    // private onBuilderCreated(builder: LogBuilder<TEntry, TLog>): void {
    //     throwIfNullOrUndefined(builder, 'builder');
    //     const index = this._logNames.indexOf(builder.name);
    //     if (index != -1) {
    //         this._builders[ index ];
    //     }
    //     this._builders.push(builder);
    // };
}
