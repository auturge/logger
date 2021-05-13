# <h1 id="top" align="center">auturge/logger</h1> #

<p align="center">
  A set of helpful functions for developer convenience.
</p>

[![License][license-image]][license-url]
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

<br>

>
> [![Work In Progress][WIP-badge]](#top)
>
> This readme is incomplete.
>
> I'm working on it, but I also have to sleep sometimes! :sleeping:

<br>

- [Installation](#installation)
- [Examples](#examples)
- [Tables](#tables)
    - [Date Formatting](#date-formatting)
    - [Logging Writers](#logging-writers)
    - [`LogLevels`](#log-levels)
    - [Entry Statuses](#entry-statuses)
- [Caveats](#caveats)
- [API](#api)
    - Abstractions
        - [`IChannel`](docs/iChannel.md)
        - [`ILog`](docs/iLog.md)
        - [`ILogBuilder`](docs/iLogBuilder.md)
        - [`ILogEntry`](docs/iLogEntry.md)
        - [`ILogManager`](docs/iLogManager.md)
        - [`IStatusLog`](docs/iStatusLog.md)
        - [`IStatusLogEntry`](docs/iStatusLogEntry.md)
        - [`IWriter`](docs/iWriter.md)
    - Enums
        - [`DateFormat`](docs/dateFormat.md)
        - [`LogLevel`](docs/logLevel.md)
        - [`LogStatus`](docs/logStatus.md)
    - Instances
        - [`Log`](docs/log.md)
        - [`LogManager`](docs/LogManager.md)
        - [`LogBuilder`](docs/logBuilder.md)
        - loggers
            - [`TerminalLog`](docs/TerminalLog.md)
            - [`ConsoleLog`](docs/ConsoleLog.md)
        - writers
            - [`TERMINAL`](docs/TerminalWriter.md)
            - [`CONSOLE`](docs/ConsoleWriter.md)

- [License](#license)

<br>

----

## Installation ##

> ```shell
> $ npm install @auturge/logger
> ```

<br>

<a href="#top">(go to top)</a>

----

## Introduction ##

I needed a quick way to log messages to the console or terminal with custom formatting (like colored success, error, and warning messages). Something like log4xxx, or nLog, but for TypeScript/javascript.

I felt like reinventing the wheel (_so naughty_), so here's a handy, extensible logger library.

<br>

<a href="#top">(go to top)</a>

----

## Examples ##

### Use the default ["Log"](docs/log.md) to log a message ###

```ts
import { Log } from '@auturge/logger';

Log.info('Doing a thing...');
```

... which is shorthand for...

### Create and configure a single console logger at the TRACE level ###

```ts
import { LogManager, TERMINAL, LogLevel } from '@auturge/logger';

const logger = LogManager.initialize
                         .newChannel('terminal', TERMINAL, LogLevel.INFO)
                         .andGetLogger();

logger.info('Doing a thing...');
```

... or you could do something a little more complicated:

### Create and configure a multiplexing logger ###

```ts
import { 
    LogManager, TerminalWriter, DateFormat, LogLevel, IWriter
    } from '@auturge/logger';
import { MyFileWriter } from 'whatever-file-you-put-it-in';

// use the included terminal writer
const TERMINAL: IWriter = new TerminalWriter(` %{ date | ${ DateFormat.DEFAULT } } | %{level} | %{message}`);

// write your own file-writer
const MY_FILE_WRITER: IWriter = new MyFileWriter('%{date} | %{level} | %{message}');

const logger = LogManager.initialize
                         .newChannel('terminal', LogLevel.INFO, TERMINAL)
                         .newChannel('file', LogLevel.TRACE, MY_FILE_WRITER)
                         .andGetLogger();

logger.error('Look! An error which will appear in both logs...', error);

logger.info('Look! A log entry which will appear in both logs...');

logger.trace('Look! An entry that will only appear in the debug log file...');

```

<br>

<a href="#top">(go to top)</a>

----

## API ##

There are several abstraction exposed by @auturge/logger:

- [`IChannel`](docs/iChannel.md)
- [`IEmitter`](docs/iEmitter.md)
- [`ILog`](docs/iLog.md)
- [`ILogBuilder`](docs/iLogBuilder.md)
- [`ILogEntry`](docs/iLogEntry.md)
- [`ILogManager`](docs/iLogManager.md)
- [`IStatusLog`](docs/iStatusLog.md)
- [`IStatusLogEntry`](docs/iStatusLogEntry.md)
- [`IWriter`](docs/iWriter.md)

There are also several class instances:

- [`Emitter`](docs/emitter.md),
- [`Log`](docs/log.md),
- [`LogBuilder`](docs/LogBuilder.md),
- [`LogManager`](docs/LogManager.md),
- loggers
    - [`ConsoleLog`](docs/ConsoleLog.md),
    - [`TerminalLog`](docs/TerminalLog.md),
- writers
    - [`CONSOLE`](docs/ConsoleWriter.md)
    - [`TERMINAL`](docs/TerminalWriter.md)

...and a number of enums:

- [`DateFormat`](docs/dateFormat.md)
- [`LogLevel`](docs/logLevel.md)
- [`LogStatus`](docs/logStatus.md)

<br>

<a href="#top">(go to top)</a>

----
<!-- 
### Loggers ###

> ConsoleLog: The default console logger.
>
> TerminalLog: The default terminal logger.

Both `ConsoleLog` and `TerminalLog` are instances of the [`IStatusLog`](iStatusLog) abstraction.

<br>

#### `TerminalLog` ###

`TerminalLog` is the default logger the terminal (e.g., for use in node applications). It has a single channel, called 'terminal', utilizing a [`TerminalWriter`](#terminalwriter), and configured at [`LogLevel.INFO`](#log-levels).

<br>

#### `ConsoleLog` ###

`ConsoleLog` is the default logger for the browser console.
It has a single channel, called 'console', utilizing a [`ConsoleWriter`](#terminalwriter), and also configured at [`LogLevel.INFO`](#log-levels).

<br>

<a href="#top">(go to top)</a>

----

### Writers ###

> CONSOLE: The default console writer.
>
> TERMINAL: The default terminal writer.

Both `CONSOLE` and `TERMINAL` are instances of the [`IWriter`](iWriter) abstraction.

<br>

#### `TERMINAL` ####

`TERMINAL` is the default writer for the terminal (e.g., for use in node applications).

<br>

#### `CONSOLE` ####

`CONSOLE` is the default writer for the browser console.

<br>

<a href="#top">(go to top)</a>

---- -->

## Tables ##

### Date Formatting ###

Date formatting is based on [Unicode Technical Standard #35][tr35].

Specifically, it depends on the [date-fns][date-fns] and [date-fns-tz][date-fns-tz] libraries to do most of the date formatting.

Date token format: ```{ %date [```&#8203;```|<format string>[```&#8203;```| <timezone> ] ] }```

example timestamp: ```2021-04-25 19:00:43.426 GMT-7 (America/Los Angeles)```

| Date Format | desired result | date token |
|:---|:---|:---|
| Default | ```2021-04-25 19:00:43.426 -07:00``` | ```%{ date }``` |
| "long" format | ```2021-04-26 19:00:43 -0700``` | ```%{ date \| yyyy-MM-dd HH:mm:ss XXXX }``` |
| ISO-8601 (UTC) | ```2021-04-26T02:00:43.426Z``` | ```%{ date \| yyyy-MM-dd'T'HH:mm:ss.SSS'Z' \| UTC }``` |
| UTC format |	```Mon, 26 Apr 2021 02:00:43 UTC``` |	```%{ date \| EEE',' dd MMM yyyy HH:mm:ss xxx \| UTC }``` |

<br>

<a href="#top">(go to top)</a>

<br>

### Logging Writers ###

We need to enable logging to many possible targets, for example:

| Example Target	| Description |
|:---|:---|
|[`CONSOLE`](docs/consoleWriter.md)	| The browser console |
|[`TERMINAL`](docs/terminalWriter.md)	| The terminal (non-browser) |
<!-- |DATABASE	| Log entries into a database | -->
<!-- |FILE	    | Log into a file (non-browser only) | -->

<br>

<a href="#top">(go to top)</a>

<br>

### Log Levels ###

|Log Level	|Importance|
|:---|:---|
|OFF| Nothing will be logged. |
|FATAL	|One or more key business functionalities are not working and the whole system doesn’t fulfill the business functionalities.|
|ERROR	|One or more functionalities are not working, preventing some functionalities from working correctly.|
|WARN	|Unexpected behavior happened inside the application, but it is continuing its work and the key business features are operating as expected.|
|INFO	|An event happened, the event is purely informative and can be ignored during normal operations.|
|DEBUG	|Useful during software debugging when more granular information is needed.|
|TRACE	|Step by step execution of your code that can be ignored during the standard operation, but may be useful during extended debugging sessions.|
|ALL	|A level where all messages will be logged, regardless of level. |


<br>

<a href="#top">(go to top)</a>

<br>

### Entry Statuses ###

| Status	|Importance|
|:---|:---|
| FAILURE	| Describes some significant operational failure _that is tied to **user action**_. Failure messages represent **user errors**, not exceptional code failures.<br>Examples:<br>- 'Failed to log in!' (due to an HTTP 401 error, not a 500)<br>- 'Passwords must include at least 12 letters (both upper- and lowercase), at least 1 number, and at least 1 symbol.' |
| INFO		| Describes some event, where the event is purely informative and can be ignored during normal operations. |
| MARK		| Code-execution condition, timestamp, or metrics. |
| SUCCESS	| Describes some significant operational success.<br>Examples:<br>- 'Successfully logged in!'<br>- 'All done!' |

<br>

<a href="#top">(go to top)</a>

----

## Caveats ##

- @auturge/logger does not (currently) include functionality that makes it a **file** or **database** logger, but an interested party might create such an `IWriter`, and I might be happy to review and include it.

<br>

<a href="#top">(go to top)</a>

----

## License ##

Distributed under the MIT license. See [`LICENSE`][license] for more information.

<br>

<a href="#top">(go to top)</a>

<br>

[auturge-github-homepage]: https://github.com/auturge/auturge
[WIP-badge]: https://img.shields.io/static/v1?label=WIP:&message=Work-in-Progress&color=blueviolet
[license]: https://github.com/auturge/auturge/blob/master/LICENSE
[license-image]: http://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: http://badges.mit-license.org
[npm-image]: https://img.shields.io/npm/v/@auturge/logger.svg
[npm-url]: https://www.npmjs.com/package/@auturge/logger
[travis-image]: https://travis-ci.com/auturge/logger.svg?branch=master
[travis-url]: https://travis-ci.com/github/auturge/logger
[coveralls-image]: https://coveralls.io/repos/github/auturge/logger/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/auturge/logger?branch=master

[tr35]: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
[date-fns]: https://date-fns.org/
[date-fns-tz]: https://www.npmjs.com/package/date-fns-tz
