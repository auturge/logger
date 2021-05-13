import { ILogEntry } from "../ILogEntry";
import { red, yellow, green, magenta, cyan, Style } from "colorette";
import { LogStatus } from "@src/logging/LogStatus";
import { LogLevel } from "@src/logging/LogLevel";
export { Style } from "colorette";

export class EntryColorizer {

    public static readonly DEFAULT: Style = (str: string) => str;

    public static getColor(entry: ILogEntry): Style {
        if (entry.data) {
            switch (entry.data.status) {
                case (LogStatus.MARK):
                    return magenta;
                case (LogStatus.SUCCESS):
                    return green;
                case (LogStatus.FAILURE):
                    return red;
            }
        }

        switch (entry.level) {
            case (LogLevel.FATAL):
            case (LogLevel.ERROR):
                return red;
            case (LogLevel.WARN):
                return yellow;
            case (LogLevel.DEBUG):
                return cyan;
        }

        return this.DEFAULT;
    }
}
