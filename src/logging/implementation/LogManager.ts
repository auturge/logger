import { getNullOrUndefinedErrorMessage, throwIfNullOrEmpty } from "@src/functions/guards";
import { ILog } from "../ILog";
import { ILogBuilder } from "../ILogBuilder";
import { ILogManager } from "../ILogManager";
import { IStatusLog } from "../StatusLog/StatusLog";
import { IStatusLogBuilder } from "../StatusLog/StatusLogBuilder";

// TODO: Add class description comment

export class LogManager<
    TLog extends ILog = IStatusLog,
    TLogBuilder extends ILogBuilder = IStatusLogBuilder
    > implements ILogManager<TLog, TLogBuilder> {

    private _logNames: string[] = [];
    private _logs: TLog[] = [];

    constructor(builder: TLogBuilder) {
        if (builder == null)
            throw new Error(getNullOrUndefinedErrorMessage('builder'));

        this.initialize = builder;
        this.initialize.logCreated.subscribe(this.onLogCreated);
    }

    /** A builder for generating new ILog channels. */
    public readonly initialize: TLogBuilder;

    /** Disables the log. */
    public disable(logName: string): TLog {
        throwIfNullOrEmpty(logName, 'logName');
        const log = this.getLog(logName);

        if (log == null)
            throw new Error(`No log exists with the name ${ logName }.`)

        log.enabled = false;
        return log;
    }

    /** Enables the log. */
    public enable(logName: string): TLog {
        throwIfNullOrEmpty(logName, 'logName');
        const log = this.getLog(logName);

        if (log == null)
            throw new Error(`No log exists with the name ${ logName }.`)

        log.enabled = true;
        return log;
    }

    /** Gets a log by name. Returns `null` if no such log exists. */
    public getLog(logName: string): TLog | null {
        throwIfNullOrEmpty(logName, 'logName');

        const index = this._logNames.indexOf(logName);
        if (index == -1)
            return null;

        const log = this._logs[ index ];
        return log;
    }

    private onLogCreated(log: any): void {
        // use a special array of JUST the names,
        // in the same exact order as the array of logs.
        // search for the index in the NAMES array,
        // which will be faster than searching the 'primary' array of logs.
        const index = this._logNames.indexOf(log.name);

        if (index != -1) {
            this._logNames.splice(index, 1);
            this._logs.splice(index, 1);
        }
        this._logNames.push(log.name);
        this._logs.push(log);
    }
}
