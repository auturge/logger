
import { IPatternWriterConfig } from "../IWriter";
import { IStatusData } from "./IStatusData";
import { IStatusEntry } from "./IStatusEntry";
import { LogBuilder } from "./LogBuilder";
import { IStatusLog, StatusLog } from "./StatusLog";

export class StatusLogBuilder extends LogBuilder<IStatusLog, IStatusEntry, IStatusData, IPatternWriterConfig>{

    public constructor(logName: string) {
        super(logName);
    }

    protected createBuilder(logName: string): LogBuilder<IStatusLog, IStatusEntry, IStatusData, IPatternWriterConfig> {
        return new StatusLogBuilder(logName);
    }

    protected createLogger(): IStatusLog {
        return new StatusLog(this._logName, this._channels);
    }
}
