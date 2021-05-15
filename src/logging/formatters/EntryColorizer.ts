import { black, blue, cyan, gray, green, magenta, red, white, yellow } from "colorette";
import { ILogEntry } from "@src/logging/ILogEntry";
import { LogStatus } from "@src/logging/LogStatus";
import { LogLevel } from "@src/logging/LogLevel";
import { isNullUndefinedOrEmpty } from "@src/functions/types";

export type Style = (str: string) => string;
export const noStyle: Style = (str: string) => str;

export class EntryColorizer {

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

        return noStyle;
    }

    public static fromString(value: string): Style {
        if (isNullUndefinedOrEmpty(value))
            return noStyle;

        switch (value.toLowerCase()) {
            case 'black':
                return black;
            case 'blue':
                return blue;
            case 'cyan':
                return cyan;
            case 'gray':
                return gray;
            case 'green':
                return green;
            case 'magenta':
                return magenta;
            case 'red':
                return red;
            case 'white':
                return white;
            case 'yellow':
                return yellow;
            default:
                return noStyle;
        }
    }
}
