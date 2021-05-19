<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

# <h1 align="center">ILogBuilder&lt;TLog&gt;</h1> #

> `ILogBuilder<TLog>`: An interface describing a [fluent interface](fluent-interface) for building loggers.

The `ILogBuilder` interface exposes the following members:

- [`andGetLogger`](#andgetlogger)
- [`atLevel`](#atlevel)
- [`channels`](#channels)
- [`logCreated`](#logcreated)
- [`name`](#name)
- [`newChannel`](#newchannel)
- [`newLog`](#newlog)

<br>

<a href="#top">(go to top)</a>

----

## `andGetLogger` ##

> ```javascript
> ILogBuilder.andGetLogger(): TLog;
> ```

Finalizes the configuration, and then creates and returns the corresponding [`ILog`](iLog).

<br>

<a href="#top">(go to top)</a>

----

## `atLevel` ##

> ```javascript
> ILogManager.enable(logName: string): void;
> ```

Sets the [level](logLevel) of all [channel](iChannel)s.

<br>

<a href="#top">(go to top)</a>

----

## `channels` ##

> ```javascript
> ILogBuilder.channels: IChannel[];
> ```

Returns the logging [channel](iChannel)s to be created with the logger.

<br>

<a href="#top">(go to top)</a>

----

## `logCreated` ##

> ```javascript
> ILogBuilder.logCreated: Emitter<TLog>;
> ```

An [`Emitter<TLog>`](emitter) that fires when a new logger is created.

<br>

<a href="#top">(go to top)</a>

----

## `name` ##

> ```javascript
> ILogBuilder.name: string;
> ```

The name of the logger to be created.

<br>

<a href="#top">(go to top)</a>

----

## `newChannel` ##

> ```javascript
> ILogBuilder.newChannel(name: string, writer: IWriter):  ILogBuilder<TLog>;
> 
> ILogBuilder.newChannel(name: string, writer: IWriter, level: LogLevel):  ILogBuilder<TLog>;
>
> ```

Configures a new [`IChannel`](iChannel) with the given name, writer, and [`LogLevel`](logLevel).

The `level` argument defaults to `INFO`.

<br>

<a href="#top">(go to top)</a>

----

## `newLog` ##

> ```javascript
> ILogBuilder.newLog(): ILogBuilder<TLog>;
>
> ILogBuilder.newLog(logName: string): ILogBuilder<TLog>;
> ```

Configures a new [`ILog`](iLog) with the given name.

The `name` argument defaults to 'main'.

<br>

<a href="#top">(go to top)</a>

----

[fluent-interface]: https://martinfowler.com/bliki/FluentInterface.html

[emitter]: emitter.md
[iChannel]: iChannel.md
[iLog]: iLog.md
[logLevel]: logLevel.md
