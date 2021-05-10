import { ILogEntry, ILogEntryData } from "../ILogEntry";
import { LogStatus } from "../LogStatus";

// TODO: Add class description comments

export interface IStatusData extends ILogEntryData {
    status: LogStatus;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IStatusEntry extends ILogEntry<IStatusData> { }
