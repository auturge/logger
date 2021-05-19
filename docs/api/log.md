<div id="top" align="right"><a href="https://github.com/auturge/logger#readme">(home)</a></div>

# <h1 align="center">Log</h1> #

> Log: A default terminal logger for quick out-of-the-box logging.

Any [`ILog`](#ilog) exposes the following methods:

- [`fatal`](iLog#fatal)
- [`error`](iLog#error)
- [`warn`](iLog#warn)
- [`info`](iLog#info)
- [`debug`](iLog#debug)
- [`trace`](iLog#trace)

The `Log` is an [`IStatusLog`](iStatusLog), a special type of [`ILog`](ilog) which also exposes the following logging methods:

- [`success`](iStatusLog#success)
- [`failure`](iStatusLog##failure)
- [`mark`](iStatusLog##mark)

In addition, `Log` will colorize each log entry.

> Unfortunately Github Flavored Markdown (GFM) does not support custom text colors wtihout using hacky workarounds or placeholder sites, so I won't demo colors here, but instead provide a table:

|Method|Color|
|:---|:---|
|fatal|red|
|error|red|
|warn|yellow|
|info|default console color|
|debug|cyan|
|trace|default console color|
|success|green|
|failure|red|
|mark|magenta|

<br>

<a href="#top">(go to top)</a>

----

[iLog]: iLog.md
[iStatusLog]: iStatusLog.md
