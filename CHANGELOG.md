# Changelog #

## [2.0.0] - ??? ##

- BREAKING CHANGES
    - Emitter - removed 'handlers' (use 'subscribers' instead).
    - Token arguments with values must now include a `key`.
        - ex: DateToken `format` and `timezone`
    - Removed:
        - ILoggerBase
        - LogBuilder

- Added
    - Docs!
    - Export: TerminalWriter, ConsoleWriter, DateFormat
    - SourceToken
    - EntryColorizer
    - LogLevel.coerce(...) - Attempts to coerce a `LogLevel` from the given name, level, or `LogLevel`

- Changed
    - IWriter.reconfigure now returns an IWriter.
    - Token arguments are now parsed into objects instead of string.

## [1.0.3] - 10-May-2021 ##

- Fixed
    - Published the right code this time! -_-

- Added
    - DEV: Prepublish script to prevent publishing from the root folder

## [1.0.2] - 10-May-2021 ##

- "Fixed" (*but not really, because 1.0.2 published from the wrong folder as well!)
    - Published the wrong code to 1.0.1

## [1.0.1] - 10-May-2021 ##

- Fixed
    - The default logger now correctly parses tokens in minified dist

- Added
    - extracted ILogBuilder and ILogManager interfaces

- Changed
    - changed dependencies in concrete classes from instances to abstractions
    - added default types to the generics, in order to dial back the levels of type constraints

- Removed
    - removed IChannel, Channel dependency on IStatusEntry
    - removed ILog dependency on IStatusEntry
    - removed ILogEntry dependency on IStatusData
    - removed LogBuilder dependency on IStatusEntry
    - removed sourcemaps from dist (to reduce package size)

## [1.0.0] - 09-May-2021 ##

✨ Initial release
