import { assert } from 'chai';
import { DateFormat, formatDate } from '@src/functions/formatDate';
import { getLongTimeString, getOffsetString, getUTCDateFromLocal, getZonedTimeString, localDate } from '@test/helpers/dateHelpers';

describe('formatDate', () => {

    it(`formats a local Date using the default format 'yyyy-MM-dd HH:mm:ss.SSS xxx'`, () => {
        // need to calculate the offset string,
        // since you might not live in my timezone :)
        const offsetString = getOffsetString();
        const expected = "2021-03-04 05:06:07.008 " + offsetString;

        const result = formatDate(localDate);

        assert.equal(result, expected);
    });

    it('formats a local Date to ISO-8601 (UTC)', () => {
        // the date created above was created in the LOCAL timezone,
        // and ISO-8601 (with the 'Z') recalculates it in UTC.
        const expectedDate = getUTCDateFromLocal(localDate);

        const result = formatDate(localDate, DateFormat.ISO);

        assert.equal(result, expectedDate.toISOString());
    });

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
            const expected = getZonedTimeString(localDate, timezone);

            const result = formatDate(localDate, DateFormat.DEFAULT, timezone);

            assert.equal(result, expected);
        });
    });

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

        it(`formats a LONG Date to the '${ timezone }' time zone`, () => {
            // the date created above was created in the LOCAL timezone,
            const expected = getLongTimeString(localDate, timezone);

            const result = formatDate(localDate, DateFormat.LONG, timezone);

            assert.equal(result, expected);
        });
    });
});
