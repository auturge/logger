
import { IStatusEntry } from "./IStatusEntry";
import { LogBuilder } from "../LogBuilder";
import { IStatusLog, StatusLog } from "./StatusLog";

export class StatusLogBuilder extends LogBuilder<IStatusEntry, IStatusLog>{

    public constructor(logName: string) {
        super(logName);
    }

    protected createBuilder(logName: string): LogBuilder<IStatusEntry, IStatusLog> {
        return new StatusLogBuilder(logName);
    }

    protected createLogger(): IStatusLog {
        return new StatusLog(this._logName, this._channels);
    }
}
