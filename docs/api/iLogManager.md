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

> An [`ILogBuilder`][iLogBuilder] that configures a logger.

`LogManager.initialize` is meant to be a [fluent interface][fluent-interface], and exposes the following members:

- [`andGetLogger`][andGetLogger]
- [`atLevel`][atLevel]
- [`newLog`][newLog]
- [`newChannel`][newChannel]

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

For more details, see the [ILogBuilder][iLogBuilder] abstraction.

<a href="#top">(go to top)</a>

----

## `disable` ##

> ```typescript
> ILogManager.disable(logName: string): void;
> ```

Disables the log with the given name.

<br>

<a href="#top">(go to top)</a>

----

## `enable` ##

> ```typescript
> ILogManager.enable(logName: string): void;
> ```

Enables the log with the given name.

<br>

<a href="#top">(go to top)</a>

----

## `getLog` ##

> ```typescript
> ILogManager.getLog(logName: string): ILog | null;
> ```

Returns the `ILog` instance with the given name.
Returns `null` if not found.

<br>

<a href="#top">(go to top)</a>

----

[fluent-interface]: https://martinfowler.com/bliki/FluentInterface.html

[iLogBuilder]: iLogBuilder.md#top
[andGetLogger]: iLogBuilder.md#andgetlogger
[atLevel]: iLogBuilder.md#atlevel
[newLog]: iLogBuilder.md#newlog
[newChannel]: iLogBuilder.md#newchannel
