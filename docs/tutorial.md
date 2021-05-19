<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">Tutorial</h1>

Logger can be setup with the following steps:

1. [Installing the @auturge/logger npm package](#installing-logger)
1. [Configuring a logger](#configuring-a-logger)
    - [Use the default Log](#default-log)
    - [Creating the default Log by hand](#default-by-hand)
    - [Create and configure a multiplexing logger](#multiplexing-logger)
1. [The Basics](#the-basics)
    - [Writing log messages](#writing-messages)

<br>

----

## Installing Logger ##

@auturge/logger is available as source code from [GitHub][github-url], or as a minified package on [npm][npm-url].

Install it using the follow terminal command:

> ```shell
> $ npm install @auturge/logger
> ```

<br>

<a href="#top">(go to top)</a>

----

## Configuring a Logger ##

<br>

### <a id="default-log"></a>Use the default ["Log"](./api/log.md#top) to log a message ###

```javascript
import { Log } from '@auturge/logger';

Log.info('Doing a thing...');
```

The default [Log](./api/log.md#top) has the following properties:

- writes to the `TERMINAL` (suitable for use with nodeJs applications)
- uses the pattern  "%{ date | ${ DateFormat.DEFAULT } } | %{ level } | %{message}", which looks like this:
  > ``` 2020-12-31 21:57:02.333 -0800 | DEBUG | Hello, world! ```
- default [LogLevel](./api/loglevel.md#log-levels) is ['INFO'](./api/loglevel.md#log-levels)
- each message will be color-coded based on the [LogLevel](./api/loglevel.md#log-levels)

<br>

<a href="#top">(go to top)</a>

<br>

### <a id="default-by-hand"></a> Creating the default Log by hand ###

This example should give you an idea on how to create (and customize) your own logger. The logger created below matches the [default Log](#default-log).

```javascript
import { LogManager, DateFormat, LogLevel, TerminalWriter, IWriter } from '@auturge/logger';

/** Terminal Writer */
const TERMINAL = 
        new TerminalWriter(` %{ date | ${ DateFormat.DEFAULT } } | %{ level } | %{message}`);

/** A StatusLog for use on the Terminal. */
export const logger = LogManager.initialize
                         .newChannel('terminal', TERMINAL, LogLevel.INFO)
                         .andGetLogger();

logger.info('Doing a thing...');
```

<br>

<a href="#top">(go to top)</a>

<br>

### <a id="multiplexing-logger"></a> Create and configure a multiplexing logger ###

Here we create a multiplexing logger, that is, a logger with multiple output [channel](./api/iChannel.md#top)s.

```javascript
import { LogManager, TerminalWriter, LogLevel } from '@auturge/logger';
import { MyFileWriter } from '<your-custom-writer>';

// use the included terminal writer
const TERMINAL = new TerminalWriter(` %{ date } | %{level} | %{message}`);

// write your own file-writer
const MY_FILE_WRITER = new MyFileWriter('%{date} | %{level} | %{message}');

const logger = LogManager.initialize
                         .newChannel('terminal', LogLevel.INFO, TERMINAL)
                         .newChannel('file', LogLevel.TRACE, MY_FILE_WRITER)
                         .andGetLogger();

logger.error('Look! An error which will appear in both logs...', theError);

logger.info('Look! A log entry which will appear in both logs...');

logger.trace('Look! An entry that will only appear in the debug log file...');

```

<br>

<a href="#top">(go to top)</a>

<br>

----

## The Basics ##

The logger is the "public api" for the logging mechanism. It has the following members:

|Member|Purpose|
|---|---|
[`enabled`](./api/iLog.md#enabled)|Gets or sets whether the logger is enabled.
[`setLevel`](./api/iLog.md#setLevel)|Sets the level of all [`channel`](./api/IChannel.md#top)s on the logger.
[`fatal`](./api/iLog.md#fatal) | Writes a message at the [`FATAL`](./api/loglevel.md#log-levels) level.
[`error`](./api/iLog.md#error) | Writes a message at the [`ERROR`](./api/loglevel.md#log-levels) level.
[`warn`](./api/iLog.md#warn) | Writes a message at the [`WARN`](./api/loglevel.md#log-levels) level.
[`info`](./api/iLog.md#info) | Writes a message at the [`INFO`](./api/loglevel.md#log-levels) level.
[`debug`](./api/iLog.md#debug) | Writes a message at the [`DEBUG`](./api/loglevel.md#log-levels) level.
[`trace`](./api/iLog.md#trace) | Writes a message at the [`TRACE`](./api/loglevel.md#log-levels) level.
[`failure`](./api/iStatusLog.md#failure) | Writes a message at the [`INFO`](./api/loglevel.md#log-levels) level, using the color specified for the [`FAILURE`](api/logstatus.md#entry-statuses) status (default: red).
[`mark`](./api/iStatusLog.md#mark) | Writes a message at the [`INFO`](./api/loglevel.md#log-levels) level, using the color specified for the [`MARK`](api/logstatus.md#entry-statuses) status (default: magenta).
[`success`](./api/iStatusLog.md#success) | Writes a message at the [`INFO`](./api/loglevel.md#log-levels) level, using the color specified for the [`SUCCESS`](api/logstatus.md#entry-statuses) status (default: green).

<br>

<a href="#top">(go to top)</a>

<br>

## Writing Messages ##

Each of the "writing" methods has a similar set of three signatures:
<br>

----

<br>

>```typescript
>    info(message: string): void;
>```

Writes a message at the `INFO` level.

Example:

```javascript
import { Log } from '@auturge/logger';

Log.info('Successfully logged in!');
```

Result:

```text
<timestamp> | INFO  | Successfully logged in!
```

<a href="#top">(go to top)</a>

<br>

----

<br>

>```typescript
>    info(message: string, obj: any): void;
>```

Writes a message at the `INFO` level, including an object, which is displayed as json (not pretty-printed).

Example:

```javascript
import { Log } from '@auturge/logger';

const result = { 
    product: 30 * 5,
    sum: 30 + 5,
    quotient: 30 / 5,
    difference: 30 - 5
};

Log.info('result:', result);
```

Result:

```text
<timestamp> | INFO  | result:
{"product":150,"sum":35,"quotient":6,"difference":25}
```

<a href="#top">(go to top)</a>

<br>

----

<br>

>```typescript
>    info(message: string, obj: any, prettyPrint: boolean): void;
>```

Writes a message at the `INFO` level, including an object, which is displayed as json with the option of pretty-printing.

Example:

```javascript
import { Log } from '@auturge/logger';

const result = { 
    product: 30 * 5,
    sum: 30 + 5,
    quotient: 30 / 5,
    difference: 30 - 5
};

Log.info('result:', result, true);
```

Result:

```text
<timestamp> | INFO  | result:
{
  "product": 150,
  "sum": 35,
  "quotient": 6,
  "difference": 25
}
```

<a href="#top">(go to top)</a>

<br>

[github-url]: https://github.com/auturge/logger
[npm-url]: https://www.npmjs.com/package/@auturge/logger
