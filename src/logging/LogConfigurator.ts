import { ILog } from "./ILog";
import { ILogEntry } from "./ILogEntry";

export abstract class LogConfigurator<TEntry extends ILogEntry, TLog extends ILog<TLog, TEntry>> {

    protected _current: TLog | undefined;

    public bind(log: TLog): LogConfigurator<TEntry, TLog> {
        this._current = log;
        return this;
    }

    // public enable(): void {
    //     this._current.
    // }

}
