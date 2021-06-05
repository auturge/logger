<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">LogLevel</h1>

> `LogLevel`: Defines the default set of logging severity levels.

Any `LogLevel` exposes the following members:

- [`level`](#level)
- [`name`](#name)
- [`displayName`](#displayName)

`LogLevel` also exposes several enum-like static [`LogLevels`](#log-levels):

- [`OFF`](#log-levels)
- [`FATAL`](#log-levels)
- [`ERROR`](#log-levels)
- [`WARN`](#log-levels)
- [`INFO`](#log-levels)
- [`DEBUG`](#log-levels)
- [`TRACE`](#log-levels)
- [`ALL`](#log-levels)

See also the table of [log levels](#log-levels).
<br>

<a href="#top">(go to top)</a>

----

## `level` ##

> ```typescript
> LogLevel.level: number;
> ```

A `number` that represents the severity of the `LogLevel`. Higher values represent more severe levels.

<br>

<a href="#top">(go to top)</a>

----

## `name` ##

> ```typescript
> LogLevel.name: string;
> ```

The name of the `LogLevel`.

<br>

<a href="#top">(go to top)</a>

----

## `displayName` ##

> ```typescript
> LogLevel.displayName: string;
> ```

The display name of the `LogLevel` (defaults to the same value as `name`).

<br>

<a href="#top">(go to top)</a>

----

## Log Levels ##

|Log Level	|Importance| Default Color |
|:---|:---|:---|
|OFF| Nothing will be logged. | N/A |
|FATAL	|One or more key business functionalities are not working and the whole system doesn’t fulfill the business functionalities.| red |
|ERROR	|One or more functionalities are not working, preventing some functionalities from working correctly.| red |
|WARN	|Unexpected behavior happened inside the application, but it is continuing its work and the key business features are operating as expected.| yellow |
|INFO	|An event happened, the event is purely informative and can be ignored during normal operations.| white |
|DEBUG	|Useful during software debugging when more granular information is needed.| cyan |
|TRACE	|Step by step execution of your code that can be ignored during the standard operation, but may be useful during extended debugging sessions.| white |
|ALL	|A level where all messages will be logged, regardless of level. | N/A |

<br>

<a href="#top">(go to top)</a>

<br>
