import { getNullOrUndefinedErrorMessage, throwIfNullOrUndefined } from "@src/functions/guards";
import { ILog } from "./ILog";
import { ILogEntry } from "./ILogEntry";
import { LogBuilder } from "./LogBuilder";
import { LogConfigurator } from "./LogConfigurator";

export class LogManager<TEntry extends ILogEntry, TLog extends ILog<TLog, TEntry>> {

    private _logNames: string[] = [];
    private _logs: TLog[] = [];
    private _rebuilder: LogConfigurator<TEntry, TLog>;

    constructor(builder: LogBuilder<TEntry, TLog>, rebuilder: LogConfigurator<TEntry, TLog>) {
        if (builder == null)
            throw new Error(getNullOrUndefinedErrorMessage('builder'));
        if (rebuilder == null)
            throw new Error(getNullOrUndefinedErrorMessage('rebuilder'));

        this._rebuilder = rebuilder;
        this.initialize = builder;
        this.initialize.logCreated.subscribe((log) => this.OnLogCreated(log));
    }

    /** A builder for generating new ILog channels. */
    public readonly initialize: LogBuilder<TEntry, TLog>;

    public reconfigure(log: TLog): LogConfigurator<TEntry, TLog>;
    public reconfigure(logName: string): LogConfigurator<TEntry, TLog>;
    public reconfigure(logOrName: ILog<TLog, TEntry> | string): LogConfigurator<TEntry, TLog> {
        const name = (typeof logOrName === "string")
            ? logOrName : logOrName.name;

        const index = this._logNames.indexOf(name);
        const log = this._logs[ index ];

        return this._rebuilder = this._rebuilder.bind(log);
    }

    private OnLogCreated(log: TLog): void {
        throwIfNullOrUndefined(log, 'log');

        // use a special array of JUST the names,
        // in the same exact order as the array of logs.
        // search for the index in the NAMES array,
        // which will be faster than searching the 'primary' array.
        const index = this._logNames.indexOf(log.name);
        if (index != -1) {
            this._logNames.slice[ index ];
            this._logs.slice[ index ];
        }
        this._logNames.push(log.name);
        this._logs.push(log);
    }
}
