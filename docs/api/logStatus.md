<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">LogStatus</h1>

> `LogStatus`: Defines the default set of entry status codes.

Any `LogStatus` exposes the following members:

- [`name`](#name)
- [`displayName`](#displayName)

`LogStatus` also exposes several enum-like static [`LogStatus`](#entry-statuses):

- [`FAILURE`](#entry-statuses)
- [`INFO`](#entry-statuses)
- [`MARK`](#entry-statuses)
- [`SUCCESS`](#entry-statuses)

See also the table of [log statuses](#entry-statuses).
<br>

<a href="#top">(go to top)</a>

----

## `name` ##

> ```typescript
> LogStatus.name: string;
> ```

The name of the `LogStatus`.

<br>

<a href="#top">(go to top)</a>

----

## `displayName` ##

> ```typescript
> LogStatus.displayName: string;
> ```

The display name of the `LogStatus` (defaults to the same value as `name`).

<br>

<a href="#top">(go to top)</a>

----

## Entry Statuses ##

| Status	|Importance|
|:---|:---|
| FAILURE	| Describes some significant operational failure _that is tied to **user action**_. Failure messages represent **user errors**, not exceptional code failures.<br>Examples:<br>- 'Failed to log in!' (due to an HTTP 401 error, not a 500)<br>- 'Passwords must include at least 12 letters (both upper- and lowercase), at least 1 number, and at least 1 symbol.' |
| INFO		| Describes some event, where the event is purely informative and can be ignored during normal operations. |
| MARK		| Code-execution condition, timestamp, or metrics. |
| SUCCESS	| Describes some significant operational success.<br>Examples:<br>- 'Successfully logged in!'<br>- 'All done!' |

<br>

<a href="#top">(go to top)</a>

<br>
