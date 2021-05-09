import { isNullUndefinedOrEmpty } from "@src/functions/types";
import { getTimezoneOffset, utcToZonedTime } from "date-fns-tz";

function shiftTimeZone(date: Date, minutesToSubtract: number): Date {
    const offsetMS = minutesToSubtract * 60 * 1000;
    const dateMS = date.getTime();
    const newMS = dateMS - offsetMS;
    const newDate = new Date(newMS);
    return newDate;
}
function pad(value: number): string {
    return value < 10 ? '0' + value : '' + value;
}

export const localDate: Date = new Date(2021, 2, 4, 5, 6, 7, 8);

export function getUTCDateFromLocal(localDate: Date): Date {
    const offsetMin = localDate.getTimezoneOffset(); // in minutes
    return shiftTimeZone(localDate, offsetMin);
}
export function getOffsetString(timezone?: string): string {
    const sign = getOffsetSign(timezone);
    const hours = getOffsetHours(timezone);
    const minutes = getOffsetMinutes(timezone);
    return sign + hours + ":" + minutes;
}

function getOffsetSign(timezone?: string) {
    let offsetMin = getOffset(timezone);
    const sign = (offsetMin > 0) ? "-" : "+";
    return sign;
}
function getOffsetHours(timezone?: string) {
    let offsetMin = getOffset(timezone);
    const absOffset = Math.abs(offsetMin);
    const hours = pad(Math.floor(absOffset / 60));
    return hours;
}
function getOffsetMinutes(timezone?: string) {
    let offsetMin = getOffset(timezone);
    const absOffset = Math.abs(offsetMin);
    const minutes = pad(absOffset % 60);
    return minutes;
}
function getOffset(timezone?: string) {
    let offsetMin: number;
    if (!isNullUndefinedOrEmpty(timezone)) {
        const offsetMS = getTimezoneOffset(timezone, localDate);
        offsetMin = -1 * offsetMS / 1000 / 60;
    } else {
        offsetMin = localDate.getTimezoneOffset();
    }
    return offsetMin;
}

export function getZonedTimeString(localDate: Date, timezone: string): string {
    const zonedTime = utcToZonedTime(localDate, timezone);
    const year = zonedTime.getFullYear();
    const month = zonedTime.getMonth();
    const day = zonedTime.getDay();
    const hour = zonedTime.getHours();
    const minutes = zonedTime.getMinutes();
    const seconds = zonedTime.getSeconds();
    const ms = zonedTime.getMilliseconds();

    let result = '';
    result += year + '-';
    result += (month + 1).toString().padStart(2, '0') + '-';
    result += day.toString().padStart(2, '0') + ' ';
    result += hour.toString().padStart(2, '0') + ':';
    result += minutes.toString().padStart(2, '0') + ':';
    result += seconds.toString().padStart(2, '0') + '.';
    result += ms.toString().padStart(3, '0') + ' ';
    result += getOffsetSign(timezone);
    result += getOffsetHours(timezone).padStart(2, '0') + ":";
    result += getOffsetMinutes(timezone).padStart(2, '0');

    return result;
}

export function getLongTimeString(localDate: Date, timezone: string): string {
    const zonedTime = utcToZonedTime(localDate, timezone);
    const year = zonedTime.getFullYear();
    const month = zonedTime.getMonth();
    const day = zonedTime.getDay();
    const hour = zonedTime.getHours();
    const minutes = zonedTime.getMinutes();
    const seconds = zonedTime.getSeconds();

    let result = '';
    result += year + '-';
    result += (month + 1).toString().padStart(2, '0') + '-';
    result += day.toString().padStart(2, '0') + ' ';
    result += hour.toString().padStart(2, '0') + ':';
    result += minutes.toString().padStart(2, '0') + ':';
    result += seconds.toString().padStart(2, '0') + ' ';

    let offsetString = getOffsetSign(timezone)
        + getOffsetHours(timezone).padStart(2, '0')
        + getOffsetMinutes(timezone).padStart(2, '0');
    if (offsetString == "+0000" || offsetString == "-0000")
        offsetString = "Z"

    result += offsetString;
    return result;
}
