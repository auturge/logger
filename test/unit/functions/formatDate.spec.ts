import { assert } from 'chai';
import { DateFormat, formatDate } from '@src/functions/formatDate';
import { getTimezoneOffset, utcToZonedTime } from 'date-fns-tz';
import { isNullUndefinedOrEmpty } from '@src/functions/types';

describe('formatDate', () => {

    const localDate: Date = new Date(2021, 2, 4, 5, 6, 7, 8);

    function getUTCDateFromLocal(localDate: Date): Date {
        var offsetMin = localDate.getTimezoneOffset(); // in minutes
        return shiftTimeZone(localDate, offsetMin);
    }
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
    function getOffsetString(timezone?: string): string {

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

    it(`formats a local Date using the default format 'yyyy-MM-dd HH:mm:ss.SSS xxx'`, () => {
        // need to calculate the offset string,
        // since you might not live in my timezone :)
        var offsetString = getOffsetString();
        var expected = "2021-03-04 05:06:07.008 " + offsetString;

        var result = formatDate(localDate);

        assert.equal(result, expected);
    });

    it('formats a local Date to ISO-8601 (UTC)', () => {
        // the date created above was created in the LOCAL timezone,
        // and ISO-8601 (with the 'Z') recalculates it in UTC.
        var expectedDate = getUTCDateFromLocal(localDate);

        var result = formatDate(localDate, DateFormat.ISO);

        assert.equal(result, expectedDate.toISOString());
    });

    function getZonedTimeString(localDate: Date, timezone: string): string {
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

    // I don't intend to cover every imaginable iana timezone.
    // This seems to be a healthy list of different types.
    [
        { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        { timezone: 'America/New_York' },
        { timezone: 'UTC' },
        { timezone: 'GMT' },
        { timezone: '-04:00' },
        { timezone: 'Africa/Johannesburg' },
        { timezone: 'America/Kentucky/Louisville' },
        { timezone: 'Asia/Taipei' },
        { timezone: 'Australia/Melbourne' },
        { timezone: 'Egypt' },
        { timezone: 'PST' },
        { timezone: 'PDT' }
    ].forEach(({ timezone }) => {

        it(`formats a local Date to the '${ timezone }' time zone`, () => {
            // the date created above was created in the LOCAL timezone,
            var expected = getZonedTimeString(localDate, timezone);

            var result = formatDate(localDate, DateFormat.DEFAULT, timezone);

            assert.equal(result, expected);
        });
    })



});
