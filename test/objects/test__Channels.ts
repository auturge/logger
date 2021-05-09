import { IChannel } from "@src/logging";
import { LogLevel } from "@src/logging/LogLevel";
import { IStatusEntry } from "@src/logging/StatusLog/IStatusEntry";
import { ConsoleWriter } from "@src/logging/writers/ConsoleWriter";
import { Emitter } from "@src/core/events";

export const TEST_CHANNEL_1: IChannel = {
    enabled: true,
    isEnabledFor(level) { return true; },
    level: LogLevel.TRACE,
    log(entry: IStatusEntry) { },
    name: 'test',
    reconfigured: new Emitter(),
    writer: new ConsoleWriter()
};

export const TEST_CHANNEL_2: IChannel = {
    enabled: true,
    isEnabledFor(level) { return true; },
    level: LogLevel.INFO,
    log(entry: IStatusEntry) { },
    name: 'test',
    reconfigured: new Emitter(),
    writer: new ConsoleWriter()
};
