<div id="top" align="right"><a href="https://github.com/auturge/logger#readme">(home)</a></div>

# <h1 align="center">DateFormat</h1> #

<br>

`DateFormat` is an enumeration of date formatting strings.

If we assume the following timestamp: ```2021-03-04 05:06:07.008 GMT-8 (America/Los Angeles)```

...then here is a table of example formatting:

Enum|Value|Timestamp Formatted with this DateFormat
---|---|---
DateFormat.DEFAULT | "yyyy-MM-dd HH:mm:ss.SSS xxx" | ```2021-03-04 05:06:07.008 -08:00```
DateFormat.ISO | "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" | ```2021-03-04T05:06:07.008Z```
DateFormat.UTC | "EEE',' dd MMM yyyy HH:mm:ss z" | ```Thu, 04 Mar 2021 05:06:07 PST```
DateFormat.LONG | "yyyy-MM-dd HH:mm:ss XXXX" | ```2021-03-04 05:06:07 -0800```

<br>

> NOTE: specifying the format DOES NOT recalculate the timestamp into the UTC timezone. See [patterns](../patterns#top) for more information.

<br>

Date formatting is based on [Unicode Technical Standard #35][tr35].

Specifically, it depends on the [date-fns][date-fns] and [date-fns-tz][date-fns-tz] libraries to do most of the date formatting.

<!--
// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
-->

<br>

<a href="#top">(go to top)</a>

[WIP-badge]: https://img.shields.io/static/v1?label=WIP:&message=Work-in-Progress&color=blueviolet

[tr35]: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
[date-fns]: https://date-fns.org/
[date-fns-tz]: https://www.npmjs.com/package/date-fns-tz
