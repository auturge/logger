<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">IStatusLog</h1>

> `IStatusLog`: An interface describing the properties and methods used to log status messages.

The `IStatusLog` interface extends the [`ILog`][iLog] interface, and so exposes the following members:

- [`channels`](iLog.md#channels)
- [`name`](iLog.md#name)
- [`enabled`](iLog.md#enabled)
- [`setLevel`](iLog.md#setlevel)
- [`fatal`](iLog.md#fatal)
- [`error`](iLog.md#error)
- [`warn`](iLog.md#warn)
- [`info`](iLog.md#info)
- [`debug`](iLog.md#debug)
- [`trace`](iLog.md#trace)

In addition, `IStatusLog` exposes the following additional members:

- [`failure`](#failure)
- [`mark`](#mark)
- [`success`](#success)

<br>

<a href="#top">(go to top)</a>

----

## `failure` ##

> ```typescript
> IStatusLog.failure(message: string): void;
> IStatusLog.failure(message: string, obj: any): void;
> IStatusLog.failure(message: string, obj: any, prettyPrint: boolean): void;
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

## `mark` ##

> ```typescript
> IStatusLog.mark(message: string): void;
> IStatusLog.mark(message: string, obj: any): void;
> IStatusLog.mark(message: string, obj: any, prettyPrint: boolean): void;
> ```

Formats and writes a marking log message.

This is best used to describe events that need to stand out in the log., for example, code-execution conditions, timestamps, or other metrics.

Some examples of `mark` messages:

-
        `Entering method ${ methodName } at ${ timestamp }`
-
        `Exiting method ${ methodName } at ${ timestamp }`

<br>

<a href="#top">(go to top)</a>

----

## `success` ##

> ```typescript
> IStatusLog.success(message: string): void;
> IStatusLog.success(message: string, obj: any): void;
> IStatusLog.success(message: string, obj: any, prettyPrint: boolean): void;
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

[iLog]:iLog.md#top
[channels]: iLog.md#channels
[name]: iLog.md#name
[enabled]: iLog.md#enabled
[setLevel]: iLog.md#setlevel
[fatal]: iLog.md#fatal
[error]: iLog.md#error
[warn]: iLog.md#warn
[info]: iLog.md#info
[debug]: iLog.md#debug
[trace]: iLog.md#trace
