<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

# <h1 align="center">ILogManager</h1> #

> `ILogManager`: An interface describing a log manager implementation.

The `ILogManager` interface exposes the following members:

- [`initialize`](#initialize)
- [`disable`](#disable)
- [`enable`](#enable)
- [`getLog`](#getLog)

<br>

<a href="#top">(go to top)</a>

----

## `initialize` ##

> An [`ILogBuilder`](iLogBuilder) that configures a logger.

`LogManager.initialize` is meant to be a [fluent interface][fluent-interface], and exposes the following members:

- [`andGetLogger`](iLogBuilder#andgetlogger)
- [`atLevel`](iLogBuilder#atlevel)
- [`newLog`](iLogBuilder#newlog)
- [`newChannel`](iLogBuilder#newchannel)

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

For more details, see the [ILogBuilder](ilogbuilder) abstraction.

<a href="#top">(go to top)</a>

----

## `disable` ##

> ```javascript
> ILogManager.disable(logName: string): void;
> ```

Disables the log with the given name.

<br>

<a href="#top">(go to top)</a>

----

## `enable` ##

> ```javascript
> ILogManager.enable(logName: string): void;
> ```

Enables the log with the given name.

<br>

<a href="#top">(go to top)</a>

----

## `getLog` ##

> ```javascript
> ILogManager.getLog(logName: string): ILog | null;
> ```

Returns the `ILog` instance with the given name.
Returns `null` if not found.

<br>

<a href="#top">(go to top)</a>

----

[fluent-interface]: https://martinfowler.com/bliki/FluentInterface.html

[iLogBuilder]: iLogBuilder.md
