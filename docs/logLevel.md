# <h1 id="top" align="center">LogLevel</h1> #

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

> ```javascript
> LogLevel.level: number;
> ```

A `number` that represents the severity of the `LogLevel`. Higher values represent more severe levels.

<br>

<a href="#top">(go to top)</a>

----

## `name` ##

> ```javascript
> LogLevel.name: string;
> ```

The name of the `LogLevel`.

<br>

<a href="#top">(go to top)</a>

----

## `displayName` ##

> ```javascript
> LogLevel.displayName: string;
> ```

The display name of the `LogLevel` (defaults to the same value as `name`).

<br>

<a href="#top">(go to top)</a>

----

## Log Levels ##

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
