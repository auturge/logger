<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">ConsoleLog</h1>

`ConsoleLog` is the default logger for the browser console.

It has a single channel, called 'console', utilizing a [`ConsoleWriter`][writer], and also configured at [`LogLevel.INFO`][log-levels].

<br>

<a href="#top">(go to top)</a>

----

## Properties ##

|Property|Value|
|---|---|
| type | [`IStatusLog`][status-log] |
| name | `console` |
| channels | - `console`: [ConsoleWriter][writer] at [`LogLevel.INFO`][log-levels] |
| enabled | true |

<br>

<a href="#top">(go to top)</a>

[writer]: ConsoleWriter.md#top
[log-levels]: logLevel.md#log-levels
[status-log]: iStatusLog.md#top
