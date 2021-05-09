import { AnyRandom, CharacterSet, Scale } from "@auturge/testing";

import { Emitter } from "@src/core/events";

import { IStatusData } from "@src/logging/StatusLog/IStatusData";
import { LogStatus } from "@src/logging/LogStatus";
import { IChannel } from "@src/logging/IChannel";
import { LogLevel } from "@src/logging/LogLevel";
import { IStatusEntry } from "@src/logging/StatusLog/IStatusEntry";
import { NULL } from "./NullWriter";

export function string(): string {
    return AnyRandom.string(5, 8, CharacterSet.ALPHA);
}
export function bool(): boolean {
    return AnyRandom.bool();
}
export function num(): number {
    return AnyRandom.number(-100, 100, Scale.EXPONENTIAL);
}
export function object(): object {
    var result = {};
    result[ AnyRandom.string(5, 8, CharacterSet.ALPHA) ] = AnyRandom.string(5, 8, CharacterSet.ALPHANUMERIC);
    result[ AnyRandom.string(5, 8, CharacterSet.ALPHA) ] = AnyRandom.int(-100, 100);
    return result;
}
export function bigInt(): bigint {
    var int = AnyRandom.int(-100, 100);
    var bigInt = BigInt(int);
    return bigInt;
}
export function infiniteFn(): never {
    while (true) { }
}
export function date(): Date {
    return new Date();
}
export function regExp(): RegExp {
    return new RegExp(/abc/);
}
export function symbol(): symbol {
    return Symbol(AnyRandom.string(5, 8, CharacterSet.ALPHA));
}

export function undeclared(): any {
    return;
}

const dataObject = { foo: AnyRandom.string(5, 8) };

export function data(status: LogStatus, prettyPrint: boolean = false): IStatusData {
    var data: IStatusData = { status: status, obj: dataObject }
    if (prettyPrint)
        data.prettyPrint = true;
    return data;
};

export function formatted(data) { return JSON.stringify(data.obj); }
export function pretty(data) { return JSON.stringify(data.obj, null, 2); }

export function channel(level?: LogLevel): IChannel {
    level = level || LogLevel.TRACE;
    const TEST_CHANNEL: IChannel = {
        enabled: true,
        isEnabledFor(level) { return true; },
        level: level,
        log(entry: IStatusEntry) { },
        name: 'test',
        reconfigured: new Emitter(),
        writer: NULL
    };

    return TEST_CHANNEL;
}
