<div id="top" align="right"><a href="https://github.com/auturge/logger#top">(home)</a></div>

<h1 align="center">TerminalWriter</h1>

> `TerminalWriter`: The default writer for the command-line terminal.

The `TerminalWriter` is an [`IWriter`][iWriter], so it exposes the following methods:

- [reconfigure](#reconfigure)
- [write](#write)

<br>

The `TerminalWriter` colors the entire message based on the [`LogLevel`][log-levels] of the entry, as described in the table [here][log-levels].

<br>

<a href="#top">(go to top)</a>

----

## `reconfigure` ##

> ```typescript
> TerminalWriter.reconfigure(config: { pattern: string }): void;
> ```

Sets the [`pattern`][pattern] used by the writer to format messages.

<br>

<a href="#top">(go to top)</a>

----

## `write` ##

> ```typescript
> TerminalWriter.write(entry: ILogEntry): void;
> ```

Writes the given [log entry][iLogEntry] in color, based on the [`LogLevel`][log-levels] of the entry. See [this table][log-levels] for more information.

<a href="#top">(go to top)</a>

[WIP-badge]: https://img.shields.io/static/v1?label=WIP:&message=Work-in-Progress&color=blueviolet

[iWriter]: iWriter.md#top
[write]: iWriter.md#write
[reconfigure]: iWriter.md#reconfigure
[pattern]: ../pattern.md#top
[iLogEntry]: iLogEntry.md#top
[log-levels]: loglevel.md#log-levels
