import { LogBuilder } from "../implementation/LogBuilder";
import { IStatusLog, StatusLog } from "./StatusLog";

// TODO: Add class description comment

export class StatusLogBuilder extends LogBuilder<IStatusLog> {

    public constructor(logName: string) {
        super(logName);
    }

    protected createBuilder(logName: string): LogBuilder<IStatusLog> {
        return new StatusLogBuilder(logName);
    }

    protected createLogger(): IStatusLog {
        return new StatusLog(this._logName, this._channels);
    }
}
