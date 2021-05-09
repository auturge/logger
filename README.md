# <h1 align="center">auturge/logger</h1>

<p align="center">
  A set of helpful functions for developer convenience.
</p>

[![License][license-image]][license-url] <!-- [![NPM Version][npm-image]][npm-url]--> [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Work In Progress][WIP-badge]][auturge-github-homepage]

-   [auturge/logger](#auturgelogger)
    -   [Installation](#installation)
    -   [Examples](#examples)
    -   [Details](#details)
    -   [Tables](#tables)
    -   [License](#license)

<br/>

----

## Installation

> ```shell
> $ npm install @auturge/logger
> ```

<br/>

----

## Examples

### Use the default "Log" to log a message:

```ts
Log.info('Doing a thing...');
```

... which is shorthand for...

### Create and configure a single console logger at the TRACE level:

```ts
const logger = LogManager.initialize
                         .newChannel('terminal', TERMINAL, LogLevel.INFO)
                         .andGetLogger();

logger.info('Doing a thing...');
```

... or you could do something a little more complicated:

### Create and configure a multiplexing logger:

```ts
import { LogManager, TerminalWriter } from ('@auturge/logger');

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

<br/>

----

## Details

### Date Formatting

Date formatting is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).

Date token format: ```{%date[|<format string>[|<timezone>]]}```

example timestamp: ```2021-04-25 19:00:43.426 GMT-7 (America/Los Angeles)```

| Date Format | desired result | date token |
|:---|:---|:---|
| Default | ```2021-04-25 19:00:43.426 -07:00``` | ```%{ date }``` |
| "long" format | ```2021-04-26 19:00:43 -0700``` | ```%{ date \| yyyy-MM-dd HH:mm:ss XXXX }``` |
| ISO-8601 (UTC) | ```2021-04-26T02:00:43.426Z``` | ```%{ date \| yyyy-MM-dd'T'HH:mm:ss.SSS'Z' \| UTC }``` |
| UTC format |	```Mon, 26 Apr 2021 02:00:43 UTC``` |	```%{ date \| EEE',' dd MMM yyyy HH:mm:ss xxx \| UTC }``` |

<br/>

### Logging Targets

We need to enable logging to many possible targets, for example:

| Example Target	| Description |
|:---|:---|
|CONSOLE	| The browser console |
|TERMINAL	| The terminal (non-browser) |
<!-- |DATABASE	| Log entries into a database | -->
<!-- |FILE	    | Log into a file (non-browser only) | -->

<br/>

### Log Levels

- **Fatal** – the log level that tells that the application encountered an event or entered a state in which one of the crucial business functionality is no longer working. A FATAL log level may be used when the application is not able to connect to a crucial data store like a database or all the payment systems are not available and users can’t checkout their baskets in your e-commerce.
- **Error** – the log level that should be used when the application hits an issue preventing one or more functionalities from properly functioning. The ERROR log level can be used when one of the payment systems is not available, but there is still the option to check out the basket in the e-commerce application or when your social media logging option is not working for some reason.
- **Warn** – the log level that indicates that something unexpected happened in the application, a problem, or a situation that might disturb one of the processes. But that doesn’t mean that the application failed. The WARN level should be used in situations that are unexpected, but the code can continue the work. For example, a parsing error occurred that resulted in a certain document not being processed.
- **Info** – the standard log level indicating that something happened, application entered a certain state, etc. For example, a controller of your authorization API may include an INFO log level with information on which user requested authorization if the authorization was successful or not. The information logged using the INFO log level should be purely informative and not looking into them on a regular basis shouldn’t result in missing any important information.
- **Debug** – less granular compared to the TRACE level, but it is more than you will need in everyday use. The DEBUG log level should be used for information that may be needed for diagnosing issues and troubleshooting or when running application in the test environment for the purpose of making sure everything is running correctly
- **Trace** – the most fine-grained information only used in rare cases where you need the full visibility of what is happening in your application and inside the third-party libraries that you use. You can expect the TRACE logging level to be very verbose. You can use it for example to annotate each step in the algorithm or each individual query with parameters in your code.

<br/>

----

## Tables

<br/>

### Logging Targets

| Example Target	| Description |
|:---|:---|
|CONSOLE	| The browser console |
|TERMINAL	| The terminal (non-browser) |
<!-- |DATABASE	| Log entries into a database | -->
<!-- |FILE	    | Log into a file (non-browser only) | -->

<br/>

### Log Levels

|Log Level	|Importance|
|:---|:---|
|Fatal	|One or more key business functionalities are not working and the whole system doesn’t fulfill the business functionalities.|
|Error	|One or more functionalities are not working, preventing some functionalities from working correctly.|
|Warn	|Unexpected behavior happened inside the application, but it is continuing its work and the key business features are operating as expected.|
|Info	|An event happened, the event is purely informative and can be ignored during normal operations.|
|Debug	|Useful during software debugging when more granular information is needed.|
|Trace	|Step by step execution of your code that can be ignored during the standard operation, but may be useful during extended debugging sessions.|

<br/>

### Entry Statuses

| Status	|Importance|
|:---|:---|
| failure	| Non-code failure (login failure, etc.) |
| info		| Informational |
| mark		| Code-execution condition, timestamp, or metrics. |
| success	| Successful completion of an operation. |

<br/>

### Log Entry Fields

|Log Entry Property	|Importance|
|:---|:---|
|data		| Any accompanying data that should be included and logged. |
|level		| The level at which to log the message. |
|message	| The message to log. |
|source		| The source of the log entry. |
|timestamp	| The date and time of the entry. |

<br/>

----

## License

Distributed under the MIT license. See [`LICENSE`][license] for more information.

[auturge-github-homepage]: https://github.com/auturge/auturge
[WIP-badge]: https://img.shields.io/static/v1?label=an%20@auturge&message=Work-in-Progress&color=blueviolet
[license]: https://github.com/auturge/auturge/blob/master/LICENSE
[license-image]: http://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: http://badges.mit-license.org
[npm-image]: https://img.shields.io/npm/v/@auturge/logger.svg
[npm-url]: https://www.npmjs.com/package/@auturge/logger
[travis-image]: https://travis-ci.com/auturge/logger.svg?branch=master
[travis-url]: https://travis-ci.com/github/auturge/logger
[coveralls-image]: https://coveralls.io/repos/github/auturge/logger/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/auturge/logger?branch=master
