import { PatternFormatter } from "./PatternFormatter";
import { cyan, green, magenta, red, yellow } from "colorette";
import { isUndefined } from "@src/functions/types";
import { ILogEntry } from "@src/logging/ILogEntry";
import { LogLevel } from "@src/logging/LogLevel";
import { LogStatus } from "@src/logging/LogStatus";

/** A formatter that formats the entry using a specified pattern. */
export class ColorPatternFormatter extends PatternFormatter {

    constructor();
    constructor(pattern: string);
    constructor(pattern = "%{m}") {
        super(pattern);
    }

    public formatMessage(entry: ILogEntry): string {
        const baseMessage = super.formatMessage(entry);
        return this.colorMessage(baseMessage, entry);
    }

    public formatData(entry: ILogEntry): string | undefined {
        const baseMessage = super.formatData(entry);
        if (isUndefined(baseMessage))
            return;

        return this.colorMessage(baseMessage, entry);
    }

    private colorMessage(message: string, entry: ILogEntry): string {
        if (entry.data) {
            switch (entry.data.status) {
                case (LogStatus.MARK):
                    return magenta(message);
                case (LogStatus.SUCCESS):
                    return green(message);
                case (LogStatus.FAILURE):
                    return red(message);
            }
        }

        switch (entry.level) {
            case (LogLevel.FATAL):
            case (LogLevel.ERROR):
                return red(message);
            case (LogLevel.WARN):
                return yellow(message);
            case (LogLevel.DEBUG):
                return cyan(message);
        }

        return message;
    }
}
