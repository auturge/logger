<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">ILog</h1>

> `ILog`: An interface describing the properties and methods used to log messages.

The `ILog` interface exposes the following members:

- [`channels`](#channels)
- [`name`](#name)
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

## `channels` ##

> ```typescript
> ILog.channels: IChannel[];
> ```

Returns the underlying logging [channel][ichannel]s.

<br>

<a href="#top">(go to top)</a>

----

## `name` ##

> ```typescript
> ILog.name: string;
> ```

Returns the name of the logger.

<br>

<a href="#top">(go to top)</a>

----

## `enabled` ##

> ```typescript
> ILog.enabled: boolean;
> ```

Gets or sets whether the logger is enabled.

<br>

<a href="#top">(go to top)</a>

----

## `setLevel` ##

> ```typescript
> ILog.setLevel(level: LogLevel): void;
> ```

Sets the `LogLevel` for all [channel][ichannel]s on this `ILog`.

<br>

<a href="#top">(go to top)</a>

----

## `fatal` ##

> ```typescript
> ILog.fatal(message: string): void;
> ILog.fatal(message: string, obj: any): void;
> ILog.fatal(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a fatal log message.

This is the log level that tells the user that the application has encountered an event or entered a state in which one of the crucial business functionalities is no longer working. A FATAL log level may be used when the application is not able to connect to a crucial data store like a database or all the payment systems are not available and users can’t checkout their baskets in your e-commerce.

<br>

<a href="#top">(go to top)</a>

----

## `error` ##

> ```typescript
> ILog.error(message: string): void;
> ILog.error(message: string, obj: any): void;
> ILog.error(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes an error log message.

This tells the user that the application has hit an issue preventing one or more functionalities from properly functioning. The ERROR level can be used when one of the payment systems is not available, but there is still the option to check out the basket in the e-commerce application or when your social media logging option is not working for some reason.

<br>

<a href="#top">(go to top)</a>

----

## `warn` ##

> ```typescript
> ILog.warn(message: string): void;
> ILog.warn(message: string, obj: any): void;
> ILog.warn(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a warning log message.

This tells the user that something unexpected happened in the application: a problem, or a situation that might disturb one of the processes. But that doesn’t mean that the application failed. The WARN level should be used in situations that are unexpected, but the code can continue the work. For example, a parsing error occurred that resulted in a certain document not being processed.

<br>

<a href="#top">(go to top)</a>

----

## `info` ##

> ```typescript
> ILog.info(message: string): void;
> ILog.info(message: string, obj: any): void;
> ILog.info(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes an informational log message.

This is the standard log level indicating that something happened, the application entered a certain state, etc. For example, a controller of your authorization API may include an INFO log entry with information on which user requested authorization if the authorization was successful or not. The information logged using the INFO log level should be purely informative and not looking into them on a regular basis shouldn’t result in missing any important information.

<br>

<a href="#top">(go to top)</a>

----

## `debug` ##

> ```typescript
> ILog.debug(message: string): void;
> ILog.debug(message: string, obj: any): void;
> ILog.debug(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a debug log message.

This level is less granular compared to the TRACE level, but it is more than you will need in everyday use. The DEBUG log level should be used for information that may be needed for diagnosing issues and troubleshooting or when running application in the test environment for the purpose of making sure everything is running correctly

<br>

<a href="#top">(go to top)</a>

----

## `trace` ##

> ```typescript
> ILog.trace(message: string): void;
> ILog.trace(message: string, obj: any): void;
> ILog.trace(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a trace log message.

This level is for the most fine-grained information only used in rare cases where you need the full visibility of what is happening in your application and inside the third-party libraries that you use. You can expect the TRACE logging level to be very verbose. You can use it for example to annotate each step in the algorithm or each individual query with parameters in your code.

<br>

<a href="#top">(go to top)</a>

----

[ichannel]:iChannel.md#top
