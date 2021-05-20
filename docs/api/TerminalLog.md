<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

# <h1 align="center">TerminalLog</h1> #

> `TerminalLog`: The default logger for the command-line terminal.

It has a single channel, called 'console', utilizing a [`TerminalWriter`][writer], and also configured at [`LogLevel.INFO`][log-levels].

<br>

<a href="#top">(go to top)</a>

----

## Properties ##

|Property|Value|
|---|---|
| type | [`IStatusLog`][status-log] |
| name | `console` |
| channels | - `console`: [TerminalWriter][writer] at [`LogLevel.INFO`][log-levels] |
| enabled | true |

<br>

<a href="#top">(go to top)</a>

[writer]: TerminalWriter.md#top
[log-levels]: logLevel.md#log-levels
[status-log]: iStatusLog.md#top
