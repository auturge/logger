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
- [Usage](#usage)
- [API](#api)
    - [Abstractions](#abstractions)
        - [`IChannel`](iChannel)
        - [`ILog`](ilog)
        - [`ILogBuilder`](iLogBuilder)
        - [`ILogEntry`](iLogEntry)
        - [`ILogManager`](iLogManager)
        - [`IStatusLog`](iStatusLog)
        - [`IStatusLogEntry`](iStatusLogEntry)
        - [`IWriter`](iWriter)
    - [Instances](#instances)
        - [`Log`](log)
        - [`LogManager`](logmanager)
        - [`LogBuilder`](logbuilder)
        - [loggers](#loggers)
            - [`TerminalLog`](terminalLog)
            - [`ConsoleLog`](consoleLog)
        - [writers](#writers)
            - [`TERMINAL`](terminal)
            - [`CONSOLE`](console)
- [Tables](#tables)
- [Caveats](#caveats)
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

### Use the default ["Log"](#log) to log a message ###

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

- [`ILog`](#i-log)
- [`IChannel`](#i-channel)
- [`ILogEntry`](#i-log-entry)
- [`IWriter`](#i-writer)
- [`LogManagerClass`](#log-manager-class)
- [`LogBuilder`](#log-builder)

There are also several class instances:

- [`Log`](#log),
- [`LogManager`](#log-manager),
- [`ConsoleLog` and `TerminalLog` (loggers)](#loggers),
- [`CONSOLE` and `TERMINAL` (writers)](#writers)

...and a number of enums:

- [`DateFormat`](#dateformat)
- [`LogLevel`](#loglevel)
- [`LogStatus`](#logstatus)

<br>

<a href="#top">(go to top)</a>

----

## Abstractions ##

@auturge/logger exposes several abstractions, designed to make the library extensible:

- [`ILog`](./docs/iLog.md)
- [`IStatusLog`](iStatusLog)
- [`IChannel`](iChannel)
- [`ILogEntry`](iLogEntry)
- [`IWriter`](iWriter)
- [`ILogManager`](iLogManager)
- [`ILogBuilder`](iLogBuilder)

<br>

<a href="#top">(go to top)</a>

----

## Instances ##

@auturge/logger exposes several 'default' implementations of the provided abstractions:

- [`Log`](log)
- [`LogManager`](logManager)
- [`ConsoleLog` and `TerminalLog` (loggers)](#loggers)
- [`CONSOLE` and `TERMINAL` (writers)](#writers)

<br>

<a href="#top">(go to top)</a>

----

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

----

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
|[`CONSOLE`](#console)	| The browser console |
|[`TERMINAL`](#terminal)	| The terminal (non-browser) |
<!-- |DATABASE	| Log entries into a database | -->
<!-- |FILE	    | Log into a file (non-browser only) | -->

<br>

<a href="#top">(go to top)</a>

<br>

### Log Levels ###

|Log Level	|Importance|
|:---|:---|
|Fatal	|One or more key business functionalities are not working and the whole system doesn’t fulfill the business functionalities.|
|Error	|One or more functionalities are not working, preventing some functionalities from working correctly.|
|Warn	|Unexpected behavior happened inside the application, but it is continuing its work and the key business features are operating as expected.|
|Info	|An event happened, the event is purely informative and can be ignored during normal operations.|
|Debug	|Useful during software debugging when more granular information is needed.|
|Trace	|Step by step execution of your code that can be ignored during the standard operation, but may be useful during extended debugging sessions.|

<br>

<a href="#top">(go to top)</a>

<br>

### Entry Statuses ###

| Status	|Importance|
|:---|:---|
| failure	| Non-code failure (login failure, etc.) |
| info		| Informational |
| mark		| Code-execution condition, timestamp, or metrics. |
| success	| Successful completion of an operation. |

<br>

<a href="#top">(go to top)</a>

<br>

### Log Entry Fields ###

|Log Entry Property	|Importance|
|:---|:---|
|data		| Any accompanying data that should be included and logged. |
|level		| The level at which to log the message. |
|message	| The message to log. |
|source		| The source of the log entry. |
|timestamp	| The date and time of the entry. |

<br>

<a href="#top">(go to top)</a>

<br>

----

## Caveats ##

- @auturge/logger does not (currently) include functionality that makes it a **file** or **database** logger, but an interested party might create such an `IWriter`, and I might be happy to review and include it.

<br>

<a href="#top">(go to top)</a>

<br>

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

[emitter]: docs/emitter.md
[iChannel]: docs/iChannel.md
[iEmitter]: docs/iEmitter.md
[iLog]: docs/iLog.md
[iLogBuilder]: docs/iLogBuilder.md
[iLogEntry]: docs/iLogEntry.md
[iLogManager]: docs/iLogManager.md
[iStatusLog]: docs/iStatusLog.md
[iStatusLogEntry]: docs/iStatusLogEntry.md
[iWriter]: docs/iWriter.md
[log]: docs/Log.md
[logLevel]: docs/logLevel.md
[logStatus]: docs/logStatus.md
