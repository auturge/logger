import { ILogEntry } from "../../ILogEntry";

/** An interface describing a log-entry formatting implementation. */
export interface IEntryFormatter {
    formatMessage(entry: ILogEntry): string;
    formatData(entry: ILogEntry): string | undefined;
}
