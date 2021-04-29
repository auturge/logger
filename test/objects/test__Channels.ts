import { IChannel } from "@src/logging";
import { LogLevel } from "@src/logging/LogLevel";
import { IStatusEntry } from "@src/logging/StatusLog/IStatusEntry";
import { CONSOLE } from "@src/logging/DEFAULTS";

export const TEST_CHANNEL_1: IChannel = {
    level: LogLevel.TRACE,
    name: 'test',
    pattern: "%{m}",
    isEnabledFor(thing) { return true; },
    log(entry: IStatusEntry) { },
    writer: CONSOLE
};

export const TEST_CHANNEL_2: IChannel = {
    level: LogLevel.INFO,
    name: 'test',
    pattern: "%{m}",
    isEnabledFor(thing) { return true; },
    log(entry: IStatusEntry) { },
    writer: CONSOLE
};
