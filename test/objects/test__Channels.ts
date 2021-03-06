import { IChannel } from "@src/logging/StatusLog/Channel";
import { LogLevel } from "@src/logging/LogLevel";
import { IStatusEntry } from "@src/logging/StatusLog/IStatusEntry";
import { ConsoleWriter } from "@src/logging/writers/ConsoleWriter";
import { Emitter } from "@src/core/events";

/* eslint-disable @typescript-eslint/no-unused-vars */

export const TEST_CHANNEL_1: IChannel = {
    enabled: true,
    isEnabledFor(level) { return true; },
    level: LogLevel.TRACE,
    log(entry: IStatusEntry) { /* Do nothing */ },
    name: 'test',
    reconfigured: new Emitter(),
    writer: new ConsoleWriter()
};

export const TEST_CHANNEL_2: IChannel = {
    enabled: true,
    isEnabledFor(level) { return true; },
    level: LogLevel.INFO,
    log(entry: IStatusEntry) { /* Do nothing */ },
    name: 'test',
    reconfigured: new Emitter(),
    writer: new ConsoleWriter()
};
