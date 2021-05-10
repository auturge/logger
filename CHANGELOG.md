# Changelog #

## [2.0.0] - ??? ##

- Fixed
    - The default logger now correctly parses tokens

- Added
    - ILogBuilder interface
    - ILogManager interface

- Changed
    - changed dependencies in LogManager from concrete to abstractions

- Removed
    - removed IChannel, Channel dependency on IStatusEntry
    - removed ILog dependency on IStatusEntry
    - removed ILogEntry dependency on IStatusData
    - removed LogBuilder dependency on IStatusEntry
    - removed sourcemaps from dist (to reduce package size)

## [1.0.0] - 09-May-2021 ##

✨ Initial release
