import { isNullUndefinedOrEmpty } from "@src/functions/types";
import { getTimezoneOffset, utcToZonedTime } from "date-fns-tz";

function shiftTimeZone(date: Date, minutesToSubtract: number): Date {
    var offsetMS = minutesToSubtract * 60 * 1000;
    var dateMS = date.getTime();
    var newMS = dateMS - offsetMS;
    var newDate = new Date(newMS);
    return newDate;
}
function pad(value: number): string {
    return value < 10 ? '0' + value : '' + value;
}

export const localDate: Date = new Date(2021, 2, 4, 5, 6, 7, 8);

export function getUTCDateFromLocal(localDate: Date): Date {
    var offsetMin = localDate.getTimezoneOffset(); // in minutes
    return shiftTimeZone(localDate, offsetMin);
}
export function getOffsetString(timezone?: string): string {

    var offsetMin: number;
    if (!isNullUndefinedOrEmpty(timezone)) {
        var offsetMS = getTimezoneOffset(timezone, localDate);
        offsetMin = -1 * offsetMS / 1000 / 60;

    } else {
        offsetMin = localDate.getTimezoneOffset();
    }

    const sign = (offsetMin > 0) ? "-" : "+";
    var absOffset = Math.abs(offsetMin);
    var hours = pad(Math.floor(absOffset / 60));
    var minutes = pad(absOffset % 60);
    return sign + hours + ":" + minutes;
}
export function getZonedTimeString(localDate: Date, timezone: string): string {
    var zonedTime = utcToZonedTime(localDate, timezone);
    var year = zonedTime.getFullYear();
    var month = zonedTime.getMonth();
    var day = zonedTime.getDay();
    var hour = zonedTime.getHours();
    var minutes = zonedTime.getMinutes();
    var seconds = zonedTime.getSeconds();
    var ms = zonedTime.getMilliseconds();

    var result = '';
    result += year + '-';
    result += (month + 1).toString().padStart(2, '0') + '-';
    result += day.toString().padStart(2, '0') + ' ';
    result += hour.toString().padStart(2, '0') + ':';
    result += minutes.toString().padStart(2, '0') + ':';
    result += seconds.toString().padStart(2, '0') + '.';
    result += ms.toString().padStart(3, '0') + ' ';
    result += getOffsetString(timezone);

    return result;
}
