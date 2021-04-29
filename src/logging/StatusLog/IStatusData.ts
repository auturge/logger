import { ILogEntryData } from "../ILogEntry";
import { LogStatus } from "../LogStatus";

export interface IStatusData extends ILogEntryData {
    status: LogStatus;
}
