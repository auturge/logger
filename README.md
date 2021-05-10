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
- [API](#api)
    - [Abstractions](#abstractions)
        - [`ILog`](#ilog)
            - [`fatal`](#fatal)
            - [`error`](#error)
            - [`warn`](#warn)
            - [`info`](#info)
            - [`debug`](#debug)
            - [`trace`](#trace)
        - [`IStatusLog`](#istatuslog)
        - [`ILogEntry`](#ilogentry)
        - [`IStatusLogEntry`](#istatuslogentry)
        - [`IWriter`](#iwriter)
        - [`ILogManager`](#ilogmanager)
        - [`LogBuilder`](#logbuilder)
    - [Instances](#instances)
        - [`Log`](#log)
            - [`fatal`](#fatal)
            - [`error`](#error)
            - [`warn`](#warn)
            - [`info`](#info)
            - [`debug`](#debug)
            - [`trace`](#trace)
            - [`success`](#success)
            - [`failure`](#failure)
            - [`mark`](#mark)
        - [`LogManager`](#logmanager)
            - [`initialize`](#initialize)
            - [`disable`](#disable)
            - [`enable`](#enable)
            - [`getLog`](#getlog)
        - [`ConsoleLog` and `TerminalLog` (loggers)](#consolelog-and-terminallog-loggers)
        - [`CONSOLE` and `TERMINAL` (writers)](##console-and-terminal-writers)
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
- [`ILogEntry`](#i-log-entry)
- [`IWriter`](#i-writer)
- [`LogManagerClass`](#log-manager-class)
- [`LogBuilder`](#log-builder)

There are also several class instances:

- [`Log`](#log),
    - [`fatal`](#fatal)
    - [`error`](#error)
    - [`warn`](#warn)
    - [`info`](#info)
    - [`debug`](#debug)
    - [`trace`](#trace)
    - [`success`](#success)
    - [`failure`](#failure)
    - [`mark`](#mark)
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

- [`ILog`](#ilog)
    - [`fatal`](#fatal)
    - [`error`](#error)
    - [`warn`](#warn)
    - [`info`](#info)
    - [`debug`](#debug)
    - [`trace`](#trace)
- [`ILogEntry`](#i-log-entry)
- [`IWriter`](#i-writer)
- [`LogManagerClass`](#log-manager-class)
- [`LogBuilder`](#log-builder)

<br>

<a href="#top">(go to top)</a>

----

### ILog ###

> `ILog<TLog, TEntry>`: A logger.

Any `ILog<TLog, TEntry>` exposes the following members:

- [`channels`](#channels)
- [`name`](#name)
- [`reconfigured`](#reconfigured)
- [`enabled`](#enabled)
- [`setLevel`](#setlevel)

along with several logging-specific methods:

- [`fatal`](#fatal)
- [`error`](#error)
- [`warn`](#warn)
- [`info`](#info)
- [`debug`](#debug)
- [`trace`](#trace)

> Unfortunately Github Flavored Markdown (GFM) does not support custom text colors wtihout using hacky workarounds or placeholder sites, so I won't demo colors here, but instead provide a table:

|Method|Color|
|:---|:---|
|fatal|red|
|error|red|
|warn|yellow|
|info|default console color|
|debug|cyan|
|trace|default console color|

<br>

<a href="#top">(go to top)</a>

----

#### `fatal` ####

> ```javascript
> Log.fatal(message: string): void;
> Log.fatal(message: string, obj: any): void;
> Log.fatal(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a fatal log message.

This is the log level that tells the user that the application has encountered an event or entered a state in which one of the crucial business functionalities is no longer working. A FATAL log level may be used when the application is not able to connect to a crucial data store like a database or all the payment systems are not available and users can’t checkout their baskets in your e-commerce.

<br>

<a href="#top">(go to top)</a>

----

#### `error` ####

> ```javascript
> Log.error(message: string): void;
> Log.error(message: string, obj: any): void;
> Log.error(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes an error log message.

This tells the user that the application has hit an issue preventing one or more functionalities from properly functioning. The ERROR level can be used when one of the payment systems is not available, but there is still the option to check out the basket in the e-commerce application or when your social media logging option is not working for some reason.

<br>

<a href="#top">(go to top)</a>

----

#### `warn` ####

> ```javascript
> Log.warn(message: string): void;
> Log.warn(message: string, obj: any): void;
> Log.warn(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a warning log message.

This tells the user that something unexpected happened in the application: a problem, or a situation that might disturb one of the processes. But that doesn’t mean that the application failed. The WARN level should be used in situations that are unexpected, but the code can continue the work. For example, a parsing error occurred that resulted in a certain document not being processed.

<br>

<a href="#top">(go to top)</a>

----

#### `info` ####

> ```javascript
> Log.info(message: string): void;
> Log.info(message: string, obj: any): void;
> Log.info(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes an informational log message.

This is the standard log level indicating that something happened, the application entered a certain state, etc. For example, a controller of your authorization API may include an INFO log entry with information on which user requested authorization if the authorization was successful or not. The information logged using the INFO log level should be purely informative and not looking into them on a regular basis shouldn’t result in missing any important information.

<br>

<a href="#top">(go to top)</a>

----

#### `debug` ####

> ```javascript
> Log.debug(message: string): void;
> Log.debug(message: string, obj: any): void;
> Log.debug(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a debug log message.

This level is less granular compared to the TRACE level, but it is more than you will need in everyday use. The DEBUG log level should be used for information that may be needed for diagnosing issues and troubleshooting or when running application in the test environment for the purpose of making sure everything is running correctly

<br>

<a href="#top">(go to top)</a>

----

#### `trace` ####

> ```javascript
> Log.trace(message: string): void;
> Log.trace(message: string, obj: any): void;
> Log.trace(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a trace log message.

This level is for the most fine-grained information only used in rare cases where you need the full visibility of what is happening in your application and inside the third-party libraries that you use. You can expect the TRACE logging level to be very verbose. You can use it for example to annotate each step in the algorithm or each individual query with parameters in your code.

<br>

<a href="#top">(go to top)</a>

----
----
## Instances ##

@auturge/logger exposes several 'default' implementations of the provided abstractions:

- [`Log`](#log)
    - [`fatal`](#fatal)
    - [`error`](#error)
    - [`warn`](#warn)
    - [`info`](#info)
    - [`debug`](#debug)
    - [`trace`](#trace)
    - [`success`](#success)
    - [`failure`](#failure)
    - [`mark`](#mark)
- [`LogManager`](#log-manager)
- [`ConsoleLog` and `TerminalLog` (loggers)](#loggers)
- [`CONSOLE` and `TERMINAL` (writers)](#writers)

<br>

<a href="#top">(go to top)</a>

----

### Log ###

> Log: A default terminal logger for quick out-of-the-box logging.

Any `ILog` exposes the following methods:

- [`fatal`](#fatal)
- [`error`](#error)
- [`warn`](#warn)
- [`info`](#info)
- [`debug`](#debug)
- [`trace`](#trace)

The `Log` is an `IStatusLog`, a special type of `ILog` which also exposes the following logging methods:

- [`success`](#success)
- [`failure`](#failure)
- [`mark`](#mark)

In addition, `Log` will colorize each log entry.

> Unfortunately Github Flavored Markdown (GFM) does not support custom text colors wtihout using hacky workarounds or placeholder sites, so I won't demo colors here, but instead provide a table:

|Method|Color|
|:---|:---|
|fatal|red|
|error|red|
|warn|yellow|
|info|default console color|
|debug|cyan|
|trace|default console color|
|success|green|
|failure|red|
|mark|magenta|

<br>

<a href="#top">(go to top)</a>

----

#### `success` ####

> ```javascript
> Log.success(message: string): void;
> Log.success(message: string, obj: any): void;
> Log.success(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a success log message.

This is for informing the user of some significant operational success.

Some examples of `success` messages:

- 'All done!'
- 'Successfully logged in!'

> NOTE: `success` entries are logged at the `info` level.
>
> Setting the level of the logger higher than `info` will filter out any `success` messages.

<br>

<a href="#top">(go to top)</a>

----

#### `failure` ####

> ```javascript
> Log.failure(message: string): void;
> Log.failure(message: string, obj: any): void;
> Log.failure(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a trace log message.

This is for informing the user of some significant operational failure _that is tied to **user action**_. Failure messages represent **user errors**, not exceptional code failures (for that, use `error` or `fatal`).

Some examples of `failure` messages:

- 'Failed to log in!' (due to an HTTP 401 error, not a 500)
- 'Passwords must include at least 12 letters (both upper- and lowercase), at least 1 number, and at least 1 symbol.'

> NOTE: `failure` entries are logged at the `info` level.
>
> Setting the level of the logger higher than `info` will filter out any `failure` messages.

<br>

<a href="#top">(go to top)</a>

----

#### `mark` ####

> ```javascript
> Log.mark(message: string): void;
> Log.mark(message: string, obj: any): void;
> Log.mark(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a marking log message.

This is best used to describe events that need to stand out in the log.

Some examples of `mark` messages:

-
        `Entering method ${ methodName } at ${ timestamp }`
-
        `Exiting method ${ methodName } at ${ timestamp }`

<br>

<a href="#top">(go to top)</a>

----

### LogManager ###

> LogManager: The default StatusLog manager.

Any `ILogManager` exposes the following members:

- [`initialize`](#initialize)
- [`disable`](#disable)
- [`enable`](#enable)
- [`getLog`](#getlog)

<br>

<a href="#top">(go to top)</a>

----

#### `initialize` ####

> A `LogBuilder` that configures a logger.

`LogManager.initialize` is meant to be a [fluent interface][fluent-interface], and exposes the following members:

- [`andGetLogger`](#andgetlogger)
- [`atLevel`](#atlevel)
- [`newLog`](#newlog)
- [`newChannel`](#newchannel)

<br>

Example:

```javascript
const consoleLog = LogManager.initialize
    .newLog('console log')
    .newChannel('console channel', CONSOLE, LogLevel.INFO)
    .andGetLogger();
    
consoleLog.mark('Logger configured.');
```

<br>

For more details, see the [ILogBuilder](#ilogbuilder) abstraction.

<a href="#top">(go to top)</a>

----

#### `disable` ####

> ```javascript
> LogManager.disable(logName: string): void;
> ```

Disables the log with the given name.

<br>

<a href="#top">(go to top)</a>

----

#### `enable` ####

> ```javascript
> LogManager.enable(logName: string): void;
> ```

Enables the log with the given name.

<br>

<a href="#top">(go to top)</a>

----

#### `getLog` ####

> ```javascript
> LogManager.getLog(logName: string): ILog | null;
> ```

Returns the `ILog` instance with the given name.
Returns `null` if not found.

<br>

<a href="#top">(go to top)</a>

----

### `ConsoleLog` and `TerminalLog` (loggers) ###

> ConsoleLog: The default console logger.
>
> TerminalLog: The default terminal logger.

Both `ConsoleLog` and `TerminalLog` are instances of the `IStatusLog` abstraction.

`TerminalLog` is the default logger the terminal (e.g., for use in node applications). It has a single channel, called 'terminal', utilizing a [`TerminalWriter`](#terminalwriter), and configured at [`LogLevel.INFO`](#log-levels).

`ConsoleLog` is the default logger for the browser console.
It has a single channel, called 'console', utilizing a [`ConsoleWriter`](#terminalwriter), and also configured at [`LogLevel.INFO`](#log-levels).

<a href="#top">(go to top)</a>

----

### `CONSOLE` and `TERMINAL` (writers) ###

> CONSOLE: The default console writer.
>
> TERMINAL: The default terminal writer.

Both `ConsoleLog` and `TerminalLog` are instances of the `IStatusLog` abstraction.

`TerminalLog` is the default logger the terminal (e.g., for use in node applications). It has a single channel, called 'terminal', utilizing a [`TerminalWriter`](#terminalwriter), and configured at [`LogLevel.INFO`](#log-levels).

`ConsoleLog` is the default logger for the browser console.
It has a single channel, called 'console', utilizing a [`ConsoleWriter`](#terminalwriter), and also configured at [`LogLevel.INFO`](#log-levels).

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

### Logging Targets ###

We need to enable logging to many possible targets, for example:

| Example Target	| Description |
|:---|:---|
|CONSOLE	| The browser console |
|TERMINAL	| The terminal (non-browser) |
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
[fluent-interface]: https://martinfowler.com/bliki/FluentInterface.html
