import { Emitter } from "@src/core/events";
import { throwIfNullOrEmpty, throwIfNullOrUndefined } from "@src/functions/guards";
import { ILogEntry, ILogEntryData } from "../ILogEntry";
import { LogLevel } from "../LogLevel";
import { IChannel } from "../IChannel";
import { LogStatus } from "../LogStatus";
import { ILog } from "../ILog";

interface IStatusData extends ILogEntryData {
    status: LogStatus;
}

interface IStatusEntry extends ILogEntry<IStatusData> { }

export interface IStatusLog extends ILog<IStatusLog, IStatusEntry> {

    /** Formats and writes a failure log message. */
    failure(message: string): void;
    failure(message: string, obj: any): void;
    failure(message: string, obj: any, prettyPrint: boolean): void;


    /** Formats and writes a mark log message. */
    mark(message: string): void;
    mark(message: string, obj: any): void;
    mark(message: string, obj: any, prettyPrint: boolean): void;

    /** Formats and writes a success log message. */
    success(message: string): void;
    success(message: string, obj: any): void;
    success(message: string, obj: any, prettyPrint: boolean): void;
}

export class StatusLog implements IStatusLog {

    private dateStamper = () => { return new Date(); };
    private readonly _channels: IChannel[];
    public readonly name: string;

    public constructor(name: string, channels: IChannel[]) {
        throwIfNullOrEmpty(name, 'name');
        throwIfNullOrEmpty(channels, 'channels');
        this._channels = channels;
        this.name = name;
    }

    reconfigured: Emitter<IStatusLog> = new Emitter();

    public fatal(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.FATAL, LogStatus.INFO, message, obj, prettyPrint);
    }
    public error(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.ERROR, LogStatus.INFO, message, obj, prettyPrint);
    }
    public warn(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.WARN, LogStatus.INFO, message, obj, prettyPrint);
    }
    public info(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.INFO, LogStatus.INFO, message, obj, prettyPrint);
    }
    public debug(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.DEBUG, LogStatus.INFO, message, obj, prettyPrint);
    }
    public trace(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.TRACE, LogStatus.INFO, message, obj, prettyPrint);
    }
    public mark(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.INFO, LogStatus.MARK, message, obj, prettyPrint);
    }
    public success(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.INFO, LogStatus.SUCCESS, message, obj, prettyPrint);
    }
    public failure(message: string, obj?: any, prettyPrint?: boolean): void {
        this.buildAndWrite(LogLevel.INFO, LogStatus.FAILURE, message, obj, prettyPrint);
    }





    private buildAndWrite(level: LogLevel, status: LogStatus, message: string, obj: any, prettyPrint?: boolean): void {
        const entry = this.buildEntry(level, status, message, obj, prettyPrint);
        this.output(entry);
    }
    private buildEntry(level: LogLevel, status: LogStatus, message: string, obj?: any, prettyPrint?: boolean): ILogEntry<IStatusData> {
        throwIfNullOrUndefined(level, 'level');
        throwIfNullOrUndefined(status, 'status');
        throwIfNullOrUndefined(message, 'message');

        prettyPrint = prettyPrint || false;

        const entry: IStatusEntry = {
            level: level,
            message: message,
            source: this.name,
            timestamp: this.dateStamper()
        };

        entry.data = {
            status: status,
            prettyPrint: prettyPrint,
            obj: obj
        }

        return entry;
    }
    private output(entry: IStatusEntry): void {
        this._channels.forEach((channel: IChannel<IStatusEntry>) => {
            if (channel.isEnabledFor(entry.level)) {
                channel.log(entry);
            }
        });
    }
}
