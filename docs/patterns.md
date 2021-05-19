<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

# <h1 align="center">Patterns</h1> #

A `pattern` is a string value describing how a log entry should be displayed, comprised of pattern `tokens` and additional text, if desired.

Consider it a "message template".

<br>

----

## Tokens ##

Tokens are string values that can be strung together to form the message template.

Tokens take the format:

> ```%{ <token name> [```&#8203;```| <arguments> ]}```

Arguments are pipe ("`|`") delimited string values.

<br>

A few example of tokens, with and without arguments:

> ```%{ date }```

> ```%{ date | f:yyyy-MM-dd HH:mm:ss.SSS xxx }```

> ```%{ date | f:yyyy-MM-dd HH:mm:ss.SSS xxx | tz: UTC }```

<br>

Logger currently recognizes the following list of `token`s:

<a id="tokens-table"></a>
| Token | Purpose | Arguments |
|:---|:---|:---|
| `d` or `date` | Displays the timestamp of the entry | - `f` or `format`: the timestamp format string<br>- `tz` or `timezone`: the IANA string for the timezone to recalculate to |
| `l` or `level` | Display the [`LogLevel`](#loglevels) of the entry | `c` or `color`: Display the `LogLevel` in color<br>-`l`, `len`, or `length`: the number of characters to show.<br>&emsp;Will trim to fit, or pad with spaces. Default: 5 |
| `m` or `message` | Displays the message of the entry | N/A |
| `s` or `source` | Displays the name of the `Channel` being written | `c` or `color`: the display color of the `source` text |

<br>

----

## Example Patterns ##

Given a log entry with the following properties
|Property|Value|
|----|----|
| message | ```Hello, world!``` |
| loglevel | ```LogLevel.DEBUG``` |
| timestamp | ```2021-04-25 19:00:43.426 GMT-7 (America/Los Angeles)``` |
| source | ```InfoLog``` |

<br>

...here is a list of reasonable patterns and their expected output:

<br>

```pattern = "%{ l | color } %{m}"```
>```INFO```&nbsp;&emsp;```Hello, world!```

- NOTE: "INFO" will be written in the [color](./api/loglevel.md#log-levels) specified for the [`LogLevel`](./api/loglevel.md#log-levels). In this case, the default color for [`DEBUG`](./api/loglevel.md#log-levels) is cyan.

<br>

```pattern = "%{ d | f:yyyy-MM-dd'T'HH:mm:ss.SSS'Z'| tz:UTC } | %{l} | %{m}"```
> ```2021-04-26T02:00:43.426Z```&ensp;&#x7c;&ensp;```DEBUG```&ensp;&#x7c;``` Hello, world!```

<br>

```pattern = "[%{ l | len:6 }] %{ d | f:HH:mm:ss.SSS } >> %{ s | c:green } >> %{m}"```
> ```[DEBUG ] 19:00:43```&ensp;&ensp;```>> InfoLog >> Hello, world!```

- NOTE: "InfoLog" will be written in green.
<br>
